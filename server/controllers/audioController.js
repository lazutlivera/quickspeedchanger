const ytdl = require('ytdl-core');

exports.processYouTubeAudio = async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!ytdl.validateURL(url)) {
      return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    const audioStream = ytdl(url, {
      quality: 'highestaudio',
      filter: 'audioonly'
    });

    res.setHeader('Content-Type', 'audio/mp3');
    audioStream.pipe(res);
    
  } catch (error) {
    console.error('Error processing YouTube audio:', error);
    res.status(500).json({ error: 'Failed to process YouTube URL' });
  }
};
