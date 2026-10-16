
import { useEffect, useState } from "react";
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

export default function App() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const countdownItems = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <main className="timer-page">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <div className="decor decor-top-left">✿</div>
      <div className="decor decor-top-right">♡</div>
      <div className="decor decor-bottom-left">♡</div>
      <div className="decor decor-bottom-right">✿</div>

      <section className="timer-content">
        <div className="heart-emblem">
          <span>♥</span>
        </div>

        <p className="top-label">A SPECIAL DAY IS APPROACHING</p>

        <h1>
          Counting down
          <br />
          <span>to your birthday</span>
        </h1>

        <p className="subtitle">
          For the girl who makes every day feel a little more beautiful.
        </p>

        <div className="floral-divider">
          <span />
          <b>✿</b>
          <span />
        </div>

        {time.finished ? (
          <div className="birthday-reached">
            <span className="celebration-heart">♡</span>
            <h2>It's your special day!</h2>
            <p>Happy Birthday, my love.</p>
          </div>
        ) : (
          <div className="countdown">
            {countdownItems.map((item) => (
              <div className="time-unit" key={item.label}>
                <div className="number-card">
                  <span className="number">
                    {String(item.value).padStart(2, "0")}
                  </span>
                </div>
                <span className="unit-label">{item.label}</span>
              </div>
            ))}
          </div>
        )}

        <div className="date-pill">
          <span className="calendar-icon">♡</span>
          <span>OCTOBER 23, 2026</span>
        </div>

        <p className="bottom-message">
          Every second brings us closer to your day.
        </p>

        <div className="signature">Made with love, just for you ♡</div>
      </section>
    </main>
  );
}
