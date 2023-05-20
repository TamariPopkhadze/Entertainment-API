import { Request, Response } from "express";
import { Movies } from "models";

export const Home = async (_req: Request, res: Response) => {
  const data = await Movies.find();
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
};

export const GetMovies = async (_req: Request, res: Response) => {
  const data = await Movies.find({ category: "Movie" });
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
};

export const TvSeries = async (_req: Request, res: Response) => {
  const data = await Movies.find({ category: "TV Series" });
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
};
