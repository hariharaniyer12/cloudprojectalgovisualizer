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
    q: 'How many passes does an insertion sort algorithm consist of?',
    options:['N',' N-1','N+1','N2'],
    answer: 1
  },
  { 
    q: 'Which of the following algorithm implementations is similar to that of an insertion sort?',
    options:['Binary heap','Quick sort','Merge sort','Radix sort'],
    answer: 0
  },
  {
    q: ' What is the average case running time of an insertion sort algorithm?',
    options:['O(N)','O(N log N)','O(log N)','O(N2)'],
    answer: 3
},
{
    q: 'What will be the number of passes to sort the elements using insertion sort 14, 12,16, 6, 3, 10 ',
    options: ['6','5','7','1'],
    answer: 1
},
{
    q: 'Which of the following sorting algorithms is the fastest for sorting small arrays?',
    options: ['Quick sort','Insertion sort','Shell sort','Heap sort' ],
    answer: 1
},
{
    q: 'For the best case input, the running time of an insertion sort algorithm is?',
    options: ['Linear','Binary','Quadratic','Depends on the input'],
    answer: 0
},
{
    q: 'Which of the following examples represent the worst case input for an insertion sort?',
    options: ['array in sorted order',' array sorted in reverse order','normal unsorted array','large array'],
    answer: 1
},
{
  q: 'Which of the following sorting algorithm is best suited if the elements are already sorted?',
  options: ['Heap Sort','Quick Sort','Insertion Sort',' Merge Sort'],
  answer: 2
},
{
  q: ' Which of the following real time examples is based on insertion sort?',
  options: ['arranging a pack of playing cards','database scenarios and distributes scenarios','arranging books on a library','real-time systems'],
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