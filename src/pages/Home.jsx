import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Home.css';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="home-container"
    >
      <div className="page-container">
        <motion.div 
          className="founder-section"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="founder-content">
            <motion.div 
              className="founder-image-container"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src="https://i.postimg.cc/CxWpCq8K/image.jpg" 
                alt="Василий Иванович Меренков" 
                className="founder-image"
              />
            </motion.div>
            <div className="founder-text">
              <h2 className="founder-title">
                Я, Меренков Василий Иванович - основатель мебельной компании "Рост Мебель".
              </h2>
              <p className="founder-subtitle">Лично я сам:</p>
              <ul className="founder-list">
                <motion.li 
                  whileHover={{ x: 10 }}
                  className="founder-list-item"
                >
                  🚘 выезжаю на замер (с образцами и расцветками материалов)
                </motion.li>
                <motion.li 
                  whileHover={{ x: 10 }}
                  className="founder-list-item"
                >
                  📋 просчитываю заказ и рисую Вам эскиз
                </motion.li>
                <motion.li 
                  whileHover={{ x: 10 }}
                  className="founder-list-item"
                >
                  ✍️ заключаю договор
                </motion.li>
                <motion.li 
                  whileHover={{ x: 10 }}
                  className="founder-list-item"
                >
                  💰 контролирую финансовые операции
                </motion.li>
                <motion.li 
                  whileHover={{ x: 10 }}
                  className="founder-list-item"
                >
                  🗓️ регулирую дату установки заказа
                </motion.li>
              </ul>
              <p className="founder-note">
                Так же и другие производственные вопросы решаются через меня.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="company-description"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="description-text">
            Наша команда занимается изготовлением корпусной мебели с 2004 года.
          </p>
          
          <p className="description-text">
            Опыт работы и огромный багаж знаний в сфере мебели - это очень важно в нашей деятельности.
          </p>

          <p className="description-text">
            За ребят, которые трудятся в цеху я ручаюсь на все 💯%, они вкладывают свою душу в каждый новый проект.
          </p>

          <p className="description-text">
            Кто уже имел с нами дело, уверен, поддержат меня🤝.
          </p>

          <p className="description-text">
            Наш цех покидает именно та мебель, которую Вы будете эксплуатировать с большим удовольствием на протяжении долгого времени.
          </p>

          <p className="description-text">
            На сегодняшний день в своей работе мы достигли того, что⤵️:
          </p>

          <ul className="achievements-list">
            <motion.li 
              className="achievement-item"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              ✔️ - качество мебели, которую мы изготавливаем, определённо радует нас и наших клиентов🤗.
            </motion.li>
            <motion.li 
              className="achievement-item"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              ✔️ - мы создаём лучшую мебель и гордо заявляем об этом💪!
            </motion.li>
            <motion.li 
              className="achievement-item"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              ✔️ - наши ребята ответственно трудятся над каждым заказом и трепетно относятся к своей работе👌.
            </motion.li>
          </ul>

          <p className="description-text conclusion">
            Каждый день, на протяжении многих лет, мы радуем своих клиентов в Астане качественной и красивой мебелью, а значит МЫ не имеем права снижать нашу динамику развития🚀.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;