
const Web3 = require('web3')



/*
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var abi = JSON.parse('[ { "constant": false, "inputs": [ { "name": "policyOwner", "type": "address" } ], "name": "confirmPolicy", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalInsurers", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "wearLevel", "type": "uint256" } ], "name": "claim", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "itemId", "type": "uint256" }, { "name": "deviceBrand", "type": "string" }, { "name": "deviceYear", "type": "string" }, { "name": "wearLevel", "type": "string" }, { "name": "region", "type": "string" } ], "name": "insure", "outputs": [ { "name": "insured", "type": "bool" } ], "payable": true, "type": "function" }, { "constant": true, "inputs": [], "name": "getPolicyEndDateTimestamp", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalInvestedAmount", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalClaimsPaid", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "investors", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalInvestorsCount", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getPolicyNextPayment", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "basePremium", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "deviceBrand", "type": "string" }, { "name": "deviceYear", "type": "string" }, { "name": "wearLevel", "type": "string" }, { "name": "region", "type": "string" } ], "name": "policyPrice", "outputs": [ { "name": "price", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "maxPayout", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "claimed", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "invest", "outputs": [ { "name": "success", "type": "bool" } ], "payable": true, "type": "function" }, { "inputs": [], "payable": true, "type": "constructor" }, { "payable": true, "type": "fallback" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "deviceName", "type": "string" }, { "indexed": false, "name": "insurancePrice", "type": "uint256" } ], "name": "Insured", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "payout", "type": "uint256" } ], "name": "Claimed", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Invested", "type": "event" } ]');
var appContract = web3.eth.contract(abi);

//var obj = JSON.parse(fs.readFileSync('./contracts/BatteryInsurancePolicy.json', 'utf8'));
var contractAddress = '0xbf2b816b78cd22763f6228f2af790a33a2b0f694';
var policyContract = appContract.at(contractAddress);
*/



var accounts;
var account;




window.App = {

  start: function () {
    var self = this;

    var abi = JSON.parse('[ { "constant": false, "inputs": [ { "name": "policyOwner", "type": "address" } ], "name": "confirmPolicy", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalInsurers", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "wearLevel", "type": "uint256" } ], "name": "claim", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "itemId", "type": "uint256" }, { "name": "deviceBrand", "type": "string" }, { "name": "deviceYear", "type": "string" }, { "name": "wearLevel", "type": "string" }, { "name": "region", "type": "string" } ], "name": "insure", "outputs": [ { "name": "insured", "type": "bool" } ], "payable": true, "type": "function" }, { "constant": true, "inputs": [], "name": "getPolicyEndDateTimestamp", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalInvestedAmount", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalClaimsPaid", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "investors", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalInvestorsCount", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getPolicyNextPayment", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "basePremium", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "deviceBrand", "type": "string" }, { "name": "deviceYear", "type": "string" }, { "name": "wearLevel", "type": "string" }, { "name": "region", "type": "string" } ], "name": "policyPrice", "outputs": [ { "name": "price", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "maxPayout", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "claimed", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "invest", "outputs": [ { "name": "success", "type": "bool" } ], "payable": true, "type": "function" }, { "inputs": [], "payable": true, "type": "constructor" }, { "payable": true, "type": "fallback" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "deviceName", "type": "string" }, { "indexed": false, "name": "insurancePrice", "type": "uint256" } ], "name": "Insured", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "payout", "type": "uint256" } ], "name": "Claimed", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Invested", "type": "event" } ]');
    var appContract = web3.eth.contract(abi);

    var contractAddress = '0xbf2b816b78cd22763f6228f2af790a33a2b0f694';
    var policyContract = appContract.at(contractAddress);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];


      $("#wallet_address").html(account);

       web3.eth.getBalance(account, function (error, result) {
      if (!error) {
       // console.log(result.toNumber());
        $("#wallet_balance").html(result.toNumber());        
       } else {
         console.error(error);
       }
     });

   
    });


   



  },




  setStatus: function (message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
  },

  // refreshBalance: function() {
  //   var self = this;

  //   var meta;

  //   MetaCoin.deployed().then(function(instance) {
  //     meta = instance;
  //     return meta.getBalance.call(account, {from: account});
  //   }).then(function(value) {
  //     var balance_element = document.getElementById("balance");
  //     balance_element.innerHTML = value.valueOf();
  //   }).catch(function(e) {
  //     console.log(e);
  //     self.setStatus("Error getting balance; see log.");
  //   });
  // }


  /*
    ,sendCoin: function() {
      var self = this;
  
      var amount = parseInt(document.getElementById("amount").value);
      var receiver = document.getElementById("receiver").value;
  
      this.setStatus("Initiating transaction... (please wait)");
  
      var meta;
      MetaCoin.deployed().then(function(instance) {
        meta = instance;
        return meta.sendCoin(receiver, amount, {from: account});
      }).then(function() {
        self.setStatus("Transaction complete!");
        self.refreshBalance();
      }).catch(function(e) {
        console.log(e);
        self.setStatus("Error sending coin; see log.");
      });
    }
  */



};

window.addEventListener('load', function () {

  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {  
    window.web3 = new Web3(web3.currentProvider);
  } else {
  
    $("#noWalletModal").modal('show');
    //window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  App.start();
});










