import { createError } from "../error.js"
import User from "../models/User.js"
import Video from "../models/Video.js";

export const update = async (req, res, next)=>{
    if (req.params.id === req.user.id){
        try{
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body
                    
                },
                {new: true}
                
                );
                // console.log(updatedUser)
            res.status(200).json(updatedUser) 
        }catch (err) {
            next(err);
        }
    }else{
        return next(createError(403, "You can update only your account!"))
    }
}
export const deleteUser = async (req, res, next)=>{
    if (req.params.id === req.user.id){
        try{
           await User.findByIdAndDelete(
                req.params.id,
                

            );
            res.status(200).json("User has been deleted") 
        }catch (err) {
            next(err);
        }
    }else{
        return next(createError(403, "You can delete only your account!"))
    }
}
export const getUser = async (req, res, next)=>{
    try{
        const user =await User.findById(req.params.id)
        res.status(200).json(user)
    }catch(err){
        next()
    }


}
export const subscribe = async  (req, res, next)=>{
    try{
        await User.findByIdAndUpdate(req.params.id,{
            $push:{subscribedUsers: req.params.id}
        })
        await User.findByIdAndUpdate(req.params.id,{
            $inc:{ subscribers: 1 }
        })
        res.status(200).json("subecription successfully !")
    }catch(err){
        next(err)
    }
}
export const unsubscribe = async (req, res, next)=>{
    try{
        await User.findByIdAndUpdate(req.params.id,{
            $pull:{subscribedUsers: req.params.id}
        })
        await User.findByIdAndUpdate(req.params.id,{
            $inc:{ subscribers: -1 }
        })
        res.status(200).json("Unsubecription successfully !")
    }catch(err){
        next(err)
    }
}
export const like = async (req, res, next)=>{

    const id = req.user.id
    const vidoeId = req.user.vidoeId
    try{
        await Video.findByIdAndUpdate(vidoeId,{
            $addToSet: {likes:id},
            $pull: {dislikes:id}
        })
        res.status(200).json("This video has been liked")
    }catch(err){

    }
}
export const dislike = async (req, res, next)=>{
    const id = req.user.id
    const vidoeId = req.params.vidoeId
    try{
        await Video.findByIdAndUpdate(vidoeId,{
            $addToSet: {dislikes:id},
            $pull: {likes:id}
        })
        res.status(200).json("This video has been disçliked")
    }catch(err){

    }

}
