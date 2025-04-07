import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import path from "path";
import fs from "fs"; // Import fs to check file existence

// Configure Cloudinary with your credentials from environment variables
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Define the uploadVideo function
const uploadVideo = async (filePath: string): Promise<UploadApiResponse> => {
	try {
		console.log(`Uploading video from path: ${filePath}`);
		const result = await cloudinary.uploader.upload(filePath, {
			resource_type: "video",
		});
		return result;
	} catch (error) {
		console.error("Upload error:", error);
		throw new Error(
			"Error uploading video to Cloudinary: " + (error as Error).message
		);
	}
};

// New function to upload a video from the specified directory
const uploadVideoFromDirectory = async (
	videoBaseName: string
): Promise<UploadApiResponse> => {
	const videoFilePath = path.join(
		__dirname,
		"../../outputs/videos",
		videoBaseName
	);

	// Check if the file exists
	if (!fs.existsSync(videoFilePath)) {
		throw new Error(`Video file not found at path: ${videoFilePath}`);
	}

	return await uploadVideo(videoFilePath);
};

export { uploadVideo, uploadVideoFromDirectory };
