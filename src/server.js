import { initMongoDB } from './daos/mongodb/connection.js';
import express from 'express';
import morgan from 'morgan';
import productsRouter from './routes/product.router.js';
import { errorHandler } from './middlewares/errorHandler.js';
import 'dotenv/config'
import loginRouter from './routes/login.router.js';
import viewsRouter from './routes/views.router.js';
import cookieParser from 'cookie-parser';
import { SECRET } from './utils.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(cookieParser(SECRET))

app.use('/products', productsRouter);
app.use('/login', loginRouter);
app.use('/', viewsRouter);

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(errorHandler);

if(process.env.PERSISTENCE === 'MONGO') initMongoDB();

const PORT = 8080;

app.listen(PORT, () => console.log(`SERVER UP ON PORT ${PORT}`));