import Pusher from 'pusher-js';
import { useEffect } from 'react';
import { NameProvider, useNameContext } from '../helpers/context/name';
export default function MyApp({Component, pageProps}) {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_KEY, { cluster: 'us3'})
    useEffect(() => {
        const channel = pusher.subscribe('chat');
        channel.bind('message', data => {
        alert(data);
        })
        return () => {
            pusher.unsubscribe("chat");
        }}, []);
  return (
    <div>
        <NameProvider> <Component {...pageProps} /> </NameProvider>
    </div>
  );
}