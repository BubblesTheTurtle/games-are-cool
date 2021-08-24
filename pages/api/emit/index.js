import Pusher from "pusher";
export const pusher = new Pusher({ appId: process.env.app_id, key: process.env.key, secret: process.env.secret, cluster: process.env.cluster, useTLS: true,});
export default async function handler(req, res) {
    const { data, channel, userName, event } = req.body;
    pusher.trigger(channel, event, { userName: userName, data: data });
    res.json = {data: channel};
}