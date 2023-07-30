import PropTypes from "prop-types";
import { Autocomplete, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const HFSelect = (props) => {
  const { name, label, control, options, isDisabled = false } = props;
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <>
            <Autocomplete
              {...field}
              defaultValue={field.value}
              fullWidth
              isOptionEqualToValue={(option, value) => option?.value === value}
              disabled={isDisabled}
              size="small"
              id={name}
              options={options}
              onChange={(_e, newValue) => {
                field.onChange(newValue.value);
              }}
              renderInput={(params) => (
                <TextField {...params} label={label} placeholder={label} />
              )}
            />
            {error && (
              <span className="small text-danger">{error.message}</span>
            )}
          </>
        )}
      />
    </>
  );
};

HFSelect.propTypes = {
  control: PropTypes.any,
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
};

export default HFSelect;
