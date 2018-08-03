/**
  File: gwMaker.js
  
  @author Yeou Sunn
  @copyright Ulord development team.  
*/

var usc_rpc = require('node-bitcoin-rpc');

var GwMaker = module.exports = function(uscdRpcAddr, uscdRpcPort){
    var uscdRpcAddr = uscdRpcAddr;
    var uscdRpcPort = uscdRpcPort;
    this.makeRawGwMsg = function(callback){
        
        usc_rpc.init(uscdRpcAddr, uscdRpcPort, '', '');
        usc_rpc.call('mnr_getWork', [], function (err, res) {
            
            var gw = res;
            var rawgw = {};
            rawgw["uscdRpcAddress"] = uscdRpcAddr;
            rawgw["uscdRpcPort"] = uscdRpcPort;
            rawgw["target"] = gw.result.target;
            rawgw["parentBlockHash"] = gw.result.parentBlockHash;
            rawgw["blockHashForMergedMining"] = gw.result.blockHashForMergedMining;
            rawgw["feesPaidToMiner"] = gw.result.feesPaidToMiner;
            rawgw["notify"] = gw.result.notify;

            callback(rawgw);
            callback = function(){};
        });
    }
}