import * as model from './model.js';
import aboutView from './view/aboutView.js';
import habilitiesView from './view/habilitiesView.js'
const btnForm = document.querySelector('.primary')
const name = document.querySelector('#name')
const email = document.querySelector('#email')
const subject = document.querySelector('#subject')
const message = document.querySelector('#message')
const enviarForm = document.querySelector('form')
const spinner = document.querySelector('.spinner')
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
		btnForm.disabled = true; 
		//btnForm.classList.add('cursor-not-allowed', 'opacity-50')
	}
//}
const controlLanguage = function() {
	aboutView.render(model.language.language);
	habilitiesView.render(model.language.language);
	return true;
  }
const mensajes = {}
function validarFormulario (e) {
	if(e.target.id == 'name' && e.target.value.length > 0) {
		const error = this.parentElement.querySelector('p');
		if(error) {
			error.classList.add("removing");
			error.style.opacity = '0';
			setTimeout(function() {
				error.remove();
			}, 400);
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
			error.classList.add("removing");
			error.style.opacity = '0';
			setTimeout(function() {
				error.remove();
			}, 400);
		}
		model.state.subject = true;
	} else if(e.target.id == 'subject' && e.target.value.length === 0){
		model.state.subject = false;
		mostrarError.bind(this)('debes rellenar el subject')
	}
	if(e.target.id == 'message' && e.target.value.length > 0) {
		const error = this.parentElement.querySelector('p');
		if(error) {
			error.classList.add("removing");
			error.style.opacity = '0';
			setTimeout(function() {
				error.remove();
			}, 400);
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
			error.classList.add("removing");
			error.style.opacity = '0';
			setTimeout(function() {
				error.remove();
			}, 400);
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
		model.state.captcha = true;
		captchaForm.classList.add("removing");
		captchaForm.style.opacity = '0';
		setTimeout(function() {
			captchaForm.style.visibility = 'hidden'
		}, 400);
		
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
	mensajeError.classList.add("error");
    mensajeError.textContent = mensaje;
	this.parentElement.appendChild(mensajeError)
}
(function() {
    // https://dashboard.emailjs.com/admin/integration
    emailjs.init('user_AkrT6Y0GbahNNY8C3VXwL');
})();
function enviarEmail(e) {
    e.preventDefault();
  
    spinner.style.visibility = "visible";
    btnForm.style.visibility = "hidden";
    emailjs.sendForm('service_afkvuhz', 'template_1vkk6pa', this)
        .then(function() {
            spinner.style.visibility = "hidden";
            btnForm.style.visibility = "visible";
            const message = document.createElement('p')
            message.classList.add("mystyle");
            message.innerHTML = 'el formulario se ha enviado correctamente';
            document.querySelector(".actions").appendChild(message)
            setTimeout(function() {
                document.querySelector("p.mystyle").remove();
            }, 4000)
			enviarForm.reset();
			captcha.refresh();
			captchaForm.classList.remove("removing");
			captchaForm.style.opacity = '1';
			captchaForm.style.visibility = 'visible';
			document.getElementById("code").value = '';
			restoreState()
			stateIsTrue()
            console.log('SUCCESS!');

        }, function(error) {
            spinner.style.visibility = "hidden";
            btnForm.style.visibility = "visible";
            const message = document.createElement('p')
            message.classList.add("mystyle");
            message.innerHTML = 'el formulario no se ha podido enviar';
            document.querySelector(".actions").appendChild(message)
            setTimeout(function() {
                document.querySelector("p.mystyle").remove();
            }, 4000)
            console.log('FAILED...', error);
        });
}
function restoreState() {
	for (let key in model.state) {
		model.state[key] = false;
	}
}

const init = function() {
	aboutView.addHandlerRender(controlLanguage)
	habilitiesView.addHandlerRender(controlLanguage)
}
  init();