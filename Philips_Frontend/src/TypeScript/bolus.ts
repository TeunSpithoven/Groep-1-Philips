let weight = (<HTMLInputElement>document.getElementById("weight2"));
let carbs = (<HTMLInputElement>document.getElementById("carbs2"));
let HtmlError = (<HTMLInputElement>document.getElementById("error"));
let Name = (<HTMLInputElement>document.getElementById("name"));
let Htmlcorrect = (<HTMLInputElement>document.getElementById("correct"));
let outputLabel = (<HTMLInputElement>document.getElementById("bolusOutputLabel"));
const button = document.getElementById("button");
let _bolusCoockie: Login

// sends user input and gets calculated insuline dose with validation
function GetBolusCalculation(weight: number, carbsOfMeal: number) {
    if (_bolusCoockie != undefined) {
        var params = 'weight=' + weight + "&carbsOfMeal=" + carbsOfMeal + "&userId=" + _bolusCoockie.Id;
        var url = 'http://localhost:3000/bolus/?' + params;

        fetch(url)
            .then(res => res.json())
            .then((out) => {
                if (out.valid == "true") {
                    Htmlcorrect.style.display = "block";
                    HtmlError.style.display = "none";
                    outputLabel.innerHTML = String(out.insulineDose);
                }
                else {
                    HtmlError.style.display = "block";
                    Htmlcorrect.style.display = "none";
                    outputLabel.innerHTML = String("");
                }
            })
    } else {
        HtmlError.style.display = "block";
        Htmlcorrect.style.display = "none";
        outputLabel.innerHTML = String("");
    }

}

function GetCalcHistory() {
    var url = "http://localhost:3000/getcalc";

    fetch(url)
        .then(res => res.json())
        .then((out) => {
            console.log(out);
        })
}

// button click activation
window.onload = function () {
    var temp = GetbolusCookie("Login");
    if (temp != undefined) {
        _bolusCoockie = JSON.parse(temp);
        Name.innerHTML = _bolusCoockie.Username;
    }
    else {
        location.href = "login.html";
    }

    button.addEventListener("click", function () {
        GetBolusCalculation(parseFloat(weight.value), parseFloat(carbs.value));
    });
}

function GetbolusCookie(name: string) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");

    if (parts.length == 2) {
        return parts.pop().split(";").shift();
    }

}

interface Login {
    Valid: string;
    Id: string;
    Username: string;
    Role: string;
}