export function addListeners(validarFormulario,enviarEmail,captchaValidar) {
    return new Promise((resolve, reject)=> {
       //window.addEventListener("load", function(event) {
        resolve(document.querySelector('#name').addEventListener('blur', validarFormulario),
            document.querySelector('#email').addEventListener('blur', validarFormulario),
            document.querySelector('#subject').addEventListener('blur', validarFormulario),
            document.querySelector('#message').addEventListener('blur', validarFormulario),
            document.querySelector('form').addEventListener('submit', enviarEmail));
    
     //  })
    })
}
