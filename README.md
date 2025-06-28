# 🚀 Svādhyāya – HacKronyX Project

**Svādhyāya** (स्वाध्याय), meaning *self-study*, is an AI-powered **DIY Mission Engine** developed during the HacKronyX Hackathon by team The Neophile.
It addresses a common challenge faced by learners:

> “I’ve just learned a new concept — but what should I build to apply it?”

This platform bridges the gap between **theory and practice** by generating **personalized, hands-on project ideas** based on user inputs such as topics or educational video transcripts. It intelligently adjusts project complexity according to the user's skill level and suggests tasks across multiple domains, including:

- 🧑‍💻 Coding & Software Development  
- 🔌 Hardware & IoT  
- 🎨 Design & UI/UX  
- 🔬 Research & Analysis  

Whether you're a beginner looking to get started or an advanced learner seeking a challenge, **Svādhyāya** empowers you to turn knowledge into action.

---

## ⚙️ How It Works

### 🔹 Input Flexibility
- Accepts learning concepts (e.g., `"machine learning"`)
- Processes YouTube video URLs to extract transcripts automatically

### 🔹 AI-Powered Project Generation
- Uses **Google Generative AI (Gemini)** to generate tailored project ideas
- Dynamically adapts project difficulty (Beginner, Intermediate, Advanced)
- Suggests starter templates and guided hints

### 🔹 Sample Output (JSON)
```json
[
  {
    "id": 1,
    "title": "AI-Powered Interactive Dashboard",
    "description": "Build a stunning real-time dashboard with machine learning insights, data visualization, and responsive design that adapts to any device.",
    "difficulty": "Intermediate",
    "tags": ["React", "D3.js", "Machine Learning", "WebSocket"],
    "estimatedTime": "in hours, days or weeks",
    "quickpreview": [
      "• Step 1: Set up your development environment. For example, install Python and required libraries like OpenCV.",
      "• Step 2: Create a new project folder and initialize a Git repository.",
      "• Step 3: Implement the core feature—such as writing a function for binary search or face detection.",
      "• Step 4: Test the function with different inputs and handle edge cases.",
      "• Step 5: Add a simple UI or visualization to interact with your function.",
      "• Step 6: Package or document your project for sharing."
    ],
    "category": "Full Stack"
  },
  {
    "id": 2,
    "title": "Smart Recommendation Engine",
    "description": "Create an intelligent recommendation system using collaborative filtering and deep learning to suggest personalized content to users.",
    "difficulty": "Advanced",
    "tags": ["Python", "TensorFlow", "Neural Networks", "API"],
    "estimatedTime": "in hours, days or weeks",
    "quickpreview": [
      "• Step 1: Set up your development environment. For example, install Python and required libraries like OpenCV.",
      "• Step 2: Create a new project folder and initialize a Git repository.",
      "• Step 3: Implement the core feature—such as writing a function for binary search or face detection.",
      "• Step 4: Test the function with different inputs and handle edge cases.",
      "• Step 5: Add a simple UI or visualization to interact with your function.",
      "• Step 6: Package or document your project for sharing."
    ],
    "category": "AI/ML"
  },
  {
    "id": 3,
    "title": "Mobile-First Progressive Web App",
    "description": "Develop a lightning-fast PWA with offline capabilities, push notifications, and seamless mobile experience.",
    "difficulty": "Beginner",
    "tags": ["JavaScript", "Service Workers", "PWA", "Mobile"],
    "estimatedTime": "in hours, days or weeks",
    "quickpreview": [
      "• Step 1: Set up your development environment. For example, install Python and required libraries like OpenCV.",
      "• Step 2: Create a new project folder and initialize a Git repository.",
      "• Step 3: Implement the core feature—such as writing a function for binary search or face detection.",
      "• Step 4: Test the function with different inputs and handle edge cases.",
      "• Step 5: Add a simple UI or visualization to interact with your function.",
      "• Step 6: Package or document your project for sharing."
    ],
    "category": "Mobile"
  }
]

```

---

## 🛠️ Technical Architecture

| Component         | Tech Stack                  | Function                                      |
|------------------|-----------------------------|-----------------------------------------------|
| **Frontend**      | React + Vite + Tailwind CSS | User interface for input/output               |
| **Backend**       | Node.js + Express           | Handles AI logic and API processing           |
| **Transcript API**| Python + Flask              | Extracts and cleans YouTube video transcripts |
| **AI Engine**     | Google Generative AI (Gemini)| Generates project tasks from input data       |

---

## 🧩 Key Features

- **Adaptive Complexity**  
  Automatically scales projects from **Beginner** to **Advanced** based on learning depth.

- **Cross-Domain Suggestions**  
  - Coding (e.g., "Build a Python CLI tool")  
  - Hardware (e.g., "Arduino-based smart plant monitor")  
  - Design (e.g., "Figma UI kit for healthcare apps")

- **Guided Onboarding**  
  Each project comes with step-by-step starter instructions and useful resource links.

---

## 🚧 Installation Guide

### Prerequisites:
- Python 3.10+
- Node.js v18+
- Google Gemini API key

### 🔹 Clone the Repo
```bash
git clone https://github.com/GTcoder27/HacKronyX-Project
cd HacKronyX-Project
```

### 🔹 Set up Services

#### 1. Transcript Service (Python)
```bash
cd transcript_service
pip install -r requirements.txt
```

#### 2. Backend (Node.js)
```bash
cd ../backend
npm install
echo "GEMINI_API_KEY=your_key_here" > .env
```

#### 3. Frontend (React)
```bash
cd ../frontend
npm install
```

### 🔹 Run All Services

**Terminal 1: Transcript Service**
```bash
python transcript_service/app.py
```

**Terminal 2: Backend**
```bash
npm run dev
```

**Terminal 3: Frontend**
```bash
npm run dev
```

> Access the app at: [http://localhost:5173](http://localhost:5173)

---

## 🎯 Usage Example

**Input:**  
`"Computer vision basics"`

**Output Project Idea:**
```
- Project: Real-time Object Detector  
- Domain: Coding/Hardware  
- Steps:
  1. Set up Raspberry Pi camera
  2. Install OpenCV
  3. Build motion-tracking script
- Starter Code: [Link to GitHub Gist]
```

---

## 🌟 What's Next?

- 🔒 User profile system for personalized complexity adjustment
- 📌 Project bookmarking and progress tracking
- 📚 Integration with learning platforms like Coursera/edX

---

## 👥 Contribution Guidelines

1. Fork the repository
2. Create a feature branch:
   ```bash
   git checkout -b feat/your-feature
   ```
3. Submit a pull request with:
   - Code changes
   - Test coverage
   - Documentation updates

> ✅ Run `npm test` (frontend/backend) and `pytest` (transcript service) before PR submission

---

## 📸 Screenshots

| Interface | Functionality |
|-----------|----------------|
| Input Screen
![image](https://github.com/user-attachments/assets/39853e51-fa06-4dbe-9bff-c626c18d9129)
 | YouTube URL or concept input |
| Output Screen ![image](https://github.com/user-attachments/assets/56729bf9-3beb-4e51-9a96-bc65d8304293)
 | Generated project ideas |

---

## 📜 License

This project is licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.

---


