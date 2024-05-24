import express from "express";
import morgan from "morgan";
import "express-async-errors";
import { getAll, getOneById, create, updateById, deliteById, createImage} from "./controllers/planets.js"
import multer from "multer";
import {logIn, signUp} from "./controllers/users"

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads")
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
})
const upload = multer({ storage })
const app = express();
const port = 3000;

app.use("/uploads", express.static("uploads"))


app.use(morgan("dev"));
app.use(express.json());


app.get("/api/planets", getAll);

app.get("/api/planets/:id", getOneById);

app.post("/api/planets", create);

app.put("/api/planets/:id", updateById);

app.delete("/api/planets/:id", deliteById);

app.post("/api/planets/:id/image",upload.single("image"),createImage)

app.post("/api/users/login", logIn);

app.post("/api/users/signup", signUp);

app.listen(port, () => {
  console.log(
    `Example app listening on port http://localhost:${port}/api/planets`
  );
});