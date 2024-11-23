import React from 'react';
import YouTubeInput from './components/YouTubeInput';
import AudioPlayer from './components/AudioPlayer';
import LoadingSpinner from './components/LoadingSpinner';
import { GlobalStyles } from './styles/GlobalStyles';
import styled from 'styled-components';

const App = () => {
  const [audioUrl, setAudioUrl] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  return (
    <AppContainer>
      <GlobalStyles />
      <Title>YouTube Speed Changer</Title>
      <YouTubeInput 
        setAudioUrl={setAudioUrl}
        setLoading={setLoading}
        setError={setError}
      />
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {audioUrl && <AudioPlayer audioUrl={audioUrl} />}
    </AppContainer>
  );
};

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

export default App;
