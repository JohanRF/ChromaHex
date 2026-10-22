//* 1. Selección de elementos
const mainColor = document.querySelector(".mainColor");
const nameColor = document.querySelector(".nameColor");
const btnCopiarColor = document.querySelector(".btn-copiar-color");
const btnAplicar = document.querySelector(".btnAutoSave");
const vistaPrevia = document.querySelector(".vistaNameColor");
const vistaNameColor = document.querySelector(".nameColor2");
const mensajeNotColors = document.querySelector(".mensagge-not-historial");

//*SECCION GUARDAR Y CREAR ESPACIO DE LOS COLORES GUARDADOS
const saveColors = document.querySelector(".saveColors");
const seccGuardado = document.querySelector(".box2");

//*BASE DE AVISO O ALERTA DE ALGO.
const alertColor = document.querySelector(".alertColor");

//*BOTON DE ELIMINAR TODO EL HISTORIAL.
const btnDeletColors = document.querySelector(".btnDeleteColors")

//*BOTON DE CAMBIO DE MODO LUZ O OSCURIDAD.
const toggleInput = document.getElementById("toggle-mode");


if(localStorage.getItem("modo") === "night"){
	document.body.classList.add("night");
	toggleInput.checked = true;
}

toggleInput.addEventListener("change",()=>{
	document.body.classList.toggle("night");
	const modo = document.body.classList.contains("night") ? "night" : "day";
	localStorage.setItem("modo", modo)
})


//*Función generadora
function generarColorHex() {
	const letras = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; i++) {
    	color += letras[Math.floor(Math.random() * 16)];
	}
	return color;
}

//*Color aleatorio al cargar
const colorAleatorio = generarColorHex();
mainColor.value = colorAleatorio;
nameColor.value = colorAleatorio;
vistaPrevia.style.backgroundColor = colorAleatorio;
vistaNameColor.textContent = colorAleatorio;

//*Eventos
mainColor.addEventListener("input", function () {
	nameColor.value = mainColor.value;
});

nameColor.addEventListener("input", function () {
	mainColor.value = nameColor.value;
});

//TODO: Aqui das ordenes o acciones al boton "Aplicas colro"

btnAplicar.addEventListener("click", function () {
	const colorSeleccionado = mainColor.value;
	
	//*limite de guardado en historial
	if (saveColors.children.length >= 18) {
		saveColors.removeChild(saveColors.lastChild);
	}

	vistaPrevia.style.backgroundColor = colorSeleccionado;
	vistaNameColor.textContent = colorSeleccionado;

	//? Aquí podrías añadir el guardado en historial
	//* Ocultar mensaje vacío
	mensajeNotColors.style.display = "none";
	saveColors.style.display = "grid";

	//* Crear elemento de color guardado
	const tarjeta = document.createElement("div")
	tarjeta.classList.add("cuadroGuardado", "animar-entrada");
	tarjeta.style.backgroundColor = colorSeleccionado;

	const texto = document.createElement("p");
	texto.classList.add("cuadroName");
	texto.textContent = colorSeleccionado;

	//*Evento para usar los color al hacer click.
	tarjeta.addEventListener("click", function () {
		vistaPrevia.style.backgroundColor = colorSeleccionado;
		vistaNameColor.textContent = colorSeleccionado;
	})

	//*Agrupar los colores guardados
	const contenedor = document.createElement("div");
	contenedor.classList.add("itemColor");
	contenedor.appendChild(tarjeta);
	contenedor.appendChild(texto);
	//*insertar al inicio y empujar de lado.
	saveColors.insertBefore(contenedor, saveColors.firstChild);
	
	//* Hacer que box2 se encoja solo cuando hay colores
	seccGuardado.style.minHeight="auto";

	actualizarHistorial();
});


btnCopiarColor.addEventListener("click",function(){
	const colorRGB = (vistaPrevia).style.backgroundColor;
	const colorHEX = rgbAHex(colorRGB);
	
	alertColor.textContent = `✅ Color ${colorHEX} aplicado con exito`;
	alertColor.classList.add("mostrar");

	setTimeout(()=>{
		alertColor.classList.remove("mostrar");
	}, 3500) // desaparece despues de 3s
})



//*Evento de eliminar el historial de colores
btnDeletColors.addEventListener("click",function() {
	const items = saveColors.querySelectorAll(".itemColor");

	if (items.length === 0) return;

	let itemEliminados = 0;
	
	items.forEach((item)=>{
		item.classList.add("eliminar-animado");

		item.addEventListener("animationend", ()=>{
			item.remove();
			itemEliminados++;

			if (itemEliminados === items.length) {
				actualizarHistorial();
			}
		})
	})
	/* saveColors.innerHTML="";
	actualizarHistorial(); */
})



//*FUNCION DE RGBA A HEX
function rgbAHex(rgb) {
  	const partes = rgb.match(/\d+/g); // Extrae los números del string
	const r = parseInt(partes[0]).toString(16).padStart(2, '0');
	const g = parseInt(partes[1]).toString(16).padStart(2, '0');
	const b = parseInt(partes[2]).toString(16).padStart(2, '0');
	return `#${r}${g}${b}`.toUpperCase();
}

//*FUNCION DEL BTON ELIMINAR COLORES
function actualizarHistorial() {
	//* Es una condicion que, si saveColor tiene algun hijo(itemColor). El mensajeNotColor se oculta, saveColors aparece como grid y el btnDeleteColores tambien aparezcan.
	if (saveColors.children.length > 0) {
		mensajeNotColors.style.display= "none";
		saveColors.style.display= "grid";
		btnDeletColors.style.display= "block";
	}else{
		//*Pero si no hay ningun hijo, saveColors desaparece, mensajeNotColor aparece y el btn de elimnar.
		mensajeNotColors.style.display= "block";
		saveColors.style.display= "none";
		btnDeletColors.style.display= "none";
	}
}
actualizarHistorial();