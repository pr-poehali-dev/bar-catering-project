import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FaqSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-premium-black">
            Часто задаваемые вопросы
          </h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="bg-white rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                Какой минимальный заказ?
              </AccordionTrigger>
              <AccordionContent>
                Минимальный заказ составляет 80 000 рублей или 50 человек. Это связано с необходимостью покрытия расходов на персонал и оборудование.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                За сколько дней нужно бронировать?
              </AccordionTrigger>
              <AccordionContent>
                Рекомендуем бронировать за 2-3 недели до мероприятия. В высокий сезон (май-сентябрь) лучше планировать за месяц.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                Работаете ли вы с безналичным расчётом?
              </AccordionTrigger>
              <AccordionContent>
                Да, мы работаем как с наличным, так и с безналичным расчётом. Для юридических лиц предоставляем полный пакет документов.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                Что входит в стоимость?
              </AccordionTrigger>
              <AccordionContent>
                В стоимость входит: алкоголь, профессиональные бармены, барное оборудование, лёд, фрукты для коктейлей, одноразовая посуда, уборка рабочего места.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;