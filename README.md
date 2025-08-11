# 🌍 Travel Invitation Project

A Laravel-based **multi-step travel invitation system** that allows users to:
- Select travel packages
- Choose destination countries
- Fill in applicant details
- Add additional travelers
- Review all entered details before submitting

Perfect for visa assistance agencies, travel agents, or event organizers.

---

## 👨‍💻 Developed By
- [Hirtik Kumar](https://github.com/Hirtik786)
- [Murk Loungani](https://github.com/murkgithubusername)


---
## ✨ Features
- **Step-by-step form** workflow:
  1. Package Selection
  2. Country Selection
  3. Applicant Details
  4. Additional Travelers
  5. Review & Submit
- **Dynamic traveler management** — Add/remove travelers without page reload
- **Country & package data** loaded dynamically via PHP
- **Bootstrap 5 responsive design**
- **Validation-ready form structure**
- **Easily customizable UI**

---

## 🛠 Tech Stack
| Layer          | Technology         |
|----------------|-------------------|
| Backend        | Laravel 10, PHP 8+ |
| Frontend       | Bootstrap 5, HTML5, CSS3 |
| Interactivity  | JavaScript |
| Database       | MySQL / MariaDB    |
| Hosting        | Any PHP-compatible server |

---
# 🌍 Travel Invitation System

A Laravel-based multi-step travel invitation application where users can select packages, choose destination countries, add traveler details, and review their information before submission.

---

## 📂 Project Structure

```
travel-invitation/
│
├── app/                 # Laravel app core files (Controllers, Models, etc.)
├── bootstrap/           # Laravel bootstrap files
├── config/              # Configuration files
├── database/            # Migrations & Seeders
│   ├── migrations/
│   └── seeders/
├── public/              # Public assets (CSS, JS, images)
│   ├── css/
│   ├── js/
│   └── images/
├── resources/
│   ├── views/           # Blade templates (multi-step form pages)
│   ├── js/              # Frontend JS (dynamic traveler addition)
│   └── sass/            # Styles (Bootstrap / custom SCSS)
├── routes/
│   └── web.php          # Application routes
├── storage/             # Storage for logs, cache, uploads
├── tests/               # PHPUnit tests
├── .env.example         # Example environment config
├── artisan              # Laravel CLI tool
├── composer.json        # PHP dependencies
├── package.json         # Node.js dependencies
└── README.md            # Documentation file
```

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/travel-invitation.git
cd travel-invitation
```

### 2️⃣ Install Dependencies
```bash
composer install
npm install && npm run build
```

### 3️⃣ Set Up Environment Variables
```bash
cp .env.example .env
php artisan key:generate
```

Edit `.env` to match your database credentials:
```makefile
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=travel_invitation
DB_USERNAME=root
DB_PASSWORD=
```

### 4️⃣ Migrate the Database
```bash
php artisan migrate
```

### 5️⃣ Run the Local Server
```bash
php artisan serve
```
Visit: **[http://localhost:8000](http://localhost:8000)**

---

## 📖 Usage Guide

### Step-by-step Flow:
1. **Select Package** — Choose from available travel or visa packages.  
2. **Select Country** — Pick the destination country from a list.  
3. **Applicant Details** — Enter main applicant information.  
4. **Add Travelers** — Dynamically add travelers with name & relation.  
5. **Review & Submit** — Preview all entered details before submission.  

---

