const BN = require("bn.js");
const { sendEther } = require("./util");
const { DAI, WBTC,USDC, DAI_WHALE } = require("./config");

const IERC20 = artifacts.require("IERC20");
const TestUniswap = artifacts.require("TestUniswap");

contract("TestUniswap", (accounts) => {
  const WHALE = DAI_WHALE;
  const AMOUNT_IN = 10000000;
  //const AMOUNT_IN = 1;
  const AMOUNT_OUT_MIN = 10;
  //const AMOUNT_OUT_MIN = 0;
  const TOKEN_IN = DAI;
  const TOKEN_OUT = USDC;
  const TO = accounts[0];
  
  console.log(`to: ${TO}`);
  console.log(`to2: ${accounts[1]}`);

  let testUniswap;
  let tokenIn;
  let tokenOut;
  beforeEach(async () => {
    tokenIn = await IERC20.at(TOKEN_IN);
    tokenOut = await IERC20.at(TOKEN_OUT);
    testUniswap = await TestUniswap.new();

    // make sure WHALE has enough ETH to send tx
    // await sendEther(web3, accounts[0], WHALE, 1);
    await tokenIn.approve(testUniswap.address, AMOUNT_IN, { from: WHALE });
  });

  it("should pass", async () => {
    // await testUniswap.swap(
    //   tokenIn.address,
    //   tokenOut.address,
    //   AMOUNT_IN,
    //   AMOUNT_OUT_MIN,
    //   TO,
    //   {
    //     from: WHALE,
    //   }
    // );

    const amountOut = await testUniswap.swapExactInputSingleHop(
      tokenIn.address,
      tokenOut.address,
      3000,
      1000000,
      {
        from: WHALE,
      }
    );

    console.log(amountOut);
    console.log(JSON.stringify(amountOut));
    //console.log(`out ${await tokenOut.balanceOf(TO)}`);

    //DAI_WHALE=0xF977814e90dA44bFA03b6295A0616a897441aceC
    //WBTC_WHALE=0xF977814e90dA44bFA03b6295A0616a897441aceC
  });
});