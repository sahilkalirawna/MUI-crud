import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { ToastContainer } from "react-toastify";

import Dashboard from "./components/Dashboard";
import Header from "./components/Header";

const defaultTheme = createTheme();

const App = () => {
	return (
		<>
			<ThemeProvider theme={defaultTheme}>
				<Header>
					<Dashboard />
				</Header>
			</ThemeProvider>
			<ToastContainer />
		</>
	);
};

export default App;
