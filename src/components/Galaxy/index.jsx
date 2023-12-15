'use client';
import styles from './style.module.scss'
import { useState, useEffect, useRef } from 'react';
import Project from './components/project';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';

const projects = [
  {
    title: "Moon",
    src: "moon.jpg",
    color: "#8C8C8C",
    href: '/moon',

  },
  {
    title: "Stars",
    src: "stars.jpg",
    color: "#8C8C8C",
    href: '/stars',

  },
  {
    title: "Black Hole",
    src: "blackhole.jpg",
    color: "#000000",
    href: '/blackhole',

  },
  {
    title: "Sun",
    src: "sun.png",
    color: "#E55807",
    href: '/sun',
  },
  {
    title: "Mercury",
    src: "mercury.png",
    color: "#8C8C8C",
    href: '/mercury',

  },
  {
    title: "Venus",
    src: "venus.png",
    color: "#FFA41B",
    href: '/venus',

  },
  {
    title: "Earth",
    src: "earth.png",
    color: "#0C356A",
    href: '/earth',

  },
  {
    title: "Mars",
    src: "mars.png",
    color: "#E25E3E",
    href: '/mars',

  },
  {
    title: "Jupiter",
    src: "jupiter.png",
    color: "#8D7B68",
    href: '/jupiter',

  },
  {
    title: "Saturn",
    src: "saturn.png",
    color: "#EFE8D3",
    href: '/saturn',

  },
  {
    title: "Uranus",
    src: "uranus.png",
    color: "#33BBC5",
    href: '/uranus',

  },
  {
    title: "Neptune",
    src: "neptune.png",
    color: "#279EFF",
    href: '/neptune',

  },

]

const scaleAnimation = {
    initial: {scale: 0, x:"-50%", y:"-50%"},
    enter: {scale: 1, x:"-50%", y:"-50%", transition: {duration: 0.4, ease: [0.76, 0, 0.24, 1]}},
    closed: {scale: 0, x:"-50%", y:"-50%", transition: {duration: 0.4, ease: [0.32, 0, 0.67, 0]}}
}

export default function Home() {

  const [modal, setModal] = useState({active: false, index: 0})
  const { active, index } = modal;
  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  let xMoveContainer = useRef(null);
  let yMoveContainer = useRef(null);
  let xMoveCursor = useRef(null);
  let yMoveCursor = useRef(null);
  let xMoveCursorLabel = useRef(null);
  let yMoveCursorLabel = useRef(null);

  useEffect( () => {
    //Move Container
    xMoveContainer.current = gsap.quickTo(modalContainer.current, "left", {duration: 0.8, ease: "power3"})
    yMoveContainer.current = gsap.quickTo(modalContainer.current, "top", {duration: 0.8, ease: "power3"})
    //Move cursor
    xMoveCursor.current = gsap.quickTo(cursor.current, "left", {duration: 0.5, ease: "power3"})
    yMoveCursor.current = gsap.quickTo(cursor.current, "top", {duration: 0.5, ease: "power3"})
    //Move cursor label
    xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "left", {duration: 0.45, ease: "power3"})
    yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "top", {duration: 0.45, ease: "power3"})
  }, [])

  const moveItems = (x, y) => {
    xMoveContainer.current(x)
    yMoveContainer.current(y)
    xMoveCursor.current(x)
    yMoveCursor.current(y)
    xMoveCursorLabel.current(x)
    yMoveCursorLabel.current(y)
  }
  const manageModal = (active, index, x, y) => {
    moveItems(x, y)
    setModal({active, index})
  }

  return (
  <main onMouseMove={(e) => {moveItems(e.clientX, e.clientY)}} className={styles.projects}>
    <div className={styles.body}>
    {
  projects.map((project, index) => {
    return (
      // eslint-disable-next-line react/jsx-key
      <Link href={project.href} className={styles.body}>
          <Project index={index} key={index} title={project.title} manageModal={manageModal} />
      </Link>
    );
  })
}
    </div>
    <>
        <motion.div ref={modalContainer} variants={scaleAnimation} initial="initial" animate={active ? "enter" : "closed"} className={styles.modalContainer}>
            <div style={{top: index * -100 + "%"}} className={styles.modalSlider}>
            {
                projects.map( (project, index) => {
                const { src, color } = project
                return <div className={styles.modal} style={{backgroundColor: color}} key={`modal_${index}`}>
                    <Link href={project.href} key={index}>
                    <Image 
                    src={`/images/${src}`}
                    width={350}
                    height={0}
                    alt="image"
                    />
                     </Link>
                </div>
                })
            }
            </div>
        </motion.div>
        <motion.div ref={cursor} className={styles.cursor} variants={scaleAnimation} initial="initial" animate={active ? "enter" : "closed"}></motion.div>
        <motion.div ref={cursorLabel} className={styles.cursorLabel} variants={scaleAnimation} initial="initial" animate={active ? "enter" : "closed"}>View</motion.div>
    </>
  </main>
  )
}
