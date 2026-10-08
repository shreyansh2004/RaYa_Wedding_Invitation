import { Countdown } from "../components/Countdown";
import { InvitationGate } from "../components/InvitationGate";
import { InvitationActions } from "../components/InvitationActions";
import { FallingLeaves } from "../components/FallingLeaves";
import { PageEffects } from "../components/PageEffects";
import { PhotoCarousel } from "../components/PhotoCarousel";
import {
  formatEventDate,
  formatEventTimeForDateTime,
  invitation,
  isPlaceholder,
} from "../data/invitation";
import Image from "next/image";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: React.ReactNode;
}) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <span className="heading-rule" aria-hidden="true" />
    </div>
  );
}

export default function Home() {
  const eventGroups = Array.from(new Set(invitation.events.map((event) => event.date))).sort();

  return (
    <main>
      <PageEffects>
        <InvitationGate>
        <section className="hero-scroll-scene" aria-label="Wedding invitation">
          <header className="hero" id="top">
            <p className="hero-mantra">॥ श्री गणेशाय नमः ॥</p>
            <div className="hero-frame">
              <div className="hero-copy">
                <Image
                  className="hero-brand"
                  src={`${basePath}/raya-verse-logo.webp`}
                  alt="RaYaVerse"
                  width={419}
                  height={518}
                  priority
                />
                <p className="hero-wedding-label">Wedding</p>
                <p className="hero-of">of</p>
                <h1 style={{ fontSize: '50px', fontWeight: 500 }}>
                  <span>{invitation.bride.name}</span> 
                  <i aria-hidden="true">&</i>
                  <span>{invitation.groom.name}</span>
                </h1>
                <p className="hero-date">27 <span>·</span> 12 <span>·</span> 2026</p>
                <p className="hero-day">Sunday <span aria-hidden="true">|</span> Neemuch</p>
              </div>
            </div>
            <figure className="hero-art">
              <Image
                src={`${basePath}/wedding-couple.png`}
                alt="Riya and Rahul in traditional Indian wedding attire"
                width={768}
                height={1313}
                loading="lazy"
                sizes="(max-width: 680px) 92vw, 680px"
              />
            </figure>
            <a className="scroll-cue" href="#story">
              <span>Scroll to explore</span>
              <span aria-hidden="true" className="scroll-line" />
            </a>
          </header>
        </section>

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
          <span>
            {invitation.groom.parents.every(isPlaceholder)
              ? "The Mehta Family"
              : invitation.groom.parents.join(" & ")}
          </span>
        </div>
      </section>

      <section className="countdown-section section-wrap scroll-reveal" aria-labelledby="countdown-title">
        <SectionHeading eyebrow="Counting our blessings" title={<span style={{ fontSize: '2.05rem' }}>The celebration begins in</span>} />
        <Countdown />
        <p className="countdown-note">Until we celebrate together</p>
      </section>

      <section className="couple-section section-wrap scroll-reveal" id="couple">
        <SectionHeading eyebrow="Two families, one beautiful beginning" title="The couple" />
        <PhotoCarousel />
      </section>

      <section className="ceremony-section section-wrap scroll-reveal" id="ceremony">
        <div className="ceremony-frame">
          <p className="eyebrow">The wedding ceremony</p>
          <p className="ceremony-day">{invitation.wedding.day}</p>
          <p className="ceremony-date">
            <span>27</span>
            <span className="date-divider" />
            <span>December<br /><small>2026</small></span>
          </p>
          <span className="ceremony-rule" aria-hidden="true" />
          <p className="ceremony-time">Muhurat at <small>{invitation.wedding.muhurat}</small></p>
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
                  {events.map((event) => (
                    <li className="event-item" key={`${event.date}-${event.name}`}>
                      <span className="event-node" aria-hidden="true" />
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
        <SectionHeading eyebrow="Location" title="Meet us in Neemuch" />
        <div className="venue-card">
          <div className="venue-map-frame">
            <iframe
              title="Map showing Hotel Shreshta Paradise, Neemuch"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(`${invitation.venue.name}, ${invitation.venue.address}`)}&output=embed`}
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
              Get directions
            </a>
          </div>
        </div>
        
      </section>

      <section className="closing-section section-wrap scroll-reveal" id="rsvp">
        <p className="eyebrow">A celebration is better together</p>
        <h2 className="script-heading">We can’t wait to see you</h2>
        <p className="closing-copy">
          Your love, laughter, and blessings are the most precious gifts.
          Join us as we begin our forever.
        </p>
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
      </PageEffects>
    </main>
  );
}
