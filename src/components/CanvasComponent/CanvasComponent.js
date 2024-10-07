import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import './CanvasComponent.css'; // Import the CSS file

const Model = () => {
  const { scene } = useGLTF('./model.glb');
  const modelRef = useRef();

  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y = -135; 
      modelRef.current.rotation.x = -90;
      modelRef.current.rotation.z = -135;
    }
  }, []);

  return <primitive ref={modelRef} object={scene} />;
};

const App = () => {
  return (
    <div className="canvas-container">
      <div className="canvas-animation">
        <Canvas
          camera={{ position: [0, 2, 4], fov: 50 }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <pointLight position={[2, 2, 2]} intensity={1.5} />
          <spotLight position={[0, 5, 5]} angle={0.3} penumbra={1} intensity={1} />
          <Suspense fallback={null}>
            <Model />
          </Suspense>
          <OrbitControls
            enableRotate={true}
            enableZoom={false}
            enablePan={true}
          />
        </Canvas>
      </div>
    </div>
  );
};

export default App;
