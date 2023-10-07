//Imports
import { emptyValidation } from './validations.js'
import Info from './models/Info.js'

//Elements variables
let sections = document.getElementsByTagName('section')
let actionButtonNext = document.querySelector('.action-buttons__next')
let actionButtonBack = document.querySelector('.action-buttons__back')
let actionButtonsDiv = document.querySelector('.action-buttons')
let stepsItems = document.querySelectorAll('.side-bar__number')
let nameInput = document.querySelector('#name')
let emailInput = document.querySelector('#email-address')
let phoneInput = document.querySelector('#phone-number')
let emptyErrorName = document.querySelector('#error-empty-name')
let emptyErrorEmail = document.querySelector('#error-empty-email')
let emptyErrorPhone = document.querySelector('#error-empty-phone')
let cardsDetails = document.querySelectorAll('.plan-details__card')
let frequencyMonthly = document.querySelector('#monthly')
let frequencyYearly = document.querySelector('#yearly')
let switchFrequencyElement = document.querySelector('.plan_details__switch')
let listOfPrices = document.querySelectorAll('#price')
let trials = document.querySelectorAll('.plan-details__trial')
let addOnCards = document.querySelectorAll('.add-ons__card')
let checkAddOns = document.querySelectorAll('.add-on')
let addOnPrices = document.querySelectorAll('.add-ons__price')
let totalValue = document.getElementById('total')
let planName = document.getElementById('plan')
let planPrice = document.getElementById('planPrice')
let addOnsNameTotal = document.querySelectorAll('.add-on-name')
let addOnsPriceTotal = document.querySelectorAll('.add-on-price')
let addOnsContainer = document.querySelectorAll('.add-on-container')
let totalLabel = document.querySelector('.finishing-up__total-p')
let changePlan = document.querySelector('#change')

//Hide all sections except first one
for (let i = 1; i < sections.length; i++) {
  sections[i].classList.add('visually-hidden')
}

//Variables to save all plans and add-ons data
let plans = []
let addOns = []

//Variable to save plan with all price info and add-ons
let planObject = new Info()

//Index of the current section
let currentSectionIndex = 0

//Variable to toggle frequency Monthly/Yearly
let currentFrequency = 'monthly'

// Perform a fetch request to get plans data from the JSON file
fetch('./plans.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Error in the plans request')
    }
    return response.json()
  })
  .then((data) => {
    plans = data
    //Add default plan selected and price monthly
    planObject.selectedPlan = plans[0].name
    planObject.priceMonthly = plans.find(
      (plan) => plan.name === planObject.selectedPlan
    ).priceMonthly
  })
  .catch((error) => {
    console.error('Error:', error)
  })

// Perform a fetch request to get plans data from the JSON file
fetch('./add-ons.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Error in the add-ons request')
    }
    return response.json()
  })
  .then((data) => {
    addOns = data
  })
  .catch((error) => {
    console.error('Error:', error)
  })

//Set initial configuration
updateStepsStatus(currentSectionIndex)
updateButtonStatus()
actionButtonNext.disabled = true

//Move section to Next
actionButtonNext.addEventListener('click', () => {
  onNavigationButtonClicked(1)
})

//Move section to Back
actionButtonBack.addEventListener('click', () => {
  onNavigationButtonClicked(-1)
})

//Execute this function on clicked actions buttons
function onNavigationButtonClicked(sectionNumberChange) {
  retrieveData()
  let previousSectionNumber = currentSectionIndex
  currentSectionIndex += sectionNumberChange
  updateStepsStatus(currentSectionIndex)
  changeSection(previousSectionNumber)
  updateButtonStatus()
}

//Move to the next or previous section
function changeSection(previousSectionNumber) {
  sections[previousSectionNumber].classList.toggle('visually-hidden')
  sections[currentSectionIndex].classList.toggle('visually-hidden')
}

//Update the buttons status depends on section position
function updateButtonStatus() {
  actionButtonBack.style.visibility = currentSectionIndex === 0 ? 'hidden' : 'visible'
  actionButtonNext.textContent = 'Next step'
  actionButtonNext.classList.remove('action-buttons__next--confirm')

  if (currentSectionIndex === 3) {
    calculateTotal(currentFrequency)
    actionButtonNext.classList.add('action-buttons__next--confirm')
    actionButtonNext.textContent = 'Confirm'
  } else if (currentSectionIndex === 4) {
    actionButtonsDiv.classList.add('visually-hidden')
  }
}

//Update the aside circle steps status depends on section index
function updateStepsStatus(currentSectionIndex) {
  //Make all circles inactive
  stepsItems.forEach((item) => {
    item.classList.remove('side-bar__number--active')
  })
  //Make circle active depends on currentSectionIndex not for the last section
  if (currentSectionIndex < 4)
    stepsItems[currentSectionIndex].classList.add('side-bar__number--active')
}

//Add multiples event listener
function addInputEventListeners(input, errorSection) {
  input.addEventListener('blur', () => {
    validateField(input, errorSection)
    checkAllValidationToEnableButton()
  })
  input.addEventListener('input', () => {
    validateField(input, errorSection)
    checkAllValidationToEnableButton()
  })
}
//Personal info validation
addInputEventListeners(nameInput, emptyErrorName)
addInputEventListeners(emailInput, emptyErrorEmail)
addInputEventListeners(phoneInput, emptyErrorPhone)

