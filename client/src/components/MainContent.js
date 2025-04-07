import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import DownloadIcon from "@mui/icons-material/Download";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import Paper from "@mui/material/Paper";
import { keyframes } from "@mui/system";
import axios from "axios";

// Define animations
const moveUpAnimation = keyframes`
  0% {
    transform: translateY(100vh) scale(0);
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    transform: translateY(-10vh) scale(1);
    opacity: 0;
  }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

// Bubble component
const Bubble = ({ size, duration, delay, startPosition }) => (
	<Box
		sx={{
			position: "absolute",
			bottom: -100,
			left: startPosition,
			width: size,
			height: size,
			borderRadius: "50%",
			background:
				"linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%)",
			animation: `${moveUpAnimation} ${duration}s infinite linear`,
			animationDelay: `${delay}s`,
			zIndex: 0,
		}}
	/>
);

function MainContent() {
	const [inputText, setInputText] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [reelReady, setReelReady] = useState(false);
	const [videoUrl, setVideoUrl] = useState("");

	const handleConvertClick = async () => {
		// Initiate loading; clear any previous video URL and reel state.
		setIsLoading(true);
		setReelReady(false);
		setVideoUrl("");

		try {
			// Send a POST request to your API with the story text as the payload.
			const response = await axios.post(
				"http://localhost:4000/api/v1/story-to-images",
				{ story: inputText } // Adjust the payload field name as necessary
			);

			console.log("Response from API:", response.data);

			// Check if the API returned a videoResult with a videoFilename
			if (response.status === 200 && response.data.videoResult) {
				const videoFileUrl = response.data.videoResult;
				setVideoUrl(videoFileUrl);
				setReelReady(true);
			} else {
				console.error("API did not return a valid video result.");
			}
		} catch (error) {
			console.error("Error during conversion:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleDownloadClick = () => {
		console.log("Download button clicked");
	};

	// Generate bubbles with different properties
	const bubbles = Array.from({ length: 20 }, (_, i) => ({
		size: Math.random() * 60 + 20,
		duration: Math.random() * 10 + 8,
		delay: Math.random() * 5,
		startPosition: `${Math.random() * 100}%`,
	}));

	return (
		<Box
			sx={{
				width: "100%",
				minHeight: "calc(100vh - 140px)",
				position: "relative",
				overflow: "hidden",
				background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
				py: 6,
			}}
		>
			{/* Animated Bubbles */}
			{bubbles.map((bubble, index) => (
				<Bubble key={index} {...bubble} />
			))}

			{/* Main Content */}
			<Grid
				container
				spacing={4}
				sx={{
					width: "95%",
					margin: "0 auto",
					justifyContent: "center",
					position: "relative",
					zIndex: 1,
				}}
			>
				{/* Left Section */}
				<Grid item xs={12} md={6}>
					<Paper
						elevation={3}
						sx={{
							p: 4,
							height: "100%",
							background: "rgba(255, 255, 255, 0.1)",
							backdropFilter: "blur(10px)",
							borderRadius: 2,
							border: "1px solid rgba(255, 255, 255, 0.2)",
							transition: "all 0.3s ease-in-out",
							"&:hover": {
								transform: "translateY(-5px)",
								boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
							},
						}}
					>
						<Typography
							variant="h5"
							sx={{
								mb: 3,
								fontWeight: 500,
								color: "white",
							}}
						>
							Enter Your Story:
						</Typography>
						<TextField
							placeholder="Paste your text here..."
							multiline
							rows={15}
							value={inputText}
							onChange={(e) => setInputText(e.target.value)}
							variant="outlined"
							fullWidth
							sx={{
								mb: 3,
								"& .MuiOutlinedInput-root": {
									backgroundColor: "rgba(255, 255, 255, 0.9)",
									borderRadius: 1,
									transition: "all 0.3s ease",
									"&:hover": {
										backgroundColor: "rgba(255, 255, 255, 1)",
									},
								},
							}}
						/>
						<Button
							variant="contained"
							fullWidth
							onClick={handleConvertClick}
							disabled={isLoading || inputText.trim() === ""}
							sx={{
								py: 1.5,
								background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
								borderRadius: 1,
								textTransform: "none",
								fontSize: "1rem",
								transition: "all 0.3s ease",
								"&:hover": {
									transform: "scale(1.02)",
									boxShadow: "0 6px 15px rgba(33,150,243,0.4)",
								},
							}}
						>
							Convert →
						</Button>
					</Paper>
				</Grid>

				{/* Right Section */}
				<Grid item xs={12} md={6}>
					<Paper
						elevation={3}
						sx={{
							p: 4,
							height: "100%",
							background: "rgba(255, 255, 255, 0.1)",
							backdropFilter: "blur(10px)",
							borderRadius: 2,
							border: "1px solid rgba(255, 255, 255, 0.2)",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							minHeight: 520,
							transition: "all 0.3s ease-in-out",
							"&:hover": {
								transform: "translateY(-5px)",
								boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
							},
						}}
					>
						{isLoading ? (
							<Box sx={{ textAlign: "center" }}>
								<CircularProgress
									size={60}
									sx={{
										color: "#2196F3",
										animation: `${pulseAnimation} 1.5s infinite`,
									}}
								/>
								<Typography
									variant="h6"
									sx={{
										mt: 2,
										color: "white",
										animation: `${floatAnimation} 2s infinite`,
									}}
								>
									Generating your reel...
								</Typography>
							</Box>
						) : reelReady && videoUrl ? (
							<Box sx={{ textAlign: "center", width: "100%" }}>
								<Typography variant="h6" gutterBottom sx={{ color: "white" }}>
									Reel Preview
								</Typography>
								<Box
									sx={{
										mb: 3,
										width: "100%",
										borderRadius: 1,
										overflow: "hidden",
									}}
								>
									{/* Render HTML5 video player */}
									<video width="100%" height="300" controls>
										<source src={videoUrl} type="video/mp4" />
										Your browser does not support the video tag.
									</video>
								</Box>
								<Button
									variant="contained"
									startIcon={<DownloadIcon />}
									onClick={handleDownloadClick}
									sx={{
										background:
											"linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
										borderRadius: 1,
										textTransform: "none",
										fontSize: "1rem",
										transition: "all 0.3s ease",
										"&:hover": {
											transform: "scale(1.05)",
											boxShadow: "0 6px 15px rgba(33,150,243,0.4)",
										},
									}}
								>
									Download Reel
								</Button>
							</Box>
						) : (
							<Box sx={{ textAlign: "center", color: "white" }}>
								<MovieCreationIcon
									sx={{
										fontSize: 80,
										mb: 2,
										color: "#2196F3",
										animation: `${floatAnimation} 3s infinite ease-in-out`,
									}}
								/>
								<Typography
									variant="h5"
									gutterBottom
									sx={{
										animation: `${pulseAnimation} 2s infinite ease-in-out`,
									}}
								>
									Ready to create?
								</Typography>
								<Typography>
									Paste your story on the left and click "Convert".
								</Typography>
							</Box>
						)}
					</Paper>
				</Grid>
			</Grid>
		</Box>
	);
}

export default MainContent;
