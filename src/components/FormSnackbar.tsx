import Snackbar from '@mui/material/Snackbar';
import { Alert } from "@mui/material";

interface FormSnackbarProps {
  isOpen: boolean
  onClose: () => void,
  message: string,
  isError?: boolean,
  anchorOrigin?: { vertical: 'top' | 'bottom', horizontal: 'center' | 'left' | 'right' },
  autoHideDuration?: number
}

const FormSnackbar: React.FC<FormSnackbarProps> = ({ 
  isOpen, 
  onClose, 
  message, 
  isError = false, 
  anchorOrigin = { vertical: 'top', horizontal: 'center'},
  autoHideDuration = 3000
  }) => {
    return (
      <Snackbar
        anchorOrigin={anchorOrigin}
        open={isOpen}
        autoHideDuration={autoHideDuration}
        onClose={onClose}
      >
        <Alert severity={isError ? 'error' : 'success'} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    )
}

export default FormSnackbar;