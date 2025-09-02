import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [calculatorData, setCalculatorData] = useState({
    format: 'openbar',
    // Open Bar
    guests: 100,
    avg: 2500,
    feeCard: 0.025,
    feePartner: 0.15,
    // Минималка
    min: 200000,
    // Revenue Share
    sharePartner: 0.35,
    // Fix-fee
    flat: 120000,
    // Кальян
    hookahQty: 0,
    hookahPrice: 3000
  });

  const calculateResults = () => {
    const { guests, avg, feeCard, feePartner, min, sharePartner, flat, hookahQty, hookahPrice } = calculatorData;
    
    switch (calculatorData.format) {
      case 'openbar': {
        const revenue = guests * avg;
        const card = revenue * feeCard;
        const partner = revenue * feePartner;
        const net = revenue - card - partner;
        return { revenue, card, partner, net, avg };
      }
      case 'minimal': {
        const revenue = guests * avg;
        const delta = revenue - min;
        const topup = Math.max(delta, 0);
        const unspent = Math.max(-delta, 0);
        const card = revenue * feeCard;
        const partner = revenue * feePartner;
        const net = revenue - card - partner;
        return { revenue, topup, unspent, card, partner, net };
      }
      case 'revenue': {
        const revenue = guests * avg;
        const partner = revenue * sharePartner;
        const card = revenue * feeCard;
        const yourShare = revenue - partner - card;
        return { revenue, partner, card, yourShare };
      }
      case 'fixfee': {
        const projectPrice = flat;
        const perGuest = guests > 0 ? flat / guests : 0;
        return { projectPrice, perGuest };
      }
      case 'hookah': {
        const revenueHookah = hookahQty * hookahPrice;
        return { revenueHookah };
      }
      default:
        return {};
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(Math.round(price)) + ' ₽';
  };

  const applyPreset = (preset: string) => {
    const presets = {
      wedding: { guests: 80, avg: 3500 },
      corporate: { guests: 150, avg: 4000 },
      concert: { guests: 200, avg: 2000, sharePartner: 0.4 },
      minimal: { guests: 100, min: 250000, avg: 2500 },
      fixfee: { guests: 120, flat: 150000 }
    };
    
    if (presets[preset]) {
      setCalculatorData({ ...calculatorData, ...presets[preset] });
    }
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
                <CardTitle className="text-2xl text-premium-black mb-8">Калькулятор стоимости</CardTitle>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Button variant="outline" size="sm" onClick={() => applyPreset('wedding')}>
                    Свадьба
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => applyPreset('corporate')}>
                    Корпоратив
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => applyPreset('concert')}>
                    Концерт
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => applyPreset('minimal')}>
                    Минималка
                  </Button>
                </div>
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
                          <Label htmlFor="guests" className="text-base font-medium">Количество гостей (G)</Label>
                          <Input
                            id="guests"
                            type="number"
                            value={calculatorData.guests}
                            onChange={(e) => setCalculatorData({...calculatorData, guests: parseInt(e.target.value) || 0})}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="avg" className="text-base font-medium">Средний чек (₽)</Label>
                          <Input
                            id="avg"
                            type="number"
                            value={calculatorData.avg}
                            onChange={(e) => setCalculatorData({...calculatorData, avg: parseFloat(e.target.value) || 0})}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="feeCard" className="text-base font-medium">Комиссия карт (%)</Label>
                          <Input
                            id="feeCard"
                            type="number"
                            step="0.001"
                            value={calculatorData.feeCard * 100}
                            onChange={(e) => setCalculatorData({...calculatorData, feeCard: parseFloat(e.target.value) / 100 || 0})}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="feePartner" className="text-base font-medium">Комиссия партнёра (%)</Label>
                          <Input
                            id="feePartner"
                            type="number"
                            step="0.001"
                            value={calculatorData.feePartner * 100}
                            onChange={(e) => setCalculatorData({...calculatorData, feePartner: parseFloat(e.target.value) / 100 || 0})}
                            className="mt-2"
                          />
                        </div>
                      </div>
                      
                      <div className="bg-gold/10 p-6 rounded-lg">
                        <h3 className="font-semibold mb-4">Расчёт:</h3>
                        {(() => {
                          const results = calculateResults();
                          return (
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span>Валовая выручка:</span>
                                <span className="font-semibold">{formatPrice(results.revenue || 0)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Комиссия карт:</span>
                                <span className="text-red-600">-{formatPrice(results.card || 0)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Комиссия партнёра:</span>
                                <span className="text-red-600">-{formatPrice(results.partner || 0)}</span>
                              </div>
                              <hr className="my-2" />
                              <div className="flex justify-between text-lg font-bold">
                                <span>Чистая прибыль:</span>
                                <span className="text-green-600">{formatPrice(results.net || 0)}</span>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="minimal">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="guests" className="text-base font-medium">Количество гостей (G)</Label>
                          <Input
                            id="guests"
                            type="number"
                            value={calculatorData.guests}
                            onChange={(e) => setCalculatorData({...calculatorData, guests: parseInt(e.target.value) || 0})}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="avg" className="text-base font-medium">Средний чек (₽)</Label>
                          <Input
                            id="avg"
                            type="number"
                            value={calculatorData.avg}
                            onChange={(e) => setCalculatorData({...calculatorData, avg: parseFloat(e.target.value) || 0})}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="min" className="text-base font-medium">Минималка (₽)</Label>
                          <Input
                            id="min"
                            type="number"
                            value={calculatorData.min}
                            onChange={(e) => setCalculatorData({...calculatorData, min: parseFloat(e.target.value) || 0})}
                            className="mt-2"
                          />
                        </div>
                      </div>
                      
                      <div className="bg-gold/10 p-6 rounded-lg">
                        <h3 className="font-semibold mb-4">Расчёт:</h3>
                        {(() => {
                          const results = calculateResults();
                          return (
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span>Выручка:</span>
                                <span className="font-semibold">{formatPrice(results.revenue || 0)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Доплата к минималке:</span>
                                <span className="text-green-600">{formatPrice(results.topup || 0)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Невыбранная часть:</span>
                                <span className="text-orange-600">{formatPrice(results.unspent || 0)}</span>
                              </div>
                              <hr className="my-2" />
                              <div className="flex justify-between text-lg font-bold">
                                <span>Чистая прибыль:</span>
                                <span className="text-green-600">{formatPrice(results.net || 0)}</span>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="revenue">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="guests" className="text-base font-medium">Количество гостей (G)</Label>
                          <Input
                            id="guests"
                            type="number"
                            value={calculatorData.guests}
                            onChange={(e) => setCalculatorData({...calculatorData, guests: parseInt(e.target.value) || 0})}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="avg" className="text-base font-medium">Средний чек (₽)</Label>
                          <Input
                            id="avg"
                            type="number"
                            value={calculatorData.avg}
                            onChange={(e) => setCalculatorData({...calculatorData, avg: parseFloat(e.target.value) || 0})}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="sharePartner" className="text-base font-medium">Доля партнёра (%)</Label>
                          <Input
                            id="sharePartner"
                            type="number"
                            step="0.01"
                            value={calculatorData.sharePartner * 100}
                            onChange={(e) => setCalculatorData({...calculatorData, sharePartner: parseFloat(e.target.value) / 100 || 0})}
                            className="mt-2"
                          />
                        </div>
                      </div>
                      
                      <div className="bg-gold/10 p-6 rounded-lg">
                        <h3 className="font-semibold mb-4">Расчёт:</h3>
                        {(() => {
                          const results = calculateResults();
                          return (
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span>Валовая выручка:</span>
                                <span className="font-semibold">{formatPrice(results.revenue || 0)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Доля партнёра:</span>
                                <span className="text-red-600">-{formatPrice(results.partner || 0)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Комиссия карт:</span>
                                <span className="text-red-600">-{formatPrice(results.card || 0)}</span>
                              </div>
                              <hr className="my-2" />
                              <div className="flex justify-between text-lg font-bold">
                                <span>Ваша доля:</span>
                                <span className="text-green-600">{formatPrice(results.yourShare || 0)}</span>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="fixfee">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="flat" className="text-base font-medium">Фикс проекта (₽)</Label>
                          <Input
                            id="flat"
                            type="number"
                            value={calculatorData.flat}
                            onChange={(e) => setCalculatorData({...calculatorData, flat: parseFloat(e.target.value) || 0})}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="guests" className="text-base font-medium">Количество гостей (опционально)</Label>
                          <Input
                            id="guests"
                            type="number"
                            value={calculatorData.guests}
                            onChange={(e) => setCalculatorData({...calculatorData, guests: parseInt(e.target.value) || 0})}
                            className="mt-2"
                          />
                        </div>
                      </div>
                      
                      <div className="bg-gold/10 p-6 rounded-lg">
                        <h3 className="font-semibold mb-4">Расчёт:</h3>
                        {(() => {
                          const results = calculateResults();
                          return (
                            <div className="space-y-2">
                              <div className="flex justify-between text-lg font-bold">
                                <span>Стоимость проекта:</span>
                                <span className="text-green-600">{formatPrice(results.projectPrice || 0)}</span>
                              </div>
                              {calculatorData.guests > 0 && (
                                <div className="flex justify-between">
                                  <span>За гостя:</span>
                                  <span className="font-semibold">{formatPrice(results.perGuest || 0)}</span>
                                </div>
                              )}
                            </div>
                          );
                        })()}
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
                            onChange={(e) => setCalculatorData({...calculatorData, hookahPrice: parseFloat(e.target.value) || 0})}
                            className="mt-2"
                          />
                        </div>
                      </div>
                      
                      <div className="bg-gold/10 p-6 rounded-lg">
                        <h3 className="font-semibold mb-4">Расчёт:</h3>
                        {(() => {
                          const results = calculateResults();
                          return (
                            <div className="space-y-2">
                              <div className="flex justify-between text-lg font-bold">
                                <span>Выручка от кальянов:</span>
                                <span className="text-green-600">{formatPrice(results.revenueHookah || 0)}</span>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <div className="text-center mt-8">
                    <Button className="bg-gold hover:bg-gold-dark text-premium-black w-full sm:w-auto">
                      Получить точную смету
                    </Button>
                  </div>
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