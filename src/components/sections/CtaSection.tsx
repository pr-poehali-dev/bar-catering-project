import React from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const CtaSection = () => {
  return (
    <section className="py-20 bg-premium-black text-white">
      <div className="container mx-auto text-center px-2 sm:px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
          Готовы сделать ваше мероприятие незабываемым?
        </h2>
        <p className="text-xl mb-12 text-gray-300 max-w-2xl mx-auto">
          Получите персональную консультацию и точный расчёт стоимости прямо сейчас
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-gold hover:bg-gold-dark text-premium-black font-semibold px-8 py-4 text-lg">
            <Icon name="Phone" size={20} className="mr-2" />
            Позвонить сейчас
          </Button>
          <Button size="lg" variant="outline" className="border-gold text-gold hover:bg-gold hover:text-premium-black font-semibold px-8 py-4 text-lg">
            <Icon name="MessageCircle" size={20} className="mr-2" />
            Написать в WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;