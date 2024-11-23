import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import SpeedControls from './SpeedControls';

const AudioPlayer = ({ audioUrl }) => {
  const audioRef = useRef(null);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  const handlePlaybackRateChange = (rate) => {
    setPlaybackRate(rate);
  };

  const handleError = (e) => {
    console.error('Audio loading error:', e);
    setError('Failed to load audio. Please try again.');
  };

  return (
    <PlayerContainer>
      {error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <>
          <audio 
            ref={audioRef}
            controls
            src={audioUrl}
            onError={handleError}
            style={{ width: '100%' }}
          />
          <SpeedControls 
            playbackRate={playbackRate}
            setPlaybackRate={handlePlaybackRateChange}
          />
        </>
      )}
    </PlayerContainer>
  );
};

const PlayerContainer = styled.div`
  margin: 2rem 0;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  padding: 1rem;
`;

export default AudioPlayer; 