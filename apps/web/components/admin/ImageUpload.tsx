'use client';

import { useState, useRef, type DragEvent } from 'react';
import imageCompression from 'browser-image-compression';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

const MAX_INPUT_MB = 4.5;
const MAX_INPUT_BYTES = MAX_INPUT_MB * 1024 * 1024;
const TARGET_MAX_MB = 4;
const TARGET_MAX_WIDTH = 1920;

interface Props {
  value: string | null | undefined;
  onChange: (url: string) => void;
}

export function ImageUpload({ value, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function compressImage(file: File): Promise<File> {
    const isImage = /^image\/(jpeg|png|webp|gif)$/i.test(file.type);
    if (!isImage || file.size <= 0) return file;

    const options = {
      maxSizeMB: TARGET_MAX_MB,
      maxWidthOrHeight: TARGET_MAX_WIDTH,
      useWebWorker: true,
    };

    try {
      const compressed = await imageCompression(file, options);
      return compressed;
    } catch {
      return file;
    }
  }

  async function upload(file: File) {
    if (!API_URL) {
      setError('API URL not configured');
      return;
    }
    if (file.size > MAX_INPUT_BYTES) {
      setError(`File too large (max ${MAX_INPUT_MB} MB).`);
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const fileToSend = await compressImage(file);

      const token = typeof window !== 'undefined'
        ? window.localStorage.getItem('admin_token')
        : null;

      const formData = new FormData();
      formData.append('file', fileToSend);

      const res = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });

      const json = await res.json();
      if (!json.success) throw new Error(json.error?.message || 'Upload failed');

      onChange(json.data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) upload(file);
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) upload(file);
  }

  return (
    <div className="space-y-3">
      {value && (
        <div className="relative rounded-xl overflow-hidden border border-border">
          <img src={value} alt="Cover preview" className="w-full aspect-video object-cover" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 w-7 h-7 bg-background/80 backdrop-blur rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground text-xs"
          >
            ✕
          </button>
        </div>
      )}

      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 cursor-pointer transition-colors text-sm ${
          dragOver
            ? 'border-primary bg-primary/5 text-primary'
            : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
        } ${uploading ? 'opacity-60 pointer-events-none' : ''}`}
      >
        {uploading ? (
          <span>Compressing & uploading…</span>
        ) : (
          <>
            <span className="material-icons text-2xl">cloud_upload</span>
            <span>{value ? 'Replace image' : 'Drop image here or click to browse'}</span>
            <span className="text-xs text-muted-foreground">JPEG, PNG, WebP, GIF — max {MAX_INPUT_MB} MB (auto-compressed)</span>
          </>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileChange}
        className="hidden"
      />

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}
