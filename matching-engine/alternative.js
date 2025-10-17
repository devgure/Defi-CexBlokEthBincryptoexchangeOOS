// Alternative Node.js matching engine (simplified)
class OrderBook {
  constructor() {
    this.bids = new Map(); // price -> orders
    this.asks = new Map();
  }

  addOrder(order) {
    const book = order.side === 'buy' ? this.bids : this.asks;
    if (!book.has(order.price)) book.set(order.price, []);
    book.get(order.price).push(order);
  }

  match() {
    const matches = [];
    const bidPrices = Array.from(this.bids.keys()).sort((a, b) => b - a);
    const askPrices = Array.from(this.asks.keys()).sort((a, b) => a - b);

    while (bidPrices.length && askPrices.length && bidPrices[0] >= askPrices[0]) {
      const bidPrice = bidPrices[0];
      const askPrice = askPrices[0];
      const bids = this.bids.get(bidPrice);
      const asks = this.asks.get(askPrice);

      if (bids && asks) {
        const bid = bids[0];
        const ask = asks[0];
        const qty = Math.min(bid.quantity, ask.quantity);
        matches.push({ bid: bid.id, ask: ask.id, price: bidPrice, qty });
        // Update quantities
        bid.quantity -= qty;
        ask.quantity -= qty;
        if (bid.quantity === 0) bids.shift();
        if (ask.quantity === 0) asks.shift();
        if (!bids.length) this.bids.delete(bidPrice);
        if (!asks.length) this.asks.delete(askPrice);
      }
    }
    return matches;
  }
}

// Example usage
const ob = new OrderBook();
ob.addOrder({ id: 1, side: 'buy', price: 50000, quantity: 1 });
ob.addOrder({ id: 2, side: 'sell', price: 49900, quantity: 1 });
console.log(ob.match());
