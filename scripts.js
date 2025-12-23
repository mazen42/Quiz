import questions from './Questions.js';
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/+esm';
const order = Array.from({ length: questions.length }, (_, i) => i + 1);
order.sort(() => Math.random() - 0.5);
let allQuestions = questions;
let currentQuestionIndex = 0;
let Nextbtn = document.querySelector("#bottom-next");
let prevBtn = document.querySelector("#bottom-prev");
let QuestionBlock = document.querySelector(".question-block");
let totalcount = document.querySelector("#total-count");
let current_index = document.querySelector("#current-index");
let question_palette = document.querySelector("#question-palette");
let AllQuestionsInHtml = document.getElementsByClassName("question-body");
let total_index = document.getElementById("total-index");
let answered_count = document.getElementById("answered-count");
let timerElement = document.getElementById("timer");
let Results = document.getElementById("quiz-results");
let ResultsList = document.querySelector(".results-list");
let FinishExam = document.querySelector("#finish-exam");
let ScoreResult = document.querySelector("#results-score");
let sideBar = document.querySelector(".quiz-sidebar");
let questionmeta = document.querySelector(".question-meta");
let questionControls = document.querySelector(".question-controls");
let markForReviewbtn = document.querySelector("#mark-review");
let ClearAnswerbtn = document.querySelector("#clear-answer");
let Answers = [];
totalcount.innerHTML = allQuestions.length;
total_index.innerHTML = allQuestions.length;
window.onload = function(){
  LoadAllQuestions();
  LoadQuestionPalette();
  ShowNextQuestion(0);
  Timer();
}
function UpdatecurrentQuestionNumber(){
  current_index.innerHTML = currentQuestionIndex + 1;
  answered_count.innerHTML = currentQuestionIndex + 1;
}
UpdatecurrentQuestionNumber();
function ChangeQuestionStatus(){
  let radios = AllQuestionsInHtml[currentQuestionIndex].querySelector("input[type='radio']:checked");
  let elementId = AllQuestionsInHtml[currentQuestionIndex].id;
  let element = allQuestions.filter(element =>{
    return element.id == elementId;
  })[0];
  if(element.status == "marked")
    return false;

if(radios != null){
  allQuestions.forEach(element =>{
      if(element.id == AllQuestionsInHtml[currentQuestionIndex].id){
          element.status = "answered";
      }
    });
}else{
allQuestions.forEach(element =>{
      if(element.id == AllQuestionsInHtml[currentQuestionIndex].id){
          element.status = "not-answered";
      }
    });
}
}
function ShowNextQuestion(questionNumberFromPalette = null) {
    if(currentQuestionIndex >= allQuestions.length - 1){
        Nextbtn.innerHTML = "Submit";
        Nextbtn.addEventListener("click",sumbittingWithTrue);
        ChangeQuestionStatus();
        LoadQuestionPalette();
        return false;
    }else{
      Nextbtn.innerHTML = "Next";
    }
ChangeQuestionStatus();
    AllQuestionsInHtml[currentQuestionIndex].classList.add("hidden");
    if (typeof questionNumberFromPalette === "number") {
        currentQuestionIndex = questionNumberFromPalette;
    } else {
        currentQuestionIndex++;
    }
    AllQuestionsInHtml[currentQuestionIndex].classList.remove("hidden");
    MarkForReviewCheck();
    UpdatecurrentQuestionNumber();
    LoadQuestionPalette();
}
function ShowPrevQuestion(){
  if(currentQuestionIndex > allQuestions.length - 1){
        Nextbtn.innerHTML = "Submit";
    }
    else{
      Nextbtn.innerHTML = "Next";
        Nextbtn.removeEventListener("click",sumbittingWithTrue);
    }
  if(currentQuestionIndex <= 0)
    return false;
  ChangeQuestionStatus();
  LoadQuestionPalette();
    AllQuestionsInHtml[currentQuestionIndex].classList.add("hidden");
    currentQuestionIndex--;
    AllQuestionsInHtml[currentQuestionIndex].classList.remove("hidden");
    MarkForReviewCheck();
    UpdatecurrentQuestionNumber();
}
Nextbtn.addEventListener("click",ShowNextQuestion);
prevBtn.addEventListener("click",ShowPrevQuestion);
FinishExam.addEventListener("click",sumbittingWithTrue);
markForReviewbtn.addEventListener("click",markForReviewFunction);
ClearAnswerbtn.addEventListener("click",ClearAnswerFunction);
function LoadAllQuestions(){
    let i = 0;
    while(i < 10){
        let currentQuestion = allQuestions[order[i] - 1];
        let QuestionBuilder = `
       <div class="question-body hidden" id="${currentQuestion.id}" data-question-number="${i + 1}">
            <h2 id="q-title-2" class="question-title">${currentQuestion.title}</h2>
            <p class="question-description">Select the correct answer from the choices below.</p>
            <form class="options-form" id="options-form" onsubmit="return false;">
              <ul class="options-list" role="list">
                <li class="option-item">
                  <label class="option-label">
                    <input type="radio" name="${currentQuestion.id}" value="A" data-choice="A" />
                    <span class="option-text">A.${currentQuestion.options.A}</span>
                  </label>
                </li>
                <li class="option-item">
                  <label class="option-label">
                    <input type="radio" name="${currentQuestion.id}" value="B" data-choice="B" />
                    <span class="option-text">B.${currentQuestion.options.B}</span>
                  </label>
                </li>
                <li class="option-item">
                  <label class="option-label">
                    <input type="radio" name="${currentQuestion.id}" value="C" data-choice="C" />
                    <span class="option-text">C.${currentQuestion.options.C}</span>
                  </label>
                </li>
                <li class="option-item">
                  <label class="option-label">
                    <input type="radio" name="${currentQuestion.id}" value="D" data-choice="D" />
                    <span class="option-text">D.${currentQuestion.options.D}</span>
                  </label>
                </li>
              </ul>
            </form>
          </div>
        `;
        QuestionBlock.innerHTML += QuestionBuilder;
        i++;
        }
    }
    function LoadQuestionPalette(){
      if(question_palette.querySelector("button") != null){
        question_palette.innerHTML = "";
      }
        for(let i = 0; i < allQuestions.length; i++){
      let currQuestion = allQuestions[order[i] - 1]
      let btn = document.createElement("button");
      btn.textContent = `${i + 1}`;
      btn.classList.add("q-btn");
      btn.classList.add(currQuestion.status);
      btn.setAttribute("data-qid","1");
      btn.setAttribute("aria-label","Question");
      question_palette.appendChild(btn);
      btn.addEventListener("click",function(){
        ShowNextQuestion(i);
      });
    }
} 
function Submitting(Forced = false) {
    let AllHtmlQuestions = [...document.getElementsByClassName("question-body")];
    let theunsolvedQuestions = [];
  if (Forced == false) {
  AllHtmlQuestions.forEach(element => {
      if (element.querySelector("input[type='radio']:checked") == null) {
        theunsolvedQuestions.push(element.getAttribute("data-question-number"));
      }
    });
    if (theunsolvedQuestions.length > 0) {
      Swal.fire({
        title: `You haven't answered questions: ${theunsolvedQuestions.join(", ")}. Do you want to submit?`,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Submit",
        denyButtonText: `Don't Submit`
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Submitted", "", "success");
          IsolatedSubmit();
        } else if (result.isDenied) {
          Swal.fire("Go Resolve Them", "", "info");
        }
      });
    }
  } else {
    IsolatedSubmit();
  }
}
function Timer(defaultOne = 30){
  let totalSeconds = defaultOne * 60;
  const timerInterval = setInterval(() => {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    timerElement.textContent =
        `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    if (totalSeconds === 0) {
        clearInterval(timerInterval);
        Submitting(true);
      } else {
        totalSeconds--;
    }
}, 1000);
}
function IsolatedSubmit(){
  let AllHtmlQuestions = [...document.getElementsByClassName("question-body")];
AllHtmlQuestions.forEach(element => {
            allQuestions.forEach(q => {
              let choosedOnekey =
                element.querySelector("input[type='radio']:checked")?.value ?? null;
              let choosedOneText = q.options[choosedOnekey] ?? "";
              if (q.id == element.id) {
                Answers.push({
                  id: q.id,
                  title: q.title,
                  correctAnswer: q.correctAnswer,
                  ChoosedAnswerText: choosedOneText,
                  ChoosedAnswerKey: choosedOnekey ?? "",
                  CorrectanswerText: q.options[q.correctAnswer]
                });
              }

            });
          });

          let score = Answers.filter(e =>
            e.correctAnswer == e.ChoosedAnswerKey
          ).length;
          ScoreResult.innerHTML = `Score: ${score} / ${allQuestions.length}`;
          Answers.forEach(element => {
            let elementCreator = `
              <li class="result-item correct">
                <div class="ri-title">${element.title}</div>
                <div class="ri-answers">
                  <div class="ri-chosen">
                    Your answer: <strong>${element.ChoosedAnswerText}</strong>
                  </div>
                  <div class="ri-correct">
                    Correct: <strong>${element.correctAnswer} ${element.CorrectanswerText}</strong>
                  </div>
                </div>
              </li>`;
            ResultsList.innerHTML += elementCreator;
          });
    QuestionBlock.classList.add("hidden");
    Results.classList.remove("hidden");
    questionControls.style.display = "none";
    sideBar.classList.add("hidden");
    questionmeta.style.display = "none";
  }
function sumbittingWithTrue(){Submitting(false)};
function markForReviewFunction(){
  allQuestions.forEach(element =>{
    if(element.id == AllQuestionsInHtml[currentQuestionIndex].id){
      if(element.status != "marked"){
        element.status = "marked";
        ChangeQuestionStatus();
      }
      else{
        element.status = "";
        ChangeQuestionStatus();
      }
    }
    MarkForReviewCheck();
    LoadQuestionPalette();
  });
}

function MarkForReviewCheck(){
  allQuestions.forEach(element =>{
    if(element.id == AllQuestionsInHtml[currentQuestionIndex].id){
      if(element.status == "marked"){
        markForReviewbtn.classList.add("active");
      }else{
        markForReviewbtn.classList.remove("active");
      }
    }
});
}
function ClearAnswerFunction(){
  let HtmlElement = AllQuestionsInHtml[currentQuestionIndex];
  let RadioCheck = HtmlElement.querySelector("input[type='radio']:checked");
  if(RadioCheck != null){
    RadioCheck.checked = false;
    ChangeQuestionStatus();
    LoadQuestionPalette();
  }

}