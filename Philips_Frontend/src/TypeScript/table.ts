
let datalabel = (<HTMLInputElement>document.getElementById("Data"));
var _out;
var ctx = document.getElementById('myChart');

document.addEventListener("DOMContentLoaded", function () {
    var url = "http://localhost:3000/getcalc";

    fetch(url)
    .then(res => res.json())
    .then((out) => {
    _out = out
    console.log(out);
    tableCreate();
    MakeGraph()
})
})

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

    var labels = [];
    var datas = []
    
      var data = {
        labels: labels,
        datasets: [{
          label: 'Insuline Dosis',
          backgroundColor: '#f5f5f5',
          borderColor: 'rgb(255, 99, 132)',
          data: datas,
        }]
      };
      const config = {
        type: 'line',
        data,
        options: {}
      };

      var Chart;
      var myChart = new Chart(
        document.getElementById('myChart'),
        config
      );

function MakeGraph(){
    _out.forEach(element => {
        labels.push(element.date);
        datas.push(element.InsulineDose);
    });
    myChart.update();
  }