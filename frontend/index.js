async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`
  
  const learnersUrl = 'http://localhost:3003/api/learners'
  const mentorsUrl = 'http://localhost:3003/api/mentors'
  
  const sectionClass = document.querySelector('.cards')
  let mentorData = []
  let allName
  
  document.querySelector('h2 + p').textContent = 'Fetching learner cards...'
  
  function makeCard(index) {
    let div = document.createElement('div')
    let headerName = document.createElement('h3')
    headerName.textContent = index.fullName
    div.appendChild(headerName)
    div.classList.add('card')
  
    div.addEventListener('click', () => {
      document.querySelectorAll('.card').forEach(card => {
        const cardHeader = card.querySelector('h3')
        if (card !== div) {
          card.classList.remove('selected')
          const nameWithoutID = cardHeader.textContent.replace(/, ID \d+/, '')
          cardHeader.textContent = nameWithoutID
        }
      });
  
      if (!div.classList.contains('selected')) {
        div.classList.add('selected')
        const selectedLearnerName = `${index.fullName}, ID ${index.id}`
        headerName.textContent = selectedLearnerName
        document.querySelector('h2 + p').textContent = `The selected learner is ${index.fullName}`
      } else {
        div.classList.remove('selected')
        headerName.textContent = `${index.fullName}`
        document.querySelector('h2 + p').textContent = 'No learner is selected'
      }
    });
  
    let emailDiv = document.createElement('div')
    emailDiv.textContent = `${index.email}`
    div.appendChild(emailDiv)
  
    let mentorHeader = document.createElement('h4')
    mentorHeader.textContent = 'Mentors'
    mentorHeader.classList.add('closed')
    div.appendChild(mentorHeader)
  
    sectionClass.appendChild(div)
  
    mentorHeader.addEventListener('click', () => {
      mentorHeader.classList.toggle('open')
      if (mentorHeader.classList.contains('open')) {
        fetch(mentorsUrl)
          .then(result => result.json())
          .then(mentors => {
            const mentorMap = mentors.reduce((acc, mentor) => {
              acc[mentor.id] = `${mentor.firstName} ${mentor.lastName}`
              return acc
            }, {})
  
            index.mentors.forEach(mentorId => {
              const mentorName = mentorMap[mentorId]
              if (mentorName) {
                const uList = document.createElement('ul')
                const list = document.createElement('li')
                list.textContent = mentorName
                uList.appendChild(list)
                mentorHeader.appendChild(uList)
              }
            });
          });
      } else {
        mentorHeader.innerHTML = 'Mentors'
      }
    });
  }
  
  fetch(learnersUrl)
    .then(res => res.json())
    .then(data => {
      document.querySelector('h2 + p').textContent = 'No learner is selected'
      data.forEach(obj => {
        makeCard(obj);
      });
    });

// ❗ DO NOT CHANGE THE CODE  BELOW
}
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
