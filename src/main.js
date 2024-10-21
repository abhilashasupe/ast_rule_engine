import express from 'express'; // Use import for ES module
import connectDB from './connect.js'; // Import the MongoDB connection function
// import ast_model from './astSchema.js';   // AST model
import { parseRule } from './parser.js'; // Import the parseRule function
import ast_rule from './schema.js'; // Import the mongoose schema
import { fetchRule } from './controller.js'; // Import the fetchRule controller
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

const app = express(); // Create an Express application
app.use(express.json());

// Define a route handler for the root URL ('/')
app.get('/', (req, res) => {
  res.send('Hello World'); // Send 'Hello World' response
});


const insertAstToDB = async (rule, ruleName) => {
    try {
    //   const tokens = tokenize(rule); // Tokenize the rule
      const ast = parseRule(rule); // Parse the AST
  
      // Stringify the AST
      const astString = JSON.stringify(ast);
  
      // Create a new AST document
      const newAst = new ast_rule({
        ruleName,
        astString
      });
  
      // Save to database
      await newAst.save();
      console.log(`AST for rule "${ruleName}" saved successfully.`);
    } catch (err) {
      console.error('Error saving AST:', err);
    }
  };
  
  // Example usage
  const rule = "((age > 30 AND department == 'Sales') OR (age < 25 AND department == 'Marketing')) AND (salary > 50000 OR experience > 5)";
  insertAstToDB(rule, "Sample Rule");


// Set the app to listen on port 3333
const PORT = 3333;
const run = async()=>{
    try{
        // await connectDB(process.env.MONGO_URI)
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