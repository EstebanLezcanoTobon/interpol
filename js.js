const api = document.querySelector(".api");

async function obtenerDatos() {
  try {
    const respuesta = await fetch("https://ws-public.interpol.int/notices/v1/red?nationality=CO");
    if (!respuesta.ok) {
     
      throw new Error(`Error en la api ${respuesta.status}`);
    }
    const datos = await respuesta.json();
    const personas = datos._embedded.notices;
    console.log(personas)

    crearTabla(personas);

  } catch (error) {
    console.error("error ", error);
    
  }
}

function crearTabla(listaPersonas) {
  const tabla = document.createElement("table");

  tabla.innerHTML = `
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Fecha de Nacimiento</th>
        <th>Nacionalidad</th>
        <th>Foto</th>
      </tr>
    </thead>
  `;

  const tblBody = document.createElement("tbody");
  listaPersonas.forEach(persona => {
    const fila = document.createElement("tr");

    
    const nombre = persona.forename || "N/A";
    const apellido = persona.name || "N/A";
    const fechaNac = persona.date_of_birth || "N/A";
    const nacionalidad = persona.nationalities ? persona.nationalities.join(", ") : "N/A";
    const foto = persona._links?.thumbnail?.href
    // Insertar el contenido en la fila
    fila.innerHTML = `
      <td>${nombre}</td>
      <td>${apellido}</td>
      <td>${fechaNac}</td>
      <td>${nacionalidad}</td>
      <td><img src="${foto}" alt=""></td>
    `;

    tblBody.appendChild(fila);
  });

  // 5. Unir el cuerpo a la tabla e incrustarla en el contenedor (.api)
  tabla.appendChild(tblBody);
  api.appendChild(tabla);
}

// Iniciar la petición
obtenerDatos();