document.getElementById("insertRuleForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const ruleName = document.getElementById("ruleName").value;
    const rule = document.getElementById("rule").value;
    const messageElement = document.getElementById("insertRuleMessage");

    try {
        const response = await fetch("http://localhost:3333/create-rule", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ruleName: ruleName,
                rule: rule,
            }),
        });

        const data = await response.json();
        messageElement.textContent = `Success: ${data.message}`;
        messageElement.style.color = "green";
    } catch (error) {
        messageElement.textContent = "Error inserting rule: " + error;
        messageElement.style.color = "red";
    }
});

document.getElementById("compareRuleForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const ruleToCompare = document.getElementById("ruleToCompare").value;
    const userData = JSON.parse(document.getElementById("userData").value);
    const messageElement = document.getElementById("compareResultMessage");

    try {
        const response = await fetch("http://localhost:3333/evaluate-rule", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ruleName: ruleToCompare,
                userData: userData,
            }),
        });

        const result = await response.json();
        messageElement.textContent = `Comparison result: User is eligible - ${result}`;
        messageElement.style.color = "green";
    } catch (error) {
        messageElement.textContent = "Error comparing rule: " + error;
        messageElement.style.color = "red";
    }
});

document.getElementById("combineRulesForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const firstRule = document.getElementById("firstRule").value;
    const secondRule = document.getElementById("secondRule").value;
    const newRuleName = document.getElementById("newRuleName").value;
    const operator = document.getElementById("operator").value;
    const messageElement = document.getElementById("combineRulesMessage");

    try {
        const response = await fetch("http://localhost:3333/combine-rules", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ruleName1: firstRule,
                ruleName2: secondRule,
                newRuleName: newRuleName,
                operator: operator,
            }),
        });

        const data = await response.json();
        messageElement.textContent = `Success: ${data.message}`;
        messageElement.style.color = "green";
    } catch (error) {
        messageElement.textContent = "Error combining rules: " + error;
        messageElement.style.color = "red";
    }
});

document.getElementById("updateRuleForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const ruleName = document.getElementById("updateRuleName").value;
    const updatedRule = document.getElementById("updatedRule").value;

    try {
        const response = await fetch("http://localhost:3333/update-rule", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ruleName: ruleName,
                updatedRule: updatedRule
            }),
        });

        const data = await response.json();
        document.getElementById("updateRuleMessage").textContent = `Rule update status: ${data.message}`;
    } catch (error) {
        document.getElementById("updateRuleMessage").textContent = `Error updating rule: ${error.message}`;
    }
});

