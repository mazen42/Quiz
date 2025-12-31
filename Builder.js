let Questions = [];
let questionNumber = 1;
let addQuestionbtn = document.getElementById("add-Question");
let builderShell = document.querySelector(".builder-shell");
window.onload = addQuestionFunction;
addQuestionbtn.addEventListener("click",function(el){
    el.preventDefault();
    addQuestionFunction();
});
function addQuestionFunction(){

    // ===== main =====
    const main = document.createElement("main");
    main.className = "builder-main";
    main.id = questionNumber;

    // ===== section =====
    const section = document.createElement("section");
    section.className = "builder-form-panel";

    const form = document.createElement("form");
    form.autocomplete = "off";

    // ===== Question Field =====
    const field = document.createElement("div");
    field.className = "field";

    const label = document.createElement("label");
    label.className = "field-label";
    label.textContent = "Question Text";

    const textarea = document.createElement("textarea");
    textarea.rows = 4;
    textarea.placeholder = "Type your question here...";

    field.append(label, textarea);

    // ===== Options Header =====
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
    });
    

    optionsHeader.append(h3, addOptionBtn);

    // ===== Options List =====
    const ul = document.createElement("ul");
    ul.className = "option-list";

    // ===== Meta Row =====
    const metaRow = document.createElement("div");
    metaRow.className = "meta-row";

    const difficulty = document.createElement("select");
    ["Easy", "Medium", "Hard"].forEach(val => {
        const opt = document.createElement("option");
        opt.value = val.toLowerCase();
        opt.textContent = val;
        if (val === "Medium") opt.selected = true;
        difficulty.appendChild(opt);
    });

    const category = document.createElement("input");
    category.placeholder = "Enter the category";

    metaRow.append(difficulty, category);

    // ===== Actions =====
    const actions = document.createElement("div");
    actions.className = "form-actions";

    const clearBtn = document.createElement("button");
    clearBtn.type = "button";
    clearBtn.className = "btn ghost";
    clearBtn.textContent = "Clear";

    const saveBtn = document.createElement("button");
    saveBtn.type = "submit";
    saveBtn.className = "btn primary";
    saveBtn.textContent = "Save";

    actions.append(clearBtn, saveBtn);

    // ===== Assemble Form =====
    form.append(field, optionsHeader, ul, metaRow, actions);
    section.appendChild(form);

    // ===== Preview =====
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
      <p class="preview-question-text">Question will appear here...</p>
      <div class="preview-options">
        <div class="preview-option"></div>
        <div class="preview-option"></div>
        <div class="preview-option"></div>
        <div class="preview-option"></div>
      </div>
    </div>
    <div class="preview-empty-state">
      <p>Create a question to see the preview</p>
    </div>
  </div>
</div>
    `;

    // ===== Final Append =====
    main.append(section, aside);

    builderShell.appendChild(main);
    resortOptinos(main);
    addOptionBtn.click();
    addOptionBtn.click();

    questionNumber++;
}
window.hello = () =>{
console.log("hello");
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
    radio.value = "";
    const radioText = document.createElement("input");
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

function livePerview(){
    
}