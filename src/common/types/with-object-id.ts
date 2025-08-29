import mongoose from "mongoose";

export interface WithObjectId {
    _id: mongoose.Types.ObjectId;
}
