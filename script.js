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
let switchFrequency = document.querySelector('.plan_details__switch')
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

const plans = [
  {
    name: 'Arcade',
    priceMonthly: '$9/mo',
    priceYearly: '$90/yr',
    monthlyPrice: 9,
    yearlyPrice: 90,
  },
  {
    name: 'Advance',
    priceMonthly: '$12/mo',
    priceYearly: '$120/yr',
    monthlyPrice: 12,
    yearlyPrice: 120,
  },
  {
    name: 'Pro',
    priceMonthly: '$15/mo',
    priceYearly: '$150/yr',
    monthlyPrice: 15,
    yearlyPrice: 150,
  },
]

const addOns = [
  {
    name: 'Online service',
    priceMonthly: '$1/mo',
    priceYearly: '$10/yr',
    monthlyPrice: 1,
    yearlyPrice: 10,
  },
  {
    name: 'Larger Storage',
    priceMonthly: '$2/mo',
    priceYearly: '$20/yr',
    monthlyPrice: 2,
    yearlyPrice: 20,
  },
  {
    name: 'Customizable profile',
    priceMonthly: '$2/mo',
    priceYearly: '$20/yr',
    monthlyPrice: 2,
    yearlyPrice: 20,
  },
]

//Hide all sections except first one
for (let i = 1; i < sections.length; i++) {
  sections[i].classList.add('visually-hidden')
}

//Set the event to the Next Button to change between sections
let globalSectionIndex = 0
let data = new Info()
updateStepsStatus()
updateButtonStatus()
actionButtonNext.disabled = true
//Add default plan selected and price
data.selectedPlan = plans[0].name
data.priceMonthly = plans.find((plan) => plan.name === data.selectedPlan).monthlyPrice

//Move section to Next
actionButtonNext.addEventListener('click', () => {
  onNavigationButtonClicked(1)
})

//Move section to Back
actionButtonBack.addEventListener('click', () => {
  onNavigationButtonClicked(-1)
})

//Execute this function on clicked buttons
function onNavigationButtonClicked(sectionNumberChange) {
  let previousSectionNumber = globalSectionIndex
  globalSectionIndex += sectionNumberChange
  changeSection(previousSectionNumber)
  updateButtonStatus()
}

//Move to the next or previous section
function changeSection(previousSectionNumber) {
  sections[previousSectionNumber].classList.toggle('visually-hidden')
  sections[globalSectionIndex].classList.toggle('visually-hidden')
}

//Update the buttons status depends on section position
function updateButtonStatus() {
  actionButtonBack.style.visibility = globalSectionIndex === 0 ? 'hidden' : 'visible'
  actionButtonNext.textContent = 'Next step'
  actionButtonNext.classList.remove('action-buttons__next--confirm')

  if (globalSectionIndex === 3) {
    actionButtonNext.classList.add('action-buttons__next--confirm')
    actionButtonNext.textContent = 'Confirm'
  } else if (globalSectionIndex === 4) {
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

//Personal info validation
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
    data.selectedPlan = plans[pos].name
    updatePrice(frequency)
  })
})

function updateCardStatus() {
  cardsDetails.forEach((card) => {
    card.classList.remove('plan-details__card--active')
  })
}

let frequency = true

switchFrequency.addEventListener('click', () => {
  frequencyMonthly.classList.toggle('plan-details__frequency--inactive')
  frequencyYearly.classList.toggle('plan-details__frequency--inactive')
  switchFrequency.classList.toggle('flipped')
  frequency = !frequency
  updateCardsData(frequency)
  updateAddOnsData(frequency)

  updatePrice(frequency)
})

function updateCardsData(switchFrequency) {
  if (switchFrequency) {
    listOfPrices.forEach((price, pos) => {
      price.textContent = plans[pos].priceMonthly
      trials.forEach((trial) => {
        trial.style.display = 'none'
      })
    })
  } else {
    listOfPrices.forEach((price, pos) => {
      price.textContent = plans[pos].priceYearly
      trials.forEach((trial) => {
        trial.style.display = 'block'
      })
    })
  }
}

function updateAddOnsData(switchFrequency) {
  if (switchFrequency) {
    addOnPrices.forEach((price, pos) => {
      price.textContent = addOns[pos].priceMonthly
    })
  } else {
    addOnPrices.forEach((price, pos) => {
      price.textContent = addOns[pos].priceYearly
    })
  }
}

//Add-on cards
checkAddOns.forEach((addOn, pos) => {
  addOn.addEventListener('click', () => {
    addOnCards[pos].classList.toggle('add-ons__card--active')
    data.addOns[pos] = addOn.checked ? addOns[pos] : ''
  })
})

//Retrieve data
function retrieveData() {
  if (globalSectionIndex === 0) {
    data.name = nameInput.value
    data.email = emailInput.value
    data.phone = phoneInput.value
  }
}

function updatePrice(frequency) {
  if (frequency) {
    data.priceMonthly = plans.find((plan) => plan.name === data.selectedPlan).monthlyPrice
  } else {
    data.priceYearly = plans.find((plan) => plan.name === data.selectedPlan).yearlyPrice
  }
}

//Calculate total
function calculateTotal(frequency) {
  let total = 0
  if (frequency) {
    total = data.priceMonthly
    planName.textContent = data.selectedPlan + ' (Monthly)'
    planPrice.textContent = '$' + data.priceMonthly + '/mo'
    for (let i = 0; i < data.addOns.length; i++) {
      if (data.addOns[i] !== '') {
        total += data.addOns[i].monthlyPrice
        addOnsContainer[i].classList.remove('visually-hidden')
        addOnsNameTotal[i].textContent = data.addOns[i].name
        addOnsPriceTotal[i].textContent = data.addOns[i].priceMonthly
      } else {
        addOnsContainer[i].classList.add('visually-hidden')
      }
    }
    totalLabel.textContent = 'Total (per month)'
    totalValue.textContent = '$' + total + '/mo'
  } else {
    total = data.priceYearly
    planName.textContent = data.selectedPlan + ' (Yearly)'
    planPrice.textContent = '$' + data.priceYearly + '/yr'
    for (let i = 0; i < data.addOns.length; i++) {
      if (data.addOns[i] !== '') {
        total += data.addOns[i].yearlyPrice
        addOnsContainer[i].classList.remove('visually-hidden')
        addOnsNameTotal[i].textContent = data.addOns[i].name
        addOnsPriceTotal[i].textContent = data.addOns[i].priceYearly
      } else {
        addOnsContainer[i].classList.add('visually-hidden')
      }
    }
    totalLabel.textContent = 'Total (per year)'
    totalValue.textContent = '$' + total + '/yr'
  }
}

//Change option move to the first step
changePlan.addEventListener('click', () => {
  for (let i = 0; i < 3; i++) {
    retrieveData()
    globalSectionIndex--
    changeSection(false)
    updateButtonStatus()
    updateStepsStatus()
  }
})
