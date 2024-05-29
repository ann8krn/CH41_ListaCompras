// El código va aquí -> 
let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");

let txtNombre = document.getElementById("Name");
let txtNumber =document.getElementById("Number");

let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");

let contadorProductos =document.getElementById("contadorProductos");
let productosTotal = document.getElementById("productosTotal");
let precioTotal = document.getElementById("precioTotal");


let tablaListaCompras = document.getElementById("tablaListaCompras");
let cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);


let isValid=true;
let precio;
let contador=0;
let costoTotal = 0;
let totalEnProductos = 0;

//aquí se almacena la información de la tabla
let datos = new Array ();



function validarCantidad(){
    if(txtNombre.value.length===0){
        return false;
    } //if length
    if (isNaN(txtNumber.value)) {
        return false;
    } //is Nan
    if(Number(txtNumber.value)<=0) {
        return false;
    } // <=0
    return true;
} //validarCantidad

function getPrecio(){
    return Math.floor((Math.random()*10000))/100;
} //getPrecio
btnAgregar.addEventListener("click", function(event){
    event.preventDefault()
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";
    txtNombre.style.border="";
    txtNumber.style.border="";
    isValid=true;
    if (txtNombre.value.length<3){
        alertValidacionesTexto.innerHTML="El <strong>Nombre</strong>no es correcto";
        alertValidaciones.style.display="block";
        txtNombre.style.border="solid red medium";
        isValid=false;
    }//length
if (! validarCantidad()){
    alertValidacionesTexto.innerHTML+="El <strong> Número </strong> no es correcto";
    alertValidaciones.style.display="block";
    txtNumber.style.border="solid red mediium";
    isValid=false;
}
if(isValid) {
    contador++;
    precio = getPrecio();
    let row = `<tr>
    <td>${contador}</td>
    <td>${txtNombre.value}</td>
    <td>${txtNumber.value}</td>
    <td>${precio}</td>
    </tr>`;
    let elemento = ` {"id": ${contador},
    "nombre": "${contador}",
    "cantidad": "${txtNumber.value}",
    "precio": ${precio}
}`;
datos.push(JSON.parse(elemento));
localStorage.setItem("datos", JSON.stringify(datos));
    cuerpoTabla.insertAdjacentHTML("beforeend",row); 
    contadorProductos.innerText=contador;
    totalEnProductos += parseFloat(txtNumber.value);
    costoTotal += precio * parseFloat(txtNumber.value);
    productosTotal.innerText=totalEnProductos;
    precioTotal.innerText=`$ ${costoTotal.toFixed(2)}`;
    localStorage.setItem("contador", contador);
    localStorage.setItem("totalEnProductos",totalEnProductos);
    localStorage.setItem("costoTotal", costoTotal);
    txtNombre.value="";
    txtNumber.value="";
    txtNombre.focus();
}




btnClear.addEventListener("click", function(event) {
    event.proventDefault();
    txtNombre.value = "";
    txtNumber.value = "";
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";
    txtNombre.style.border="";
    txtNumber.style.border="";
    cuerpoTabla.innerHTML="";
    contador = 0;
    totalEnProductos = 0;
    costoTotal = 0;
    localStorage.setItem("contador", contador);
    localStorage.setItem("totalEnProductos", totalEnProductos);
    localStorage.setItem("costoTotal", costoTotal);
    datos = new Array ();
    localStorage.removeItem("datos");
    contadorProductos.innerText= contador;
    productosTotal.innerText=totalEnProductos;
    precioTotal.innerText=`$ ${costoTotal.toFixed(2)}`;
}); //btnClear
window.addEventListener("load", function(event){
    event.preventDefault();
    if (this.localStorage.getItem("contador")!=null){
        contador=this.localStorage.getItem("contador");
    }//if contador
    if (this.localStorage.getItem("totalEnProductos")!=null){
        totalEnProductos=this.localStorage.getItem("totalEnProductos");
    } //if totalEnProductos
    if (this.localStorage.getItem("costoTotal")!=null){
        costoTotal=this.localStorage.getItem("costoTotal");
    }//if costoTotal
    if (this.localStorage.getItem("datos")!=null){
        datos = JSON.parse(this.localStorage.getItem("datos"));
        datos.forEach((r) => {
            let row = `<tr>
            <td>${r.id}</td>
            <td>${r.nombre}</td>
            <td>${r.cantidad}</td>
            <td>${r.precio}</td>
    </tr>`;
    cuerpoTabla.insertAdjacentHTML("beforeend",row);     
    });
contadorProductos.innerText=contador;
productosTotal.innerText=totalEnProductos;
precioTotal.innerText=`$ ${costoTotal.toFixed(2)}`;
});