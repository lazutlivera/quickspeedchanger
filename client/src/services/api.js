import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const processYouTubeUrl = async (url) => {
  try {
    // First test if server is running
    try {
      const testResponse = await axios.get('http://localhost:5000/test');
      console.log('Server test response:', testResponse.data);
    } catch (testError) {
      console.error('Server test failed:', testError);
      throw new Error('Cannot connect to server. Is it running?');
    }

    console.log('Sending request to server...');
    const response = await axios.post(
      `${API_BASE_URL}/audio/process`,
      { url },
      {
        responseType: 'blob',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    console.log('Response received, creating blob URL...');
    const blob = new Blob([response.data], { 
      type: response.headers['content-type'] || 'audio/webm' 
    });
    return URL.createObjectURL(blob);
    
  } catch (error) {
    console.error('Detailed API Error:', error);
    if (error.code === 'ECONNABORTED') {
      throw new Error('Server connection timed out. Is the server running?');
    }
    if (error.response) {
      throw new Error(error.response.data.error || 'Server error occurred');
    }
    throw new Error('Cannot connect to server. Please check if it\'s running.');
  }
}; 