import { useState } from "react";
import moment from "moment/moment";

import { Button, Chip, Grid, IconButton, Paper, Tooltip } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Axios from "../../services/api/Config";
import Table from "../../components/common/Table";
import { deletePatientURL } from "../../services/api/routes/common";

import DeletePatientModel from "./components/DeletePatientModel";
import AddEditPatientModel from "./components/AddEditPatientModel";

const Dashboard = () => {

	const [isDeleteLoading, setIsDeleteLoading] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(null)

	const [isEdit, setIsEdit] = useState(false)
	const [rowValue, setRowValue] = useState(null)
	const [addEditModel, setAddEditModel] = useState(false)

	const tableData = [{
		"patientCode": "PC062",
		"name": "Bowie Oliva",
		"sex": "Male",
		"category": "Non-Dependent",
		"address": "30 Main Parkway",
		"employeeNo": "EMP7259",
		"_id": "dA9AcBA5DD1A60eBA4bE13B1",
		"eligibilityGrade": "C3",
		"bloodGroup": "B+",
		"dateOfBirth": "1989-02-09",
		"contactDetails": "2819706460",
		"highRiskPatient": true,
		"status": "Active",
		"allergyDetails": ["64c2080dff5cddef6fca21d8"]
	}, {
		"patientCode": "PC932",
		"name": "Eduardo Ilyin",
		"sex": "Male",
		"category": "Emergency Patient",
		"address": "63 Forest Drive",
		"employeeNo": "EMP4975",
		"_id": "eaBCBc2c2f1dA7DDDF945f1A",
		"eligibilityGrade": "A2",
		"bloodGroup": "A+",
		"dateOfBirth": "1995-11-13",
		"contactDetails": "8424823045",
		"highRiskPatient": true,
		"status": "Terminated",
		"allergyDetails": ["64c2080dff5cddef6fca21d8"]
	}, {
		"patientCode": "PC081",
		"name": "Anthe Cloake",
		"sex": "Female",
		"category": "Non-Dependent",
		"address": "892 Hagan Circle",
		"employeeNo": "EMP4676",
		"_id": "6dB1c8CE81ABbE2d7eE5a4A6",
		"eligibilityGrade": "A1",
		"bloodGroup": "A-",
		"dateOfBirth": "1967-11-04",
		"contactDetails": "7313524165",
		"highRiskPatient": false,
		"status": "Superannuated",
		"allergyDetails": ["64c2080dff5cddef6fca21d8"]
	}, {
		"patientCode": "PC872",
		"name": "Loleta Libbis",
		"sex": "Female",
		"category": "Non-Dependent",
		"address": "36010 Dovetail Trail",
		"employeeNo": "EMP8673",
		"_id": "bEb4dB4bcdBA9B3bfD0C5b9B",
		"eligibilityGrade": "A2",
		"bloodGroup": "B+",
		"dateOfBirth": "1971-03-26",
		"contactDetails": "9454504335",
		"highRiskPatient": false,
		"status": "Terminated",
		"allergyDetails": ["64c2080dff5cddef6fca21d8"]
	}, {
		"patientCode": "PC866",
		"name": "Franklin Pearl",
		"sex": "Male",
		"category": "Emergency Patient",
		"address": "57 Sachtjen Avenue",
		"employeeNo": "EMP8644",
		"_id": "BaE01c5Cad686b38bDb1498A",
		"eligibilityGrade": "C2",
		"bloodGroup": "AB-",
		"dateOfBirth": "1958-01-11",
		"contactDetails": "6149456004",
		"highRiskPatient": false,
		"status": "Superannuated",
		"allergyDetails": ["64c2080dff5cddef6fca21d8"]
	}, {
		"patientCode": "PC408",
		"name": "Towney Whapple",
		"sex": "Male",
		"category": "Employee",
		"address": "560 West Street",
		"employeeNo": "EMP4119",
		"_id": "92fDfDd5AeC9AEABCdA7c7fa",
		"eligibilityGrade": "A1",
		"bloodGroup": "B-",
		"dateOfBirth": "1972-11-08",
		"contactDetails": "6763438541",
		"highRiskPatient": false,
		"status": "Superannuated",
		"allergyDetails": ["64c2080dff5cddef6fca21d8"]
	}, {
		"patientCode": "PC377",
		"name": "Quint Mitchelson",
		"sex": "Male",
		"category": "Dependent",
		"address": "56 Hudson Crossing",
		"employeeNo": "EMP7208",
		"_id": "DBbaEc79BE2BaCbe1b0bfd8A",
		"eligibilityGrade": "A3",
		"bloodGroup": "A+",
		"dateOfBirth": "1976-10-23",
		"contactDetails": "2369401286",
		"highRiskPatient": false,
		"status": "Terminated",
		"allergyDetails": ["64c2080dff5cddef6fca21d8"]
	}];

	const tableColumn = [
		{
			field: "patientCode",
			headerName: "Patient ID",
			minWidth: 100,
			hideable: false,
			renderCell: ({ row }) => (
				<strong>
					{row?.patientCode}
				</strong>
			),
		},
		{
			field: "name",
			headerName: "Patient Name",
			minWidth: 180,
			hideable: false,
			renderCell: ({ row }) => {
				return (
					<>
						{row?.name}
					</>
				);
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
				<>
					{moment(row?.dateOfBirth).format('DD-MM-YYYY')}
				</>
			),
		},
		{
			field: "status",
			headerName: "Status",
			minWidth: 150,
			renderCell: ({ row }) => (
				<>
					<Chip
						size="small"
						label={`${row?.status}`}
						color={`${getStatusBadgeColor(row?.status)}`}
					/>
				</>
			),
		},
		{
			field: "_id",
			headerName: "Actions",
			align: 'right',
			headerAlign: 'right',
			renderCell: ({ row }) => (
				<>
					<Tooltip title="Edit Patient" placement="top" arrow>
						<IconButton onClick={() => handleAddEditModelOpen(row)}>
							<EditIcon />
						</IconButton>
					</Tooltip>
					<Tooltip title="Delete Patient" placement="top" arrow>
						<IconButton color="error" onClick={() => handleDeleteOpen(row)}>
							<DeleteIcon />
						</IconButton>
					</Tooltip>
				</>
			),
		},
	];

	const getStatusBadgeColor = (status) => {
		if (status === 'Terminated') return 'default'
		if (status === 'Superannuated') return 'info'
		return 'success'
	}

	const handleAddEditModelOpen = (value = false) => {
		setAddEditModel(true)
		if (value) {
			setIsEdit(true)
			setRowValue(value)
		}
	}

	const handleAddEditModelClose = () => {
		setAddEditModel(null)
		if (isEdit) {
			setIsEdit(false)
			setRowValue(null)
		}
	}

	const handleDeleteClose = () => setDeleteOpen(null);
	const handleDeleteOpen = (row) => setDeleteOpen(row);

	const handleDelete = () => {
		setIsDeleteLoading(true);
		Axios({ ...deletePatientURL(deleteOpen?._id) })
			.then(() => {
				handleDeleteClose();
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
						<div className="d-flex justify-content-between mb-3">
							<h4 >Patients</h4>
							<Button size="small" variant="contained" startIcon={<AddIcon />} onClick={() => handleAddEditModelOpen(false)}>
								Add Patient
							</Button>
						</div>
						<Table
							columns={tableColumn}
							// dataURL={patientListURL} 
							tableDATA={tableData}
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