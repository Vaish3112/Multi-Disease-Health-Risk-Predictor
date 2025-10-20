# 🩺 Multi-Disease Health Risk Predictor

A modern, interactive web-based **mini project** that helps users assess their risk for **Diabetes**, **Heart Disease**, **Hypertension**, and **Hyperlipidemia** using simple inputs and real-time visual feedback.

---

## 🚀 Overview

The **Health Risk Predictor** enables users to input essential health parameters and instantly receive a color-coded risk level (Low / Medium / High).  
Each condition includes:
- A dedicated input form  
- Informative "About Disease" page  
- A dynamic results page featuring charts, a gauge indicator, and personalized recommendations  

Users can also **download a PDF report** summarizing their results, inputs, and advice.  
This project focuses on simplicity, interactivity, and clean UI — built entirely with **HTML, CSS, and JavaScript**.

---

## 💡 Key Features

- 🔹 Predicts risk for 4 major lifestyle diseases  
- 🔹 Interactive and responsive card-based UI  
- 🔹 Personalized risk recommendations (Low / Medium / High)  
- 🔹 Circular gauge showing risk percentage visually  
- 🔹 Dynamic bar chart displaying user inputs vs. healthy benchmarks  
- 🔹 Tooltips and benchmark lines for comparison clarity  
- 🔹 Auto-generated PDF health report (includes inputs, results, and guidance)  
- 🔹 Smooth navigation using localStorage (no backend needed)  
- 🔹 Consistent theme, typography, and color scheme across pages  

---

## 🧠 Tech Stack

| Layer | Technologies |
|--------|--------------|
| **Frontend** | HTML5, CSS3, JavaScript (ES6) |
| **Visualization** | Chart.js |
| **PDF Generation** | jsPDF |
| **Data Handling** | localStorage |
| **Styling** | Custom CSS with responsive design |

---

## 🧭 How It Works

1. **Start** → Open `index.html` (Homepage)  
2. **Select a Disease** → from the Categories Page  
3. **(Optional)** → Read about the disease on its Info Page  
4. **Enter Inputs** → in the Predictor Form  
5. **Calculate Risk** → system displays:
   - Risk level (Low / Medium / High)
   - Percentage gauge
   - Visual chart with benchmark lines  
6. **Get Recommendations** → personalized based on risk level  
7. **Download PDF Report** → includes user info, input values, predictions, and guidance  

---

## 🗂️ Project Structure

Multi-Disease Health Risk Predictor
|
├── index.html                     → Homepage
├── homepage.css                   → Homepage styling
|
├── categories.html                → Disease selection (4 cards) 
├── categories.css                 → Category page styling
│                             
├── about_diabetes.html    
├── about_heart.html   
├── about_hypertension.html
├── about_hyperlipidemia.html      → Informational pages
├── about.css                      → Common “About” styling
│
├── diabetes_predictor.html
├── heart_predictor.html
├── hypertension_predictor.html
├── hyperlipidemia_predictor.html  → Input forms
├── predictor.css                  → Shared predictor styling
├── predictor.js                   → Form logic, localStorage handling
│
├── result.html                    → Displays results, charts, and recommendations
├── result.css                     → Result page design
├── result.js                      → Gauge, chart, and PDF generation logic
│
└── assets/                        → Backgrounds, icons, and logo

---
