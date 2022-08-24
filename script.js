let name = document.getElementById('name');
let username = document.getElementById('username');
let password = document.getElementById('password');
let tagline = document.getElementById('tagline');
let description = document.getElementById('description');
let email = document.getElementById('email');

const addUser = (name, username, password, tagline, description, email) =>{
    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: name.val(),
            username: username.val(),
            password: password.val(),
            tagline: tagline.val(),
            description: description.val(),
            email: email.val()
        }).then(response => response.json())});
};