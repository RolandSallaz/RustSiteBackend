import { steamAuth,redirectToAuthLink } from "../controllers/auth";

const router = require('express').Router();

router.get('/steam/', redirectToAuthLink)
router.get('/steam/authenticate', steamAuth)

export default router;