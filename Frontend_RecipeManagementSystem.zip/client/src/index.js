import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import styled, { createGlobalStyle } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-image: url('${process.env.PUBLIC_URL}/recipe-background.jpg'); // Corrected path
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    color: white;
  }
`;

const RootContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle />
      <RootContainer>
        <App />
      </RootContainer>
    </Provider>
  </React.StrictMode>
);