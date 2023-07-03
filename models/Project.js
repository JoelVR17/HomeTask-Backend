import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    deadline: {
      type: Date,
      default: Date.now(),
    },
    client: {
      type: String,
      required: true,
      trim: true,
    },
    creator: {
      // FK
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    collaborators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    // create createdAt and updateAt
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
