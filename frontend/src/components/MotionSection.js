import React from 'react';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06, duration: 0.5 } }
};

export default function MotionSection({ children, className = '' }){
  return (
    <motion.section className={className} variants={container} initial="hidden" animate="show" exit="hidden">
      {children}
    </motion.section>
  );
}
