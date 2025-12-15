'use client';
import Layout from '@/components/layout/Layout';
import HeroSlider from '@/components/home/HeroSlider';
import AboutSection from '@/components/home/AboutSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/home/FAQSection';

export default function Home() {
  return (
    <Layout>
      <HeroSlider />
      <AboutSection />
      <WhyChooseUs />
      <TestimonialsSection />
      <FAQSection />
    </Layout>
  );
}
