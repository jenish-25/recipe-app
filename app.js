const searchBtn=document.querySelector(".btn");
const searchbox=document.querySelector(".searchBox");
const reciepecontainer=document.querySelector(".reciepe-container");
const recipedetailsContent=document.querySelector(".recipe-details-content");
const recepieCloseBtn=document.querySelector(".recepie-close-btn");



const fetchRecepies=async(query)=>{
    reciepecontainer.innerHTML="<h2>fetching recepies....</h2>";
    try{
        const data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response=await data.json();

        reciepecontainer.innerHTML="";
        response.meals.forEach(meal=>{
        const recepieDiv=document.createElement('div');
        recepieDiv.classList.add('recipe');
        recepieDiv.innerHTML=`<img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span></p>`

        const button=document.createElement('button');
        button.textContent="view receipe";
        recepieDiv.appendChild(button);

        button.addEventListener('click',()=>{
            openRecepie(meal);
        });

        reciepecontainer.appendChild(recepieDiv);
        });
    }
    catch(err){
        reciepecontainer.innerHTML="<h2> Error in fetching Recipes...</h2>";
    }
    // console.log(response.meals[0]);
}

const fetchIngredients=(meal)=>{
    let ingredeintList="";
    for(let i=1;i<=20;i++){
        const ingredient=meal[`strIngredient${i}`];
        if(ingredient){
            const measure=meal[`strMeasure${i}`];
            ingredeintList += `<li>${measure} ${ingredient} </li>`
        }else{
            break;
        }
    }
    return ingredeintList;
}

const openRecepie=(meal)=>{
    recipedetailsContent.innerHTML=`<h2 class="recepieName">${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class="IngreList">${fetchIngredients(meal)}</ul>
    <div class="instructions">
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
    </div>`;
    recipedetailsContent.parentElement.style.display="block";
}
recepieCloseBtn.addEventListener('click',()=>{
    recipedetailsContent.parentElement.style.display="none";
});
searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput=searchbox.value.trim();
    fetchRecepies(searchInput);
});



