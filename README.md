# testnet-sweeper
sweep the balance of all address you own (on testnet)
## how to run?
### 1.config accounts.json
all the scripts I push up will use accounts.json formatted like this (there would be a template):
```json
{
  "accounts": [
    {
      "address": "0x123",
      "privateKey": "0x123",
    },
    {
      "address": "0x456",
      "privateKey": "0x456",
    }
    ...
  ]
}
```
### 2.run script
```javascript
yarn install // install dependencies(or npm install)
node sweep // run script
```
### 3.cli
when you run the script, you would see the cli like this:
```shell
 Ξ Receipt Account: 1
 Ξ Choose the network (Use arrow keys)
> homestead
  rinkeby
  ropsten
  kovan
  goerli
```
just follow the lead, type in your recipt account (recieve all ETH sweeped), and choose the testnet.
