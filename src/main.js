import express from 'express'; 
import connectDB from './connect.js'; 
import { insertAstToDB, fetchRule } from './controller.js'; 

import dotenv from 'dotenv';
dotenv.config(); 
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World'); 
});

app.post('/insert-rule', async (req, res) => {
  const { astString, ruleName } = req.body;
  try {
    await insertAstToDB(astString, ruleName); 
    res.status(200).json({ message: `AST for rule "${ruleName}" inserted successfully` });
  } catch (error) {
    // console.error('Error inserting AST:', error);
    res.status(500).json({ message: 'Error inserting AST', error: error.message });
  }
});

app.post('/evaluate-rule', async (req, res) => {
    const { userData, ruleName } = req.body;
    try{
        const { ast, isEligible}  = await fetchRule(ruleName, userData); 
        // console.log("Fetched AST:", ast);
        // console.log("This data is eligible if true:", isEligible);
        res.status(200).json({ message: ` is eligible : ` , isEligible });
      }catch(error) {
          // console.error('Error testing eligibility:', error);
          res.status(500).json({ message: 'Error fetching rule ', error: error.message });
      }
});
 

const PORT = 3333;
const run = async()=>{
    try{
        await connectDB (process.env.MONGO_URI);
        app.listen(PORT,()=>{
            console.log("server is running on port : ", PORT)            
        })
    }
    catch(error){
        console.log('Error starting the server:',error)
    }
}

run()