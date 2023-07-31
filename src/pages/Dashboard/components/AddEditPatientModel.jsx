import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import Axios from "../../../services/api/Config";
import Toast from "../../../components/common/Toast";
import HFSelect from "../../../components/formControl/HFSelect";
import HFTextInput from "../../../components/formControl/HFTextInput";
import HFDateSelector from "../../../components/formControl/HFDateSelector";

import {
	addPatientURL,
	getPatientURL,
	updatePatientURL,
} from "../../../services/api/routes/common";
import { getDataFromObject } from "./../../../utils/common";
import moment from "moment";

const userAddEditSchema = Yup.object().shape({
	name: Yup.string().trim().required("Patient Name is required"),
	sex: Yup.string().required("Gender is required"),
	category: Yup.string().required("Category is required"),
	address: Yup.string().trim().required("Address is required"),
	eligibilityGrade: Yup.string().required("Eligibility Grade is required"),
	dateOfBirth: Yup.string()
		.required("DOB is required")
		.typeError("Please enter a valid date")
		.nullable()
		.transform((date) => moment(date).format("YYYY-MM-DD")),
	bloodGroup: Yup.string().required("Blood Group is required"),
	contactDetails: Yup.string().required("Contact is required"),
	status: Yup.string().required("Status is required"),
});

