const fs = require("fs")
const chalk = require("chalk")
const ethers = require("ethers")
const inquirer = require("inquirer")
const Loader = require("./Loading.js")

async function init() {
  console.clear()
  const config = await inquirer.prompt([
    {
      type: "input",
      message: "Receipt Account:",
      name: "address",
      prefix: " Ξ",
    },
    {
      type: "list",
      message: "Choose the network",
      name: "testnet",
      default: "homestead",
      prefix: " Ξ",
      choices: ["homestead", "rinkeby", "ropsten", "kovan", "goerli"],
    },
  ])
  console.clear()
  console.log(`Ξ Receipt Account: ${chalk.green(config.address)}`)
  console.log(`Ξ Network: ${chalk.green(config.testnet)}`)
  return config
}

async function main() {
  let config = await init()
  let content = JSON.parse(fs.readFileSync("accounts.json"))
  let provider = ethers.getDefaultProvider(config.testnet)
  let accounts = content.accounts
  let total = 0
  for (let [index, account] of accounts.entries()) {
    let wallet = new ethers.Wallet(account.privateKey, provider)
    let loader = new Loader(
      `checking balance of account ${parseInt(index) + 1}...`
    )
    loader.start()
    let balance = await wallet.getBalance()
    let balance_eth = ethers.utils.formatEther(balance)
    loader.stop()
    if (balance_eth > "0.01") {
      console.log(`found!current balance: ${balance_eth}`)
      let loader = new Loader(`sending it to ${chalk.blueBright(config.address)}`)
      loader.start()
      let gasLimit = 21000
      let gasPrice = await provider.getGasPrice()
      let value = balance.sub(gasPrice.mul(gasLimit))
      let txObj = {
        to: config.address,
        value: value,
        gasLimit: gasLimit,
        gasPrice: gasPrice,
      }
      let tx = await wallet.sendTransaction(txObj)
      loader.stop()
      console.log(`============ Sent!tx hash: ${chalk.blueBright(tx.hash)} ============`)
      total += Number(ethers.utils.formatEther(value))
    }
  }
  return total
}

main()
  .then((res) => {
    console.log(
      `finish sweeping, ETH in total: ${chalk.green(
        res
      )}`
    )
    process.exit(0)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
