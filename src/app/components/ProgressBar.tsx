'use client'

import React, { useState } from 'react'
import {useScroll, motion, useTransform, useSpring} from 'framer-motion'

export default function ProgressBar() {
  const [viewport, setViewport] = useState(innerHeight)
  const { scrollYProgress } = useScroll(0)    
  const scaleX = useTransform(scrollYProgress, [0,1], [0, viewport])
  const spring = useSpring(scaleX)

    addEventListener('resize', () => {
        setViewport(innerHeight)
    })

  return <motion.div 
  className="progress-bar"
  style={{height: spring}}
  />;
}
