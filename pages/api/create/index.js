import Pusher from "pusher";
export const pusher = new Pusher({ appId: process.env.app_id, key: process.env.key, secret: process.env.secret, cluster: process.env.cluster, useTLS: true,});
export default async function handler(req, res) {
  const { gameType, user } = req.body;
  const channel = `g${Math.round((Date.now()*Math.random())%1000000)}` //generate random 6digit id
  const response = await pusher.trigger(channel.toString(), "create", {data: "create"});
  res.json({ channel: channel });
}