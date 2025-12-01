import React from 'react'
import HeroSection from '../../components/home/HeroSection';
import ModelsSection from '../../components/home/ModelsSection';
import PilaresSection from '../../components/home/PilaresSection';
import ModeloInsigniaSection from '../../components/home/ModeloInsigniaSection';
import TrustCounter from '../../components/home/TrustCounter';
import AdBanner from '../../components/AdBanner';


const Home = () => {
  return (
    <>
      <HeroSection />
      {/* AQUÍ VA EL ANUNCIO */}
      <AdBanner slot="7231951440" />
      <TrustCounter />
      <ModelsSection />
      <PilaresSection />
      <ModeloInsigniaSection />
    </>
  )
}

export default Home;