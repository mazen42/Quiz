import questions from './Questions.js';
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
function ShowNextQuestion(questionNumberFromPalette = null) {
    if(currentQuestionIndex >= allQuestions.length - 1){
        Nextbtn.innerHTML = "Submit";
        return false;
    }else{
      Nextbtn.innerHTML = "Next";
    }
let radios = AllQuestionsInHtml[currentQuestionIndex].querySelector("input[type='radio']:checked");
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
    AllQuestionsInHtml[currentQuestionIndex].classList.add("hidden");
    if (typeof questionNumberFromPalette === "number") {
        currentQuestionIndex = questionNumberFromPalette;
    } else {
        currentQuestionIndex++;
    }
    AllQuestionsInHtml[currentQuestionIndex].classList.remove("hidden");
    UpdatecurrentQuestionNumber();
    LoadQuestionPalette();
}
function ShowPrevQuestion(){
  if(currentQuestionIndex > allQuestions.length - 1){
        Nextbtn.innerHTML = "Submit";
    }
    else{
      Nextbtn.innerHTML = "Next";
    }
  if(currentQuestionIndex <= 0)
    return false;
    AllQuestionsInHtml[currentQuestionIndex].classList.add("hidden");
    currentQuestionIndex--;
    AllQuestionsInHtml[currentQuestionIndex].classList.remove("hidden");
    UpdatecurrentQuestionNumber();
}
Nextbtn.addEventListener("click",ShowNextQuestion);
prevBtn.addEventListener("click",ShowPrevQuestion);
function LoadAllQuestions(){
    let i = 0;
    while(i < 10){
        let currentQuestion = allQuestions[order[i] - 1];
        let QuestionBuilder = `
       <div class="question-body hidden" id="${currentQuestion.id}">
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
    }
    
} 
function Submitting(){}
function Timer(){
  let totalSeconds = 30 * 60;
  const timerInterval = setInterval(() => {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    timerElement.textContent =
        `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    if (totalSeconds === 0) {
        clearInterval(timerInterval);
        Submitting();
      } else {
        totalSeconds--;
    }
}, 1000);
}
