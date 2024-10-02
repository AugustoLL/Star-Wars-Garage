import { Vehicle, Starship } from "../types/starWars";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

import './SpacecraftCard.css';

interface SpacecraftCardProps {
  spacecraft: Vehicle | Starship
}

/**
 * React component to display a spacecraft card.
 * It will display the name, model, manufacturer and cost in credits of the spacecraft.
 * If the spacecraft is marked as favorite, it will display a star icon after the name.
 * The component also includes a button to learn more about the spacecraft.
 */
const SpacecraftCard: React.FC<SpacecraftCardProps> = ({ spacecraft }) => {
  return (
    <Card className={ spacecraft.favorite ? "spacecraft-card favorite" : "spacecraft-card" }>
      <CardContent className="card-content">
        <Typography variant="h6" component="div" className="card-title">
          {spacecraft.name} {spacecraft.favorite && <strong>(★)</strong>}
        </Typography>
        <Typography variant="subtitle1" className="card-text" align="left">
          <b className="important">Model:</b> {spacecraft.model}
        </Typography>
        <Typography variant="subtitle1" className="card-text" align="left">
          <b className="important">Manufacturer:</b> {spacecraft.manufacturer}
        </Typography>
        <Typography variant="subtitle2" className="card-text" align="left">
          {spacecraft.cost_in_credits === "" ? "unknown price" : `ᖬ${spacecraft.cost_in_credits}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" className="card-button">Learn More</Button>
      </CardActions>
    </Card>
  )
}

export default SpacecraftCard;