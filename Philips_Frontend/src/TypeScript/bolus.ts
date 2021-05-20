let weight = (<HTMLInputElement>document.getElementById("weight2"));
let carbs = (<HTMLInputElement>document.getElementById("carbs2"));
let HtmlError = (<HTMLInputElement>document.getElementById("error"));
let Htmlcorrect = (<HTMLInputElement>document.getElementById("correct"));
let outputLabel = (<HTMLInputElement>document.getElementById("bolusOutputLabel"));
const button = document.getElementById("button");

// sends user input and gets calculated insuline dose with validation
function GetBolusCalculation(weight: number, carbsOfMeal: number) {
    var params = 'weight=' + weight + "&carbsOfMeal=" + carbsOfMeal;
    var url = 'http://localhost:3000/bolus/?' + params;
    
    fetch(url)
    .then(res => res.json())
    .then((out) => {
        if(out.valid == "true"){
            Htmlcorrect.style.display = "block";
            HtmlError.style.display = "none";
            outputLabel.innerHTML = String(out.insulineDose);
        }
        else{
            HtmlError.style.display = "block";
            Htmlcorrect.style.display = "none";
            outputLabel.innerHTML = String("");
        }
    })
}

// button click activation
window.onload = function () {
    button.addEventListener("click", function () {
        GetBolusCalculation(parseFloat(weight.value), parseFloat(carbs.value));
    });
}