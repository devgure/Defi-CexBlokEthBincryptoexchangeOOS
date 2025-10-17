use std::collections::BTreeMap;
use tokio::sync::mpsc;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
struct Order {
    id: String,
    symbol: String,
    side: Side,
    price: f64,
    quantity: f64,
    timestamp: u64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
enum Side {
    Buy,
    Sell,
}

#[derive(Debug)]
struct OrderBook {
    bids: BTreeMap<i64, Vec<Order>>, // Price * 1000000 to avoid float keys
    asks: BTreeMap<i64, Vec<Order>>,
}

impl OrderBook {
    fn new() -> Self {
        OrderBook {
            bids: BTreeMap::new(),
            asks: BTreeMap::new(),
        }
    }

    fn add_order(&mut self, order: Order) {
        let price_key = (order.price * 1_000_000.0) as i64;
        let orders = if matches!(order.side, Side::Buy) {
            self.bids.entry(price_key).or_insert(Vec::new())
        } else {
            self.asks.entry(price_key).or_insert(Vec::new())
        };
        orders.push(order);
    }

    fn match_orders(&mut self) -> Vec<(Order, Order)> {
        let mut matches = Vec::new();
        while let (Some((bid_price, bid_orders)), Some((ask_price, ask_orders))) = (
            self.bids.iter_mut().next_back(),
            self.asks.iter_mut().next(),
        ) {
            if bid_price < ask_price {
                break;
            }
            // Simple matching logic
            if let (Some(bid), Some(ask)) = (bid_orders.last(), ask_orders.first()) {
                let match_qty = bid.quantity.min(ask.quantity);
                matches.push((bid.clone(), ask.clone()));
                // Update quantities (simplified)
            }
        }
        matches
    }
}

#[tokio::main]
async fn main() {
    let (tx, mut rx) = mpsc::channel(100);
    let mut order_book = OrderBook::new();

    tokio::spawn(async move {
        while let Some(order) = rx.recv().await {
            order_book.add_order(order);
            let matches = order_book.match_orders();
            for (bid, ask) in matches {
                println!("Matched: {:?} vs {:?}", bid, ask);
            }
        }
    });

    // Example: Add some orders
    let order1 = Order {
        id: "1".to_string(),
        symbol: "BTC/USDT".to_string(),
        side: Side::Buy,
        price: 50000.0,
        quantity: 1.0,
        timestamp: 1234567890,
    };
    tx.send(order1).await.unwrap();

    let order2 = Order {
        id: "2".to_string(),
        symbol: "BTC/USDT".to_string(),
        side: Side::Sell,
        price: 49900.0,
        quantity: 1.0,
        timestamp: 1234567891,
    };
    tx.send(order2).await.unwrap();
}
