# Disaster Management System

A comprehensive Disaster Management System built to handle emergency situations efficiently, track resources, manage victims and relief camps, and coordinate rescue operations.

## 🚀 Features

- **Disaster Tracking**: Log and monitor active disasters, their severity, and their impact across different areas.
- **Victim Management**: Track the status of victims (Safe, Injured, Critical, Missing) and their shelter allocations.
- **Relief Camp Operations**: Manage relief camps, track capacity, and handle resource allocation.
- **Rescue Operations**: Coordinate rescue teams and manage available rescue personnel.
- **Volunteer Tracking**: Maintain a database of available volunteers with specific skills and track their assignments.
- **Emergency Requests**: Log and monitor emergency requests from different locations.

## 🏗️ Tech Stack

### Frontend (Client)
- React 19
- Vite
- Recharts (for Analytics/Dashboard data visualization)
- Lucide React (Icons)
- React Router DOM
- CSS / Custom styling

### Backend (Server)
- Node.js
- Express.js
- MySQL2
- Cors & Dotenv

### Database (DB)
- **MySQL Database Architecture**: Fully normalized schema dealing with real-world entities.
- Includes advanced DBMS features:
  - **Tables**: `Location`, `Disaster_Type`, `Disaster`, `Resource_Type`, `Emergency_Request`, `Victim`, `Relief_Camp`, `Shelter_Allocation`, `Rescue_Team`, `Volunteer`, etc.
  - **Views**: For simplified analytics and reporting (e.g., aggregating victims per camp, resource statuses).
  - **Stored Procedures & Triggers**: For enforcing business rules, data integrity, and complex transactions automated on the database level.

## 📁 Project Structure

```
disaster_management_system/
│
├── client/         # React frontend application
│   ├── src/        # UI Components, Pages, and Context
│   ├── public/     # Static assets
│   └── package.json# Frontend dependencies
│
├── server/         # Express backend API
│   ├── routes/     # API endpoints
│   ├── db.js       # Database connection configuration
│   ├── server.js   # Application entry point
│   └── package.json# Backend dependencies
│
└── db/             # MySQL Database files
    ├── 01_schema.sql         # Core tables creation
    ├── 02_indexes.sql        # Performance indexes
    ├── 03_views.sql          # Predefined database views
    ├── 04_procedures.sql     # Stored procedures
    ├── 05_triggers.sql       # Database triggers
    └── 06_seed_data.sql      # Initial mock data for testing
```

## 🛠️ Usage / Setup

### Prerequisites
- Node.js (v18+)
- MySQL Server

### Database Setup
1. Create a database in MySQL and run the files in the `db/` directory in order:
   - `01_schema.sql` -> schema structures.
   - `02_indexes.sql` through `06_seed_data.sql` to populate and setup advanced logic.

### Server Setup
1. Navigate to the `server/` directory: `cd server`
2. Install dependencies: `npm install`
3. Setup a `.env` file with your database connection logic:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=disaster_management
   PORT=5000
   ```
4. Start the server: `npm start` or `npm run dev`

### API Integrations
- Navigate to the `client/` directory: `cd client`
- Install dependencies: `npm install`
- Start the React dev server: `npm run dev`

## 🤝 Contribution

This project was built to implement a well-structured Information System with deep DBMS applications interacting seamlessly with a React interface.

## 📄 License

ISC
