import express, { Response as ExResponse,
                  Request as ExRequest,
                  NextFunction,
                  Application } from "express"
import morgan from "morgan"
import swaggerUi from "swagger-ui-express"
import { ValidateError } from "tsoa";
import UserRouter from "./routes/user"
import ProductTypeRouter from "./routes/productsType"
import ProductRouter from "./routes/products"
import OrdersRouter from "./routes/orders"

const cookieParser = require("cookie-parser")
const PORT = process.env.PORT || 8000
const app: Application = express()

app.use(express.json())
app.use(cookieParser())
app.use(morgan("tiny"))
app.use(express.static("public"))

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined,{
    explorer: true,
    swaggerOptions: {
      url: "/swagger.yaml",
    },
  })
)

app.use(function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction): ExResponse | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
  next();
});

app.use(UserRouter)
app.use(ProductRouter)
app.use(ProductTypeRouter)
app.use(OrdersRouter)

app.listen(PORT, () => {
  console.log("Server is running on localhost:"+PORT+"\nAnd Swagger: localhost:"+PORT+"/docs");
  })