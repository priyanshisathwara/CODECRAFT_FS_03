import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1>About Tradivo</h1>
      <p className="intro">
        At <span>Tradivo</span>, we believe that fashion is more than just clothing — it's a statement of identity,
        creativity, and confidence. We're passionate about bringing you thoughtfully crafted collections that reflect both timeless style and contemporary trends.
      </p>

      <section className="mission">
        <h2>Our Mission</h2>
        <p>
          Our mission is to deliver high-quality, affordable fashion that inspires confidence and self-expression for everyone. From casual everyday essentials to standout statement pieces, we strive to offer something for every wardrobe.
        </p>
      </section>

      <section className="values">
        <h2>Why Choose Us?</h2>
        <ul>
          <li>Curated collections for Men, Women, and Unisex categories</li>
          <li>Premium quality fabrics & materials</li>
          <li>Affordable pricing without compromising style</li>
          <li>Customer-first policies and support</li>
        </ul>
      </section>

      <section className="commitment">
        <h2>Our Commitment</h2>
        <p>
          We are committed to sustainability, ethical sourcing, and reducing waste wherever possible. Our journey is rooted in both craftsmanship and care — for our customers and the planet.
        </p>
      </section>

      <p className="thank-you">
        Thank you for choosing <span>Tradivo</span>. We're proud to be a part of your style journey.
      </p>
    </div>
  );
};

export default About;
