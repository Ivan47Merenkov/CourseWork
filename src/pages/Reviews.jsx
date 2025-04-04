import React, { useState } from 'react';
import '../styles/Reviews.css';

const reviewImages = [
  "https://i.postimg.cc/nhfdYzQG/1.jpg",
  "https://i.postimg.cc/525sPVBd/2.jpg",
  "https://i.postimg.cc/9z5Bp8zQ/3.jpg",
  "https://i.postimg.cc/y6g4LDWM/4.jpg",
  "https://i.postimg.cc/xTLrSBvg/5.jpg",
  "https://i.postimg.cc/765ctRP3/6.jpg",
  "https://i.postimg.cc/Kz3qDgQQ/7.jpg",
  "https://i.postimg.cc/Wbw98V6R/8.jpg",
  "https://i.postimg.cc/HLVBTyGH/9.jpg",
  "https://i.postimg.cc/76z92rYW/10.jpg"
];

const Reviews = () => {
  const [modalImage, setModalImage] = useState(null);

  return (
    <div className="reviews-container">
      <h1 className="reviews-title">Отзывы наших клиентов</h1>
      <div className="reviews-gallery">
        {reviewImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Отзыв ${index + 1}`}
            className="review-img"
            onClick={() => setModalImage(src)}
          />
        ))}
      </div>

      {modalImage && (
        <div className="modal" onClick={() => setModalImage(null)}>
          <img src={modalImage} alt="Увеличенный отзыв" />
        </div>
      )}
    </div>
  );
};

export default Reviews;