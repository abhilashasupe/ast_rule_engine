
class Node {
  constructor(type, left = null, right = null, operator= null, value=null , field =null, comparator = null) {
    this.type = type; // "operator" or "operand"
    this.left = left;  // reference to another Node
    this.right = right; // reference to another Node 
    if (this.type === 'operator') {
      this.operator = operator; // 'AND' or 'OR'
    } else if (this.type === 'operand') {
      this.value = value; // Operand value (e.g., 30)
      this.field = field; // Field name (e.g., 'age')
      this.comparator = comparator; // Comparator (e.g., '>')
    }
  }

  is_valid(data)
  {
    if(this.type === 'operand')
    {
      if (!(this.field in data)) {
        throw new Error(`Field ${this.field} not found in data`);
      }
      let this_f = data[this.field] ;
      let this_c = this.comparator ;
      let this_v = this.value ;

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

  evaluate(data) {
    if( this.type === 'operand')
      return this.is_valid(data) ;
    else if( this.type === 'operator') {
      const leftValue = this.left.evaluate(data);
      const rightValue = this.right.evaluate(data);
      if (this.operator === 'AND') {
        return leftValue && rightValue;
      } else if (this.operator === 'OR') {
        return leftValue || rightValue;
      } else {
        throw new Error(`Unknown operator: ${this.operator}`);
      }
    } 
    else {
      throw new Error(`Unknown node type: ${this.type}`);
    }
  }
}

export default Node; // Ensure this line is present

// module.exports = Node;
