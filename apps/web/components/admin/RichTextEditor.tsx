'use client';

import { useEffect, useMemo, useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';

interface Props {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

function ToolbarButton({
  active,
  onClick,
  label,
  icon,
}: {
  active?: boolean;
  onClick: () => void;
  label: string;
  icon: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-9 px-3 rounded-lg border text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
        active
          ? 'bg-primary/10 text-primary border-primary/30'
          : 'bg-card text-muted-foreground border-border hover:text-foreground hover:bg-muted/40'
      }`}
      aria-pressed={active ? true : undefined}
    >
      <span className="inline-flex items-center gap-2">
        <span className="material-icons text-base" aria-hidden>{icon}</span>
        {label}
      </span>
    </button>
  );
}

export function RichTextEditor({ value, onChange, placeholder }: Props) {
  const [lastHtml, setLastHtml] = useState(value);

  const extensions = useMemo(
    () => [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),
    ],
    []
  );

  const editor = useEditor({
    extensions,
    content: value || '<p></p>',
    editorProps: {
      attributes: {
        class:
          'min-h-[220px] rounded-xl border border-input bg-background px-4 py-3 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      },
    },
    onUpdate: ({ editor: ed }) => {
      const html = ed.getHTML();
      setLastHtml(html);
      onChange(html);
    },
  });

  // Keep editor in sync when form value is loaded/changed externally (e.g. edit page fetch)
  useEffect(() => {
    if (!editor) return;
    if (value === lastHtml) return;
    editor.commands.setContent(value || '<p></p>', false);
    setLastHtml(value);
  }, [editor, value, lastHtml]);

  function setLink() {
    if (!editor) return;
    const prev = editor.getAttributes('link').href as string | undefined;
    const next = window.prompt('Enter URL', prev || 'https://');
    if (next === null) return;
    if (next.trim() === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: next.trim() }).run();
  }

  if (!editor) {
    return (
      <div className="rounded-xl border border-border bg-card/40 p-4 text-muted-foreground">
        Loading editor…
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <ToolbarButton
          icon="format_bold"
          label="Bold"
          active={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        <ToolbarButton
          icon="format_italic"
          label="Italic"
          active={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        <ToolbarButton
          icon="format_list_bulleted"
          label="Bullets"
          active={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />
        <ToolbarButton
          icon="format_list_numbered"
          label="Numbered"
          active={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />
        <ToolbarButton
          icon="title"
          label="H2"
          active={editor.isActive('heading', { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        />
        <ToolbarButton
          icon="subtitles"
          label="H3"
          active={editor.isActive('heading', { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        />
        <ToolbarButton
          icon="link"
          label="Link"
          active={editor.isActive('link')}
          onClick={setLink}
        />
        <ToolbarButton
          icon="link_off"
          label="Unlink"
          active={false}
          onClick={() => editor.chain().focus().unsetLink().run()}
        />
      </div>

      {placeholder ? (
        <p className="text-xs text-muted-foreground">{placeholder}</p>
      ) : null}

      <EditorContent editor={editor} />
    </div>
  );
}

