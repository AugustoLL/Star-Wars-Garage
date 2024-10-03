import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarIcon from '@mui/icons-material/Star';

interface InputProps {
  label: string,
  name: string,
  value?: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  required?: boolean,
  type?: string,
  options?: {value: string, label: string}[],
  isChecked?: boolean
}

const defaultOptions = [
  { value: "vehicle", label: "Vehicle" },
  { value: "starship", label: "Starship" }
]

/**
 * When using Textfield, sx allows defining additional CSS styles,
 * First we change the color of the label to the yellow from the star wars logo,
 * then we change the color of the text in the input to a lighter color,
 * then we change the background color of the input to a darker color,
 * and finally we change the border color of the input, when it's clicked to the yellow color.
 */
const sx = {
  "& label": {
    color: '#fee818', // color of the label
    "&.Mui-focused": {
      color: '#fee818', // color when focused
    }
  },
  "& .MuiInputBase-input": {
    color: '#f4e8ce', // color of the text inside of the TextField
    "&.Mui-focused": {
      color: '#f4e8ce', // color when focused
    }
  },
  // Targeting the TextField component
  "& .MuiFilledInput-root::after": {
    borderBottomColor: '#fee818', // default underline color
  },
  "& .MuiFilledInput-root::before": {
    borderBottomColor: '#f4e8ce', // default color of the line before focus
  },
  "& .MuiFilledInput-root:hover:not(.Mui-disabled)::before": {
    borderBottomColor: '#fee818', // color when hovering before focus
  },
}

const Input: React.FC<InputProps> = ({ label, name, value, onChange, type = "text", required = false, options = defaultOptions, isChecked = false}) => {
  if (type === "text") {
    return (
      <div className='input-container'>
        <TextField
            required={required}
            label={label}
            id=""
            name={name}
            value={value}
            onChange={onChange}
            fullWidth
            margin='dense'
            variant='filled'
            sx={sx}
          />
      </div>
    )
  }
  /**
   * If the input type needed is a select, we return a Select component
   * with the options passed as props.
   * We also cast the onChange prop to a SelectChangeEvent 
   * */ 
  else if (type === "select") {
    return ( 
      <div className='input-container'>
        <Select
          value={value}
          label={label}
          onChange={onChange as (event: SelectChangeEvent<string>) => void}
          fullWidth
          displayEmpty
          required={required}
          variant='filled'
          className='input-select'
          sx={sx}
        >
          {options.map((option: {value: string, label: string}) => (
            <MenuItem key={option.value} value={option.value} className='input-select-option'>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </div>
    )
  }
  else if (type === "checkbox") {
    <FormControlLabel 
      label={label} 
      control={
        <Checkbox
          className="favorite-checkbox"
          icon={<StarBorderOutlinedIcon />} 
          checkedIcon={<StarIcon />}
          checked={isChecked} 
          onChange={onChange}
        />
      } 
    />
  }
  
}

export default Input;