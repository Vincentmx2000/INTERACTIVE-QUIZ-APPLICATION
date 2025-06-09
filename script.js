// ====== JavaScript ======
const quizData = [
    {
      question: "What is the capital of France?",
      answers: ["London", "Berlin", "Paris", "Madrid"],
      correct: "Paris"
    },
    {
      question: "Which planet is known as the Red Planet?",
      answers: ["Venus", "Earth", "Mars", "Jupiter"],
      correct: "Mars"
    },
    {
      question: "What is the boiling point of water?",
      answers: ["100°C", "50°C", "0°C", "120°C"],
      correct: "100°C"
    },
    {
      question: "Which language is used for web apps?",
      answers: ["Python", "C++", "JavaScript", "Java"],
      correct: "JavaScript"
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      answers: ["Tolstoy", "Shakespeare", "Orwell", "Hemingway"],
      correct: "Shakespeare"
    }
  ];
  
  // Get DOM elements
  const startContainer = document.getElementById('start-container');
  const quizContainer = document.getElementById('quiz-container');
  const questionEl = document.getElementById('question');
  const answerList = document.getElementById('answer-list');
  const feedbackEl = document.getElementById('feedback');
  const nextBtn = document.getElementById('next-btn');
  const scoreContainer = document.getElementById('score-container');
  const scoreEl = document.getElementById('score');
  const restartBtn = document.getElementById('restart-btn');
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  // Start the quiz
  document.getElementById('start-btn').addEventListener('click', () => {
    startContainer.classList.add('hidden');
    scoreContainer.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
    resetBackground();
  });
  
  // Load a question and answers
  function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    answerList.innerHTML = '';
    feedbackEl.textContent = '';
    resetBackground();
    nextBtn.classList.add('hidden');
  
    currentQuestion.answers.forEach(answer => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.textContent = answer;
      btn.classList.add('answer-btn');
      btn.addEventListener('click', () => selectAnswer(btn, currentQuestion.correct));
      li.appendChild(btn);
      answerList.appendChild(li);
    });
  }
  
  // Handle answer selection
  function selectAnswer(selectedBtn, correctAnswer) {
    const selectedAnswer = selectedBtn.textContent;
    // Disable all answer buttons once an answer is selected
    document.querySelectorAll('.answer-btn').forEach(btn => btn.disabled = true);
  
    if (selectedAnswer === correctAnswer) {
      selectedBtn.style.backgroundColor = '#22c55e'; // green
      feedbackEl.textContent = 'Correct! 🎉';
      score++;
      document.body.style.backgroundColor = '#dcfce7'; // light green bg
    } else {
      selectedBtn.style.backgroundColor = '#ef4444'; // red
      feedbackEl.textContent = `Oops! The correct answer was: ${correctAnswer}`;
      document.body.style.backgroundColor = '#fee2e2'; // light red bg
    }
  
    nextBtn.classList.remove('hidden');
  }
  
  // On clicking next, load next question or show score
  nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
      loadQuestion();
    } else {
      showScore();
    }
  });
  
  // Show final score screen
  function showScore() {
    quizContainer.classList.add('hidden');
    scoreContainer.classList.remove('hidden');
    scoreEl.textContent = `You scored ${score} out of ${quizData.length}!`;
    resetBackground();
    document.body.style.backgroundColor = '#fef3c7'; // soft yellow bg
  }
  
  // Restart quiz
  restartBtn.addEventListener('click', () => {
    startContainer.classList.remove('hidden');
    scoreContainer.classList.add('hidden');
    resetBackground();
  });
  
  // Reset background to default gradient
  function resetBackground() {
    document.body.style.backgroundColor = '';
  }
  