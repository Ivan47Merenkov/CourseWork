import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import '../styles/Projects.css';

const imageSets = {
  'Кухня': [
    "https://i.postimg.cc/jjcrBQSd/1.jpg",
    "https://i.postimg.cc/7Zx49WqQ/2.jpg",
    "https://i.postimg.cc/6qjrPPDL/3.jpg",
    "https://i.postimg.cc/sgZYnwK7/4.jpg",
    "https://i.postimg.cc/rmgxdbFX/5.jpg",
    "https://i.postimg.cc/9fYqSS9R/6.jpg",
    "https://i.postimg.cc/PJrcZBWm/7.jpg",
    "https://i.postimg.cc/TY1FPvYx/8.jpg",
    "https://i.postimg.cc/1zhjMg0R/9.jpg",
    "https://i.postimg.cc/FswWsfBb/10.jpg"
  ],
  'Прихожая': [
    "https://i.postimg.cc/fRvJktvt/1.jpg",
    "https://i.postimg.cc/V6J677Pn/2.jpg",
    "https://i.postimg.cc/dVnVJMqG/3.jpg",
    "https://i.postimg.cc/kM8MBRJJ/4.jpg",
    "https://i.postimg.cc/jSqRg8z2/5.jpg",
    "https://i.postimg.cc/0QSvMhqW/6.jpg",
    "https://i.postimg.cc/tRhyX0k7/7.jpg",
    "https://i.postimg.cc/7Y9k2gpk/8.jpg",
    "https://i.postimg.cc/tgZQw87q/9.jpg",
    "https://i.postimg.cc/vTvp5s2z/10.jpg"
  ],
  'Офисная': [
    "https://i.postimg.cc/MHRrY8s4/1.jpg",
    "https://i.postimg.cc/Gt0Xt5cj/2.jpg",
    "https://i.postimg.cc/kXmjdzYJ/3.jpg",
    "https://i.postimg.cc/xT36j5BK/4.jpg",
    "https://i.postimg.cc/rm49BNSR/5.jpg",
    "https://i.postimg.cc/8cBm5kX1/6.jpg",
    "https://i.postimg.cc/hGz8m1ZZ/7.jpg",
    "https://i.postimg.cc/k50QvRkJ/8.jpg",
    "https://i.postimg.cc/T19nx7h1/9.jpg",
    "https://i.postimg.cc/9Qzy3B2X/10.jpg"
  ],
  'Шкафы': [
    "https://i.postimg.cc/rpVsXVx1/1.jpg",
    "https://i.postimg.cc/BZkgC61w/2.jpg",
    "https://i.postimg.cc/GhDjgCF3/3.jpg",
    "https://i.postimg.cc/GmJxrxgZ/4.jpg",
    "https://i.postimg.cc/SxrCHNJ4/5.jpg",
    "https://i.postimg.cc/Prbw8rbD/6.jpg",
    "https://i.postimg.cc/QdXWgGSy/7.jpg",
    "https://i.postimg.cc/vZ3x3qNH/8.jpg",
    "https://i.postimg.cc/905Drvr1/9.jpg",
    "https://i.postimg.cc/bNRZwV8H/10.jpg"
  ]
};

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('Кухня');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalImage, setModalImage] = useState(null);

  const images = imageSets[selectedCategory];

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="projects-container">
      <div className="category-buttons">
        {Object.keys(imageSets).map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? 'active' : ''}
            onClick={() => { setSelectedCategory(category); setCurrentIndex(0); }}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="carousel">
        <button onClick={prevImage} className="arrow left">‹</button>
        <AnimatePresence mode="wait">
          <motion.img
            key={images[currentIndex]}
            src={images[currentIndex]}
            alt={`Проект ${selectedCategory}`}
            onClick={() => setModalImage(images[currentIndex])}
            className="carousel-image"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
          />
        </AnimatePresence>
        <button onClick={nextImage} className="arrow right">›</button>
      </div>

      {modalImage && (
        <div className="modal" onClick={() => setModalImage(null)}>
          <img src={modalImage} alt="Увеличенное изображение" />
        </div>
      )}
    </div>
  );
};

export default Projects;