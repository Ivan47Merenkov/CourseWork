import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Information.css';

const Information = () => {
  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="info-container"
    >
      <div className="page-container">
        <motion.section 
          className="info-card"
          {...fadeInUp}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="info-card-content"
          >
            <h2 className="info-card-title">
              Есть какие-нибудь ценники на мебель?
            </h2>
            <p className="info-card-text">
              Мы не считаем какую-либо мебель на заказ погонными (квадратными) метрами, 
              поскольку это сугубо индивидуальное изделие. Для того, чтобы озвучить 
              сколько будет стоить именно Ваша мебель - нам нужны примерные размеры. 
              Помимо этого, цена варьируется в зависимости от выбора материала. 
              Таким образом и формируется ценник на заказ💰.
            </p>
          </motion.div>
        </motion.section>

        <motion.section 
          className="info-card"
          {...fadeInUp}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="info-card-content"
          >
            <h2 className="info-card-title">
              Как долго ждать?
            </h2>
            <p className="info-card-text">
              Сам процесс изготовления мебели длится 1-2 недели. Мы обязательно 
              оговариваем и прописываем сроки с запасом, но устанавливаем всегда 
              раньше по договору. Продолжительности монтажа (установки) мебели 
              зависят от сложности и объёма проекта📜.
            </p>
          </motion.div>
        </motion.section>

        <motion.section 
          className="info-card"
          {...fadeInUp}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="info-card-content"
          >
            <h2 className="info-card-title">
              Какие даёте гарантии?
            </h2>
            <p className="info-card-text">
              В первую очередь, хочется упомянуть, что личность руководителя компании 
              не скрывается, Вы можете часто видеть его на нашей странице и сайте, 
              как и других работников. Также все отзывы правдивые, никнеймы и фотографии 
              клиентов мы транслируем на странице, показывая нашу честность и безучастность 
              к мошенничеству. Стоит упомянуть, что мы работаем по договору и фискальному чеку. 
              И, конечно, немаловажно, что мы открылись не вчера, не год и даже не 5 лет назад! 
              За годы нашей компании так называемое "сарафанное радио" делает своё дело. 
              Многочисленные отзывы, общение с аудиторией, наша открытость только располагает 
              клиентов к компании. Будем помнить, что лучше всех могут порекомендовать те люди, 
              которые с нами уже знакомы и доверились нам✔.
            </p>
          </motion.div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default Information;