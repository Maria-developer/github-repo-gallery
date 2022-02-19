// Profile info will appear in div with "overview" class
const overview = document.querySelector(".overview");

const username = "Maria-developer";

async function getProfile () {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const profile = await response.json();
    displayProfile(profile);
};

function displayProfile (profile) {
    const userInfoDiv = document.createElement("div");
    userInfoDiv.classList = "user-info";
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
};

getProfile();