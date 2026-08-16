## Click2Dine

**Click2Dine** is a Flutter-based **food delivery app** that connects customers with local restaurants, backed by Firebase. It covers the full order lifecycle - browsing, cart, checkout, delivery details, order status updates, and push notifications - for both customers and restaurant owners.

### Context

Built as a complete end-to-end example of a real food-delivery product: a Flutter mobile client, a Firebase backend (Auth, Firestore, Cloud Messaging, Functions), and Python utilities for seeding real restaurant and menu data. Both the customer-facing flow and the restaurant-owner flow are implemented in one codebase.

### Architectural overview

Three cooperating layers covering the mobile client, the serverless backend, and demo data:

- **Flutter app** - a purpose-divided codebase with three clusters of screens: common (login, register, profile, forgot password, help, and order viewing), customer (home with promotional banners, restaurant browsing, products, search, cart, checkout with delivery details and payment-method selection, order tracking), and owner (menu management with per-product customization, menu forms, order queues, and reviews). A shared service layer (auth, cart, order, restaurant, review, profile, notification) plus a demo configuration support development.
- **Firebase Functions** - serverless triggers keep notifications server-driven: a new order triggers a push to the restaurant, and order status updates trigger pushes to the ordering customer's device.
- **Python seed scripts** - one-shot tooling imports restaurant and product data into Firestore using the Firebase admin SDK, so a demo is populated with realistic menus in a single command.

The customer and owner experiences share one Flutter codebase but route through the same Firebase backend; Firestore triggers fan out Cloud Messaging notifications by restaurant and customer, while the seed scripts keep local development and demos populated without manual entry.

### Feature tour

- **Firebase Auth authentication** - email/password sign-up, login, and forgot-password flows
- **Restaurant & menu browsing** - search, product categories, product detail, and per-restaurant menus
- **Cart & checkout** - cart items, delivery-details form, payment-method selector, order summary/confirmation
- **Order lifecycle & push notifications** - Firebase Cloud Messaging via Firestore triggers notifies owners of new orders and customers of status changes; local notification display on-device
- **Owner flows** - menu CRUD with per-product customization options, order management from an at-a-glance home (including empty states), and review reading
- **Reviews** - customers can review restaurants/products
- **Python seed tooling** - one-shot restaurant/menu seeding from a data file for fast demos
- **Demo mode** - demo configuration so the app can be evaluated without a real backend

### Engineering & challenges

- Keeping owner and customer flows in one codebase required careful page/module separation to avoid feature creep in shared widgets
- FCM topic-based push (tied to restaurant and user IDs stored in Firestore) avoids storing device tokens in the client and keeps notifications server-driven
- Seeding realistic data (with a committed data payload) made the app presentable in demos without manual entry

### Tech stack

- **App:** Flutter, Dart
- **Backend:** Firebase Auth, Cloud Firestore, Firebase Cloud Messaging, Firebase Functions (Python)
- **Tooling:** Python 3.12 Firebase Admin seed scripts