import ast_rule from './schema.js'; 
import { parseRule } from './parser.js'; 

const insertAstToDB = async (rule, ruleName) => {
    try {
      const ast = parseRule(rule); 
      const astString = JSON.stringify(ast);
  
      const newAst = new ast_rule({
        ruleName,
        astString
      });
  
      await newAst.save();
      console.log(`AST for rule "${ruleName}" saved successfully.`);
    } catch (err) {
      console.error('Error saving AST:', err);
    }
  };

const fetchRule = async (ruleName, userData) => {
  try {
    const astDocument = await ast_rule.findOne({ ruleName });

    if (!astDocument) {
      throw new Error(`Rule with name "${ruleName}" not found.`);
    }

    const ast = JSON.parse(astDocument.astString);
    const isEligible = evaluate(ast, userData); 

    return { ast, isEligible }; 
    } catch (error) {
    console.error('Error fetching rule:', error);
    throw error; 
  }
};

const evaluate = (node, data) => {
  if (node.type === 'operand') {
    return is_valid(node, data);
  } 
  else if (node.type === 'operator') {
    const leftValue = evaluate(node.left, data);
    const rightValue = evaluate(node.right, data);

    if (node.operator === 'AND') {
      return leftValue && rightValue;
    } else if (node.operator === 'OR') {
      return leftValue || rightValue;
    } else {
      throw new Error(`Unknown operator: ${node.operator}`);
    }
  } 
  else {
    throw new Error(`Unknown node type: ${node.type}`);
  }
};
   
const is_valid = (node,data) =>
  {
    if(node.type === 'operand')
    {
      if (!(node.field in data)) {
        throw new Error(`Field ${node.field} not found in data`);
      }
      let this_f = data[node.field] ;
      let this_c = node.comparator ;
      let this_v = node.value ;

      switch (this_c) {
        case '<':  return this_f < this_v;
        case '>':  return this_f > this_v;
        case '==': return this_f == this_v;
        case '!=': return this_f != this_v;
        case '>=': return this_f >= this_v;
        case '<=': return this_f <= this_v;
        default:
          throw new Error(`Unknown comparator: ${this_c}`);
      }
    }
  }

export  { insertAstToDB, fetchRule }
                                