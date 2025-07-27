import icons from 'url:../../img/icons.svg';
export default class View{
    _data;

    render(data){
        this._data=data;
        const markup=this._generateMarkup();
        this._clear();
        this._parentEL.insertAdjacentHTML("afterbegin",markup);
       
    }
    _clear(){
        this._parentEL.innerHTML='';
    }

    renderSpinner=function(){
        const markup=`
              <div class="spinner">
                <svg>
                  <use href="${icons}#icon-loader"></use>
                </svg>
              </div>
              `;
          
              
        this._parentEL.innerHTML='';
        this._parentEL.insertAdjacentHTML('afterbegin',markup);
      }

      renderMessage(message = this._message) {
        const markup = `
          <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
        `;
        this._clear();
        this._parentEL.insertAdjacentHTML('afterbegin', markup);
      }

}