import mongoose, {model,  Schema } from "mongoose";

const UserSchema= new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

export const UserModel = model("User", UserSchema);



const ContentSchema = new Schema({
    title:{type:String , required :true },
    link : String,
    tags:[{type: mongoose.Types.ObjectId, ref :'Tag'}],
    userId:{type : mongoose.Types.ObjectId , ref: 'User', required:true} ,
})


export const ContentModel = model("Content", ContentSchema);





const LinkSchema = new Schema({
 
    /// it is the last small strings

    // 'userId' is a reference to the 'User' collection in the database.
    // It uses Mongoose's ObjectId type for relational data.
    // The 'ref' property specifies the referenced collection name ('User').
    // The 'required' property ensures this field must be provided when creating a document.
    // The 'unique' property enforces that each 'userId' in this collection is unique.

    
    hash: String,   
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true },
});

// Exporting the LinkModel based on the LinkSchema
// The model represents the 'Links' collection in the database
export const LinkModel = model("Links", LinkSchema);