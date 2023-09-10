// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const helmet = require("helmet");
// const morgan = require("morgan");

// const { OpenAIApi } = require("openai");
// const { Configuration } = require("openai");
// const openAiRoutes = require("./routes/openai.js");

// const connectDB = require("./config/db");

// /* CONFIGURATIONS */
// dotenv.config();
// const app = express();
// app.use(express.json());
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// app.use(morgan("common"));
// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// app.use(cors());

// /* OPEN AI CONFIGURATION */
// const configuration = new Configuration({
//     apiKey: process.env.OPEN_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

// module.exports = { openai };
// /* ROUTES */
// app.use("/openai", openAiRoutes);
// //app.use("/auth", authRoutes);

// // app.use('/question', require('./routes/questionRoute'));

// // /* SERVER SETUP */
// // const PORT = process.env.PORT || 9000;

// // connectDB().then(() => {
// //   app.listen(PORT, () => {
// //     console.log(`app listening at http://localhost:${PORT}`);
// //   });
// // });

// /* SERVER SETUP */
// const PORT = process.env.PORT || 9000;
// app.listen(PORT, () => {
//     console.log(`Example app listening at http://localhost:${PORT}`);
// });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const connectDB = require("./config/db");
const openAiRoutes = require("./routes/openai.js");

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

/* ROUTES */
app.use("/openai", openAiRoutes);
app.use('/question', require('./routes/questionRoute'));
app.use('/quiz', require('./routes/quizRoute'));




/* SERVER SETUP */
const PORT = process.env.PORT || 9000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`app listening at http://localhost:${PORT} 😍`);
    });
    }
);


// sehan backend routes
app.use(require("./routes/companyRoute.js"))
app.use(require("./routes/roadMapRoute.js"))
app.use(require("./routes/assignmentRoute.js"))
app.use(require('./routes/userRoutes.js'));