import { Injectable } from '@nestjs/common';

@Injectable()
export class MarketsService {
  getMarkets() {
    return [
      { symbol: 'BTC/USDT', price: 50000 },
      { symbol: 'ETH/USDT', price: 3000 },
    ];
  }
}
