import Video from "../models/Video.js"
import Comment from "../models/Comment.js"
import { createError } from "../error.js"

export const addComment = async (req,res,next) =>{
    const newComment = new Comment({...req.body , userId :req.user.id})
    try {
        const savedCommment = await newComment.save()
        res.status(200).send(savedCommment)
    }catch(err){
        next(err)
    }
}
export const deleteComment = async (req,res,next) =>{
    try {
        const commment = await Comment.findbyId(req.params.id)
        const video = await Video.findbyId(req.params.id)
        if (req.user.id === commment.userId || req.user.id === vidoe.userId){
                await Comment.findByIdAndDelete(req.params.id)
                res.status(200).json("the commment has been deleted")
        }else{
            return next(createError(403 , "You can delete only comment !    "))
        }
    }catch(err){
        next(err)
    }
}
export const getComments = async (req,res,next) =>{
    try {
        const comments = await Comment.find({videoId : req.params.videoId})
        res.status(200).json(comments)
    }catch(err){
        next(err)
    }
}
