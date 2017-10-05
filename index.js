function getRepositories() {
  const name = document.getElementById('username').value
  const link = 'https://api.github.com/users/' + name + '/repos'
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", link)
  req.send()
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = "<ul>" + repos.map(repo => {
   const dataUsername = 'data-username="' + repo.owner.login + '"'
   const dataRepoName = 'data-repository="' + repo.name + '"'
   return (`
     <li>
     <h2> ${repo.name} </h2>
     <a href="${repo.html_url}">${repo.html_url}</a><br>
     <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
     <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a>
     </li>
   `) }).join("") + "</ul>"
   document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener("load", showCommits)
  req.open("GET", 'https://api.github.com/repos/chipsaboy/' + name + '/commits')
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.commit.author.name + ' (' +  commit.author.login + ')</strong>' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}
