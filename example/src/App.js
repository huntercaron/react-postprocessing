import { Color } from 'three'
import React, { Suspense, useState } from 'react'
import { Canvas } from 'react-three-fiber'
import { EffectComposer, Bloom, SSAO, Glitch } from 'react-postprocessing'
import Model from './Model'

export default function App() {
  const [hovered, setHover] = useState(false)

  return (
    <Canvas
      shadowMap
      colorManagement
      gl={{ alpha: false, logarithmicDepthBuffer: true, precision: 'lowp' }}
      camera={{ position: [0, 2.5, 25], fov: 35 }}
      onCreated={({ gl, scene }) => {
        gl.toneMappingExposure = 1.5
        scene.background = new Color('#272730').convertGammaToLinear()
      }}>
      <fog attach="fog" args={['#272730', 10, 80]} />
      <ambientLight intensity={0.2} />
      <directionalLight castShadow position={[10, 20, 20]} intensity={1} shadow-bias={-0.0005} />
      <directionalLight position={[-10, 5, -20]} angle={2} color="#ffc530" intensity={1} />
      <directionalLight position={[10, 5, -20]} angle={2} color="#ffc530" intensity={2} />
      <pointLight position={[-10, -10, -10]} intensity={5} />
      <Suspense fallback={null}>
        <Model onPointerOver={(e) => setHover(true)} onPointerOut={(e) => setHover(false)} />
        <EffectComposer>
          <Bloom luminanceThreshold={0.6} />
          <SSAO />
          <Glitch delay={[0, 0]} duration={[0.5, 1]} active={hovered} ratio={1} strength={[0.3, 0.6]} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  )
}
