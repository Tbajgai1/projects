import express from "express";
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser";

import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import commentLikesRouts from "./routes/commentlikes.js";



const allowedOrigins = ['http://localhost:3000'];

const corsOptions = {
    origin: "*",
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());


// upload prof image 
const profImgStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/profImg');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = file.originalname.split('.').pop();
    const newFileName = `${uniqueSuffix}.${fileExtension}`;
    cb(null, newFileName);
  }
});

const uploadProfImage = multer({ storage: profImgStorage });

app.post('/api/profImg', uploadProfImage.single('file'), function (req, res) {
  const file = req.file;
  if (!file) {
    return res.status(400).json("File upload failed");
  }
  res.status(200).json(file.filename);
});


// Upload blog images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/upload');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = file.originalname.split('.').pop();
    const newFileName = `${uniqueSuffix}.${fileExtension}`;
    cb(null, newFileName);
  }
})

const upload = multer({ storage });

app.post('/api/upload', upload.single('file'), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use('/profile-images', express.static('client/public/profImg'));

app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/commentlikes", commentLikesRouts);




app.listen(8800, () => {
    console.log("localhost running fine! connected");
})

