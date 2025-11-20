'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './page.module.css'

interface Shot {
  id: number
  title: string
  description: string
  narration?: string
}

const shots: Shot[] = [
  {
    id: 1,
    title: 'Scene 1, Shot 1',
    description: 'Aerial wide shot of a modern city under heavy midnight rain; skyscrapers shrouded in haze as neon signs glow faintly. Camera slowly pans across glistening rooftops, setting a somber, lonely mood.',
  },
  {
    id: 2,
    title: 'Scene 1, Shot 2',
    description: 'Street-level view outside Elara\'s apartment building: rainwater cascades off awnings, puddles reflecting red and blue city lights. A lone car splashes past, emphasizing the emptiness.',
    narration: 'In a city of endless rain, a young writer named Elara feels her hope for tomorrow washing away.',
  },
  {
    id: 3,
    title: 'Scene 1, Shot 3',
    description: 'Wide shot inside a small apartment: cluttered with crumpled papers, dim lamp casting shadows. Elara sits hunched at her desk by the window, rain streaking the glass behind her.',
  },
  {
    id: 4,
    title: 'Scene 1, Shot 4',
    description: 'Over-the-shoulder shot of Elara staring at a blank page in her notebook, a defeated expression on her face. Her hand grips a pen, unmoving, as thunder rumbles softly in the distance.',
  },
  {
    id: 5,
    title: 'Scene 1, Shot 5',
    description: 'Close-up on Elara\'s face, illuminated by the cold glow of her desk lamp. Rain droplets on the window behind her blur into bokeh, reflecting her internal storm.',
  },
]

export default function Home() {
  const [currentShot, setCurrentShot] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Initialize audio context for rain ambience
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio()
      audioRef.current.loop = true
      audioRef.current.volume = 0.3
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  useEffect(() => {
    if (isAutoPlaying) {
      const timer = setTimeout(() => {
        if (currentShot < shots.length - 1) {
          setCurrentShot(currentShot + 1)
        } else {
          setIsAutoPlaying(false)
        }
      }, 6000)
      return () => clearTimeout(timer)
    }
  }, [currentShot, isAutoPlaying])

  const handleNext = () => {
    if (currentShot < shots.length - 1) {
      setCurrentShot(currentShot + 1)
    }
  }

  const handlePrev = () => {
    if (currentShot > 0) {
      setCurrentShot(currentShot - 1)
    }
  }

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
  }

  return (
    <main className={styles.main}>
      <div className={styles.rain}>
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className={styles.drop}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${0.5 + Math.random() * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className={styles.container} ref={containerRef}>
        <header className={styles.header}>
          <h1>Rain City</h1>
          <p className={styles.subtitle}>A Cinematic Journey</p>
        </header>

        <div className={styles.shotContainer}>
          <div className={styles.shotCard}>
            <div className={styles.shotVisual}>
              <div className={`${styles.visualContent} ${styles[`shot${shots[currentShot].id}`]}`}>
                <div className={styles.filmGrain} />
              </div>
            </div>

            <div className={styles.shotInfo}>
              <h2 className={styles.shotTitle}>{shots[currentShot].title}</h2>
              <p className={styles.shotDescription}>{shots[currentShot].description}</p>
              {shots[currentShot].narration && (
                <div className={styles.narration}>
                  <span className={styles.narrationLabel}>Narration:</span>
                  <p className={styles.narrationText}>{shots[currentShot].narration}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.controls}>
          <button
            className={styles.button}
            onClick={handlePrev}
            disabled={currentShot === 0}
          >
            ← Previous
          </button>

          <div className={styles.progress}>
            <span className={styles.shotCounter}>
              {currentShot + 1} / {shots.length}
            </span>
            <div className={styles.progressBar}>
              {shots.map((_, index) => (
                <div
                  key={index}
                  className={`${styles.progressSegment} ${
                    index <= currentShot ? styles.progressSegmentActive : ''
                  }`}
                  onClick={() => setCurrentShot(index)}
                />
              ))}
            </div>
          </div>

          <button
            className={`${styles.button} ${isAutoPlaying ? styles.buttonActive : ''}`}
            onClick={toggleAutoPlay}
          >
            {isAutoPlaying ? '⏸ Pause' : '▶ Play'}
          </button>

          <button
            className={styles.button}
            onClick={handleNext}
            disabled={currentShot === shots.length - 1}
          >
            Next →
          </button>
        </div>

        <div className={styles.timeline}>
          {shots.map((shot, index) => (
            <button
              key={shot.id}
              className={`${styles.timelineItem} ${
                index === currentShot ? styles.timelineItemActive : ''
              }`}
              onClick={() => setCurrentShot(index)}
            >
              <div className={styles.timelineNumber}>{shot.id}</div>
              <div className={styles.timelineName}>{shot.title}</div>
            </button>
          ))}
        </div>
      </div>
    </main>
  )
}
