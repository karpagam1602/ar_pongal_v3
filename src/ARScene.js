import React, { useState, useEffect, useRef } from "react";

const ARScene = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [hasWebcamPermission, setHasWebcamPermission] = useState(false);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [markerFound, setMarkerFound] = useState(false);
  const sceneRef = useRef(null);

  useEffect(() => {
    const loadARScripts = async () => {
      try {
        await new Promise((resolve, reject) => {
          const aframeScript = document.createElement("script");
          aframeScript.src = "https://aframe.io/releases/1.4.0/aframe.min.js";
          aframeScript.onload = resolve;
          aframeScript.onerror = reject;
          document.head.appendChild(aframeScript);
        });

        await new Promise((resolve, reject) => {
          const arScript = document.createElement("script");
          arScript.src =
            "https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js";
          arScript.onload = resolve;
          arScript.onerror = reject;
          document.head.appendChild(arScript);
        });

        setScriptsLoaded(true);
      } catch (err) {
        console.error("Error loading AR scripts", err);
      }
    };

    if (!scriptsLoaded) {
      loadARScripts();
    }

    return () => {
      const scripts = document.querySelectorAll('script[src*="aframe"]');
      scripts.forEach((script) => script.remove());
    };
  }, [scriptsLoaded]);

  useEffect(() => {
    const setupWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setHasWebcamPermission(true);
      } catch (err) {
        console.error("Error accessing webcam", err);
        setHasWebcamPermission(false);
        setIsStarted(false);
      }
    };

    if (isStarted && scriptsLoaded) {
      setupWebcam();
    }
  }, [isStarted, scriptsLoaded]);

  const handleExitAR = () => {
    setIsStarted(false);
    setHasWebcamPermission(false);
    setMarkerFound(false);
    window.location.reload();
  };

  const MarkerIndicator = () => (
    <div
      style={{
        position: "fixed",
        top: "1rem",
        left: "1rem",
        zIndex: 1000,
        padding: "8px 16px",
        backgroundColor: markerFound ? "#22c55e" : "#f59e0b",
        color: "white",
        borderRadius: "8px",
        transition: "background-color 0.3s ease",
      }}
    >
      {markerFound ? "Marker Found!" : "Looking for Hiro Marker..."}
    </div>
  );

  if (!scriptsLoaded) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "black",
          color: "white",
        }}
      >
        Loading AR components...
      </div>
    );
  }

  if (!isStarted) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "black",
          color: "white",
          gap: "20px",
        }}
      >
        <button
          onClick={() => setIsStarted(true)}
          style={{
            padding: "12px 24px",
            backgroundColor: "white",
            color: "black",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Start AR Experience
        </button>
        <a
          href="https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/HIRO.jpg"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#3b82f6",
            textDecoration: "underline",
            marginTop: "10px",
          }}
        >
          Download Hiro Marker
        </a>
      </div>
    );
  }

  if (!hasWebcamPermission) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "black",
          color: "white",
        }}
      >
        Please allow camera access to use AR features
      </div>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <MarkerIndicator />

      <button
        onClick={handleExitAR}
        style={{
          position: "fixed",
          top: "1rem",
          right: "1rem",
          zIndex: 1000,
          padding: "8px 16px",
          backgroundColor: "#ef4444",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Exit AR
      </button>

      <div
        ref={sceneRef}
        style={{ width: "100%", height: "100%", position: "relative" }}
      >
        <a-scene
          embedded
          arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;"
          renderer="logarithmicDepthBuffer: true; antialias: true; alpha: true"
          vr-mode-ui="enabled: false"
          style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
        >
          <a-marker preset="hiro">
            <a-entity
              gltf-model="/models/potPongal.glb"
              position="0 0 0"
              scale="0.5 0.5 0.5"
            ></a-entity>
          </a-marker>

          <a-entity camera></a-entity>
        </a-scene>
      </div>
    </div>
  );
};

export default ARScene;
