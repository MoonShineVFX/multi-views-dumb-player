import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {MultiViewsDumbPlayer, MultiViewsDumbPlayerCore} from './MultiViewsDumbPlayer';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


const MultiViewsDumbPlayerSettings = {
  url: '5g_ar_demo_stream.mp4', // an-dance.mp4 or an-dance-low dataName in MSE
  columnCount: 2,
  rowCount: 2,
  cameraCount: 3,
  core: MultiViewsDumbPlayerCore.TILES,
  host: 'https://mv.moonshine.tw/stream',
  // styles: {
  //   playback: {borderRadius: '32px', margin: '16px'}
  // },
  // colors: {
  //   highlight: 'yellow',
  //   main: 'red',
  //   sub: 'blue',
  //   base: 'green'
  // }
}


root.render(
  <React.StrictMode>
    <div className='mainframe'>
      <div className='top'></div>
      <div className='bottom'>
        <div className='content'>
          <MultiViewsDumbPlayer {...MultiViewsDumbPlayerSettings} />
        </div>
        <div className='chat'></div>
      </div>
    </div>
  </React.StrictMode>
);
