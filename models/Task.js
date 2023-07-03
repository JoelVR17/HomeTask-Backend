import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    state: {
      type: Boolean,
      default: false,
    },
    deadline: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    priority: {
      type: String,
      trim: true,
      enum: ["Low", "Medium", "High"],
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  },
  {
    // create createdAt and updateAt
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
