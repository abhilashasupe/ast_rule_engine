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
json
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
### Node Fields

- **type**: Either `"operator"` (e.g., AND/OR) or `"operand"` (conditions like `age > 25`).
- **left**: Reference to another node (left child, for binary operators).
- **right**: Reference to another node (right child, for binary operators).
- **value**: For operand nodes, the value used for comparison (e.g., 25 for `age > 25`).
### Data Storage

- Define the choice of database for storing the rules and application metadata.
- Example: MongoDB is used for storing AST representations as JSON strings.
  
#### Schema Example


{
  "ruleName": "example_rule",
  "astString": "{\"type\":\"operator\",\"left\":{\"type\":\"operand\",\"field\":\"age\",\"comparator\":\">\",\"value\":30},\"right\":{\"type\":\"operand\",\"field\":\"salary\",\"comparator\":\">\",\"value\":50000},\"operator\":\"AND\"}"
}
### API Design

1. **create_rule(rule_string)**: 
   - This function takes a string representing a rule (e.g., `age > 30 AND salary > 50000`) and converts it into an Abstract Syntax Tree (AST).
   - The rule string is parsed into a `Node` structure that can be stored and evaluated.
   
   Example:
   - Input: `"age > 30 AND salary > 50000"`
   - Output: 
   
     ```json
     {
       "type": "operator",
       "operator": "AND",
       "left": {
         "type": "operand",
         "field": "age",
         "comparator": ">",
         "value": 30
       },
       "right": {
         "type": "operand",
         "field": "salary",
         "comparator": ">",
         "value": 50000
       }
     }
     ```

2. **combine_rules(rules)**: 
   - Takes two or more rules and combines them using a logical operator (e.g., AND/OR).
   - The combined rules form a new AST that minimizes redundant checks.
   - Returns the root node of the combined AST.
   
   Example:
   - Input: Two rules `"age > 30"` and `"salary > 50000"` with an `AND` operator.
   - Output: Combined AST
   
     ```json
     {
       "type": "operator",
       "operator": "AND",
       "left": {
         "type": "operand",
         "field": "age",
         "comparator": ">",
         "value": 30
       },
       "right": {
         "type": "operand",
         "field": "salary",
         "comparator": ">",
         "value": 50000
       }
     }
     ```

3. **evaluate_rule(JSON data)**: 
   - Takes the combined rule’s AST and a JSON object representing user data.
   - Example of input data: 
   
     ```json
     {
       "age": 35,
       "department": "Sales",
       "salary": 60000,
       "experience": 3
     }
     ```

   - Evaluates the rule against the user’s attributes.
   - Returns `True` if the user meets the rule criteria, otherwise returns `False`.

#### Example API Endpoints

1. **POST /insert-rule**
   - Inserts a new rule in the AST form into the database.
   - Request Body Example:
   
     ```json
     {
       "ruleName": "age_salary_rule",
       "rule": "(age > 30 AND salary > 50000)"
     }
     ```

2. **POST /combine-rules**
   - Combines two existing rules using an operator (AND/OR).
   - Request Body Example:
   
     ```json
     {
       "ruleName1": "age_rule",
       "ruleName2": "salary_rule",
       "operator": "AND",
       "newRuleName": "combined_rule"
     }
     ```

3. **POST /evaluate-rule**
   - Evaluates the provided user data against the selected rule.
   - Request Body Example:
   
     ```json
     {
       "ruleName": "combined_rule",
       "userData": {
         "age": 35,
         "salary": 60000
       }
     }
     ```

   - Returns whether the user data satisfies the rule (`True` or `False`).
