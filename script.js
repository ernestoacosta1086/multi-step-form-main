let sections = document.getElementsByTagName('section')
let actionButtonNext = document.querySelector('.action-buttons__next')
let actionButtonBack = document.querySelector('.action-buttons__back')
let actionButtonsDiv = document.querySelector('.action-buttons')
let stepsItems = document.querySelectorAll('.side-bar__number')

//Hide all sections except first one
for (let i = 1; i < sections.length; i++) {
  sections[i].classList.add('visually-hidden')
}

//Set the event to the Next Button to change between sections
let globalSectionIndex = 0
updateStepsStatus()
updateButtonStatus()
actionButtonNext.addEventListener('click', () => {
  globalSectionIndex++
  changeSection(true)
  updateButtonStatus()
  updateStepsStatus()
})

//Set the event to the Previous Button to change between sections
actionButtonBack.addEventListener('click', () => {
  globalSectionIndex--
  changeSection(false)
  updateButtonStatus()
  updateStepsStatus()
})

//Move to the next or previous section
function changeSection(isNext) {
  if (isNext) {
    sections[globalSectionIndex - 1].classList.toggle('visually-hidden')
    sections[globalSectionIndex].classList.toggle('visually-hidden')
  } else {
    sections[globalSectionIndex + 1].classList.toggle('visually-hidden')
    sections[globalSectionIndex].classList.toggle('visually-hidden')
  }
}

//Update the buttons status depends on section position
function updateButtonStatus() {
  actionButtonBack.style.visibility = 'visible'
  actionButtonNext.textContent = 'Next step'
  actionButtonNext.classList.remove('action-buttons__next--confirm')
  if (globalSectionIndex === 0) {
    actionButtonBack.style.visibility = 'hidden'
    actionButtonNext.classList.remove('action-buttons__next--confirm')
  } else if (globalSectionIndex === 3) {
    // change color and text
    actionButtonNext.classList.add('action-buttons__next--confirm')
    actionButtonNext.textContent = 'Confirm'
  } else if (globalSectionIndex === 4) {
    // hide all buttons componet
    actionButtonsDiv.classList.add('visually-hidden')
  }
}

//Update the steps status depends on section position
function updateStepsStatus() {
  stepsItems.forEach((item) => {
    item.classList.remove('side-bar__number--active')
  })

  if (globalSectionIndex === 4) {
    stepsItems[globalSectionIndex - 1].classList.add('side-bar__number--active')
  } else {
    stepsItems[globalSectionIndex].classList.toggle('side-bar__number--active')
  }
}
