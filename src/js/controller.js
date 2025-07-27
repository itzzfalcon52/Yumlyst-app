import * as model from './model.js';
import recipeview from './views/recipeview.js';
import searchView from './views/searchview.js';
import resultsView from './views/resultsview.js'
import Page from './views/pagination.js';
import bookview from './views/bookview.js';
import addrecipeview from './views/addrecipeview.js';
//import icons from 'url:../img/icons (1).svg';

//import 'core-js/stable';
//import 'regenerator-runtime/runtime';
//console.log(icons);


const recipeContainer = document.querySelector('.recipe');

//console.log(recipeview);




// https://forkify-api.jonas.io

///////////////////////////////////////

const controlRecipes=async function(){
  try{
    //-----------Getting recipe id from url---------------
    const id=window.location.hash.slice(1);
    if(!id) return;
    //-----------Loading recipe from API------------------
    //render spinner
    recipeview.renderSpinner();
  
   
   //loading recipe from model.js
   await model.loadRecipe(id); //we use await as the async function returns a promise 
   //const {recipe}=model.state;
   //console.log(recipe);
   const bookmarked = model.state.bookmarks.some(b => b.id === model.state.recipe.id);
   model.state.recipe.bookmarked = bookmarked;
  
   //console.log(data);

   //------------Rendering Recipe----------------
   recipeview.render(model.state.recipe); //the recipe data is stored in #data in render method


   resultsView.update(model.GetResultPage());

   



  }
  catch(err){
   alert(err);

  }



}

const controlSearchResults=async function(){
  try{
    resultsView.renderSpinner();
    const query=searchView.getQuery();
    //console.log(query);
    if(!query) return;

    await model.loadSearchResult(query);
    resultsView.render(model.GetResultPage());
    Page.render(model.state.search);

  }catch(err){
    throw err;
  }
}

const controlPagination=async function(goToPage){
  try{
    resultsView.renderSpinner();
    resultsView.render(model.GetResultPage(goToPage));
    Page.render(model.state.search);

  }catch (err) {
    console.error(err);
  }
}

//controlRecipes();
/*['hashchange','load'].forEach(ev => {
  window.addEventListener(ev, showRecipe);
});*/


const controlAddBookmark=function(){

  if(!model.state.recipe.bookmarked){
    model.addBookmark();
  }else{
    model.deleteBookmark();

  }

  model.state.recipe.bookmarked = !model.state.recipe.bookmarked;


  recipeview.update(model.state.recipe);
  bookview.render(model.state.bookmarks);


}

const controlBookmarks=function(){
  bookview.render(model.state.bookmarks);
}

const controlServings=function(newServings){
  model.updateServings(newServings);

  recipeview.update(model.state.recipe);
}

const controlAddRecipe=async function(newRecipe){
  //console.log(newRecipe);
try{
  addrecipeview.renderSpinner();
  await model.uploadRecipes(newRecipe);

  //render
  recipeview.render(model.state.recipe);

  //close form window

  setTimeout(function(){
    addrecipeview.toggleWindow()
  },2500);

  //success message
  addrecipeview.renderMessage();

  //render bookmark

  bookview.render(model.state.bookmarks);
//change ID in url
  window.history.pushState(null,"",`#${model.state.recipe.id}`);
  


}catch(err){
  console.error(err);


}


}

const init=function(){
  bookview.addHandlerRender(controlBookmarks);
 recipeview.addHandlerRender(controlRecipes);
 recipeview.addHandlerServings(controlServings);
 searchView.addHandlerSearch(controlSearchResults);
 recipeview.addHandlerAddBookmark(controlAddBookmark);
 Page.addHandlerClick(controlPagination);
 addrecipeview._addHandlerUpload(controlAddRecipe);
}
init();


