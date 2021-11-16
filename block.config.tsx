const blockConfig = {
  /**
    Configuration for Rinkeby
    */
  API_URL: 'https://api.blockmerchants.com',
  // API_URL: 'https://9031-125-209-76-78.ngrok.io',
  INFURA_URL: 'https://mainnet.infura.io/v3/b83bc7f34f61479e89b7f43c3175f2c7',
  ETH_GAS_API: 'https://ethgasstation.info/json/ethgasAPI.json',
  CHAIN: 'mainnet',
  CHAIN_ID: 1,
  ENV: 'production',

  BSCSCAN_EXPLORER_URL: 'https://bscscan.com/',
  BSCSCAN_API_URL: 'https://api.bscscan.com',
  //Etherscan
  ETHERSCAN_EXPLORER_URL: 'https://etherscan.io/',
  ETHERSCAN_API_URL: 'https://api.etherscan.io',
  //BlockCypher
  BLOCKCYPHER_URL: 'https://api.blockcypher.com',
  BLOCKCYPHER_API_VERSION: 'v1',
  BLOCKCYPHER_API_TOKEN: '16e1d7ed783c4da895d4a8fde9a343ab',

  ENC_SECRET: 'KM_KEY',
  ETHERSCAN_API_KEY: 'HZRT7R3NQVR5QN2QP3DDFA7KZ98J9FH1X6',
  BSCSCAN_API_KEY: '2FVGV9HMUSNR6QX4BS7IWY32H1UT416G2B',
  BLOCKCYPHER_API_ENV: 'main',
};

const testnetConfig = {
  API_URL: 'https://2c03-2400-adc5-100-9c00-59c3-d19b-c02c-275d.ngrok.io',
  // API_URL: 'http://localhost:4000',
  INFURA_URL: 'https://rinkeby.infura.io/v3/b83bc7f34f61479e89b7f43c3175f2c7',
  ETH_GAS_API: 'https://ethgasstation.info/json/ethgasAPI.json',
  CHAIN: 'rinkeby',
  CHAIN_ID: 4,
  //BNB CHAIN INFO
  BNB_RPC: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  BNB_CHAIN_ID: 97,
  BNB_CHAIN_NAME: 'SmartChain - Testnet',

  ENV: 'development',
  //BSC scan
  BSCSCAN_EXPLORER_URL: 'https://testnet.bscscan.com/',
  BSCSCAN_API_URL: 'https://api-testnet.bscscan.com',
  //Etherscan
  ETHERSCAN_EXPLORER_URL: 'https://rinkeby.etherscan.io/',
  ETHERSCAN_API_URL: 'https://api-rinkeby.etherscan.io',
  //BlockCypher
  BLOCKCYPHER_URL: 'https://api.blockcypher.com',
  BLOCKCYPHER_API_VERSION: 'v1',
  BLOCKCYPHER_API_ENV: 'test3',

  BLOCKCYPHER_API_TOKEN: '044651d9bfe5467fb94ac6ed4db1b599',
  ENC_SECRET: 'KM_KEY',
  ETHERSCAN_API_KEY: '8YZJGNF53CTYAVDTBP9KJSA23WJ94VYPND',
  BSCSCAN_API_KEY: 'U2B4F4ZCVUD5NHTIPTP7T8U3JZHBKD558Y',
};

const defaultConfig = testnetConfig;

export default defaultConfig;
