
const token = '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';
getApiGitHub();

function getApiGitHub() {
    fetch('https://api.github.com/users/iagogmoyses', {
         headers: {
             'Authorization': `token ${token}`
         }
    })

        .then(async res => {
            if (!res.ok) {
                throw new Error(res.status);
            }

            let data = await res.json();
            console.log(data)
            
            let nomes = document.querySelectorAll('.nome')
            let bio = document.querySelectorAll('.bio');
            let local = document.getElementById('local');
            local.innerHTML = data.location
            let avatar = document.getElementById('img')
            avatar.src = data.avatar_url
            let site = document.getElementById('blog')
            site.href = data.blog
            site.innerHTML = data.blog
            let git=document.getElementById("git")
            git.href = data.html_url;
            git.innerHTML = data.html_url
            let follo = document.getElementById('follo')
            follo.innerHTML = data.followers
            nomes.forEach(nomes => {
                nomes.innerHTML = data.name
            })
            bio.forEach(bio => {
                bio.innerHTML = data.bio
            })
        })
}
document.addEventListener("DOMContentLoaded", function () {
    const repositories = document.getElementById('content-main');

    function repos() {
        fetch('https://api.github.com/users/iagogmoyses/repos', {
             headers: {
                 'Authorization': `token ${token}`
             }
        })
            .then(async res => {
                if (!res.ok) {
                    throw new Error(res.status);
                }
                let date = await res.json();
                let repoo = document.getElementById('reponum');
            repoo.innerHTML = `Repositorios (${date.length})`;
                date.map(item => {
                    let project = document.createElement('div');
                    project.className = 'ml-2 mb-1';
                    project.innerHTML = `<div class="card" style="width: 18rem; height: 19rem">
  <div class="card-body">
    <a href='repo.html?id=${item.id}' ><h5 class="card-title">${item.name}</h5></a>
    <h6 class="card-subtitle mb-2 text-body-secondary">User: ${item.owner.login}</h6>
    <p class="card-text">${item.description}</p>
    <img src="assets/img/ic--sharp-star-outline.png" style="width: 25px">${item.stargazers_count}</img>
    <img src="assets/img/pessoaaaa.png" style="width: 25px">${item.watchers_count}</img>
  </div>
</div>`;
                    repositories.appendChild(project);
                });
                console.log(date);
            })
            .catch(error => console.error('Erro ao buscar os repositórios:', error));
    }
    
    repos();
});
document.addEventListener("DOMContentLoaded", function () {
    const friends = document.getElementById('content-friends');

    function repos() {
        fetch('https://api.github.com/users/iagogmoyses/followers', {
             headers: {
                 'Authorization': `token ${token}`
             }
        })
            .then(async res => {
                if (!res.ok) {
                    throw new Error(res.status);
                }
                let frie = await res.json();
                frie.map(item => {
                    let frie1 = document.createElement('div');
                    frie1.className = 'ml-2 mb-1';
                    frie1.innerHTML = `<div class="col-4 col-lg-1"><img src="${item.avatar_url}" alt=""
                        style=" padding: 3px; border: 2px solid rgb(119, 119, 119); width: 90px; height: 90px;">
                    <a href="${item.html_url}"><p class="text-primary"><strong>${item.login}</strong></p></a><p style="font-size: 12px;">ID:${item.id}</p>`;
                    friends.appendChild(frie1);
                });
                console.log(frie);
            })
            .catch(error => console.error('Erro ao buscar os repositórios:', error));
    }

    repos();
});
