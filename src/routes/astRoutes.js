// const express = require("express")
import express from 'express'; 
const router = express.Router()
import { insertAstToDB, evaluateRule , combineRules } from '../controllers/astController.js'; 

router.route("/insert-rule").post(insertAstToDB)
router.route("/evaluate-rule").post(evaluateRule)
router.route("/combine-rules").post(combineRules)

export default router ;