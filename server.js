import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import router from './router/route.js';
import authRoute from "./router/authRoute.js";
import passport from 'passport';
import session from 'express-session';
import "./passport.js";


/** import connection file */
import connectDB from './database/conn.js';
dotenv.config();
connectDB();
const app = express()
app.use(
  session({
    secret: `$(process.env.COOKIE_SECRET)`,
    resave:true,
    saveUninitialized:true,
  })
)
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({extended :true}));

/** app middlewares */
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());



/** appliation port */


/** routes */
app.use('/api/v1/main', router) /** apis */
 app.use("/api/v1/auth",authRoute);

 app.get("/",function(req,res){
    res.send("<h1>index</h1>");
  });

const PORT=process.env.PORT || 8000;
app.listen(PORT, function() {
    console.log(`Server started ${process.env.mode}on port ${PORT}`);
  });
  