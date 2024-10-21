import mongoose from 'mongoose';

const ast_rule = new mongoose.Schema({
  ruleName: { 
    type: String, 
    required: true 
    }, 
  astString: { 
    type: String, 
    required: true 
    }
});

export default mongoose.model("ast_rule", ast_rule);
