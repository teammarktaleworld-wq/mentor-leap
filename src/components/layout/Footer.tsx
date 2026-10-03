"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/mentorleap",
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@mentorleap",
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
        <polygon
          points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"
          fill="#020617"
        />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/mentorleap",
    icon: (
      <svg
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/mentorleap",
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = () => {
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <>
      <style>{`
        .footer-link {
          color: #64748b;
          font-size: 13.5px;
          text-decoration: none;
          transition: color 0.25s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .footer-link:hover {
          color: #00e5ff;
        }

        .footer-social-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          text-decoration: none;
          transition:
            color 0.25s,
            background 0.25s,
            border-color 0.25s,
            transform 0.25s;
        }

        .footer-social-btn:hover {
          color: #00e5ff;
          background: rgba(0, 229, 255, 0.08);
          border-color: rgba(0, 229, 255, 0.3);
          transform: translateY(-3px);
        }

        .footer-shimmer {
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(0, 229, 255, 0.4),
            rgba(99, 102, 241, 0.4),
            transparent
          );
        }

        .footer-email-input {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 13px;
          color: white;
          width: 100%;
          outline: none;
          transition: border-color 0.25s;
        }

        .footer-email-input::placeholder {
          color: #475569;
        }

        .footer-email-input:focus {
          border-color: rgba(0, 229, 255, 0.4);
        }

        .footer-subscribe-btn {
          background: linear-gradient(90deg, #00e5ff, #6366f1);
          border: none;
          border-radius: 8px;
          padding: 10px 18px;
          color: white;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition:
            opacity 0.25s,
            transform 0.25s;
          flex-shrink: 0;
        }

        .footer-subscribe-btn:hover {
          opacity: 0.88;
          transform: translateY(-1px);
        }

        .footer-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(0, 229, 255, 0.06);
          border: 1px solid rgba(0, 229, 255, 0.15);
          border-radius: 20px;
          padding: 5px 12px;
          font-size: 11px;
          color: rgba(0, 229, 255, 0.7);
          letter-spacing: 0.5px;
        }

        /* =========================================
           MENTORLEAP FOOTER LOGO
           ========================================= */

        .footer-logo {
          width: 105px;
          height: 105px;
          object-fit: contain;
          object-position: center;
          display: block;

          background: white;
          border-radius: 22px;

          padding: 6px;
          box-sizing: border-box;

          box-shadow:
            0 8px 24px rgba(0, 0, 0, 0.2),
            0 0 18px rgba(0, 229, 255, 0.05);

          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .footer-logo:hover {
          transform: translateY(-3px);

          box-shadow:
            0 12px 28px rgba(0, 0, 0, 0.25),
            0 0 22px rgba(0, 229, 255, 0.1);
        }

        /* =========================================
           RESPONSIVE
           ========================================= */

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }

          .footer-brand-col {
            grid-column: 1 / -1 !important;
          }

          .footer-newsletter-col {
            grid-column: 1 / -1 !important;
          }
        }

        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }

          .footer-brand-col,
          .footer-newsletter-col {
            grid-column: 1 !important;
          }

          .footer-logo {
            width: 95px;
            height: 95px;
            border-radius: 20px;
          }
        }
      `}</style>

      <footer
        suppressHydrationWarning
        style={{
          width: "100%",
          background: "#020617",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {/* TOP GRADIENT LINE */}
        <div className="footer-shimmer" />

        {/* MAIN CONTENT */}
        <div
          className="footer-grid mx-auto"
          style={{
            maxWidth: "1200px",
            padding: "64px 24px 48px",
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1.6fr",
            gap: "48px 40px",
            alignItems: "start",
          }}
          suppressHydrationWarning
        >
          {/* =========================================
              BRAND
              ========================================= */}
          <div className="footer-brand-col">
            <Link
              href="/"
              style={{
                display: "inline-flex",
                marginBottom: "20px",
                textDecoration: "none",
              }}
            >
              <Image
                src="/images/Logomentorlesp.png"
                alt="MentorLeap"
                width={105}
                height={105}
                priority
                className="footer-logo"
              />
            </Link>

            <p
              style={{
                color: "#475569",
                fontSize: "13.5px",
                lineHeight: "1.75",
                marginBottom: "24px",
                maxWidth: "280px",
              }}
            >
              AI-powered professional development platform helping ambitious
              professionals master communication and leadership.
            </p>

            {/* SOCIAL ICONS */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn"
                  title={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* =========================================
              MENTORLEAP LINKS
              ========================================= */}
          <div>
            <h4
              style={{
                color: "white",
                fontWeight: 700,
                fontSize: "12px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              MentorLeap
            </h4>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              {[
                {
                  label: "About",
                  href: "/about",
                },
                {
                  label: "Programs",
                  href: "/events",
                },
                {
                  label: "Corporate Training",
                  href: "/executive-coaching",
                },
                {
                  label: "Recorded Courses",
                  href: "/courses",
                },
                {
                  label: "Hire Mridu",
                  href: "/hire-mridu-anchor",
                },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="footer-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* =========================================
              RESOURCES
              ========================================= */}
          <div>
            <h4
              style={{
                color: "white",
                fontWeight: 700,
                fontSize: "12px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              Resources
            </h4>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              {[
                {
                  label: "MentorLeap Studio",
                  href: "/mentorleap-studio",
                },
                {
                  label: "Contact",
                  href: "/contact",
                },
                {
                  label: "Privacy Policy",
                  href: "/legal/privacy-policy",
                },
                {
                  label: "Terms of Service",
                  href: "/legal/terms-conditions",
                },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="footer-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* =========================================
              NEWSLETTER
              ========================================= */}
          <div className="footer-newsletter-col">
            <h4
              style={{
                color: "white",
                fontWeight: 700,
                fontSize: "12px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              Stay Ahead
            </h4>

            <p
              style={{
                color: "#475569",
                fontSize: "13px",
                lineHeight: "1.7",
                marginBottom: "18px",
              }}
            >
              Get weekly leadership insights, interview tips, and program
              updates straight to your inbox.
            </p>

            {submitted ? (
              <div
                style={{
                  color: "#00e5ff",
                  fontSize: "13px",
                  padding: "10px 0",
                }}
              >
                ✓ You're in! Check your inbox soon.
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSubscribe();
                    }
                  }}
                  placeholder="your@email.com"
                  className="footer-email-input"
                />

                <button
                  onClick={handleSubscribe}
                  className="footer-subscribe-btn"
                  aria-label="Subscribe"
                >
                  <ArrowRight size={14} />
                </button>
              </div>
            )}

            <div style={{ marginTop: "20px" }}>
              <span className="footer-badge">
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#00e5ff",
                    display: "inline-block",
                  }}
                />

                MISHA AI Powered
              </span>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            margin: "0 24px",
          }}
        />

        {/* =========================================
            BOTTOM BAR
            ========================================= */}
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "18px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            flexWrap: "wrap",
          }}
          suppressHydrationWarning
        >
          <p
            style={{
              fontSize: "12px",
              color: "#334155",
              margin: 0,
            }}
          >
            © 2026 MentorLeap AI · All rights reserved
          </p>

          <p
            style={{
              fontSize: "12px",
              color: "#334155",
              margin: 0,
            }}
          >
            Built with{" "}
            <span
              style={{
                color: "rgba(0,229,255,0.5)",
                fontWeight: 600,
              }}
            >
              MISHA AI
            </span>
          </p>
        </div>
      </footer>
    </>
  );
}