const { DateTime } = require("luxon")
const luxon = require("luxon")

const now = DateTime.now()

const myDate = DateTime.fromObject({ year: 1996, month: 7, day: 01 })

if (myDate.isValid) {
    const age = now.diff(myDate, ["years", "months", "days"])
    console.log(age.days)
}

console.log(myDate)