import { useEffect, useState } from "react";
import FakeAdsGroup from "./FakeAdsGroup";

export default function AdBanner({ slot }) {
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({
          params: {
            onload: () => setFilled(true),
          },
        });
      } catch (e) {
        console.log("Adsense error:", e);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  // Si NO carga el anuncio → mostrar los 3 anuncios falsos
  if (!filled) return <FakeAdsGroup />;

  return (
    <ins
      className="adsbygoogle"
      style={{
        display: "block",
        margin: "20px auto",
        height: "280px",
        maxWidth: "1139px",
      }}
      data-ad-client="ca-pub-1847530313703781"
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
      data-ad-test="on"
    ></ins>
  );
}



