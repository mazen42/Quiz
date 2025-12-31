import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/+esm';

let Questions = [];
let questionNumber = 1;
let addQuestionbtn = document.getElementById("add-Question");
let builderShell = document.querySelector(".builder-shell");
let savebtn = document.querySelector("#saveId");
savebtn.addEventListener("click",function(){
  Submit();
})
window.onload = addQuestionFunction;
addQuestionbtn.addEventListener("click",function(el){
    el.preventDefault();
    addQuestionFunction();
});
function Submit(){
  let allQuestions = document.querySelectorAll(".builder-main");
  allQuestions.forEach(element => {
      if(element.querySelector("#textareaId").value == "")
        fire(`the question title is empty at question ${element.id}`);
      if(element.querySelector("#categoryId").value == "")
        fire(`the category is empty at question ${element.id}`);
      if(element.querySelector("input[type='radio']:checked") == null)
        fire(`the is no correct answer at question ${element.id}`);
      let textoptionCheck = [...element.querySelectorAll("#radioTextId")].some(element => element.value == "");
      if(textoptionCheck)
       fire(`there is some empty option at question ${element.id}`);

  });

}
function addQuestionFunction(){
    const main = document.createElement("main");
    main.className = "builder-main";
    main.id = questionNumber;
    const section = document.createElement("section");
    section.className = "builder-form-panel";
    let deleteQuestionbtn = document.createElement("button");
    deleteQuestionbtn.type = "button";
    deleteQuestionbtn.textContent = "Remove";
    deleteQuestionbtn.className = "btn small danger";
    const form = document.createElement("form");
    form.autocomplete = "off";
    const field = document.createElement("div");
    field.className = "field";

    const label = document.createElement("label");
    label.className = "field-label";
    label.textContent = "Question Text";

    const textarea = document.createElement("textarea");
    textarea.rows = 4;
    textarea.id = "textareaId";
    textarea.placeholder = "Type your question here...";

    field.append(label, textarea);
    const optionsHeader = document.createElement("div");
    optionsHeader.className = "options-header";

    const h3 = document.createElement("h3");
    h3.textContent = "Options";

    const addOptionBtn = document.createElement("button");
    addOptionBtn.id = "addOptionbtn";
    addOptionBtn.type = "button";
    addOptionBtn.className = "btn small";
    addOptionBtn.textContent = "+ Add Option";
    addOptionBtn.addEventListener("click",function(){
        createOption(this);
        livePerview(main);
    });
    

    optionsHeader.append(h3, addOptionBtn);
    const ul = document.createElement("ul");
    ul.className = "option-list";
    const metaRow = document.createElement("div");
    metaRow.className = "meta-row";

    const difficulty = document.createElement("select");
    difficulty.id = "difficultyId";
    ["Easy", "Medium", "Hard"].forEach(val => {
        const opt = document.createElement("option");
        opt.value = val.toLowerCase();
        opt.textContent = val;
        if (val === "Medium") opt.selected = true;
        difficulty.appendChild(opt);
    });

    const category = document.createElement("input");
    category.id = "categoryId";
    category.placeholder = "Enter the category";

    metaRow.append(difficulty, category);
    const actions = document.createElement("div");
    actions.className = "form-actions";

    const clearBtn = document.createElement("button");
    clearBtn.type = "button";
    clearBtn.className = "btn ghost";
    clearBtn.textContent = "Clear";
    clearBtn.addEventListener("click",function(){
      clear(main);
    });

    actions.append(clearBtn);
    form.append(field, optionsHeader, ul, metaRow, actions);
    section.append(deleteQuestionbtn,form);
    const aside = document.createElement("aside");
    aside.className = "builder-preview";
    aside.innerHTML = `
        <div class="preview-container">
  <div class="preview-header">
    <h3>Live Preview</h3>
  </div>
  <div class="preview-content">
    <div class="preview-question">
      <div class="preview-meta">
        <span class="preview-category">Category: <strong>--</strong></span>
        <span class="preview-difficulty">Difficulty: <strong>--</strong></span>
      </div>
      <p class="preview-question-text">Question title</p>
      <div class="preview-options">
        
      </div>
    </div>
    <div class="preview-empty-state">
      <p>Create a question to see the preview</p>
    </div>
  </div>
</div>
    `;
    main.append(section, aside);
    builderShell.appendChild(main);
    main.addEventListener("input",function(){
      livePerview(main);
    });
    deleteQuestionbtn.addEventListener("click",function(){
      if(builderShell.querySelectorAll(".builder-main").length === 1)
        return;
      builderShell.removeChild(main);
    });
    resortOptinos(main);
    addOptionBtn.click();
    addOptionBtn.click();
    livePerview(main);

    questionNumber++;
}
function clear(main){
  main.querySelector("#textareaId").value = "";
  main.querySelector("#difficultyId").value = "medium";
  main.querySelector("#categoryId").value = "";
  let radioCheck = main.querySelector("input[type='radio']:checked");
  if(radioCheck != null)
    radioCheck.checked = false;
  main.querySelectorAll("#radioTextId").forEach(element =>{
    element.value = "";
  });
  livePerview(main);
}
function livePerview(main){
    let builderPreview = main.querySelector(".builder-preview");
    let questiontitle = builderPreview.querySelector(".preview-question-text");
    let difficulty = builderPreview.querySelector(".preview-difficulty").getElementsByTagName("strong")[0];
    let category = builderPreview.querySelector(".preview-category").getElementsByTagName("strong")[0];
    let optionList = builderPreview.querySelector(".preview-options");
    let mainOptionListText = main.querySelectorAll("#radioTextId");
    category.innerHTML = main.querySelector("#categoryId").value;
    difficulty.innerHTML = main.querySelector("#difficultyId").value;
    if(optionList.children.length > 0){
      optionList.innerHTML = "";
    }
    mainOptionListText.forEach(element => {
      let option = document.createElement("div");
      option.className = "preview-option";
      option.innerHTML = element.value;
      if(element.closest(".option-item")?.querySelector("#radioId").checked){
        option.classList.add("correct-answer");
      }
      optionList.append(option);
    });
    questiontitle.innerHTML = main.querySelector("#textareaId").value;


}

