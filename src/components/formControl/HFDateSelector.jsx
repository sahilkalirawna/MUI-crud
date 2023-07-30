import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const HFDateSelector = (props) => {
  const {
    name,
    label,
    control,
    fullWidth = true,
    isDisabled = false,
    disableFuture = false,
  } = props;
  return (
    <>
      <Controller
        control={control}
        name={name}
        // eslint-disable-next-line no-unused-vars
        render={({ field: { ref, ...field }, fieldState: { error } }) => (
          <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                defaultValue={field.value ? dayjs(field.value) : undefined}
                label={label}
                format="DD MMM YYYY"
                placeholder={label}
                fullWidth={fullWidth}
                onChange={(newValue) => {
                  field.onChange(newValue);
                }}
                disabled={isDisabled}
                slotProps={{
                  textField: {
                    size: "small",
                    className: `${fullWidth ? "w-100" : ""}`,
                  },
                }}
                closeOnSelect
                disableFuture={disableFuture}
              />
            </LocalizationProvider>
            {error && (
              <span className="small text-danger">{error.message}</span>
            )}
          </>
        )}
      />
    </>
  );
};

HFDateSelector.propTypes = {
  control: PropTypes.any,
  disableFuture: PropTypes.bool,
  fullWidth: PropTypes.bool,
  isDisabled: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
};

export default HFDateSelector;
