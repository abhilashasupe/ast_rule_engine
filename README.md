# Rule Engine with Abstract Syntax Tree (AST)

## Objective

The Rule Engine is a simple 3-tier application with a **frontend UI**, **API backend**, and a **database** for storing rules and application metadata. The purpose of this system is to dynamically create, combine, and evaluate rules to determine user eligibility based on attributes like **age**, **department**, **income**, **spend**, etc. The rules are represented as **Abstract Syntax Trees (AST)**.

## Features
1. **Dynamic Rule Creation**: Create rules using a string input that will be parsed into an AST.
2. **Rule Combination**: Combine two rules with logical operators like AND/OR.
3. **Rule Evaluation**: Evaluate if a user matches the rule based on a set of attributes (age, income, etc.).
4. **Rule Modification**: Modify existing rules (e.g., changing operators or conditions).
5. **Frontend Interface**: A simple UI that allows interaction with the system for rule creation, evaluation, and combination.

---

## Data Structure

### Abstract Syntax Tree (AST)

- Each rule is represented as an AST with nodes that represent either an **operand** (a condition) or an **operator** (AND/OR).
  
Example of a node in the AST:
```json
{
  "type": "operator",
  "operator": "AND",
  "left": {
    "type": "operand",
    "field": "age",
    "comparator": ">",
    "value": 25
  },
  "right": {
    "type": "operand",
    "field": "salary",
    "comparator": ">=",
    "value": 50000
  }
}
