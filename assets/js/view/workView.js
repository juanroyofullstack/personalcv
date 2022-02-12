import View from './view.js';

class workView extends View {
    _parentElement = document.querySelector('#three .container');
    _errorMessage = 'We could not find that recipe. Please try another one!';
    _message = '';
    addHandlerRender(handler) {
        ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
      }
    _generateMarkup(data) {
        return `
        <h3>${data.abilities.title}</h3>
									<p>${data.abilities.text}</p>
									<div class="features">
									${data.work["positions"]
									.map(item => {
										return `<article>
											<a href="#" class="image"><img src="${item.img}" alt="" /></a>
											<div class="inner">
												<h4>${item.title}</h4>
												<p>${item.text}</p>
											</div>
										</article>`
									}).join('')}
										
        `;
      }  
}
export default new workView();