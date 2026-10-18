
import { useEffect, useRef, useState } from "react";
import "./App.css";
import BirthdayHome from "./BirthdayHome";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [introPhase, setIntroPhase] = useState("start");
  const [countdown, setCountdown] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!showIntro) return;

    const timers = [];

    timers.push(
      setTimeout(() => setIntroPhase("reveal"), 100)
    );

    // Show 5, 4, 3, 2, 1 near the end of the intro.
    timers.push(
      setTimeout(() => setCountdown(5), 3500)
    );

    [4, 3, 2, 1, 0].forEach((number, index) => {
      timers.push(
        setTimeout(() => setCountdown(number), 4300 + index * 650)
      );
    });

    timers.push(
      setTimeout(() => setIntroPhase("exit"), 7600)
    );

    timers.push(
      setTimeout(() => setShowIntro(false), 8500)
    );

    return () => timers.forEach(clearTimeout);
  }, [showIntro]);

  async function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
      } catch (error) {
        console.error("Could not play birthday music:", error);
      }
    } else {
      audio.pause();
    }
  }

  function skipIntro() {
    setShowIntro(false);
  }

  return (
    <main className="birthday-page">
      <div className="soft-glow glow-one" aria-hidden="true" />
      <div className="soft-glow glow-two" aria-hidden="true" />

      {!showIntro && <BirthdayHome />}

      {showIntro && (
        <section
          className={`cinema-intro intro-${introPhase}`}
          aria-label="PAVIII cinematic introduction"
        >
          <div className="intro-grain" aria-hidden="true" />
          <div className="intro-red-sweep" aria-hidden="true" />
          <div className="intro-light intro-light-one" aria-hidden="true" />
          <div className="intro-light intro-light-two" aria-hidden="true" />

          <div className="intro-ring intro-ring-one" aria-hidden="true" />
          <div className="intro-ring intro-ring-two" aria-hidden="true" />

          <div className="intro-content">
            <p className="intro-studio">
              A SPECIAL PRESENTATION
            </p>

            <h1 className="paviii-wordmark" aria-label="PAVIII">
              {"Pavithra".split("").map((letter, index) => (
                <span
                  key={`${letter}-${index}`}
                  style={{ "--i": index }}
                >
                  {letter}
                </span>
              ))}
            </h1>

            <div className="paviii-heart" aria-hidden="true">
              ♡
            </div>

            <p className="paviii-tagline">
              A SPECIAL WORLD FOR YOU
            </p>
          </div>

          {countdown !== null && countdown > 0 && (
            <div className="intro-countdown" key={countdown}>
              <span className="countdown-label">
                THE STORY BEGINS IN
              </span>
              <span className="countdown-number">
                {countdown}
              </span>
              <span className="countdown-line" />
            </div>
          )}

          {countdown === 0 && (
            <div className="intro-countdown countdown-finale" key="finale">
              <span className="countdown-label">
                WELCOME TO HER WORLD
              </span>
              <span className="countdown-heart" aria-hidden="true">
                ♡
              </span>
            </div>
          )}

          <div className="intro-bottom">
            <span className="intro-made-with-love">
              MADE WITH LOVE <span aria-hidden="true">♡</span>
            </span>

            <button
              type="button"
              className="intro-skip"
              onClick={skipIntro}
            >
              SKIP INTRO <span aria-hidden="true">↗</span>
            </button>
          </div>
        </section>
      )}

      <audio
        ref={audioRef}
        src="/birthday-song.mp3"
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      {!showIntro && (
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
      )}
    </main>
  );
}
