import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const AboutSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-premium-black">
            Почему выбирают нас
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "Award", title: "Премиум качество", desc: "Только лицензированный алкоголь от проверенных поставщиков" },
              { icon: "Users", title: "Опытная команда", desc: "Профессиональные бармены с опытом работы на VIP-мероприятиях" },
              { icon: "Clock", title: "Точность в сроках", desc: "Всегда приезжаем вовремя и работаем без задержек" }
            ].map((item, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-shadow border-0 bg-white">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <Icon name={item.icon} size={48} className="text-gold" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-premium-black">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;