import React from 'react';
import ARScene from './ARScene';
import QRCodeGenerator from './QrCodeGenerator';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* <ARScene /> */}
      <QRCodeGenerator/>
    </div>
  );
}

export default App;