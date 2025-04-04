import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PaperAirplaneIcon, PhoneIcon } from '@heroicons/react/24/outline';
import TimePicker from 'react-time-picker';
import useAuthStore from '../store/authStore';
import 'react-time-picker/dist/TimePicker.css';

const Footer = () => {
  const { isAdmin } = useAuthStore();
  const [formData, setFormData] = useState({
    question: '',
    phone: '',
    preferredTime: '12:00',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const footerData = {
      question: formData.question,
      phone: formData.phone,
      preferredTime: formData.preferredTime,
    };

    try {
      const response = await fetch('http://localhost:5000/footer-inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(footerData),
      });

      if (response.ok) {
        console.log('Данные отправлены');
        setFormData({ question: '', phone: '', preferredTime: '12:00' }); // Очистка формы
      } else {
        console.error('Ошибка при отправке данных');
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/rostmebel2003/',
      icon: '📸',
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/share/1X53g9gznV/',
      icon: '👥',
    },
    {
      name: 'Telegram',
      url: 'https://t.me/rostmebelbot/',
      icon: '✈️',
    },
  ];

  if (isAdmin) {
    return null;
  }

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-gray-900 shadow-md mt-auto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center">
            <PhoneIcon className="h-5 w-5 text-primary mr-2" />
            <a
              href="tel:+77014771598"
              className="hover:text-primary transition-colors duration-200"
            >
              +7 701 477 15 98 Василий
            </a>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-center text-sm">
              Если у Вас остались вопросы, напишите их и оставьте свой номер телефона
            </p>
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                placeholder="Ваш вопрос"
                value={formData.question}
                onChange={(e) =>
                  setFormData({ ...formData, question: e.target.value })
                }
                className="input-field"
                required
              />
              <div className="flex space-x-2">
                <input
                  type="tel"
                  placeholder="Номер телефона"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="input-field"
                  required
                />
                <TimePicker
                  onChange={(time) =>
                    setFormData({ ...formData, preferredTime: time })
                  }
                  value={formData.preferredTime}
                  className="input-field"
                  clearIcon={null}
                  format="HH:mm"
                  disableClock={true}
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="p-2 bg-primary hover:bg-primary-dark rounded-md transition-colors duration-200"
                >
                  <PaperAirplaneIcon className="h-5 w-5 text-white" />
                </motion.button>
              </div>
            </div>
          </form>

          <div className="flex justify-end space-x-6">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                className="text-2xl hover:text-primary transition-colors duration-200"
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;