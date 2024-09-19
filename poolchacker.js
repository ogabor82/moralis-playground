import express from "express";
import bodyParser from "body-parser";
import Moralis from "moralis";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(bodyParser.json());
const port = 3000;

const MoralisKey = process.env.MORALIS_KEY;

await Moralis.start({ apiKey: MoralisKey });

app.post("/webhook", async (req, res) => {
  const webHookBody = req.body;
  res.status(200).send();
  if (webHookBody.logs.length > 0) {
    const decodedLogs = Moralis.Streams.parsedLogs(webHookBody);
    console.log(webHookBody.chainId);
    console.log(decodedLogs);

    const response = await Moralis.EvmApi.token.getTokenMetadata({
      chain: webHookBody.chainId,
      addresses: [decodedLogs[0].token0, decodedLogs[0].token1],
    });

    const tokeInfo = response.toJSON();
    console.log("Token 1: ", tokeInfo[0].name);
    console.log("Token 1 logo: ", tokeInfo[0].logo);
    console.log("Token 1 possible_spam: ", tokeInfo[0].possible_spam);
    console.log("Token 1 verified_contract: ", tokeInfo[0].verified_contract);
    console.log("Token 2: ", tokeInfo[1].name);
    console.log("Token 2 logo: ", tokeInfo[1].logo);
    console.log("Token 2 possible_spam: ", tokeInfo[1].possible_spam);
    console.log("Token 2 verified_contract: ", tokeInfo[1].verified_contract);

    //console.log(response.toJSON());
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
