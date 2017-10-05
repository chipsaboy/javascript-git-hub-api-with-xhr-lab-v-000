function getRepositories() {
  const name = document.getElementById('username').value
  const link = 'https://api.github.com/users/' + name + '/repos'
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", link)
  req.send()
}
