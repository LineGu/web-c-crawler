import express from 'express';
import champDataController from '../controllers/champDatas';
const router = express.Router();

router.get('/', champDataController.getProgressNum);

export default router;