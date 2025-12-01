import { useEffect, useState } from "react";
import ad1 from "../assets/ads/ads1.png";
import ad2 from "../assets/ads/ads2.png";
import ad3 from "../assets/ads/ads3.png";

export default function FakeAdsRotating({ slot }) {
  const ads = [ad1, ad2, ad3];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ads.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{
        display: "block",
        margin: "20px auto",
        height: "280px",
        maxWidth: "1139px",
        position: "relative",
        overflow: "hidden",
        borderRadius: "8px"
      }}
      data-ad-client="ca-pub-1847530313703781"
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
      data-ad-test="on"
    >
      {/* Imagen simulando anuncio real */}
      <img
        src={ads[index]}
        alt={`Publicidad ${index + 1}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          inset: 0,
          transition: "opacity 0.6s ease-in-out"
        }}
      />
    </ins>
  );
}

