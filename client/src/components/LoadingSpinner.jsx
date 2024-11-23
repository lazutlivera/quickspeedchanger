import React from 'react';
import styled from 'styled-components';

const LoadingSpinner = () => {
  return <Spinner>Loading...</Spinner>;
};

const Spinner = styled.div`
  text-align: center;
  padding: 1rem;
  color: #666;
`;

export default LoadingSpinner; 