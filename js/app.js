
//const Web3 = require('web3')

const Web3 = require('web3');


var accounts;
var account;


window.App = {

  start: function () {
    var self = this;

    var abi = JSON.parse('[ { "constant": false, "inputs": [ { "name": "policyOwner", "type": "address" } ], "name": "confirmPolicy", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalInsurers", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "itemId", "type": "string" }, { "name": "deviceBrand", "type": "string" }, { "name": "deviceYear", "type": "string" }, { "name": "wearLevel", "type": "string" }, { "name": "region", "type": "string" } ], "name": "insure", "outputs": [ { "name": "insured", "type": "bool" } ], "payable": true, "type": "function" }, { "constant": false, "inputs": [ { "name": "wearLevel", "type": "uint256" } ], "name": "claim", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getPolicyEndDateTimestamp", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalInvestedAmount", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalClaimsPaid", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "investors", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalInvestorsCount", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getPolicyNextPayment", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "basePremium", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "deviceBrand", "type": "string" }, { "name": "deviceYear", "type": "string" }, { "name": "wearLevel", "type": "string" }, { "name": "region", "type": "string" } ], "name": "policyPrice", "outputs": [ { "name": "price", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "maxPayout", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "claimed", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "invest", "outputs": [ { "name": "success", "type": "bool" } ], "payable": true, "type": "function" }, { "inputs": [], "payable": true, "type": "constructor" }, { "payable": true, "type": "fallback" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "deviceName", "type": "string" }, { "indexed": false, "name": "insurancePrice", "type": "uint256" } ], "name": "Insured", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "payout", "type": "uint256" } ], "name": "Claimed", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Invested", "type": "event" } ]');
    var policyContract = web3.eth.contract(abi);

    var contractAddress = '0x554ab5f5fe7006223c2dd321b420e9a05d48ec93';
    var policyContract = policyContract.at(contractAddress);

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
         var value = web3.fromWei(result.toNumber(), 'ether');
         $("#wallet_balance").html(value);        
       } else {
         console.error(error);
       }
     });

   
    });


    //var totalInvestors = policyContract.totalInvestorsCount.call();

   policyContract.totalInsurers.call(function (err, value) {
      if (err != null) {        
        alert("There was an error fetching contract.");
        return;
      }

      $("#totalInsurers").html(value.toString()); 
      $("#totalInsurers_table").html(value.toString()); 
   });

   policyContract.totalClaimsPaid.call(function (err, value) {
      if (err != null) {        
        alert("There was an error fetching contract.");
        return;
      }
      var value = web3.fromWei(value.toString(), 'ether');
      $("#totalClaimsPaid").html(value.toString()); 
      $("#totalClaimsPaid_table").html(value.toString()); 
   });


   policyContract.investors.call(account,function (err, value) {
      if (err != null) {        
        alert("There was an error fetching contract.");
        return;
      }

      var value = web3.fromWei(value.toString(), 'ether');
      $("#invested").html(value.toString()); 
   });

  
  policyContract.totalInvestedAmount.call(account,function (err, value) {
      if (err != null) {        
        alert("There was an error fetching contract.");
        return;
      }

      var ethValue = web3.fromWei(value, 'ether');
      $("#totalInvestedAmount").html(ethValue.toString()); 
      $("#totalInvestedAmount_table").html(ethValue.toString()); 
      
      $("#predictedProfit_table").html((ethValue * 1.2).toFixed(2).toString());       
   });
   

  }



};

window.addEventListener('load', function () {

  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {  
    window.web3 = new Web3(web3.currentProvider);

    web3.version.getNetwork((err, netId) => {
      switch (netId) {
        case "3":
          console.log('This is the ropsten test network.')
          break
        default:
          $("#wrongNetworkModal").modal('show'); 
      }
    })

  } else {
  
    $("#noWalletModal").modal('show');
    //window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  App.start();

});