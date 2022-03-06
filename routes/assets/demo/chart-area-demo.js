// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// Area Chart Example
$(document).ready(function () {
  let fecha = new Date();
  let today = new Date(fecha.setDate(fecha.getDate() - 7));
  let mes = today.getMonth() + 1;
  mes = mes.toString()
  let dia = today.getDate().toString();
  if (dia.length === 1) {dia = "0" + dia}
  if (mes.length === 1) {
    mes = "0" + mes;
  } else {mes = mes.toString()}
  var date = today.getFullYear().toString() + mes + dia;
  console.log(date);
  $.ajax({

    method: "GET",
    url: `/database/todos.php?fecha=${date}`
  }).done(dato => {
    console.log(dato);
    let datos = $.parseJSON(dato);
    let datos_grafico = [];
    let label_grafico = [];
    for (let i = 0; i < datos.length; i++) {
      datos_grafico.push(datos[i]['log_origen']);
      label_grafico.push(datos[i]['suma']);
    }
    console.log(datos_grafico);
    console.log(label_grafico);

    var ctx = document.getElementById("myAreaChart");
    var myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: datos_grafico,
        datasets: [{
          label: "Sessions",
          lineTension: 0.3,
          backgroundColor: "rgba(2,117,216,0.2)",
          borderColor: "rgba(2,117,216,1)",
          pointRadius: 5,
          pointBackgroundColor: "rgba(2,117,216,1)",
          pointBorderColor: "rgba(255,255,255,0.8)",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(2,117,216,1)",
          pointHitRadius: 50,
          pointBorderWidth: 2,
          data: label_grafico,
        }],
      },
      options: {
        scales: {
          xAxes: [{
            time: {
              unit: 'date'
            },
            gridLines: {
              display: false
            },
            ticks: {
              maxTicksLimit: 7
            }
          }],
          yAxes: [{
            ticks: {
              min: 0,
              max: 1500,
              maxTicksLimit: 5
            },
            gridLines: {
              color: "rgba(0, 0, 0, .125)",
            }
          }],
        },
        legend: {
          display: false
        }
      }
    });

  });
});
