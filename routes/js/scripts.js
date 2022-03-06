/*!
    * Start Bootstrap - SB Admin v7.0.4 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2021 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
// 
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

  // Toggle the side navigation
  const sidebarToggle = document.body.querySelector('#sidebarToggle');
  if (sidebarToggle) {
    // Uncomment Below to persist sidebar toggle between refreshes
    // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
    //     document.body.classList.toggle('sb-sidenav-toggled');
    // }
    sidebarToggle.addEventListener('click', event => {
      event.preventDefault();
      document.body.classList.toggle('sb-sidenav-toggled');
      localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
    });
  }

});
$(document).ready(function () {
  $.ajax({
    method: "GET",
    url: "/database/api.php"
  }).done(data => {
    let puerto = $.parseJSON(data);
    let i = 0;
    puerto.map(data => {
      $("#puertos").append(`<option value="${data['puertos']}">${data['puertos']} </option>`)
    })
  });
});
$(document).ready(function () {
  // $.ajax({
  //   method: "GET",
  //   url: `/database/data.php?num=${tipo}&fecha1=${fecha1}&hora1=${hora1}&fecha2=${fecha2}&hora2=${hora2}`,
  // }).done(data => {console.log(data); crearTabla(data)});
  var today = new Date();
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
    url: `/database/data.php?fecha1=${mes}&fecha2=${mes}`
  }).done(data => {
    let result = $.parseJSON(data);
    console.log(result.length);
    if (result.length > 0) {
      let table = new simpleDatatables.DataTable(".table", {
        data: {
          headings: Object.keys(result[0]),
          data: result.map(item => Object.values(item))
        },
      })

      //CHART



    }
  })
});

function crearTabla(data) {
  var result = $.parseJSON(data);
  let tabla = $("#datatableSimple").DataTable({
    scrollCollapse: true,
    searching: false,
    destroy: true,
    retrieve: true,
    searchPanes: {
      viewTotal: true
    },
    dom: 'Plfrtip',
  });
  let metodos = [];
  tabla.clear();
  $.each(result, function (key, value) {

    tabla.row
      .add([
        value["log_origen"],
        value["fecha"],
        value["metodo"],
        value["enlace"],
        value["estado"],
        value["tiempo_respuesta"],
        value["IP_cliente"],
        value["largo_peticion"],
      ])
      .draw();
  });
}
