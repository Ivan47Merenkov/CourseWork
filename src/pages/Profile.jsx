import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import useAuthStore from '../store/authStore';

const Profile = () => {
  const navigate = useNavigate();
  const { user, isAdmin, users, updateUserProfile, logout } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: user || {}
  });

  const districts = ['Сарыарка', 'Алматы', 'Байконур', 'Есиль', 'Нура'];

  const onSubmit = (data) => {
    updateUserProfile(data);
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="page-container"
      >
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Требуется авторизация</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Пожалуйста, войдите в систему для доступа к личному кабинету
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page-container"
    >
      {isAdmin ? (
        <div>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Админ-панель</h1>
            <button
              onClick={handleLogout}
              className="btn-primary bg-red-600 hover:bg-red-700"
            >
              Выйти из панели администратора
            </button>
          </div>
          <div className="grid gap-6">
            {users.map((user, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
              >
                <h3 className="font-bold mb-2">{user.username}</h3>
                <p>Email: {user.email}</p>
                <p>Телефон: {user.phone}</p>
                <p>Район: {user.district}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Личный кабинет</h1>
            <button
              onClick={handleLogout}
              className="btn-primary bg-red-600 hover:bg-red-700"
            >
              Выйти
            </button>
          </div>
          
          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                <label className="block text-sm font-medium mb-1">Район</label>
                <select
                  {...register('district', { required: 'Выберите район' })}
                  className="input-field"
                >
                  {districts.map(district => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
                {errors.district && (
                  <span className="text-red-500 text-sm">{errors.district.message}</span>
                )}
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="btn-secondary"
                >
                  Отмена
                </button>
                <button type="submit" className="btn-primary">
                  Сохранить
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">{user.username}</h2>
                  <p className="text-gray-600 dark:text-gray-300">Email: {user.email}</p>
                  <p className="text-gray-600 dark:text-gray-300">Телефон: {user.phone}</p>
                  <p className="text-gray-600 dark:text-gray-300">Район: {user.district}</p>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-primary"
                >
                  Редактировать
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default Profile;