import ast_rule from "./schema.js";
import { parseRule } from "./parser.js";

const insertAstToDB = async (rule, ruleName) => {
  try {
    const ast = parseRule(rule);
    const astString = JSON.stringify(ast);

    const newAst = new ast_rule({
      ruleName,
      astString,
    });

    await newAst.save();
    console.log(`AST for rule "${ruleName}" saved successfully.`);
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

const evaluateRule = async (ruleName, userData) => {
  try {
    const ast = await fetchRule(ruleName);
    if (!ast) {
      throw new Error(`Rule name "${ruleName}" not fetched.`);
    }
    const isEligible = evaluate(ast, userData);

    return { ast, isEligible };
  } catch (error) {
    console.error("Error evaluating rule:", error);
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

const combineRules = async (ruleName1, ruleName2, operator, newRuleName) => {
  try {
    const ast1 = await fetchRule(ruleName1);
    const ast2 = await fetchRule(ruleName2);

    if (!ast1) {
      throw new Error(`Rule name "${ruleName1}" not fetched.`);
    }
    if (!ast2) {
      throw new Error(`Rule name "${ruleName2}" not fetched.`);
    }
    // console.log("ast1 : ", ast1);
    // console.log("ast2 : ", ast2);

    const newRule = {
      type: "operator",
      left: ast1,
      right: ast2,
      operator: operator,
    };
    const astString = JSON.stringify(newRule);
``
    const newAst = new ast_rule({
      ruleName : newRuleName,
      astString,
    });

    try {
      await newAst.save();
      // console.log(" Combined rule inserted successfully: ");
    } catch (error) {
      console.log("Error inserting combined rule : ", error);
    }
  } catch (error) {
    console.log("Error combining rules : ", error);
  }
};

export { insertAstToDB, evaluateRule, combineRules };
