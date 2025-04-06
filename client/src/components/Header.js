import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { keyframes } from "@mui/system";
import MovieIcon from "@mui/icons-material/Movie"; // Import movie icon
import Box from "@mui/material/Box";

// Define animations
const gradientMove = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-3px); }
  100% { transform: translateY(0px); }
`;

const shimmer = keyframes`
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
`;

function Header() {
	return (
		<AppBar
			position="static"
			sx={{
				background:
					"linear-gradient(-45deg, #1e3c72, #2a5298, #2196F3, #64B5F6)",
				backgroundSize: "400% 400%",
				animation: `${gradientMove} 15s ease infinite`,
				boxShadow: "0 3px 15px rgba(33, 150, 243, 0.3)",
				position: "relative",
				"&::after": {
					content: '""',
					position: "absolute",
					bottom: 0,
					left: 0,
					right: 0,
					height: "2px",
					background:
						"linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
					animation: `${shimmer} 2s infinite`,
				},
			}}
		>
			<Toolbar sx={{ py: 1 }}>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						gap: 1.5,
						animation: `${float} 3s ease infinite`,
					}}
				>
					<MovieIcon
						sx={{
							fontSize: 28,
							color: "rgba(255,255,255,0.9)",
							transition: "transform 0.3s ease",
							"&:hover": {
								transform: "rotate(10deg)",
							},
						}}
					/>
					<Typography
						variant="h6"
						component="div"
						sx={{
							flexGrow: 1,
							fontWeight: 500,
							letterSpacing: "0.5px",
							background: "linear-gradient(90deg, #FFFFFF, #E3F2FD)",
							backgroundClip: "text",
							textFillColor: "transparent",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
							textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
							position: "relative",
							"&::after": {
								content: '""',
								position: "absolute",
								bottom: -2,
								left: 0,
								width: 0,
								height: "2px",
								background: "rgba(255,255,255,0.7)",
								transition: "width 0.3s ease",
							},
							"&:hover::after": {
								width: "100%",
							},
						}}
					>
						Convert your story to Text
					</Typography>
				</Box>
			</Toolbar>
		</AppBar>
	);
}

export default Header;
