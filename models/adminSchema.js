import mongoose from "mongoose";
// --- MODELS ---
const AdminSchema = new mongoose.Schema({
  email:{
    type:String,
    required : true
  },
  password:{
    type:String,
    required : true
  },
   expoPushToken:{
    type:String,
    required : false
  },
   role:{
    type:String,
    required : true
  }
});
export default mongoose.model("Admin", AdminSchema);