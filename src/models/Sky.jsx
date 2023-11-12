import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import skyScene from "../assets/3d/sky.glb"

export default function Sky({ isRotating }) {
    const { scene } = useGLTF(skyScene)
    const skyRef = useRef(null)

    useFrame((_, delta) => {
        if (isRotating) {
            skyRef.current.rotation.y += 0.15 * delta
        }
    })

    return (
        <mesh ref={skyRef}>
            <primitive object={scene} />
        </mesh>
    )
}
