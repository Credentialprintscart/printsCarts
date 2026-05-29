import AboutHero from '../components/about/AboutHero/AboutHero';
import AboutWhoWeAre from '../components/about/AboutWhoWeAre/AboutWhoWeAre';
import AboutOffers from '../components/about/AboutOffers/AboutOffers';
import AboutCommitment from '../components/about/AboutCommitment/AboutCommitment';
import AboutWhyChoose from '../components/about/AboutWhyChoose/AboutWhyChoose';
import AboutVisionValues from '../components/about/AboutVisionValues/AboutVisionValues';
import AboutThankYou from '../components/about/AboutThankYou/AboutThankYou';
import '../styles/pages.css';

const AboutUs = () => {
  return (
    <>
      
      <div className="about-us-page" style={{ background: '#ffffff', minHeight: '100vh' }}>
        <div className="about-us-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px 100px 20px' }}>
          <AboutHero />
          <AboutWhoWeAre />
          <AboutOffers />
          <AboutCommitment />
          <AboutWhyChoose />
          <AboutVisionValues />
          <AboutThankYou />
        </div>
      </div>
      
    </>
  );
};

export default AboutUs;

