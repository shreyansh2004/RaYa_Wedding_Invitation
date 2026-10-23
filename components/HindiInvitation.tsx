import Image from "next/image";
import { Countdown } from "./Countdown";
import { FallingLeaves } from "./FallingLeaves";
import { PhotoCarousel } from "./PhotoCarousel";
import {
  formatEventDate,
  formatEventTimeForDateTime,
  invitation,
  isPlaceholder,
} from "../data/invitation";

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

export function HindiInvitation() {
  const eventGroups = Array.from(new Set(invitation.events.map((event) => event.date))).sort();

  return (
    <>
      <section className="hero-scroll-scene" aria-label="विवाह का निमंत्रण">
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
      <p className="hero-wedding-label">शुभ विवाह</p>
      <h1 className="hero-title hero-title--hi">
  {/* Add the hero-bride class here */}
  <span className="hero-bride">iryaa</span>
  
  <i aria-hidden="true" className="hero-sang">संग</i>
  
  <span className="hero-groom">rahula</span>
</h1>
      <p className="hero-date">27 <span>·</span> 12 <span>·</span> 2026</p>
      <p className="hero-day">रविवार <span aria-hidden="true">|</span> नीमच</p>
    </div>
  </div>
          <figure className="hero-art">
            <Image
              src={`${basePath}/wedding-couple1.png`}
              alt="पारंपरिक भारतीय विवाह परिधान में रिया और राहुल"
              width={768}
              height={1313}
              loading="lazy"
              sizes="(max-width: 680px) 92vw, 680px"
            />
          </figure>
          <a className="scroll-cue" href="#story">
            <span>जानने के लिए नीचे स्क्रॉल करें</span>
            <span aria-hidden="true" className="scroll-line" />
          </a>
        </header>
      </section>

      <FallingLeaves />

      <section className="invitation-section section-wrap scroll-reveal" id="story">
        <SectionHeading eyebrow="एक मंगलमय शुरुआत" title="आपके स्नेह और आशीर्वाद सहित" />
        <p className="invitation-copy">
          हम आपको दो दिलों के एक होने के इस मंगल अवसर पर आमंत्रित
          करते हैं। आपकी उपस्थिति हमारे उत्सव को पूर्ण और हमारी यादों को और भी खूबसूरत बनाएगी।
        </p>
        <p className="invitation-signoff">स्नेह सहित, निलेश - सुनीता कोठारी</p>
      </section>

      <section
        className="countdown-section section-wrap scroll-reveal"
        aria-labelledby="countdown-title"
      >
        <SectionHeading
          eyebrow="शुभ घड़ियों की प्रतीक्षा"
          title={<span style={{ fontSize: "2.05rem" }}>उत्सव शुरू होने में शेष</span>}
        />
        <Countdown language="hi" />
        <p className="countdown-note">जब तक हम साथ मिलकर उत्सव मनाएँ</p>
      </section>

      <section className="couple-section section-wrap scroll-reveal" id="couple">
        <SectionHeading eyebrow="दो परिवार, एक खूबसूरत शुरुआत" title="वर-वधू" />
        <PhotoCarousel language="hi" />
      </section>

      <section className="events-section section-wrap scroll-reveal" id="celebration">
        <SectionHeading eyebrow="शुभ आयोजन" title="उत्सव का समय" />
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
            const hindiEventNames = {
              Chaak: "चाक",
              Mamera: "मायरा",
              Haldi: "हल्दी",
              Reception: "स्वागत समारोह एवं स्वरुचि भोज",
              Jaimala: "जयमाला",
              "Wedding Ceremony": "विवाह समारोह",
            } as const;

            return (
              <div className="event-day" key={date}>
                <div className="event-day-heading">
                  <span>{weddingDay ? "विवाह का दिन" : "विवाह से एक दिन पहले"}</span>
                  <time dateTime={date}>{formatEventDate(date, "hi")}</time>
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
                      <span className="event-name">{hindiEventNames[event.name]}</span>
                    </li>
                  ))}
                </ol>
              </div>
            );
          })}
        </div>
      </section>

      <section className="venue-section section-wrap scroll-reveal" id="venue">
        <SectionHeading eyebrow="विवाह स्थल" title="होटल श्रेष्ठा पैराडाइज़, नीमच, मध्य प्रदेश" />
        <div className="venue-card">
          <div className="venue-map-frame">
            <iframe
              title="होटल श्रेष्ठा पैराडाइज़, नीमच का नक्शा"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(`${invitation.venue.name}, ${invitation.venue.address}`)}&output=embed&hl=hi`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <div className="venue-details">
            
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
              रास्ता देखें
            </a>
          </div>
        </div>
      </section>

      <section className="closing-section section-wrap scroll-reveal" id="rsvp">
        <p className="eyebrow">साथ मिलकर उत्सव और भी खास होता है</p>
        <h2 className="script-heading">आपसे मिलने की प्रतीक्षा है</h2>
        <p className="closing-copy">
          आपका स्नेह, हँसी और आशीर्वाद हमारे लिए सबसे अनमोल उपहार हैं। हमारे नए जीवन की शुरुआत में
          शामिल हों।
        </p>
        <p className="closing-families">स्नेह सहित, कोठारी परिवार</p>
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
        <p>रिया और राहुल के लिए स्नेह से बनाया · 27.12.2026</p>
      </footer>
    </>
  );
}
