# Troomie 🏠👋
### A Smart Roommate Finder & Shared Housing Matching Application

Troomie is a mobile application built with **React Native (Expo)** and **Firebase** designed to help college students and young adults find compatible roommates and shared housing. By combining housing details with user profiles in a Tinder-style card-swiping interface, Troomie makes it easy to find, match, and message potential housemates.

---

## 🚀 Key Features

* **Secure Authentication & Persistence**: Full registration and login flows using Firebase Auth, with persistent sessions handled via `@react-native-async-storage/async-storage`.
* **demographic Profile Setup**: Sign-up flow that captures key user preferences and demographics including age, city, gender, and personal descriptions.
* **Card Swiping Matching Engine**: A responsive gesture-based card interface (powered by React Native's `PanResponder` and `Animated` APIs) for swiping through potential housemates.
  * **Swipe Right**: Approve (Like)
  * **Swipe Left**: Disapprove (Nope)
* **Mutual Match Detection**: Instant notifications and connections generated in Firestore when two users mutually swipe right on each other.
* **In-App Messaging**: Real-time messaging platform connecting matched roommates directly inside the app.

---

## 🛠️ Technology Stack

* **Frontend Framework**: [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
* **Language**: TypeScript
* **Routing**: File-based routing via [Expo Router](https://docs.expo.dev/router/introduction/)
* **Backend & Database**: 
  * [Firebase Authentication](https://firebase.google.com/docs/auth)
  * [Cloud Firestore](https://firebase.google.com/docs/firestore) for real-time databases (Users, Swipes, Matches, and Chats)
  * [Cloud Storage](https://firebase.google.com/docs/storage) for user profile picture hosting
* **Local Storage**: `@react-native-async-storage/async-storage`

---

## 📂 Project Structure

```text
TroomieApp/
├── app/                     # Expo Router pages
│   ├── (tabs)/              # Tabs navigation group
│   │   ├── _layout.tsx      # Tab bar configuration & design
│   │   ├── index.tsx        # Matching Screen (Card Swiping Interface)
│   │   ├── matches.tsx      # Matches list (Mutual likes)
│   │   ├── messages.tsx     # Message lists & active conversations
│   │   └── profile.tsx      # User profile details & configuration
│   ├── _layout.tsx          # Root layout with Auth protection redirects
│   ├── index.tsx            # Initial entry router
│   ├── login.tsx            # Sign-in interface
│   ├── signup.tsx           # Demographic account registration
│   └── modal.tsx            # Standard pop-up modal
├── assets/                  # Images, fonts, and icons
├── components/              # Shared UI components
├── config/                  # Configuration files
│   └── firebase.ts          # Firebase connection & services exports
├── constants/               # Colors and global styles
├── hooks/                   # Custom React hooks
└── package.json             # App dependencies & scripts
```

---

## ⚙️ Get Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### 2. Install Dependencies
Navigate into the `TroomieApp` directory and run:
```bash
npm install
```

### 3. Firebase Configuration
Make sure you configure your Firebase project credentials. Create or edit `config/firebase.ts` with your web application's configuration:
```typescript
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export const db = getFirestore(app);
```

### 4. Start the Application
Run the Expo development server:
```bash
npx expo start
```
You can then open the app:
- Press `i` to open in the iOS simulator (requires Xcode)
- Press `a` to open in the Android emulator (requires Android Studio)
- Scan the QR code with your phone using the **Expo Go** app

---

## 📈 Development Roadmap

- [x] **Phase 1: Authentication**: Persistent sessions, secure validation, signup profile setup.
- [x] **Phase 2: Profile Pictures & Storage**: Camera/Gallery photo picker and upload pipeline to Firebase Storage.
- [x] **Phase 3: Matching Engine**: Firestore queries to filter potential partners, Swipe-to-like/dislike gesture mechanics, and mutual match notifications.
- [ ] **Phase 4: Connections & Messaging (In Progress)**: Fetching mutual matches dynamically, and real-time chat threads using Firestore and messaging components.
