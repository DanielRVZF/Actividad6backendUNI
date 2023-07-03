const formularioEquipo = document.getElementById('formularioEquipo');
const tablaEquipos = document.getElementById('tablaEquipos');
const busquedaInput = document.getElementById('busqueda');
const paginacionDiv = document.getElementById('paginacion');


function mostrarFormulario() {
  document.getElementById('formulario').style.display = 'block';
  document.getElementById('equipos').style.display = 'none';
}


function mostrarEquipos() {
  document.getElementById('formulario').style.display = 'none';
  document.getElementById('equipos').style.display = 'block';
  cargarEquipos();
}


function cargarEquipos() {
  fetch('/equipos')
    .then(response => response.json())
    .then(data => {
      tablaEquipos.innerHTML = '';
      data.forEach(equipo => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${equipo.nombreCliente}</td>
          <td>${equipo.serial}</td>
          <td>${equipo.telefono}</td>
          <td>${equipo.servicio}</td>
          <td>${equipo.observaciones}</td>
          <td>
            <button class="btn btn-sm btn-primary" onclick="editarEquipo(${equipo._id})">Editar</button>
            <button class="btn btn-sm btn-danger" onclick="eliminarEquipo(${equipo._id})">Eliminar</button>
          </td>
        `;
        tablaEquipos.appendChild(row);
      });
    })
    .catch(error => console.error(error));
}


formularioEquipo.addEventListener('submit', event => {
  event.preventDefault();
  const nombreCliente = document.getElementById('nombreCliente').value;
  const serial = document.getElementById('serial').value;
  const telefono = document.getElementById('telefono').value;
  const servicio = document.getElementById('servicio').value;
  const observaciones = document.getElementById('observaciones').value;

  fetch('/equipos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nombreCliente,
      serial,
      telefono,
      servicio,
      observaciones
    })
  })
    .then(response => response.json())
    .then(data => {
      alert('Equipo registrado exitosamente');
      formularioEquipo.reset();
      mostrarEquipos();
    })
    .catch(error => console.error(error));
});


busquedaInput.addEventListener('input', () => {
  const busqueda = busquedaInput.value.toLowerCase();
  const equipos = Array.from(tablaEquipos.getElementsByTagName('tr'));
  equipos.forEach(equipo => {
    const nombreCliente = equipo.getElementsByTagName('td')[0].innerText.toLowerCase();
    equipo.style.display = nombreCliente.includes(busqueda) ? '' : 'none';
  });
});


function editarEquipo(id) {

  console.log('Editar equipo con ID:', id);
}


function eliminarEquipo(id) {

  console.log('Eliminar equipo con ID:', id);
}
