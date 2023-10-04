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
data.priceMonthly = plans.find((plan) => plan.name === data.selectedPlan).priceMonthly

actionButtonNext.addEventListener('click', () => {
  retrieveData()
  globalSectionIndex++
  changeSection(true)
  updateButtonStatus()
  updateStepsStatus()
})

//Set the event to the Previous Button to change between sections
actionButtonBack.addEventListener('click', () => {
  retrieveData()
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
  } else if (globalSectionIndex === 2) {
  } else if (globalSectionIndex === 3) {
    // change color and text
    calculateTotal(frequency)
    actionButtonNext.classList.add('action-buttons__next--confirm')
    actionButtonNext.textContent = 'Confirm'
  } else if (globalSectionIndex === 4) {
    // hide all buttons component
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
nameInput.addEventListener('blur', () => {
  validateField(nameInput, emptyErrorName)
  checkAllValidationToEnableButton()
})
nameInput.addEventListener('input', () => {
  validateField(nameInput, emptyErrorName)
  checkAllValidationToEnableButton()
})
emailInput.addEventListener('blur', () => {
  validateField(emailInput, emptyErrorEmail)
  checkAllValidationToEnableButton()
})
emailInput.addEventListener('input', () => {
  validateField(emailInput, emptyErrorEmail)
  checkAllValidationToEnableButton()
})
phoneInput.addEventListener('blur', () => {
  validateField(phoneInput, emptyErrorPhone)
  checkAllValidationToEnableButton()
})
phoneInput.addEventListener('input', () => {
  validateField(phoneInput, emptyErrorPhone)
  checkAllValidationToEnableButton()
})

//Check each input to enable the button
function checkAllValidationToEnableButton() {
  if (emptyValidation(nameInput) || emptyValidation(emailInput) || emptyValidation(phoneInput)) {
    actionButtonNext.disabled = true
  } else {
    actionButtonNext.disabled = false
  }
}

function validateField(field, errorMessage) {
  if (emptyValidation(field)) {
    field.style.outlineColor = 'red'
    errorMessage.removeAttribute('hidden')
  } else {
    errorMessage.setAttribute('hidden', '')
    field.style.outlineColor = 'hsl(229, 24%, 87%)'
  }
}

//Enable functionality to second plan form Cards
cardsDetails.forEach((card, pos) => {
  card.addEventListener('click', () => {
    UpdateCardStatus()
    card.classList.toggle('plan-details__card--active')
    data.selectedPlan = plans[pos].name
    updatePrice(frequency)
  })
})

function UpdateCardStatus() {
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
    if (addOn.checked) data.addOns[pos] = addOns[pos]
    else data.addOns[pos] = ''
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
