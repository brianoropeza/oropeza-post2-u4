"use strict"

function mostrarError(id,mensaje){

const campo = document.querySelector(`#${id}`)
const span = document.querySelector(`#error-${id}`)

campo.classList.add("invalido")
campo.classList.remove("valido")

span.textContent = mensaje
}

function limpiarError(id){

const campo = document.querySelector(`#${id}`)
const span = document.querySelector(`#error-${id}`)

campo.classList.remove("invalido")
campo.classList.add("valido")

span.textContent=""
}

function validarNombre(){

const campo=document.querySelector("#nombre")

if(campo.value.trim()===""){
mostrarError("nombre","El nombre es obligatorio")
return false
}

if(campo.value.length<3){
mostrarError("nombre","Debe tener mínimo 3 caracteres")
return false
}

limpiarError("nombre")
return true
}

function validarEmail(){

const campo=document.querySelector("#email")

if(campo.value===""){
mostrarError("email","El correo es obligatorio")
return false
}

if(!campo.checkValidity()){
mostrarError("email","Correo no válido")
return false
}

limpiarError("email")
return true
}

function validarPassword(){

const campo=document.querySelector("#password")

if(campo.value.length<8){
mostrarError("password","Mínimo 8 caracteres")
return false
}

const regex=/^(?=.*[A-Z])(?=.*\d).+$/

if(!regex.test(campo.value)){
mostrarError("password","Debe tener una mayúscula y un número")
return false
}

limpiarError("password")
return true
}

function validarConfirmar(){

const pass=document.querySelector("#password").value
const confirmar=document.querySelector("#confirmar").value

if(confirmar===""){
mostrarError("confirmar","Confirma la contraseña")
return false
}

if(pass!==confirmar){
mostrarError("confirmar","Las contraseñas no coinciden")
return false
}

limpiarError("confirmar")
return true
}

function validarTelefono(){

const campo=document.querySelector("#telefono")

if(campo.value==="") return true

if(!campo.checkValidity()){
mostrarError("telefono","Solo números (7-15)")
return false
}

limpiarError("telefono")
return true
}

document.querySelector("#nombre").addEventListener("blur",validarNombre)
document.querySelector("#email").addEventListener("blur",validarEmail)
document.querySelector("#password").addEventListener("blur",validarPassword)
document.querySelector("#confirmar").addEventListener("blur",validarConfirmar)
document.querySelector("#telefono").addEventListener("blur",validarTelefono)

const form=document.querySelector("#form-registro")

form.addEventListener("submit",function(e){

e.preventDefault()

const validaciones=[

validarNombre(),
validarEmail(),
validarPassword(),
validarConfirmar(),
validarTelefono()

]

const todoValido=validaciones.every(v=>v===true)

if(todoValido){

const mensaje=document.querySelector("#mensaje-exito")

mensaje.classList.remove("oculto")
mensaje.classList.add("visible")

setTimeout(()=>{

form.reset()
mensaje.classList.remove("visible")
mensaje.classList.add("oculto")

},2000)

}

})
function evaluarFortaleza(valor){

let puntos = 0

if(valor.length >= 8) puntos++
if(/[A-Z]/.test(valor)) puntos++
if(/[0-9]/.test(valor)) puntos++
if(/[^A-Za-z0-9]/.test(valor)) puntos++

const niveles = ["","Débil","Regular","Buena","Fuerte"]
const colores = ["","#C62828","#F57F17","#1565C0","#2E7D32"]

return {
nivel: niveles[puntos],
color: colores[puntos],
puntos: puntos
}

}

const campoPassword = document.querySelector("#password")

campoPassword.addEventListener("input",()=>{

const {nivel,color,puntos} = evaluarFortaleza(campoPassword.value)

let indicador = document.querySelector("#fortaleza")

if(!indicador){

indicador = document.createElement("span")
indicador.id="fortaleza"
campoPassword.insertAdjacentElement("afterend",indicador)

}

indicador.textContent = puntos>0 ? `Contraseña: ${nivel}` : ""
indicador.style.color = color

})