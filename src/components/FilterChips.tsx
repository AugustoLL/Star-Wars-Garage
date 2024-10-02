import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

/**
 * Props for the FilterChips component
 */
interface FilterChipsProps {
  chips: { 
    label: string, 
    onClick: () => void ,
  }[],
  currentValue: string,
  direction?: 'row' | 'column',
  spacing?: number
}

/**
 * CSS for the chips
 * If the chip is not selected, then the color of the text and border will be lighter
 * and the color of the background will be darker.
 * If it is selected the color of the text and border will be darker and the color of the background will be yellow.
 */
const chipCSS = {
  "&.MuiChip-outlined": { color: "white", borderColor: "white" },
  "&.MuiChip-outlined:hover": { backgroundColor: "gold", borderColor: "gold", color: "black" },
  "&:active": { backgroundColor: "gold", color: "black" },
  "&.MuiChip-filled": { backgroundColor: "gold", color: "black" },
}



/**
 * A component to display a list of chips to filter spacecrafts
 * It will be displayed as a row or a column based on the direction prop
 * The chips will have a default spacing of 2
 * The chips will change color when clicked or hovered
 * The chips will have a yellow background color when selected (i.e. when the current value matches the label of the chip)
 */
const FilterChips: React.FC<FilterChipsProps> = ({ chips, currentValue, direction = 'row', spacing = 2 }) => {
  return (
    <Stack direction={direction} spacing={spacing} className="chip-container">
      {chips.map(chip => (
        <Chip 
          key={chip.label}
          label={chip.label} 
          onClick={chip.onClick}
          variant={ currentValue === chip.label.toLowerCase() ? 'filled' : 'outlined' }
          className="chip-element"
          sx={chipCSS}
        />
      ))}
    </Stack>
  )
}

export default FilterChips;