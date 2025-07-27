import { API_URL, API_KEY} from './config.js';
import { GETJSON,sendJSON } from './helpers.js';


export const state={
    recipe:{},
    search:{
        query:'',
        results:[],
        page: 1,                  // Current page number
        resultsPerPage: 12,       // Number of results per page (default)
        totalResults: 0, 

    },
   bookmarks:[],

};

const createRecipeObject=function(data){
    const { recipe }=data.data;
    //console.log(recipe);
    return{
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
    };

}
export const loadRecipe= async function(id){
    try{
    //const data=await GETJSON(`${API_URL}/${id}/information?apiKey=${API_KEY}`);
    const data = await GETJSON(`${API_URL}/${id}?key=${API_KEY}`);
    state.recipe=createRecipeObject(data);
    const { recipe }=data.data;
    //console.log(recipe);
    state.recipe={
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    };
   //console.log(state.recipe);
}catch(err){
    console.error(err);
}
}

export const loadSearchResult=async function(query){
    try{
        state.search.query=query;
        state.search.page=1;
        //const offset= (page-1)*state.search.resultsPerPage;
        const data = await GETJSON(`${API_URL}?search=${query}&key=${API_KEY}`);
        //console.log(data.results);
        state.search.results=data.data.recipes.map(rec=>{
            return{
                id: rec.id,
                title: rec.title,
                image: rec.image_url,
                publisher: rec.publisher,
            };
        
        }); // Array of recipes (id, title, image, etc.)

        //console.log(state.search.results);
        state.search.totalResults = state.search.results.length; 
        //console.log(state.search.totalResults);

    }catch(err){
        console.error(err);
        throw err;
    }

}

export const GetResultPage=function(page=state.search.page){
    state.search.page=page;
    const start=(page-1)*state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;
    return state.search.results.slice(start, end);

};

const persistBookmarks=function(){
    localStorage.setItem('bookmarks',JSON.stringify(state.bookmarks));
}

export const addBookmark=function(){
    const id=window.location.hash.slice(1);
    if(!id) return;

    //const alreadyBookmarked = state.bookmarks.some(b => b.id === id);
    //if (alreadyBookmarked) return;

    //state.recipe.bookmarked = true;
    state.bookmarks.push({ ...state.recipe });

  
    persistBookmarks();
   

    
}
export const deleteBookmark=function(){
    const id=window.location.hash.slice(1);
    if(!id) return;
    const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);
    if (index !== -1) state.bookmarks.splice(index, 1);

    //if (state.recipe.id === id) state.recipe.bookmarked = false;

    persistBookmarks();
    
    

}

export const updateServings=function(newServings){
    state.recipe.ingredients.forEach(ing => {
        ing.quantity=ing.quantity*newServings/state.recipe.servings;  
    });
    state.recipe.servings=newServings;

}

export const uploadRecipes=async function(newRecipe){
    try{
    //console.log(Object.entries(newRecipe));
    const ingredients=Object.entries(newRecipe).filter(entry=>entry[0].startsWith('ingredient') && entry[1]!=='').map(ing=>{ 
        const ingArr = ing[1].split(',').map(el => el.trim());
        //return {quantity,unit,description};
        if (ingArr.length !== 3){
            throw new Error(
              'Wrong ingredient fromat! Please use the correct format :)'
            );
        }
        const [quantity, unit, description] = ingArr;

        return { quantity: quantity ? +quantity : null, unit, description };

        
    });
    //console.log(ingredients);

    const recipe = {
        title: newRecipe.title,
        source_url: newRecipe.sourceUrl,
        image_url: newRecipe.image,
        publisher: newRecipe.publisher,
        cooking_time: +newRecipe.cookingTime,
        servings: +newRecipe.servings,
        ingredients, // parsed above
      };
    //console.log(recipe);
    console.log('Uploading recipe:', recipe);
    const data = await sendJSON(`${API_URL}?key=${API_KEY}`, recipe);  
    console.log(data);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);


}catch(err){
    throw err;
}
    
}

function init() {
    const storage = localStorage.getItem('bookmarks');
    if (storage) state.bookmarks = JSON.parse(storage);
  }

init();
//console.log(state.bookmarks);

//loadSearchResult('pasta');
