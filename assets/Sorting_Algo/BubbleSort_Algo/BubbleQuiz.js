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
    q: ' A binary search is to be performed on the list: 3  5  9  10  23 How many comparisons would it take to find number 9?',
    options:['0-1','2-3','4-5', 'It fails to find the number 9'],
    answer: 0
  },
  { 
    q: 'Which type of lists or data sets are binary searching algorithms used for?',
    options:['Unsorted lists or data sets','Sorted lists or data sets'],
    answer: 1
  },
  {
    q: 'Describe an advantage of a binary search algorithm',
    options:['Performs well with large sized data sets','Can be used on data sets with more than a million elements','Is complicated to code','Is most efficient'],
    answer: 0
},
{
    q: 'How many comparisons would it take to find the value 2 in the following list using a binary search? [1, 2, 4, 5, 7, 8, 9]',
    options: ['1','2','3','4'],
    answer: 1
},
{
    q: '32 teams qualified for the 2014 World Cup. If the names of the teams were arranged in sorted order (an array), how many items in the array would binary search have to examine to find the location of a particular team in the array, in the worst case?',
    options: ['At most 1','At most 16','At most 32','At most 6'],
    answer: 3
},
{
    q: 'The 2014 “Catalogue of Life” contains about 1580000 names of species. If these names were sorted in an array, in the worst case, how long would it take to use binary search to find the name of a particular species in the array?',
    options: ['At most, it would look at 6 names.','At most, it would look at 1580000 names.','At most, it would look at 22 names.','At most, it would look at 790000 names.'],
    answer: 2
},
{
    q: 'In 2013, there were 193 member states in the United Nations. If the names of these states were sorted alphabetically in an array, about how many names would binary search examine to locate a particular name in the array, in the worst case?',
    options: ['No more than 193','No more than 4','No more than 9','No more than 64'],
    answer: 2
},
{
    q: 'Binary Search terminates:',
    options: ['when (starting index < ending index)','when (starting index == ending index)','None of these.','when (starting index > ending index)'],
    answer: 1
},
{
    q: 'Best Case Time Complexity of Binary Search is: ',
    options: ['O(1)','O(n)','O(log n)','O(n log n)'],
    answer: 0
},
{
    q: 'Binary Search can be categorized into which of the following?',
    options: ['Brute Force technique','Greedy algorithm','Dynamic programming','Divide and conquer'],
    answer: 3
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