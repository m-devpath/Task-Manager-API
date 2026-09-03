import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        minLength: 2,
        maxLength: 100,
    },

    description: {
        type: String,
        trim: true,
        maxLength: 500
    },

    status: {
        type: String,
        enum: ["pending", "in-progress", "completed"],
        default: "pending"
    },

    dueDate:{ 
        type: Date
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    
}, {timestamps: true});

const Task = mongoose.model("Task", taskSchema);
   
export default Task;