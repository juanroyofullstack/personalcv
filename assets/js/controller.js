'use strict'

import * as model from './model.js';
import * as listener from './helper.js';
import aboutView from './view/aboutView.js';
import habilitiesView from './view/habilitiesView.js'
import workView from './view/workView.js'
import contactView from './view/contactView.js'
import asideView from './view/asideView.js'
import language from './../language.json';
const btnForm = document.querySelector('.primary')
const reCaptcha = document.querySelector('#valid')
const captchaForm = document.querySelector('.captcha')
const espanol = document.getElementById('es')
const ingles = document.getElementById('en')

const captcha = new Captcha($('#canvas'), {
		  autoRefresh:false,
		  caseSensitive:false,
		  clickRefresh:true,
	});
	


	reCaptcha.addEventListener('click', captchaValidar)
	espanol.addEventListener('click', changeLanguage)
	ingles.addEventListener('click', changeLanguage)
function changeLanguage (lang) {
	model.language.language = this.innerText;
	return controlLanguage() ;
}
function controlLanguage() {
	aboutView.render(model.language.language);
	habilitiesView.render(model.language.language);
	workView.render(model.language.language);
	asideView.render(model.language.language);
	contactView.renderContact(model.language.language).then(res=> {
		return listener.addListeners(validarFormulario,enviarEmail,captchaValidar)
	});
	var imgElement = document.querySelector('img[alt="Empathy"]')
	imgElement.src = document.querySelector('.empathy').src;
	var imgElement = document.querySelector('img[alt="Protecmedia"]')
	imgElement.src = document.querySelector('.protec').src;
	var imgElement = document.querySelector('img[alt="Booboo Operador Logistico"]')
	imgElement.src = document.querySelector('.booboo').src;
	var imgElement = document.querySelector('img[alt="CodaFish"]')
	imgElement.src = document.querySelector('.codafish').src;
	return true;
  }
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
		model.state.name = true;
	} else if(e.target.id == 'name' && e.target.value.length === 0) {
		model.state.name = false;
		mostrarError.bind(this)(language[model.language.language].errors.name)
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
		mostrarError.bind(this)(language[model.language.language].errors.subject)
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
		mostrarError.bind(this)(language[model.language.language].errors.text)
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
			mostrarError.bind(this)(language[model.language.language].errors.email)
		} 
	}
	if(stateIsTrue()) {
		return; 
	}
}
function captchaValidar() {
	const captchaForm = document.querySelector('.captcha')
	const ans = captcha.valid($('input[name="code"]').val());
	  if(ans) {
		model.state.captcha = true;
		captchaForm.classList.add("removing");
		captchaForm.style.opacity = '0';
		setTimeout(function() {
			captchaForm.style.visibility = 'hidden'
		}, 400);
		
		return stateIsTrue()
	  }
}
function stateIsTrue() {
	const btnForm = document.querySelector('.primary')
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
    emailjs.init('user_AkrT6Y0GbahNNY8C3VXwL');
})();
function enviarEmail(e) {
    e.preventDefault();
  
    document.querySelector('.spinner').style.visibility = "visible";
    document.querySelector('.primary').style.visibility = "hidden";
    emailjs.sendForm('service_afkvuhz', 'template_1vkk6pa', this)
        .then(function() {
            document.querySelector('.spinner').style.visibility = "hidden";
            document.querySelector('.primary').style.visibility = "visible";
            const message = document.createElement('p')
            message.classList.add("mystyle");
            message.innerHTML = 'el formulario se ha enviado correctamente';
            document.querySelector(".actions").appendChild(message)
            setTimeout(function() {
                document.querySelector("p.mystyle").remove();
            }, 4000)
			document.querySelector('form').reset();
			captcha.refresh();
			captchaForm.classList.remove("removing");
			captchaForm.style.opacity = '1';
			captchaForm.style.visibility = 'visible';
			document.getElementById("code").value = '';
			restoreState()
			stateIsTrue()
            console.log('SUCCESS!');

        }, function(error) {
            document.querySelector('.spinner').style.visibility = "hidden";
            document.querySelector('.primary').style.visibility = "visible";
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

async function init() {
	aboutView.addHandlerRender(controlLanguage)
	habilitiesView.addHandlerRender(controlLanguage)
	contactView.addHandlerRender(controlLanguage)
	asideView.addHandlerRender(controlLanguage);
}
init().then(res=> {
	window.addEventListener("load", function(event) {
		document.querySelectorAll('#nav a[href^="#"]').forEach(ancla => { return ancla.classList.value = '' })
		workView.addHandlerRender(controlLanguage)
		var imgElement = document.querySelector('img[alt="Empathyco"]')
		imgElement.src = document.querySelector('.empathy').src;
		var imgElement = document.querySelector('img[alt="Protecmedia"]')
		imgElement.src = document.querySelector('.protec').src;
		var imgElement = document.querySelector('img[alt="Booboo Operador Logistico"]')
		imgElement.src = document.querySelector('.booboo').src;
		var imgElement = document.querySelector('img[alt="CodaFish"]')
		imgElement.src = document.querySelector('.codafish').src;
		return listener.addListeners(validarFormulario,enviarEmail,captchaValidar)
	})
})

