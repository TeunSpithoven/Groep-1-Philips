let weight = (<HTMLInputElement>document.getElementById("weight2"));
let carbs = (<HTMLInputElement>document.getElementById("carbs2"));
let HtmlError = (<HTMLInputElement>document.getElementById("error"));
let Htmlcorrect = (<HTMLInputElement>document.getElementById("correct"));
let outputLabel = (<HTMLInputElement>document.getElementById("bolusOutputLabel"));
const button = document.getElementById("button");

import fetch from "fetch";
import * as cors from "cors";

// for unit testing, uncomment below
//export {InsulineTotalCalculation};
//export {BasalDoseCalculation};
//export {RatioCalculation};
//export {InsulineDoseCalculation};
//export {ValidateInput};

function GetBolusCalculation(weight: number, carbsOfMeal: number) {
    var http = new XMLHttpRequest();
    var params = 'weight=' + weight + "&carbsOfMeal=" + carbsOfMeal;
    var url = 'http://localhost:3000/bolus/?' + params;
    http.open('GET', url);

    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

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
    http.send(params);
}




window.onload = function () {
    button.addEventListener("click", function () {

        console.log(GetBolusCalculation(parseFloat(weight.value), parseFloat(carbs.value)));

        /*
        if (returnRatio == 0 || returnRatio == null) {
            HtmlError.style.display = "block";
            Htmlcorrect.style.display = "none";
            outputLabel.innerHTML = String("-");
        }
        else {
            Htmlcorrect.style.display = "block";
            HtmlError.style.display = "none";
            outputLabel.innerHTML = String(returnUnits);
        }

        console.log("Het aantal units dat u nodig heeft is " + returnUnits);
        console.log("Het totaal insuline aantal wat u nodig heeft is " + returnInsulineTotal);
        console.log("Uw basale dosus is " + returnBasalDose);
        console.log(returnRatio);
        */
    });
}



function InsulineTotalCalculation(weight: number): number {
    //calculate the total daily needed insuline intake base on weight
    let insulineTotal: number = weight * 0.55;
    return insulineTotal;
}

function BasalDoseCalculation(weight: number): number {
    // the basal dose is 50% of the daily intake
    let basalDose: number = InsulineTotalCalculation(weight) / 2;
    return basalDose;
}

function RatioCalculation(weight: number): number {
    // calculates the amount of carbs per insuline unit
    let ratio: number = 500 / InsulineTotalCalculation(weight);
    return ratio;
}

function InsulineDoseCalculation(weight: number, carbsOfMeal: number): number {
    // the insuline needed to be taken after the meal round off to 2 decimals
    let insulineDose: number = carbsOfMeal / RatioCalculation(weight);
    return Math.round(insulineDose);
}

/////////////////////////////////////DEZE SHIT IS VAN GROEP 4 GESTOLEN!!!/////////////////////////////////////////////////////////////////////////

// import { calculation } from "../Models/calculation";
// export class api {
//     static async sendCalculationToAPI(weight: number, carbDose: number): Promise < boolean > {
//         const date = new Date().toLocaleString();
//         const json = JSON.stringify({"weight":weight,"carbDose":carbDose,"calculationDateTime":date});

//         const myHeaders = new Headers();
//         myHeaders.append("Content-Type", "application/json");
//         myHeaders.append("Connection", "keep-alive");
//         myHeaders.append("timeout", "5000");

//         const response = await fetch("http://localhost:3000/", {
//             method: 'POST',
//             headers: myHeaders,
//             body: json,
//         });

//         if (response.ok) {
//             return true;
//         } else {
//             return false;
//         }
//     }

    // static async getCalculationFromApiGroep4(): Promise<string>{
    //     const myHeaders = new Headers();
    //     myHeaders.append("Content-Type", "application/json");
    //     myHeaders.append("Connection", "keep-alive");
    //     myHeaders.append("timeout", "5000");

    //     const response = await fetch("http://localhost:3000/", {
    //        method: 'GET',
    //        headers: myHeaders,
    //     });

    //     const data = await response.json().catch(error => console.log(error));
    //     console.log(data);
    //     return data;
    // }
    // function get(url) {
    //     return new Promise((resolve, reject) => {
    //         const req = new XMLHttpRequest()

    //         req.onreadystatechange = function(){
    //             if (req.readyState === 4 && req.status === 200){
    //                 resolve(req.responseText)
    //             }

    //             req.onerror = function() {
    //                 reject(Error(req.statusText))
    //             }
    //         }
    //         req.open('GET', url)
    //         req.send()
    //     })
    // }
// } 