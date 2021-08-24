import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useNameContext } from '../../helpers/context/name';
import TicTacToe from '../../components/tictactoe';
import Pusher from 'pusher-js';
import axios from 'axios';
export default function JoinRoute() {
    const router = useRouter();
    const pusher = new Pusher(process.env.NEXT_PUBLIC_KEY, { cluster: 'us3' });
    const { name } = useNameContext();
    const gameID = router.query.gameID;
    const [ gameState, setGameState ] = useState({});
    const [ turn, setTurn ] = useState(false);
    useEffect( async () => {
        let channel;
        if (gameID) {
            channel = pusher.subscribe(gameID);
            console.log(gameID);
            axios.post('/api/emit', { userName: name, channel: gameID, data: 'join', event: 'join'});
            channel.bind('play', data => { 
                //implement turn processing for the guest
                console.log(data);

            });
        }
           
    }, [gameID]);
    return (
        <div><button onClick={e => {axios.post('/api/emit', {userName: name, channel: gameID, data: 'hi', event: 'play'})}}>Click me to send hi</button></div>
    );
}