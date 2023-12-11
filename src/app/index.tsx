import React from 'react';
import { createRoot } from 'react-dom/client';
import '../shared/styles/style.scss';
import { App } from '../app/containers/App';

const container = document.getElementById('app') as HTMLElement;
const root = createRoot(container);

root.render(<App />);
