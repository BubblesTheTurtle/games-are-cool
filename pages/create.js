import { useRouter } from 'next/router';
import { Paper, Grid, Card, CardActionArea, CardMedia, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useNameContext } from '../helpers/context/name';
const useStyles = makeStyles((theme) => ({ root: { '& > *': { margin: theme.spacing(3), padding: theme.spacing(2), width: "30vw", display: "block", marginLeft: "auto", marginRight: "auto"},},}));
export default function Create() {
    const router = useRouter();
    const { name } = useNameContext();
    const classes = useStyles();
    const createGame = async (gameType) => {
        const res = await axios.post('/api/create', { gameType: 't', user: name });
        router.push(`/play/${res.data.channel}`);
    }
    return(
        <div><Paper><Grid container spacing={2}>
            <Grid item><Card><CardActionArea onClick={e => {createGame('t')}}>
                <CardMedia image="public/assets/images/tic-tac-toe-icon.png" title="tic tac toe icon" className={classes.media}/>
                <CardContent><Typography gutterBottom variant="h5" component="h2">Tic Tac Toe</Typography></CardContent>
            </CardActionArea></Card></Grid>
        </Grid></Paper></div>
    )
}