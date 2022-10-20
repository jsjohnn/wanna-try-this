import jwt from 'jsonwebtoken';
import { Router, Request, Response, NextFunction } from 'express';


export const setUserToken = (user: any, res: Response) => {
	const { nickname, email, provider } = user;
	const token = jwt.sign({ nickname, email, provider }, process.env.JWT_SECRET as string);
	res.cookie('jwtToken', token);
};
