import React from 'react'
import { motion } from 'framer-motion'

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-cadmium-800 to-cadmium-900 flex items-center justify-center relative overflow-hidden">

        {/* Orbital spinner animation */}
        <div className="relative w-24 h-24">
          {/* Outer circle */}
          <motion.div
            className="absolute w-full h-full rounded-full border-4 border-cadmium-300/20"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Spinning arc 1 */}
          <motion.div
            className="absolute w-full h-full rounded-full border-t-4 border-l-4 border-cadmium-500"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Spinning arc 2 (opposite direction) */}
          <motion.div
            className="absolute w-5/6 h-5/6 m-auto inset-0 rounded-full border-b-4 border-r-4 border-cadmium-400"
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Center dot that pulses */}
          <motion.div 
            className="absolute inset-0 m-auto w-3 h-3 bg-cadmium-500 rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
    </div>
  )
}

export default LoadingSpinner