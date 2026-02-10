import HeroEnhanced from '@/components/landing/HeroEnhanced';
import TrustBar from '@/components/landing/TrustBar';
import SixDoors from '@/components/landing/SixDoors';
import ImpactMetrics from '@/components/landing/ImpactMetrics';
import Services from '@/components/landing/Services';
import Industries from '@/components/landing/Industries';
import GlobalMap from '@/components/landing/GlobalMap';
import Newsletter from '@/components/landing/Newsletter';
import Contact from '@/components/landing/Contact';

async function getHeroSlides() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/hero`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch {
    return null;
  }
}

export default async function Home() {
  const heroSlides = await getHeroSlides();

  return (
    <>
      <HeroEnhanced slides={heroSlides} />
      <TrustBar />
      <SixDoors />
      <ImpactMetrics />
      <Services />
      <Industries />
      <GlobalMap />
      <Newsletter />
      <Contact />
    </>
  );
}

