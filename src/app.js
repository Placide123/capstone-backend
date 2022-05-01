import "./database";
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import swaggerDoc from "../doc.json";
import messageRoutes from './routes/message.route';
import blogRoutes from './routes/blog.route';
import subscriberRoutes from './routes/subscriber.route';
import userRoutes from './routes/signup.route';
import helmet from "helmet";
import compression from "compression";

const server = express();
server.get('/', (req, res) => {
    res.status(200).json({ success: true, message: "You successfully landed on our Endpoint" })
});
server.use(express.json());
server.use(helmet());
server.use(compression());
server.use('/api/message', messageRoutes);
server.use('/api/blog', blogRoutes);
server.use('/api/subscriber/',subscriberRoutes);
server.use('/api/user',userRoutes)
server.use(cors());
server.use(morgan("dev"));
server.use("/api/", userRoutes, subscriberRoutes, blogRoutes, messageRoutes);
server.use("/api-documentation", swaggerUI.serve, swaggerUI.setup(swaggerDoc, { explorer: true }));
server.use("*", (req, res, next) => {
	res.status(404).json({ error: "NOT FOUND", });
});

export default server;