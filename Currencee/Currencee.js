let currency1 = document.querySelector("#currency1");
let currency2 = document.querySelector("#currency2");
let first_curr = document.querySelector("#first-curr");
let second_curr = document.querySelector("#second-curr");
let conver_btn = document.querySelector(".convert-btn");
let mainResult_little = document.querySelector("#mainResultlittle");
let mainResult = document.querySelector("#mainResult");
let amount = document.querySelector("#amount");
let apiStatus = document.querySelector(".dot");
let result_box = document.querySelector(".result-box");
let aside = document.querySelector(".converter-right");
let swap = document.querySelector(".swap-btn");

conver_btn.addEventListener("click",function(){
    calculate();
})
swap.addEventListener("click",function(){
    swapfunc();
})
fetch("https://openexchangerates.org/api/currencies.json").then(
    async (resolved) =>{
        let body = await resolved.json();
        Object.keys(body).forEach(element => {
            let option = document.createElement("option");
            option.value = element;
            option.textContent = `${element} - ${body[element]}`;
            let same = option.cloneNode(true);
            currency1.appendChild(option);
            currency2.appendChild(same);
            
        });
        apiStatus.classList = "dot green"
    },
    (rejected) =>{
        apiStatus.classList = "dot red";
    }

)

function calculate(){
    if(amount.value <= 0)
        return;
    let valueOfselect1 = currency1.value.toLowerCase();
    let valueOfselect2 = currency2.value.toLowerCase();
    fetch("https://www.floatrates.com/daily/usd.json").then(
        async (resolved) =>{
            let body = await resolved.json();
            let first_curr_value_usd = body[valueOfselect1]["rate"];
            let second_curr_value_usd = body[valueOfselect2]["rate"];
            let first_curr_value_usd_result = first_curr_value_usd / second_curr_value_usd;
            let second_curr_value_usd_result = second_curr_value_usd / first_curr_value_usd;
            first_curr.innerHTML = `1 ${valueOfselect1} = ${first_curr_value_usd_result.toFixed(6)} ${valueOfselect2}`;
            second_curr.innerHTML = `1 ${valueOfselect2} = ${second_curr_value_usd_result.toFixed(6)} ${valueOfselect1}`;
            mainResult_little.innerHTML = `${amount.value} ${valueOfselect1} =`;
            mainResult.innerHTML = (amount.value * second_curr_value_usd_result).toFixed(6);
            result_box.style.backgroundColor = "#593AF3";

        },
        (rejected) =>{
            apiStatus.classList = "dot red";
        }
    )
    
}
function swapfunc(){
    let temp = currency1.value;
    currency1.value = currency2.value;
    currency2.value = temp;
}