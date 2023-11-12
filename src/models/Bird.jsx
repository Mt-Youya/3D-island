import { useEffect, useRef } from "react"
import { useAnimations, useGLTF } from "@react-three/drei"
import birdScene from "../assets/3d/bird.glb"
import { useFrame } from "@react-three/fiber"

export default function Bird() {
    const birdRef = useRef(null)
    const { scene, animations } = useGLTF(birdScene)
    const { actions } = useAnimations(animations, birdRef)

    useEffect(() => {
        actions["Take 001"].play()
    }, [])

    useFrame(({ clock, camera }, delta) => {
        // birdRef.current.rotation.x += delta * 0.15
        birdRef.current.position.y = Math.sin(clock.elapsedTime) * 0.2 + 2
        const { y: Ry } = birdRef.current.rotation
        const { x: Px } = birdRef.current.position
        if (Px > camera.position.x + 10) {
            birdRef.current.rotation.y = Math.PI
        } else if (Px < camera.position.x - 10) {
            birdRef.current.rotation.y = 0
        }

        if (Ry === 0) {
            birdRef.current.position.x += 0.01
            birdRef.current.position.z -= 0.01
        } else {
            birdRef.current.position.x -= 0.01
            birdRef.current.position.z += 0.01
        }
    })

    return (
        <mesh position={[-5, 2, 1]} ref={birdRef} scale={[.003, .003, .003]}>
            <primitive object={scene} />
        </mesh>
    )
}
