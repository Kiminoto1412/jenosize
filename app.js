const express = require("express");
const cors = require("cors");

require("dotenv").config();
const app = express();
const port = process.env.PORT || 8081;
const notFoundMiddleware = require("./middlewares/notFound");

const jenosizeRouter = require("./routes/jenosizeRoutes");
const authRoute = require("./routes/authRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/auth", authRoute);
app.use("/jenosize", jenosizeRouter);

app.use(notFoundMiddleware);

app.listen(port, () => console.log(`\n\n\nRunning port ${port}`));

