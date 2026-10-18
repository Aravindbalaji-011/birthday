
import { useState } from "react";
import "./BirthdayHome.css";
import MemoriesCarousel from "./MemoriesCarousel";

const pages = [
  { id: "home", label: "Home", icon: "⌂" },
  { id: "video", label: "Video", icon: "▣" },
  { id: "memories", label: "Memories", icon: "▧" },
  { id: "last", label: "For You", icon: "♡" },
];

const partyItems = [
  {
    emoji: "🎂",
    title: "Birthday Cake",
    description: "A sweet cake for the sweetest person.",
  },
  {
    emoji: "🎁",
    title: "Special Gift",
    description: "A little surprise, made with lots of love.",
  },
  {
    emoji: "🎈",
    title: "Party Time",
    description: "Today deserves all the happiness in the world.",
  },
  {
    emoji: "💐",
    title: "Flowers for You",
    description: "Sending you love, smiles, and beautiful moments.",
  },
];

function HeartShower() {
  const hearts = Array.from({ length: 34 }, (_, i) => ({
    id: i,
    left: `${(i * 37 + 11) % 100}%`,
    delay: `${(i * 0.47) % 9}s`,
    duration: `${7 + (i % 6)}s`,
    size: `${12 + (i % 5) * 4}px`,
  }));

  return (
    <div className="heart-shower" aria-hidden="true">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="falling-heart"
          style={{
            left: heart.left,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
            fontSize: heart.size,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}

export default function BirthdayHome() {
  const [activePage, setActivePage] = useState("home");
  const [showPhoto, setShowPhoto] = useState(false);

  return (
    <div className="party-desktop">
      <HeartShower />

      <header className="party-menubar">
        <div className="party-brand">
          <span className="brand-heart">♥</span>
          <strong>Birthday Surprise</strong>
          <span className="brand-divider" />
          <span className="brand-subtitle">
            A special day for a special person
          </span>
          <span className="brand-heart">♥</span>
        </div>

        <div className="party-menubar-status">
          <span>♥</span> Made with love
        </div>
      </header>

      <aside className="party-sidebar" aria-label="Page navigation">
        {pages.map((page) => (
          <button
            type="button"
            key={page.id}
            className={`sidebar-link ${
              activePage === page.id ? "active" : ""
            }`}
            onClick={() => setActivePage(page.id)}
          >
            <span className="sidebar-icon">{page.icon}</span>
            <span>{page.label}</span>
          </button>
        ))}
      </aside>

      {activePage === "home" && (
        <main className="party-main">
          <section className="party-hero">
            <div className="party-hero-copy">
              <div className="party-eyebrow">
                ✦ A special day for someone special ✦
              </div>

              <h1 className="party-title">
                Happy Birthday,
                <span className="party-title-gradient">
                  Paviii! <span className="title-heart">♡</span>
                </span>
              </h1>

              <p className="party-subtitle">
                Today is all about you — your smile, your happiness,
                and all the beautiful memories yet to come. I made this
                little corner of the internet just for you.
                <span className="inline-heart">♡</span>
              </p>

              <button
                type="button"
                className="party-explore-button hero-button"
                onClick={() => setActivePage("video")}
              >
                Let’s Celebrate <span>→</span>
              </button>
            </div>

            <div className="party-photo-area">
              <div className="photo-sparkle sparkle-one">✦</div>

              <div className="party-photo-frame">
                <div className="party-photo-placeholder">
                  <span>♡</span>
                  <strong>Your special photo goes here</strong>
                  <small>
                    Add your photo as
                    <br />
                    public/birthday-girl.jpg
                  </small>
                </div>

                <img
                  src="/NUm1.jpg"
                  alt="Birthday girl Paviii"
                  className="clickable-photo"
                  onClick={() => setShowPhoto(true)}
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />

                <div className="party-photo-caption">
                  Our favourite birthday girl ♡
                </div>
              </div>

              <div className="photo-decor photo-balloons">🎈</div>
              <div className="photo-decor photo-teddy">🧸</div>
              <div className="photo-decor photo-roses">🌹</div>
            </div>
          </section>

          <section className="party-wish-card">
            <div className="wish-art" aria-hidden="true">
              <div className="wish-envelope">💌</div>
              <span>✦</span>
            </div>

            <div className="wish-content">
              <p className="party-section-label">
                ♡ A little wish from my heart ♥
              </p>

              <h2 className="party-wish-title">
                Wishing you the happiest birthday! ♡
              </h2>

              <p className="party-wish-text">
                May your days be filled with laughter, your heart with
                peace, and your life with endless reasons to smile.
                May every dream you carry come a little closer to
                reality. You deserve beautiful moments, genuine
                happiness, and all the love this world has to offer.
                Keep shining and being the wonderful person you are.
                Happy Birthday! ♥
              </p>
            </div>
          </section>

          <section className="party-items-section">
            <div className="party-items-intro">
              <p className="party-section-label">
                ♥ Let the celebration begin!
              </p>

              <h2 className="party-section-heading">
                Birthday
                <br />
                Party Items
              </h2>

              <p className="party-section-description">
                A little birthday magic,
                <br />
                just for you. ♡
              </p>
            </div>

            <div className="party-items-grid">
              {partyItems.map((item) => (
                <article className="party-item-card" key={item.title}>
                  <div className="party-item-art">{item.emoji}</div>

                  <h3 className="party-item-title">
                    <span>♥</span> {item.title}
                  </h3>

                  <p className="party-item-description">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <footer className="party-footer">
            Made with <strong>♥</strong> and a little birthday magic.
            <span>✦</span>
          </footer>
        </main>
      )}

      {activePage === "video" && (
        <main className="inner-page">
          <p className="party-section-label">A special moment ♡</p>
          <h1 className="inner-page-title">A Birthday Video</h1>
          <p className="inner-page-description">
            A little surprise, made just for you.
          </p>

          <section className="content-window">
            <div className="window-bar">
              <i />
              <i />
              <i />
              <span>For Paviii ♡</span>
            </div>

            <video
              className="birthday-video"
               controls
               autoPlay
               playsInline
               preload="auto"
            >
              <source src="/vido1.mp4" type="video/mp4" />
              Your browser does not support video playback.
            </video>
          </section>
        </main>
      )}

      {activePage === "memories" && (
        <main className="inner-page">
          <MemoriesCarousel />
        </main>
      )}

      {activePage === "last" && (
        <main className="inner-page letter-page">
          <article className="love-letter">
            <p className="party-section-label">♡ One last thing</p>

            <h1>A Little Letter for You</h1>

            <p className="letter-text">
              {`Happy Birthday, Paviii! ♥

I wanted to make something a little different for your special day, something you could open and remember with a smile.

I hope this new year of your life brings you happiness, courage, success, and countless beautiful surprises. Never forget how special you are and how much you deserve the very best.

Keep smiling, keep dreaming, and keep being you. May this birthday be the beginning of a wonderful chapter filled with memories you will treasure forever.

Enjoy your special day to the fullest. You deserve all the happiness in the world. 🎂✨`}
            </p>

            <div className="love-letter-signature">
              With lots of love, ♡
            </div>
          </article>
        </main>
      )}



      {/* Click-to-view birthday photo popup */}
      {showPhoto && (
        <div
          className="photo-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Birthday photo preview"
          onClick={() => setShowPhoto(false)}
        >
          <button
            type="button"
            className="photo-close"
            onClick={() => setShowPhoto(false)}
            aria-label="Close photo"
          >
            ×
          </button>

          <img
            src="/NUm1.jpg"
            alt="Birthday girl Paviii full view"
            className="photo-modal-image"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
