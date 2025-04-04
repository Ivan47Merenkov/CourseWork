import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SunIcon, MoonIcon, UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import useAuthStore from '../store/authStore';

const Header = ({ darkMode, toggleDarkMode }) => {
  const location = useLocation();
  const { isAuthenticated, isAdmin, user } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { path: '/information', label: 'Информация' },
    { path: '/production', label: 'Производство' },
    { path: '/projects', label: 'Проекты' },
    { path: '/reviews', label: 'Отзывы' },
    ...(isAdmin ? [] : [{ path: '/order', label: 'Заказ' }]),
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <img 
              src="https://i.postimg.cc/htwQ8BCg/image.png" 
              alt="РОСТМЕБЕЛЬ" 
              className="h-12 w-auto"
            />
          </Link>

          <nav className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <Link
                to="/profile"
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary"
              >
                {isAdmin ? (
                  <span className="font-bold">A</span>
                ) : (
                  <UserIcon className="h-6 w-6" />
                )}
              </Link>
            )}

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              {darkMode ? (
                <SunIcon className="h-6 w-6 text-yellow-400" />
              ) : (
                <MoonIcon className="h-6 w-6 text-gray-600" />
              )}
            </motion.button>

            <button
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === item.path
                      ? 'text-primary'
                      : 'text-gray-700 dark:text-gray-300 hover:text-primary'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;