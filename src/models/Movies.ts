import { Schema, model } from "mongoose";

const movies = new Schema({
    id:{
        type: Schema.Types.Number,
        required:true
    },
    title:{
        type: Schema.Types.String,
        required:true
    },
    thumbnail:{
        trending:{
            small:{
                type: Schema.Types.String,
                required:true
            },
            large:{
                type: Schema.Types.String,
                required:true
            },
        },
        regular:{
            small:{
                type: Schema.Types.String,
                required:true
            },
            medium:{
                type: Schema.Types.String,
                required:true
            },
            large:{
                type: Schema.Types.String,
                required:true
            },
        }
    },
    year:{
        type: Schema.Types.Number,
        required:true
    },
    category:{
        type: Schema.Types.String,
        required:true
    },
    rating: {
        type: Schema.Types.String,
        required:true
    },
    isBookmarked: {
        type: Schema.Types.Boolean,
        required:true
    },
    isTrending: {
        type: Schema.Types.Boolean,
        required:true
    }
});

const Movies = model("Movies", movies);

export default Movies;