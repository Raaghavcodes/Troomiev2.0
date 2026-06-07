# Troomie 🏠👋
### A Smart Roommate Finder & Shared Housing Matching Application

Troomie is a mobile application designed to simplify the process of finding compatible roommates and shared housing. Developed specifically with college students and young adults in mind, the platform bridges the gap between traditional housing portals and modern social matching applications by displaying both the property features and roommate personalities in a unified interface.

---

## 🌟 Concept & User Experience

Troomie transforms roommate hunting into an intuitive, stress-free experience:

* **Demographic Profile Setup**: Users register and build detailed profiles specifying their age, location, gender, lifestyle habits, and a brief bio, alongside details of any available property space they wish to share.
* **Tinder-Style Swiping Mechanic**: Utilizing a gesture-based card interface (powered by React Native's `PanResponder` and `Animated` APIs), users can swipe through potential housemates.
  * **Swipe Right**: Approve / Like a potential roommate.
  * **Swipe Left**: Disapprove / Pass.
* **Mutual Match System**: A connection is created only when two users mutually swipe right on each other, preventing unsolicited messages and ensuring pre-validated compatibility.
* **In-App Messaging**: Matches can communicate immediately through a real-time chat interface to discuss living preferences, lease terms, and compatibility.

---

## 🛠️ Tech Stack Overview

Troomie is built using a modern, scalable mobile stack designed for cross-platform performance:

* **Frontend**: **React Native** with **TypeScript** and **Expo** for a native look and feel on iOS and Android.
* **Routing**: File-based routing via **Expo Router** to manage application navigation dynamically.
* **Backend**: **Firebase Suite**
  * **Firebase Authentication** for secure account creation, verification, and session persistence.
  * **Cloud Firestore** for real-time storage of user metadata, swipes, mutual matches, and message threads.
  * **Cloud Storage** for hosting and retrieving user profile pictures.
* **Persistence**: Local session state managed using **AsyncStorage**.

---

## 📈 Development Roadmap

- [x] **Phase 1: Authentication**: Persistent sessions, secure validation, signup profile setup.
- [x] **Phase 2: Profile Pictures & Storage**: Camera/Gallery photo picker and upload pipeline to Firebase Storage.
- [x] **Phase 3: Matching Engine**: Firestore queries to filter potential partners, Swipe-to-like/dislike gesture mechanics, and mutual match notifications.
- [ ] **Phase 4: Connections & Messaging (In Progress)**: Fetching mutual matches dynamically, and real-time chat threads using Firestore and messaging components.
