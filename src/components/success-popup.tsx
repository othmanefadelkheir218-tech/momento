"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { X } from "lucide-react"
import CostumButton from "./CostumButton"

interface SuccessPopupProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  message?: string
}

export function SuccessPopup({
  isOpen,
  onClose,
  title = "DONE: YOUR REQUEST IS BEING PROCESSED",
  message = "We have sent the form to be filled out to your email address. Rest assured that your responses will be reviewed soon. Thank you for participating in this true adventure!",
}: SuccessPopupProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      // Animate in
      gsap.set(overlayRef.current, { display: "flex" })
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" })
      gsap.fromTo(
        popupRef.current,
        { opacity: 0, scale: 0.8, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" },
      )
    } else {
      // Animate out
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(overlayRef.current, { display: "none" })
        },
      })
    }
  }, [isOpen])

  const handleClose = () => {
    gsap.to(popupRef.current, {
      opacity: 0,
      scale: 0.8,
      y: 50,
      duration: 0.3,
      ease: "power2.in",
    })
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      delay: 0.1,
      ease: "power2.in",
      onComplete: onClose,
    })
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 hidden items-center justify-center bg-primaryLighter/40 backdrop-blur-sm px-4"
      onClick={handleClose}
    >
      {/* Decorative background text */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 right-0 text-primaryLighter/30 text-[8vw] font-bold whitespace-nowrap">
          SOON? THEN THERE IS AN
        </div>
      </div>

      <div
        ref={popupRef}
        className="relative bg-white max-w-md w-full px-8 py-10 md:p-12 text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <div className="absolute top-2 right-4">
          <CostumButton
            onClick={handleClose}
            backgroundColor="#DB212F"
            hoverTextColor="white"
            className=" w-[40px] h-[40px] rounded-none bg-white text-primary border-primary border"
          >
            <X size={20} />
          </CostumButton>

        </div>

        {/* Content */}
        <h3 className="text-2xl md:text-3xl font-bold text-primary my-6 leading-tight">{title}</h3>

        <p className="text-primary/70 mb-8 leading-relaxed">{message}</p>

        {/* Home button */}
        <div className="w-full flex justify-center">
          <CostumButton
            onClick={handleClose}
            backgroundColor="#DB212F"
            hoverTextColor="white"
            className="w-[100px] h-[50px] rounded-none bg-white text-primary border-primary border"
          >
            <p className="font-bold">
              Home
            </p>
          </CostumButton>
        </div>
      </div>
    </div>
  )
}
