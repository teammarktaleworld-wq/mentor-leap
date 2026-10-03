












// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";

// export default function OfferBanner() {
//   const [mounted, setMounted] = useState(false);
//   const [paused, setPaused] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   return (
//     <>
//       <style>{`
//         @keyframes scrollOffer {
//           0% {
//             transform: translateX(0);
//           }

//           100% {
//             transform: translateX(-50%);
//           }
//         }

//         .ml-offer-track {
//           display: flex;
//           width: max-content;
//           gap: 60px;
//           white-space: nowrap;
//           animation: scrollOffer 24s linear infinite;
//           color: white;
//           font-size: 14px;
//         }

//         .ml-offer-track.paused {
//           animation-play-state: paused;
//         }

//         .ml-offer-item {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//         }

//         .ml-offer-dot {
//           width: 7px;
//           height: 7px;
//           border-radius: 9999px;
//           background: #6366f1;
//           animation: offerPulse 1.5s ease-in-out infinite;
//           flex-shrink: 0;
//         }

//         @keyframes offerPulse {
//           0%,
//           100% {
//             opacity: 0.4;
//             transform: scale(0.85);
//           }

//           50% {
//             opacity: 1;
//             transform: scale(1.15);
//           }
//         }

//         .ml-offer-title {
//           color: rgba(255, 255, 255, 0.95);
//           font-size: 14px;
//           font-weight: 700;
//           letter-spacing: 0.025em;
//         }

//         .ml-offer-date {
//           color: #00e5ff;
//           font-weight: 800;
//         }

//         .ml-offer-btn-primary {
//           padding: 8px 18px;
//           border-radius: 9999px;
//           background: linear-gradient(90deg, #00e5ff, #6366f1);
//           color: white;
//           text-decoration: none;
//           font-size: 13px;
//           font-weight: 700;
//           white-space: nowrap;
//           box-shadow: 0 4px 14px rgba(0, 229, 255, 0.25);
//           transition:
//             transform 0.2s ease,
//             box-shadow 0.2s ease;
//           display: inline-block;
//         }

//         .ml-offer-btn-primary:hover {
//           transform: translateY(-2px) scale(1.03);
//           box-shadow: 0 8px 22px rgba(0, 229, 255, 0.45);
//         }

//         .ml-offer-btn-primary:active {
//           transform: scale(0.97);
//         }

//         .ml-offer-btn-secondary {
//           padding: 8px 18px;
//           border-radius: 9999px;
//           background: rgba(255, 255, 255, 0.08);
//           color: white;
//           text-decoration: none;
//           border: 1px solid rgba(255, 255, 255, 0.2);
//           font-size: 13px;
//           font-weight: 700;
//           white-space: nowrap;
//           transition:
//             background 0.2s ease,
//             border-color 0.2s ease,
//             transform 0.2s ease;
//           display: inline-block;
//         }

//         .ml-offer-btn-secondary:hover {
//           background: rgba(255, 255, 255, 0.15);
//           border-color: rgba(255, 255, 255, 0.4);
//           transform: translateY(-2px);
//         }

//         .ml-offer-btn-secondary:active {
//           transform: scale(0.97);
//         }

//         @keyframes bannerFadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(-6px);
//           }

//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .ml-banner-animate {
//           animation: bannerFadeIn 0.5s ease 0.6s both;
//         }

//         @media (max-width: 768px) {
//           .ml-banner-inner {
//             flex-direction: column !important;
//             gap: 12px !important;
//             padding: 12px 14px !important;
//           }

//           .ml-offer-content {
//             width: 100%;
//           }

//           .ml-offer-actions {
//             width: 100%;
//             justify-content: center;
//             margin-left: 0 !important;
//           }

//           .ml-offer-track {
//             font-size: 12px;
//             gap: 40px;
//           }

//           .ml-offer-title {
//             font-size: 12px;
//           }
//         }
//       `}</style>

//       <div
//         className="ml-banner-animate"
//         suppressHydrationWarning
//         style={{
//           position: "relative",
//           width: "100%",
//           background: "rgba(255,255,255,0.05)",
//           backdropFilter: "blur(12px)",
//           borderTop: "1px solid rgba(255,255,255,0.08)",
//           borderBottom: "1px solid rgba(255,255,255,0.08)",
//           overflow: "hidden",
//           marginTop: "70px",
//         }}
//       >
//         {/* Subtle gradient line */}
//         <div
//           suppressHydrationWarning
//           style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             right: 0,
//             height: "1px",
//             background:
//               "linear-gradient(90deg, transparent, #00e5ff55, #6366f155, transparent)",
//           }}
//         />

