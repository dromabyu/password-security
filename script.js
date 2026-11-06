function checkPassword() {

    const password =
        document.getElementById("password").value;

    const bar =
        document.getElementById("strength-bar");

    const text =
        document.getElementById("strength-text");

    const feedback =
        document.getElementById("feedback");

    let score = 0;

    if(password.length >= 8) score++;
    if(/[A-Z]/.test(password)) score++;
    if(/[a-z]/.test(password)) score++;
    if(/[0-9]/.test(password)) score++;
    if(/[^A-Za-z0-9]/.test(password)) score++;

    if(password.length === 0){
        text.innerHTML = "Strength: N/A";
        bar.style.width = "0%";
        feedback.innerHTML = "";
        return;
    }

    let strength = "";
    let color = "";
    let width = "";

    switch(score){

        case 1:
        case 2:
            strength = "Weak";
            color = "red";
            width = "25%";
            feedback.innerHTML =
            "Add uppercase letters, numbers, and special characters.";
            break;

        case 3:
            strength = "Moderate";
            color = "orange";
            width = "50%";
            feedback.innerHTML =
            "Good start. Increase length and complexity.";
            break;

        case 4:
            strength = "Strong";
            color = "#00bfff";
            width = "75%";
            feedback.innerHTML =
            "Strong password. Consider adding more length.";
            break;

        case 5:
            strength = "Excellent";
            color = "#00ff88";
            width = "100%";
            feedback.innerHTML =
            "Excellent password strength.";
            break;
    }

    text.innerHTML = "Strength: " + strength;
    bar.style.width = width;
    bar.style.background = color;
}