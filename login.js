/*
  login.js
  - Purpose: Handle a simple login form that stores the user's email in
    localStorage as `bakery_user` and redirects to the `next` page if provided.
*/
function qs(name){
  return new URLSearchParams(location.search).get(name);
}

// Handle the login form submit: save email and redirect to next page
document.getElementById('login-form').addEventListener('submit', (e)=>{
  e.preventDefault();
  const email = document.getElementById('email').value;
  localStorage.setItem('bakery_user', email);
  const next = qs('next');
  if(next){
    if(next === 'checkout') location.href = 'checkout.html';
    else location.href = next + '.html';
    return;
  }
  document.getElementById('message').textContent = 'Logged in as '+email;
});
