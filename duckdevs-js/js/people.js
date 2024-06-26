async function fetchUsersData() {
  try {
    const response = await fetch('data/duck_devs_info.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data: ', error);
    return null;
  }
}

function createPeopleCard(user) {
  let peopleContainer = document.getElementById('container1');

  let peopleCard = document.createElement("div");
  peopleCard.classList.add("people__card");
  let randomClass = "duck" + (Math.floor(Math.random() * 4) + 1);
  peopleCard.classList.add(randomClass);

  let cardContent = document.createElement('div');
  cardContent.classList.add('card__content');

  let heading = document.createElement('h2');
  heading.textContent = user.name;

  let pRole = document.createElement('p');
  pRole.textContent = user.role;

  let button = document.createElement('button');
  button.textContent = 'Github';
  button.onclick = function () {
    window.location.href = user.githubLink;
  };

  cardContent.appendChild(heading);
  cardContent.appendChild(pRole);
  cardContent.appendChild(button);

  peopleCard.appendChild(cardContent);

  peopleContainer.appendChild(peopleCard);
}

async function displayPeopleCards() {
  const usersData = await fetchUsersData();
  if (usersData) {
    usersData.forEach((user) => {
      createPeopleCard(user);
    });
  }
}

displayPeopleCards();
