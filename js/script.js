const overview = document.querySelector(".overview"); // Profile info will appear in div with "overview" class
const username = "Maria-developer";
const repoList = document.querySelector(".repo-list");
const repoInfoSection = document.querySelector(".repos");
const repoInfoElement = document.querySelector(".repo-data");
const backToGalleryButton = document.querySelector("button");
const filterInput = document.querySelector("input");

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
    filterInput.classList.remove("hide");
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};

repoList.addEventListener("click", function(e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});

async function getRepoInfo (repoName) {
    const fetchRepoInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchRepoInfo.json();

    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();

    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }

    displayRepoInfo(repoInfo, languages);
};

function displayRepoInfo (repoInfo, languages) {
    backToGalleryButton.classList.remove("hide");
    repoInfoElement.innerHTML = "";
    repoInfoElement.classList.remove("hide");
    repoInfoSection.classList.add("hide");
    
    const div = document.createElement("div");
    div.innerHTML = 
        `<h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoInfoElement.append(div);
};

backToGalleryButton.addEventListener ("click", function () {
    repoInfoSection.classList.remove("hide");
    repoInfoElement.classList.add("hide");
    backToGalleryButton.classList.add("hide");
});

// Dynamic search

filterInput.addEventListener("input", function (e) {
    const searchText = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const lowercaseSearhText = searchText.toLowerCase();

    for (const repo of repos) {
        const lowercaseRepoText = repo.innerText.toLowerCase();
        if (lowercaseRepoText.includes(lowercaseSearhText)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});
