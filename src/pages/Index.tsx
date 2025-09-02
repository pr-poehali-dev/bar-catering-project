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
    openbarTariff: 'classic',
    // Revenue Share
    revenueGuests: 200,
    avgTicket: 2000,
    partnerShare: 25,
    // Fix-fee
    barLines: 2,
    hours: 5,
    peak: 0,
    regionFee: 0,
    // Кальян
    hookahs: 0
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
        const organizerProfit = revenue * (calculatorData.partnerShare / 100);
        return { revenue, organizerProfit };
      }
      case 'fixfee': {
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
        
        return Math.ceil(total / roundTo) * roundTo;
      }
      case 'hookah': {
        return calculatorData.hookahs * 3500;
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
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-premium-black via-gray-900 to-premium-black text-white min-h-screen flex items-center">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(/img/d7b3b53e-b36a-4444-b582-6d67bc88c603.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="container mx-auto px-2 sm:px-4 relative z-10 w-full max-w-full">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
              Бар-кейтеринг и кальян под ключ
            </h1>
            <h2 className="text-xl md:text-2xl mb-8 text-gray-300 font-light">
              в Санкт-Петербурге
            </h2>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12 px-2">
              <Badge variant="outline" className="border-gold text-gold text-base px-4 py-2">
                <Icon name="Shield" className="w-4 h-4 mr-2" />
                Лицензия
              </Badge>
              <Badge variant="outline" className="border-gold text-gold text-base px-4 py-2">
                <Icon name="Database" className="w-4 h-4 mr-2" />
                ЕГАИС
              </Badge>
              <Badge variant="outline" className="border-gold text-gold text-base px-4 py-2">
                <Icon name="FileText" className="w-4 h-4 mr-2" />
                Акты/безнал
              </Badge>
              <Badge variant="outline" className="border-gold text-gold text-base px-4 py-2">
                <Icon name="Star" className="w-4 h-4 mr-2" />
                White-label
              </Badge>
            </div>
            <p className="text-lg mb-10 text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Лицензия и ЕГАИС • Алкоголь под реализацию • Развёртывание за 2 часа • White-label под ваш бренд
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gold hover:bg-gold-dark text-premium-black font-semibold px-8 py-4">
                <Icon name="Calculator" className="w-5 h-5 mr-2" />
                Рассчитать стоимость за 10 минут
              </Button>
              <Button size="lg" variant="outline" className="border-gold text-gold hover:bg-gold hover:text-premium-black px-8 py-4">
                <Icon name="MessageCircle" className="w-5 h-5 mr-2" />
                Получить смету в Telegram
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Для кого мы работаем */}
      <section className="py-20 bg-premium-gray">
        <div className="container mx-auto px-2 sm:px-4 w-full max-w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-premium-black">
            Решаем задачи любого формата ивента
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { emoji: "🎤", title: "Организаторы", desc: "бар под ключ с отчётностью" },
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
          <div className="max-w-4xl mx-auto px-2 sm:px-0">
            <Card className="p-8 border-2 border-gold/20 shadow-2xl">
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
                          <p className="text-4xl font-bold text-gold mb-6">{formatPrice(typeof calculateCost() === 'number' ? calculateCost() : 0)}</p>
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
                          <Label htmlFor="partnerShare" className="text-base font-medium">Ваша доля (%)</Label>
                          <Input
                            id="partnerShare"
                            type="number"
                            max="30"
                            value={calculatorData.partnerShare}
                            onChange={(e) => {
                              const value = Math.min(30, Math.max(0, parseFloat(e.target.value) || 0));
                              setCalculatorData({...calculatorData, partnerShare: value});
                            }}
                            className="mt-2"
                            placeholder="до 30%"
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
                                <hr className="my-2" />
                                <div className="flex justify-between text-lg font-bold">
                                  <span>Ваша прибыль:</span>
                                  <span className="text-green-600">{formatPrice(results.organizerProfit)}</span>
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
                          <Label htmlFor="peak" className="text-base font-medium">Коэффициент времени (%)</Label>
                          <select 
                            value={calculatorData.peak}
                            onChange={(e) => setCalculatorData({...calculatorData, peak: parseFloat(e.target.value)})}
                            className="mt-2 w-full p-2 border rounded"
                          >
                            <option value={0}>Будни (0%)</option>
                            <option value={10}>Пт/Сб (+10%)</option>
                            <option value={15}>Ночь/Праздники (+15%)</option>
                          </select>
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
                          <p className="text-4xl font-bold text-gold mb-6">{formatPrice(typeof calculateCost() === 'number' ? calculateCost() : 0)}</p>
                          <Button className="bg-gold hover:bg-gold-dark text-premium-black w-full">
                            Получить точную смету
                          </Button>
                        </div>
                      </div>
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
                          <p className="text-4xl font-bold text-gold mb-6">{formatPrice(typeof calculateCost() === 'number' ? calculateCost() : 0)}</p>
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
                          <Label htmlFor="hookahs" className="text-base font-medium">Количество кальянов</Label>
                          <Input
                            id="hookahs"
                            type="number"
                            value={calculatorData.hookahs}
                            onChange={(e) => setCalculatorData({...calculatorData, hookahs: parseInt(e.target.value) || 0})}
                            className="mt-2"
                          />
                        </div>
                      </div>
                      
                      <div className="bg-gold/10 p-6 rounded-lg flex flex-col justify-center">
                        <div className="text-center">
                          <p className="text-lg text-gray-600 mb-4">Стоимость кальянов:</p>
                          <p className="text-4xl font-bold text-gold mb-6">{formatPrice(typeof calculateCost() === 'number' ? calculateCost() : 0)}</p>
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

      {/* Кейсы */}
      <section className="py-20 bg-premium-gray">
        <div className="container mx-auto px-2 sm:px-4 w-full max-w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-premium-black">
            Наш опыт на цифрах
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Корпоратив", guests: "300 гостей", details: "3 линии бара, 5 часов", result: "средний чек 2,450 ₽/гость", revenue: "735,000 ₽" },
              { title: "Свадьба", guests: "120 гостей", details: "open bar Classic", result: "выручка 420,000 ₽", revenue: "маржа 32%" },
              { title: "Фестиваль", guests: "700 гостей", details: "revenue-share модель", result: "выручка 1,2 млн ₽", revenue: "партнёр получил 30%" }
            ].map((caseItem, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow bg-white border-0">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-premium-black">{caseItem.title}</CardTitle>
                    <Badge variant="secondary" className="bg-gold/10 text-gold border-0">
                      {caseItem.guests}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{caseItem.details}</p>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-700">{caseItem.result}</p>
                    <p className="text-lg font-semibold text-gold">{caseItem.revenue}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Как мы работаем */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-2 sm:px-4 w-full max-w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-premium-black">
            6 шагов до идеального бара на вашем ивенте
          </h2>
          <div className="max-w-4xl mx-auto px-2 sm:px-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { step: "1", title: "Заполняете бриф", icon: "FileText" },
                { step: "2", title: "Получаете смету за 10 минут", icon: "Clock" },
                { step: "3", title: "Договор, ЕГАИС, акты", icon: "Shield" },
                { step: "4", title: "Закупка/логистика", icon: "Truck" },
                { step: "5", title: "Развёртывание за 2 часа", icon: "Zap" },
                { step: "6", title: "Отчёт, акты, возврат остатков", icon: "CheckCircle" }
              ].map((item, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow border-gold/20">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-premium-black">{item.step}</span>
                    </div>
                    <Icon name={item.icon as any} className="w-8 h-8 mx-auto mb-4 text-gold" />
                    <p className="font-semibold text-premium-black">{item.title}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-premium-gray">
        <div className="container mx-auto px-2 sm:px-4 w-full max-w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-premium-black">
            Часто задаваемые вопросы
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {[
                { q: "Можно ли со своим алкоголем?", a: "Да, мы работаем по модели Fix-fee - предоставляем персонал и оборудование, алкоголь остается вашим." },
                { q: "Есть ли минимальная сумма заказа?", a: "Минимальный заказ составляет 50,000 рублей для мероприятий от 50 гостей." },
                { q: "Сколько барменов нужно на 100 гостей?", a: "Рекомендуем 2 бармена на 100 гостей при 2-х линиях бара для комфортного обслуживания." },
                { q: "Как быстро выезжаете?", a: "Экстренный выезд возможен в день обращения. Стандартно - за 2-3 дня до мероприятия." },
                { q: "Можно ли кальян в помещении?", a: "Да, но только в специально оборудованных зонах с вентиляцией согласно требованиям." }
              ].map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-premium-black font-medium">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Партнёрам */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-2 sm:px-4 w-full max-w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-premium-black">
            Организаторы и площадки: выгодное партнёрство
          </h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              {[
                { title: "Комиссия 10–15% с заказа", icon: "Percent" },
                { title: "Эксклюзив/white-label", icon: "Star" },
                { title: "Быстрые сметы и выезд «день-в-день»", icon: "Zap" },
                { title: "SLA: ответ ≤15 мин, смета ≤2 ч, сетап ≤2 ч", icon: "Clock" }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon as any} className="w-6 h-6 text-premium-black" />
                  </div>
                  <p className="text-lg text-premium-black font-medium">{item.title}</p>
                </div>
              ))}
            </div>
            <div 
              className="bg-cover bg-center rounded-lg min-h-[400px] flex items-end"
              style={{
                backgroundImage: `url(/img/4a95a75f-668a-4d8d-a85e-aeb483e577a7.jpg)`
              }}
            >
              <div className="bg-premium-black/80 text-white p-6 m-6 rounded-lg w-full">
                <h3 className="text-xl font-semibold mb-4">Станьте партнёром</h3>
                <Button className="bg-gold hover:bg-gold-dark text-premium-black w-full">
                  Получить партнёрское предложение
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Финальный CTA */}
      <section className="py-20 bg-gradient-to-br from-premium-black via-gray-900 to-premium-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
            Готовы сделать бар на вашем событии?
          </h2>
          <p className="text-xl mb-10 text-gray-300 max-w-2xl mx-auto">
            Заполните форму и получите смету за 10 минут
          </p>
          <div className="max-w-md mx-auto space-y-4">
            <Input placeholder="Ваше имя" className="bg-white/10 border-gold/30 text-white placeholder:text-gray-400" />
            <Input placeholder="Телефон или Telegram" className="bg-white/10 border-gold/30 text-white placeholder:text-gray-400" />
            <Input placeholder="Дата мероприятия" className="bg-white/10 border-gold/30 text-white placeholder:text-gray-400" />
            <Button size="lg" className="w-full bg-gold hover:bg-gold-dark text-premium-black font-semibold py-4">
              <Icon name="Calculator" className="w-5 h-5 mr-2" />
              Рассчитать мой ивент
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-premium-black text-white py-12">
        <div className="container mx-auto px-2 sm:px-4 w-full max-w-full">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gold">Контакты</h3>
              <div className="space-y-2 text-gray-300">
                <p>+7 (812) 123-45-67</p>
                <p>info@barservice.ru</p>
                <p>Санкт-Петербург</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gold">Услуги</h3>
              <div className="space-y-2 text-gray-300">
                <p>Бар-кейтеринг</p>
                <p>Кальян-сервис</p>
                <p>White-label решения</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gold">Документы</h3>
              <div className="space-y-2 text-gray-300">
                <p>Лицензия</p>
                <p>ЕГАИС</p>
                <p>Договоры и акты</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Premium Bar Service. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;