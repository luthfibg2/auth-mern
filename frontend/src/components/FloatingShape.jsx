import React from 'react'
import { motion } from 'framer-motion'


const FloatingShape = ({ color, size, top, left, delay }) => {
  return (
    <motion.div
    className={`absolute rounded-full opacity-20 blur-xl ${color} ${size}`}
    style={{ top, left }}
    animate={{ 
        y: ['0%', '100%', '0%'],
        x: ['0%', '100%', '0%'],
        // scale: [1, 1.5, 1],
        rotate: [0, 360],
     }}
    transition={{ 
        duration: 10,
        repeat: Infinity,
        ease: 'linear',
        delay
     }}
     aria-hidden='true'
    />
  )
}

export default FloatingShape