const blockConfig = {
  /**
    Configuration for Mainnet
    */
  // API_URL: 'https://admin98947.hogiwallet.com',
  // INFURA_URL: 'https://mainnet.infura.io/v3/b83bc7f34f61479e89b7f43c3175f2c7',
  // ETH_GAS_API: 'https://ethgasstation.info/json/ethgasAPI.json',
  // CHAIN: 'mainnet',
  // CHAIN_ID: 1,
  /**
    Configuration for Rinkeby
    */
  API_URL: 'https://api.blockmerchants.com',
  INFURA_URL: 'https://rinkeby.infura.io/v3/b83bc7f34f61479e89b7f43c3175f2c7',
  ETH_GAS_API: 'https://ethgasstation.info/json/ethgasAPI.json',
  CHAIN: 'rinkeby',
  CHAIN_ID: 4,
  ENV: 'development',

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
};

const testnetConfig = {
  API_URL: 'https://api.blockmerchants.com',
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

  BLOCKCYPHER_API_TOKEN: '16e1d7ed783c4da895d4a8fde9a343ab',

  ENC_SECRET: 'KM_KEY',
  ETHERSCAN_API_KEY: 'HZRT7R3NQVR5QN2QP3DDFA7KZ98J9FH1X6',
  BSCSCAN_API_KEY: '2FVGV9HMUSNR6QX4BS7IWY32H1UT416G2B',
};

const defaultConfig = testnetConfig;

export default defaultConfig;
