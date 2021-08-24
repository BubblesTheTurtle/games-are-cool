import { Grid, Button, Paper } from '@material-ui/core';
export default function TicTacToe(props) {
    const handleClick = (i, k) => props.turn && board[i][k] === '-' && props.updateBoard(i, k);
    return (
        <Paper><Grid container direction="column" spacing={3}>
            {props.board.map((row, i) => (<Grid container direction="row" key={i} spacing={3}>
                {row.map((el, k) => (<Grid item key={k}><Button variant="contained" onClick={e => {handleClick(i, k)}}>{el}</Button></Grid>))}
            </Grid>))}
        </Grid></Paper> );} 