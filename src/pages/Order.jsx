import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import AuthModal from '../components/AuthModal';
import '../styles/Order.css';

const Order = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [step, setStep] = useState(1);
  const [furnitureType, setFurnitureType] = useState('');
  const [hasProject, setHasProject] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [wishes, setWishes] = useState('');
  const [wallLength, setWallLength] = useState(250);
  const [ceilingHeight, setCeilingHeight] = useState(250);
  const [showConfirm, setShowConfirm] = useState(false);
  const [finalMessage, setFinalMessage] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    }
  }, [isAuthenticated]);

  const nextStep = () => {
    if (
      (step === 1 && furnitureType) ||
      (step === 2 && hasProject) ||
      (step === 3 && wishes.trim() !== '') ||
      step === 4
    ) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleFileUpload = (e) => {
    setUploadedFile(e.target.files[0]);
  };

  const handleSubmitOrder = async () => {
    const orderData = {
      furniture_type: furnitureType,
      has_project: hasProject === 'yes',
      wishes: wishes,
      wall_length: wallLength,
      ceiling_height: ceilingHeight,
    };
  
    try {
      const response = await fetch('http://localhost:5000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Данные отправлены:', data);
        setStep(1);
        setFinalMessage('Заказ оформлен успешно!');
      } else {
        console.error('Ошибка при отправке данных');
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };  

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page-container"
    >
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

      {isAuthenticated && (
        <div className="order-container">
          <div className="step-bar">
            <div className="progress-line" style={{ width: `${(step - 1) * 33}%` }} />
            <span className="step-label">Шаги</span>
            <span className="step-count">{step}/4</span>
          </div>

          <div className="question-box">
            {step === 1 && (
              <>
                <h2>Какую мебель хотели бы заказать?</h2>
                <div className="option-grid">
                  {['Кухонную', 'Прихожую', 'Офисную', 'Шкаф'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setFurnitureType(type)}
                      className={furnitureType === type ? 'active' : ''}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2>Есть ли у Вас понравившийся проект?</h2>
                <div className="option-grid">
                  <button
                    className={hasProject === 'yes' ? 'active' : ''}
                    onClick={() => setHasProject('yes')}
                  >
                    Да
                  </button>
                  <button
                    className={hasProject === 'no' ? 'active' : ''}
                    onClick={() => setHasProject('no')}
                  >
                    Пока не выбирал (-а)
                  </button>
                </div>
                {hasProject === 'yes' && (
                  <div className="upload-block">
                    <label>Загрузите фото проекта:</label>
                    <input type="file" onChange={handleFileUpload} />
                  </div>
                )}
              </>
            )}

            {step === 3 && (
              <>
                <h2>Пожелания по технике, материалу, бюджету:</h2>
                <textarea
                  value={wishes}
                  onChange={(e) => setWishes(e.target.value)}
                  placeholder="Ваши пожелания..."
                  rows="5"
                />
              </>
            )}

            {step === 4 && (
              <>
                <h2>Укажите размеры места:</h2>
                <div className="slider-block">
                  <label>Длина стен: {wallLength} см</label>
                  <input
                    type="range"
                    min="100"
                    max="600"
                    value={wallLength}
                    onChange={(e) => setWallLength(e.target.value)}
                  />
                  <label>Высота потолка: {ceilingHeight} см</label>
                  <input
                    type="range"
                    min="200"
                    max="400"
                    value={ceilingHeight}
                    onChange={(e) => setCeilingHeight(e.target.value)}
                  />
                </div>
              </>
            )}

            {step === 5 && !finalMessage && (
              <div className="confirm-block">
                <h2>Оформить предварительный онлайн-заказ?</h2>
                <div className="option-grid">
                  <button onClick={() => handleSubmitOrder()}>Оформить</button>
                  <button onClick={() => prevStep()}>Назад</button>
                </div>
              </div>
            )}

            {step === 5 && finalMessage && (
              <h2 className="final-message">{finalMessage}</h2>
            )}

            {step === 4 && (
              <div className="final-message">
                <h2>Если Вы указали все детали, можете отправлять данные.</h2>
                <div className="option-grid">
                  <button onClick={prevStep}>Назад</button>
                  <button onClick={handleSubmitOrder}>Оформить</button>
                </div>
              </div>
            )}
          </div>

          {!finalMessage && (
            <div className="step-buttons">
              {step > 1 && <button onClick={prevStep}>← Назад</button>}
              {step < 4 && <button onClick={nextStep}>Вперёд →</button>}
              {step === 4 && !showConfirm && (
                <button onClick={() => setShowConfirm(true)}>Далее →</button>
              )}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default Order;