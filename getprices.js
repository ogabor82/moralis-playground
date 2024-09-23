import Moralis from "moralis";
import dotenv from "dotenv";
dotenv.config();

const MoralisKey = process.env.MORALIS_KEY;

await Moralis.start({ apiKey: MoralisKey });

const resPools = await fetch(
  "https://moralis-playground-default-rtdb.europe-west1.firebasedatabase.app/pools.json"
);

const pools = await resPools.json();

Object.keys(pools).map(async (key) => {
  //console.log(pools[key].metadata[1]);
  console.log(
    `Symbol: ${pools[key].metadata[1].symbol}, Name: ${pools[key].metadata[1].name}, Address: ${pools[key].metadata[1].address}`
  );
  console.log(`Total supply: ${pools[key].metadata[1].total_supply}`);
  console.log(pools[key].tokenPrice);

  try {
    let respPrice = await Moralis.EvmApi.token.getTokenPrice({
      chain: pools[key].chainId,
      include: "percent_change",
      address: pools[key].metadata[1].address,
    });
    console.log("price", respPrice);
  } catch (error) {
    //console.log(error);
  }
});
