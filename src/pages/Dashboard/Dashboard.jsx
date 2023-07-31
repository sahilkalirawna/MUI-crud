import { useState } from "react";
import moment from "moment/moment";

import { Button, Chip, Grid, IconButton, Paper, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Axios from "../../services/api/Config";
import Table from "../../components/common/Table";
import {
	deletePatientURL,
	patientListURL,
} from "../../services/api/routes/common";

import DeletePatientModel from "./components/DeletePatientModel";
import AddEditPatientModel from "./components/AddEditPatientModel";

const Dashboard = () => {
	const [isDeleteLoading, setIsDeleteLoading] = useState(false);
	const [refreshToggle, setRefreshToggle] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(null);

	const [isEdit, setIsEdit] = useState(false);
	const [rowValue, setRowValue] = useState(null);
	const [addEditModel, setAddEditModel] = useState(false);

	const tableColumn = [
		{
			field: "patientCode",
			headerName: "Patient ID",
			minWidth: 100,
			hideable: false,
			renderCell: ({ row }) => <strong>{row?.patientCode}</strong>,
		},
		{
			field: "name",
			headerName: "Patient Name",
			minWidth: 180,
			hideable: false,
			renderCell: ({ row }) => {
				return <>{row?.name}</>;
			},
		},
		{
			field: "sex",
			headerName: "Gender",
			minWidth: 80,
		},
		{
			field: "category",
			headerName: "Category",
			minWidth: 170,
		},
		{
			field: "bloodGroup",
			headerName: "Blood Group",
			minWidth: 90,
		},
		{
			field: "eligibilityGrade",
			headerName: "Eligibility Grade",
			minWidth: 80,
		},
		{
			field: "dateOfBirth",
			headerName: "DOB",
			minWidth: 120,
			renderCell: ({ row }) => (
				<>{moment(row?.dateOfBirth).format("DD-MMM-YYYY")}</>
			),
		},
		{
			field: "status",
			headerName: "Status",
			minWidth: 150,
			renderCell: ({ row }) => (
				<>
					<Chip
						size='small'
						label={`${row?.status}`}
						color={`${getStatusBadgeColor(row?.status)}`}
					/>
				</>
			),
		},
		{
			field: "_id",
			headerName: "Actions",
			align: "right",
			headerAlign: "right",
			renderCell: ({ row }) => (
				<>
					<Tooltip title='Edit Patient' placement='top' arrow>
						<IconButton onClick={() => handleAddEditModelOpen(row)}>
							<EditIcon />
						</IconButton>
					</Tooltip>
					<Tooltip title='Delete Patient' placement='top' arrow>
						<IconButton color='error' onClick={() => handleDeleteOpen(row)}>
							<DeleteIcon />
						</IconButton>
					</Tooltip>
				</>
			),
		},
	];

	const getStatusBadgeColor = (status) => {
		if (status === "Terminated") return "default";
		if (status === "Superannuated") return "info";
		return "success";
	};

	const handleAddEditModelOpen = (value = false) => {
		setAddEditModel(true);
		if (value) {
			setIsEdit(true);
			setRowValue(value);
		}
	};

	const handleAddEditModelClose = () => {
		setAddEditModel(null);
		if (isEdit) {
			setIsEdit(false);
			setRowValue(null);
		}
		setRefreshToggle((prev) => !prev);
	};

	const handleDeleteClose = () => setDeleteOpen(null);
	const handleDeleteOpen = (row) => setDeleteOpen(row);

	const handleDelete = () => {
		setIsDeleteLoading(true);
		Axios({ ...deletePatientURL(deleteOpen?._id) })
			.then(() => {
				handleDeleteClose();
				setRefreshToggle((prev) => !prev);
			})
			.finally(() => {
				setIsDeleteLoading(false);
			});
	};

	return (
		<>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Paper
						sx={{
							p: 2,
							display: "flex",
							flexDirection: "column",
						}}>
						<div className='d-flex justify-content-between mb-3'>
							<h4>Patients</h4>
							<Button
								size='small'
								variant='contained'
								sx={{ textTransform: "none" }}
								startIcon={<AddIcon />}
								onClick={() => handleAddEditModelOpen(false)}>
								Add Patient
							</Button>
						</div>
						<Table
							columns={tableColumn}
							dataURL={patientListURL}
							checkEqual={refreshToggle}
						/>
					</Paper>
				</Grid>
			</Grid>

			<AddEditPatientModel
				isEdit={isEdit}
				isVisible={addEditModel}
				rowValue={rowValue}
				onClose={handleAddEditModelClose}
			/>

			<DeletePatientModel
				deleteOpen={deleteOpen}
				handleDeleteClose={handleDeleteClose}
				isDeleteLoading={isDeleteLoading}
				handleDelete={handleDelete}
			/>
		</>
	);
};

export default Dashboard;
