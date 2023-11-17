'use client'
import { useRef, useEffect } from 'react';
import styles from './style.module.css'
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const phrases = [
    "The sun, the star at the center of our solar system, holds a position of profound significance within the Milky Way galaxy.",
]


export default function Home() {
    const path = useRef(null);
    let progress = 0;
    let x = 0.5;
    let time = Math.PI / 2;
    let reqId = null;

    //   useEffect(() => {
    //     setPath(progress);
    //   }, [])

    //   const setPath = (progress) => {
    //     const width = window.innerWidth * 0.7;
    //     path.current.setAttributeNS(null, "d", `M0 250 Q${width * x} ${250 + progress}, ${width} 250`)
    //   }

    const lerp = (x, y, a) => x * (1 - a) + y * a

    const manageMouseEnter = () => {
        if (reqId) {
            cancelAnimationFrame(reqId)
            resetAnimation()
        }
    }

    const manageMouseMove = (e) => {
        const { movementY, clientX } = e;
        const pathBound = path.current.getBoundingClientRect();
        x = (clientX - pathBound.left) / pathBound.width;
        progress += movementY
        setPath(progress);
    }

    const manageMouseLeave = () => {
        animateOut();
    }

    const animateOut = () => {
        const newProgress = progress * Math.sin(time);
        progress = lerp(progress, 0, 0.025);
        time += 0.2;
        setPath(newProgress);
        if (Math.abs(progress) > 0.75) {
            reqId = requestAnimationFrame(animateOut);
        }
        else {
            resetAnimation();
        }
    }

    const resetAnimation = () => {
        time = Math.PI / 2;
        progress = 0;
    }


    const container = useRef(null);
    const stickyMask = useRef(null);
    const initialMaskSize = .8;
    const targetMaskSize = 30;
    const easing = 0.15;
    let easedScrollProgress = 0;

    useEffect(() => {
        requestAnimationFrame(animate)
    }, [])

    const animate = () => {
        const maskSizeProgress = targetMaskSize * getScrollProgress();
        stickyMask.current.style.webkitMaskSize = (initialMaskSize + maskSizeProgress) * 100 + "%";
        requestAnimationFrame(animate)
    }

    const getScrollProgress = () => {
        const scrollProgress = stickyMask.current.offsetTop / (container.current.getBoundingClientRect().height - window.innerHeight)
        const delta = scrollProgress - easedScrollProgress;
        easedScrollProgress += delta * easing;
        return easedScrollProgress
    }

    return (
        <div className={styles.mainn}>
            <div ref={container} className={styles.container}>
                <div ref={stickyMask} className={styles.stickyMask}>
                    <video autoPlay muted loop>
                        <source src="/medias/sun.mp4" type="video/mp4" />
                    </video>
                </div>
            </div>
            <div className={styles.container}>
                <MaskText />
            </div>
        </div>
    )
}

export function MaskText() {

    const animation = {
        initial: { y: "100%" },
        enter: i => ({ y: "0", transition: { duration: 0.75, ease: [0.33, 1, 0.68, 1], delay: 0.075 * i } })
    }

    const { ref, inView, entry } = useInView({
        threshold: 0.75,
        triggerOnce: true
    });

    return (
        <div ref={ref} className={styles.body}>
            {
                phrases.map((phrase, index) => {
                    return <div key={index} className={styles.lm}>
                        <motion.p custom={index} variants={animation} initial="initial" animate={inView ? "enter" : ""}>{phrase}</motion.p>
                    </div>
                })
            }
        </div>
    )
}