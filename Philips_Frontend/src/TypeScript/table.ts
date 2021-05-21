let datalabel = (<HTMLInputElement>document.getElementById("Data"));
var _out;
var ctx = document.getElementById('myChart');
// var Chart = require('chart.js');
window.onload = function () {
    var url = "http://localhost:3000/getcalc";

    fetch(url)
    .then(res => res.json())
    .then((out) => {
    _out = out
    console.log(out);
    tableCreate();
})
}

function tableCreate() {
    var table: HTMLTableElement = <HTMLTableElement> document.getElementById("Table");
    _out.forEach(element => {
        var row = table.insertRow();
        var cell1 = row.insertCell(0);
        cell1.innerHTML = (element.InsulineDose);
        var cell2 = row.insertCell(1);
        cell2.innerHTML = (element.CarbsOfMeal);
        var cell3 = row.insertCell(2);
        cell3.innerHTML = (element.Weight);
        var cell4 = row.insertCell(3);
        cell4.innerHTML = (element.date)
    });
  }


// de dagen
// const labels = Utils.months({count: 7});
/*
const data = {
//   labels: labels,
  datasets: [{
    label: 'My First Dataset',
    //insuline dosis
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};

const config = {
    type: 'line',
    data: data,
};

window.onload = function () {
    var url = "http://localhost:3000/getcalc";

    fetch(url)
    .then(res => res.json())
    .then((out) => {
    _out = out
    console.log(out);
    PrintList();
})
}

function PrintList(){
    var str1 = new String("");
    _out.forEach(element => {
        var str2 = new String("InsulineDose = " + element.InsulineDose + "<br/>");
        str1 = str1.concat(str2.toString());
    });
    datalabel.innerHTML = str1.toString();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { Chart, LineController, LineElement, PointElement, LinearScale, Title } from "chart.js";

Chart.register(LineController, LineElement, PointElement, LinearScale, Title);

const chart = new Chart(ctx, {
    type: 'line',
    // data: ...
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Chart Title'
            }
        },
        scales: {
            x: {
                type: 'linear'
            },
            y: {
                type: 'linear'
            }
        }
    }
})
*/
