import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useNameContext } from '../../../helpers/context/name';
import Pusher from 'pusher-js';
import axios from 'axios';
export default function PlayRoute() {
    const router = useRouter();
    const pusher = new Pusher(process.env.NEXT_PUBLIC_KEY, { cluster: 'us3' });
    const { name } = useNameContext();
    const gameID = router.query.gameID;
    const [ gameType, setGameType ] = useState('');
    const [ gameState, setGameState ] = useState({});
    const [ turn, setTurn ] = useState(false);
    const [ owner, setOwner ] = useState(true);
    useEffect( async () => {
        let channel;
        console.log(gameID);
        // if (gameID.length == 7 && /[a-z]/.test(gameID[i]) && /[0-9]/.test(gameID.slice(1))){
        //     setGameType(gameID[0]);
        //     channel = pusher.subscribe(gameID);
        //     channel.bind(`${gameType}play`, data => {
                
        //     });
        //     axios.post('/api/emit', { userName: name, channel: gameID, data: 'init', event: 'init'}).then(() => channel.bind('init', data => { alert(data) }));
        // }

    }, []);
    return (
        <div>hi</div>
    );
}