async function createUser(user) {

    loading.style.display = "block";
    errorMessage.textContent = "";

    try {

        const response = await fetch(
            "https://example.com/users",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(user)
            }
        );

        if (!response.ok) {
            throw new Error(
                `Request failed: ${response.status}`
            );
        }

        const data = await response.json();

        console.log(data);

    } catch (error) {

        errorMessage.textContent = error.message;

    } finally {

        loading.style.display = "none";
    }
}
