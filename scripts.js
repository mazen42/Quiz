import questions from './Questions.js';
const order = Array.from({ length: questions.length }, (_, i) => i + 1);
order.sort(() => Math.random() - 0.5);
let allQuestions = questions;
let currentQuestionIndex = 0;
let Nextbtn = document.querySelector("#bottom-next");
let prevBtn = document.querySelector("#bottom-prev");
let QuestionBlock = document.querySelector(".question-block");
let questionTitle = document.querySelector(".question-title");
let qustiondescription = document.querySelector(".question-description");
let optionsList = document.querySelector(".options-list");
let totalcount = document.querySelector("#total-count");
let current_index = document.querySelector("#current-index");
let option_item = document.querySelector(".option-item");
let question_palette = document.querySelector("#question-palette");
let AllQuestionsInHtml = document.getElementsByClassName("question-body");
totalcount.innerHTML = allQuestions.length;
LoadAllQuestions();
function ShowNextQuestion() {
    if(currentQuestionIndex >= allQuestions.length){
        Nextbtn.innerHTML = "Submit";

    }
    AllQuestionsInHtml[currentQuestionIndex].classList.add("hidden");
    currentQuestionIndex++;
    AllQuestionsInHtml[currentQuestionIndex].classList.remove("hidden");
}
function ShowPrevQuestion(){
    AllQuestionsInHtml[currentQuestionIndex].classList.add("hidden");
    currentQuestionIndex--;
    AllQuestionsInHtml[currentQuestionIndex].classList.remove("hidden");
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
                    <input type="radio" name="q2" value="A" data-choice="A" />
                    <span class="option-text">A.${currentQuestion.options.A}</span>
                  </label>
                </li>
                <li class="option-item">
                  <label class="option-label">
                    <input type="radio" name="q2" value="B" data-choice="B" />
                    <span class="option-text">B.${currentQuestion.options.B}</span>
                  </label>
                </li>
                <li class="option-item">
                  <label class="option-label">
                    <input type="radio" name="q2" value="C" data-choice="C" />
                    <span class="option-text">C.${currentQuestion.options.C}</span>
                  </label>
                </li>
                <li class="option-item">
                  <label class="option-label">
                    <input type="radio" name="q2" value="D" data-choice="D" />
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