class Info {
  constructor() {
    this.name = ''
    this.email = ''
    this.phone = ''
    this.selectedPlan = ''
    this.priceMonthly = 0
    this.priceYearly = 0
    this.addOns = ['', '', '']
  }

  //Calculate the total value of plan plus addons depends on frequency
  getTotal(frequency) {
    let sum = 0
    switch (frequency) {
      case 'monthly':
        this.addOns.forEach((addon) => {
          const priceMonthly = parseInt(addon.priceMonthly, 10)
          if (!isNaN(priceMonthly)) {
            sum += priceMonthly
          }
        })
        return sum + parseInt(this.priceMonthly, 10)
      case 'yearly':
        this.addOns.forEach((addon) => {
          const priceYearly = parseInt(addon.priceYearly, 10)
          if (!isNaN(priceYearly)) {
            sum += priceYearly
          }
        })
        return sum + parseInt(this.priceYearly, 10)

      default:
    }
  }
}

// Export the Info class so it can be used in other files
export default Info
