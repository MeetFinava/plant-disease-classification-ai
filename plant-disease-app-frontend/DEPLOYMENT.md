# 🚀 Deployment Guide

This guide will help you deploy the Plant Disease Detection application to production.

## 📁 Project Structure Overview

```
plant-disease-app/
├── frontend/          # React app for Vercel
├── backend/           # Python API for Railway/Heroku
├── README.md
├── DEPLOYMENT.md      # This file
└── .gitignore
```

## 🌐 Frontend Deployment (Vercel)

### Step 1: Prepare Repository
1. Push your code to GitHub
2. Make sure the `frontend/` folder contains all React files

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project"
3. Import your repository
4. **Important**: Set the **Root Directory** to `frontend`
5. Vercel will auto-detect it's a React app
6. Click "Deploy"

### Step 3: Configure Environment Variables
In Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add: `REACT_APP_API_URL` = `https://your-backend-url.com`

### Step 4: Update CORS in Backend
Update `backend/main.py` line 15:
```python
"https://your-app-name.vercel.app",  # Replace with your actual Vercel URL
```

## 🐍 Backend Deployment Options

### Option 1: Railway (Recommended)
1. Go to [railway.app](https://railway.app)
2. Connect GitHub repository
3. Select the `backend` folder as root
4. Railway will auto-detect Python and deploy
5. Set environment variables if needed

### Option 2: Heroku
1. Install Heroku CLI
2. Create `Procfile` in backend folder:
   ```
   web: uvicorn main:app --host 0.0.0.0 --port $PORT
   ```
3. Deploy:
   ```bash
   cd backend
   heroku create your-app-name
   git subtree push --prefix=backend heroku main
   ```

### Option 3: DigitalOcean App Platform
1. Connect GitHub repository
2. Set source directory to `backend`
3. Configure build and run commands:
   - Build: `pip install -r requirements.txt`
   - Run: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Option 4: Docker Deployment
Use the provided `Dockerfile` in the backend folder:
```bash
cd backend
docker build -t plant-disease-api .
docker run -p 8000:8000 plant-disease-api
```

## 🔧 Environment Variables

### Frontend (.env)
```
REACT_APP_API_URL=https://your-backend-url.com
```

### Backend (Production)
```
PORT=8000
CORS_ORIGINS=https://your-frontend-domain.vercel.app
```

## 📝 Deployment Checklist

### Before Deployment:
- [ ] Update CORS origins in backend
- [ ] Set correct API URL in frontend
- [ ] Test locally with production API URL
- [ ] Ensure all dependencies are in requirements.txt
- [ ] Add .env files to .gitignore

### After Deployment:
- [ ] Test all features on production
- [ ] Verify image upload works
- [ ] Check disease prediction functionality
- [ ] Test contact form
- [ ] Verify responsive design on mobile

## 🔍 Troubleshooting

### Common Issues:

1. **CORS Errors**
   - Update backend CORS origins
   - Check frontend API URL

2. **Build Failures**
   - Check Node.js version compatibility
   - Use `--legacy-peer-deps` for npm install

3. **API Not Found**
   - Verify backend is running
   - Check API URL in frontend .env

4. **Image Upload Issues**
   - Check file size limits
   - Verify backend file handling

## 📞 Support

If you encounter issues:
1. Check the logs in your deployment platform
2. Verify environment variables are set correctly
3. Test API endpoints directly using curl or Postman

## 🎉 Success!

Once deployed, your app will be available at:
- Frontend: `https://your-app.vercel.app`
- Backend API: `https://your-backend.railway.app` (or your chosen platform)

Enjoy your deployed Plant Disease Detection application! 🌱
