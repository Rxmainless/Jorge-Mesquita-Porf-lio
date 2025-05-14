"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Text3D, Environment } from "@react-three/drei"
import { motion } from "framer-motion"

function FloatingObjects({ count = 20, mouse }) {
  const meshes = useRef([])
  const [objects] = useState(() => {
    return Array.from({ length: count }, (_, i) => ({
      position: [Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      scale: Math.random() * 0.5 + 0.5,
      speed: Math.random() * 0.02 + 0.01,
      type: Math.floor(Math.random() * 3), // 0: cube, 1: sphere, 2: torus
    }))
  })

  useFrame((state) => {
    meshes.current.forEach((mesh, i) => {
      if (!mesh) return

      // Rotate objects
      mesh.rotation.x += objects[i].speed
      mesh.rotation.y += objects[i].speed * 0.5

      // React to mouse movement
      const mouseInfluence = 0.05
      mesh.position.x += (mouse.current[0] * mouseInfluence - mesh.position.x * 0.01) * objects[i].speed
      mesh.position.y += (mouse.current[1] * mouseInfluence - mesh.position.y * 0.01) * objects[i].speed
    })
  })

  return (
    <>
      {objects.map((props, i) => {
        let Geometry
        switch (props.type) {
          case 0:
            Geometry = <boxGeometry args={[1, 1, 1]} />
            break
          case 1:
            Geometry = <sphereGeometry args={[0.7, 16, 16]} />
            break
          case 2:
            Geometry = <torusGeometry args={[0.5, 0.2, 16, 32]} />
            break
        }

        return (
          <mesh
            key={i}
            ref={(el) => (meshes.current[i] = el)}
            position={props.position}
            rotation={props.rotation}
            scale={props.scale}
          >
            {Geometry}
            <meshStandardMaterial
              color={i % 3 === 0 ? "#ff2060" : i % 3 === 1 ? "#0080ff" : "#9000ff"}
              emissive={i % 3 === 0 ? "#ff2060" : i % 3 === 1 ? "#0080ff" : "#9000ff"}
              emissiveIntensity={0.5}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        )
      })}
    </>
  )
}

function MainText() {
  const { viewport } = useThree()
  const textRef = useRef()

  useFrame(({ clock }) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.2
    }
  })

  return (
    <group ref={textRef} position={[0, 0, 0]}>
      <Text3D
        font="/fonts/Inter_Bold.json"
        size={viewport.width < 10 ? 0.8 : 1.2}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelSegments={5}
        position={[viewport.width < 10 ? -3 : -4.5, 0, 0]}
      >
        JORGE MESQUITA
        <meshStandardMaterial
          color="#ffffff"
          emissive="#9000ff"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.9}
        />
      </Text3D>
      <Text3D
        font="/fonts/Inter_Regular.json"
        size={viewport.width < 10 ? 0.4 : 0.6}
        height={0.1}
        curveSegments={8}
        position={[viewport.width < 10 ? -2 : -3, -1.5, 0]}
      >
        DEVELOPER & DESIGNER
        <meshStandardMaterial
          color="#ffffff"
          emissive="#0080ff"
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.7}
        />
      </Text3D>
    </group>
  )
}

function Scene() {
  const mouse = useRef([0, 0])
  const { viewport } = useThree()

  useEffect(() => {
    const handleMouseMove = (event) => {
      // Normalize mouse coordinates
      mouse.current = [(event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1]
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0080ff" />
      <spotLight position={[0, 10, 0]} intensity={1} color="#ff2060" />

      <MainText />
      <FloatingObjects count={15} mouse={mouse} />

      <Environment preset="night" />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </>
  )
}

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen w-full relative"
    >
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} className="w-full h-full">
        <Scene />
      </Canvas>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="flex flex-col items-center">
          <p className="text-gray-300 mb-2">Scroll to explore</p>
          <svg
            className="animate-bounce w-6 h-6 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </motion.div>
    </motion.section>
  )
}
