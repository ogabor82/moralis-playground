const Moralis = require("moralis").default;
require("dotenv").config();

async function init() {
  // Moralis inicializálása
  await Moralis.start({
    apiKey: process.env.MORALIS_KEY,
  });

  // Token tranzakciók lekérdezése egy adott contracton
  //const tokenContractAddress = "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0";
  const tokenContractAddress = "0x761D38e5ddf6ccf6Cf7c55759d5210750B5D60F3";

  const response = await Moralis.EvmApi.token.getTokenTransfers({
    address: tokenContractAddress,
    chain: "0x1", // vagy bármelyik lánc, pl. 'polygon', 'bsc'
  });

  const transfers = response.raw.result;

  // Végigmegyünk az összes token transferen
  transfers.forEach((transfer) => {
    const from = transfer.from_address;
    const to = transfer.to_address;
    const value = transfer.value;
    const tokenName = transfer.token_name;
    const fromEntity = transfer.from_address_entity;

    // Ha a "from" cím a 0x000...000 (minting)
    //if (from === "0x0000000000000000000000000000000000000000") {
    if (true) {
      console.log(`Új tokenek lettek kibocsátva!`);
      console.log(`From: ${from}`);
      console.log(`To: ${to}`);
      console.log(`Amount: ${value}`);
      console.log(`Token: ${tokenName}`);
      console.log(`From entity: ${fromEntity}`);
    }
  });
}

init();
