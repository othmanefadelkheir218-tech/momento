"use client"

import { useRef, useEffect, useState, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { PerspectiveCamera, Text3D, Center } from "@react-three/drei"
import * as THREE from "three"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import useWidth from "@/hooks/Width"
import { Reveal } from "../animation/Reveal"
import { useTranslations } from "next-intl"

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
                    font="/fonts/helvetiker_regular.typeface.json"
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
        <Canvas
            className="w-full h-full"
            style={{ width: "100%", height: "100%" }}
        >
            {/* <OrbitControls /> */}
            <PerspectiveCamera
                makeDefault position={[0, 0, 8]}
                rotation={[0, 0.0, 0]}
            />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} />
            <Suspense fallback={null}>
                <RotatingModel />
            </Suspense>
        </Canvas>
    )
}




export default function RotatingModelSection() {
    const [isDesktop, setIsDesktop] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const width = useWidth()
    const t = useTranslations("HomePage.Features");


    // Section content data
    const sections = [
        {
            id: 1,
            title: t("section1.title"),
            description: t("section1.description"),
            alignment: "left" as const,
        },
        {
            id: 2,
            title: t("section2.title"),
            description: t("section2.description"),
            alignment: "right" as const,
        },
        {
            id: 3,
            title: t("section3.title"),
            description: t("section3.description"),
            alignment: "left" as const,
        },
    ];


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