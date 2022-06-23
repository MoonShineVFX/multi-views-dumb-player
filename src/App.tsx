import React, { useState } from 'react';
import './App.css';
import MultiViewsDumbPlayer from "./components/MultiViewsDumbPlayer";
import useKeyPress from "./hooks/useKeyPress";


function App() {
  const [trackIndex, setTrackIndex] = useState(0);
  useKeyPress(() => changeTrackIndex(1), ['ArrowRight']);
  useKeyPress(() => changeTrackIndex(-1), ['ArrowLeft']);

  const MultiViewsDumbPlayerSettings = {
    url: 'demo.mp4',
    displayWidth: 1280,
    displayHeight: 720,
    videoWidth: 3840,
    videoHeight: 2160,
    columnCount: 4,
    rowCount: 4,
    trackIndex: trackIndex
  }

  const changeTrackIndex = (offset: number) => {
    const trackCount = MultiViewsDumbPlayerSettings.columnCount * MultiViewsDumbPlayerSettings.rowCount;
    setTrackIndex((((trackIndex + offset) % trackCount) + trackCount) % trackCount);
  }

  return (
    <div className="App">
      <MultiViewsDumbPlayer {...MultiViewsDumbPlayerSettings} />
      <button onClick={() => changeTrackIndex(-1)}>Previous</button>
      <button onClick={() => changeTrackIndex(1)}>Next</button>
    </div>
  );
}

export default App;
