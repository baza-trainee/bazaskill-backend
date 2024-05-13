/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-response';
const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
  uploadFile(
    file: Express.Multer.File,
    endFolder: string,
  ): Promise<CloudinaryResponse> {
    try {
      return new Promise<CloudinaryResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: endFolder },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        );
        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async uploadDocx(file: Express.Multer.File, endFolder: string) {
    try {
      const result = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
        {
          folder: endFolder,
          public_id: `${file.originalname}`,
          resource_type: 'raw',
          raw_convert: 'aspose',
        },
      );

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async uploadMultipleFiles(
    files: Express.Multer.File[],
    endFolder: string,
  ): Promise<CloudinaryResponse[]> {
    try {
      const uploadPromises = files.map((file) =>
        this.uploadFile(file, endFolder),
      );
      return await Promise.all(uploadPromises);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteFile(public_id: string) {
    try {
      await cloudinary.uploader.destroy(public_id);
      return { success: true };
    } catch (error) {
      console.log(error);
    }
  }

  async deleteFiles(public_ids: string[]) {
    try {
      const deletionPromises = public_ids.map((public_id) =>
        cloudinary.uploader.destroy(public_id),
      );
      await Promise.all(deletionPromises);
      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false, error: error.message }; // Optionally handle error response
    }
  }
}
