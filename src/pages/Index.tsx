import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [calculatorData, setCalculatorData] = useState({
    format: 'openbar',
    // Open Bar
    guests: 100,
    openbarTariff: 'classic',
    // Revenue Share
    revenueGuests: 200,
    avgTicket: 2000,
    partnerShare: 35,
    // Fix-fee 
    barLines: 2,
    hours: 5,
    peak: 0, // 0=будни, 0.10=пт/сб, 0.15=ночь/праздники
    regionFee: 0,
    // Кальян
    hookahQty: 0,
    hookahPrice: 3000
  });

  const calculateCost = () => {
    switch (calculatorData.format) {
      case 'openbar': {
        const tariffs = { light: 1800, classic: 2450, premium: 3200 };
        return calculatorData.guests * tariffs[calculatorData.openbarTariff];
      }
      case 'minimal': {
        return 150000 + calculatorData.guests * 800;
      }
      case 'revenue': {
        const revenue = calculatorData.revenueGuests * calculatorData.avgTicket;
        const partnerProfit = revenue * (calculatorData.partnerShare / 100);
        const ourProfit = revenue - partnerProfit;
        return { revenue, partnerProfit, ourProfit };
      }
      case 'fixfee': {
        // Формула Fix-fee
        const baseHours = 5;
        const baseLine5h = 55000;
        const extraHourFee = 6000;
        const addLineDisc = 0.15;
        const roundTo = 1000;
        
        const peak = calculatorData.peak / 100;
        const extraHours = Math.max(0, calculatorData.hours - baseHours);
        
        let pricePerLine = baseLine5h * (1 + peak) + extraHours * extraHourFee + calculatorData.regionFee;
        
        let total = pricePerLine;
        if (calculatorData.barLines > 1) {
          total += (calculatorData.barLines - 1) * pricePerLine * (1 - addLineDisc);
        }
        
        // Округление вверх до тысячи
        pricePerLine = Math.ceil(pricePerLine / roundTo) * roundTo;
        total = Math.ceil(total / roundTo) * roundTo;
        
        return total;
      }
      case 'hookah': {
        return calculatorData.hookahQty * calculatorData.hookahPrice;
      }
      default:
        return 0;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(Math.round(price)) + ' ₽';
  };

  const getModelDescription = (format: string) => {
    const descriptions = {
      openbar: "Фиксированная стоимость за гостя. Клиент знает точную сумму заранее",
      minimal: "Гарантированная минимальная сумма + доплата по факту потребления",
      revenue: "Деление выручки между вами и организатором. Подходит для фестивалей",
      fixfee: "Выезд барменов, оборудование, работа. Алкоголь клиента",
      hookah: "Дополнительный сервис к основному бару"
    };
    return descriptions[format] || "";
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero секция */}
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

      {/* О нас секция */}
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

      {/* Типы мероприятий */}
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

      {/* Калькулятор стоимости */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-2 sm:px-4 w-full max-w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-premium-black">
            5 моделей работы под ваши задачи
          </h2>
          <div className="max-w-4xl mx-auto px-1 sm:px-0">
            <Card className="p-4 sm:p-8 border-2 border-gold/20 shadow-2xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-premium-black mb-4">Калькулятор стоимости</CardTitle>
                <p className="text-gray-600">{getModelDescription(calculatorData.format)}</p>
              </CardHeader>
              <CardContent>
                <Tabs value={calculatorData.format} onValueChange={(value) => setCalculatorData({...calculatorData, format: value})}>
                  <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 mb-8">
                    <TabsTrigger value="openbar">Open Bar</TabsTrigger>
                    <TabsTrigger value="minimal">Минималка</TabsTrigger>
                    <TabsTrigger value="revenue">Revenue</TabsTrigger>
                    <TabsTrigger value="fixfee">Fix-fee</TabsTrigger>
                    <TabsTrigger value="hookah">Кальян</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="openbar">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="guests" className="text-base font-medium">Количество гостей</Label>
                          <Input
                            id="guests"
                            type="number"
                            value={calculatorData.guests}
                            onChange={(e) => setCalculatorData({...calculatorData, guests: parseInt(e.target.value) || 0})}
                            className="mt-2"
                          />
                        </div>
                      </div>
                      
                      <div className="bg-gold/10 p-6 rounded-lg flex flex-col justify-center">
                        <div className="text-center">
                          <p className="text-lg text-gray-600 mb-4">Стоимость для клиента:</p>
                          <p className="text-4xl font-bold text-gold mb-6">{formatPrice(calculateCost())}</p>
                          <Button className="bg-gold hover:bg-gold-dark text-premium-black w-full">
                            Получить точную смету
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                      {[
                        { key: 'light', name: 'Light', price: 1800 },
                        { key: 'classic', name: 'Classic', price: 2450 },
                        { key: 'premium', name: 'Premium', price: 3200 }
                      ].map((tariff) => (
                        <Card 
                          key={tariff.key}
                          className={`cursor-pointer transition-all border-2 ${
                            calculatorData.openbarTariff === tariff.key 
                              ? 'border-gold bg-gold/10' 
                              : 'border-gray-200 hover:border-gold/50'
                          }`}
                          onClick={() => setCalculatorData({...calculatorData, openbarTariff: tariff.key})}
                        >
                          <CardContent className="text-center p-6">
                            <h3 className="font-bold text-lg mb-2">{tariff.name} - {formatPrice(tariff.price)}</h3>
                            <p className="text-gray-600">за гостя</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="minimal">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="guests" className="text-base font-medium">Количество гостей</Label>
                          <Input
                            id="guests"
                            type="number"
                            value={calculatorData.guests}
                            onChange={(e) => setCalculatorData({...calculatorData, guests: parseInt(e.target.value) || 0})}
                            className="mt-2"
                          />
                        </div>
                      </div>
                      
                      <div className="bg-gold/10 p-6 rounded-lg flex flex-col justify-center">
                        <div className="text-center">
                          <p className="text-lg text-gray-600 mb-4">Примерная стоимость:</p>
                          <p className="text-4xl font-bold text-gold mb-6">{formatPrice(calculateCost())}</p>
                          <Button className="bg-gold hover:bg-gold-dark text-premium-black w-full">
                            Получить точную смету
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="revenue">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="revenueGuests" className="text-base font-medium">Ожидаемое количество гостей</Label>
                          <Input
                            id="revenueGuests"
                            type="number"
                            value={calculatorData.revenueGuests}
                            onChange={(e) => setCalculatorData({...calculatorData, revenueGuests: parseInt(e.target.value) || 0})}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="avgTicket" className="text-base font-medium">Средний чек (₽)</Label>
                          <Input
                            id="avgTicket"
                            type="number"
                            value={calculatorData.avgTicket}
                            onChange={(e) => setCalculatorData({...calculatorData, avgTicket: parseFloat(e.target.value) || 0})}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="partnerShare" className="text-base font-medium">Доля партнёра (%)</Label>
                          <Input
                            id="partnerShare"
                            type="number"
                            value={calculatorData.partnerShare}
                            onChange={(e) => setCalculatorData({...calculatorData, partnerShare: parseFloat(e.target.value) || 0})}
                            className="mt-2"
                          />
                        </div>
                      </div>
                      
                      <div className="bg-gold/10 p-6 rounded-lg">
                        <h3 className="font-semibold mb-4">Расчёт выручки:</h3>
                        {(() => {
                          const results = calculateCost();
                          if (typeof results === 'object') {
                            return (
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span>Общий оборот:</span>
                                  <span className="font-semibold">{formatPrice(results.revenue)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Партнёру (организатору):</span>
                                  <span className="text-red-600">{formatPrice(results.partnerProfit)}</span>
                                </div>
                                <hr className="my-2" />
                                <div className="flex justify-between text-lg font-bold">
                                  <span>Наша прибыль:</span>
                                  <span className="text-green-600">{formatPrice(results.ourProfit)}</span>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        })()}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="fixfee">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="barLines" className="text-base font-medium">Линии бара</Label>
                          <Input
                            id="barLines"
                            type="number"
                            value={calculatorData.barLines}
                            onChange={(e) => setCalculatorData({...calculatorData, barLines: parseInt(e.target.value) || 1})}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="hours" className="text-base font-medium">Часы работы</Label>
                          <Input
                            id="hours"
                            type="number"
                            value={calculatorData.hours}
                            onChange={(e) => setCalculatorData({...calculatorData, hours: parseInt(e.target.value) || 5})}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="peak" className="text-base font-medium">Коэффициент времени</Label>
                          <Select value={calculatorData.peak.toString()} onValueChange={(value) => setCalculatorData({...calculatorData, peak: parseFloat(value)})}>
                            <SelectTrigger className="mt-2">
                              <SelectValue placeholder="Выберите время" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">Будни (0%)</SelectItem>
                              <SelectItem value="10">Пт/Сб (+10%)</SelectItem>
                              <SelectItem value="15">Ночь/Праздники (+15%)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="regionFee" className="text-base font-medium">Надбавка за локацию (₽)</Label>
                          <Input
                            id="regionFee"
                            type="number"
                            value={calculatorData.regionFee}
                            onChange={(e) => setCalculatorData({...calculatorData, regionFee: parseFloat(e.target.value) || 0})}
                            className="mt-2"
                            placeholder="0 - в городе, 10000 - за городом"
                          />
                        </div>
                      </div>
                      
                      <div className="bg-gold/10 p-6 rounded-lg flex flex-col justify-center">
                        <div className="text-center">
                          <p className="text-lg text-gray-600 mb-4">Стоимость выезда:</p>
                          <p className="text-4xl font-bold text-gold mb-6">{formatPrice(calculateCost())}</p>
                          <Button className="bg-gold hover:bg-gold-dark text-premium-black w-full">
                            Получить точную смету
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="hookah">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="hookahQty" className="text-base font-medium">Количество кальянов</Label>
                          <Input
                            id="hookahQty"
                            type="number"
                            value={calculatorData.hookahQty}
                            onChange={(e) => setCalculatorData({...calculatorData, hookahQty: parseInt(e.target.value) || 0})}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="hookahPrice" className="text-base font-medium">Цена за кальян (₽)</Label>
                          <Input
                            id="hookahPrice"
                            type="number"
                            value={calculatorData.hookahPrice}
                            onChange={(e) => setCalculatorData({...calculatorData, hookahPrice: parseFloat(e.target.value) || 3000})}
                            className="mt-2"
                          />
                        </div>
                      </div>
                      
                      <div className="bg-gold/10 p-6 rounded-lg flex flex-col justify-center">
                        <div className="text-center">
                          <p className="text-lg text-gray-600 mb-4">Стоимость кальянов:</p>
                          <p className="text-4xl font-bold text-gold mb-6">{formatPrice(calculateCost())}</p>
                          <Button className="bg-gold hover:bg-gold-dark text-premium-black w-full">
                            Получить точную смету
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
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

      {/* CTA секция */}
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

      {/* Футер */}
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
    </div>
  );
};

export default Index;