import { FoodModel, foodModel } from '../db/index.js';

interface FoodInfo {
	name: string;
	img: string;
	comment: string;
	mood: string[];
	age: string[];
	money: string;
	ingredient: string[];
	nation: string;
}

class FoodService {
	foodModel: FoodModel;

	constructor(foodModel: FoodModel) {
		this.foodModel = foodModel;
	}

	async addFood(foodInfo: FoodInfo) {
		const newFood = await this.foodModel.createNewFood(foodInfo);
		return newFood;
	}

	async findAll() {
		const allFoods = await this.foodModel.findAll();
		return allFoods;
	}

	async findByNation(nation: string) {
		const foods = await this.foodModel.findByNation(nation);
		return foods;
	}

	async foodFilter(answers: any) {
		const findFoods = await this.foodModel.foodFilter(answers);
		return findFoods;
	}

	async pagination(allProduct: any, currentPageNum: number, perPageNum: 15) {
		const currentProducts = await allProduct.slice(
			perPageNum * (currentPageNum - 1),
			perPageNum * (currentPageNum - 1) + perPageNum
		);

		return currentProducts;
	}

}

const foodService = new FoodService(foodModel);

export { foodService };
