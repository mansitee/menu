const specialChars = ['!', '\"', '#', '$','%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '~', '`', '{', '|', '}', '_'];

const passGenBtn = document.getElementById('display-btn');

function randLetterGen(startASCII){
    let num = randNumGen(25);
    return String.fromCharCode(num + startASCII);
}

// Generates random number between an y two given values
function randNumGen(max, min = 0){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function generatePassword(){
    let password = Array.from({length: 8}); // creates 8 empty space in an array;

    // one uppercase value
    let randUppercase = randLetterGen(65);
    // one lowecase value
    let randLowercase = randLetterGen(97);
    // one special character
    let randSpecialChar = specialChars[randNumGen(specialChars.length)];
    // one numeric value
    let randNumeric = randNumGen(9);

    // first 8 random password
    for(let i = 0; i < password.length; i++){
        // refer ASCII table for these values
        let maxValue = 126;
        let minValue = 33;
        let randNum = randNumGen(126, 33);
        password[i] = String.fromCharCode(randNum);
    }

    // console.log(password);

    ///mandatory values
    let insertIdx;

    insertIdx = randNumGen(7); // upto here password length = 8
    password.splice(insertIdx, 0, randUppercase); 

    insertIdx = randNumGen(8); // upto here password length = 9
    password.splice(insertIdx, 0, randLowercase); 

    insertIdx = randNumGen(9); // upto here password length = 10
    password.splice(insertIdx, 0, randSpecialChar); 

    insertIdx = randNumGen(10); // upto here password length = 11
    password.splice(insertIdx, 0, randNumeric); 

    return password.join("");

}

passGenBtn.addEventListener('click', () => {
    let pass = generatePassword();
    document.getElementById('display-box').firstElementChild.textContent = pass;
});
