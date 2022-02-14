import View from './view.js';
class asideView extends View {
    _parentElement = document.querySelector('#header #nav');
    _errorMessage = 'We could not find that recipe. Please try another one!';
    _message = '';
    addHandlerRender(handler) {
        ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
      }
    _generateMarkup(data) {
        return `
        <ul>
            <li><a id="uno" href="#first" class="active">${data.aside[0]}</a></li>
            <li><a id="dos" href="#two">${data.aside[1]}</a></li>
            <li><a id="tres" href="#three">${data.aside[2]}</a></li>
            <li><a id="cuatro" href="#four">${data.aside[3]}</a></li>
        </ul>
        `;
      }  
}
export default new asideView();