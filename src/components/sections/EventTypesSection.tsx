import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const EventTypesSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-2 sm:px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-premium-black">
          Работаем с любыми форматами
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            { emoji: "🏛", title: "Площадки/лофты", desc: "домашний бар-партнёр с комиссией" },
            { emoji: "🎶", title: "Концерты/фестивали", desc: "revenue-share, wristband-система" },
            { emoji: "🏢", title: "Корпоративы и MICE", desc: "прозрачные пакеты, работа по безналу" },
            { emoji: "💍", title: "Свадьбы/вечеринки", desc: "стиль, авторские коктейли, кальян-зона" }
          ].map((item, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow border-0 bg-white">
              <CardHeader className="text-center">
                <div className="text-4xl mb-4">{item.emoji}</div>
                <CardTitle className="text-xl font-semibold text-premium-black">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventTypesSection;