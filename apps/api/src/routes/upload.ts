import { Router } from 'express';
import multer from 'multer';
import { put } from '@vercel/blob';

export const uploadRouter = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 4.5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (/^image\/(jpeg|png|gif|webp|svg\+xml)$/.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (JPEG, PNG, GIF, WebP, SVG) are allowed'));
    }
  },
});

uploadRouter.post('/', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({
        success: false,
        error: { message: 'No file provided' },
      });
    }

    const ext = file.originalname.split('.').pop() || 'jpg';
    const pathname = `case-studies/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const blob = await put(pathname, file.buffer, {
      access: 'public',
      addRandomSuffix: false,
    });

    res.json({
      success: true,
      data: { url: blob.url, pathname: blob.pathname },
    });
  } catch (e) {
    console.error('Upload error:', e);
    const message = e instanceof Error ? e.message : 'Upload failed';
    res.status(500).json({
      success: false,
      error: { message },
    });
  }
});
