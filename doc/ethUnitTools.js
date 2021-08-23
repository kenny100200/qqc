const ConfigInit = require('../configInit');
const BigNumber = require('bignumber.js');


function EthUnitTools() {

}

module.exports = EthUnitTools;


/**
 *
 * @param value string/number
 * @param decimals number
 * @returns string
 */
EthUnitTools.fromWei = function (value, decimals = 18) {
    let divisor = 10 ** decimals;
    return new BigNumber(value).div(divisor).toString(10);
};

/**
 *
 * @param value string/number
 * @param decimals number
 * @returns string
 */
EthUnitTools.toWei = function (value, decimals = 18) {
    let divisor = 10 ** decimals;
    return new BigNumber(value).multipliedBy(divisor).toString(10);
};


/**
 *
 * 转换成gwei
 * @returns string
 */
EthUnitTools.GwfromWei = function (value) {
    let divisor = 10 ** 9;
    return new BigNumber(value).div(divisor).toString(10);
};

/**
 * gwei 转成wei
 * @returns string
 */
EthUnitTools.GWtoWei = function (value) {
    let divisor = 10 ** 9;
    return new BigNumber(value).multipliedBy(divisor).toString(10);
};