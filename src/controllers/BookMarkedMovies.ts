import { Movies, User } from "models";
import { Request, Response } from "express";

export const addMovieTitle = async (req: Request, res: Response) => {
  const { title, name } = req.body;
  const user = await User.findOne({ name });
  if (!user) {
    return res.status(422).json({ message: "User not found" });
  }
  const movie = await Movies.findOne({title: title });
  if (!movie) {
    return res.status(422).json({ message: "Movie data not found" });
  }
  

  user.movititle.push(title);
  await user.save();


  await Movies.findOneAndUpdate({ title: title },
    { isBookmarked: !movie.isBookmarked }
  );


  return res.json({ message: "Movie title added" });
};



