import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Vehicle, Starship } from "../types/starWars";


interface SpacecraftDialogProps {
  open: boolean,
  spacecraft: Vehicle | Starship,
  onClose: () => void
}


const SpacecraftDialog: React.FC<SpacecraftDialogProps> = ({ open, spacecraft, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} className='spacecraft-dialog' sx={{ '& .MuiDialog-paper': { backgroundColor: 'transparent' } }}>
      <Card className='spacecraft-card'>
        <CardContent className="card-content">
          <Typography variant="h6" component="div" className="card-title">
            {spacecraft.name} {spacecraft.favorite && <strong>(★)</strong>}
          </Typography>
          <Typography variant="subtitle2" className="card-text" align="left">
            <i>({spacecraft.type}) ({new Date(spacecraft.created).toLocaleDateString("it-IT")}) </i>
          </Typography>
          <Typography variant="subtitle1" className="card-text" align="left">
            <b className="important">Model: </b>{spacecraft.model}
          </Typography>
          <Typography variant="subtitle1" className="card-text" align="left">
            <b className="important">Manufacturer: </b>{spacecraft.manufacturer}
          </Typography>
          <Typography variant="subtitle1" className="card-text" align="left">
            <b className="important">Cost: </b>{spacecraft.cost_in_credits === "" ? "unknown price" : `ᖬ${spacecraft.cost_in_credits}`}
          </Typography>
          <Typography variant="subtitle1" className="card-text" align="left">
            <b className="important">Length: </b>{spacecraft.length}
          </Typography>
          <Typography variant="subtitle1" className="card-text" align="left">
            <b className="important">Crew: </b>{spacecraft.crew}
          </Typography>
          <Typography variant="subtitle1" className="card-text" align="left">
            <b className="important">Passengers: </b>{spacecraft.passengers}
          </Typography>
          <Typography variant="subtitle1" className="card-text" align="left">
            <b className="important">Max Atmosphering Speed: </b>{spacecraft.max_atmosphering_speed}
          </Typography>
          <Typography variant="subtitle1" className="card-text" align="left">
            <b className="important">Cargo Capacity: </b>{spacecraft.cargo_capacity}
          </Typography>
          <Typography variant="subtitle1" className="card-text" align="left">
            <b className="important">Consumables: </b>{spacecraft.consumables}
          </Typography>
          {spacecraft.type === 'vehicle' && 
            <Typography variant="subtitle1" className="card-text" align="left">
              <b className="important">Vehicle Class: </b>{(spacecraft as Vehicle).vehicle_class}
            </Typography>
          }
          {spacecraft.type === 'starship' && 
            <>
              <Typography variant="subtitle1" className="card-text" align="left">
                <b className="important">Starship Class: </b>{(spacecraft as Starship).starship_class}
              </Typography>
              <Typography variant="subtitle1" className="card-text" align="left">
                <b className="important">Hyperdrive Rating: </b>{(spacecraft as Starship).hyperdrive_rating}
              </Typography>
              <Typography variant="subtitle1" className="card-text" align="left">
                <b className="important">Megalights per hour: </b>{(spacecraft as Starship).MGLT === "" ? "unknown" : (spacecraft as Starship).MGLT}
              </Typography>
            </>
          }
          {spacecraft.films.map(film => 
            <Typography key={film} variant="subtitle1" className="card-text" align="left">
              - {film}
            </Typography>)}
        </CardContent>
      </Card>
    </Dialog>
  )
}

export default SpacecraftDialog;