import React from 'react';
import styled from 'styled-components';

const SpeedControls = ({ playbackRate, setPlaybackRate }) => {
  return (
    <ControlsContainer>
      <label>Playback Speed:</label>
      <select 
        value={playbackRate} 
        onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
      >
        <option value="0.5">0.5x</option>
        <option value="0.75">0.75x</option>
        <option value="1">1x</option>
        <option value="1.25">1.25x</option>
        <option value="1.5">1.5x</option>
        <option value="2">2x</option>
      </select>
    </ControlsContainer>
  );
};

const ControlsContainer = styled.div`
  margin: 1rem 0;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;

  select {
    padding: 0.5rem;
    border-radius: 4px;
  }
`;

export default SpeedControls;
