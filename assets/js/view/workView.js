import View from './view.js';
//import * as img from '../../../images'
class workView extends View {
    _parentElement = document.querySelector('#three .container');
    _errorMessage = 'We could not find that recipe. Please try another one!';
    _message = '';
    addHandlerRender(handler) {
        ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
      }
    _generateMarkup(data) {
        return `
        <h3>${data.work.title}</h3>
									<p>${data.work.text}</p>
									<div class="features">
									${data.work["positions"]
									.map(item => {
										return `<article>
											<a href="#" class="image"><img src="${item.img}" alt="${item.title}" loading="lazy"/></a>
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