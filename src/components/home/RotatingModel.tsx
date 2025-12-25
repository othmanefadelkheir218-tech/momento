"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { PerspectiveCamera, Text3D, Center } from "@react-three/drei"
import * as THREE from "three"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import useWidth from "@/hooks/Width"
import { Reveal } from "../animation/Reveal"

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

// 3D Model Component (Letter M)
function RotatingModel() {
    const meshRef = useRef<THREE.Object3D>(null)
    const rotationRef = useRef({ x: 0, y: 0, z: 0 })

    useEffect(() => {
        // Update rotation values from GSAP animation
        const updateRotation = () => {
            if (meshRef.current) {
                meshRef.current.rotation.x = rotationRef.current.x
                meshRef.current.rotation.y = rotationRef.current.y
                meshRef.current.rotation.z = rotationRef.current.z
            }
        }

        // Create GSAP timeline for scroll-based rotation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
                onUpdate: updateRotation,
            },
        })

        // Continuous rotation based on total page scroll height
        tl.to(rotationRef.current, {
            y: Math.PI * 10, // More rotations since page is taller
            ease: "none",
        })

        return () => {
            tl.kill()
        }
    }, [])

    return (
        <group ref={meshRef}>
            <Center>
                <Text3D
                    font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
                    size={4}
                    height={1}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.1}
                    bevelSize={0.05}
                    bevelOffset={0}
                    bevelSegments={5}
                >
                    M
                    <meshStandardMaterial
                        color="#dc2626"
                        roughness={0.8}
                    />
                </Text3D>
            </Center>
        </group>
    )
}

// 3D Canvas Scene
function ModelScene() {
    return (
        <Canvas className="w-full h-full"

        >
            {/* <OrbitControls /> */}
            <PerspectiveCamera
                makeDefault position={[0, 0, 8]}
                rotation={[0, 0.0, 0]}
            />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} />
            <RotatingModel />
        </Canvas>
    )
}

// Section content data
const sections = [
    {
        id: 1,
        title: "Crafted with Care",
        description:
            "Every mochi is handcrafted using traditional Japanese techniques, ensuring the perfect balance of chewy texture and creamy ice cream filling. We source only the finest ingredients to create an authentic taste experience.",
        alignment: "left" as const,
    },
    {
        id: 2,
        title: "Flavors that Inspire",
        description:
            "From classic vanilla to adventurous matcha and exotic mango-passion fruit, our diverse flavor palette celebrates both tradition and innovation. Each bite is a journey through taste and texture.",
        alignment: "right" as const,
    },
    {
        id: 3,
        title: "Shared Moments",
        description:
            "Momento is more than just a treat—it's about creating memories with those you love. Whether it's a summer day or a cozy evening, our mochi brings people together for moments worth savoring.",
        alignment: "left" as const,
    },
]

export default function RotatingModelSection() {
    const [isDesktop, setIsDesktop] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const width = useWidth()

    useEffect(() => {
        const checkDesktop = () => {
            setIsDesktop(width >= 1024)
        }

        checkDesktop()
        window.addEventListener("resize", checkDesktop)

        return () => window.removeEventListener("resize", checkDesktop)
    }, [width])

    return (
        <div
            ref={containerRef}
            className={`cube-scroll-container relative bg-[#fce7e9] ${isDesktop ? 'h-[300vh]' : 'h-auto'}`}
        >
            {isDesktop ? (
                // Desktop Layout
                <>
                    {/* Sticky 3D Cube Container - Always Center */}
                    <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center z-0 cube-scroll-wrapper">
                        <div className="w-full h-full max-w-[100vw]">
                            <ModelScene />
                        </div>
                    </div>

                    {/* Scrolling Content Overlay */}
                    <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
                        {sections.map((section, index) => (
                            <div
                                key={section.id}
                                className={`h-screen w-full flex items-end pb-24 px-12 lg:px-24 pointer-events-auto
                                ${index % 2 === 0 ? 'justify-start' : 'justify-end'}
                                `}
                            >
                                <div className="max-w-lg  backdrop-blur-sm p-8 rounded-2xl ">
                                    <Reveal
                                        rotate={false}
                                        // delay={-0.5}
                                    >
                                        <h2 className="text-4xl uppercase trispace-font  lg:text-7xl font-bold text-primary mb-4 trispace-font">
                                            {section.title}
                                        </h2>
                                    </Reveal>
                                    <p className="text-lg lg:text-2xl sriracha-regular text-primary/80 leading-relaxed">
                                        {section.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                // Mobile Layout
                <div className="flex flex-col">
                    {/* Mobile 3D Cube */}
                    <div className="h-[50vh] w-full relative z-0 opacity-100">
                        <ModelScene />
                    </div>

                    {/* Mobile Content */}
                    <div className=" px-6 space-y-16 relative z-10  pb-12">
                        {sections.map((section) => (
                            <div
                                key={section.id}
                                className="backdrop-blur-md p- rounded-xl"
                            >
                                <h2 className="text-3xl font-bold text-primary mb-3 trispace-font">
                                    {section.title}
                                </h2>
                                <p className="text-base text-primary/80 leading-relaxed">
                                    {section.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}