let urlFetch = 'https://localhost:7231/api/CuadroTecnicoes'

fetch(urlFetch)

.then(resp=>resp.json())

.then(response => mostrarDatos(response))

.catch(error => console.log(error))

const mostrarDatos = (response) =>{
    console.log(response)
    let body = ''
  

    for(let i = 0; i < response.length; i++){
        body += `<tr><td>${response[i].id}</td><td>${response[i].nombreAsegurado}</td><td>${response[i].nombreAseguradora}</td><td>${response[i].numPoliza}</td><td>${response[i].fechaInicio}</td><td><button class="buttonBasura" onclick="Eliminar(${response[i].id})"> Eliminar</button></td><td><button class="buttonModificar" onclick="Modificar(${response[i].id})"> Modificar</button></td></tr>`
    }

    document.getElementById('dataCuadros').innerHTML = body
}


//Funcion Eliminar Completado
function Eliminar(id){

    let urlDelete = 'https://localhost:7231/api/CuadroTecnicoes/'+id+'';


    fetch(urlDelete, {
        method: 'DELETE',
   

    })

        
    .then(data => {
        console.log('Success:', data);
        alert("Se ha eliminado el item con el id: "+id)
        location.reload()
    })
    .catch((error) => {
        console.error('Error:', error);
    });
};


let botonAgregar = document.getElementById("submitBtn");

//Crear Archivo de sharepoint y envio de correo
function CrearRegistroSharepoint(data,correo){
    let urlApi = "https://prod-27.brazilsouth.logic.azure.com:443/workflows/81e492c3c7014919b508635728180ab3/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=POPjat7lDI_6dHA95gqwB1CZ9IkqPo4aea7ueekM6rs";

    fetch(urlApi, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            
          
            "createdAt": data.createdAt,
            "updatedAt": data.createdAt,
            "createdBy": data.createdBy,
            "asegurado": data.nombreAsegurado,
            "aseguradora": data.nombreAseguradora,
            "numpoliza": data.numPoliza,
            "vigencia": data.createdAt,
            "correo":correo,
            "activo": true,
            "seguro": data.tipoSeguro
        })

    })
    .then(response => response.json())
        
    .then(data => {
        console.log('Success:', data);
        alert("Se ha creado una nueva poliza en sharepoint");
            
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

//Funcion Agregar nuevo registro Completado
function AgregarRegistro(){
    let nombreAsegurado = document.getElementById('inputNombreAsegurado').value;
    let nombreAseguradora = document.getElementById('inputNombreAseguradora').value;
    let numPoliza = document.getElementById('inputNúmerodePoliza').value;
    let correo = document.getElementById('inputCorreo').value;
    let tipoSeguro = document.getElementById('inputTipoSeguro').value;
    let createdat = Date();
    let updatedat = Date();
    let createdBy = "Matias Villalon";
    const fechaHoraActual = new Date();


    

    let urlFetchCrear = 'https://localhost:7231/api/CuadroTecnicoes'
    fetch(urlFetchCrear, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            
          
            "createdAt": fechaHoraActual,
            "updatedAt": fechaHoraActual,
            "createdBy": createdBy,
            "nombreAsegurado": nombreAsegurado,
            "nombreAseguradora": nombreAseguradora,
            "numPoliza": numPoliza,
            "fechaInicio": fechaHoraActual,
   
            "activo": true,
            "tipoSeguro": tipoSeguro
        })

    })
    .then(response => response.json())
        
    .then(data => {
        console.log('Success:', data);
        alert("Se ha creado una nueva poliza para el usuario: "+ data.nombreAsegurado);
        document.getElementById('inputNombreAsegurado').value = "";
        document.getElementById('inputNombreAseguradora').value = "";
        document.getElementById('inputNúmerodePoliza').value = "";
        document.getElementById('inputCorreo').value = "";
        document.getElementById('inputTipoSeguro').value = "";
        CrearRegistroSharepoint(data,correo);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
} 

//Agregar listener para ejecutar AgregarRegistro
botonAgregar.addEventListener('click', AgregarRegistro);


//Funcion Modificar incompleto, futuras mejoras
function Modificar(id){

    let urlDelete = 'https://localhost:7231/api/CuadroTecnicoes/'+id+'';

    alert("Funcionalidad en desarrollo, contactese con Matias Villalon para mas consultas")
    
    /*fetch(urlDelete, {
        method: 'PUT',
   

    })

        
    .then(data => {
        console.log('Success:', data);
        alert("Se ha eliminado el item con el id: "+id)
        location.reload()
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    */
};