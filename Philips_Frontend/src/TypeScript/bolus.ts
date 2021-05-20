let weight = (<HTMLInputElement>document.getElementById("weight2"));
let carbs = (<HTMLInputElement>document.getElementById("carbs2"));
let HtmlError = (<HTMLInputElement>document.getElementById("error"));
let Htmlcorrect = (<HTMLInputElement>document.getElementById("correct"));
let outputLabel = (<HTMLInputElement>document.getElementById("bolusOutputLabel"));
const button = document.getElementById("button");

function GetBolusCalculation(weight: number, carbsOfMeal: number) {
    var http = new XMLHttpRequest();
    var params = 'weight=' + weight + "&carbsOfMeal=" + carbsOfMeal;
    var url = 'http://localhost:3000/bolus/?' + params;
    //var url = 'http://localhost:3000/bolus/';
    http.open('GET', url);

    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    //http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    http.onreadystatechange = function () {//Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            if (http.responseText != "error"){
                Htmlcorrect.style.display = "block";
                HtmlError.style.display = "none";
                outputLabel.innerHTML = String(http.responseText);
            }
            else{
                HtmlError.style.display = "block";
                Htmlcorrect.style.display = "none";
            }
        }
    }
    //http.send(JSON.stringify({ "weight": `${weight}`, "carbsOfMeal": `${carbsOfMeal}` }));

    http.send(params);
}

window.onload = function () {
    button.addEventListener("click", function () {

        GetBolusCalculation(parseFloat(weight.value), parseFloat(carbs.value));

    });
}