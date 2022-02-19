// Profile info will appear in div with "overview" class
const overview = document.querySelector(".overview");

const username = "Maria-developer";
const repoList = document.querySelector(".repo-list");

async function getProfile () {
    const userOverview = await fetch(`https://api.github.com/users/${username}`);
    const profile = await userOverview.json();
    displayProfile(profile);
};

getProfile();

function displayProfile (profile) {
    const userInfoDiv = document.createElement("div");
    userInfoDiv.classList.add("user-info");
    userInfoDiv.innerHTML = 
        `<figure>
            <img alt="user avatar" src=${profile.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${profile.name}</p>
            <p><strong>Bio:</strong> ${profile.bio}</p>
            <p><strong>Number of public repos:</strong> ${profile.public_repos}</p>
        </div>`;
    overview.append(userInfoDiv);
    getRepos();
};

async function getRepos () {
    const publicRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await publicRepos.json();
    displayRepos(repoData);
};

function displayRepos (repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};