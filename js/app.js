
const Web3 = require('web3');
const contractAddress_v1 = '0x554ab5f5fe7006223c2dd321b420e9a05d48ec93';
const contractAddress_v2 = '0xbccc714d56bc0da0fd33d96d2a87b680dd6d0df6';

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

function errorHappened(err) {
  if (err != null) {
    console.log(err);
    alert("There was an error fetching contract.");
    return true;
  }
};

function fillform(err, result) {
  if (errorHappened(err)) {
    return;
  }

  if (result.length == 0) {
    App.displayNoWalletModal();
    return;
  }

  this.accounts = result;
  this.account = accounts[0];
  web3.eth.defaultAccount = accounts[0];


  App.fillInvestorPart();
  App.fillInvestorInvestment();
  App.fillInvestmentsHeader();
  App.fillTableLine1();
  App.fillTableLine2();
};


window.App = {

  start: function () {
    var self = this;

    var abi_v1 = JSON.parse('[ { "constant": false, "inputs": [ { "name": "policyOwner", "type": "address" } ], "name": "confirmPolicy", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalInsurers", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "itemId", "type": "string" }, { "name": "deviceBrand", "type": "string" }, { "name": "deviceYear", "type": "string" }, { "name": "wearLevel", "type": "string" }, { "name": "region", "type": "string" } ], "name": "insure", "outputs": [ { "name": "insured", "type": "bool" } ], "payable": true, "type": "function" }, { "constant": false, "inputs": [ { "name": "wearLevel", "type": "uint256" } ], "name": "claim", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getPolicyEndDateTimestamp", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalInvestedAmount", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalClaimsPaid", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "investors", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalInvestorsCount", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getPolicyNextPayment", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "basePremium", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "deviceBrand", "type": "string" }, { "name": "deviceYear", "type": "string" }, { "name": "wearLevel", "type": "string" }, { "name": "region", "type": "string" } ], "name": "policyPrice", "outputs": [ { "name": "price", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "maxPayout", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "claimed", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "invest", "outputs": [ { "name": "success", "type": "bool" } ], "payable": true, "type": "function" }, { "inputs": [], "payable": true, "type": "constructor" }, { "payable": true, "type": "fallback" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "deviceName", "type": "string" }, { "indexed": false, "name": "insurancePrice", "type": "uint256" } ], "name": "Insured", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "payout", "type": "uint256" } ], "name": "Claimed", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Invested", "type": "event" } ]');
    var contract_v1 = web3.eth.contract(abi_v1);
    policyContract_v1 = contract_v1.at(contractAddress_v1);

    var abi_v2 = JSON.parse('[{"constant":true,"inputs":[],"name":"isInvestmentPeriodEnded","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"policyOwner","type":"address"}],"name":"confirmPolicy","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalInsurers","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"itemId","type":"string"},{"name":"deviceBrand","type":"string"},{"name":"deviceYear","type":"string"},{"name":"wearLevel","type":"string"},{"name":"region","type":"string"}],"name":"insure","outputs":[{"name":"insured","type":"bool"}],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"wearLevel","type":"uint256"}],"name":"claim","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getPolicyEndDateTimestamp","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalInvestedAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"writtenPremiumAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"calculateDividends","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalClaimsPaid","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"investors","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalInvestorsCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"transferDividends","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"payedDividendsAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"policiesLimit","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"lastPolicyDate","outputs":[{"name":"","type":"uint32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getPolicyNextPayment","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"basePremium","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"deviceBrand","type":"string"},{"name":"deviceYear","type":"string"},{"name":"wearLevel","type":"string"},{"name":"region","type":"string"}],"name":"policyPrice","outputs":[{"name":"price","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"checkAvailableDividends","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getdiMyDividendsAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"investmentsDeadlineTimeStamp","outputs":[{"name":"","type":"uint32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"maxPayout","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"claimed","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"invest","outputs":[{"name":"success","type":"bool"}],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"investmentsLimit","outputs":[{"name":"","type":"uint128"}],"payable":false,"type":"function"},{"inputs":[],"payable":true,"type":"constructor"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"deviceName","type":"string"},{"indexed":false,"name":"insurancePrice","type":"uint256"}],"name":"Insured","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"payout","type":"uint256"}],"name":"Claimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"date","type":"uint256"},{"indexed":false,"name":"payout","type":"uint256"}],"name":"DividendsPayed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"value","type":"uint256"}],"name":"Invested","type":"event"}]');


    var contract_v2 = web3.eth.contract(abi_v2);
    policyContract_v2 = contract_v2.at(contractAddress_v2);


    web3.eth.getAccounts(fillform);
  },



  fillInvestorPart: function () {
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
  },


  fillInvestorInvestment: function () {

    policyContract_v1.investors(account, function (err, value) {
      if (errorHappened(err)) {
        return;
      }

      var value_v1 = web3.fromWei(value, 'ether');

      policyContract_v2.investors(account, function (err, value) {
        if (errorHappened(err)) {
          return;
        }

        var value_v2 = web3.fromWei(value, 'ether');

        var ethValue = value_v1.add(value_v2);
        $("#invested").html(ethValue.toString());

        if (ethValue == 0) {
          $("#projectedProfit").html("20% of an investment");
        } else {
          //$("#projectedProfit").html((ethValue * 1.2).toFixed(4).toString());
          $("#projectedProfit").html("16.5 %");
        }
      });
    });

    //{from: account} , 
    policyContract_v2.getdiMyDividendsAmount(function (err, value) {
      if (errorHappened(err)) {
        return;
      }

      var ethValue = web3.fromWei(value, 'ether');

      $("#revenueReceived").html(ethValue.toString());
    });

  },


  fillInvestmentsHeader: function () {

    var that = this;
    // Total policies 
    policyContract_v1.totalInsurers.call(function (err, value) {
      if (errorHappened(err)) {
        return;
      }

      policyContract_v2.totalInsurers.call(function (err, value_v2) {
        if (errorHappened(err)) {
          return;
        }

        $("#totalInsurers").html(value.add(value_v2).toString());
      });
    });


    // Total paid for the claims
    policyContract_v1.totalClaimsPaid.call(function (err, value) {
      if (errorHappened(err)) {
        return;
      }

      policyContract_v2.totalClaimsPaid.call(function (err, value_v2) {
        if (errorHappened(err)) {
          return;
        }

        var sumValue = value.add(value_v2);

        var valueEth = web3.fromWei(sumValue.toString(), 'ether');
        $("#totalClaimsPaid").html(valueEth.toString());
      });
    });


    // Total investors .. workaround because it is not working async in async. Error: invalid argument 1: hex number does not fit into 64 bits
    var totalInvestorsCount = 0;
    policyContract_v2.totalInvestorsCount.call(that.account, function (err, value) {
      if (errorHappened(err)) {
        return;
      }
      totalInvestorsCount = value.add(totalInvestorsCount);
      $("#totalInvestorsCount").html((totalInvestorsCount).toString());
    });

    policyContract_v1.totalInvestorsCount.call(that.account, function (err, value2) {
      if (errorHappened(err)) {
        return;
      }
      totalInvestorsCount = value2.add(totalInvestorsCount);
      $("#totalInvestorsCount").html((totalInvestorsCount).toString());
    });





    // Total invested amount  .. workaround because it is not working async in async. Error: invalid argument 1: hex number does not fit into 64 bits
    var totalContractBalance = 0;
    policyContract_v1.totalInvestedAmount.call(that.account, function (err, value) {
      if (errorHappened(err)) {
        return;
      }

      totalContractBalance = web3.fromWei(value, 'ether').add(totalContractBalance);
      $("#totalInvestedAmount").html(totalContractBalance.toString());
    });

    policyContract_v2.totalInvestedAmount.call(that.account, function (err, value) {
      if (errorHappened(err)) {
        return;
      }

      totalContractBalance = web3.fromWei(value, 'ether').add(totalContractBalance);
      $("#totalInvestedAmount").html(totalContractBalance.toString());
    });


    // Total amount in reserves 
    web3.eth.getBalance(contractAddress_v1, function (err, value) {
      if (errorHappened(err)) {
        return;
      }

      web3.eth.getBalance(contractAddress_v2, function (err, value2) {
        if (errorHappened(err)) {
          return;
        }

        var valueEth = web3.fromWei(value.add(value2), 'ether');
        $("#totalContractBalance").html((valueEth * 1.0).toFixed(4).toString());
      });
    });

  },


  fillTableLine1: function () {
    var self = this;

    policyContract_v1.totalInsurers.call(function (err, value) {
      if (errorHappened(err)) {
        return;
      }

      $("#totalInsurers_table").html(value.toString());
    });

    policyContract_v1.totalClaimsPaid.call(function (err, value) {
      if (errorHappened(err)) {
        return;
      }
      var valueEth = web3.fromWei(value.toString(), 'ether');

      $("#totalClaimsPaid_table").html(valueEth.toString());
    });



    policyContract_v1.totalInvestedAmount.call(self.account, function (err, value) {
      if (errorHappened(err)) {
        return;
      }

      var ethValue = web3.fromWei(value, 'ether');

      $("#totalInvestedAmount_table").html(ethValue.toString());
      $("#predictedProfit_table").html("20%");
    });

    policyContract_v1.totalInvestorsCount.call(self.account, function (err, value) {
      if (errorHappened(err)) {
        return;
      }

      $("#totalInvestorsCount_table").html(value.toString());
    });



  },


  fillTableLine2: function () {
    var self = this;

    policyContract_v2.totalInsurers.call(function (err, value) {
      if (errorHappened(err)) {
        return;
      }

      $("#totalInsurers2_table").html(value.toString());
    });

    policyContract_v2.totalClaimsPaid.call(function (err, value) {
      if (errorHappened(err)) {
        return;
      }
      var valueEth = web3.fromWei(value.toString(), 'ether');

      $("#totalClaimsPaid2_table").html(valueEth.toString());
    });



    policyContract_v2.totalInvestedAmount.call(self.account, function (err, value) {
      if (errorHappened(err)) {
        return;
      }

      var ethValue = web3.fromWei(value, 'ether');

      $("#totalInvestedAmount2_table").html(ethValue.toString());
      $("#predictedProfit2_table").html("13%");
    });

    policyContract_v2.totalInvestorsCount.call(self.account, function (err, value) {
      if (errorHappened(err)) {
        return;
      }

      $("#totalInvestorsCount2_table").html(value.toString());
    });





    policyContract_v2.checkAvailableDividends.call({ from: self.account }, function (err, value) {
      if (errorHappened(err)) {
        return;
      }
      if (value > 0) {

        var ethValue = web3.fromWei(value, 'ether');

        var elem = document.getElementById('dividendsDiv');
        elem.innerHTML = " <div>"
          + "<small>You have: " + ethValue.toString() + "</small>"
          + "<button data-toggle=\"modal\" data-click=\"get-dividends-modal\" class=\"btn btn-sm btn-primary\" type=\"button\">GET PROFIT</button> </div>"
          ;
      }

    });



  },


  investMoney: function () {
    var self = this;
    var investValue = $("#enterValue").val();
    var weiValue = web3.toWei(investValue, 'ether');
    var weiNumber = web3.toBigNumber(weiValue);

    policyContract_v2.invest({ gas: 300000, from: account, value: weiNumber }, function (err, result) {

      if (err != null) {
        console.log(err);
        $("#modalTitle").html("Investment was canceled.");
        $("#modalText").html("Transaction is canceled.");
        $("#generalModal").modal('show');

        return;
      }
      else {
        App.refreshPage(result);

        var etherscan = etherscanAddress + "tx/" + result;
        $("#modalTitle").html("Investment Successful");
        $("#modalText").html("Great success! Transaction has been sent. Ethers should apear in the wallet any moment (it might take up to a few minutes). You can check progress here: " + "<br /><br />" + "<a class=\"btn-link\" href=\"" + etherscan + "\" target=\"_blank\">" + etherscan + "</a><br /><br />Ethers should appear in the wallet at any moment.");
        $("#generalModal").modal('show');
      }
    });
  },

  getDividends: function () {
    var self = this;

    policyContract_v2.transferDividends(function (err, result) {

      if (err != null) {
        console.log(err);
        $("#modalTitle").html("Error happened.");
        $("#modalText").html("Try again later.");
        $("#generalModal").modal('show');

        return;
      }
      else {
        App.refreshPage(result);

        var elem = document.getElementById('dividendsDiv');
        elem.innerHTML = "Not available";

        var etherscan = etherscanAddress + "tx/" + result;
        $("#modalTitle").html("Claim transfer Successful");
        $("#modalText").html("Great success! Transaction has been sent. Ethers should apear in the wallet any moment (it might take up to a few minutes). You can check progress here: " + "<br /><br />" + "<a class=\"btn-link\" href=\"" + etherscan + "\" target=\"_blank\">" + etherscan + "</a><br /><br />Ethers should appear in the wallet at any moment.");
        $("#generalModal").modal('show');
      }

    });
  },

  displayNoWalletModal: function () {
    $("#modalTitle").html("Only a few steps left to start investing!");
    $("#modalText").html('To access our investment dashboard, you need to have <b>Ethereum Client</b> in place with Ropsten Testnet selected. (Metamask, Parity, Ethereum Mist browser or any other client that supports Web3). <br/><br/>For the best experience use Metamask. <div id="learnMore"><u>Learn how</u></div>\
      <ul id="instructionsList" style="display:none;"><li>Metamask download instructions can be found <a href="https://metamask.io" target="_blank"><u>here</u></a></li>\
      <li>Select “Ropsten Testnet” and create a new wallet.</li>\
      <li>Refresh the page.</li>\
      <li>To <b>invest</b>, you need <b>testnet Ethers</b>. Metamask gives you them by default, so you are ready to invest into Insurance.</li></ul><br/>\
      If you have any questions, please join our <a href="http://slack.aigang.network" target="_blank"> <u><b>Slack</b></u></a>\
      <br/><br/>\
      <b>No time for this?</b> Watch our short DEMO video by clicking <a href="https://www.youtube.com/watch?v=Hz-uL1fk49A&" target="_blank"><u>here</u></a>. \
       <script>$("#learnMore").click(function () {$("#instructionsList").toggle("1000ms");});</script>');
    $("#generalModal").modal('show');
  },

  refreshPage: function (txh) {
    var hash = txh;
    var filter = web3.eth.filter('latest');
    filter.watch(function (error, result) {
      if (!error) {

        web3.eth.getBlockNumber(function (error, blockNumber) {
          if (!error) {

            web3.eth.getBlock(blockNumber - 4, function (error, confirmedBlock) {
              if (!error && confirmedBlock.transactions.length > 0) {

                web3.eth.getTransaction(hash, function (error, transaction) {
                  if (!error) {
                    if (transaction && transaction.from == account) {
                      filter.stopWatching();
                      location.reload();
                    }
                  }
                });

              }
            });

          }
        });
      }
    });

  }

};

window.addEventListener('load', function () {

  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    window.web3 = new Web3(web3.currentProvider);

    web3.version.getNetwork(function (err, netId) {
      if (netId == "3") {
        App.start();
      } else {
        console.log(err);
        App.displayNoWalletModal();
      }
    })
  } else {
    App.displayNoWalletModal();

    //window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

});