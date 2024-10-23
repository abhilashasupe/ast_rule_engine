import ast_rule from "../models/schema.js";
import { parseRule } from "../utils/parser.js";

const createRule = async (req, res) => {
  const { rule, ruleName } = req.body;
  try {
    if (!rule || !ruleName) {
      throw new Error("Rule and rule name are required.");
    }
    const ast = parseRule(rule);
    const astString = JSON.stringify(ast);

    const newAst = new ast_rule({
      ruleName,
      astString 
    });

    await newAst.save();
    res.status(200).json({ message: `AST for rule "${ruleName}" inserted successfully` });
  } catch (err) {
    console.error("Error saving AST:", err);
  }
};

const fetchRule = async (ruleName) => {
  try {
    const astDocument = await ast_rule.findOne({ ruleName });
    if (!astDocument) {
      throw new Error(`Rule with name "${ruleName}" not found.`);
    }
    const ast = JSON.parse(astDocument.astString);
    return ast;
  } catch (error) {
    console.error("Error fetching rule:", error);
    throw error;
  }
};

const evaluateRule = async (req, res) => {
    const { userData, ruleName } = req.body;
  try {
    const ast = await fetchRule(ruleName);
    if (!ast) {
      throw new Error(`Rule name "${ruleName}" not fetched.`);
    }
    const isEligible = evaluate(ast, userData);
    
    res.send(isEligible).status(200);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rule ', error: error.message });
    throw error;
  }
};

const evaluate = (node, data) => {
  if (node.type === "operand") {
    return is_valid(node, data);
  } else if (node.type === "operator") {
    const leftValue = evaluate(node.left, data);
    const rightValue = evaluate(node.right, data);

    if (node.operator === "AND") {
      return leftValue && rightValue;
    } else if (node.operator === "OR") {
      return leftValue || rightValue;
    } else {
      throw new Error(`Unknown operator: ${node.operator}`);
    }
  } else {
    throw new Error(`Unknown node type: ${node.type}`);
  }
};

const is_valid = (node, data) => {
  if (node.type === "operand") {
    if (!(node.field in data)) {
      throw new Error(`Field ${node.field} not found in data`);
    }
    let this_f = data[node.field];
    let this_c = node.comparator;
    let this_v = node.value;

    switch (this_c) {
      case "<":
        return this_f < this_v;
      case ">":
        return this_f > this_v;
      case "==":
        return this_f == this_v;
      case "!=":
        return this_f != this_v;
      case ">=":
        return this_f >= this_v;
      case "<=":
        return this_f <= this_v;
      default:
        throw new Error(`Unknown comparator: ${this_c}`);
    }
  }
};

const combineRules = async (req, res) => {
  const { ruleName1, ruleName2, operator, newRuleName } = req.body ;
  try {
    const ast1 = await fetchRule(ruleName1);
    const ast2 = await fetchRule(ruleName2);

    if (!ast1) {
      throw new Error(`Rule name "${ruleName1}" not fetched.`);
    }
    if (!ast2) {
      throw new Error(`Rule name "${ruleName2}" not fetched.`);
    }
    const newRule = {
      type: "operator",
      left: ast1,
      right: ast2,
      operator: operator,
    };
    const astString = JSON.stringify(newRule);
    const newAst = new ast_rule({
      ruleName : newRuleName,
      astString,
    });

    try {
      await newAst.save();
      res.status(200).json({ message: ` rules combined successfully ` });
      // console.log(" Combined rule inserted successfully: ");
    } catch (error) {
      res.status(500).json({ message: 'Error inserting combined rules ', error: error.message });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error combining rules ', error: error.message });
  }
};

const updateRule = async (req, res) => {
  const { ruleName, updatedRule } = req.body;
  try {
    const existingRule = await ast_rule.findOne({ ruleName });
    if (!existingRule) {
      throw new Error(`Rule "${ruleName}" not found.`);
    }

    const parsedUpdatedRule = parseRule(updatedRule);
    console.log("p : ",parsedUpdatedRule)  
    existingRule.astString = JSON.stringify(parsedUpdatedRule);

    await existingRule.save();
    res.status(200).json({ message: `Rule "${ruleName}" updated successfully.` });
  } catch (err) {
    res.status(500).json({ message: "Error updating rule: " + err.message });
  }
};

export { createRule, evaluateRule, combineRules , updateRule };
