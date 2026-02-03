import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';
import session from 'express-session';
import expressLayouts from 'express-ejs-layouts';
import passport from './config/passport.js';
import flash from 'connect-flash';
import sequelize from './config/database.js';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Import routes
import profileRoutes from './routes/profile.js';
import contactRoutes from './routes/contacts.js';
import socialLinkRoutes from './routes/socialLinks.js';
import experienceRoutes from './routes/experiences.js';
import skillRoutes from './routes/skills.js';
import aboutMeRoutes from './routes/aboutMe.js';
import uploadRoutes from './routes/upload.js';
import adminRoutes from './routes/admin.js';
import { requireApiKey } from './middleware/apiKey.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"], // Allow inline scripts (EJS) and Google Fonts
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "blob:", "http:", "https:"], // Allow images from anywhere (placeholders)
            upgradeInsecureRequests: null, // Disable auto-upgrade to https for localhost
        },
    },
}));

// Trust proxy (Apache/Cloudflare)
app.set('trust proxy', 1);

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // Increased limit to prevent false positives during setup
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req, res) => {
        return req.ip; // Use the real IP (thanks to trust proxy)
    }
});
app.use(limiter);

const allowedOrigins = [
    'https://dhiyadanial.my',
    'https://dhiya.my-bizcard.my',
    'https://admin.dhiyadanial.my',
    'http://localhost:3001',
    'http://localhost:8010'
];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'x-api-key', 'Authorization'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret-key',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global variables for templates
app.use((req, res, next) => {
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    res.locals.user = req.user || null;
    next();
});

// Set EJS as view engine
app.use(expressLayouts);
app.set('layout', 'layout');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API Routes
const apiRouter = express.Router();
apiRouter.use(requireApiKey);
apiRouter.use('/profile', profileRoutes);
apiRouter.use('/contacts', contactRoutes);
apiRouter.use('/social-links', socialLinkRoutes);
apiRouter.use('/experiences', experienceRoutes);
apiRouter.use('/skills', skillRoutes);
apiRouter.use('/about-me', aboutMeRoutes);
apiRouter.use('/upload', uploadRoutes);

app.use('/api', apiRouter);

// Admin Routes
app.use('/admin', adminRoutes);

// Database connection & Server start
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected...');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error connecting to database:', error);
    }
};

startServer();
