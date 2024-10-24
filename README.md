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
### Data Storage :  MongoDB is used for storing AST representations as JSON strings.
  
#### Schema Example


  ```json
     {
        "ruleName": "example_rule",
        "astString": "{\"type\":\"operator\",\"left\":{\"type\":\"operand\",\"field\":\"age\",\"comparator\":\">\",\"value\":30},\"right\":  {\"type\":\"operand\",\"field\":\"salary\",\"comparator\":\">\",\"value\":50000},\"operator\":\"AND\"}"
}
  ```

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
    
4. **update_rule(JSON data)**: 
   - Takes a rule name and new rule to be inserted as the input, and inserts the updated rule into DB.
   - Example of input data: 
   
     ```json     
     {
       "ruleName" : "Rule2" ,
       "updatedRule" : "age<30"  
    }
     ```
     
## Instructions to Run the Application

### Prerequisites

- Ensure that you have Node.js installed on your system .
- Install MongoDB on your local machine or have access to a MongoDB cloud instance.

### Step-by-Step Guide to Set Up and Run the Application

1. **Clone the Repository**
     ```bash
     git clone https://github.com/abhilashasupe/ast_rule_engine.git
     ```

2. **Install Backend Dependencies**   
     ```bash
     npm install
     ```

3. **Configure MongoDB and put values in .env**
   - Ensure MongoDB is running locally
   -  
     ```js
     MONGO_URI = mongodb://0.0.0.0:27017/rule_engine 
     PORT = 3333
     ```

4. **Run the Backend**
   - Start the server by going to the src folder and running the following command:
   
     ```bash
     nodemon main.js
     ```
   - The backend server should now be running on `http://localhost:PORT`.

5. **Open the Frontend**
   - Open the `index.html` file in your browser using the Live Server extension in Visual Studio Code or by manually opening it in a browser.
   - The frontend will interact with the backend API running on `http://localhost:3333`.

### API Endpoints

- **POST /create-rule**: Insert a new rule into the system.
- **POST /combine-rules**: Combine two rules using an operator (AND/OR).
- **POST /evaluate-rule**: Evaluate user data against a specific rule.
- **POST /update-rule**: Update an existing rule in the system.

## Front-end##
![image](https://github.com/user-attachments/assets/94c02031-e09d-4546-a8c9-070bc9383480)
![image](https://github.com/user-attachments/assets/8fa6bdb5-3050-445c-a1e7-c743cb5a243e)



