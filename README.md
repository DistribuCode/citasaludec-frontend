# 📅 Appointment Frontend

This is the frontend of the appointment scheduling system. Built with **React.js**, it allows users to register, log in, and manage medical appointments. It communicates with backend microservices like authentication, appointment creation, and cancellation.

---

## 🧩 Features

- User registration and login interface  
- Dashboard with appointment list and notification panel  
- Create and cancel appointments  
- Built with reusable components (React)  
- Integrated with multiple backend APIs  
- Configured to run in Docker  
- Supports deployment on EC2 and GitHub Actions

---

## ⚙️ Technologies

- React.js (Functional components)
- React Router DOM
- CSS Modules
- Docker & Nginx
- GitHub Actions (CI/CD)

---

## 🐳 Running with Docker

### 1. Build the image

```bash
docker build -t appointment-frontend .

2. Run the container

docker run -d -p 80:80 appointment-frontend

    Make sure backend services are reachable via correct API URLs set inside the frontend (e.g., in API files or .env)

☁️ EC2 Deployment

To deploy the frontend to an EC2 instance:
1. SSH into the instance

ssh -i key.pem ec2-user@<YOUR_EC2_PUBLIC_IP>

2. Pull the image

docker pull jeffri1997/appointment-frontend:qa

3. Run the container

docker run -d -p 80:80 jeffri1997/appointment-frontend:qa

✅ Make sure port 80 is open in your EC2 security group.
🌐 You can now access the app at: http://<YOUR_EC2_PUBLIC_IP>
🧪 Available Pages & Components

    /register: User registration

    /login: User login

    /dashboard: Appointment dashboard

        AppointmentsList

        CreateAppointment

        CancelAppointment

        NotificationsPanel

Reusable UI:

    Navbar

    API calls in src/api/

🤖 GitHub Actions

The GitHub Actions workflow in .github/workflows/ automates building and pushing the image to Docker Hub:

name: Build and Push Frontend

on:
  push:
    branches: [qa]

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Docker Login
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build and Push
        run: |
          docker build -t jeffri1997/appointment-frontend:qa .
          docker push jeffri1997/appointment-frontend:qa

👤 Author

Jefferson Marcalla
GitHub: @Jeff97ares