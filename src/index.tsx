import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MultiViewsDumbPlayer from './MultiViewsDumbPlayer';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


const MultiViewsDumbPlayerSettings = {
  url: 'demo.mp4',
  videoWidth: 3840,
  videoHeight: 2160,
  columnCount: 4,
  rowCount: 4
}


root.render(
  <React.StrictMode>
    <MultiViewsDumbPlayer {...MultiViewsDumbPlayerSettings} />
  </React.StrictMode>
);
