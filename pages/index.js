import Link from 'next/link'
import { Grid, TextField, Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useNameContext } from '../helpers/context/name';
const useStyles = makeStyles((theme) => ({ root: { '& > *': { margin: theme.spacing(3), padding: theme.spacing(2), width: "30vw", display: "block", marginLeft: "auto", marginRight: "auto"},},}));
export default function Login() {
    const classes = useStyles();
    const { name, setName }= useNameContext();
    return (
        <div className={classes.root}><Paper><Grid container spacing={2} alignContent="center" direction="column">
            <Grid item><TextField label="Name" variant="filled" value={name} onChange={e => setName(e.target.value)}/></Grid>
            <Grid item><Link href="create" passHref><Button variant="contained" fullWidth> Create Room </Button></Link></Grid>
            <Grid item><Link href="join" passHref><Button variant="contained" fullWidth> Join Room </Button></Link></Grid>
        </Grid></Paper></div> 
    );
}