import {Link} from 'react-router-dom'

function HeroSection() {
  return (
    <>
      <div className="hero">
        <div className="hero-text">
          <h1>Find Your Next Book</h1>
          <p>Not sure what to read?</p>

          <button><Link to="/books" className='nav-link'>Explore Now!</Link></button>
        </div>

        <img src="./src/assets/hero-image.avif"></img>
      </div>
    </>
  );
}

export default HeroSection;
