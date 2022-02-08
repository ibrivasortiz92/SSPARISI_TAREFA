import express from 'express';
import { User } from '../entities/User';
import { validate } from 'class-validator';

// GET USERS CONTROLLER
const getUsers = async (req:express.Request, res:express.Response) => {

    // GET ALL USERS
    const users = await User.find();

    return res.status(200).json({
        success: true,
        data: users,
    });
    // return res.json({msg: 'OK'});

}

// CREATE USER CONTROLLER
const createUser = async (req:express.Request, res:express.Response) => {

    // GET DATA
    const {
        name, 
        cnpj, 
        address, 
        emails,
    } = req.body;
    
    // CHECK NAME AND CNPJ
    if(!name || !cnpj) {
        return res.status(400).json({
            success: false,
            msg: `name and cnpj required`
        });
    }

    // CREATE AND SAVE USER 
    const user = await User.create({
        name: name,
        cnpj: cnpj,
        address: address,
        emails: emails,
    });

    const errors = await validate(user);
    if(errors.length != 0){
        return res.status(400).json({
            success: false,
            msg: errors,
        });
    }

    await user.save();

    return res.status(201).json({
        success: true,
        data: user,
    });
    
}

// EXPORT
export {
    getUsers,
    createUser,
}