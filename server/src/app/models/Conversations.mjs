import { Schema, model } from 'mongoose';

const Conversations = new Schema(
  {
    members: {
      type: Schema.Types.Array,
      required: true,
    },
    wallpaperUrl: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

Conversations.statics.uploadFileToCloudinary = async function (file) {
  try {
    if (!file) {
      return {
        status: false,
        message: 'Missing information',
      };
    } else {
      const result = await cloudinary.uploader.upload(file, {
        upload_preset: process.env.UPLOAD_PRESET,
      });
      return {
        status: true,
        message: 'Upload successful',
        wallpaperUrl: result.secure_url,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: 'Error uploading image',
    };
  }
};

export default model('Conversations', Conversations);
