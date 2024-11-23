const ytdl = require('ytdl-core');

exports.processYouTubeAudio = async (req, res) => {
  try {
    console.log('Request received:', req.body);
    let { url } = req.body;
    
    url = url.replace('@', '').trim();
    console.log('Cleaned URL:', url);

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    try {
      console.log('Validating URL:', url);
      if (!ytdl.validateURL(url)) {
        return res.status(400).json({ error: 'Invalid YouTube URL' });
      }

      console.log('Getting video info...');
      const info = await ytdl.getInfo(url);
      console.log('Video info received:', info.videoDetails.title);

      // Get all formats with audio
      const formats = ytdl.filterFormats(info.formats, 'audioonly');
      console.log('Available audio formats:', formats.length);

      if (formats.length === 0) {
        throw new Error('No audio formats available');
      }

      // Find the best audio format
      const format = formats.reduce((prev, curr) => {
        return (curr.audioBitrate || 0) > (prev.audioBitrate || 0) ? curr : prev;
      });

      console.log('Selected format:', {
        itag: format.itag,
        container: format.container,
        audioBitrate: format.audioBitrate
      });

      // Set response headers
      res.setHeader('Content-Type', format.mimeType || 'audio/webm');
      res.setHeader('Content-Disposition', `attachment; filename="${info.videoDetails.title}.webm"`);
      res.setHeader('Access-Control-Allow-Origin', '*');

      // Create and pipe the stream
      const stream = ytdl(url, {
        format: format,
        requestOptions: {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          }
        }
      });

      // Handle stream events
      stream.on('error', (error) => {
        console.error('Stream error:', error);
        if (!res.headersSent) {
          res.status(500).json({ error: `Stream error: ${error.message}` });
        }
      });

      stream.on('progress', (_, downloaded, total) => {
        console.log(`Download progress: ${Math.floor((downloaded / total) * 100)}%`);
      });

      // Pipe the stream to response
      stream.pipe(res);

    } catch (ytdlError) {
      console.error('YouTube-dl error:', ytdlError);
      return res.status(500).json({ 
        error: 'YouTube processing error',
        details: ytdlError.message
      });
    }

  } catch (error) {
    console.error('Controller error:', error);
    if (!res.headersSent) {
      res.status(500).json({ 
        error: 'Server error',
        details: error.message
      });
    }
  }
};
