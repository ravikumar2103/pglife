# PG Life - Happiness per Square Foot

A modern web application for finding and booking paying guest accommodations across major Indian cities.

## 🏠 About

PG Life is a comprehensive platform that connects students and working professionals with quality paying guest accommodations. Our platform focuses on providing detailed property information, user reviews, and a seamless booking experience.

## ✨ Features

- **City-wise Property Search**: Browse PG accommodations in Delhi, Mumbai, Bengaluru, and Hyderabad
- **Advanced Filtering**: Filter by price, gender preference, ratings, and amenities
- **User Authentication**: Secure signup and login with Firebase
- **Property Details**: Comprehensive property information with image galleries
- **Responsive Design**: Optimized for desktop and mobile devices
- **Real-time Data**: Dynamic property listings with Firebase Firestore

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Bootstrap 5
- **Icons**: Lucide React
- **Backend**: Firebase (Authentication + Firestore)
- **Build Tool**: Vite
- **Deployment**: Ready for Netlify/Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd pg-life
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure Firebase:
   - Create a new Firebase project
   - Enable Authentication and Firestore
   - Update the Firebase config in `src/config/firebase.ts`

5. Start the development server:
```bash
npm run dev
```

## 📁 Project Structure

```
src/
├── components/          # React components
├── hooks/              # Custom React hooks
├── services/           # API and business logic
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── config/             # Configuration files
```

## 🏗️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 Key Features

### Authentication
- Email/password authentication
- User profile management
- Secure session handling

### Property Management
- Dynamic property listings
- Image galleries with carousel
- Amenity categorization
- Rating and review system

### Search & Filter
- City-based search
- Price range filtering
- Gender preference filtering
- Rating-based sorting

## 🎨 Design Philosophy

- **User-Centric**: Intuitive navigation and clear information hierarchy
- **Modern Aesthetics**: Clean design with smooth animations and transitions
- **Accessibility**: WCAG compliant with proper focus management
- **Performance**: Optimized loading and responsive design

## 🔧 Configuration

### Firebase Setup
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication with Email/Password
3. Create a Firestore database
4. Update `src/config/firebase.ts` with your config

### Environment Variables
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🚀 Deployment

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure environment variables in Netlify dashboard

### Vercel
1. Connect your GitHub repository to Vercel
2. Configure build settings (auto-detected)
3. Add environment variables in Vercel dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Images from [Pexels](https://pexels.com)
- Icons from [Lucide](https://lucide.dev)
- UI components inspired by modern design systems

## 📞 Support

For support and questions, please open an issue in the GitHub repository.

---

**PG Life** - Making accommodation search simple and reliable! 🏠✨