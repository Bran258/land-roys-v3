import { useEffect } from "react";

export default function AdBanner({ slot }) {
  useEffect(() => {
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      console.log("Adsense load error:", e);
    }
  }, []);

  return (
    <ins
        className="adsbygoogle"
        style={{ display: "block", margin: "20px auto" }}
        data-ad-client="ca-pub-1847530313703781"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
        data-ad-test="on"   // ← Fuerza anuncios de prueba
    ></ins>

  );
}


