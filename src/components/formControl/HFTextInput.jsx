import PropTypes from "prop-types"
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
// import { getDataFromObject } from "../../../../utils/common";

const HFTextInput = (props) => {
  const {
    name,
    label,
    control,
    onChange: changeHandler,
    // isRequired = false,
    isDisabled = false,
    multiline = false
  } = props
  return (
    <>
      {/* <div className='mb-2'>
        <span>{label}</span>
        {isRequired && <span className='small text-danger'>*</span>}
      </div> */}
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <>
            <TextField
              {...field}
              fullWidth
              size='small'
              label={label}
              multiline={multiline}
              rows={multiline ? 3 : 1}
              placeholder={label}
              disabled={isDisabled}
              onChange={(e) => {
                field.onChange(e.target.value);
                !!changeHandler && changeHandler(e);
              }}
            />
            {error && (
              <span className='small text-danger'>{error.message}</span>
            )}
          </>
        )}
      />
    </>
  );
};

HFTextInput.propTypes = {
  control: PropTypes.any,
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  multiline: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func
}

export default HFTextInput;
