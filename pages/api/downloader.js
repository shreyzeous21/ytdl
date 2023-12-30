// pages/api/downloader.js
import ytdl from 'ytdl-core';

export default async function handler(req, res) {
  const { url } = req.query;

  try {
    if (url) {
      const info = await ytdl.getInfo(url);
      const videoFormats = ytdl.filterFormats(info.formats, 'video');
      const format = ytdl.chooseFormat(videoFormats, { quality: 'highestaudio' });

      res.json({ format });
    } else {
      res.status(400).json({ error: 'Invalid URL' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch or download the video.' });
  }
}
