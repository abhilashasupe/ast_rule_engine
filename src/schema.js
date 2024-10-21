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
// module.exports = mongoose.model ("ast_rule" , ast_rule)
// Create the model from the schema
// const ast_model = mongoose.model('ast_rule', ast_rule);

export default mongoose.model("ast_rule", ast_rule);
