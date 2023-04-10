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
    q: 'Which of the following sorting algorithms is the fastest?',
    options:['Merge sort','Quick sort','Insertion sort','Shell sort'],
    answer: 1
  },
  { 
    q: 'Quick sort follows Divide-and-Conquer strategy.',
    options:['True','False'],
    answer: 0
  },
  {
    q: 'What is the worst case time complexity of a quick sort algorithm?',
    options:['O(N)','O(N log N)','O(N2)','O(log N)' ],
    answer: 2
},
{
    q: ' Which of the following methods is the most effective for picking the pivot element?',
    options: ['first element','last element','median-of-three partitioning','random element'],
    answer: 2
},
{
    q: 'How many sub arrays does the quick sort algorithm divide the entire array into?',
    options: [ 'one','two','three','four'],
    answer: 1
},
{
    q: ' What is the average running time of a quick sort algorithm?',
    options: ['O(N2)','O(N)','O(N log N)','O(log N)'],
    answer: 2
},
{
    q: 'Quick sort uses join operation rather than merge operation.',
    options: ['True','False'],
    answer: 0
},
{
  q: 'QuickSort can be categorized into which of the following?',
  options: ['Brute Force technique','Divide and conquer','Greedy algorithm','Dynamic programming'],
  answer: 1
},
{
  q: 'What is the best case complexity of QuickSort?',
  options: ['O(nlogn)','O(logn)','O(n)','O(n2)'],
  answer: 0
},
{
  q: 'What is the purpose of using randomized quick sort over standard quick sort?',
  options: ['so as to avoid worst case time complexity','so as to avoid worst case space complexity','to improve accuracy of output','to improve average case time complexity'],
  answer: 0
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