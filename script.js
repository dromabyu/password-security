/*
    This file contains the JavaScript code for the website.

    JavaScript is a programming language that allows a webpage
    to respond to user actions and update content dynamically.

    In this project, JavaScript evaluates password strength,
    updates the strength meter, and remembers the user's
    password while the page remains stored in the browser.
*/

function checkPassword() {

    // Retrieve the current password entered by the user.
    const password =
        document.getElementById("password").value;

    /*
        Retrieve the visual strength bar so we can change
        its width and color.
    */
    const bar =
        document.getElementById("strength-bar");

    // Retrieve the text element that displays strength results.
    const text =
        document.getElementById("strength-text");

    // Retrieve the feedback area used for improvement suggestions.
    const feedback =
        document.getElementById("feedback");

    /*
        The score starts at zero and increases as the password
        meets security requirements.
    */
    let score = 0;

    // Give one point if the password is at least 8 characters long.
    if(password.length >= 8) score++;

    // Give one point if the password contains an uppercase letter.
    if(/[A-Z]/.test(password)) score++;

    // Give one point if the password contains a lowercase letter.
    if(/[a-z]/.test(password)) score++;

    // Give one point if the password contains a number.
    if(/[0-9]/.test(password)) score++;

    /*
        Give one point if the password contains a special character.

        A special character is a symbol such as:
        ! @ # $ % ^ & * ?
    */
    if(/[^A-Za-z0-9]/.test(password)) score++;

    /*
        If no password has been entered,
        reset the checker and stop the function.
    */
    if(password.length === 0){

        text.innerHTML = "Strength: N/A";

        bar.style.width = "0%";

        feedback.innerHTML = "";

        return;
    }

    /*
        These variables will hold the final results
        shown to the user.
    */
    let strength = "";
    let color = "";
    let width = "";

    /*
        A switch statement selects an outcome
        based on the score value.

        This is similar to a list of "if this score,
        then do this action" rules.
    */
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

    /*
        Update the visible strength text on the webpage.
    */
    text.innerHTML = "Strength: " + strength;

    /*
        Adjust the visual strength meter based on the score.
    */
    bar.style.width = width;

    /*
        Change the meter color to match the strength level.
    */
    bar.style.background = color;
}

/*
    Save password as the user types.

    An event listener waits for a specific action.
    In this case, it waits for input inside the password field.
*/
document.getElementById("password").addEventListener("input", function () {

    /*
        localStorage is browser storage that can save
        information on the user's device.

        This stores the current password so it can be
        restored if the page is refreshed.
    */
    localStorage.setItem("savedPassword", this.value);
});

/*
    Restore the saved password when the page finishes loading.

    The "load" event occurs after the webpage and its resources
    have finished loading in the browser.
*/
window.addEventListener("load", function () {

    // Retrieve the saved password from localStorage.
    const savedPassword = localStorage.getItem("savedPassword");

    // Only continue if a saved password exists.
    if (savedPassword) {

        // Put the saved password back into the input field.
        document.getElementById("password").value = savedPassword;

        // Recalculate the password strength immediately.
        checkPassword();
    }
});
