const main = document.querySelector('main');
const theQuestion = document.querySelector('.the-question');
const optionsFieldContainer = document.querySelector('.options-field');
const optionField = document.querySelector('.options-field').children;
const answerTrackerContainer = document.querySelector('.answers-tracker');
const questionsOfTotal = document.querySelector('.question-of-total');
const totalQuestionSpan = document.querySelector('.total-question');
const totalQuestionSpan2 = document.querySelector('.total-question2');
const makeChoice = document.querySelector('.make-choice');
const correctAnswerSpan = document.querySelector('.correct-answers');
const percentage = document.querySelector('.percentage');
const gameOver = document.querySelector('.game-over');
const option = document.querySelector('.option');
const quiz_btn = document.getElementById('quiz_btn');
const quiz_body = document.getElementById('quiz-body');
const myModal = document.getElementById('myModal');
const close_symbol = document.getElementById('close_symbol');
const quiz_container = document.querySelector('.quiz-container');
const ansexp = document.getElementById('ansExp');

quiz_btn.onclick = function(){
  myModal.style.display="flex";
  main.style.display="flex";
  quiz_container.style.display="flex";
}

close_symbol.onclick = function(){
  myModal.style.display="none";
}






const allQuestionsArr = [
    {
      q: 'What algorithm does Google Maps use?',
      options:['Dijkstra','Post-order Traversal','D*','A*'],
      answer: 0
    },
    { 
      q: 'Each node within a shortest path algorithm is: ',
      options:['Heavy','Valued','Weighted','Numbered'],
      answer: 2
    },
    {
      q: 'Which type of queue is used in Dijkstra Algorithm?',
      options:['Priority','Circular','Linear'],
      answer: 0
  },
  {
      q: 'Dijkstra Algorithm will have completed and visited every node once the circular queue is empty',
      options: ['True','False'],
      answer: 1
  },
  {
      q: 'Which data structure is used to keep track of the specific route used for each note in Dijkstra Algorithm?',
      options: ['Queue','Stack','Tree','List'],
      answer: 3
  },
  {
      q: 'Dijkstra’s Algorithm is used to solve _____________ problems.',
      options: ['All pair shortest path','Single source shortest path','Network flow','Sorting'],
      answer: 1
  },
  {
      q: 'What is the time complexity of Dijikstra’s algorithm?',
      options: ['O(N)','O(N*N*N)',' O(N*N)','O(logN)'],
      answer: 2
  },
  {
      q: 'Dijkstra’s Algorithm cannot be applied on',
      options: ['Directed and weighted graphs','Graphs having negative weight function','Unweighted graphs','Undirected and unweighted graphs'],
      answer: 3  
  },
  {
      q: 'How many priority queue operations are involved in Dijkstra’s Algorithm?',
      options: ['1','3','2','4'],
      answer: 1
  },
  {
      q: 'The running time of Bellmann Ford algorithm is lower than that of Dijkstra’s Algorithm.',
      options: ['True','False'],
      answer: 1
  },
  {
      q: 'Dijkstra’s Algorithm is the prime example for ',
      options: ['Greedy algorithm','Branch and bound','Back tracking','Dynamic programming'],
      answer: 0
  },
  {
      q: 'The maximum number of times the decrease key operation performed in Dijkstra’s algorithm will be equal to:',
      options: ['Total number of vertices','Number of vertices – 1','Total number of edges','Number of edges – 1'],
      answer: 2
  },
  ];



let questionIndex = 0;
let index = 0;
let myArray = [];
let myArr = [];
let score = 0;

let allQuestions = [...allQuestionsArr];
let theRandomQuestions = [];

function selectQuestions() {
  if (allQuestions.length < 5) {
    allQuestions = [...allQuestionsArr];
  };
  
  theRandomQuestions = [];

  for (let i = 0; i < 5; i++) {
    let randomQuestion = Math.floor(Math.random() * allQuestions.length);

    theRandomQuestions.push(allQuestions[randomQuestion]);
    allQuestions.splice(randomQuestion, 1);
  };
};

function load() {
  questionsOfTotal.innerHTML = index+1;
  optionsFieldContainer.innerHTML = '';
  theQuestion.innerHTML = theRandomQuestions[questionIndex].q;

  for(let i = 0; i < theRandomQuestions[questionIndex].options.length; i++) {
    optionsFieldContainer.innerHTML += `<div class="option">${theRandomQuestions[questionIndex].options[i]}</div>`;
  };

  const parent = optionsFieldContainer;
  const children = Array.from(parent.children);


  children.map((option, index) => {
    option.addEventListener('click', () => {
      checkIfRightAnswer(index);
    });
  })
};

function next() {
  validate();
};

function checkIfRightAnswer(index) {
  if(index == theRandomQuestions[questionIndex].answer) {
    optionField[index].classList.add('correct');
    updateAnswerTracker('correct');
    score++;
  } else {
    optionField[index].classList.add('wrong');
    optionField[theRandomQuestions[questionIndex].answer].classList.add('correct');
    updateAnswerTracker('wrong');
  }
  disableOptions();
  
  makeChoice.innerHTML = '';
  makeChoice.style.backgroundColor = '';
};

function disableOptions() {
  for(let i = 0; i < optionField.length; i++) {
    optionField[i].classList.add('disabled');
  }
};

function enableOptions() {
  for(let i = 0; i < optionsFieldContainer.children.length; i++) {
    optionField[i].classList.remove('disabled', 'correct', 'wrong');
  }
};

function validate() {
  if(!optionField[0].classList.contains('disabled')) {
    makeChoice.innerHTML = 'Please select an option before proceeding.';
    makeChoice.style.backgroundColor = 'rgba(255, 255, 255, 0.415)';
  }
  else {
    if (questionIndex === 4) {
      quizOver();
      questionIndex = 0;
    } else {
      enableOptions();
      questionIndex++;
      load();
    }
  }
};

function answerTracker() {
    for(let i = 0; i < theRandomQuestions.length; i++){ 
      const div = document.createElement('div');
        answerTrackerContainer.appendChild(div);
  }
}

function updateAnswerTracker(classNam) {
  let boxes = Array.from(answerTrackerContainer.children);
  boxes[index].classList.add(classNam);
  index++;
};

function tryAgain() {
  index = 0;
  answerTrackerContainer.innerHTML = '';
  document.querySelector('.quiz-over').classList.remove('show');
  score = 0;
  loadRound();
};

window.onload = function () {
  loadRound();
};

function loadRound() {
  selectQuestions();
  load();
  
  totalQuestionSpan.innerHTML = theRandomQuestions.length;

  answerTracker();
  index = 0;
};



function quizOver() {
  document.querySelector('.quiz-over').classList.add('show');

  let finishScore = (score/theRandomQuestions.length)*100;
  
  correctAnswerSpan.innerHTML = score;
  totalQuestionSpan2.innerHTML = theRandomQuestions.length;
  percentage.innerHTML = finishScore+ '%';

}