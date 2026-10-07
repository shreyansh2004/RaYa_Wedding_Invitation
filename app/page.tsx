import { Countdown } from "../components/Countdown";
import { InvitationGate } from "../components/InvitationGate";
import { InvitationActions } from "../components/InvitationActions";
import { FallingLeaves } from "../components/FallingLeaves";
import { PhotoCarousel } from "../components/PhotoCarousel";
import {
  formatEventDate,
  formatEventTimeForDateTime,
  invitation,
  isPlaceholder,
} from "../data/invitation";
import Image from "next/image";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function FloralMark({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 100 100"
      fill="none"
    >
      <path
        d="M50 8c5 15 17 21 31 23-12 9-15 21-9 36-13-6-25-3-36 8 2-16-4-27-18-35 16-2 26-11 32-32Z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M50 24c4 11 11 17 22 20-10 6-14 14-13 26-9-8-18-10-29-5 5-11 3-21-5-30 12 1 20-2 25-11Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle cx="50" cy="49" r="5" fill="currentColor" />
      <circle cx="50" cy="49" r="31" stroke="currentColor" strokeWidth=".8" />
    </svg>
  );
}

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <FloralMark className="heading-mark" />
      <h2>{title}</h2>
      <span className="heading-rule" aria-hidden="true" />
    </div>
  );
}

