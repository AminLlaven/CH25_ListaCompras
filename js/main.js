let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");

let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");

//Limpiar campos
btnClear.addEventListener("click", function (event) {
    event.preventDefault();
    txtNombre.value = "";
    txtNumber.value = "";
});

btnAgregar.addEventListener("click", function (event) {
    event.preventDefault();

    alertValidacionesTexto.innerHTML = "";//con cada click limpia
    alertValidaciones.style.display="none";//con cada click esconde

    let lista = "Los siguientes campos deben ser llenados correctamente:<ul>";

    //txtNombre.value = txtNombre.value.trim(); 
    //trim quita espacios al priincipio y al final pero aqui adentro solo hasta el click
    //console.log("borde: " + txtNombre.style.border); //comprobar qué borde tenia

    if (txtNombre.value.length == 0) {
        txtNombre.style.border = "solid thin red";//se pueden usar px en vez de thin
        // alertValidacionesTexto.innerHTML= "Se debe escribir un nombre válido";
        lista += "<li>Se debe escribir un nombre válido</li>";
        alertValidaciones.style.display = "block";

    } else {
        txtNombre.style.border = "";
    }//if txtNombre

    if (txtNumber.value.length == 0) {
        txtNumber.style.border = "solid thin red";//se pueden usar px en vez de thin
        //alertValidacionesTexto.innerHTML+= "Se debe escribir una cantidad válida";
        lista += "<li>Se debe escribir una cantidad válida</li>";
        alertValidaciones.style.display = "block";
    } else {
        txtNumber.style.border = "";
    }//if txtNumber
    lista += "</ul>";
    alertValidaciones.insertAdjacentHTML("beforeend", lista);
});//btnAgregar click

//blur: cuando me salgo del campo hace una función
txtNumber.addEventListener("blur", function (event) {
    event.preventDefault();
    txtNumber.value = txtNumber.value.trim();
});//txtNumber.blur

txtNombre.addEventListener("blur", function (event) {
    event.preventDefault();
    txtNombre.value = txtNombre.value.trim();
});//txtNombre.blur

