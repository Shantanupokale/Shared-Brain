import express from "express";

import { signup,signin } from "../controllers/authlogic";

const router = express.Router();

router.post("/signin",signin);

router.post("/signup", signup);

// router.post("/logout", logout);



export default router;


