import helmet from "helmet";
import compression from "compression";

const product=(app)=>{
    app.use(helmet());
    app.use(compression());
}

export default app;