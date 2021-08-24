import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useNameContext } from '../../helpers/context/name';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Pusher from 'pusher-js';
import axios from 'axios';
import TicTacToe from '../../components/tictactoe';
export default function PlayRoute() {
    const router = useRouter();
    const pusher = new Pusher(process.env.NEXT_PUBLIC_KEY, { cluster: 'us3' });
    const { name } = useNameContext();
    const gameID = router.query.gameID;
    const [ gameState, setGameState ] = useState({board: [['-', '-', '-'],['-', '-', '-'],['-', '-', '-']], symbol: 'X', win: false});
    const [ turn, setTurn ] = useState();
    const [ opponent, setOpponent ] = useState('');
    useEffect( async () => {
        let channel;
        if (gameID) {
            channel = pusher.subscribe(gameID);
            axios.post('/api/emit', { userName: name, channel: gameID, data: 'init', event: 'init'});
            channel.bind('join', data => { 
                setOpponent(data.userName);
                const firstTurn = Math.random() < 0.5;
                // setGameState({opponent: data.userName, board: [['-', '-', '-'],['-', '-', '-'],['-', '-', '-']], symbol: 'X'})
                // axios.post('/api/emit', { userName: name, channel: gameID, data: {gameState: {board: gameState.board, win: false}}, event: 'play'});
                axios.post('/api/emit', {userName: name, channel: gameID, data: 'Hey', event: 'play'});
            })
            channel.bind('play', data => {
                console.log(data);
            })}}, [gameID]);
    const updateBoard = (i, k) => {
        let newBoard = gameState.board;
        newBoard[i, k] = gameState.symbol;
        ((newBoard[0][0] === gameState.symbol && newBoard[0][1] === gameState.symbol && newBoard[0][2] === gameState.symbol)||
        (newBoard[1][0] === gameState.symbol && newBoard[1][1] === gameState.symbol && newBoard[1][2] === gameState.symbol)||
        (newBoard[2][0] === gameState.symbol && newBoard[2][1] === gameState.symbol && newBoard[2][2] === gameState.symbol)||
        (newBoard[0][0] === gameState.symbol && newBoard[1][0] === gameState.symbol && newBoard[2][0] === gameState.symbol)||
        (newBoard[0][1] === gameState.symbol && newBoard[1][1] === gameState.symbol && newBoard[2][1] === gameState.symbol)||
        (newBoard[0][2] === gameState.symbol && newBoard[1][2] === gameState.symbol && newBoard[2][2] === gameState.symbol)||
        (newBoard[0][0] === gameState.symbol && newBoard[1][1] === gameState.symbol && newBoard[2][2] === gameState.symbol)||
        (newBoard[0][2] === gameState.symbol && newBoard[1][1] === gameState.symbol && newBoard[2][0] === gameState.symbol) ) ? setGameState({board: newBoard, win: true, ...gameState}) : setGameState({board: newBoard, ...gameState});
        setTurn(false);
    };
    return (<div><TicTacToe updateBoard={updateBoard} board={gameState.board} turn={turn}/><button onClick={e => {axios.post('/api/emit', {userName: name, channel: gameID, data: 'hi', event: 'play'})}}>Click me to send hi</button><p>Join with [url]/join/{gameID}   check console on both pages</p></div>);
}