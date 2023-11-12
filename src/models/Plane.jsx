import { useEffect, useRef } from "react"
import { useAnimations, useGLTF } from "@react-three/drei"
import planeScene from "../assets/3d/plane.glb"

export default function Plane({ isRotating, ...props }) {
    const planeRef = useRef(null)
    const { scene, animations } = useGLTF(planeScene)
    const { actions } = useAnimations(animations, planeRef)

    useEffect(() => {
        isRotating ? actions["Take 001"].play() : actions["Take 001"].stop()
    }, [animations, isRotating])

    return (
        <mesh {...props} ref={planeRef}>
            <primitive object={scene} />
        </mesh>
    )
}
