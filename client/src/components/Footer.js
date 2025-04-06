import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { keyframes } from "@mui/system";
import FavoriteIcon from "@mui/icons-material/Favorite"; // Import heart icon

// Define animations
const heartBeat = keyframes`
  0% { transform: scale(1); }
  25% { transform: scale(1.2); }
  50% { transform: scale(1); }
  75% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<Box
			component="footer"
			sx={{
				py: 2.5,
				px: 2,
				mt: "auto",
				background: "linear-gradient(90deg, #1e3c72 0%, #2a5298 100%)",
				textAlign: "center",
				position: "relative",
				overflow: "hidden",
				borderTop: "1px solid rgba(255, 255, 255, 0.1)",
				"&::before": {
					content: '""',
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					height: "1px",
					background:
						"linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
					animation: `${shimmer} 2s infinite linear`,
				},
			}}
		>
			<Typography
				variant="body2"
				sx={{
					color: "rgba(255, 255, 255, 0.9)",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					gap: 0.5,
					fontWeight: 300,
					letterSpacing: "0.5px",
					"& .highlight": {
						color: "#64B5F6",
						fontWeight: 500,
						transition: "color 0.3s ease",
						"&:hover": {
							color: "#90CAF9",
						},
					},
				}}
			>
				Designed and Developed with{" "}
				<FavoriteIcon
					sx={{
						color: "#FF5252",
						fontSize: "1.2rem",
						animation: `${heartBeat} 1.5s infinite`,
						"&:hover": {
							color: "#FF1744",
						},
					}}
				/>{" "}
				by <span className="highlight">Ashutosh</span> ©{" "}
				<span className="highlight">{currentYear}</span>
			</Typography>
		</Box>
	);
}

export default Footer;
