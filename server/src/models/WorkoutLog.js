import mongoose from "mongoose";

const SetSchema = new mongoose.Schema(
  {
    reps: {
      type: Number,
      required: true,
      min: 1
    },
    weight: {
      type: Number,
      required: true,
      min: 0
    }
  },
  { _id: false }
);

const WorkoutLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    date: {
      type: String, 
      required: true,
      index: true
    },

    exercise: {
      type: String,
      required: true,
      trim: true
    },

    muscleGroup: {
      type: String,
      required: true,
      enum: [
        "chest",
        "back",
        "legs",
        "shoulders",
        "biceps",
        "triceps",
        "core"
      ],
      index: true
    },

    sets: {
      type: [SetSchema],
      required: true,
      validate: {
        validator: v => Array.isArray(v) && v.length > 0,
        message: "Workout must have at least one set"
      }
    }
  },
  { timestamps: true }
);

WorkoutLogSchema.index({ userId: 1, date: 1 });

export default mongoose.model("WorkoutLog", WorkoutLogSchema);
