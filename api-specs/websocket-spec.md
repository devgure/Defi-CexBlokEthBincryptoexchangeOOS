# WebSocket API Specification for Sunny Platform

## Overview
Real-time data streaming for markets, orders, and trades.

## Endpoints
- ws://localhost:3000/ws/markets
- ws://localhost:3000/ws/orders
- ws://localhost:3000/ws/trades

## Message Formats

### Subscribe to Market Data
```json
{
  "type": "subscribe",
  "channel": "markets",
  "symbols": ["BTC/USDT", "ETH/USDT"]
}
```

### Market Update
```json
{
  "type": "market_update",
  "symbol": "BTC/USDT",
  "price": 50000,
  "volume": 1000
}
```

### Order Update
```json
{
  "type": "order_update",
  "orderId": "123",
  "status": "filled",
  "filledQuantity": 1.0
}
```

### Trade Update
```json
{
  "type": "trade",
  "symbol": "BTC/USDT",
  "price": 50000,
  "quantity": 0.5,
  "timestamp": 1640995200
}
