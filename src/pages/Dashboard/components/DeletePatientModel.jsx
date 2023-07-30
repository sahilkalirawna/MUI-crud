import PropTypes from "prop-types"
import { LoadingButton } from "@mui/lab"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"

const DeletePatientModel = (props) => {
  const { deleteOpen, handleDeleteClose, isDeleteLoading, handleDelete } = props

  return (
    <Dialog
      open={!!deleteOpen}
      onClose={handleDeleteClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'>
      <DialogTitle id='alert-dialog-title'>
        Delete Patient
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Are you sure you want to delete patient <strong>{deleteOpen?.name} ?</strong>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteClose} variant='outlined' sx={{ textTransform: "none" }}>
          Cancel
        </Button>
        <LoadingButton
          variant='contained'
          autoFocus
          color='error'
          loading={isDeleteLoading}
          loadingPosition='center'
          sx={{ textTransform: "none" }}
          onClick={handleDelete}>
          Delete
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

DeletePatientModel.propTypes = {
  deleteOpen: PropTypes.shape({
    name: PropTypes.string
  }),
  handleDelete: PropTypes.func,
  handleDeleteClose: PropTypes.func,
  isDeleteLoading: PropTypes.bool
}

export default DeletePatientModel