import React, { useState } from 'react';
import styled from 'styled-components';
import { processYouTubeUrl } from '../services/api';

const YouTubeInput = ({ setAudioUrl, setLoading, setError }) => {
  const [url, setUrl] = useState('');

  const cleanYouTubeUrl = (inputUrl) => {
    // Remove any @ symbol and trim whitespace
    return inputUrl.replace('@', '').trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const cleanedUrl = cleanYouTubeUrl(url);
    console.log('Submitting cleaned URL:', cleanedUrl);
    
    try {
      const audioUrl = await processYouTubeUrl(cleanedUrl);
      console.log('Received audio URL:', audioUrl);
      setAudioUrl(audioUrl);
    } catch (error) {
      console.error('Detailed error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUrlChange = (e) => {
    const inputUrl = e.target.value;
    setUrl(inputUrl);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={url}
        onChange={handleUrlChange}
        placeholder="Enter YouTube URL (e.g., https://www.youtube.com/watch?v=...)"
        required
      />
      <Button type="submit">Convert</Button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  gap: 1rem;
  margin: 2rem 0;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

export default YouTubeInput;
