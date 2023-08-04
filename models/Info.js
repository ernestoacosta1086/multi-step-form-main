class Info {
  constructor() {
    this.name = ''
    this.email = ''
    this.phone = ''
    this.selectedPlan = ['Arcade', 'Advance', 'Pro']
    this.frequency = ['Monthly', 'Yearly']
    this.addOns = ['Online service', 'Larger storage', 'Customizable profile']
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

  // Method to get the complete form data
  getCompleteFormData() {
    return {
      name: this.name,
      email: this.email,
      phone: this.phone,
      selectedPlan: this.selectedPlan,
      addOns: this.addOns,
    }
  }
}

// Export the Info class so it can be used in other files
export default Info
