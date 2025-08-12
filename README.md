# MovieState - Movie Review Application

## Version 1.0

MovieState is a modern, responsive web application built with React that allows users to browse movies, watch trailers, and read/write reviews. This is the first version of the application featuring core movie discovery and review functionality.

## 🎬 Features

### Core Functionality
- **Movie Browsing**: Browse through a collection of movies with poster images
- **Hero Carousel**: Interactive carousel showcasing featured movies
- **Movie Details**: View comprehensive information about individual movies
- **Trailer Integration**: Watch movie trailers directly in the application
- **Review System**: Read and write reviews for movies
- **Responsive Design**: Modern UI that works on all device sizes

### Technical Features
- **Real-time Updates**: Dynamic content loading and state management
- **API Integration**: RESTful API communication with backend services
- **Modern UI Components**: Built with Material-UI and React Bootstrap
- **Routing**: Client-side routing for seamless navigation
- **Error Handling**: Comprehensive error handling and user feedback

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1** - Modern React with hooks and functional components
- **Vite 7.0.4** - Fast build tool and development server
- **React Router DOM 7.7.1** - Client-side routing
- **Material-UI 7.2.0** - Professional UI component library
- **React Bootstrap 2.10.10** - Bootstrap components for React
- **Axios 1.11.0** - HTTP client for API communication

### UI Libraries
- **Emotion** - CSS-in-JS styling solution
- **FontAwesome** - Icon library for enhanced UI elements
- **React Material-UI Carousel** - Interactive carousel component
- **React Player** - Video player for trailer integration

### Development Tools
- **ESLint** - Code quality and consistency
- **React Hooks ESLint Plugin** - Hooks-specific linting rules

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`

### Build for Production
```bash
npm run build
npm run preview
```

## 📱 Application Structure

### Components
- **Header**: Navigation and app branding
- **Hero**: Featured movies carousel with call-to-action buttons
- **Home**: Main landing page with hero section
- **Layout**: Main application layout wrapper
- **Reviews**: Movie review display and submission form
- **ReviewForm**: Form component for writing new reviews
- **Trailer**: Video player for movie trailers

### Pages
- **Home**: Landing page with movie carousel
- **Movie Details**: Individual movie information and reviews
- **Reviews**: Review management for specific movies
- **Trailer**: Movie trailer viewing page

## 🔌 API Integration

The application connects to a backend API running on `http://localhost:8080` with the following endpoints:

- `GET /api/v1/movies` - Fetch all movies
- `GET /api/v1/movies/{movieId}` - Fetch specific movie with reviews
- `POST /api/v1/reviews` - Submit new movie review

## 🎨 User Experience

### Design Philosophy
- **Clean Interface**: Minimalist design focusing on content
- **Intuitive Navigation**: Easy-to-use navigation between sections
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Visual Feedback**: Success/error messages and loading states

### User Flow
1. Users land on the home page with a movie carousel
2. Click on movies to view details and existing reviews
3. Watch trailers directly in the application
4. Write and submit new reviews
5. Navigate seamlessly between different sections

## 🔧 Configuration

### Environment Setup
- Backend API URL: Configured in `src/api/axiosConfig.js`
- Development server: Vite dev server on port 5173
- Build output: `dist` directory

### Customization
- UI themes can be modified through Material-UI theming
- Styling can be adjusted in component-specific CSS files
- API endpoints can be updated in the axios configuration

## 📋 Future Enhancements (Version 2.0+)

- User authentication and profiles
- Rating system for movies
- Advanced search and filtering
- Movie recommendations
- Social features and sharing
- Mobile app version
- Admin panel for content management

## 🤝 Contributing

This is version 1.0 of MovieState. For contributions or feature requests, please refer to the project's contribution guidelines.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**MovieState v1.0** - Bringing movies and reviews together in one beautiful application.
