import { Router } from 'express';
import { foodService } from '../services/index.js';

const foodRouter = Router();

foodRouter.post('/', async (req, res, next) => {
	const name: string = req.body.name;
	const img: string = req.body.img;
	const comment: string = req.body.comment;
	const mood: string[] = req.body.mood;
	const age: string[] = req.body.age;
	const money: string = req.body.money;
	const ingredient: string[] = req.body.ingredient;
	const nation: string = req.body.nation;

	const foodInfo = { name, img, comment, mood, age, money, ingredient, nation };

	try {
		const addNewFood = await foodService.addFood(foodInfo);
		res.status(201).json(addNewFood);
	} catch (err) {
		next(err);
	}
});

foodRouter.get('/', async (req, res, next) => {
	try {
		const getFoods = await foodService.findAll();

		if (getFoods.length == 0) {
			throw new Error('저장되어 있는 음식 데이터가 없습니다.');
		}
		res.status(200).json(getFoods);
	} catch (err) {
		next(err);
	}
});

// 무한스크롤
foodRouter.get('/perPage', async (req, res, next) => {
	const currentPageNum = Number(req.query.page);
	const perPageNum = 15;

	try {
		const allProducts = await foodService.findAll();
		const allProductsLength = allProducts.length;
		const maxPageNum = Math.ceil(allProductsLength / perPageNum);

		//early-return
		if (currentPageNum < 1 || currentPageNum > maxPageNum) {
			throw new Error('올바르지 않은 page 번호입니다.');
		}

		const productsPerPage = await foodService.pagination(
			allProducts,
			currentPageNum,
			perPageNum,
		);

		res.status(200).send({
			productsPerPage,
			maxPageNum,
		});
	} catch (err) {
		next(err);
	}
});

foodRouter.get('/result', async (req, res, next) => {
	const { mood, age, money, ingredient } = req.query;

	let answersToFilter;
	if (money === 'any') {
		answersToFilter = {
			$and: [{ mood: mood }, { age: age }, { ingredient: ingredient }],
		};
	} else {
		answersToFilter = {
			$and: [
				{ mood: mood },
				{ age: age },
				{ money: money },
				{ ingredient: ingredient },
			],
		};
	}

	try {
		const filteredFoods = await foodService.foodFilter(answersToFilter);

		if (filteredFoods.length == 0) {
			throw new Error('일치하는 음식이 없습니다...');
		}

		res.status(200).json(filteredFoods);
	} catch (err) {
		next(err);
	}
});

foodRouter.get('/:nation', async (req, res, next) => {
	const { nation } = req.params;

	try {
		if (
			!(
				nation == 'kor' ||
				nation == 'chi' ||
				nation == 'jap' ||
				nation == 'west' ||
				nation == 'etc'
			)
		) {
			throw new Error(`${nation}은(는) 올바르지 않은 nation 이름입니다.`);
		}
		const foods = await foodService.findByNation(nation);
		res.status(200).json(foods);
	} catch (err) {
		next(err);
	}
});

export { foodRouter };
