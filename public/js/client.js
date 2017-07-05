const dates = document.querySelectorAll('.date')

for (var i = 0; i < dates.length; i++) {
  const longDate = dates[i].textContent
  if (longDate.length > 0) {
    const now = moment(longDate)
    dates[i].textContent = now.format('LLL')
  }
}
