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


/**
 * A Dialog component that displays information about a spacecraft.
 * It takes as input whether the Dialog should be open or not, the spacecraft to display, and a function to call when the Dialog is closed.
 * The component fetches the films in which the spacecraft appears and displays them in the Dialog
 * (Only if the Dialog is open and the spacecraft has at least one film.).
 * The component also displays the following information of the spacecraft:
 *   - name
 *   - type
 *   - model
 *   - manufacturer
 *   - cost
 *   - length
 *   - crew
 *   - passengers
 *   - max atmosphering speed
 *   - cargo capacity
 *   - consumables
 *   - vehicle class (if the spacecraft is a vehicle)
 *   - starship class (if the spacecraft is a starship)
 *   - hyperdrive rating (if the spacecraft is a starship)
 *   - megalights per hour (if the spacecraft is a starship)
 *   - the films in which the spacecraft appears
 */
const SpacecraftDialog: React.FC<SpacecraftDialogProps> = ({ open, spacecraft, onClose }) => {

  const [films, setFilms] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  /**
   * If the Dialog is open and the spacecraft has at least one film,
   * it wil try to fetch the film and set a loading state to true,
   * which is used by the CircularProgress component to show that the data is being fetched.
   * If the Dialog is not open or the spacecraft has no films, it will set the films state to an empty array.
   */
  useEffect(() => {
    if (open && spacecraft?.films && spacecraft.films.length > 0) {
      setLoading(true);
      /**
       * Fetches a film from the SWAPI by url and updates the state with the title of the film.
       * If the film url is not empty, it will fetch the film, otherwise it will do nothing.
       * If the fetching is successful, it will update the state by adding the title of the film.
       * If there is an error while fetching the film, it will log an error message.
       * Finally, it will set the loading state to false.
       */
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
    <Dialog 
      open={open} 
      onClose={onClose} 
      className='spacecraft-dialog' 
      sx={{ '& .MuiDialog-paper': { backgroundColor: 'transparent' } }}
      fullWidth
      maxWidth='md'
    >
      <Card className={spacecraft.favorite ? "spacecraft-card favorite" : "spacecraft-card"}>
        <CardContent className="card-content">
          {/* Common spacecraft data */}
          {/* If the spacecraft is marked as favorite, it will display a star icon after the name */}
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
          {/* Vehicle specific data */}
          {spacecraft.type === 'vehicle' && (spacecraft as Vehicle).vehicle_class &&
            <Typography variant="subtitle1" className="card-text" align="left">
              <b className="important">Vehicle Class: </b>{(spacecraft as Vehicle).vehicle_class}
            </Typography>
          }
          {/* Starship specific data */}
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
          {/* Films */}
          {spacecraft.films.length > 0 &&
            <Typography variant="subtitle1" className="card-text" align="left">
              <b className="important">Films: </b>
              { loading ? 
                (<CircularProgress size={24}/>) : 
                (films.map((film, index) => <span key={index}>{film}{index === films.length - 1 ? "." : ", "}</span>))
              }
            </Typography>
          }
        </CardContent>
      </Card>
    </Dialog>
  )
}

export default SpacecraftDialog;