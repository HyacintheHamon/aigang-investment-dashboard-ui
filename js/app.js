
const Web3 = require('web3');
const contractAddress = '0x554ab5f5fe7006223c2dd321b420e9a05d48ec93';

var accounts;
var account;
var policyContract;

function chunkWalletAddress(str) {
  var ret = [];
  var i;
  var len;
  var n = 4;

  ret.push(str.substr(0, 2))

  for (i = 2, len = str.length; i < len; i += n) {
    ret.push(str.substr(i, n))
  }

  return ret
};


window.App = {

  start: function () {
    var self = this;

    var abi = JSON.parse('[ { "constant": false, "inputs": [ { "name": "policyOwner", "type": "address" } ], "name": "confirmPolicy", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalInsurers", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "itemId", "type": "string" }, { "name": "deviceBrand", "type": "string" }, { "name": "deviceYear", "type": "string" }, { "name": "wearLevel", "type": "string" }, { "name": "region", "type": "string" } ], "name": "insure", "outputs": [ { "name": "insured", "type": "bool" } ], "payable": true, "type": "function" }, { "constant": false, "inputs": [ { "name": "wearLevel", "type": "uint256" } ], "name": "claim", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getPolicyEndDateTimestamp", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalInvestedAmount", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalClaimsPaid", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "investors", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalInvestorsCount", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getPolicyNextPayment", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "basePremium", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "deviceBrand", "type": "string" }, { "name": "deviceYear", "type": "string" }, { "name": "wearLevel", "type": "string" }, { "name": "region", "type": "string" } ], "name": "policyPrice", "outputs": [ { "name": "price", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "maxPayout", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "claimed", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "invest", "outputs": [ { "name": "success", "type": "bool" } ], "payable": true, "type": "function" }, { "inputs": [], "payable": true, "type": "constructor" }, { "payable": true, "type": "fallback" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "deviceName", "type": "string" }, { "indexed": false, "name": "insurancePrice", "type": "uint256" } ], "name": "Insured", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "payout", "type": "uint256" } ], "name": "Claimed", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Invested", "type": "event" } ]');
    var contract = web3.eth.contract(abi);

    policyContract = contract.at(contractAddress);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        App.displayNoWalletModal();
        return;
      }

      accounts = accs;
      account = accounts[0];

      var chunkedAcount = chunkWalletAddress(account).join(" ");

      $("#wallet_address").html(chunkedAcount);

      web3.eth.getBalance(account, function (error, result) {
        if (!error) {
          var value = web3.fromWei(result.toNumber(), 'ether');
          $("#wallet_balance").html(value);
        } else {
          console.error(error);
        }
      });
    });


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


    policyContract.investors.call(account, function (err, value) {
      if (err != null) {
        alert("There was an error fetching contract.");
        return;
      }

      var ethValue = web3.fromWei(value, 'ether');
      $("#invested").html(ethValue.toString());

      if (ethValue == 0) {
        $("#projectedProfit").html("20% of an investment");
      } else {
        $("#projectedProfit").html((ethValue * 1.2).toFixed(2).toString());
      }


    });


    policyContract.totalInvestedAmount.call(account, function (err, value) {
      if (err != null) {
        alert("There was an error fetching contract.");
        return;
      }

      var ethValue = web3.fromWei(value, 'ether');
      $("#totalInvestedAmount").html(ethValue.toString());
      $("#totalInvestedAmount_table").html(ethValue.toString());

      $("#predictedProfit_table").html((ethValue * 1.2).toFixed(2).toString());
    });


  },


  investMoney: function () {

    //  var self = this;

    var investValue = $("#enterValue").val();
    var weiValue = web3.toWei(investValue, 'ether');

    policyContract.invest(weiValue, { gas: 300000, from: account }, function (err, result) {

      if (err != null) {
        $("#modalTitle").html("Investment was canceled.");
        $("#modalText").html("Transaction is canceled.");
        $("#generalModal").modal('show');

        return;
      }
      else {
        var etherscan = "https://ropsten.etherscan.io/address/" + result;
        $("#modalTitle").html("Investment sent!");
        $("#modalText").html("Details: " + "</br>" + "<a href=\"" + etherscan + "\" target=\"_blank\">" + etherscan + "</a>");
        $("#generalModal").modal('show');
      }


    });
  },

  displayNoWalletModal: function(){
        $("#modalTitle").html("This application works only in Ropsten Test Network");
        $("#modalText").html("Make sure your Ethereum client(MetaMask or Misk browser) is configured correctly and switched to Ropsten test network.");
        $("#generalModal").modal('show');
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
          App.displayNoWalletModal();
      }
    })

    web3.version.getNetwork(function (err, netId) {
      switch (netId) {
        case "3":
          console.log('This is the ropsten test network.')
          break
        default:
          App.displayNoWalletModal();
      }
    })

    

  } else {
    App.displayNoWalletModal();

    //window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  App.start();

});