function deleteQuestion(btn){
    if(builderShell.querySelectorAll(".builder-main").length <= 1 )
        return;
    let builderMain = btn.closest(".builder-main");
    builderShell.removeChild(builderMain);
}

function createOption(btn){
    let id = btn.closest(".builder-main").id;
    let ulofOptions = btn.closest(".builder-main").querySelector(".option-list");
    let builderMain = btn.closest(".builder-main");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "option" + id;
    radio.id = "radioId";
    radio.value = "";
    const radioText = document.createElement("input");
    radioText.id = "radioTextId";
    radioText.type = "text";
    radioText.placeholder =  "Enter the option";
    let li = document.createElement("li");
    li.className = "option-item";
    let label = document.createElement("label");
    let deleteOptionbtn = document.createElement("button");
    deleteOptionbtn.addEventListener("click",function (){
        if(ulofOptions.children.length === 2){
            return;
        }
        ulofOptions.removeChild(li);
        resortOptinos(builderMain);
        livePerview(builderMain);
    })
    deleteOptionbtn.type = "button";
    deleteOptionbtn.className = "btn small danger";
    deleteOptionbtn.innerHTML = `<i class="fa-solid fa-minus"></i>`;
    label.append(radio,radioText);
    li.append(label,deleteOptionbtn);
    ulofOptions.append(li);
    resortOptinos(builderMain);
}
function resortOptinos(main){
    let ascii = 65;
    let allLis = main.querySelectorAll("input[type=radio]");
    allLis.forEach(element => {
        element.value = String.fromCharCode(ascii);
        ascii++;
    });
}

function fire(message,questionId){
Swal.fire({
  icon: "error",
  title: "Oops...",
  text: message,
  footer: '<a href="#">Why do I have this issue?</a>'
});
return;
}

