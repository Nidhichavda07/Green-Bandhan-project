# Green-Bandhan-Project
 
# Project Setup Guide

This project has two parts:
- **Backend**: Django + Django REST Framework
- **Frontend**: React

Follow the steps below to set up and run both.

---

Got it 👍 You’ll need a **README.md** to set up both **Django (backend)** and **React (frontend)** for your GreenBandhan project. Here’s a clean version you can drop directly into your repo:

---

# 🌍 GreenBandhan – Eco Community Platform

**GreenBandhan (ग्रीनबंधन)** – *Connected to Nature, Committed to Tomorrow*
A community-driven platform where **citizens, NGOs, recyclers, and volunteers** collaborate on **parks, campaigns, and sustainability projects**.

---

## 📌 Features

* 🌳 Browse nearby **Parks** with map integration.
* 🌍 Participate in **Environmental Campaigns** organized by NGOs.
* 👥 Role-based users: Citizens, NGOs, Volunteers, Recyclers.
* 📍 Google Maps / OpenStreetMap integration.
* ⚡ Django REST Framework + React frontend.

---

## 🛠 Tech Stack

* **Frontend**: React + TailwindCSS
* **Backend**: Django + Django REST Framework
* **Database**: SQLite (dev) / PostgreSQL (prod)
* **Maps**: Google Maps API (or free alternative Leaflet.js + OSM)

---

## 🚀 Installation Guide

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/greenbandhan.git
cd greenbandhan
```

---

### 2️⃣ Backend Setup (Django)

```bash
cd backend
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate

pip install -r requirements.txt
```

#### Requirements (requirements.txt)

```
Django>=4.2
djangorestframework
django-cors-headers
```

#### Run migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

#### Create superuser (for admin panel)

```bash
python manage.py createsuperuser
```

#### Start backend server

```bash
python manage.py runserver
```

Backend will run at 👉 **[http://127.0.0.1:8000](http://127.0.0.1:8000)**

---

### 3️⃣ Frontend Setup (React)

```bash
cd ../frontend
npm install
```

#### Required NPM packages

```
react
react-dom
react-scripts
react-icons
@react-google-maps/api
tailwindcss
```

#### Start frontend

```bash
npm start
```

Frontend will run at 👉 **[http://localhost:3000](http://localhost:3000)**

---

### 4️⃣ Environment Variables

Create `.env` file inside **frontend/**:

```
REACT_APP_GOOGLE_API_KEY=your_google_maps_api_key
```

---

## 🧪 Testing APIs (Backend)

Visit:

* Parks: `http://127.0.0.1:8000/api/parks/`
* Campaigns: `http://127.0.0.1:8000/api/campaigns/`

---

## 📸 Demo Screens

* Parks Directory with Map
* Campaigns with Participate Button
* Django Admin for managing parks & campaigns

---

## 🤝 Contribution

Pull requests are welcome!

---

Do you want me to make this README **beginner-friendly** with screenshots + copy-paste commands, or keep it **developer-focused** like above?


## 1. Clone the Repository
```bash
git clone <your-repo-url>
cd <your-project-folder>


api key for google 
AIzaSyD6fTSwlWgsI9e2eIRz2BPXrqAxcTzid3c