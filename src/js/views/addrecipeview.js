import View from './View.js';
import icons from 'url:../../img/icons.svg';
class addRecipe extends View{
    _parentEL = document.querySelector('.upload');
    _window=document.querySelector('.add-recipe-window');
    _overlay=document.querySelector('.overlay');
    _btnOpen=document.querySelector('.nav__btn--add-recipe');
    _btnClose=document.querySelector('.btn--close-modal');

    _message='Recipe was succesfully uploaded..';


    constructor(){
        super();
        console.log('addRecipe constructor ran');
        this._addHandlerShowWindow();
        this._addHandlerHideWindow();

    }

    toggleWindow(){
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');

    }

    _addHandlerShowWindow() {
        this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
    }

    _addHandlerHideWindow() {
        this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    }

    _addHandlerUpload(handler){
        this._parentEL.addEventListener('submit',function(e){
            e.preventDefault();
            const dataArr=[...new FormData(this)];
            const data=Object.fromEntries(dataArr);
            //console.log(data);

            handler(data);
        })
    }


   _generateMarkup(){

   }

       
      
}

export default new addRecipe();