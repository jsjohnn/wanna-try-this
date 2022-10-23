import pkg, { Types } from 'mongoose';
const { model } = pkg;
import { UserSchema } from '../schemas/user-schema.js';

interface UserInfo {
	email: string;
	provider: string;
}
interface NewUserInfo extends UserInfo {
	nickname: string;
}

const User = model('user', UserSchema);

export class UserModel {
	async create(newUserInfo: NewUserInfo) {
		const createdNewUser = await User.create(newUserInfo);
		return createdNewUser;
	}

	async findOne(userInfo: UserInfo) {
		const user = await User.findOne(userInfo).populate('foodData.foodId');		
		return user;
	}

	async findById(userId: Types.ObjectId) {
		const idUser = await User.findOne({ _id: userId }).populate(
			'foodData.foodId',
		);

		return idUser;

	}

	async updateNick(userId: Types.ObjectId, newNick: string) {
		const updatedUser = await User.findOneAndUpdate(
			{ _id: userId },
			{ $set: { nickname: newNick } },
			{ returnOriginal: false },
		).populate('foodData.foodId');
		return updatedUser;
	}

	async updateUserFood(userId: Types.ObjectId, newFoodId: any) {
		const updateUser = await User.findOneAndUpdate(
			{ _id: userId },
			{ $push: { foodData: { foodId: newFoodId } } }, // user스키마 foodData배열에 새로 추천받은 음식 아이디 추가
			{ returnOriginal: false },
		).populate('foodData.foodId');
		return updateUser;
	}

	async deleteUser(userId: Types.ObjectId) {
		const deleteUser = await User.findOneAndDelete({ _id: userId });
		return deleteUser;
	}
}

const userModel = new UserModel();

export { userModel };
