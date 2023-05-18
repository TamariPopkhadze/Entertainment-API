import {Request, Response } from "express";
import Movies from '../models/movies.js'

export const Home = async  (req: Request,res: Response) =>{
    const data = await Movies.find()
    const newData = data.map((data) => {
        return {
          id: data.id,
          title: data.title,
          thumbnail: data.thumbnail,
          year: data.year,
          category: data.category,
          rating: data.rating,
          isBookmarked: data.isBookmarked,
          isTrending: data.isTrending,
        };
      });
    
      return res.status(200).json(newData);
}