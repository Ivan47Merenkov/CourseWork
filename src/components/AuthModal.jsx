import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import useAuthStore from '../store/authStore';

const generateCaptcha = () => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let captcha = '';
  for (let i = 0; i < 6; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
};

const AuthModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [userCaptcha, setUserCaptcha] = useState('');
  const [captchaError, setCaptchaError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const { login, registerUser, checkExistingUser } = useAuthStore();

  const districts = ['Сарыарка', 'Алматы', 'Байконур', 'Есиль', 'Нура'];

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setUserCaptcha('');
    setCaptchaError(false);
  };

  const validatePassword = (value) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(value) || 'Пароль должен содержать минимум 8 символов, включая заглавную и строчную буквы, цифру и специальный символ';
  };

  const onSubmit = (data) => {
    if (userCaptcha !== captcha) {
      setCaptchaError(true);
      return;
    }

    if (!isLogin && checkExistingUser(data.email, data.phone)) {
      alert('Пользователь с такой почтой или телефоном уже существует');
      return;
    }

    if (isLogin) {
      const loginSuccess = login(data);
      if (!loginSuccess) {
        setLoginError(true);
        return;
      }
    } else {
      registerUser(data);
      const loginSuccess = login(data);
      if (!loginSuccess) {
        setLoginError(true);
        return;
      }
    }

    setLoginError(false);
    onClose();
    navigate('/order');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4"
          >
            <h2 className="text-2xl font-bold text-center mb-6">
              {isLogin ? 'Вход' : 'Регистрация'}
            </h2>

            {loginError && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                Аккаунт не найден, попробуйте заменить данные или зарегистрироваться
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Имя</label>
                <input
                  type="text"
                  {...register('username', { required: 'Обязательное поле' })}
                  className="input-field"
                />
                {errors.username && (
                  <span className="text-red-500 text-sm">{errors.username.message}</span>
                )}
              </div>

              {!isLogin && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      {...register('email', { required: 'Обязательное поле' })}
                      className="input-field"
                    />
                    {errors.email && (
                      <span className="text-red-500 text-sm">{errors.email.message}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Район</label>
                    <select
                      {...register('district', { required: 'Выберите район' })}
                      className="input-field"
                    >
                      <option value="">Выберите район</option>
                      {districts.map(district => (
                        <option key={district} value={district}>{district}</option>
                      ))}
                    </select>
                    {errors.district && (
                      <span className="text-red-500 text-sm">{errors.district.message}</span>
                    )}
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium mb-1">Телефон</label>
                <InputMask
                  mask="+7 (999) 999-99-99"
                  {...register('phone', { required: 'Обязательное поле' })}
                  className="input-field"
                />
                {errors.phone && (
                  <span className="text-red-500 text-sm">{errors.phone.message}</span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Пароль</label>
                <input
                  type="password"
                  {...register('password', {
                    required: 'Обязательное поле',
                    validate: validatePassword
                  })}
                  className="input-field"
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">{errors.password.message}</span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Капча</label>
                <div className="flex items-center space-x-2">
                  <div className="bg-gray-100 p-2 rounded select-none">{captcha}</div>
                  <button
                    type="button"
                    onClick={refreshCaptcha}
                    className="text-primary hover:text-primary-dark"
                  >
                    ↻
                  </button>
                </div>
                <input
                  type="text"
                  value={userCaptcha}
                  onChange={(e) => setUserCaptcha(e.target.value)}
                  className="input-field mt-2"
                  placeholder="Введите капчу"
                />
                {captchaError && (
                  <span className="text-red-500 text-sm">Неверная капча</span>
                )}
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setLoginError(false);
                  }}
                  className="text-primary hover:text-primary-dark"
                >
                  {isLogin ? 'Создать аккаунт' : 'Уже есть аккаунт?'}
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  {isLogin ? 'Войти' : 'Зарегистрироваться'}
                </button>
              </div>
            </form>

            <button
              onClick={() => {
                onClose();
                navigate(-1);
              }}
              className="mt-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              Позже
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;