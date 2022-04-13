import "./database";
import express from 'express';
import messageRoutes from './routes/message.route';
import blogRoutes from './routes/blog.route';
import subscriberRoutes from './routes/subscriber.route';
import userRoutes from './routes/signup.route';
const server = express();
server.get('/', (req, res) => {
    res.status(200).json({ success: true, message: "You successfully landed on our Endpoint" })
});
server.use(express.json());
server.use('/api', messageRoutes);
server.use('/api/blog', blogRoutes);
server.use('/api/subscriber/',subscriberRoutes);
server.use('/api/user',userRoutes)
const port = 3000;
server.listen(port, () => { console.log("Server listening on port " + port) });