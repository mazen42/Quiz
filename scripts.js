import questions from './Questions.js';
const order = Array.from({ length: questions.length }, (_, i) => i + 1);
order.sort(() => Math.random() - 0.5);
let allQuestions = questions;
window.localStorage.setItem("Result",JSON.stringify(allQuestions));
let Answers = [];
let currentQuestionIndex = 0;
let Nextbtn = document.querySelector("#bottom-next");
let prevBtn = document.querySelector("#bottom-prev");
let QuestionBlock = document.querySelector(".question-block");
let questionTitle = document.querySelector(".question-title");
let qustiondescription = document.querySelector(".question-description");
let optionsList = document.querySelector(".options-list");
let total_index = document.querySelector("#total-index");
let current_index = document.querySelector("#current-index");
let option_item = document.querySelector(".option-item");
let question_palette = document.querySelector("#question-palette");
prevBtn.disabled = currentQuestionIndex === 0;
total_index.innerHTML = allQuestions.length;
window.onload = function(){
    loadQuestionPalette();
    current_index.innerHTML = currentQuestionIndex;
}
prevBtn.addEventListener("click",PreviousQuestion());
Nextbtn.addEventListener("click",function(){
    SubmitOneQuestionFunction();
    loadQuestions();
});
function SubmitFunction(){
    window.localStorage.removeItem("Result");
}

function loadQuestions(QuestionFromPalette = null) {
    if(QuestionFromPalette != null)
        currentQuestionIndex = QuestionFromPalette
    
    if (currentQuestionIndex >= questions.length){
        Nextbtn.innerHTML = "Submit";
        Nextbtn.addEventListener("click",SubmitFunction())
    }
    let currQuestion = allQuestions[order[currentQuestionIndex] - 1];
    
    current_index.innerHTML = currentQuestionIndex;
    questionTitle.innerHTML = `${currQuestion.title}`;
    let OptionsKeys = Object.keys(currQuestion.options);
    optionsList.innerHTML ="";
    for(let i = 0 ; i < 4; i++){
    let li = document.createElement("li");
    li.className = "options-item";
    li.innerHTML = `<label class="option-label" for="#">
        <input type="radio"
                name="radioToSelect"
                value='${OptionsKeys[i]}'
                data-choice="${OptionsKeys[i]}"
        />
        <span class="option-text" >${currQuestion.options[OptionsKeys[i]]}</span>
    </label>`;
    optionsList.appendChild(li);
}

currentQuestionIndex++;}

function loadQuestionPalette(){
    allQuestions.forEach(element => {
        let questionPalettebtn = `<button class="q-btn ${element.status}" data-qid="1" aria-label="${element.id}">${element.id}</button>`
        question_palette.innerHTML += questionPalettebtn;
    });
}
function ChangeStatusInTheLocalStorage(id,status){
    allQuestions.forEach(element=>{
            if(element.id === id){
                element.status = status;
                window.localStorage.setItem("Result",JSON.stringify(allQuestions));
            }
        });
}
function PreviousQuestion(){}
function UpdateAnswer(id,choosedAnswer){
    Answers.forEach(element => {
        if(element.id == id){
            element.choosedAnswer = choosedAnswer;
            window.localStorage.setItem("Answers",JSON.stringify(Answers));
        }
    })
}
function SubmitOneQuestionFunction(){
    let CheckedRadioanswer = document.querySelector("input[name='radioToSelect']:checked")?.value;
    let CurrentQuestion = allQuestions[order[currentQuestionIndex]];
    let AnswersCheckIfAnswerIsExsits = Answers.filter(element => {
        return element.id == CurrentQuestion.id;
    });
    if(CheckedRadioanswer === null){
        ChangeStatusInTheLocalStorage(CurrentQuestion.id,"not-answered");
    }
    if(AnswersCheckIfAnswerIsExsits != null && CheckedRadioanswer != null){
        Answers.forEach(element=>{
            if(element.id == CurrentQuestion.id)
                UpdateAnswer(element.id,CheckedRadioanswer);
        })
    }
    else if(AnswersCheckIfAnswerIsExsits == null && CheckedRadioanswer != null){
        Answers.push({
            id:CurrentQuestion.id,
            title:CurrentQuestion.title,
            ChoosedAnswer:CheckedRadioanswer,
            correctAnswer: CurrentQuestion.correctAnswer,
            IsCorrect: this.correctAnswer === ChoosedAnswer
        });
        ChangeStatusInTheLocalStorage(CurrentQuestion.id,"answered");

        
}
}
