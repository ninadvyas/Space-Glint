'use client';
import { useEffect,useState } from 'react';
import styles from './page.module.css'
import Intro from '../components/Intro';
import Description from '../components/Description';
import Detail from '../components/Xdetails';
import { AnimatePresence } from 'framer-motion';
import Preloader from '../components/Preloader';
import Projects from '../components/Galaxy';

export default function Home() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect( () => {
    (
      async () => {
          const LocomotiveScroll = (await import('locomotive-scroll')).default
          const locomotiveScroll = new LocomotiveScroll();

          setTimeout( () => {
            setIsLoading(false);
            document.body.style.cursor = 'default'
            window.scrollTo(0,0);
          }, 2000)
      }
    )()
  }, [])

  useEffect( () => {
    (
      async () => {
          const LocomotiveScroll = (await import('locomotive-scroll')).default
          const locomotiveScroll = new LocomotiveScroll();
      }
    )()
  }, [])

  return (
      <main className={styles.main}>
<AnimatePresence mode='wait'>
        {/* {isLoading && <Preloader />} */}
      </AnimatePresence>
        <Detail/>
        <Description />
        <Projects />
        
      </main>
  )
}
