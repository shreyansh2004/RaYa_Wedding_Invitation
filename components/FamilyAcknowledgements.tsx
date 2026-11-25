import type { Language } from "../data/translations";

type AcknowledgementGroup = {
  heading: string;
  names: string[];
};

type AcknowledgementCopy = {
  eyebrow: string;
  memorialHeading: string;
  memorialName: string;
  groups: AcknowledgementGroup[];
  invitationHeading: string;
  invitationText: string;
  familyHeading: string;
  familyText: string;
};

const copy: Record<Language, AcknowledgementCopy> = {
  en: {
    eyebrow: "Our family and well-wishers",
    memorialHeading: "Vinayashri",
    memorialName: "Late Shri Bhanwarlalji Kothari",
    groups: [
      {
        heading: "Well-wishers",
        names: [
          "Sujanmal - Smt. Madhubala Kothari",
          "Prakashchandra - Smt. Pukhraj Kothari",
          "Ashok Kothari",
          "Vijay - Smt. Sunita Kothari",
          "Rajesh - Smt. Alka Kothari",
          "Yatindra - Smt. Hema Kothari",
          "Pt. Vijay - Sarita Sharma"
        ],
      },
      {
        heading: "Distinguished family",
        names: [
          "Smt. Madhubala - Shri Narendraji Kavadia",
          "Smt. Kiran - Shri Dineshji Nagawat",
          "Smt. Sonal - Shri Tarunji Gang",
          "Smt. Mona - Shri Vipulji Saraf",
          "Praveen - Smt. Sushma Dhakad",
        ],
      },
      {
        heading: "The welcoming family",
        names: [
          "Ayush - Dr. Isha Kothari",
          "Dr. Aarchi",
          "Shreyansh and Sambhav Kothari",
        ],
      },
      {
        heading: "With special thanks",
        names: ["Aadish - Pragati Nagawat", "Amish Nagawat"],
      },
      {
        heading: "The joy of our home",
        names: ["Risha, Samaksh, Mokshi, Krishiv and Kridha"],
      },
    ],
    invitationHeading: "Maternal Side",
    invitationText:
      "Shri Sunilji, Rajeshji, Deepakji, Ashishji, Amitji, Dakshji, Devji, Ku. Hiral, Ku. Akshara, and the Bohra family of Ratlam (M.P.).",
    familyHeading: "Baraat",
    familyText:
      "Shri Rajmalji, Pradipji, and the Santoshji Mehta family of Neemuch warmly invite you to join us at Shreshta Paradise Marriage Garden, Neemuch.",
  },
  hi: {
    eyebrow: "परिवार एवं शुभचिंतक",
    memorialHeading: "दिव्याशीष :",
    memorialName: "स्व. श्री भंवरलालजी कोठारी",
    groups: [
      {
        heading: "दर्शनाभिलाषी :",
        names: [
          "सुजानमल - सौ. मधुबाला कोठारी",
          "प्रकाशचन्द्र - सौ. पुखराज कोठारी",
          "अशोक कोठारी",
          "विजय - सौ. सुनीता कोठारी",
          "राजेश - सौ. अलका कोठारी",
          "यतीन्द्र - सौ. हेमा कोठारी",
          "पं. विजय - सरिता शर्मा"
        ],
      },
      {
        heading: "स्वागतातुर :",
        names: [
          "आयुष - डॉ. ईशा कोठारी",
          "डॉ. आर्ची",
          "श्रेयांश एवं संभव कोठारी",
        ],
      },
      {
        heading: "प्रतिक्षारत :",
        names: [
          "सौ. मधुबाला - श्री नरेन्द्र जी कावड़िया",
          "सौ. किरण - श्री दिनेश जी नागावत",
          "सौ. सोनल - श्री तरुण जी गांग",
          "सौ. मोना - श्री विपुल जी सराफ",
          "प्रवीण - सौ. सुषमा धाकड़",
        ],
      },
      {
        heading: "विशेष आग्रह :",
        names: ["आदिश - प्रगति नागावत", "अमीश नागावत"],
      },
      {
        heading: "घर की रौनक :",
        names: ["रिशा, समक्ष, मौक्षी, क्रिशिव एवं कृधा"],
      },
    ],
    invitationHeading: "ननिहाल पक्ष :",
    invitationText:
      "श्रीमान सुनील जी, राजेश जी, दीपक जी, आशीष जी, अमित जी, दक्ष जी, देव जी, कु. हिरल, कु. अक्षरा एवं बोहरा परिवार, रतलाम (म.प्र.)।",
    familyHeading: "बारात :",
    familyText:
      "श्रीमान राजमलजी, प्रदीपजी, सन्तोषजी मेहता परिवार, नीमच वालों के यहाँ से श्रेष्ठा पैराडाइज मेरिज गार्डन, नीमच आवेंगे।",
  },
};

export function FamilyAcknowledgements({ language }: { language: Language }) {
  const content = copy[language];

  return (
    <section
      className="family-acknowledgements section-wrap scroll-reveal"
      lang={language}
      aria-label={content.eyebrow}
    >
      <div className="family-acknowledgements__memorial">
        <h3>{content.memorialHeading}</h3>
        <p>{content.memorialName}</p>
      </div>

      <div className="family-acknowledgements__groups">
        {content.groups.map((group) => (
          <section className="family-acknowledgements__group" key={group.heading}>
            <h3>{group.heading}</h3>
            <ul>
              {group.names.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="family-acknowledgements__notes">
        <section>
          <h3>{content.invitationHeading}</h3>
          <p>{content.invitationText}</p>
        </section>
        <section>
          <h3>{content.familyHeading}</h3>
          <p>{content.familyText}</p>
        </section>
      </div>
    </section>
  );
}
