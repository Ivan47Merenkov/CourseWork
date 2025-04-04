import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import ReactPlayer from 'react-player';
import { Tooltip } from 'react-tooltip';
import '../styles/Production.css';

const Production = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [selectedMedia, setSelectedMedia] = useState(null);

  const manufacturers = [
    {
      logo: 'https://i.postimg.cc/PrH0nVPb/Egger.png',
      url: 'https://www.egger-russia.ru/',
      tooltip: 'ЛДСП, столешница'
    },
    {
      logo: 'https://i.postimg.cc/qqZT78tX/Blum.png',
      url: 'https://www.blum.com/kz/ru/',
      tooltip: 'Фурнитура'
    },
    {
      logo: 'https://i.postimg.cc/HsxS0qKL/Boyard.png',
      url: 'https://www.boyard.biz/',
      tooltip: 'Фурнитура'
    }
  ];

  const stages = [
    {
      title: '1. Предварительный',
      content: 'Вы пишите размеры желаемой мебели, Вас ориентируют по цене, если всё устраивает, договариваетесь на замер. На месте все детали обговариваем, дизайнер рисует эскиз, считает окончательную стоимость и скидывает Вам на рассмотрение. Планируете встречу, заключаете договор и Вы вносите предоплату в размере 70% (после чего Вам выбивается фискальный чек).'
    },
    {
      title: '2. Производственный',
      content: 'Наверняка, многим интересен сам процесс изготовления.\nБесконечно можно смотреть на три вещи: как горит огонь, как течёт вода и как работает другой человек.\nПри производстве мебели можно выделить несколько основных этапов:\n> раскрой деталей,\n> облицовка кромки,\n> проделывание необходимых отверстий,\n> непосредственная сборка изделий.'
    },
    {
      title: '3. Уточняющий',
      content: 'За пару дней до установки, мы уточняем, всё ли готово у заказчика для того, чтобы мы могли привезти мебель (ремонт, потолок, привезли ли технику и т.д.) и договариваемся на определённый день.'
    },
    {
      title: '4. Сборка и установка',
      content: 'Привозим мебель и приступаем к установке. Проделав все этапы работы, принимаем БЛАГОДАРНОСТЬ и остаток оплаты (30%).'
    }
  ];

  const media = [
    {
      type: 'video',
      url: 'https://ru.files.fm/u/qqykb6gkuy',
      thumbnail: 'URL_TO_THUMBNAIL_1'
    },
    {
      type: 'image',
      url: 'https://i.postimg.cc/NG4z25Rh/image.jpg'
    },
    {
      type: 'video',
      url: 'https://ru.files.fm/u/ppneabwu2n',
      thumbnail: 'URL_TO_THUMBNAIL_2'
    }
  ];

  const nextStage = () => {
    setCurrentStage((prev) => (prev + 1) % stages.length);
  };

  const prevStage = () => {
    setCurrentStage((prev) => (prev - 1 + stages.length) % stages.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="production-container"
    >
      <div className="page-container">
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="intro-section"
        >
          <p className="intro-text">
            Работать с плохим материалом нам самим не в удовольствие. Поэтому мы сотрудничаем 
            только с проверенными и добросовестными производителями. С ними можно ознакомиться ниже:
          </p>

          <div className="manufacturers-grid">
            {manufacturers.map((manufacturer, index) => (
              <motion.a
                key={index}
                href={manufacturer.url}
                target="_blank"
                rel="noopener noreferrer"
                className="manufacturer-logo"
                whileHover={{ scale: 1.05 }}
                data-tooltip-id={`manufacturer-${index}`}
                data-tooltip-content={manufacturer.tooltip}
              >
                <img src={manufacturer.logo} alt="Производитель" className="w-full h-auto" />
                <Tooltip id={`manufacturer-${index}`} />
              </motion.a>
            ))}
          </div>

          <p className="mdf-text">
            Также сотрудничаем с проверенными производителями МДФ (фасадов).
          </p>
        </motion.section>

        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="stages-section"
        >
          <h2 className="stages-title">Этапы изготовления мебели</h2>

          <div className="stages-carousel">
            <button
              onClick={prevStage}
              className="carousel-button"
              aria-label="Предыдущий этап"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>

            <div className="stage-content">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="stage-text"
                >
                  <h3 className="stage-title">{stages[currentStage].title}</h3>
                  <p className="stage-description">{stages[currentStage].content}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              onClick={nextStage}
              className="carousel-button"
              aria-label="Следующий этап"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
        </motion.section>

        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="media-section"
        >
          <div className="media-grid">
            {media.map((item, index) => (
              <motion.div
                key={index}
                className="media-item"
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedMedia(item)}
              >
                {item.type === 'video' ? (
                  <div className="video-thumbnail">
                    <ReactPlayer
                      url={item.url}
                      width="100%"
                      height="100%"
                      light={item.thumbnail}
                      playing={selectedMedia === item}
                    />
                  </div>
                ) : (
                  <img src={item.url} alt="Производство" className="media-image" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {selectedMedia && (
          <div className="media-modal" onClick={() => setSelectedMedia(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              {selectedMedia.type === 'video' ? (
                <ReactPlayer
                  url={selectedMedia.url}
                  width="100%"
                  height="100%"
                  controls
                  playing
                />
              ) : (
                <img src={selectedMedia.url} alt="Производство" />
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Production;