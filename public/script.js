const API_URL = '/api/auth';


window.onload = function() {
    const token = localStorage.getItem('token');
    if (token) {
        
        showProfile();
    }
};
function toggleForms() {
    document.getElementById('register-form').style.display = 
        document.getElementById('register-form').style.display === 'none' ? 'block' : 'none';
    document.getElementById('login-form').style.display = 
        document.getElementById('login-form').style.display === 'none' ? 'block' : 'none';
}


async function register() {
    const username = document.getElementById('reg-user').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-pass').value;

    const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();
    alert(data.msg || data.error);
    if (res.ok) toggleForms();
}


async function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-pass').value;

    const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (res.ok) {
        localStorage.setItem('token', data.token); 
        showProfile();
    } else {
        alert(data.msg);
    }
}

async function showProfile() {
    const token = localStorage.getItem('token');
    if (!token) return;

    const res = await fetch(`${API_URL}/user`, {
        method: 'GET',
        headers: { 'x-auth-token': token }
    });
  
const options = { year: 'numeric', month: 'long' };
const today = new Date().toLocaleDateString('en-US', options);
document.querySelectorAll('.stat-card p')[1].innerText = today; 

    const data = await res.json();
    if (res.ok) {
     
        document.getElementById('register-form').style.display = 'none';
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        
       
        document.getElementById('user-name').innerText = data.username;
        document.getElementById('user-email').innerText = data.email;
    } else {
        logout(); 
    }
}

function logout() {
    localStorage.removeItem('token');
    location.reload();
}