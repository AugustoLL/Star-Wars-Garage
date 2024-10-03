import React, { useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Vehicle, Starship } from "../types/starWars";
import { fetchFilmByUrl } from '../api/swapi';
import { CircularProgress } from "@mui/material";


interface SpacecraftDialogProps {
  open: boolean,
  spacecraft: Vehicle | Starship,
  onClose: () => void
}


const SpacecraftDialog: React.FC<SpacecraftDialogProps> = ({ open, spacecraft, onClose }) => {

  const [films, setFilms] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (open && spacecraft.films.length > 0) {
      setLoading(true);
      const fetchData = async (filmUrl: string) => {
        if (filmUrl != "") {
          try {
            const fetchedFilm = await fetchFilmByUrl(filmUrl);  
            setFilms(prevFilms => [...prevFilms, fetchedFilm.title]);
          } catch (error) {
            console.error('Error fetching films data:', error);
          } finally {
            setLoading(false);
          }
        }
      }
      spacecraft.films.forEach(filmUrl => fetchData(filmUrl));
    }
    else {
      setFilms([]);
    }
  }, [open, spacecraft]);

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
          {spacecraft.length &&
            <Typography variant="subtitle1" className="card-text" align="left">
              <b className="important">Length: </b>{spacecraft.length}
            </Typography>
          }
          {spacecraft.crew &&
            <Typography variant="subtitle1" className="card-text" align="left">
              <b className="important">Crew: </b>{spacecraft.crew}
            </Typography>
          }
          {spacecraft.passengers &&
            <Typography variant="subtitle1" className="card-text" align="left">
              <b className="important">Passengers: </b>{spacecraft.passengers}
            </Typography>
          }
          {spacecraft.max_atmosphering_speed &&
            <Typography variant="subtitle1" className="card-text" align="left">
              <b className="important">Max Atmosphering Speed: </b>{spacecraft.max_atmosphering_speed}
            </Typography>
          }
          {spacecraft.cargo_capacity &&
            <Typography variant="subtitle1" className="card-text" align="left">
              <b className="important">Cargo Capacity: </b>{spacecraft.cargo_capacity}
            </Typography>
          }
          {spacecraft.consumables &&
            <Typography variant="subtitle1" className="card-text" align="left">
              <b className="important">Consumables: </b>{spacecraft.consumables}
            </Typography>
          }
          {spacecraft.type === 'vehicle' && (spacecraft as Vehicle).vehicle_class &&
            <Typography variant="subtitle1" className="card-text" align="left">
              <b className="important">Vehicle Class: </b>{(spacecraft as Vehicle).vehicle_class}
            </Typography>
          }
          {spacecraft.type === 'starship' && 
            <>
              {(spacecraft as Starship).starship_class &&
                <Typography variant="subtitle1" className="card-text" align="left">
                  <b className="important">Starship Class: </b>{(spacecraft as Starship).starship_class}
                </Typography>
              }
              {(spacecraft as Starship).hyperdrive_rating &&
                <Typography variant="subtitle1" className="card-text" align="left">
                  <b className="important">Hyperdrive Rating: </b>{(spacecraft as Starship).hyperdrive_rating}
                </Typography>
              }
              {(spacecraft as Starship).MGLT &&
                <Typography variant="subtitle1" className="card-text" align="left">
                  <b className="important">Megalights per hour: </b>{(spacecraft as Starship).MGLT === "" ? "unknown" : (spacecraft as Starship).MGLT}
                </Typography>
              }
            </>
          }
          {spacecraft.films.length > 0 &&
            <Typography variant="subtitle1" className="card-text" align="left">
              <b className="important">Films: </b>
              { loading ? 
                (<CircularProgress size={24}/>) : 
                (films.map((film, index) => <>{film}{index === films.length - 1 ? "." : ", "}</>))
              }
            </Typography>
          }
        </CardContent>
      </Card>
    </Dialog>
  )
}

export default SpacecraftDialog;