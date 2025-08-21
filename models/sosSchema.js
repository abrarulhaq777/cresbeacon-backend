import mongoose from "mongoose";
// --- MODELS ---
const sosSchema = new mongoose.Schema({
  longitude:{
    type:String,
    required : true
  },
  latitude:{
    type:String,
    required : true
  },
  userdId:{
    type:String,
    required:false
  }
});
export default mongoose.model("Sos-records", sosSchema);