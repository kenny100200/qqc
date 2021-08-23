$(document).ready(function () {
    $('#btn2').click(function () {
        waitForGlobal();
    });
})

var waitForGlobal = async () => {
    // 1. check variable, 检查tronweb是否已经加载
    if (window.tronWeb) {
        let tronWeb = window.tronWeb;
        // 2. check node connection，检查所需要的API是否都可以连通
        const nodes = await tronWeb.isConnected();
        const connected = !Object.entries(nodes).map(([name, connected]) => {
            console.log(name)
            if (!connected) {
                console.log(`Error:is not connected`);
            }
            return connected;
        }).includes(false);

        if (connected) {
            console.log(window.tronWeb)
            console.log("aaa " + window.tronWeb.defaultAddress.base58)


        } else {
            setTimeout(async () => {
                await waitForGlobal();
            }, 100);
        }
    } else {
        // 如果检测到没有注入tronWeb对象，则等待100ms后重新检测
        // return
        setTimeout(async () => {
            await waitForGlobal();
        }, 100);
    }
};

//发送波场合约， 合约地址/接收币地址/金额(wei单位)
async function sendTrc20Transfer(contractAddr, toAddr, toValue) {

    let contract = await window.tronWeb.contract().at(contractAddr)
    //shouldPollResponse 是否等待结果，true要等确认， false是给hash, 具体实测一把
    let result = contract.transfer(toAddr, toValue).send({shouldPollResponse: true});
    console.log(result);
}