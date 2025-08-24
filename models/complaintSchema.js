import mongoose from "mongoose";
// --- MODELS ---
const complaintSchema = new mongoose.Schema({
  name:{
    type:String,
    required : true
  },
  subject:{
    type:String,
    required : true
  },
  detailedDescription:{
    type:String,
    required:true
  },
  location:{
    type:String,
    required:false
  },
});
export default mongoose.model("complaints", complaintSchema);