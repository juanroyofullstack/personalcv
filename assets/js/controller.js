'use strict'

import * as model from './model.js';
<<<<<<< HEAD
import * as helper from './helper.js';

=======
import * as listener from './helper.js';
>>>>>>> 720c3ecb8b9333471f0cac20e70b1a1897768514
import aboutView from './view/aboutView.js';
import habilitiesView from './view/habilitiesView.js'
import workView from './view/workView.js'
import contactView from './view/contactView.js'
<<<<<<< HEAD

=======
import asideView from './view/asideView.js'
import language from './../language.json';
>>>>>>> 720c3ecb8b9333471f0cac20e70b1a1897768514
const btnForm = document.querySelector('.primary')
/*const name = document.querySelector('#name')
const email = document.querySelector('#email')
const subject = document.querySelector('#subject')
const message = document.querySelector('#message')
const enviarForm = document.querySelector('form')
const spinner = document.querySelector('.spinner')
const reCaptcha = document.querySelector('#valid')
const captchaForm = document.querySelector('.captcha')*/
const espanol = document.getElementById('es')
const ingles = document.getElementById('en')

const captcha = new Captcha($('#canvas'), {
		  autoRefresh:false,
		  caseSensitive:false,
		  clickRefresh:true,
	});
	

<<<<<<< HEAD
/*	name.addEventListener('blur', validarFormulario)
    email.addEventListener('blur', validarFormulario)
    subject.addEventListener('blur', validarFormulario)
    message.addEventListener('blur', validarFormulario)
	reCaptcha.addEventListener('click', captchaValidar)
    enviarForm.addEventListener('submit', enviarEmail)*/
	espanol.addEventListener('click', changeLanguage)
	ingles.addEventListener('click', changeLanguage)

=======

	reCaptcha.addEventListener('click', captchaValidar)
	espanol.addEventListener('click', changeLanguage)
	ingles.addEventListener('click', changeLanguage)
>>>>>>> 720c3ecb8b9333471f0cac20e70b1a1897768514
function changeLanguage (lang) {
	model.language.language = this.innerText;
	return controlLanguage() ;
}
function controlLanguage() {
	aboutView.render(model.language.language);
	habilitiesView.render(model.language.language);
	workView.render(model.language.language);
<<<<<<< HEAD
	contactView.render(model.language.language);
=======
	asideView.render(model.language.language);
	contactView.renderContact(model.language.language).then(res=> {
		return listener.addListeners(validarFormulario,enviarEmail,captchaValidar)
	});
	return true;
>>>>>>> 720c3ecb8b9333471f0cac20e70b1a1897768514
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
		//console.log(model.state, Object.values(model.state).every(item => item === true))
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
		//btnForm.disabled = false; 
	  }
}
function stateIsTrue() {
	const btnForm = document.querySelector('.primary')
	if(Object.values(model.state).every(item => item === true)) {
		console.log(btnForm)
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
	
		workView.addHandlerRender(controlLanguage)
		return listener.addListeners(validarFormulario,enviarEmail,captchaValidar)
	})
})
$("#uno").click(function() {
    $('html,body').animate({
        scrollTop: $("#one").offset().top},
        'slow');
});
$("#dos").click(function() {
    $('html,body').animate({
        scrollTop: $("#two").offset().top},
        'slow');
});
$("#tres").click(function() {
    $('html,body').animate({
        scrollTop: $("#three").offset().top},
        'slow');
});
$("#cuatro").click(function() {
    $('html,body').animate({
        scrollTop: $("#four").offset().top},
        'slow');
});
