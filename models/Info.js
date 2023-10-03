class Info {
  constructor() {
    this.name = ''
    this.email = ''
    this.phone = ''
    this.selectedPlan = ''
    this.priceMonthly = 0
    this.priceYearly = 0
    this.addOns = ['']
  }

  // Methods to update data for each section of the form
  updateName(name) {
    this.name = name
  }

  updateEmail(email) {
    this.email = email
  }

  updatePhone(phone) {
    this.phone = phone
  }

  updateSelectedPlan(plan) {
    this.selectedPlan = plan
  }

  updatePriceMonthly(priceMonthly) {
    this.priceMonthly = priceMonthly
  }

  updatePriceYearly(priceYearly) {
    this.priceYearly = priceYearly
  }

  // Method to add or remove add-ons
  addAddOn(addOn) {
    if (!this.addOns.includes(addOn)) {
      this.addOns.push(addOn)
    }
  }

  removeAddOn(addOn) {
    const index = this.addOns.indexOf(addOn)
    if (index !== -1) {
      this.addOns.splice(index, 1)
    }
  }
}

// Export the Info class so it can be used in other files
export default Info
