import Navbar   from './components/Navbar/Navbar';
import Hero     from './components/Hero/Hero';
import About    from './components/About/About';
import Services from './components/Services/Services';
import Contact  from './components/Contact/Contact';
import Footer   from './components/Footer/Footer';

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const App = () => (
  <>
    <Navbar />
    <Hero     onScrollTo={scrollTo} />
    <About    />
    <Services />
    <Contact  />
    <Footer   />
  </>
);

export default App;
