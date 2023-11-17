'use client'
import { useRef, useEffect } from 'react';
import styles from './page.module.css'

export default function Home() {
  const path = useRef(null);
  let progress = 0;
  let x = 0.5;
  let time = Math.PI / 2;
  let reqId = null;

  // useEffect(() => {
  //   setPath(progress);
  // }, [])

  // const setPath = (progress) => {
  //   const width = window.innerWidth * 0.7;
  //   path.current.setAttributeNS(null, "d", `M0 250 Q${width * x} ${250 + progress}, ${width} 250`)
  // }

  const lerp = (x, y, a) => x * (1 - a) + y * a

  const manageMouseEnter = () => {
    if(reqId){
      cancelAnimationFrame(reqId)
      resetAnimation()
    }
  }

  const manageMouseMove = (e) => {
    const { movementY, clientX } = e;
    const pathBound =  path.current.getBoundingClientRect();
    x = (clientX - pathBound.left) / pathBound.width;
    progress+= movementY
    setPath(progress);
  }

  const manageMouseLeave = () => {
    animateOut();
  }

  const animateOut = () => {
    const newProgress = progress * Math.sin(time);
    progress = lerp(progress, 0, 0.025);
    time+=0.2;
    setPath(newProgress);
    if(Math.abs(progress) > 0.75){
      reqId = requestAnimationFrame(animateOut);
    }
    else{
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

  useEffect( () => {
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
            <source src="/medias/space.mp4" type="video/mp4"/>
          </video>
        </div>
       
      </div>
      
    </div>
  )
}
// import React, { useState, useLayoutEffect, useRef } from 'react'
// import styles from './style.module.css';
// import Image from 'next/image';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// const projects = [
//     {
//         title: "Salar de Atacama",
//         src: "salar_de_atacama.jpg"
//     },
//     {
//         title: "Valle de la luna",
//         src: "valle_de_la_muerte.jpeg"
//     },
//     {
//         title: "Miscanti Lake",
//         src: "miscani_lake.jpeg"
//     },
//     {
//         title: "Miniques Lagoons",
//         src: "miniques_lagoon.jpg"
//     },
// ]

// export default function Index() {

//     const [selectedProject, setSelectedProject] = useState(0);
//     const container = useRef(null);
//     const imageContainer = useRef(null);

//     useLayoutEffect( () => {
//         gsap.registerPlugin(ScrollTrigger);
//         ScrollTrigger.create({
//             trigger: imageContainer.current,
//             pin: true,
//             start: "top-=100px",
//             end: document.body.offsetHeight - window.innerHeight - 50,
//         })
//     }, [])

//     return (
//         <div ref={container} className={styles.projects}>
//             <div className={styles.projectDescription}>
//                 <div ref={imageContainer} className={styles.imageContainer}>
//                     <Image 
//                         src={`/images/${projects[selectedProject].src}`}
//                         fill={true}
//                         alt="project image"
//                         priority={true}
//                     />
//                 </div>
//                 <div className={styles.column}>
//                    <h1 className=' text-4xl'>Hello</h1>
//                 </div>
//                 <div className={styles.column}>
//                     <p>Some, like the southern viscacha, vicuña and Darwins rhea, are classified as endangered species. Others, such as Andean goose, horned coot, Andean gull, puna tinamou and the three flamingo species inhabiting in Chile (Andean flamingo, Chilean flamingo, and Jamess flamingo) are considered vulnerable.</p>
//                 </div>
//             </div>

//             <div className={styles.projectList}>
//                 {
//                     projects.map( (project, index) => {
//                         return <div key={index} onMouseOver={() => {setSelectedProject(index)}} className={styles.projectEl}>
//                             <h2>{project.title}</h2>
//                         </div>
//                     })
//                 }
//             </div>
//         </div>
//     )
// }
