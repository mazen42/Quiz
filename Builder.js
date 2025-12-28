let Questions = [];
let questionNumber = 0;
let addQuestionbtn = document.getElementById("add-Question");
let builderShell = document.querySelector(".builder-shell");
window.onload = addQuestionFunction;
addQuestionbtn.addEventListener("click",function(el){
    el.preventDefault();
    addQuestionFunction();
});
function addQuestionFunction(){
    let questionCreator = `
    
                  <main class="builder-main">
                    <section class="builder-form-panel">
                      <form id="question-form" autocomplete="off">
                        <div class="field">
                          <label class="field-label" for="question-text">Question Text</label>
                          <textarea id="question-text" name="question" rows="4" placeholder="Type your question here..."></textarea>
                        </div>

                        <div class="options-header">
                          <h3>Options</h3>
                          <button type="button" onclick="hello()" class="btn small" id="add-option">+ Add Option</button>
                        </div>

                        <ul class="option-list" id="option-list">
                          <li class="option-item">
                            <label>
                              <input type="radio" name="correct" class="option-radio" value="0">
                              <input type="text" class="option-input" name="option-0" placeholder="First option">
                            </label>
                            <button type="button" class="btn small danger remove-option-btn"><i class="fa-solid fa-minus"></i></button>
                          </li>
                        </ul>

                        <div class="meta-row">
                          <label class="field small">
                            <span class="field-label">Difficulty</span>
                            <select id="difficulty" name="difficulty">
                              <option value="easy">Easy</option>
                              <option value="medium" selected>Medium</option>
                              <option value="hard">Hard</option>
                            </select>
                          </label>

                          <label class="field small">
                            <span class="field-label">Category</span>
                            <input id="category" name="category" placeholder="e.g., JavaScript">
                          </label>
                        </div>

                        <div class="form-actions">
                          <button type="button" class="btn ghost" id="clear-btn">Clear</button>
                          <button type="submit" class="btn primary" id="save-btn">Save</button>
                        </div>
                      </form>
                    </section>

                    <aside class="builder-preview" aria-live="polite">
                      <div class="preview-card">
                        <h2 class="preview-title">Live Preview title</h2>
                        <div id="preview" class="preview-content">
                          <h3 id="preview-question">Your question will appear here</h3>
                          <ul id="preview-options" class="preview-options">
                            <li class="preview-option muted">Option A</li>
                            <li class="preview-option muted">Option B</li>
                          </ul>
                          <div class="preview-meta">
                            <small id="preview-difficulty" class="muted">Medium</small>
                            <small id="preview-category" class="muted" style="margin-left:10px">General</small>
                          </div>
                        </div>
                      </div>
                    </aside>
                  </main>
    `
    builderShell.insertAdjacentHTML("beforeend",questionCreator);
    let trashbtn = document.createElement("button");
    trashbtn.type = "button";
    trashbtn.className = "btn small danger delete-question-btn";
    trashbtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    trashbtn.addEventListener("click",function(){
        deleteQuestion(this);
    })
    let builderMain = builderShell.lastElementChild.querySelector(".builder-form-panel");
    builderMain.insertAdjacentElement("afterbegin",trashbtn);

    
//                     <button type="button" onclick="deleteQuestion(this)" class="btn small danger delete-question-btn" title="Delete this question">
//   <i class="fa-solid fa-trash"></i> Delete
// </button>
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

function createOption(){
}