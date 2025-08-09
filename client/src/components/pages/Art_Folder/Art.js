import React, { useState, useEffect } from 'react'
import Pieces from './Pieces_All'
import { API } from '../../../apiConfig' // <-- use API (with /api prefix)

const title = {
  fontSize: '40px',
  textAlign: 'center',
  margin: '38px 0px 20px 0px',
}
const subtitle = {
  fontSize: '20px',
  textAlign: 'center',
  width: '720px',
  margin: '0 auto',
  paddingBottom: '20px',
}

const Art = () => {
  const [art, setArt] = useState([])

  useEffect(() => {
    const controller = new AbortController()
    const url = `${API}/pieces`

    ;(async () => {
      try {
        const res = await fetch(url, { signal: controller.signal })
        if (!res.ok) {
          const text = await res.text().catch(() => '')
          throw new Error(`HTTP ${res.status} ${res.statusText} – ${text}`)
        }
        const foundPieces = await res.json()
        setArt(foundPieces?.pieces ?? [])
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Fetch /pieces failed:', err)
        }
      }
    })()

    return () => controller.abort()
  }, [])

  const pieces = art.map(a => (
    <Pieces
      key={a._id}
      title={a.title}
      artist={a.artist}
      imgUrl={a.imgUrl}
      description={a.description}
    />
  ))

  return (
    <div>
      <h1 style={title}>The Collection</h1>
      <p style={subtitle}>
        Browse a portion of our collection below- the possibilities are endless!
        Once you create a profile, you can list keywords to begin filtering the artwork by style.
      </p>
      <div className="row">{pieces}</div>
    </div>
  )
}

export default Art
