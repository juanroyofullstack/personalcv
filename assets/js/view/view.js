import icons from '../../../images/icons.svg';
import language from '../../language.json';
export default class View {
    _data;
    /**
     * 
     * @param {*} data 
     * @param {*} render 
     * @returns 
     */
    render(data, render = true) {
        console.log('this._generateMarkup()',this)
        const markup = this._generateMarkup(language[data]);

        if(!render) return markup;

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }
    update(data){
        this._data = data;
        const newMarkup = this._generateMarkup();
        const newDOM = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newDOM.querySelectorAll('*'));
        const curElements = Array.from(this._parentElement.querySelectorAll('*'));
        newElements.forEach((newEl, i) => {
            const curEl = curElements[i];
            if (
                !newEl.isEqualNode(curEl) &&
                newEl.firstChild?.nodeValue.trim() !== ''
              ) {
        
                curEl.textContent = newEl.textContent;
              }
              if (!newEl.isEqualNode(curEl))
                 Array.from(newEl.attributes).forEach(attr =>
                 curEl.setAttribute(attr.name, attr.value)
            );
        })
    }

    _clear () {
        this._parentElement.innerHTML = '';
    }
    renderSpinner = function() {
        const markup = 
        `<div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>`;
          this._clear();
          this._parentElement.insertAdjacentHTML('afterbegin', markup)
      }
      renderError(error = this._errorMessage) {
          const markup = `<div class="error">
          <div>
            <svg>
              <use href="${icons}#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>${error}</p>
        </div>`;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
      }
      renderMessage(error = this._message) {
        const markup = `<div class="recipe">
        <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${error}</p>
        </div>`;
      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }
}