export default function Home() {
  const eventGroups = Array.from(new Set(invitation.events.map((event) => event.date))).sort();

  return (
    <main>
      <InvitationGate>
      <a className="top-brand" href="#top" aria-label="RaYaVerse — Riya and Rahul, back to top">
          <Image
            className="brand-logo brand-logo--nav"
            src={`${basePath}/raya-verse-logo.webp`}
            alt="RaYaVerse"
            width={419}
            height={518}
            sizes="104px"
            priority
          />
      </a>

      <header className="hero" id="top">
        <div className="hero-copy">
          <p className="hero-kicker">Together with our families</p>
          <p className="hero-overline">joyfully invite you to celebrate</p>
          <h1 tabIndex={-1}>
            <span>{invitation.bride.name}</span>
            <i aria-hidden="true">&</i>
            <span>{invitation.groom.name}</span>
          </h1>
          <p className="hero-date">27 <span>·</span> 12 <span>·</span> 2026</p>
          <p className="hero-day">SUNDAY <span className="small-diamond" /> NEMUCH</p>
        </div>
        <figure className="hero-art">
          <Image
            src={`${basePath}/couple-illustration.png`}
            alt="A festive illustration of a bride and groom beneath wedding garlands"
            width={957}
            height={1600}
            loading="lazy"
            sizes="(max-width: 680px) 74vw, 390px"
          />
        </figure>
        <a className="scroll-cue" href="#story">
          <span>Scroll to explore</span>
          <span aria-hidden="true" className="scroll-line" />
        </a>
      </header>

      <FallingLeaves />

      <section className="invitation-section section-wrap scroll-reveal" id="story">
        <SectionHeading eyebrow="A joyful beginning" title="With love and blessings" />
        <p className="invitation-copy">
          With the blessings of our families, we invite you to join us as
          two hearts become one. Your presence will make our celebration
          complete and our memories all the more beautiful.
        </p>
        <p className="invitation-signoff">With love, Riya & Rahul</p>
        <div className="parents-line">
          <span>{invitation.bride.parents.join(" & ")}</span>
          <FloralMark className="tiny-mark" />
          <span>
            {invitation.groom.parents.every(isPlaceholder)
              ? "The Mehta Family"
              : invitation.groom.parents.join(" & ")}
          </span>
        </div>
      </section>

      <section className="countdown-section section-wrap scroll-reveal" aria-labelledby="countdown-title">
        <span className="eyebrow">The celebration begins in</span>
        <h2 id="countdown-title" className="script-heading">Counting our blessings</h2>
        <Countdown />
        <p className="countdown-note">Until we celebrate together</p>
      </section>

      <section className="couple-section section-wrap scroll-reveal" id="couple">
        <SectionHeading eyebrow="Two families, one beautiful beginning" title="The couple" />
        <PhotoCarousel />
      </section>

      <section className="ceremony-section section-wrap scroll-reveal" id="ceremony">
        <div className="ceremony-frame">
          <FloralMark className="ceremony-mark" />
          <p className="eyebrow">The wedding ceremony</p>
          <p className="ceremony-day">{invitation.wedding.day}</p>
          <p className="ceremony-date">
            <span>27</span>
            <span className="date-divider" />
            <span>December<br /><small>2026</small></span>
          </p>
          <span className="ceremony-rule" aria-hidden="true" />
          <p className="ceremony-time">Muhurat at <strong>{invitation.wedding.muhurat}</strong></p>
          <p className="ceremony-place">{invitation.venue.name}</p>
        </div>
      </section>

      <section className="events-section section-wrap scroll-reveal" id="celebration">
        <SectionHeading eyebrow="The festivities" title="A time to celebrate" />
        <div className="event-groups">
          {eventGroups.map((date) => {
            const events = invitation.events
              .filter((event) => event.date === date)
              .sort(
                (first, second) =>
                  Date.parse(`${first.date}T${formatEventTimeForDateTime(first.time)}`) -
                  Date.parse(`${second.date}T${formatEventTimeForDateTime(second.time)}`),
              );
            const weddingDay = date === invitation.wedding.date;
            return (
              <div className="event-day" key={date}>
                <div className="event-day-heading">
                  <span>{weddingDay ? "The wedding day" : "The day before"}</span>
                  <time dateTime={date}>
                    {formatEventDate(date)}
                  </time>
                </div>
                <ol className="event-list">
                  {events.map((event, index) => (
                    <li className="event-item" key={`${event.date}-${event.name}`}>
                      <span className="event-node" aria-hidden="true">
                        {index === events.length - 1 && weddingDay ? <FloralMark /> : null}
                      </span>
                      <time
                        className="event-time"
                        dateTime={`${event.date}T${formatEventTimeForDateTime(event.time)}`}
                      >
                        {event.time}
                      </time>
                      <span className="event-name">{event.name}</span>
                    </li>
                  ))}
                </ol>
              </div>
            );
          })}
        </div>
      </section>

      <section className="venue-section section-wrap scroll-reveal" id="venue">
        <SectionHeading eyebrow="Save your seat" title="Meet us in Neemuch" />
        <div className="venue-card">
          <div className="venue-map-frame">
            <iframe
              title="Interactive map of Neemuch, Madhya Pradesh"
              src="https://maps.google.com/maps?q=Neemuch%2C%20Madhya%20Pradesh%2C%20India&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <div className="venue-details">
            <p className="eyebrow">The wedding venue</p>
            <h3>{invitation.venue.name}</h3>
            <address>
              {isPlaceholder(invitation.venue.address)
                ? "Address details to follow"
                : invitation.venue.address}
            </address>
            <a
              className="button button-outline"
              href={
                isPlaceholder(invitation.venue.mapsUrl)
                  ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(invitation.venue.name)}`
                  : invitation.venue.mapsUrl
              }
              target="_blank"
              rel="noreferrer"
            >
              Get directions <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <InvitationActions />
      </section>

      <section className="closing-section section-wrap scroll-reveal" id="rsvp">
        <FloralMark className="closing-mark" />
        <p className="eyebrow">A celebration is better together</p>
        <h2 className="script-heading">We can’t wait to see you</h2>
        <p className="closing-copy">
          Your love, laughter, and blessings are the most precious gifts.
          Join us as we begin our forever.
        </p>
        <a className="button button-gold" href="https://wa.me/?text=We%20are%20excited%20to%20celebrate%20Riya%20and%20Rahul%27s%20wedding%20on%2027%20December%202026!">
          RSVP on WhatsApp <span aria-hidden="true">↗</span>
        </a>
        <p className="closing-families">With love, the Kothari & Mehta families</p>
      </section>

      <footer className="site-footer scroll-reveal">
        <Image
          className="brand-logo brand-logo--footer"
          src={`${basePath}/raya-verse-logo.webp`}
          alt="RaYaVerse"
          width={419}
          height={518}
          sizes="48px"
        />
        <p>Made with love for Riya & Rahul · 27.12.2026</p>
      </footer>
      </InvitationGate>
    </main>
  );
}