//         <div
//           className="ml-banner-inner"
//           suppressHydrationWarning
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             padding: "12px 20px",
//           }}
//         >
//           {/* SCROLLING EVENT TEXT */}
//           <div
//             className="ml-offer-content"
//             style={{
//               flex: 1,
//               overflow: "hidden",
//               cursor: "pointer",
//             }}
//             onMouseEnter={() => setPaused(true)}
//             onMouseLeave={() => setPaused(false)}
//             title="Hover to pause"
//             suppressHydrationWarning
//           >
//             <div
//               className={`ml-offer-track ${paused ? "paused" : ""}`}
//               suppressHydrationWarning
//             >
//               {/* First copy */}
//               <div className="ml-offer-item">
//                 <div className="ml-offer-dot" />

//                 <span className="ml-offer-title">
//                   Smart But Overlooked — The Executive Presence Masterclass
//                   with Mridu Bhandari
//                 </span>

//                 <span className="ml-offer-date">
//                   • 11 October 2026
//                 </span>
//               </div>

//               {/* Second copy for seamless marquee */}
//               <div className="ml-offer-item">
//                 <div className="ml-offer-dot" />

//                 <span className="ml-offer-title">
//                   Smart But Overlooked — The Executive Presence Masterclass
//                   with Mridu Bhandari
//                 </span>

//                 <span className="ml-offer-date">
//                   • 11 October 2026
//                 </span>
//               </div>

//               {/* Third copy */}
//               <div className="ml-offer-item">
//                 <div className="ml-offer-dot" />

//                 <span className="ml-offer-title">
//                   Smart But Overlooked — The Executive Presence Masterclass
//                   with Mridu Bhandari
//                 </span>

//                 <span className="ml-offer-date">
//                   • 10 October 2026
//                 </span>
//               </div>

//               {/* Fourth copy */}
//               <div className="ml-offer-item">
//                 <div className="ml-offer-dot" />

//                 <span className="ml-offer-title">
//                   Smart But Overlooked — The Executive Presence Masterclass
//                   with Mridu Bhandari
//                 </span>

//                 <span className="ml-offer-date">
//                   • 10 October 2026
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* CTA BUTTONS */}
//           <div
//             className="ml-offer-actions"
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "12px",
//               marginLeft: "32px",
//               padding: "4px 0",
//               flexShrink: 0,
//             }}
//           >
//             <Link
//               href="/events/smart-but-overlooked"
//               className="ml-offer-btn-primary"
//             >
//               Secure Your Seat
//             </Link>

//             <Link
//               href="/events"
//               className="ml-offer-btn-secondary"
//             >
//               All Events
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }












"use client";

import { useState } from "react";
import Link from "next/link";