const AddEditPatientModel = (props) => {
	const { isVisible = false, onClose, isEdit = false, rowValue } = props;

	const [isLoading, setIsLoading] = useState(false);
	const [isRecordSpinner, setIsRecordSpinner] = useState(false);

	const initialValues = {
		name: "",
		sex: "",
		category: "",
		address: "",
		eligibilityGrade: "",
		dateOfBirth: "",
		bloodGroup: "",
		contactDetails: "",
		status: "",
	};

	const {
		reset,
		setValue,
		handleSubmit,
		control: patientControl,
		// formState: { isValid },
	} = useForm({
		mode: "all",
		reValidateMode: "onChange",
		defaultValues: initialValues,
		resolver: yupResolver(userAddEditSchema),
	});

	useEffect(() => {
		if (rowValue && isEdit) {
			setIsRecordSpinner(true);
			Axios({ ...getPatientURL(rowValue?._id) })
				.then((response) => {
					const res = response.data.data;
					// const res = {
					//   name: "Shelia",
					//   sex: "Male",
					//   bloodGroup: "O+",
					//   dateOfBirth: "1999/10/16",
					//   category: "Emergency Patient",
					//   address: "D-1204, Helios, Surat",
					//   eligibilityGrade: "A1",
					//   contactDetails: "+1234567891",
					//   status: "Active",
					// };
					if (res) {
						const list = [
							"name",
							"sex",
							"category",
							"address",
							"eligibilityGrade",
							"dateOfBirth",
							"bloodGroup",
							"contactDetails",
							"status",
						];
						list.forEach((field) => {
							setValue(field, getDataFromObject(res, field) || "");
						});
					}
				})
				.finally(() => {
					setIsRecordSpinner(false);
				});
		}
	}, [isEdit, rowValue, setValue]);

	const onSubmit = (data) => {
		console.log(data);
		// return;
		setIsLoading(true);
		if (isEdit) {
			Axios({ ...updatePatientURL(rowValue?._id), data: data })
				.then((res) => {
					Toast.success(res.data.message);
					reset(initialValues);
					onClose();
				})
				.finally(() => {
					setIsLoading(false);
				});
		} else {
			Axios({ ...addPatientURL, data: data })
				.then((res) => {
					Toast.success(res.data.message);
					reset(initialValues);
					onClose();
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	};

	const handleClose = () => {
		reset(initialValues);
		onClose();
	};

	return (
		<Dialog
			maxWidth='md'
			fullWidth={true}
			open={!!isVisible}
			onClose={handleClose}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<DialogTitle id='alert-dialog-title'>
					{`${isEdit ? "Edit" : "Add"} Patient`}{" "}
					{isEdit && ` - ${rowValue?.patientCode}`}
				</DialogTitle>
				{isRecordSpinner ? (
					<div className='w-100 my-4 text-center'>
						<CircularProgress />
					</div>
				) : (
					<DialogContent>
						<div className='row my-3'>
							<div className='col-md-12'>
								<HFTextInput
									id='name'
									name='name'
									label='Patient Name'
									control={patientControl}
								/>
							</div>
						</div>
						<div className='row mb-3'>
							<div className='col-md-6'>
								<HFSelect
									id='sex'
									name='sex'
									label='Gender'
									control={patientControl}
									options={[
										{ value: "Male", label: "Male" },
										{ value: "Female", label: "Female" },
									]}
								/>
							</div>
							<div className='col-md-6'>
								<HFSelect
									id='bloodGroup'
									name='bloodGroup'
									label='Blood Group'
									control={patientControl}
									options={[
										{ value: "A+", label: "A+" },
										{ value: "A-", label: "A-" },
										{ value: "AB+", label: "AB+" },
										{ value: "AB-", label: "AB-" },
										{ value: "B+", label: "B+" },
										{ value: "B-", label: "B-" },
										{ value: "O+", label: "O+" },
										{ value: "O-", label: "O-" },
									]}
								/>
							</div>
						</div>
						<div className='row mb-3'>
							<div className='col-md-6'>
								<HFDateSelector
									id='dateOfBirth'
									name='dateOfBirth'
									label='DOB'
									control={patientControl}
									disableFuture={true}
								/>
							</div>
							<div className='col-md-6'>
								<HFSelect
									id='category'
									name='category'
									label='Category'
									control={patientControl}
									options={[
										{ value: "Employee", label: "Employee" },
										{ value: "Non-Dependent", label: "Non-Dependent" },
										{ value: "Dependent", label: "Dependent" },
										{ value: "Emergency Patient", label: "Emergency Patient" },
									]}
								/>
							</div>
						</div>
						<div className='row mb-3'>
							<div className='col-md-12'>
								<HFTextInput
									id='address'
									name='address'
									label='Address'
									multiline
									control={patientControl}
								/>
							</div>
						</div>
						<div className='row mb-3'>
							<div className='col-md-4'>
								<HFTextInput
									id='contactDetails'
									name='contactDetails'
									label='Contact'
									control={patientControl}
								/>
							</div>
							<div className='col-md-4'>
								<HFSelect
									id='eligibilityGrade'
									name='eligibilityGrade'
									label='Eligibility Grade'
									control={patientControl}
									options={[
										{ value: "A1", label: "A1" },
										{ value: "A2", label: "A2" },
										{ value: "A3", label: "A3" },
										{ value: "B1", label: "B1" },
										{ value: "B2", label: "B2" },
										{ value: "B3", label: "B3" },
										{ value: "C1", label: "C1" },
										{ value: "C2", label: "C2" },
										{ value: "C3", label: "C3" },
									]}
								/>
							</div>
							<div className='col-md-4'>
								<HFSelect
									id='status'
									name='status'
									label='Status'
									control={patientControl}
									options={[
										{ value: "Active", label: "Active" },
										{ value: "Terminated", label: "Terminated" },
										{ value: "Superannuated", label: "Superannuated" },
									]}
								/>
							</div>
						</div>
					</DialogContent>
				)}
				<DialogActions>
					<Button
						onClick={handleClose}
						variant='outlined'
						sx={{ textTransform: "none" }}>
						Cancel
					</Button>
					<LoadingButton
						type='submit'
						color='primary'
						variant='contained'
						loadingPosition='center'
						sx={{ textTransform: "none" }}
						loading={isLoading}
						// disabled={!isValid}
					>
						{`${isEdit ? "Update" : "Add"} Patient`}
					</LoadingButton>
				</DialogActions>
			</form>
		</Dialog>
	);
};

AddEditPatientModel.propTypes = {
	isEdit: PropTypes.bool,
	isVisible: PropTypes.bool,
	onClose: PropTypes.func,
	rowValue: PropTypes.any,
};

export default AddEditPatientModel;

// {
// 	"name": "Shelia",
// 	"sex": "male",
// 	"bloodGroup": "O+",
// 	"dateOfBirth": "1999/10/16",
// 	"category": "Emergency Patient",
// 	"address": "D-1204, Helios, Surat",
// 	"eligibilityGrade": "A1",
// 	"contactDetails":"+1234567891",
// 	"status":"Active"
// }

// Male Female

// Active
// Terminated
// Superannuated

// A+
// A-
// AB+
// AB-
// B+
// B-
// O+
// O-

// A1
// A2
// A3
// B1
// B2
// B3
// C1
// C2
// C3

// Employee
// Non-Dependent
// Dependent
// Emergency Patient
