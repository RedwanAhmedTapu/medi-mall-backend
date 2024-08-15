import express from 'express';
import { registerUser, verifyEmail, loginUser, refreshToken } from '../controller/userController';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const uploadPath = path.join(__dirname, '../public/uploads');
const storage = multer.diskStorage({
  destination: uploadPath,
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

router.post('/register', upload.single('photo'), registerUser);
router.get('/verify-email', verifyEmail);
router.post('/login', loginUser);
router.post('/refresh-token', refreshToken);

export default router;
