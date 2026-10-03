




// mentor-leap\src\app\events\page.tsx

"use client";

import PageWrapper from "@/components/layout/PageWrapper";
import { Reveal } from "@/components/ui/Animation";
import {
  SectionHeading,
  GradientText,
  Paragraph,
} from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchEvents } from "@/lib/api";

/* =========================================================
   UPCOMING EVENT
========================================================= */

const SMART_EVENT_ID = "smart-but-overlooked";

const SMART_EVENT = {
  id: SMART_EVENT_ID,
  title: "Smart But Overlooked",
  price: 999,
  speaker: "Mridu Bhandari",
  seats: 50,

  // Image inside /public/events/
  banner: "/events/smart-but-overlooked-banner.webp",

  date: "2026-10-11",
};

/* =========================================================
   INTERVIEW TO OFFER LETTER
========================================================= */

const MASTERCLASS_EVENT = {
  id: "interview-to-offer-letter",
  title: "Interview to Offer Letter",
  price: 499,
  speaker: "Mridu Bhandari",
  seats: 100,
  banner: "/events/interview-to-offer-banner.png",
  date: "2026-04-30",
};

/* =========================================================
   SPEAK WITH IMPACT
========================================================= */

const SPEAK_IMPACT_EVENT = {
  id: "speak-with-impact-bootcamp",
  title: "Speak with Impact Bootcamp",
  price: 7999,
  speaker: "Mridu Bhandari",
  seats: 50,
  banner: "/events/speak-with-impact-banner.png",
  date: "2026-03-27",
};

/* =========================================================
   KEEP EXACTLY 3 EVENTS
========================================================= */

function getThreeEvents(apiEvents: any[]): any[] {
  const apiList = Array.isArray(apiEvents) ? apiEvents : [];

  /*
   * Get Interview to Offer Letter from API if available.
   * Otherwise use the local fallback.
   */
  const interviewEvent =
    apiList.find(
      (ev: any) => ev.id === MASTERCLASS_EVENT.id
    ) || MASTERCLASS_EVENT;

  /*
   * Get Speak with Impact from API if available.
   * Otherwise use the local fallback.
   */
  const speakImpactEvent =
    apiList.find(
      (ev: any) => ev.id === SPEAK_IMPACT_EVENT.id
    ) || SPEAK_IMPACT_EVENT;

  /*
   * IMPORTANT:
   *
   * We explicitly return only these 3 events.
   *
   * Smart But Overlooked = FIRST
   * Interview to Offer Letter = SECOND
   * Speak with Impact = THIRD
   */
  return [
    SMART_EVENT,
    interviewEvent,
    speakImpactEvent,
  ];
}

/* =========================================================
   FORMAT EVENT DATE
========================================================= */

