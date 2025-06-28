# 🚀 Vercel Deployment Setup Guide

## 📁 Project Structure (Ready for Vercel)

```
plant-disease-app/
├── frontend/              # ← Deploy this folder to Vercel
│   ├── src/              # React source code
│   ├── public/           # Static assets
│   ├── package.json      # Dependencies
│   ├── vercel.json       # Vercel configuration
│   └── .env              # Environment variables
├── backend/              # ← Deploy separately (Railway/Heroku)
│   ├── main.py           # FastAPI server
│   ├── requirements.txt  # Python dependencies
│   ├── Dockerfile        # Docker configuration
│   └── models/           # ML models
├── README.md
├── DEPLOYMENT.md
└── .gitignore
```

## 🎯 Quick Vercel Deployment Steps

### 1. Push to GitHub
```bash
cd plant-disease-app
git init
git add .
git commit -m "Initial commit - separated frontend and backend"
git branch -M main
git remote add origin https://github.com/yourusername/plant-disease-app.git
git push -u origin main
```

### 2. Deploy Frontend to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. **IMPORTANT**: Set Root Directory to `frontend`
5. Framework Preset: Create React App (auto-detected)
6. Click "Deploy"

### 3. Configure Environment Variables in Vercel
In your Vercel project dashboard:
- Go to Settings → Environment Variables
- Add: `REACT_APP_API_URL` = `https://your-backend-url.com`

### 4. Deploy Backend (Choose One)

#### Option A: Railway (Recommended)
1. Go to [railway.app](https://railway.app)
2. Connect GitHub repo
3. Select `backend` folder as root
4. Deploy automatically

#### Option B: Heroku
```bash
cd backend
heroku create your-backend-name
git subtree push --prefix=backend heroku main
```

### 5. Update CORS Settings
After backend deployment, update `backend/main.py` line 15:
```python
"https://your-vercel-app.vercel.app",  # Your actual Vercel URL
```

## ✅ Verification Checklist

- [ ] Frontend deploys successfully on Vercel
- [ ] Backend deploys on chosen platform
- [ ] CORS is configured correctly
- [ ] Environment variables are set
- [ ] Plant selection works
- [ ] Image upload functions
- [ ] Disease prediction works
- [ ] Contact form submits
- [ ] All pages load correctly

## 🔧 Files Ready for Deployment

### Frontend Files:
- ✅ `vercel.json` - Vercel configuration
- ✅ `.env` - Environment variables
- ✅ `package.json` - Updated with vercel-build script
- ✅ All React components and assets

### Backend Files:
- ✅ `Dockerfile` - For containerized deployment
- ✅ `requirements.txt` - Python dependencies
- ✅ `main.py` - Updated with CORS configuration
- ✅ All API endpoints and ML models

## 🌐 Expected URLs After Deployment

- **Frontend**: `https://your-app-name.vercel.app`
- **Backend**: `https://your-backend.railway.app` (or chosen platform)

## 🎉 You're Ready!

Your project is now properly structured for Vercel deployment. The frontend and backend are separated, all configuration files are in place, and the deployment process should be smooth.

**Next Steps:**
1. Push to GitHub
2. Deploy frontend to Vercel (set root directory to `frontend`)
3. Deploy backend to Railway/Heroku
4. Update environment variables
5. Test your live application!

Good luck with your deployment! 🚀
