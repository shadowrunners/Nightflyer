import { AnimatePresence, motion } from 'framer-motion';
import { styles } from "../../../utils/utils";
import { Button } from '@chakra-ui/react';
import React, { useState, useRef, useEffect } from 'react';

const Hero = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
  <section id="home" className={`flex md:flex-row flex-col h-screen text-center`}>
    <img src='https://res.cloudinary.com/shadowrunners/image/upload/q_auto/evelyn/shadowlyn.webp' className='absolute inset-0 w-full h-full object-cover opacity-40 z-0' alt='coolbg' />
    <div className="absolute bottom-0 h-[270px] w-full xl:left-[0px] bg-gradient-to-b from-transparent to-black" />

    <div
      className={`flex-1 ${styles.flexCenter} xl:mb-[140px] flex-col xl:px-0 sm:px-16 px-6 relative mt-[-200px] text-center`}
    >
        <AnimatePresence>
          <motion.h1
            ref={ref}
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ delay: 1.0 }}
            className={`${styles.heading2}`}
          >
            Unleash the <span className='text-gradient'>full potential</span> of your server.
          </motion.h1>
          <motion.p
            ref={ref}
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ delay: 1.3 }}
            className={`${styles.paragraph} max-w-[470px] mt-5`}
          >
            With Evelyn, the possibilities you've always dreamed of are instantly unlocked. Completely free of charge.
          </motion.p>
          <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ delay: 1.6 }}
          >
            <Button className='mt-5'>Get Started</Button>
          </motion.div>
        </AnimatePresence>
    </div>
  </section>
  )
}

export default Hero;
