document.getElementById("insertRuleForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const ruleName = document.getElementById("ruleName").value;
    const rule = document.getElementById("rule").value;

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
        console.log("Rule inserted:", data);
    } catch (error) {
        console.error("Error inserting rule:", error);
    }
});

document.getElementById("compareRuleForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const ruleToCompare = document.getElementById("ruleToCompare").value;
    const userData = JSON.parse(document.getElementById("userData").value);

    try {
        const response = await fetch(`http://localhost:3333/evaluate-rule`, {
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
        console.log("Comparison result:", result);
    } catch (error) {
        console.error("Error comparing rule:", error);
    }
});

document.getElementById("combineRulesForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const firstRule = document.getElementById("firstRule").value;
    const secondRule = document.getElementById("secondRule").value;
    const newRuleName = document.getElementById("newRuleName").value;
    const operator = document.getElementById("operator").value;

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
        console.log("Rules combined:", data);
    } catch (error) {
        console.error("Error combining rules:", error);
    }
});
