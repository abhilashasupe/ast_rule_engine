// const express = require("express")
import express from 'express'; 
const router = express.Router()
import { createRule, evaluateRule , combineRules } from '../controllers/astController.js'; 

router.route("/create-rule").post(createRule)
router.route("/evaluate-rule").post(evaluateRule)
router.route("/combine-rules").post(combineRules)

export default router ;