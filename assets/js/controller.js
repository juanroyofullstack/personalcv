import * as model from './model.js';
import View from './view.js'
const btnForm = document.querySelector('.primary')
const name = document.querySelector('#name')
const email = document.querySelector('#email')
const subject = document.querySelector('#subject')
const message = document.querySelector('#message')
const enviarForm = document.querySelector('form')
//const resetForm = document.querySelector('#reset')
const reCaptcha = document.querySelector('#valid')
const captchaForm = document.querySelector('.captcha')
const captcha = new Captcha($('#canvas'),{
		  autoRefresh:false,
		  caseSensitive:false,
		  clickRefresh:true,
	});
	

//eventListeners()
//function eventListeners() {
	document.addEventListener('DOMContentLoaded', iniciarApp)
	name.addEventListener('blur', validarFormulario)
    email.addEventListener('blur', validarFormulario)
    subject.addEventListener('blur', validarFormulario)
    message.addEventListener('blur', validarFormulario)
	reCaptcha.addEventListener('click', captchaValidar)
    enviarForm.addEventListener('submit', enviarEmail)
	//resetForm.addEventListener('click', resetFormulario)
	function iniciarApp() {
		console.log(model)
		btnForm.disabled = true; 
		//btnForm.classList.add('cursor-not-allowed', 'opacity-50')
	}
//}
const mensajes = {}
function validarFormulario (e) {
	if(e.target.id == 'name' && e.target.value.length > 0) {
		const error = this.parentElement.querySelector('p');
		if(error) {
			error.remove();
		}
		//console.log(model.state, Object.values(model.state).every(item => item === true))
		model.state.name = true;
	} else if(e.target.id == 'name' && e.target.value.length === 0) {
		model.state.name = false;
		mostrarError.bind(this)('debes rellenar el nombre')
	}
	if(e.target.id == 'subject' && e.target.value.length > 0) {
		const error = this.parentElement.querySelector('p');
		if(error) {
			error.remove();
		}
		model.state.subject = true;
	} else if(e.target.id == 'subject' && e.target.value.length === 0){
		model.state.subject = false;
		mostrarError.bind(this)('debes rellenar el subject')
	}
	if(e.target.id == 'message' && e.target.value.length > 0) {
		const error = this.parentElement.querySelector('p');
		if(error) {
			error.remove();
		}
		model.state.text = true;
	} else if(e.target.id == 'message' && e.target.value.length === 0) {
		model.state.text = false;
		mostrarError.bind(this)('debes rellenar el message')
	}
	const re =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	if(e.target.id === 'email') {
		const error = this.parentElement.querySelector('p');
		if(error) {
			error.remove();
		}
		model.state.email = true;
		if(!re.test(e.target.value)) {
			model.state.email = false;
			mostrarError.bind(this)('debes rellenar el email bien')
		} 
	}
	if(stateIsTrue()) {
		return; 
	}
}
function captchaValidar() {
	const ans = captcha.valid($('input[name="code"]').val());
	  if(ans) {
		captchaForm.style.visibility = "hidden";
		model.state.captcha = true;
		return stateIsTrue()
		//btnForm.disabled = false; 
	  }
}
function stateIsTrue() {
	if(Object.values(model.state).every(item => item === true)) {
		btnForm.disabled = false; 
		return true;
	} else {
		btnForm.disabled = true;; 
	}
}
	
function mostrarError (mensaje) {
	if(this.nextSibling) return;
	const mensajeError = document.createElement('p')
    mensajeError.textContent = mensaje;
	this.parentElement.appendChild(mensajeError)
}
/*function resetFormulario() {
	Object.keys(model.state).forEach(v => model.state[v] = false)
	console.log('model',Object.values(model.state))
	/*Object.values(model.state).forEach(function(part, index, theArray) {
		
		theArray[index] = false;
		console.log('part',part,theArray[index])
		return theArray[index];
	})
}*/
(function() {
    // https://dashboard.emailjs.com/admin/integration
    emailjs.init('user_AkrT6Y0GbahNNY8C3VXwL');
})();
function enviarEmail(e) {
	console.log('hola')
    e.preventDefault();
    // generate a five digit number for the contact_number variable
   // this.contact_number.value = Math.random() * 100000 | 0;
    // these IDs from the previous steps
    emailjs.sendForm('service_afkvuhz', 'template_1vkk6pa', this)
        .then(function() {
            console.log('SUCCESS!');
        }, function(error) {
            console.log('FAILED...', error);
        });
}
