import { Request, Response } from 'express';
import User from '../models/User';

export const getUsers = async(req: Request, res: Response) => {

    const users = await User.find()

    res.status(200).json({
        ok: true,
        users
    })
}

export const getUser = async(req: Request, res: Response) => {

    const { id } = req.params;
    
    try {
        const user = await User.findById(id);

        if ( !user ) {
            return res.status(404).json({
                ok: false,
                msg: `Does not exist user with id: ${id}`
            })
        }

        res.status(200).json({
            ok: true,
            user
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Check console for details'
        })
    }
}

export const postUser = async(req: Request, res: Response) => {
    
    try {
        const user = new User(req.body);        
        await user.save();

        res.status(201).json({
            ok: true,
            user
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Check console for details'
        })
    }

}

export const updateUser = async(req: Request, res: Response) => {
    
    const { id } = req.params;
    const { name, email, password } = req.body;

    try {
        
        const user = await User.findByIdAndUpdate(id, { name, email, password })

        if ( !user ) {
            return res.status(404).json({
                ok: false,
                msg: `Does not exist user with id: ${id}`
            })
        }

        res.status(200).json({
            ok: true,
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Check console for details'
        })
    }
}

export const deleteUser = async(req: Request, res: Response) => {

    const { id } = req.params;
    
    try {
        
        const user = await User.findByIdAndDelete(id)

        if ( !user ) {
            return res.status(404).json({
                ok: false,
                msg: `Does not exist user with id: ${id}`
            })
        }

        res.status(200).json({
            ok: true,
            msg:'User deleted',
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Check console for details'
        })
    }
}