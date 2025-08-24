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
  name:{
    type:String,
    required : true
  },
  registerNumber:{
    type:String,
    required : true
  },
   role:{
    type:String,
    required : true
  }
});
export default mongoose.model("Admin", AdminSchema);