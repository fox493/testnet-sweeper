function Loading(description) {
  const h = ["|", "/", "-", "\\"]
  let timeObj = null
  let i = 0
  this.start = () => {
    process.stdout.write(description + "\n")
    timeObj =  setInterval(() => {
      i = i > 3 ? 0 : i
      process.stdout.clearLine()
      process.stdout.cursorTo(0)
      process.stdout.write(h[i])
      process.stdout.cursorTo(1)
      i++
    }, 200)
  }
  this.stop = () => {
    clearInterval(timeObj)
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
  }
}
module.exports = Loading
