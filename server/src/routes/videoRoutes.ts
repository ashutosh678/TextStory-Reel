import { Router, Request, Response, NextFunction } from "express";
import { uploadVideoFromDirectory } from "../services/cloudinaryService";

const router = Router();

// Route to upload a video from the specified directory
router.post(
	"/upload-video/:videoName",
	async (req: Request, res: Response, next: NextFunction) => {
		const videoName = req.params.videoName;

		try {
			const uploadResult = await uploadVideoFromDirectory(videoName);
			res.status(200).json({
				message: "Video uploaded successfully",
				uploadResult,
			});
		} catch (error) {
			console.error("Error uploading video:", error);
			res.status(500).json({
				message: "Error uploading video",
				error: error,
			});
		}
	}
);

export default router;
