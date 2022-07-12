const app = require("express")();
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const { port } = require("./config/index");
require("colors");

app.use(require("express").json());
app.use("/user", userRouter);
app.use("/auth", authRouter);

app.listen(port, console.log(`Server listening on ${port.bold}`.green));
