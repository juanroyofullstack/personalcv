import View from './view.js';
import language from '../../language.json';

class contactView extends View {
    
    _parentElement = document.querySelector('#four .container div');
    _name = document.querySelector('#name')
    _errorMessage = 'We could not find that recipe. Please try another one!';
    _message = '';
    addHandlerRender(handler) {
        ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
 
      }
      handlerValidation(validarFormulario, captchaValidar, enviarEmail) {

         
            document.querySelector('#name').addEventListener('blur', validarFormulario)
            document.querySelector('#email').addEventListener('blur', validarFormulario)
            document.querySelector('#subject').addEventListener('blur', validarFormulario)
            document.querySelector('#message').addEventListener('blur', validarFormulario)
            document.querySelector('#valid').addEventListener('click', captchaValidar)
            document.querySelector('form').addEventListener('submit', enviarEmail)
          
      }
    async renderContact(data) {
        const markup = this._generateMarkup(language[data]);


        this._clear();
        return this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }
    _generateMarkup(data) {
        return `
        <h3>${data.contact.title}</h3>
        <form if="form" method="post">
            <div class="row gtr-uniform">
                <div class="col-6 col-12-xsmall"><input type="text" name="name" id="name" placeholder="${data.contact.name}" /></div>
                <div class="col-6 col-12-xsmall"><input type="email" name="email" id="email" placeholder="${data.contact.email}" /></div>
                <div class="col-12"><input type="text" name="subject" id="subject" placeholder="${data.contact.subject}" /></div>
                <div class="col-12"><textarea name="message" id="message" placeholder="${data.contact.message}" rows="6"></textarea></div>
                <div class="col-12">
                    <ul class="actions">
                        <li><input type="submit" class="primary" value="${data.contact.send}" disabled /></li>
                        <li><div class="spinner" style="visibility: hidden;"></div></li>
                        <!--<li><input id="reset" type="reset" value="Reset Form" /></li>-->
                    </ul>
                </div>
            </div>
        </form>
        `;
      }  
}
export default new contactView();