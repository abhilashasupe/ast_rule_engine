import Node from './node.js'; 
  
function tokenize(rule) {
  const regex = /\s*(\(|\)|AND|OR|>|<|>=|<=|==|!=|'[^']*'|[a-zA-Z_]\w*|\d+)\s*/g;   // global flag allows exec to NOT get stuk in inf loop
  const tokens = [];
  let match;
  while (match = regex.exec(rule)) {
    if(match[1]) tokens.push(match[1]);
  }
  return tokens;
}

function isOperator(token) {
  return token === 'AND' || token === 'OR';
}

function isComparator(token) {
  return ['>', '<', '>=', '<=', '==', '!='].includes(token);
}

function parseValue(value) {
  if (value.startsWith("'") && value.endsWith("'")) {
    return value.slice(1, -1); // Remove quotes from strings
  }
  return parseFloat(value); // Convert numbers to floats
}

function parseExpression(tokens, index = 0) {
  let current = null;

  while (index < tokens.length) {
    const token = tokens[index];

    if (token === '(') {
      const [subExpr, newIndex] = parseExpression(tokens, index + 1);
      if (current === null) {
        current = subExpr;
      } else {
        current.right = subExpr;
      }
      index = newIndex; // Move index past the closing parenthesis
    } else if (token === ')') {
      return [current, index];
    } else if (isOperator(token)) {
      const operatorNode = new Node('operator', current, null, token);
      current = operatorNode;
    } else if (isComparator(token)) {
      const field = tokens[index - 1]; // Get the field (e.g., 'age')
      const value = tokens[index + 1]; // Get the value (e.g., 30)
      const operandNode = new Node('operand', null, null, null, parseValue(value), field, token);
      if(!current) current = operandNode;
      else current.right = operandNode;
      index += 1; // Skip over the value token
    } 
    index += 1;
  }
  return [current, index];
}


export function parseRule(rule) {
  const tokens = tokenize(rule);
  const [ast, _] = parseExpression(tokens,0);
  return ast; 
}