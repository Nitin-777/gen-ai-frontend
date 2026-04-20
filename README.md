# GenAI Frontend

React + Vite frontend for the GenAI Interview Report Generator application.

## Features

- User authentication (register/login)
- Interview report generation with AI analysis
- Resume upload and processing
- View all generated interview reports
- Responsive design with SASS styling
- Fast development with Vite HMR

## Prerequisites

- Node.js (v14+)
- npm or yarn
- Backend API running

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update `.env` with your backend URL:
```
VITE_API_URL=http://localhost:3000
```

For production, create `.env.production`:
```
VITE_API_URL=https://your-backend-url.com
```

## Development

Start development server:
```bash
npm run dev
```

The app will run on http://localhost:5173 with hot module replacement.

## Build

Create production build:
```bash
npm run build
```

Output will be in `dist/` directory.

## Preview

Preview production build locally:
```bash
npm run preview
```

## Linting

Run ESLint:
```bash
npm run lint
```

## Project Structure

```
src/
├── features/
│   ├── auth/
│   │   ├── auth.context.jsx      # Auth state management
│   │   ├── components/
│   │   │   └── Protected.jsx      # Route protection
│   │   ├── hooks/
│   │   │   └── useAuth.js         # Auth hook
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   └── services/
│   │       └── auth.api.js        # Auth API calls
│   └── interview/
│       ├── interview.context.jsx  # Interview state
│       ├── hooks/
│       │   └── useInterview.js    # Interview hook
│       ├── pages/
│       │   ├── Home.jsx
│       │   └── Interview.jsx
│       ├── services/
│       │   └── interview.api.js   # Interview API calls
│       └── style/
├── style/
│   └── button.scss
├── assets/
├── App.jsx                        # Main app component
├── app.routes.jsx                 # Route definitions
└── main.jsx                       # Entry point

index.html                         # HTML template
vite.config.js                     # Vite configuration
```

## API Integration

All API calls are configured in `/src/features/*/services/` files using Axios.

### Environment Variables

- `VITE_API_URL` - Backend API base URL

The app automatically uses the correct API URL based on environment:
- Development: Uses proxy defined in vite.config.js
- Production: Uses VITE_API_URL from .env.production

## Authentication Flow

1. User registers or logs in
2. JWT token stored in httpOnly cookie
3. Token automatically sent with each request
4. Protected routes check authentication via context

## Available Scripts

```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

## Deployment

### Vercel

1. Connect GitHub repository
2. Import project in Vercel dashboard
3. Set environment variable: `VITE_API_URL=your-backend-url`
4. Deploy

See [DEPLOYMENT_GUIDE.md](../DEPLOYMENT_GUIDE.md) for detailed steps.

## Environment Configuration

### Development (.env)
```
VITE_API_URL=http://localhost:3000
```

### Production (.env.production)
```
VITE_API_URL=https://genai-kmyr.onrender.com
```

## Dependencies

- **react** - UI library
- **react-dom** - React DOM rendering
- **react-router** - Client-side routing
- **axios** - HTTP client
- **sass** - CSS preprocessing

## Build Configuration

- **Framework**: Vite
- **Output Directory**: dist
- **Build Tool**: Terser (minification)

## Performance

- Code splitting for vendor libraries
- Lazy loading of routes
- CSS preprocessing with SASS
- Production build optimization

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

**API connection fails**
- Verify backend is running
- Check VITE_API_URL in .env
- Ensure no CORS errors in browser console

**Build fails**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf dist && npm run build`

**Hot reload not working**
- Check vite.config.js server settings
- Restart dev server

## License

ISC


