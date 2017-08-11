
const Web3 = require('web3');
const contractAddress_v1 = '0x554ab5f5fe7006223c2dd321b420e9a05d48ec93';
const contractAddress_v2 = '0x554ab5f5fe7006223c2dd321b420e9a05d48ec94';
const etherscanAddress = 'https://ropsten.etherscan.io/';

var accounts;
var account;
var policyContract_v1;
var policyContract_v2;

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

    var abi_v1 = JSON.parse('[ { "constant": false, "inputs": [ { "name": "policyOwner", "type": "address" } ], "name": "confirmPolicy", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalInsurers", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "itemId", "type": "string" }, { "name": "deviceBrand", "type": "string" }, { "name": "deviceYear", "type": "string" }, { "name": "wearLevel", "type": "string" }, { "name": "region", "type": "string" } ], "name": "insure", "outputs": [ { "name": "insured", "type": "bool" } ], "payable": true, "type": "function" }, { "constant": false, "inputs": [ { "name": "wearLevel", "type": "uint256" } ], "name": "claim", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getPolicyEndDateTimestamp", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalInvestedAmount", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalClaimsPaid", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "investors", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalInvestorsCount", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getPolicyNextPayment", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "basePremium", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "deviceBrand", "type": "string" }, { "name": "deviceYear", "type": "string" }, { "name": "wearLevel", "type": "string" }, { "name": "region", "type": "string" } ], "name": "policyPrice", "outputs": [ { "name": "price", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "maxPayout", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "claimed", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "invest", "outputs": [ { "name": "success", "type": "bool" } ], "payable": true, "type": "function" }, { "inputs": [], "payable": true, "type": "constructor" }, { "payable": true, "type": "fallback" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "deviceName", "type": "string" }, { "indexed": false, "name": "insurancePrice", "type": "uint256" } ], "name": "Insured", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "payout", "type": "uint256" } ], "name": "Claimed", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Invested", "type": "event" } ]');
    var contract_v1 = web3.eth.contract(abi_v1);
    policyContract_v1 = contract_v1.at(contractAddress_v1);

    var abi_v2 = JSON.parse('[ { "constant": false, "inputs": [ { "name": "policyOwner", "type": "address" } ], "name": "confirmPolicy", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalInsurers", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "itemId", "type": "string" }, { "name": "deviceBrand", "type": "string" }, { "name": "deviceYear", "type": "string" }, { "name": "wearLevel", "type": "string" }, { "name": "region", "type": "string" } ], "name": "insure", "outputs": [ { "name": "insured", "type": "bool" } ], "payable": true, "type": "function" }, { "constant": false, "inputs": [ { "name": "wearLevel", "type": "uint256" } ], "name": "claim", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getPolicyEndDateTimestamp", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalInvestedAmount", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalClaimsPaid", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "investors", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalInvestorsCount", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getPolicyNextPayment", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "basePremium", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "deviceBrand", "type": "string" }, { "name": "deviceYear", "type": "string" }, { "name": "wearLevel", "type": "string" }, { "name": "region", "type": "string" } ], "name": "policyPrice", "outputs": [ { "name": "price", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "maxPayout", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "claimed", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "invest", "outputs": [ { "name": "success", "type": "bool" } ], "payable": true, "type": "function" }, { "inputs": [], "payable": true, "type": "constructor" }, { "payable": true, "type": "fallback" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "deviceName", "type": "string" }, { "indexed": false, "name": "insurancePrice", "type": "uint256" } ], "name": "Insured", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "payout", "type": "uint256" } ], "name": "Claimed", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Invested", "type": "event" } ]');
    var contract_v2 = web3.eth.contract(abi_v2);
    policyContract_v2 = contract_v2.at(contractAddress_v2);

    App.fillInvestorPart();


  },

  fillInvestorPart: function () {
    web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        console.log(err);
        alert("There was an error fetching contract.");
        return;
      }

      if (accs.length == 0) {
        App.displayNoWalletModal();
        return;
      }

      accounts = accs;
      account = accounts[0];
      web3.eth.defaultAccount = accounts[0];

      var chunkedAcount = chunkWalletAddress(account).join(" ");

      $("#wallet_address").html(chunkedAcount);

      web3.eth.getBalance(account, function (err, result) {
        if (!err) {
          var value = web3.fromWei(result.toNumber(), 'ether');
          $("#wallet_balance").html(value);
        } else {
          console.log(err);
          alert("There was an error fetching contract.");
        }
      });

      App.fillInvestorInvestment();     
    });


    App.fillInvestmentsHeader();
    App.fillTableLine1();



  },

  fillInvestorInvestment: function () {

    policyContract_v1.investors(account, function (err, value) {
        if (err != null) {
          console.log(err);
          alert("There was an error fetching contract.");
          return;
        }

        var ethValue = web3.fromWei(value, 'ether');
        
        //TODO: add sum up with 2 contract
        $("#invested").html(ethValue.toString());


        if (ethValue == 0) {
          $("#projectedProfit").html("20% of an investment");
        } else {
          $("#projectedProfit").html((ethValue * 1.2).toFixed(4).toString());
        }
    });

  },

  fillInvestmentsHeader: function () {

    policyContract_v1.totalInsurers.call(function (err, value) {
      if (err != null) {
        alert("There was an error fetching contract. 5");
        return;
      }

      $("#totalInsurers").html(value.toString());    
    });

    policyContract_v1.totalClaimsPaid.call(function (err, value) {
      if (err != null) {
        console.log(err);
        alert("There was an error fetching contract. 4");
        return;
      }
      var valueEth = web3.fromWei(value.toString(), 'ether');
      $("#totalClaimsPaid").html(valueEth.toString()); 
    });



    policyContract_v1.totalInvestedAmount.call(account, function (err, value) {
      if (err != null) {
        console.log(err);
        alert("There was an error fetching contract. 3");
        return;
      }

      var ethValue = web3.fromWei(value, 'ether');
      $("#totalInvestedAmount").html(ethValue.toString());
    });

    policyContract_v1.totalInvestorsCount.call(account, function (err, value) {
      if (err != null) {
        console.log(err);
        alert("There was an error fetching contract. 2");
        return;
      }

      $("#totalInvestorsCount").html(value.toString());    
    });

    web3.eth.getBalance(contractAddress_v1, function (err, value) {
      if (err != null) {
        console.log(err);
        alert("There was an error fetching contract. 1");
        return;
      }

      var valueEth = web3.fromWei(value, 'ether');
      $("#totalContractBalance").html((valueEth * 1.0).toFixed(4).toString());
    });

  },




  fillTableLine1: function () {




     policyContract_v1.totalInsurers.call(function (err, value) {
      if (err != null) {
        alert("There was an error fetching contract. 5");
        return;
      }

      $("#totalInsurers_table").html(value.toString());
    });

    policyContract_v1.totalClaimsPaid.call(function (err, value) {
      if (err != null) {
        console.log(err);
        alert("There was an error fetching contract. 4");
        return;
      }
      var valueEth = web3.fromWei(value.toString(), 'ether');

      $("#totalClaimsPaid_table").html(valueEth.toString());
    });



    policyContract_v1.totalInvestedAmount.call(account, function (err, value) {
      if (err != null) {
        console.log(err);
        alert("There was an error fetching contract. 3");
        return;
      }

      var ethValue = web3.fromWei(value, 'ether');
  
      $("#totalInvestedAmount_table").html(ethValue.toString());
      $("#predictedProfit_table").html("20%");
    });

    policyContract_v1.totalInvestorsCount.call(account, function (err, value) {
      if (err != null) {
        console.log(err);
        alert("There was an error fetching contract. 2");
        return;
      }

      $("#totalInvestorsCount_table").html(value.toString());
    });

  },

  investMoney: function () {
    var self = this;
    var investValue = $("#enterValue").val();
    var weiValue = web3.toWei(investValue, 'ether');
    var weiNumber = web3.toBigNumber(weiValue);

    policyContract_v1.invest(weiValue, { gas: 300000, from: account, value: weiNumber }, function (err, result) {

      if (err != null) {
        console.log(err);
        $("#modalTitle").html("Investment was canceled.");
        $("#modalText").html("Transaction is canceled.");
        $("#generalModal").modal('show');

        return;
      }
      else {
        var etherscan = etherscanAddress + "tx/" + result;
        $("#modalTitle").html("Investment Successful");
        $("#modalText").html("Great success! Transaction has been sent. Ethers should apear in the wallet any moment (it might take up to a few minutes). You can check progress here: " + "<br /><br />" + "<a class=\"btn-link\" href=\"" + etherscan + "\" target=\"_blank\">" + etherscan + "</a><br /><br />Ethers should appear in the wallet at any moment.");
        $("#generalModal").modal('show');
      }

    });
  },

  displayNoWalletModal: function () {
    $("#modalTitle").html("This application works only in Ropsten Test Network");
    $("#modalText").html("Make sure your Ethereum client(MetaMask or Misk browser) is configured correctly and switched to Ropsten test network.");
    $("#generalModal").modal('show');
  }

};

window.addEventListener('load', function () {

  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    window.web3 = new Web3(web3.currentProvider);

    web3.version.getNetwork(function (err, netId) {
      switch (netId) {
        case "3":
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