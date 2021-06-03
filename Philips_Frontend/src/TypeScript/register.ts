const buttonRegister = document.getElementById("buttonRegister");
let HtmlErrorRegister = (<HTMLInputElement>document.getElementById("errorRegister"));
let HtmlcorrectRegister = (<HTMLInputElement>document.getElementById("correctRegister"));
let roleRegister = (<HTMLInputElement>document.getElementById("roleRegister"));
let nameRegister = (<HTMLInputElement>document.getElementById("nameRegister"));
let passwordRegister = (<HTMLInputElement>document.getElementById("passwordRegister"));

// button click activation
window.onload = function () {
    buttonRegister.addEventListener("click", function () {
        Register(roleRegister.value, nameRegister.value, passwordRegister.value)
    });
}

// sends user input and gets calculated insuline dose with validation
function Register(role: string, name: string, password: string) {
    var params = 'role=' + role + "&name=" + name + "&password=" + password;
    var url = 'http://localhost:3000/register/?' + params;

    fetch(url)
        .then(res => res.json())
        .then((out) => {
            if (out.valid == "true") {
                HtmlcorrectRegister.style.display = "block";
                HtmlErrorRegister.style.display = "none";

                location.href = "login.html";

            }
            else {
                HtmlErrorRegister.style.display = "block";
                HtmlcorrectRegister.style.display = "none";
            }
        })
}
