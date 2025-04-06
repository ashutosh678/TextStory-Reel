// App.js
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import MainContent from "./MainContent";
import Box from "@mui/material/Box";

function App() {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
				margin: 0,
				padding: 0,
				overflow: "hidden", // Prevents any potential scrollbars
			}}
		>
			<Header />
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					width: "100%",
					margin: 0,
					padding: 0,
					background: "#1e3c72", // Dark blue background
				}}
			>
				<MainContent />
			</Box>
			<Footer />
		</Box>
	);
}

export default App;
