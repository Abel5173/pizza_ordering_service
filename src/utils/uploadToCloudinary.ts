import cloudinary from "@/libs/cloudinary";
import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";

type UploadToCloudinaryResponse = 
    { success: true; result?: UploadApiResponse } |
    { success: false; error: UploadApiErrorResponse };


const uploadToCloudinary = (fileUrl: string, fileName: string): 
    Promise<UploadToCloudinaryResponse> => {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(fileUrl, {
                invalidate: true,
                resource_type: 'auto',
                filename_override: fileName,
                folder: 'pizza-ordering-app',
                use_filename: true, // Use the filename as the public_id
            })
            .then((result) => {
                resolve({ success: true, result });
            })
            .catch((error) => {
                reject({ success: false, error });
            });
        })
    }

export default uploadToCloudinary;