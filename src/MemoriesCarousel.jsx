
import React, { useState, useRef } from "react";
import "./MemoriesCarousel.css";

const memories = Array.from({ length: 24 }, (_, index) => ({
  image: `/memories/photo${index + 1}.jpg`,
  date: `Memory ${String(index + 1).padStart(2, "0")}`,
  caption: [
    "Cuteee Pavithraa 💗",
    "thiritu pavithra(stole my heart)✨",
    "Working Pavithraa🌸",
    "Dancing Pavithraa 💕",
    "I am with pavithraaa🎀",
    "Laughing Pavithraaaa(cute)💖",
    "Fallen for Pavithraa 🌷",
    "smart and coll pavithraa🩷",
    "Rizz with Pavithraaa✨",
    "Minikifying pavithraaa 💝",
    "Studying pavithraaa🌸",
    "Thinking Pavithraa (lovelyy)🎨",
    "Foreign Pavithraaa 💗",
    "Passport size pavithraa(wowww) 🫶",
    "Dr pavithraa 💕",
    "Shocking with pavithraa💖",
    "Moraching pavithraa✨",
    "cleaning pavithraa(beautiful)🌷",
    "Attractive Pavithraa 🩷",
    "Musician pavihtraa 🎀",
    "Bluffing pavithraa💗",
    "Sexyy pavithraa💞",
    "Sleepy cute pavithraa🌸",
    "Standing devotional Pavithraa🎂",
  ][index],
}));

export default function MemoriesCarousel() {
  const [active, setActive] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const frameRef = useRef(null);
  const touchStartX = useRef(0);

  const previous = () => {
    setActive((current) => (current - 1 + memories.length) % memories.length);
    setTilt({ x: 0, y: 0 });
  };

  const next = () => {
    setActive((current) => (current + 1) % memories.length);
    setTilt({ x: 0, y: 0 });
  };

  const getMemory = (offset) =>
    memories[(active + offset + memories.length) % memories.length];

  const handleMouseMove = (event) => {
    if (!frameRef.current) return;

    const rect = frameRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    setTilt({
      x: (0.5 - y) * 12,
      y: (x - 0.5) * 12,
    });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") previous();
    if (event.key === "ArrowRight") next();
  };

  return (
    <section
      className="memories-carousel-section"
      id="memories"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Memories photo carousel"
    >
      <header className="memories-heading">
        <span className="memories-eyebrow">
          LITTLE MOMENTS, BIG FEELINGS
        </span>

        <h2>
          Beautiful <span>Memories</span> 💖
        </h2>

        <p>
          Every picture tells a story, and my favourite stories
          have you in them.
        </p>
      </header>

      <div
        className="memories-carousel"
        onTouchStart={(event) => {
          touchStartX.current = event.touches[0].clientX;
        }}
        onTouchEnd={(event) => {
          const distance =
            event.changedTouches[0].clientX - touchStartX.current;

          if (distance > 50) previous();
          if (distance < -50) next();
        }}
      >
        <button
          type="button"
          className="memory-slide memory-slide-side memory-slide-left"
          onClick={previous}
          aria-label="Show previous memory"
        >
          <img src={getMemory(-1).image} alt={getMemory(-1).caption} />
        </button>

        <article className="memory-slide memory-slide-center" key={active}>
          <div
            className="memory-photo-frame"
            ref={frameRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={resetTilt}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            }}
          >
            <img
              src={memories[active].image}
              alt={memories[active].caption}
              className="memory-main-image"
              draggable="false"
            />

            <span className="memory-heart-decoration" aria-hidden="true">
              ♡
            </span>
          </div>

          <div className="memory-caption-box">
            <span className="memory-date">{memories[active].date}</span>
            <h3>{memories[active].caption}</h3>
            <span className="memory-caption-heart" aria-hidden="true">
              ♥
            </span>
          </div>
        </article>

        <button
          type="button"
          className="memory-slide memory-slide-side memory-slide-right"
          onClick={next}
          aria-label="Show next memory"
        >
          <img src={getMemory(1).image} alt={getMemory(1).caption} />
        </button>
      </div>

      <div className="memories-carousel-controls">
        <button
          type="button"
          className="memory-arrow"
          onClick={previous}
          aria-label="Previous memory"
        >
          ←
        </button>

        <div className="memory-pagination" aria-live="polite">
          <span className="memory-current-number">
            {String(active + 1).padStart(2, "0")}
          </span>

          <span className="memory-pagination-line" />

          <span className="memory-total-number">
            {String(memories.length).padStart(2, "0")}
          </span>
        </div>

        <button
          type="button"
          className="memory-arrow"
          onClick={next}
          aria-label="Next memory"
        >
          →
        </button>
      </div>

      <p className="memories-footer">
        Made with love, just for you, Paviii ✨
      </p>
    </section>
  );
}