function formatEventDate(ev: any): string {
  /*
   * Smart But Overlooked
   */
  if (ev.id === SMART_EVENT_ID) {
    return "11 Oct, 2026";
  }

  /*
   * Speak With Impact
   */
  if (ev.id === "speak-with-impact-bootcamp") {
    return "Mar 27 & 28, 2026";
  }

  /*
   * Interview To Offer Letter
   */
  if (ev.id === "interview-to-offer-letter") {
    return "Apr 30, 2026";
  }

  /*
   * Handle Firebase / API dates
   */
  try {
    const rawDate = ev.date;

    let date: Date | null = null;

    if (rawDate?._seconds) {
      date = new Date(rawDate._seconds * 1000);
    } else if (rawDate?.toDate) {
      date = rawDate.toDate();
    } else if (rawDate) {
      date = new Date(rawDate);
    }

    if (date && !isNaN(date.getTime())) {
      return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
  } catch (error) {
    console.error(
      "Date formatting error:",
      error
    );
  }

  return "Date TBA";
}

/* =========================================================
   EVENTS PAGE
========================================================= */

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /* =======================================================
     FETCH EVENTS
  ======================================================= */

  useEffect(() => {
    fetchEvents()
      .then((data: any[]) => {
        /*
         * Always create exactly 3 events.
         */
        const finalEvents = getThreeEvents(
          Array.isArray(data) ? data : []
        );

        setEvents(finalEvents);
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "Failed to fetch events:",
          error
        );

        /*
         * If API fails, still show the 3 events.
         */
        setEvents(getThreeEvents([]));
        setLoading(false);
      });
  }, []);

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <PageWrapper>

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section
        className="
          px-5
          pt-[55px]
          pb-[45px]
          max-w-[1200px]
          mx-auto
          text-center
        "
      >
        <Reveal>
          <SectionHeading>
            Live{" "}
            <GradientText>
              Events & Bootcamps
            </GradientText>
          </SectionHeading>

          <Paragraph className="max-w-[600px] mx-auto mt-3">
            Join our high-impact live learning
            experiences designed for rapid skill
            acquisition and networking.
          </Paragraph>
        </Reveal>
      </section>

      {/* =====================================================
          EVENTS SECTION
      ===================================================== */}

      <section
        className="
          px-5
          pb-[100px]
          max-w-[1200px]
          mx-auto
        "
      >
        <div className="grid md:grid-cols-2 gap-8">

          {/* =================================================
              LOADING
          ================================================= */}

          {loading ? (
            <p
              className="
                text-center
                text-[#94a3b8]
                col-span-2
                py-10
              "
            >
              Syncing with event registry...
            </p>
          ) : (
            /* ===============================================
               EVENT CARDS
            =============================================== */

            events.map((ev, i) => (
              <Reveal
                key={ev.id}
                delay={i * 0.1}
              >
                <div className="relative pt-4">

                  {/* =========================================
                      UPCOMING EVENT BADGE
                  ========================================= */}

                  {ev.id === SMART_EVENT_ID && (
                    <div
                      className="
                        absolute
                        top-0
                        left-5
                        z-10
                        bg-[#3b5bdb]
                        text-white
                        text-[10px]
                        font-black
                        uppercase
                        tracking-[0.15em]
                        px-4
                        py-1.5
                        rounded-full
                      "
                    >
                      Upcoming Event
                    </div>
                  )}

                  {/* =========================================
                      CARD
                  ========================================= */}

                  <Card>

                    {/* =======================================
                        EVENT IMAGE
                    ======================================= */}

                    <div
                      className="
                        aspect-video
                        w-full
                        rounded-xl
                        bg-[#0f172a]
                        mb-6
                        flex
                        items-center
                        justify-center
                        overflow-hidden
                        border
                        border-white/5
                        shadow-2xl
                      "
                    >
                      {ev.banner ? (
                        <img
                          src={ev.banner}
                          alt={ev.title}
                          className="
                            w-full
                            h-full
                            object-cover
                          "
                          loading={
                            i === 0
                              ? "eager"
                              : "lazy"
                          }
                          onError={(e) => {
                            /*
                             * Hide broken image.
                             */
                            e.currentTarget.style.display =
                              "none";

                            /*
                             * Show fallback background.
                             */
                            const parent =
                              e.currentTarget
                                .parentElement;

                            if (parent) {
                              parent.classList.add(
                                "image-failed"
                              );
                            }
                          }}
                        />
                      ) : null}

                      {/* Fallback icon */}

                      {!ev.banner && (
                        <span className="text-5xl">
                          {i % 2 === 0
                            ? "🎙"
                            : "⚡"}
                        </span>
                      )}
                    </div>

                    {/* =======================================
                        TITLE + PRICE
                    ======================================= */}

                    <div
                      className="
                        flex
                        justify-between
                        items-start
                        gap-4
                        mb-4
                      "
                    >
                      <div className="min-w-0">

                        {/* DATE */}

                        <div
                          className="
                            text-[#00e5ff]
                            text-[10px]
                            font-black
                            uppercase
                            tracking-[0.2em]
                            mb-2
                          "
                        >
                          {formatEventDate(ev)}
                        </div>

                        {/* TITLE */}

                        <h3
                          className="
                            text-2xl
                            font-black
                            tracking-tight
                          "
                        >
                          {ev.title}
                        </h3>

                      </div>

                      {/* PRICE */}

                      <div
                        className="
                          bg-[#00e5ff]/10
                          border
                          border-[#00e5ff]/20
                          px-3
                          py-1
                          rounded-full
                          text-xs
                          font-black
                          text-[#00e5ff]
                          whitespace-nowrap
                        "
                      >
                        ₹{ev.price}
                      </div>

                    </div>

                    {/* =======================================
                        SPEAKER + SEATS
                    ======================================= */}

                    <p
                      className="
                        text-[#94a3b8]
                        text-xs
                        font-bold
                        uppercase
                        tracking-widest
                        mb-6
                      "
                    >
                      Speaker:{" "}
                      {ev.speaker ||
                        "Mridu Bhandari"}

                      {ev.seats
                        ? ` • ${ev.seats} Seats left`
                        : ""}
                    </p>

                    {/* =======================================
                        VIEW DETAILS
                    ======================================= */}

                    <Link
                      href={`/events/${ev.id}`}
                      className="block"
                    >
                      <Button
                        fullWidth
                        variant="secondary"
                        className="
                          font-black
                          uppercase
                          tracking-widest
                          text-xs
                        "
                      >
                        View Details
                      </Button>
                    </Link>

                  </Card>
                </div>
              </Reveal>
            ))
          )}

        </div>
      </section>

    </PageWrapper>
  );
}