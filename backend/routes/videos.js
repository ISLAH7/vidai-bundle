import express from 'express';
import Video from '../models/Video.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Get all videos
router.get('/', async (req, res) => {
  const { status = 'published', page = 1, limit = 10 } = req.query;
  
  const skip = (page - 1) * limit;
  
  const videos = await Video.find({ status })
    .populate('uploadedBy', 'name email')
    .skip(skip)
    .limit(parseInt(limit))
    .sort({ createdAt: -1 });

  const total = await Video.countDocuments({ status });

  res.json({
    videos,
    pagination: {
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit)
    }
  });
});

// Get single video
router.get('/:id', async (req, res) => {
  const video = await Video.findByIdAndUpdate(
    req.params.id,
    { $inc: { views: 1 } },
    { new: true }
  ).populate('uploadedBy', 'name email');

  if (!video) {
    return res.status(404).json({ error: 'Video not found' });
  }

  res.json(video);
});

// Create video (authenticated)
router.post('/', authenticate, async (req, res) => {
  const { title, description, url, thumbnail, duration, category, tags } = req.body;

  if (!title || !description || !url) {
    return res.status(400).json({ error: 'Title, description, and URL are required' });
  }

  const video = await Video.create({
    title,
    description,
    url,
    thumbnail,
    duration,
    category,
    tags,
    uploadedBy: req.user.id
  });

  res.status(201).json(video);
});

// Update video (owner or admin)
router.put('/:id', authenticate, async (req, res) => {
  let video = await Video.findById(req.params.id);

  if (!video) {
    return res.status(404).json({ error: 'Video not found' });
  }

  // Check ownership
  if (video.uploadedBy.toString() !== req.user.id) {
    return res.status(403).json({ error: 'Not authorized to update this video' });
  }

  video = await Video.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.json(video);
});

// Delete video (owner or admin)
router.delete('/:id', authenticate, async (req, res) => {
  const video = await Video.findById(req.params.id);

  if (!video) {
    return res.status(404).json({ error: 'Video not found' });
  }

  // Check ownership
  if (video.uploadedBy.toString() !== req.user.id) {
    return res.status(403).json({ error: 'Not authorized to delete this video' });
  }

  await Video.findByIdAndDelete(req.params.id);

  res.json({ message: 'Video deleted successfully' });
});

// Like video
router.post('/:id/like', authenticate, async (req, res) => {
  const video = await Video.findByIdAndUpdate(
    req.params.id,
    { $inc: { likes: 1 } },
    { new: true }
  );

  if (!video) {
    return res.status(404).json({ error: 'Video not found' });
  }

  res.json(video);
});

export default router;
