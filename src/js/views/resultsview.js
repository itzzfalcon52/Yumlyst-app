import View from './View.js';
import icons from 'url:../../img/icons.svg';
class resultsView extends View{
    _parentEL=document.querySelector('.results');


    _generateMarkup(){
        console.log(this._data);
        return this._data.map(recipe=>this._generateMarkupPreview(recipe)).join('');
    }

    _generateMarkupPreview(recipe){
        return ` <li class="preview">
            <a class="preview__link preview__link--active" href="#${recipe.id}">
              <figure class="preview__fig">
                <img src="${recipe.image}" alt="${recipe.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${recipe.title}</h4>
                <p class="preview__publisher">${recipe.publisher}</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>`
    }

    update(data) {
        this._data = data;
        const newMarkup = this._generateMarkup();
      
        const newDOM = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newDOM.querySelectorAll('*'));
        const curElements = Array.from(this._parentEL.querySelectorAll('*'));
      
        newElements.forEach((newEl, i) => {
          const curEl = curElements[i];
      
          // Update changed TEXT
          if (
            !newEl.isEqualNode(curEl) &&
            newEl.firstChild?.nodeValue.trim() !== ''
          ) {
            curEl.textContent = newEl.textContent;
          }
      
          // Update changed ATTRIBUTES
          if (!newEl.isEqualNode(curEl)) {
            Array.from(newEl.attributes).forEach(attr =>
              curEl.setAttribute(attr.name, attr.value)
            );
          }
        });
      }
    

    

}
export default new resultsView();