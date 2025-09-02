import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CalculatorData {
  format: string;
  guests: number;
  openbarTariff: string;
  revenueGuests: number;
  avgTicket: number;
  partnerShare: number;
  barLines: number;
  hours: number;
  peak: number;
  regionFee: number;
  hookahQty: number;
  hookahPrice: number;
}

interface PriceCalculatorProps {
  calculatorData: CalculatorData;
  setCalculatorData: (data: CalculatorData) => void;
  calculateCost: () => number | { revenue: number; partnerProfit: number; ourProfit: number };
  formatPrice: (price: number) => string;
  getModelDescription: (format: string) => string;
}

const PriceCalculator: React.FC<PriceCalculatorProps> = ({
  calculatorData,
  setCalculatorData,
  calculateCost,
  formatPrice,
  getModelDescription
}) => {
  return (
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
                        <p className="text-4xl font-bold text-gold mb-6">{formatPrice(calculateCost() as number)}</p>
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
                        <p className="text-4xl font-bold text-gold mb-6">{formatPrice(calculateCost() as number)}</p>
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
                        <p className="text-4xl font-bold text-gold mb-6">{formatPrice(calculateCost() as number)}</p>
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
                        <p className="text-4xl font-bold text-gold mb-6">{formatPrice(calculateCost() as number)}</p>
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
  );
};

export default PriceCalculator;