import View from './View';
import icons from 'url:../../img/icons.svg';
class bookView extends View{

    _parentEL = document.querySelector('.bookmarks__list');

  addHandlerRender(handler){
    window.addEventListener('load',handler)
  }
    


  render(data) {
    if (!data || data.length === 0) {
      this.renderMessage();
      return;
    }
    super.render(data); // call parent render
  }

  renderMessage() {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>No Bookmarks saved..</p>
      </div>
    `;
    this._clear();
    this._parentEL.insertAdjacentHTML('afterbegin', markup);
  }


      
    
    _generateMarkup(){
            //console.log(this._data);
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
                  </div>
                </a>
              </li>`
        }
    



}
export default new bookView();