export default function OfferBanner() {
  const [paused, setPaused] = useState(false);

  return (
    <>
      <style>{`
        @keyframes scrollOffer {
          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(-50%);
          }
        }

        .ml-offer-track {
          display: flex;
          width: max-content;
          gap: 60px;
          white-space: nowrap;
          animation: scrollOffer 24s linear infinite;
          color: white;
          font-size: 14px;
        }

        .ml-offer-track.paused {
          animation-play-state: paused;
        }

        .ml-offer-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .ml-offer-dot {
          width: 7px;
          height: 7px;
          border-radius: 9999px;
          background: #6366f1;
          animation: offerPulse 1.5s ease-in-out infinite;
          flex-shrink: 0;
        }

        @keyframes offerPulse {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(0.85);
          }

          50% {
            opacity: 1;
            transform: scale(1.15);
          }
        }

        .ml-offer-title {
          color: rgba(255, 255, 255, 0.95);
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.025em;
        }

        .ml-offer-date {
          color: #00e5ff;
          font-weight: 800;
        }

        .ml-offer-btn-primary {
          padding: 8px 18px;
          border-radius: 9999px;
          background: linear-gradient(90deg, #00e5ff, #6366f1);
          color: white;
          text-decoration: none;
          font-size: 13px;
          font-weight: 700;
          white-space: nowrap;
          box-shadow: 0 4px 14px rgba(0, 229, 255, 0.25);
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
          display: inline-block;
        }

        .ml-offer-btn-primary:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 8px 22px rgba(0, 229, 255, 0.45);
        }

        .ml-offer-btn-primary:active {
          transform: scale(0.97);
        }

        .ml-offer-btn-secondary {
          padding: 8px 18px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.08);
          color: white;
          text-decoration: none;
          border: 1px solid rgba(255, 255, 255, 0.2);
          font-size: 13px;
          font-weight: 700;
          white-space: nowrap;
          transition:
            background 0.2s ease,
            border-color 0.2s ease,
            transform 0.2s ease;
          display: inline-block;
        }

        .ml-offer-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-2px);
        }

        .ml-offer-btn-secondary:active {
          transform: scale(0.97);
        }

        @keyframes bannerFadeIn {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .ml-banner-animate {
          animation: bannerFadeIn 0.5s ease 0.6s both;
        }

        @media (max-width: 768px) {
          .ml-banner-inner {
            flex-direction: column !important;
            gap: 12px !important;
            padding: 12px 14px !important;
          }

          .ml-offer-content {
            width: 100%;
          }

          .ml-offer-actions {
            width: 100%;
            justify-content: center;
            margin-left: 0 !important;
          }

          .ml-offer-track {
            font-size: 12px;
            gap: 40px;
          }

          .ml-offer-title {
            font-size: 12px;
          }

          .ml-offer-date {
            font-size: 12px;
          }
        }
      `}</style>

      <div
        className="ml-banner-animate"
        suppressHydrationWarning
        style={{
          position: "relative",
          width: "100%",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          overflow: "hidden",
          marginTop: "70px",
        }}
      >
        {/* Subtle gradient line */}
        <div
          suppressHydrationWarning
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, #00e5ff55, #6366f155, transparent)",
          }}
        />

        <div
          className="ml-banner-inner"
          suppressHydrationWarning
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 20px",
          }}
        >
          {/* SCROLLING EVENT TEXT */}
          <div
            className="ml-offer-content"
            style={{
              flex: 1,
              overflow: "hidden",
              cursor: "pointer",
            }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            title="Hover to pause"
            suppressHydrationWarning
          >
            <div
              className={`ml-offer-track ${paused ? "paused" : ""}`}
              suppressHydrationWarning
            >
              {/* First copy */}
              <div className="ml-offer-item">
                <div className="ml-offer-dot" />

                <span className="ml-offer-title">
                  Smart But Overlooked — The Executive Presence Masterclass
                  with Mridu Bhandari
                </span>

                <span className="ml-offer-date">
                  • 11 October 2026 • 11:00 AM – 1:00 PM
                </span>
              </div>

              {/* Second copy for seamless marquee */}
              <div className="ml-offer-item">
                <div className="ml-offer-dot" />

                <span className="ml-offer-title">
                  Smart But Overlooked — The Executive Presence Masterclass
                  with Mridu Bhandari
                </span>

                <span className="ml-offer-date">
                  • 11 October 2026 • 11:00 AM – 1:00 PM
                </span>
              </div>

              {/* Third copy */}
              <div className="ml-offer-item">
                <div className="ml-offer-dot" />

                <span className="ml-offer-title">
                  Smart But Overlooked — The Executive Presence Masterclass
                  with Mridu Bhandari
                </span>

                <span className="ml-offer-date">
                  • 11 October 2026 • 11:00 AM – 1:00 PM
                </span>
              </div>

              {/* Fourth copy */}
              <div className="ml-offer-item">
                <div className="ml-offer-dot" />

                <span className="ml-offer-title">
                  Smart But Overlooked — The Executive Presence Masterclass
                  with Mridu Bhandari
                </span>

                <span className="ml-offer-date">
                  • 11 October 2026 • 11:00 AM – 1:00 PM
                </span>
              </div>
            </div>
          </div>

          {/* CTA BUTTONS */}
          <div
            className="ml-offer-actions"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginLeft: "32px",
              padding: "4px 0",
              flexShrink: 0,
            }}
          >
            <Link
              href="/events/smart-but-overlooked"
              className="ml-offer-btn-primary"
            >
              Secure Your Seat
            </Link>

            <Link
              href="/events"
              className="ml-offer-btn-secondary"
            >
              All Events
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}