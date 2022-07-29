const { staking } = require("./helper/staking.js");
const { aaveChainTvl} = require('./helper/aave.js'); 

// Staking TVLs
const agaveTokenAddress = '0x3a97704a1b25F08aa230ae53B352e2e72ef52843'
const agaveStakingContract = '0x610525b415c1BFAeAB1a3fc3d85D87b92f048221'

const addressesProviderRegistryXDAI = "0x4BaacD04B13523D5e81f398510238E7444E11744"
const protocolDataHelper = '0x24dCbd376Db23e4771375092344f5CbEA3541FC0'

module.exports = {
  hallmarks: [
    [1647302400, "Reentrancy attack"]
],
  methodology: `Counts the tokens locked in the contracts to be used as collateral to borrow or to earn yield. Borrowed coins are not counted towards the TVL, so only the coins actually locked in the contracts are counted. There's multiple reasons behind this but one of the main ones is to avoid inflating the TVL through cycled lending`,
  xdai:{
    tvl: aaveChainTvl("xdai", addressesProviderRegistryXDAI, addr=>`xdai:${addr}`, [protocolDataHelper], false),
    borrowed: aaveChainTvl("xdai", addressesProviderRegistryXDAI, addr=>`xdai:${addr}`, [protocolDataHelper], true),
    staking: staking(agaveStakingContract, agaveTokenAddress, "xdai")
  }
};
