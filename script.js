let sections = document.getElementsByTagName('section')
let actionButtonNext = document.querySelector('.action-buttons__next')
let actionButtonBack = document.querySelector('.action-buttons__back')
let actionButtonsDiv = document.querySelector('.action-buttons')

//Hide all sections except first one
for (let i = 1; i < sections.length; i++) {
  sections[i].classList.add('visually-hidden')
}

//Set the event to the Next Button to change between sections
let globalActiveSectionNumber = 0
updateButtonStatus()
actionButtonNext.addEventListener('click', () => {
  globalActiveSectionNumber++
  changeSection(true)
  updateButtonStatus()
})

//Set the event to the Previous Button to change between sections
actionButtonBack.addEventListener('click', () => {
  globalActiveSectionNumber--
  changeSection(false)
  updateButtonStatus()
})

//Move to the next or previous section
function changeSection(isNext) {
  if (isNext) {
    sections[globalActiveSectionNumber - 1].classList.toggle('visually-hidden')
    sections[globalActiveSectionNumber].classList.toggle('visually-hidden')
  } else {
    sections[globalActiveSectionNumber + 1].classList.toggle('visually-hidden')
    sections[globalActiveSectionNumber].classList.toggle('visually-hidden')
  }
}

//Update the buttons status depends on section position
function updateButtonStatus() {
  actionButtonBack.style.visibility = 'visible'
  actionButtonNext.textContent = 'Next step'
  actionButtonNext.classList.remove('action-buttons__next--confirm')
  if (globalActiveSectionNumber === 0) {
    actionButtonBack.style.visibility = 'hidden'
    actionButtonNext.classList.remove('action-buttons__next--confirm')
  } else if (globalActiveSectionNumber === 3) {
    // change color and text
    actionButtonNext.classList.add('action-buttons__next--confirm')
    actionButtonNext.textContent = 'Confirm'
  } else if (globalActiveSectionNumber === 4) {
    // hide all buttons componet
    actionButtonsDiv.classList.add('visually-hidden')
  }
}
