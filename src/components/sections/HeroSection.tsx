import React from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const HeroSection = () => {
  return (
    <section className="relative bg-premium-black text-white py-32 px-2 sm:px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-premium-black to-gray-900"></div>
      <div className="container mx-auto text-center relative z-10 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
          Вип бар-сервис для мероприятий
        </h1>
        <p className="text-xl md:text-2xl mb-12 text-gray-300 leading-relaxed">
          Премиальный алкоголь и авторские коктейли с доставкой
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-gold hover:bg-gold-dark text-premium-black font-semibold px-8 py-4 text-lg">
            Рассчитать стоимость
          </Button>
          <Button size="lg" variant="outline" className="border-gold text-gold hover:bg-gold hover:text-premium-black font-semibold px-8 py-4 text-lg">
            Примеры работ
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;