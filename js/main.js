let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");

let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");

let tabla = document.getElementById("tablaListaCompras");
let cuerpoTabla = tabla.getElementsByTagName("tbody");

let contadorProductos = document.getElementById("contadorProductos");
let productosTotal = document.getElementById("productosTotal");
let precioTotal = document.getElementById("precioTotal");

let isValid = true;

let idTimeout; //referencia de la tarea
let precio = 0;
let contador = 0;

let totalEnProductos = 0; //se asignó la variable al valor numérico de txtNumber
let costoTotal = 0;//

//Limpiar campos
btnClear.addEventListener("click", function (event) {
    event.preventDefault();
    txtNombre.value = "";
    txtNumber.value = "";

    cuerpoTabla[0].innerHTML = "";
    contador = 0;
    totalEnProductos = 0;
    costoTotal = 0;
    contadorProductos.innerText = "0";
    productosTotal.innerText = "0";
    precioTotal.innerText = "$ O";

    localStorage.setItem("contadorProductos", contador);
    localStorage.setItem("totalEnProductos", totalEnProductos);
    localStorage.setItem("costoTotal", costoTotal.toFixed(2));
});//btnClear

function validarCantidad() {
    if (txtNumber.value.length == 0) {
        return false;
    }//if longitud
    if (isNaN(txtNumber.value)) {
        return false;
    }//if isNaN
    if (parseFloat(txtNumber.value) <= 0) {
        return false;
    }//if parseFloat
    return true; //cuidar orden de los if si se escriben de esta manera
}//validarCantidad

function getPrecio() {
    return Math.floor(Math.random() * 50 * 100) / 100; //floor redondea para que sea entero
}//getPrecio

btnAgregar.addEventListener("click", function (event) {
    event.preventDefault();
    isValid = true;
    //console.log(getPrecio()); //prueba f getPrecio

    clearTimeout(idTimeout);

    alertValidacionesTexto.innerHTML = "";//con cada click limpia
    alertValidaciones.style.display = "none";//con cada click esconde

    let lista = "Los siguientes campos deben ser llenados correctamente:<ul>";

    //txtNombre.value = txtNombre.value.trim(); 
    //trim quita espacios al priincipio y al final pero aqui adentro solo hasta el click
    //console.log("borde: " + txtNombre.style.border); //comprobar qué borde tenia

    if (txtNombre.value.length < 2) {
        txtNombre.style.border = "solid thin red";//se pueden usar px en vez de thin
        // alertValidacionesTexto.innerHTML= "Se debe escribir un nombre válido";
        lista += "<li>Se debe escribir un nombre válido</li>";
        alertValidaciones.style.display = "block";
        isValid = false;

    } else {
        txtNombre.style.border = "";
    }//if txtNombre

    if (!validarCantidad()) { // anterior (txtNumber.value.length == 0)
        txtNumber.style.border = "solid thin red";//se pueden usar px en vez de thin
        //alertValidacionesTexto.innerHTML+= "Se debe escribir una cantidad válida";
        lista += "<li>Se debe escribir una cantidad válida</li>";
        alertValidaciones.style.display = "block";
        isValid = false;
    } else {
        txtNumber.style.border = "";
    }//if txtNumber

    lista += "</ul>";
    alertValidaciones.insertAdjacentHTML("beforeend", lista);

    idTimeout = setTimeout(function () {
        alertValidaciones.style.display = "none";
    }, 10000);//tarea timeout

    if (isValid) {

        precio = getPrecio();

        contador++;

        let row = `<tr>
         <th>${contador}</th>
         <td>${txtNombre.value}</td>
         <td>${txtNumber.value}</td>
         <td>${precio}</td>
         </tr>`;
        //th en contador -> negrita
        cuerpoTabla[0].insertAdjacentHTML("beforeend", row);

        contadorProductos.innerText = contador;

        totalEnProductos += parseFloat(txtNumber.value);
        productosTotal.innerText = totalEnProductos;

        costoTotal += precio * parseFloat(txtNumber.value);
        precioTotal.innerText = `$ ${costoTotal.toFixed(2)}`;

        localStorage.setItem("contadorProductos", contador);
        localStorage.setItem("totalEnProductos", totalEnProductos);
        localStorage.setItem("costoTotal", costoTotal.toFixed(2));

        txtNombre.value = "";//limpia los campos
        txtNumber.value = "";

        txtNombre.focus();//foco en el campo
    }//isValid para que no agregue a tabla hasta que todo sea válido

});//btnAgregar click

//blur: cuando me salgo del campo ejecuta una función
txtNumber.addEventListener("blur", function (event) {
    event.preventDefault();
    txtNumber.value = txtNumber.value.trim();
});//txtNumber.blur

txtNombre.addEventListener("blur", function (event) {
    event.preventDefault();
    txtNombre.value = txtNombre.value.trim();
});//txtNombre.blur

window.addEventListener("load", function (event) {
    //console.log("load...");

    //los if se agregaron para que el evento no regrese null
    if (localStorage.getItem("contadorProductos") == null) {
        localStorage.setItem("contadorProductos", "0");
    }//if contadorProductos

    if (localStorage.getItem("totalEnProductos") == null) {
        localStorage.setItem("totalEnProductos", "0");
    }//if totalEnProductos

    if (localStorage.getItem("costoTotal") == null) {
        localStorage.setItem("costoTotal", "0.0");
    }//if costoTotal

    contador = parseInt(localStorage.getItem("contadorProductos"));
    totalEnProductos = parseInt(localStorage.getItem("totalEnProductos"));
    costoTotal = parseFloat(localStorage.getItem("costoTotal"));
    //parseIn y parseFloat para evitar error y concatenación

    contadorProductos.innerText = contador;
    productosTotal.innerText = totalEnProductos;
    precioTotal.innerText = `$ ${costoTotal}`;
});