//Check each input to enable the button
function isFormValid() {
  return !(emptyValidation(nameInput) || emptyValidation(emailInput) || emptyValidation(phoneInput))
}

function checkAllValidationToEnableButton() {
  actionButtonNext.disabled = !isFormValid()
}

function validateField(field, errorMessage) {
  if (emptyValidation(field)) {
    field.style.outlineColor = 'red'
    errorMessage.removeAttribute('hidden')
  } else {
    field.style.outlineColor = 'hsl(229, 24%, 87%)'
    errorMessage.setAttribute('hidden', '')
  }
}

//Enable functionality to second plan form Cards
cardsDetails.forEach((card, pos) => {
  card.addEventListener('click', () => {
    updateCardStatus()
    card.classList.toggle('plan-details__card--active')
    planObject.selectedPlan = plans[pos].name
    updatePrice(currentFrequency)
  })
})

function updateCardStatus() {
  cardsDetails.forEach((card) => {
    card.classList.remove('plan-details__card--active')
  })
}

//
switchFrequencyElement.addEventListener('click', () => {
  frequencyMonthly.classList.toggle('plan-details__frequency--inactive')
  frequencyYearly.classList.toggle('plan-details__frequency--inactive')
  switchFrequencyElement.classList.toggle('flipped')
  //Switch between monthly and yearly
  currentFrequency = currentFrequency === 'monthly' ? 'yearly' : 'monthly'
  //Change the visual value of the price
  updateCardsData(currentFrequency)
  //Add data to the plan Object
  updatePrice(currentFrequency)
  updateAddOnsData(currentFrequency)
})

//Update visual plan prices
function updateCardsData(frequency) {
  switch (frequency) {
    case 'monthly':
      listOfPrices.forEach((price, pos) => {
        price.textContent = '$' + plans[pos].priceMonthly + '/mo'
        trials.forEach((trial) => {
          trial.style.display = 'none'
        })
      })
      break
    case 'yearly':
      listOfPrices.forEach((price, pos) => {
        price.textContent = '$' + plans[pos].priceYearly + '/yr'
        trials.forEach((trial) => {
          trial.style.display = 'block'
        })
      })
      break
    default:
  }
}

//Update add-ons visual prices
function updateAddOnsData(frequency) {
  switch (frequency) {
    case 'monthly':
      addOnPrices.forEach((price, pos) => {
        price.textContent = '+$' + addOns[pos].priceMonthly + '/mo'
      })
      break
    case 'yearly':
      addOnPrices.forEach((price, pos) => {
        price.textContent = '+$' + addOns[pos].priceYearly + '/yr'
      })
      break
    default:
  }
}

//Added event click to each Add-on card and add each to plan Object
checkAddOns.forEach((addOn, pos) => {
  addOn.addEventListener('click', () => {
    addOnCards[pos].classList.toggle('add-ons__card--active')
    planObject.addOns[pos] = addOn.checked ? addOns[pos] : ''
  })
})

//Retrieve name, email and phone to planObject
function retrieveData() {
  if (currentSectionIndex === 0) {
    planObject.name = nameInput.value
    planObject.email = emailInput.value
    planObject.phone = phoneInput.value
  }
}

//Update price in the plan object
function updatePrice(frequency) {
  switch (frequency) {
    case 'monthly':
      planObject.priceMonthly = plans.find(
        (plan) => plan.name === planObject.selectedPlan
      ).priceMonthly
      break
    case 'yearly':
      planObject.priceYearly = plans.find(
        (plan) => plan.name === planObject.selectedPlan
      ).priceYearly
      break
    default:
  }
}

//Calculate total
function calculateTotal(frequency) {
  switch (frequency) {
    case 'monthly':
      planName.textContent = planObject.selectedPlan + ' (Monthly)'
      planPrice.textContent = '$' + planObject.priceMonthly + '/mo'
      for (let i = 0; i < planObject.addOns.length; i++) {
        if (planObject.addOns[i] !== '') {
          addOnsContainer[i].classList.remove('visually-hidden')
          addOnsNameTotal[i].textContent = planObject.addOns[i].name
          addOnsPriceTotal[i].textContent = '+$' + planObject.addOns[i].priceMonthly + '/mo'
        } else {
          addOnsContainer[i].classList.add('visually-hidden')
        }
      }
      totalLabel.textContent = 'Total (per month)'
      totalValue.textContent = '$' + planObject.getTotal('monthly') + '/mo'
      break
    case 'yearly':
      planName.textContent = planObject.selectedPlan + ' (Yearly)'
      planPrice.textContent = '$' + planObject.priceYearly + '/yr'

      for (let i = 0; i < planObject.addOns.length; i++) {
        if (planObject.addOns[i] !== '') {
          addOnsContainer[i].classList.remove('visually-hidden')
          addOnsNameTotal[i].textContent = planObject.addOns[i].name
          addOnsPriceTotal[i].textContent = '+$' + planObject.addOns[i].priceYearly + '/yr'
        } else {
          addOnsContainer[i].classList.add('visually-hidden')
        }
      }
      totalLabel.textContent = 'Total (per year)'
      totalValue.textContent = '$' + planObject.getTotal('yearly') + '/yr'
      break
    default:
  }
}

//Change option move to the first form
changePlan.addEventListener('click', () => {
  onNavigationButtonClicked(-3)
})
