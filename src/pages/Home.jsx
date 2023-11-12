import { Suspense, useState } from "react"
import { Canvas } from "@react-three/fiber"
import Loader from "../components/Loader.jsx"
import Island from "../models/Island.jsx"
import Sky from "../models/Sky.jsx"
import Bird from "../models/Bird.jsx"
import Plane from "../models/Plane.jsx"
import HomeInfo from "../components/HomeInfo.jsx"

export default function Home() {
    const [isRotating, setIsRotating] = useState(false)

    const [currentStage, setCurrentStage] = useState(1)

    function adjustIslandForScreenSize() {
        let screenScale = null
        let screenPosition = [0, -6.5, -43]
        let screenRotation = [.1, 4.7, 0]
        if (window.innerWidth < 768) {
            screenScale = [.9, .9, .9]
        } else {
            screenScale = [1, 1, 1]

        }
        return [screenScale, screenPosition, screenRotation]
    }

    function adjustPlaneForScreenSize() {
        let screenScale = null
        let screenPosition
        if (window.innerWidth < 768) {
            screenScale = [1.5, 1.5, 1.5]
            screenPosition = [0, -1.5, 0]
        } else {
            screenScale = [3, 3, 3]
            screenPosition = [0, -4, -4]

        }
        return [screenScale, screenPosition]
    }

    const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize()
    const [planeScale, planePosition] = adjustPlaneForScreenSize()

    return (
        <section className="w-full h-screen relative">
            <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
                {currentStage && <HomeInfo currentStage={currentStage} />}
            </div>

            <Canvas
                className={`w-full h-screen bg-transparent ${isRotating ? "cursor-grabbing" : "cursor-grab"}`}
                camera={{ near: 0.1, far: 1000 }}
            >
                <Suspense fallback={<Loader />}>
                    <directionalLight position={[1, 1, 1]} intensity={2} />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 5, 10]} intensity={2} />
                    <spotLight
                        position={[0, 50, 10]}
                        angle={0.15}
                        penumbra={1}
                        intensity={2}
                    />
                    <hemisphereLight
                        skyColor="#b1e1ff"
                        groundColor="#000000"
                        intensity={1}
                    />

                    <Bird />
                    <Sky isRotating={isRotating} />
                    <Island
                        isRotating={isRotating}
                        setIsRotating={setIsRotating}
                        setCurrentStage={setCurrentStage}
                        position={islandPosition}
                        rotation={[0.1, 4.7077, 0]}
                        scale={islandScale}
                    />
                    <Plane
                        rotation={[0, 20.1, 0]}
                        isRotating={isRotating}
                        position={planePosition}
                        scale={planeScale}
                    />
                </Suspense>
            </Canvas>

            {/*<div className="absolute bottom-2 left-2">*/}
            {/*    <img*/}
            {/*        src={!isPlayingMusic ? soundoff : soundon}*/}
            {/*        alt="jukebox"*/}
            {/*        onClick={() => setIsPlayingMusic(!isPlayingMusic)}*/}
            {/*        className="w-10 h-10 cursor-pointer object-contain"*/}
            {/*    />*/}
            {/*</div>*/}
        </section>
    )
}
