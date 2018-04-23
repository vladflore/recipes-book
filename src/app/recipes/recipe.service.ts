import { Recipe } from "./recipe.model";
import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs/Subject";

@Injectable()
export class RecipeService {

    private recipes: Recipe[] = [];
    recipesChanged = new Subject<Recipe[]>();


    constructor(private slService: ShoppingListService) {

        let r: Recipe = new Recipe('Tasty Schnitzel', 'A super taste Schnitzel - super awesome', 'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG', [new Ingredient('meat', 1), new Ingredient('french fries', 20)]);
        this.recipes.push(r);
        r = new Recipe('Big fat Burger', 'What else you need to say?', 'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg', [new Ingredient('Buns', 2), new Ingredient('meat', 2)]);
        this.recipes.push(r);
    }

    getRecipes() {
        //prevent accessing the array from outside, instead access the copy of it; slice() return a copy
        return this.recipes.slice();
    }

    getRecipe(id: number): Recipe {
        return this.recipes[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

}