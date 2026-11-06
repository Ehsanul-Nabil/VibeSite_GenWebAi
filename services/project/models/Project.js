import mongoose, { Schema } from "mongoose";

const MessageSchema = new Schema(
  {
    role: {
        type: String, 
        enum: ["user", "assistant"], 
        required: true 
    },
    content: {
        type: String, 
        required: true 
    },

    timestamp: { 
        type: Date, 
        default: Date.now 
    },
  },
  { _id: false },
);

const PlannedFileSchema = new Schema(
  {
    path: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
  },
  { _id: false },
);

const ProjectSchema = new Schema(
  {
    name: { 
        type: String, 
        required: true, 
        default: "Untitled Project" 
    },
    description: { 
        type: String, 
        default: "" 
    },
    files: { 
        type: Schema.Types.Mixed, 
        default: {} 
    },
    messages: { 
        type: [MessageSchema], 
        default: [] 
    },
    version: { 
        type: Number, 
        default: 0 
    },
    owner: { 
        type: Schema.Types.ObjectId, 
        ref: "User", required: true 
    },
    published: { 
        type: Boolean, 
        default: false 
    },
    status: {
      type: String,
      enum: ["pending", "generating", "revising", "completed", "failed"],
      default: "pending",
    },
    filesPlanned: { 
        type: [PlannedFileSchema], 
        default: [] 
    },
    filesGenerated: { 
        type: [String], 
        default: [] 
    },
    currentFile: { 
        type: String, 
        default: null 
    },
    error: { 
        type: String, 
        default: null 
    },

  },
  { timestamps: true },
);

export const Project = mongoose.model("Project", ProjectSchema);







// files: {
//     "/styles.css": {
//       content: "@import url('https://fonts.googleapis.com/...');\n\nbody {\n  margin: 0;\n}",
//       hash: "79e3c8a91608"
//     },
//     "/App.js": {
//       content: "import React, { useState } from 'react';\nimport Header from './components/Header';\nimport ProductGrid from './components/ProductGrid';",
//       hash: "d54b582e9b49"
//     },
//     "/index.js": {
//       content: "import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App';",
//       hash: "a1b2c3d4e5f6"
//     },
//     "/public/index.html": {
//       content: "<!DOCTYPE html>\n<html lang=\"en\">\n  <head><title>App</title></head>\n  <body><div id=\"root\"></div></body>\n</html>",
//       hash: "8f7e6d5c4b3a"
//     },
//     "/package.json": {
//       content: "{\n  \"name\": \"my-app\",\n  \"version\": \"1.0.0\",\n  \"dependencies\": {\n    \"react\": \"^18.2.0\"\n  }\n}",
//       hash: "123456789abc"
//     },
//     "/components/Header.js": {
//       content: "export default function Header() { return <header>Header</header>; }",
//       hash: "987654321cba"
//     }
//   }



// import mongoose from "mongoose";

// const messageSchema=new mongoose.Schema({
//     role:{
//         type:String,
//         enum:["ai","user"],
//         required:true
//     },
//     content:{
//         type:String,
//         required:true
//     }
// },{timestamps:true})

// const websiteSchema=new mongoose.Schema({
//     user:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"User",
//         required:true
//     },
//     title:{
//         type:String,
//         default:"Untitled Website"
//     },
//     latestCode:{
//         type:String,
//         required:true
//     },
//     conversation:[
//         messageSchema
//     ],
//     deployed:{
//         type:Boolean,
//         default:false
//     },
//     deployUrl:{
//         type:String,
//     },
//     slug:{
//         type:String,
//         unique:true
//     }
// },{timestamps:true})

// const Website=mongoose.model("Website",websiteSchema)
// export default Website