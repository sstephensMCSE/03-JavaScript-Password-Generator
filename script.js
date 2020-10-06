// 03-JavaScript-Password-Generator

document.querySelector("#generatePassword").addEventListener("click", writePassword);
document.querySelector("#clipboard").addEventListener("click", writeClipboard);

// Array of messages for fun.
messages = [
    "Keep your passwords safe.",
    "I love passwords!",
    "Passwords, passwords, passwords!",
    "Sure, no problem.",
    "Yep, another one for you.",
    "OK.",
    "Bam! New password!",
    "Call me the 'Genie of the passwords!'",
    "OK, another password.",
    "Alright, here you go.",
    "You want another one?",
    "Really? Another one? OK.",
    "Shazaaam!",
    "Here's a password!"
]

// All the character options.
var charOptions = {
    'upper': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    'lower': 'abcdefghijklmnopqrstuvwxyz',
    'number': '0123456789',
    'special': '!$%^&*()-=+[]{};#:@~,./<>?'
};

// Generate the default welcome message
document.getElementById("welcomeMessage").innerHTML = messages[0];

//generate the password from the options selected
function randomPassword(passwordLength, chararray) {
var allChars = "";
    for (var i = 0; i < chararray.length; i++) {
        allChars += chararray[i];
    }
    var numChars = allChars.length;
    var password = "";
    for (var i = 1; i <= passwordLength; i++) {
        password += allChars.charAt(Math.floor(Math.random() * numChars));
    }
    return password;
}

// Generate a new password option array
function generatePassword(passwordLength) {
    // Convert checkboxes to boolean values
    upperChecked = (document.getElementById('optionUpper').checked == "1");
    lowerChecked = document.getElementById('optionLower').checked;
    numberChecked = document.getElementById('optionNumbers').checked;
    symbolChecked = document.getElementById('optionSymbols').checked;

    // Create the array of possible  characters
    var chararray = [];
    for (id in charOptions) {
        if ( id  === "upper"  && upperChecked) {
            chararray.push(charOptions.upper);
        }
        if ( id  === "lower"  && lowerChecked) {
            chararray.push(charOptions.lower);
        }
        if ( id  === "number"  && numberChecked) {
            chararray.push(charOptions.number);
        }
        if ( id  === "special"  && symbolChecked) {
            chararray.push(charOptions.special);
        }
    }  
    // If no options were checked then display an error and reload the page
    if ( !upperChecked && !lowerChecked && !numberChecked && !symbolChecked ) {
        alert("You must choose at least one option")
        window.location.reload();
    }
    // Get the password length.
    var length = document.getElementById('optionLength');    
    var passwordLength = optionLength.value;
    if (passwordLength < 8 || passwordLength > 128){
        alert("Password length must be between 8 and 128")
        window.location.reload();
    }

    // Call the password generator with the length and array of options.
    var password = randomPassword(passwordLength, chararray);
    return password;    
}

function writePassword() {
    // Write the password to our text box.
    var password = generatePassword();
    var $display = document.getElementById('displayPassword');
    $display.textContent  = password;

    //Write a new message.
    var num = Math.floor(Math.random() * messages.length);
    document.getElementById("welcomeMessage").innerHTML = messages[num];
}

// Write password to the system clipboard (Generated Password) input
function writeClipboard() {
    document.getElementById("displayPassword").select();
    document.execCommand("Copy");
    alert("Your password has now been copied to the clipboard");
}
