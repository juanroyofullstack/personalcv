export function addListeners(validarFormulario,enviarEmail,captchaValidar) {
    return new Promise((resolve, reject)=> {
        resolve(document.querySelector('#name').addEventListener('blur', validarFormulario),
            document.querySelector('#email').addEventListener('blur', validarFormulario),
            document.querySelector('#subject').addEventListener('blur', validarFormulario),
            document.querySelector('#message').addEventListener('blur', validarFormulario),
            document.querySelector('form').addEventListener('submit', enviarEmail),
            document.querySelectorAll('#nav a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    document.querySelectorAll('#nav a[href^="#"]').forEach(ancla => { return ancla.classList.value = '' })
                    anchor.classList.add("active")
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            }),
            document.querySelector('header h1 a[href^="#"]').addEventListener('click', function (e) {
                    e.preventDefault();
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                })
            );
    
   
    })
}
