/**
	File: uscWork.js
	Purpose: Object that represents USC data needed to generate a new job

	@author Yeou Sunn
	@copyright Ulord development team.
*/

var UscWork = module.exports = function(initialized_){
	this.created_at = 0;
	this.blockHash_ = 0;
	this.target_ = 0;
	this.fees_ = 0;
	this.rpcAddress_ = "";
	this.rpcUserPwd_ = "";
	this.notifyFlag_ = false;
	this.initialized_ = false;

	this.initFromGw = function(rawGetWork){
		var work = "";
		if(!isValidJson(rawGetWork))
		{
			console.log("decode usc getwork json fail: >" + rawGetWork + "<");
			return false;
		}
		work = JSON.parse(rawGetWork);
		
		if(	typeof work.uscdRpcAddress != "string" ||
			typeof work.uscdRpcUserPwd != "string" ||
			typeof work.parentBlockHash != "string" ||
			typeof work.blockHashForMergedMining != "string" ||
			typeof work.target != "string" ||
			typeof work.feesPaidToMiner != "string" ||
			typeof work.notify != "string")
		{
			console.log("usc getwork fields failure.");
			return false;
		}
		
		this.blockHash_ = work.blockHashForMergedMining;
		this.target_ = work.target;
		this.fees_ = work.feesPaidToMiner;
		this.rpcAddress_ = work.uscdRpcAddress;
		this.rpcUserPwd_ = work.uscdRpcUserPwd;
		this.notifyFlag_ = work.notify;

		this.initialized_ = true;
		
		return true;
	};

	this.isInitialized = function(){
		return this.initialized_;
	};

	this.getCreatedAt = function(){
		return this.created_at;
	};

	this.getBlockHash = function(){
		return this.blockHash_;
	};

	this.getTarget = function(){
		return this.target_;
	};

	this.getFees = function(){
		return this.fees_;
	};

	this.getRpcAddress = function(){
		return this.rpcAddress_;
	};

	this.getRpcUserPwd = function(){
		return this.rpcUserPwd_;
	};

	this.getNotifyFlag = function(){
		return this.notifyFlag_
	};

	this.setIsCleanJob = function(cleanJob){
		this.isCleanJob_ = cleanJob;
	};

	this.getIsCleanJob = function(){
		return this.isCleanJob_;
	};
	
	function isValidJson(str){
		try{
			JSON.parse(str);
		}catch(e){
			return false;
		}
		return true;
	}
};