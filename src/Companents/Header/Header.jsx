
import React, { useEffect, useRef } from 'react'
import './Header.css'

const Header = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    let animationFrame
    let progress = 0
    let letterProgress = 0

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1

      canvas.width = canvas.clientWidth * dpr
      canvas.height = canvas.clientHeight * dpr

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const threads = 650

    const drawHeart = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight

      ctx.clearRect(0, 0, w, h)

      const scale = Math.min(w / 38, h / 34)
      const cx = w / 2
      const cy = h / 2 + 25

      // YURAK ANIMATSIYASI
      for (let i = 0; i < threads * progress; i++) {
        const t = (i / threads) * Math.PI * 2

        const hx = 16 * Math.pow(Math.sin(t), 3)

        const hy =
          13 * Math.cos(t) -
          5 * Math.cos(2 * t) -
          2 * Math.cos(3 * t) -
          Math.cos(4 * t)

        const endX = cx + hx * scale
        const endY = cy - hy * scale

        const seed = Math.sin(i * 127.1) * 43758.5453
        const random = seed - Math.floor(seed)

        const startX =
          cx + (random - 0.5) * scale * 8

        const startY =
          cy + Math.sin(i * 4.2) * scale * 5

        const controlX =
          (startX + endX) / 2 +
          Math.sin(i * 0.7) * scale * 2

        const controlY =
          (startY + endY) / 2 -
          scale * (2 + random * 4)

        ctx.beginPath()
        ctx.moveTo(startX, startY)

        ctx.quadraticCurveTo(
          controlX,
          controlY,
          endX,
          endY
        )

        ctx.strokeStyle = `rgba(255, ${25 + random * 35}, ${75 + random * 70}, ${0.25 + random * 0.65})`

        ctx.lineWidth = 0.4 + random * 0.7
        ctx.shadowBlur = 5
        ctx.shadowColor = '#ff174f'

        ctx.stroke()
      }

      // R HARFI ANIMATSIYASI
      if (progress >= 1) {
        letterProgress = Math.min(
          letterProgress + 0.018,
          1
        )

        ctx.save()

        ctx.globalAlpha = letterProgress

        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'

        const letterSize = Math.min(scale * 9, 110)

        ctx.font = `bold ${letterSize}px Georgia`

        // Kichikdan kattaga chiqish
        const letterScale = 0.3 + letterProgress * 0.7

        ctx.translate(cx, cy + 5)
        ctx.scale(letterScale, letterScale)

        ctx.shadowBlur = 30
        ctx.shadowColor = '#ff174f'

        ctx.strokeStyle = '#ff174f'
        ctx.lineWidth = 2

        ctx.strokeText('R', 0, 0)

        ctx.fillStyle = '#ffb6cb'
        ctx.fillText('R', 0, 0)

        ctx.restore()
      }

      ctx.shadowBlur = 0
    }

    const animate = () => {
      if (progress < 1) {
        progress += 0.006
        progress = Math.min(progress, 1)
      }

      drawHeart()

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <div className="header">

      <div className="love-text">
        I Love You Robiya ❤️
      </div>

      <canvas
        ref={canvasRef}
        className="heart-canvas"
      />

    </div>
  )
}

export default Header
