"use client";

import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const videos = [
  { id: "PWTz7eGclu8", title: "Creating Customer Conversations" },
  { id: "bZ9BtRfgg6o", title: "The Role of Gen AI in Customer Experience" },
  { id: "ZrVv0gkkaMs", title: "Cisco Idea Lab – The CIO's Perspective" },
  { id: "i5pDykiREPw", title: "Evolving Customer Conversations" },
  { id: "YkdiS_guFrc", title: "Helping Clients Build Resilience" },
];

export default function VideoTestimonials() {
  const { ref, visible } = useInView();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -400 : 400, behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        .vt-gradient-text {
          background: linear-gradient(90deg, #00e5ff, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .vt-scroll {
          display: flex;
          overflow-x: auto;
          gap: 20px;
          padding-bottom: 12px;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .vt-scroll::-webkit-scrollbar { display: none; }

        .vt-frame-wrap {
          flex-shrink: 0;
          scroll-snap-align: start;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
          background: #0a0f1e;
          width: 360px;
        }
        .vt-frame-wrap:hover {
          border-color: rgba(0,229,255,0.3);
          box-shadow: 0 16px 48px rgba(0,229,255,0.1);
          transform: translateY(-4px);
        }

        .vt-scroll-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: #94a3b8;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.25s, color 0.25s, border-color 0.25s;
          font-size: 16px;
        }
        .vt-scroll-btn:hover:not(:disabled) {
          background: rgba(0,229,255,0.1);
          color: #00e5ff;
          border-color: rgba(0,229,255,0.3);
        }
        .vt-scroll-btn:disabled {
          opacity: 0.25;
          cursor: not-allowed;
        }

        .vt-fade-mask {
          mask-image: linear-gradient(to right, transparent, black 4%, black 96%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 4%, black 96%, transparent);
        }
      `}</style>

      <section
        ref={ref}
        className="w-full"
        style={{ padding: "100px 0" }}
      >
        {/* HEADER */}
        <div
          style={{
            padding: "0 24px",
            marginBottom: "48px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(-20px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}
        >
          <div className="mx-auto" style={{ maxWidth: "1200px" }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <p style={{ color: "#475569", fontSize: "11px", fontWeight: 800, letterSpacing: "3px", textTransform: "uppercase", marginBottom: "10px" }}>
                  Featured On
                </p>
                <h2 className="text-white font-bold" style={{ fontSize: "36px", lineHeight: 1.15 }}>
                  Mridu on{" "}
                  <span className="vt-gradient-text">Television & Media</span>
                </h2>
              </div>

              {/* SCROLL CONTROLS */}
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  className="vt-scroll-btn"
                  onClick={() => scroll("left")}
                  disabled={!canScrollLeft}
                  aria-label="Scroll left"
                >
                  ←
                </button>
                <button
                  className="vt-scroll-btn"
                  onClick={() => scroll("right")}
                  disabled={!canScrollRight}
                  aria-label="Scroll right"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SCROLL TRACK */}
        <div
          className="vt-fade-mask"
          style={{
            padding: "0 24px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s",
          }}
        >
          <div
            ref={scrollRef}
            className="vt-scroll mx-auto"
            style={{ maxWidth: "1200px" }}
            onScroll={updateScrollButtons}
          >
            {videos.map((v, i) => (
              <div key={v.id} className="vt-frame-wrap">
                <iframe
                  src={`https://www.youtube.com/embed/${v.id}`}
                  width="360"
                  height="202"
                  style={{ display: "block", border: "none" }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={v.title}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* DOT INDICATORS */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginTop: "28px",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.5s",
          }}
        >
          {videos.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === 0 ? "20px" : "6px",
                height: "6px",
                borderRadius: "3px",
                background: i === 0 ? "#00e5ff" : "rgba(255,255,255,0.15)",
                transition: "width 0.3s ease, background 0.3s ease",
              }}
            />
          ))}
        </div>
      </section>
    </>
  );
}