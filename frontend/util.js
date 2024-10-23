document.getElementById('ruleForm').addEventListener('submit', async function(e) {
    e.preventDefault(); 

    const ruleName = document.getElementById('ruleName').value;
    const rule = document.getElementById('rule').value;
    const messageDiv = document.getElementById('message');
    messageDiv.innerHTML = '';

    try {
        const response = await fetch('http://localhost:3333/insert-rule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ruleName: ruleName,
                rule: rule
            })
        });

        const data = await response.json();

        if (response.ok) {
            messageDiv.innerHTML = `<p class="success">${data.message}</p>`;
        } else {
            messageDiv.innerHTML = `<p class="error">Error: ${data.message}</p>`;
        }
    } catch (error) {
        console.error('Error submitting rule:', error);
        messageDiv.innerHTML = '<p class="error">Failed to submit rule. Please try again.</p>';
    }
});