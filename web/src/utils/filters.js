const filters = {
  dateToString (val) {
    return new Date(val).toLocaleString()
  }
}

export default Vue => {
  Object.keys(filters).forEach(v => {
    Vue.filter(v, filters[v])
  })
}
