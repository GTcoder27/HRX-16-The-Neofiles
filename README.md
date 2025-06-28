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
{
  "title": "AI-Powered Weather Dashboard",
  "description": "Build a real-time visualization tool...",
  "difficulty": "Beginner",
  "domain": "Coding/Web Development",
  "estimated_time": "10 hours",
  "tools": ["React", "API Integration"],
  "steps": ["Set up React environment...", "Integrate weather API..."]
}
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
| ![Input Screen](screenshots/input.png) | YouTube URL or concept input |
| ![Output Cards](screenshots/output.png) | Generated project ideas |

---

## 📜 License

This project is licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.

---


