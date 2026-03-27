import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
// {{CONTENT_IMPORTS}}
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      {/* {{CONTENT_SECTIONS}} */}
      <Footer />
    </main>
  );
}
