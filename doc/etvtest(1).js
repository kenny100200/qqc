const tronSendTxUtils = require('../library/tronSendTxUtils')
const BigNumber = require('bignumber.js');
const Common = require('../library/common');
const EthUnitTool = require('../library/ethUnitTools');

let tronWeb = tronSendTxUtils.getTronWeb();
let stakeContractAddr = 'TD9oLgVehzQgoM7qySEpcmnWkmPg7hDRQF';
let tokenInAddr = 'TXXubhurYenXqUerLufeyYUGY1T7NpDdPT';
let tokenInDecimal = 6;
let tokenOutAddr = 'TYEGU7sYLLB3QYvGtZMCUWWsFohg2NRVxR';
let tokenOutDecimal = 8;
let testAccount = 'TLhGbo5AVqS9MGFVGAze6oseMDPEdrZVrD';

async function test() {
    await getSysInfo();
    await getUserInfo();
    isApproved(testAccount)
}

test();

//发送授权， 质押需要先授权
async function approve() {
    let contract = await tronWeb.contract().at(tokenInAddr)
    let num = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    let hash = await contract.approve(stakeContractAddr, num).send({shouldPollResponse: false});
    console.log("hash " + hash)
}

async function isApproved(userAddr) {
    let contract = await tronWeb.contract().at(tokenInAddr)
    let remaining = await contract.allowance(userAddr, stakeContractAddr).call()
    console.log(remaining.remaining.gt(0))
    console.log("授权量 "+remaining.remaining.toString())//最小精度

    //下面测试质押判断
    //默认授权量很大，
    let num = '0.1'
    num = EthUnitTool.toWei(num, tokenInDecimal)
    //先判断有没有授权
    let tokenContract = await tronWeb.contract().at(tokenInAddr)
    let curUserAddr = testAccount;//当前链接波宝的地址
    let remaining2 = await tokenContract.allowance(curUserAddr, stakeContractAddr).call()
    //由于发的代币返回值不是很标准，内部还有一个变量
    console.log("授权量是否小于质押数量 "+remaining2.remaining.lt(num))
}

async function stake() {
    let num = '0.1'
    num = EthUnitTool.toWei(num, tokenInDecimal)
    //先判断有没有授权
    let tokenContract = await tronWeb.contract().at(tokenInAddr)
    let curUserAddr = testAccount;//当前链接波宝的地址
    let remaining = await tokenContract.allowance(curUserAddr, stakeContractAddr).call()
    //由于发的代币返回值不是很标准，内部还有一个变量
    if(remaining.remaining.lt(num)){
        return '授权量不足，请现授权';
    }

    let contract = await tronWeb.contract().at(stakeContractAddr)

    let hash = await contract.stake(num).send({shouldPollResponse: false});
    console.log("hash " + hash)
}

async function getSysInfo() {
    let contract = await tronWeb.contract().at(stakeContractAddr)
    let result = await contract.getSysInfo().call();
    console.log(result)
    //当前总质押量,当天产出，当天第几天，开始时间,全网矿工数量
    let total = EthUnitTool.fromWei(result[0].toString(), tokenInDecimal);
    let dayOut = EthUnitTool.fromWei(result[1].toString(), tokenInDecimal);
    let day = result[2];//十六进制，需要转出10进制
    let curTime = result[3];//十六进制，需要转出10进制
    let userCount = result[4];//十六进制，需要转出10进制
    console.log("质押总量 " + total + " 当日产出： " + dayOut + ", 当前天数 " + day + ", 开始时间： " + curTime + " , 用户数量： " + userCount)
}

async function getUserInfo() {
    let contract = await tronWeb.contract().at(stakeContractAddr)
    let result = await contract.getUser(testAccount).call();
    //是否有投资过(1/0)， 用户总质押， 累计已提收益，用户最后操作的时间戳，用户结算收益天数的0点时间戳，订单长度，领取收益长度
    let total = EthUnitTool.fromWei(result[1].toString(), tokenInDecimal);
    let outAmount = EthUnitTool.fromWei(result[2].toString(), tokenOutDecimal);
    let orderLen = result[5];//十六进制，需要转出10进制
    let rewardLen = result[6];//十六进制，需要转出10进制
    console.log("用户 " + testAccount + " 总质押： " + total + " ,已领取收益： " + outAmount + ",质押数量：" + orderLen + " ,收益领取记录数量： " + rewardLen);


    //
    console.log("获取用户质押列表");
    let orderResult = await contract.getUserOrder(testAccount, 0, orderLen).call();
    console.log(orderResult)
    let oLen = orderResult.amountArr.length;
    for (let i = 0; i < oLen; i++) {
        console.log(orderResult.amountArr[i])
        let oAmount = EthUnitTool.fromWei(orderResult.amountArr[i].toString(), tokenInDecimal);
        let oTime = orderResult.timeArr[i];
        console.log("用户订单号index： " + i + " 数据-> 金额：" + oAmount + " 时间：" + oTime)
    }

    //
    console.log("获取用户领取记录")

    let rewardResult = await contract.getUserRewardList(testAccount, 0, rewardLen).call();
    console.log(rewardResult)
    let rLen = rewardResult.amountArr.length;
    for (let i = 0; i < rLen; i++) {
        let oAmount = EthUnitTool.fromWei(rewardResult.amountArr[i].toString(), tokenInDecimal);
        let oTime = rewardResult.timeArr[i];
        let oDay = rewardResult.dayArr[i];
        console.log("用户领取记录index： " + i + " 数据-> 金额：" + oAmount + " 时间：" + oTime + " 天数：" + oDay)
    }

}

