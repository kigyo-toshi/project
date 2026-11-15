import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Layout } from './components/Layout.jsx';
import './styles/common.css';

export function mount(Page) {
  createRoot(document.getElementById('root')).render(
    <StrictMode><Layout><Page /></Layout></StrictMode>,
  );
}
