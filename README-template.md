# Frontend Mentor - Multi-step form solution

This is a solution to the [Multi-step form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/multistep-form-YVAnSdqQBJ). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Multi-step form solution](#frontend-mentor---multi-step-form-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Screenshot](#screenshot)
    - [Links](#links)
  - [My process](#my-process)
    - [Built with](#built-with)
  - [Project Overview: Multi-Step Form with Field Validations and Price Calculation](#project-overview-multi-step-form-with-field-validations-and-price-calculation)
    - [CSS Variables for Consistency:](#css-variables-for-consistency)
    - [Box Sizing and Global Resets:](#box-sizing-and-global-resets)
    - [Font and Typography Settings](#font-and-typography-settings)
    - [Layout and Positioning](#layout-and-positioning)
    - [CSS Flexbox Usage](#css-flexbox-usage)
    - [Event Listeners](#event-listeners)
    - [Fetch Data](#fetch-data)
    - [Form Validation](#form-validation)
    - [Plan Selection](#plan-selection)
    - [Frequency Switching](#frequency-switching)
    - [Price Calculation](#price-calculation)
    - [Continued development](#continued-development)
    - [Useful resources](#useful-resources)
  - [Author](#author)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- Complete each step of the sequence
- Go back to a previous step to update their selections
- See a summary of their selections on the final step and confirm their order
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- Receive form validation messages if:
  - A field has been missed
  - The email address is not formatted correctly
  - A step is submitted, but no selection has been made

### Screenshot

![](./screenshot.jpg)

### Links

- [GitHub repository](https://github.com/ernestoacosta1086/multi-step-form-main)
- [Live site URL](https://glistening-marzipan-a3920e.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Vanilla JavaScript

## Project Overview: Multi-Step Form with Field Validations and Price Calculation

In the course of working on a JavaScript project, I gained valuable experience and knowledge in various aspects:

1. **Multi-Step Forms:** I learned how to design and implement a multi-step form, improving the user experience by breaking down the data collection process into manageable stages.

2. **Field Validations:** I honed my skills in form field validations, ensuring that user inputs are accurate and secure, thereby enhancing data quality.

3. **Dynamic Pricing:** I developed the ability to calculate prices dynamically based on the selected plan, making the application more versatile.

4. **User Experience (UX):** I realized the importance of optimizing the user experience through an intuitive and responsive form design, clear instructions, and feedback mechanisms.

5. **JavaScript Skills:** My JavaScript proficiency significantly improved as I manipulated the DOM, handled user interactions, and performed calculations based on user inputs.

6. **Project Organization:** I learned to structure my code effectively, breaking down the application into manageable components, ensuring clean and maintainable code.

7. **Testing:** I gained experience in thorough testing to identify and resolve issues, improving the reliability of the application.

8. **Project Planning:** I understood the importance of thorough project planning, from defining requirements to wireframing the form and setting milestones.

9. **Problem Solving:** I honed my problem-solving skills, especially when dealing with complex calculations and various plan options, finding effective and systematic solutions.

This project expanded both my technical skills and my understanding of user-centric design, code organization, and systematic problem-solving. It was a valuable learning experience that will benefit my future web development projects.

### CSS Variables for Consistency:

```css
:root {
  --color-neutral-100: hsl(0, 0%, 100%);
  --font-family-base: 'Ubuntu', sans-serif;
  /* ... otras variables ... */
}
```

Using CSS variables for color schemes and font families promotes consistency and makes it easier to update your project's design across various elements.

### Box Sizing and Global Resets:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  margin: 0;
}
```

Applying a consistent box-sizing model and resetting default margins ensures that elements behave predictably, which is crucial for maintaining a well-organized layout.

### Font and Typography Settings

```css
body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  background-color: var(--color-neutral-xx-100);
  font-family: var(--font-family-base);
  max-width: 100vh;
}
```

Setting up font and typography styles using CSS variables and controlling line height can greatly enhance readability and maintain a consistent design.

### Layout and Positioning

```css
main {
  width: clamp(40rem, 60%, 60rem);
  background-color: var(--color-neutral-100);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 0.6rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
}
```

The use of clamp for setting a flexible width and the use of CSS for positioning the main container are important for creating a visually appealing and responsive layout.

### CSS Flexbox Usage

```css
.section-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}
```

Utilizing Flexbox to create a column layout for sections is a powerful technique for achieving responsive and structured content organization.

### Event Listeners

Event listeners for navigating through form sections and enabling/disabling the "Next" button:

```js
// Move section to Next
actionButtonNext.addEventListener('click', () => {
  onNavigationButtonClicked(1)
})

// Move section to Back
actionButtonBack.addEventListener('click', () => {
  onNavigationButtonClicked(-1)
})
```

### Fetch Data

Fetching plans and add-ons data from JSON files:

```js
fetch('./plans.json')
  .then((response) => {
    // ...
  })
  .then((data) => {
    plans = data
    // ...
  })

fetch('./add-ons.json')
  .then((response) => {
    // ...
  })
  .then((data) => {
    addOns = data
  })
```

### Form Validation

Functions for input field validation:

```js
// Add event listeners for input validation
addInputEventListeners(nameInput, emptyErrorName)
addInputEventListeners(emailInput, emptyErrorEmail)
addInputEventListeners(phoneInput, emptyErrorPhone)
```

### Plan Selection

Handling plan card selection and updating the selected plan:

```js
// Enable functionality to second plan form Cards
cardsDetails.forEach((card, pos) => {
  card.addEventListener('click', () => {
    updateCardStatus()
    card.classList.toggle('plan-details__card--active')
    planObject.selectedPlan = plans[pos].name
    updatePrice(currentFrequency)
  })
})
```

### Frequency Switching

Code for switching between monthly and yearly billing frequencies:

```js
switchFrequencyElement.addEventListener('click', () => {
  frequencyMonthly.classList.toggle('plan-details__frequency--inactive')
  frequencyYearly.classList.toggle('plan-details__frequency--inactive')
  switchFrequencyElement.classList.toggle('flipped')
  // Switch between monthly and yearly
  currentFrequency = currentFrequency === 'monthly' ? 'yearly' : 'monthly'
  // ...
})
```

### Price Calculation

Calculating and updating the total price based on the selected plan and add-ons:

```js
// Calculate total
function calculateTotal(frequency) {
  switch (frequency) {
    case 'monthly':
      // ...
      break
    case 'yearly':
      // ...
      break
  }
}
```

### Continued development

I'm keen to highlight my growing passion for exploring the intricacies of JavaScript in future projects. I understand the pivotal role of JavaScript in creating dynamic and interactive web applications. I'm eager to delve deeper into JavaScript, learning about its advanced features, libraries, and frameworks to build robust and feature-rich applications. My goal is to become proficient in writing clean and efficient JavaScript code, enabling me to create engaging user experiences and enhance the functionality of web applications.

### Useful resources

- [mdn web docs](https://developer.mozilla.org/en-US/docs/Learn/CSS) - This documentation is too good and provides several examples to understand all the concepts in simple ways.
- [Udemy](https://www.udemy.com) - This is a very rich source of knowledge where good teachers provide the best courses.

## Author

- Website - [Ernesto Acosta](https://www.frontendmentor.io/profile/ernestoacosta1086)
- Frontend Mentor - [@ernestoacosta1086](https://www.frontendmentor.io/profile/ernestoacosta1086)
- Linkedin [Ernesto Acosta](https://www.linkedin.com/in/ernesto-a-labrada/)
