import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import './QRCodeGenerator.css';  // We'll create this CSS file next

const QRCodeGenerator = () => {
  const [size, setSize] = useState(200);
  const webUrl = "https://karpagam1602.github.io/ar_pongal_v3/";
  const qrCodeValue = webUrl;

  const increaseSize = () => setSize(prev => Math.min(prev + 50, 400));
  const decreaseSize = () => setSize(prev => Math.max(prev - 50, 100));

  return (
    <div className="qr-container">
      <div className="qr-card">
        {/* Header */}
        <div className="qr-header">
          <h2>AR PONGAL ✨</h2>
          <p>Scan to access AR EXperience</p>
        </div>

        {/* Main Content */}
        <div className="qr-content">
          <div className="qr-code-wrapper">
            <QRCodeSVG 
              value={qrCodeValue}
              size={size}
              level="H"
              includeMargin={true}
            />
          </div>

          {/* Size Controls */}
          <div className="size-controls">
            <button onClick={decreaseSize} className="control-button">
              Smaller
            </button>
            {/* <div className="size-display">
              {size}x{size}
            </div> */}
            <button onClick={increaseSize} className="control-button">
              Larger
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
