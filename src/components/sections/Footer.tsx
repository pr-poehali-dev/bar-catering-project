import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-xl font-bold mb-4 text-gold">ВИП Бар Сервис</h3>
            <p className="text-gray-400">
              Премиальное барное обслуживание для особых событий
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Контакты</h3>
            <div className="space-y-2 text-gray-400">
              <p>+7 (999) 123-45-67</p>
              <p>info@vipbar.ru</p>
              <p>Москва, ул. Примерная, 123</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Услуги</h3>
            <div className="space-y-2 text-gray-400">
              <p>Корпоративные мероприятия</p>
              <p>Свадьбы и торжества</p>
              <p>Частные вечеринки</p>
              <p>Фестивали и концерты</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; 2024 ВИП Бар Сервис. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;