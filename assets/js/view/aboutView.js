import View from './view.js';
class aboutView extends View {
    _parentElement = document.getElementById('first');
    _errorMessage = 'We could not find that recipe. Please try another one!';
    _message = '';
    addHandlerRender(handler) {
        ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
      }
    _generateMarkup(data) {
        return `
         <header class="major">
			<!--<h2>jeje</h2> -->
				<p>${data.about.title}</p>
		</header>
		<p>${data.about.text}</p>
        `;
      }  
}
export default new aboutView();