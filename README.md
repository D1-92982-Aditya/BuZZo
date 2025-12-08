<div align="center">
  <h1 style="font-size: 48px; margin-bottom: 10px;">🚌 BUZZO – Bus Booking Application</h1>
  <p style="font-size: 18px; max-width: 700px;">
    A modern, scalable and production-ready Bus Booking platform built using a 
    <b>polyglot microservice architecture</b> – Spring Boot, Node.js, .NET, React, 
    MySQL, Docker, AWS EC2 & CI/CD with Jenkins.
  </p>
  
  <br/>
  


  <!-- Badges -->
  <img src="https://img.shields.io/badge/Backend-SpringBoot-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Backend-Node.js-lightgreen?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Admin-.NET-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Frontend-React-61dbfb?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Database-MySQL-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/DevOps-Docker-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/AWS-EC2-orange?style=for-the-badge" />
  <img src="https://img.shields.io/badge/CI/CD-Jenkins-red?style=for-the-badge" />

  <br/><br/>

  <!-- Demo Image Placeholder -->
  <img src="https://via.placeholder.com/900x400?text=Buzzo+Bus+Booking+Application+Demo" 
       alt="Buzzo Demo"
       style="border-radius: 12px; box-shadow: 0px 0px 12px rgba(0,0,0,0.2);" />
</div>

<hr/>

<h2>🚀 Project Overview</h2>
<p>
  <b>Buzzo</b> is an end-to-end bus reservation platform designed using a distributed 
  microservices architecture. Each module of the system is independently developed 
  using different technologies to ensure scalability, loose coupling, and 
  high performance in real-time traffic.
</p>

<h3>🌟 Key Highlights</h3>
<ul>
  <li>⚡ Microservice-based architecture</li>
  <li>🛂 Multi-tech backend (Spring Boot + Node.js + .NET)</li>
  <li>🎨 Modular React frontend for smooth user experience</li>
  <li>🗄️ MySQL relational database with optimized schema</li>
  <li>🐳 Docker containerization for portable deployments</li>
  <li>☁️ AWS EC2 hosting with secure configuration</li>
  <li>🔁 Automated CI/CD pipelines using Jenkins</li>
</ul>

<hr/>

<h2>🧩 System Architecture</h2>

<ul>
  <li><b>Spring Boot (User Module Backend)</b>  
    Handles user authentication, booking workflows, validation, and transaction layers.
  </li>
  <li><b>Node.js (User Module Backend - Additional Services)</b>  
    Supports auxiliary APIs, real-time notifications, payment workflows.
  </li>
  <li><b>.NET (Admin Panel Backend)</b>  
    Used for bus management, schedules, routes, admin authentication, analytics.
  </li>
  <li><b>React.js (Frontend)</b>  
    Provides a fast, responsive user interface.
  </li>
  <li><b>MySQL (Database)</b>  
    Central relational DB with normalized schema for bookings, users, seats, routes.
  </li>
  <li><b>Docker</b>  
    Containerizes all services for consistent multi-environment deployment.
  </li>
  <li><b>AWS EC2</b>  
    Hosts backend, frontend, and database securely and efficiently.
  </li>
  <li><b>Jenkins CI/CD</b>  
    Automates build, test, deployment pipeline for all services.
  </li>
</ul>

<hr/>

<h2>📦 Features</h2>
<ul>
  <li>🔐 User Signup/Login (JWT Auth)</li>
  <li>🚌 Search Buses by location, time & date</li>
  <li>💺 Real-time seat availability tracking</li>
  <li>📆 Booking & Cancellation system</li>
  <li>💳 Payment integration-ready API structure</li>
  <li>📊 Admin Dashboard for managing buses & routes</li>
  <li>🔔 Email/SMS Notification ready</li>
  <li>📱 Fully responsive UI</li>
</ul>

<hr/>

<h2>📁 Directory Structure</h2>

```text
<pre>
fullstack-microservices-app/
│
├── frontend/                      # React app
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│
├── backend/
│   ├── admin-service/             # C# service
│   │   ├── Dockerfile
│   │   ├── src/
│   │   └── appsettings.json
│   │
│   ├── user-service/              # Java (Spring Boot)
│   │   ├── Dockerfile
│   │   ├── src/
│   │   └── pom.xml
│   │
│   ├── helper-service/            # Node.js (Express)
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── src/
│   │
│   └── docker-compose.yml         # Compose to run backend services
│
├── database/
│   ├── admin-db-init.sql
│   ├── user-db-init.sql
│   └── helper-db-init.sql
│
├── jenkins/
│   └── Jenkinsfile
│
├── docker-compose.yml             # Main compose (frontend + backend)
├── README.md
└── .gitignore
</pre>
