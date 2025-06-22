const quizData = [
  // GENERAL KNOWLEDGE
  {
    question: "What is the capital of France?",
    answers: ["London", "Berlin", "Paris", "Madrid"],
    correct: "Paris",
    category: "general"
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    answers: ["Tolstoy", "Shakespeare", "Orwell", "Hemingway"],
    correct: "Shakespeare",
    category: "general"
  },
  {
    question: "Which language is used for web apps?",
    answers: ["Python", "C++", "JavaScript", "Java"],
    correct: "JavaScript",
    category: "general"
  },
  {
    question: "What is the national animal of India?",
    answers: ["Lion", "Peacock", "Tiger", "Elephant"],
    correct: "Tiger",
    category: "general"
  },
  {
    question: "Which country hosted the 2020 Summer Olympics?",
    answers: ["Brazil", "Japan", "China", "USA"],
    correct: "Japan",
    category: "general"
  },

  // SCIENCE
  {
    question: "Which planet is known as the Red Planet?",
    answers: ["Venus", "Earth", "Mars", "Jupiter"],
    correct: "Mars",
    category: "science"
  },
  {
    question: "What is the boiling point of water?",
    answers: ["100°C", "50°C", "0°C", "120°C"],
    correct: "100°C",
    category: "science"
  },
  {
    question: "What gas do plants absorb from the atmosphere?",
    answers: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    correct: "Carbon Dioxide",
    category: "science"
  },
  {
    question: "How many bones are in the adult human body?",
    answers: ["206", "201", "198", "212"],
    correct: "206",
    category: "science"
  },
  {
    question: "Which part of the cell contains genetic material?",
    answers: ["Cytoplasm", "Nucleus", "Ribosome", "Mitochondria"],
    correct: "Nucleus",
    category: "science"
  }
];

let selectedCategory = "all";
let filteredQuiz = [];
let currentQuestionIndex = 0;
let score = 0;
let correct = 0;
let incorrect = 0;

// DOM
const startContainer = document.getElementById('start-container');
const quizContainer = document.getElementById('quiz-container');
const questionEl = document.getElementById('question');
const answerList = document.getElementById('answer-list');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');
const scoreContainer = document.getElementById('score-container');
const scoreEl = document.getElementById('score');
const summaryEl = document.getElementById('summary');
const highScoreEl = document.getElementById('high-score');
const restartBtn = document.getElementById('restart-btn');
const progressEl = document.getElementById('progress');
const categorySelect = document.getElementById('category-select');
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

document.getElementById('start-btn').addEventListener('click', () => {
  selectedCategory = categorySelect.value;
  filteredQuiz = selectedCategory === "all" ? [...quizData] : quizData.filter(q => q.category === selectedCategory);
  shuffle(filteredQuiz);
  startContainer.classList.add('hidden');
  scoreContainer.classList.add('hidden');
  quizContainer.classList.remove('hidden');
  currentQuestionIndex = 0;
  score = 0;
  correct = 0;
  incorrect = 0;
  loadQuestion();
  resetBackground();
});

function loadQuestion() {
  const currentQuestion = filteredQuiz[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;
  progressEl.textContent = `Question ${currentQuestionIndex + 1} of ${filteredQuiz.length}`;
  answerList.innerHTML = '';
  feedbackEl.textContent = '';
  resetBackground();
  nextBtn.classList.add('hidden');

  const shuffledAnswers = shuffle([...currentQuestion.answers]);
  shuffledAnswers.forEach(answer => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.textContent = answer;
    btn.classList.add('answer-btn');
    btn.addEventListener('click', () => selectAnswer(btn, currentQuestion.correct));
    li.appendChild(btn);
    answerList.appendChild(li);
  });
}

function selectAnswer(selectedBtn, correctAnswer) {
  const selectedAnswer = selectedBtn.textContent;
  document.querySelectorAll('.answer-btn').forEach(btn => btn.disabled = true);

  if (selectedAnswer === correctAnswer) {
    selectedBtn.style.backgroundColor = '#22c55e';
    feedbackEl.textContent = 'Correct! 🎉';
    score++;
    correct++;
    document.body.style.backgroundColor = '#dcfce7';
  } else {
    selectedBtn.style.backgroundColor = '#ef4444';
    feedbackEl.textContent = `Oops! The correct answer was: ${correctAnswer}`;
    incorrect++;
    document.body.style.backgroundColor = '#fee2e2';
  }

  nextBtn.classList.remove('hidden');
}

nextBtn.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < filteredQuiz.length) {
    loadQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  quizContainer.classList.add('hidden');
  scoreContainer.classList.remove('hidden');
  scoreEl.textContent = `You scored ${score} out of ${filteredQuiz.length}!`;
  summaryEl.textContent = `Correct: ${correct} | Incorrect: ${incorrect} | ${Math.round((score / filteredQuiz.length) * 100)}%`;
  resetBackground();

  const high = localStorage.getItem('highScore') || 0;
  if (score > high) {
    localStorage.setItem('highScore', score);
    highScoreEl.textContent = `🎉 New High Score: ${score}`;
  } else {
    highScoreEl.textContent = `High Score: ${high}`;
  }

  document.body.style.backgroundColor = '#fef3c7';
}

restartBtn.addEventListener('click', () => {
  startContainer.classList.remove('hidden');
  scoreContainer.classList.add('hidden');
  resetBackground();
});

function resetBackground() {
  document.body.style.backgroundColor = '';
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}
