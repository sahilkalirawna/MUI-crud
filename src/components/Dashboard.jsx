import { Grid, Paper } from "@mui/material";

const Dashboard = () => {
	return (
		<Grid container spacing={3}>
			<Grid item xs={12}>
				<Paper
					sx={{
						p: 2,
						display: "flex",
						flexDirection: "column",
					}}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias dolorem blanditiis voluptates reprehenderit ab minima doloremque numquam ducimus, dignissimos placeat.
					</Paper>
			</Grid>
		</Grid>
	);
};

export default Dashboard;
