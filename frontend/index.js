async function sprintChallenge5() { 
  const footer = document.querySelector('footer');
  const currentYear = new Date().getFullYear();
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`;
  const learnersUrl = 'http://localhost:3003/api/learners';
  const mentorsUrl = 'http://localhost:3003/api/mentors';
  let reference = [];
  
  try {
    const mentorsResponse = await fetch(mentorsUrl);
    const mentorsData = await mentorsResponse.json();

    const learnersResponse = await fetch(learnersUrl);
    const learnersData = await learnersResponse.json();

    mentorsData.forEach(mentor => {
      reference.push(mentor);
    });

    learnersData.forEach(learner => {
      let cardsClass = document.querySelector('.cards');
      let cardDiv = document.createElement('div');
      let nameHeader = document.createElement('h3');
      let personEmail = document.createElement('div');
      let mentorSelector = document.createElement('h4');
      let idContainer = document.createElement('ul');
      let headerPara = document.querySelector('.info');

      cardDiv.classList.add('card');
      nameHeader.textContent = `${learner.fullName}`;
      cardDiv.appendChild(nameHeader);
      personEmail.textContent = learner.email;
      cardDiv.appendChild(personEmail);
      mentorSelector.classList.add('closed');
      mentorSelector.textContent = 'Mentors';
      cardDiv.appendChild(mentorSelector);
      cardDiv.appendChild(idContainer);
      cardsClass.appendChild(cardDiv);
      headerPara.textContent = 'No learner is selected';

      mentorSelector.addEventListener('click', (event) => {
        event.stopPropagation();
        if (mentorSelector.classList.contains('closed')) {
          mentorSelector.classList.replace('closed', 'open');
          const allCards = document.querySelectorAll('.cards .card');
          allCards.forEach(card => {
            card.classList.remove('selected');
          });
          cardDiv.classList.add('selected');
          nameHeader.textContent = `${learner.fullName}, ID ${learner.id}`;
          headerPara.textContent = `The selected learner is ${learner.fullName}`;

          for (let i = 0; i < learner.mentors.length; i++) {
            const mentorId = learner.mentors[i];
            const mentorData = reference.find(mentor => mentor.id === mentorId);
            if (mentorData) {
              const fullName = `${mentorData.firstName} ${mentorData.lastName}`;
              let newId = document.createElement('li');
              newId.textContent = fullName;
              idContainer.appendChild(newId);
            }
          }
        } else {
          idContainer.innerHTML = '';
          mentorSelector.classList.replace('open', 'closed');
          const allCards = document.querySelectorAll('.cards .card');
          allCards.forEach(card => {
            card.classList.remove('selected');
          });
          cardDiv.classList.add('selected');
        }
      });

      cardDiv.addEventListener('click', () => {
        if (!cardDiv.classList.contains('selected')) {
          const allCards = document.querySelectorAll('.cards .card');
          const intialValue = learner.nameHeader
          allCards.forEach(card => {
            card.classList.remove('selected');
          });
          cardDiv.classList.add('selected');
          nameHeader.textContent = `${learner.fullName}, ID ${learner.id}`;
          headerPara.textContent = `The selected learner is ${learner.fullName}`;
        } else {
          cardDiv.classList.remove('selected');
          nameHeader.textContent = `${learner.fullName}`

        }
      });
    });

  } catch (err) {
    console.error(err);
  }


}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { sprintChallenge5 };
} else {
  sprintChallenge5();
}