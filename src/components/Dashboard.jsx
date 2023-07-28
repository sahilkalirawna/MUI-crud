import { Grid, Paper } from "@mui/material";
import Table from "./common/Table";
import { patientListURL } from "../services/api/routes/common";

const Dashboard = () => {
	const tableColumn = [
		{
			field: "name",
			headerName: "Patient Name",
			minWidth: 150,
			hideable: false,
			renderCell: ({ row }) => {
				console.log("ska params", row);
				return (
					<strong>
						{/* {params.value.getFullYear()} */}
						{/* <Button
						variant='contained'
						size='small'
						style={{ marginLeft: 16 }}
						tabIndex={params.hasFocus ? 0 : -1}>
						Open
					</Button> */}
						321321
					</strong>
				);
			},
		},
		{ field: "age" },
	];

	return (
		<Grid container spacing={3}>
			<Grid item xs={12}>
				<Paper
					sx={{
						p: 2,
						display: "flex",
						flexDirection: "column",
					}}>
					<Table columns={tableColumn} dataURL={patientListURL} />
				</Paper>
			</Grid>
		</Grid>
	);
};

export default Dashboard;
