import View from './view.js';
class habilitiesView extends View {
    _parentElement = document.querySelector('#two .container');
    _errorMessage = 'We could not find that recipe. Please try another one!';
    _message = '';
    addHandlerRender(handler) {
        ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
      }
    _generateMarkup(data) {
        return `
        <h3>${data.abilities.title}</h3>
        <p>${data.abilities.text}</p>
        <ul class="feature-icons">
            <li class="icon brands fa-js">JavaScript</li>
            <li class="icon brands fa-node-js">Typescript</li>
            <li class="icon brands fa-html5">HTML</li>
            <li class="icon brands fa-sass">SCSS</li>
            <li class="icon solid fa-microscope">Jest</li>
            <li class="icon brands fa-react">React</li>
        </ul>
        `;
      }  
}
export default new habilitiesView();