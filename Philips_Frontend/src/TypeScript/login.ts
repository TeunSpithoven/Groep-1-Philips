const buttonLogin = document.getElementById("buttonLogin");
let HtmlErrorLogin = (<HTMLInputElement>document.getElementById("errorLogin"));
let HtmlcorrectLogin = (<HTMLInputElement>document.getElementById("correctLogin"));
let usernameLogin = (<HTMLInputElement>document.getElementById("usernameLogin"));
let passwordLogin = (<HTMLInputElement>document.getElementById("passwordLogin"));

// button click activation
window.onload = function () {
    buttonLogin.addEventListener("click", function () {
        Login(usernameLogin.value, passwordLogin.value);
    });
}

function Login(username: string, password: string){
    var params = 'username=' + username + "&password=" + password;
    var url = 'http://localhost:3000/login/?' + params;
    
    fetch(url)
    .then(res => res.json())
    .then((out) => {
        if(out.valid == "true"){
            HtmlcorrectLogin.style.display = "block";
            HtmlErrorLogin.style.display = "none";
            var userId = String(out.Id);
            var role = String(out.Role);
            console.log("Logged In succesfully with UserId: " , userId);
            
            const date = new Date();
            // Set it expire in 1 hour
            date.setTime(date.getTime() + (1 * 60 * 60 * 1000));

            // Set it
            document.cookie = "Login=" + JSON.stringify(out) + "; expires=" + date.toUTCString() + "; path=/";

            location.href = "history.html";

        }
        else{
            HtmlErrorLogin.style.display = "block";
            HtmlcorrectLogin.style.display = "none";
            
            deleteCookie("Login");
        }
    })
}

function deleteCookie(name: string) {
    const date = new Date();

    // Set it expire in -1 days
    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));

    // Set it
    document.cookie = name+"=; expires="+date.toUTCString()+"; path=/";
}