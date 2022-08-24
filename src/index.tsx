import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {MultiViewsDumbPlayer, MultiViewsDumbPlayerCore} from './MultiViewsDumbPlayer';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


const MultiViewsDumbPlayerSettings = {
  url: 'an-dance.mp4', // an-dance.mp4 or an-dance-low dataName in MSE
  videoWidth: 3840,
  videoHeight: 2160,
  columnCount: 4,
  rowCount: 4,
  core: MultiViewsDumbPlayerCore.TILES
}


root.render(
  <React.StrictMode>
    <MultiViewsDumbPlayer {...MultiViewsDumbPlayerSettings} />
  </React.StrictMode>
);
