///////////////getting users data///////
// document.addEventListener('contextmenu', event => event.preventDefault());
var usersarr=[];
var Actuser=JSON.parse(localStorage.getItem("activeuser"))
if(localStorage.getItem("users")!=null)
{
    usersarr=JSON.parse(localStorage.getItem("users"))  
} 
////////////////////grabing all important elements////////////////////
const start_btn = document.querySelector(".start_btn button");
const quiz_page = document.querySelector(".quiz_page");
const qNumber = document.querySelector(".qnumber");
const qtotal = document.querySelector(".totalq");
const choices_list = document.querySelector(".choices_list");
const marklist = document.querySelector(".marklist");
const mark_btn = document.querySelector(".markbtn");
const markedquestion = document.querySelector(".markedquestion");
const next_btn = quiz_page.querySelector(".next_btn");
const prev_btn = quiz_page.querySelector(".prev_btn");
const delmark = document.querySelector(".fa-trash-alt");
const submit_btn = quiz_page.querySelector(".submit_btn");
const timerCount = quiz_page.querySelector(".timer .time_sec");
const timeLine = quiz_page.querySelector("header .time_line");
const result_page = document.querySelector(".result_page");
const score = document.querySelector(".score");
const restart_quiz = result_page.querySelector(".buttons .restart");
const logout_quiz = result_page.querySelector(".buttons .quit");

////////////////////////////////////////////////////////////////////
start_btn.onclick = () => {
  quiz_page.classList.add("activeQuiz");
  marklist.classList.add("activelist");
  shuffle(questionsArray);
  showQuestions(currQuestion);
  qNumber.innerText = currQuestion + 1;
  qtotal.innerText = questionsArray.length;
  startTimer(3*60); ///in seconds 
};
var currQuestion = 0;
//////////////showing questions ///////////
function showQuestions(index) {
  const que_text = document.querySelector(".question");
  let questionTag = "<span>" + questionsArray[index].question + "</span>";
  que_text.innerHTML = questionTag;
  const choices = document.querySelector(".choices_list");
  var choicesTitle = "";
  for (let i = 0; i < 4; i++) {
    choicesTitle +=
      '<div class="choice" id=' +
      (index + 1) +
      "." +
      (i + 1) +
      ' onclick="selected(' +
      (index + 1) +
      "." +
      (i + 1) +
      ')"><span>' +
      questionsArray[index].options[i] +
      "</span></div>";
    choices.innerHTML = choicesTitle;
  }
}
//////////////////////next btn/////////////////
next_btn.onclick = () => {
  if (currQuestion != questionsArray.length - 1) {
    currQuestion += 1;
    showQuestions(currQuestion);
    qNumber.innerText = currQuestion + 1; ///so it increases the current question number by one and display it
  }
};
////////////////PREV BTN ////////
prev_btn.onclick = () => {
  if (currQuestion != 0) {
    currQuestion -= 1;
    showQuestions(currQuestion);
    qNumber.innerText = currQuestion + 1; ///so it decreases the current question number by one and display it
  }
};
///////////////////when user hit an answer /////////
function selected(id) {
  var selected = document.getElementById(`${id}`);
  var choices = document.getElementsByClassName("choice");
  for (let i = 0; i < 4; i++) {
    choices[i].classList.remove("correct");
  }
  selected.classList.add("correct");
  if (selected.innerText == questionsArray[Math.floor(id) - 1].answer) {
    questionsArray[Math.floor(id) - 1].status = true;
  } else {
    questionsArray[Math.floor(id) - 1].status = false;
  }
}
////////////////////////conting the total score ///////////
var totalScore = 0;
function ScoreCounter() {
  for (let i = 0; i < questionsArray.length; i++) {
    if (questionsArray[i].status == true) {
      totalScore += 1;
    }
  }
}
/////////////////on submit//////////////////
submit_btn.onclick = () => {
  result_page.classList.add("activeResult");
  quiz_page.classList.remove("activeQuiz");
  marklist.classList.remove("activelist");
  marklist.classList.add("displaynone")
  ScoreCounter();
  score.innerText = `Hi ${usersarr[Actuser.activeuser].firstName} your score is ${totalScore} out of ${questionsArray.length}`;
};
//////////////log out//////////////////////////
function logout() {
  window.open("signin.html", "_self");
}
///////////////////Restart/////////////////////
restart_quiz.onclick = () => {
  window.open("quiz.html", "_self");
};
///////////////////mark list //////////
var markedarr = [];
mark_btn.onclick = () => {
  if (markedarr.includes(currQuestion + 1) === false)
    markedarr.push(currQuestion + 1);
  marktbl();
};

var listmark = document.querySelector(".markedlistque");
function marktbl() {
  let markdata = "";
  for (let i = 0; i < markedarr.length; i++) {
    markdata +=
      '<div class="markedquestion" onclick="gotoquestion(' +
      (markedarr[i] - 1) +
      ')"><p>Question ' +
      markedarr[i] +
      ' </p><i class="fas fa-trash-alt" onclick=" deletemarked(' +
      (markedarr[i] - 1) +
      ')"></i></div>';
  }
  listmark.innerHTML = markdata;
}
///////////////////show marked///////////
function gotoquestion(index) {
  showQuestions(index);
  currQuestion = index + 1;
  qNumber.innerText = currQuestion;
}
///////////////delete marked //////////
function deletemarked(id) {
  for (let i = 0; i < markedarr.length; i++) {
    if (id + 1 == markedarr[i]) {
      markedarr.splice(i, 1);
    }
  }
  marktbl();
}
///////////////////////////////////
function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    if (time >= 0) {
      if (time <= 60) {
        timerCount.textContent = time;
        time--;
       

      } else if (time > 60) {
        let seconds = time;
        let mins = Math.floor(time / 60);
        let showSec = seconds - mins * 60;
        if (showSec < 10) {
          timerCount.textContent = `${mins}:${showSec}0`;
          time--;
        } else {
          timerCount.textContent = `${mins}:${showSec}`;
          time--;
        }
      }
    } else {
      clearInterval(counter);
      result_page.classList.add("activeResult");
  quiz_page.classList.remove("activeQuiz");
  marklist.classList.remove("activelist");
  ScoreCounter();
  score.innerText = `Sorry ${usersarr[Actuser.activeuser].firstName} Time out 😞 , your score is ${totalScore} out of ${questionsArray.length}`;
      return false;
    }
  }
}


////////////////////////