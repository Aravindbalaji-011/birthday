import { useEffect, useRef, useState } from "react";
import "./App.css";

const BIRTHDAY = new Date("2026-10-23T00:00:00+05:30");

function getTimeLeft() {
  const difference = Math.max(0, BIRTHDAY.getTime() - Date.now());

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    finished: difference === 0,
  };
}

function App() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    const audio = audioRef.current;

    if (audio) {
      audio.volume = 0.7;

      audio.play().catch(() => {
        setIsPlaying(false);
      });
    }

    return () => clearInterval(timer);
  }, []);

  async function toggleMusic() {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
      } catch (error) {
        console.error("Music playback failed:", error);
      }
    } else {
      audio.pause();
    }
  }

  return (
    <main className="birthday-page">
      <div className="soft-glow glow-one" />
      <div className="soft-glow glow-two" />

      <section className="countdown-card">
        <div className="heart-decoration" aria-hidden="true">
          ♡
        </div>

        <p className="eyebrow">
          A LITTLE COUNTDOWN FOR SOMEONE SPECIAL
        </p>

        <div className="flower-decoration" aria-hidden="true">
          🌸 ✿ 🌷
        </div>

        {timeLeft.finished ? (
          <>
            <h1 className="birthday-title">
              It's your special day!
            </h1>

            <p className="birthday-message">
              Happy Birthday, my love ♡
            </p>
          </>
        ) : (
          <>
            <h1 className="birthday-title">
              Something beautiful is coming...
            </h1>

            <p className="birthday-message">
              Counting every second until your special day.
            </p>

            <div
              className="countdown-grid"
              aria-label="Time remaining until the birthday"
            >
              <TimeBox value={timeLeft.days} label="Days" />
              <TimeBox value={timeLeft.hours} label="Hours" />
              <TimeBox value={timeLeft.minutes} label="Minutes" />
              <TimeBox value={timeLeft.seconds} label="Seconds" />
            </div>

            <p className="date-note">
              Until October 23, 2026
            </p>
          </>
        )}

        <div className="divider">
          <span>♡</span>
        </div>

        <p className="bottom-message">
          Made with love, just for you.
        </p>

        <p className="signature">
          Someone who loves you ♡
        </p>
      </section>

      <audio
        ref={audioRef}
        src="/birthday-song.mp3"
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <button
        type="button"
        className={`music-button ${isPlaying ? "playing" : ""}`}
        onClick={toggleMusic}
        aria-label={
          isPlaying ? "Pause birthday song" : "Play birthday song"
        }
      >
        <span className="music-icon" aria-hidden="true">
          {isPlaying ? "Ⅱ" : "♫"}
        </span>

        <span>
          {isPlaying ? "Pause our song" : "Play our song"}
        </span>

        {isPlaying && (
          <span className="music-heart" aria-hidden="true">
            ♡
          </span>
        )}
      </button>

      <footer className="page-footer">
        A little love, wrapped in a countdown ♡
      </footer>
    </main>
  );
}

function TimeBox({ value, label }) {
  return (
    <div className="time-box">
      <span className="time-value">
        {String(value).padStart(2, "0")}
      </span>

      <span className="time-label">
        {label}
      </span>
    </div>
  );
}

export default App;