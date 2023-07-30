import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { DataGrid } from "@mui/x-data-grid";

import Axios from "../../services/api/Config";

const Table = (props) => {
	const {
		columns = [],
		tableDATA = [],
		dataURL,
		query,
		search,
		filter,
		showPagination: paginationSetting = true,
		populateValue,
		sorting,
		selectValues,
		checkEqual = true,
		// customStyles = {},
		// expandableRows = false,
		// tableRefresh = false,
		// expandedComponent,
		// conditionalRowStyles = [],
	} = props;

	const showPagination = paginationSetting ? true : paginationSetting;
	const [tableData, setTableData] = useState(tableDATA);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [resPaginator, setResPaginator] = useState();

	// const defaultSort = sorting ? Object.keys(sorting)[0] : null;

	const [obj, setObj] = useState({
		query: filter ? filter.query : query ? query : undefined,
		options: {
			select: selectValues ? selectValues : {},
			limit: pageSize,
			page: currentPage,
			sort: sorting,
			pagination: true,
			populate: populateValue === undefined ? [] : [...populateValue],
		},
		search: filter ? filter.search : search ? search : undefined,
	});

	// const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

	useEffect(() => {
		if (obj && dataURL) {
			setLoading(true);
			Axios({ ...dataURL, data: obj })
				.then((res) => {
					const resData = res.data.data;
					setTableData(resData === null ? [] : resData.list);
					setResPaginator(resData === null ? [] : resData.pagination);
					setCurrentPage(resData.pagination?.current_page);
					setPageSize(resData.pagination?.per_page);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	}, [dataURL, obj, checkEqual]);

	const handlePaginationChange = (pageConfig) => {
		const pgNo = pageConfig?.page + 1;
		const pgSize = pageConfig?.pageSize;
		let options = {
			...obj,
			options: {
				...obj.options,
				limit: pgSize,
				page: pgNo,
			},
		};
		setObj(options);
		setPageSize(pgSize);
		setCurrentPage(pgNo);
	};

	return (
		<div>
			<DataGrid
				columns={columns}
				rows={tableData}
				loading={loading}
				getRowId={(row) => row._id}
				isRowSelectable={() => false}
				disableColumnFilter={true}
				pageSizeOptions={[10, 20, 30, 50]}
				paginationModel={{
					page: currentPage - 1,
					pageSize: pageSize,
				}}
				paginationMode='server'
				// rowCount={resPaginator ? resPaginator?.total_entries : 0}
				rowCount={resPaginator ? resPaginator?.total_entries : 7}
				onPaginationModelChange={handlePaginationChange}
				hideFooterPagination={!showPagination}
			/>
		</div>
	);
};

Table.propTypes = {
	checkEqual: PropTypes.bool,
	columns: PropTypes.array,
	conditionalRowStyles: PropTypes.array,
	customStyles: PropTypes.object,
	dataURL: PropTypes.object,
	expandableRows: PropTypes.bool,
	expandedComponent: PropTypes.node,
	filter: PropTypes.shape({
		query: PropTypes.object,
		search: PropTypes.shape({
			value: PropTypes.string,
		}),
	}),
	populateValue: PropTypes.array,
	query: PropTypes.object,
	search: PropTypes.shape({
		value: PropTypes.string,
	}),
	selectValues: PropTypes.object,
	showPagination: PropTypes.bool,
	sorting: PropTypes.object,
	tableDATA: PropTypes.array,
	tableRefresh: PropTypes.bool,
};

export default Table;
