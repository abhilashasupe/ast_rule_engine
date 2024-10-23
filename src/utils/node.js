
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
}

export default Node; 