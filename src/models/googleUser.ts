import { Schema,  model } from "mongoose";

const googleuser = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  email: {
    type: Schema.Types.String,
    required: true,
  },
  avatar: {
    type: Schema.Types.String,
    required: true,
  },
  verify: {
    type: Schema.Types.Boolean,
    required: true,
  },
  movititle:[
      Schema.Types.String
  ]
});

const GoogleUser = model("GoogleUser", googleuser);

export default GoogleUser;
