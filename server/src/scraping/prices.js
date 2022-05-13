const axios = require("axios");

const FLOOR_BUYOUT_TOKENS = 1010;
const FLOOR_SELL_TOKENS = 990;
const FLOOR_TOKENS = 1000;
const DROPLET_TOKENS = 100;
const FEE = 0.0025;
const RAYDIUM_URL = "https://api.raydium.io/v2";
const MAGIC_EDEN_URL = "https://api-mainnet.magiceden.io/rpc/";
const ATRIX_URL = "https://api.atrix.finance/api/";
const LAMPORTS_PER_SOL = 1000000000;

// params
const priceToBuy = 2;
const sortBy = "profit";
async function getPrices() {
  const atrix = await getAtrixPrices(priceToBuy);
  const raydium = await getRaydiumPrices(priceToBuy);
  const prices = raydium.concat(atrix);
  return prices
    .map((price) => {
      const profitInstantBuy = price.floor - price.instantBuy;
      const profitInstantSell = price.instantSell - price.floor;
      return {
        ...price,
        profitInstantBuy,
        profitInstantSell,
        maxProfit: Math.max(profitInstantBuy, profitInstantSell),
        discount: getDiscount(price.floor, price.customSell),
      };
    })
    .sort((a, b) => {
      if (sortBy === "profit") {
        return b.maxProfit - a.maxProfit;
      }
      if (sortBy === "discount") {
        return a.discount - b.discount;
      }
      return a.discount - b.discount;
    });
  //
}

async function getAtrixPrices(priceToSell) {
  const pairs = await getAtrixPairs();
  const solPrice = await getSolPrice();

  let prices = [];

  await Promise.all(
    SOLVENT_TOKENS.map(async (token) => {
      const floor = await getMagicEdenPrice(token.magicEden);
      const atrixData = pairs.find((pair) => token.amm === pair.key);
      if (!atrixData) {
        console.log(token);
        return;
      }
      const tokenAmount = atrixData.coinTokens;
      const solAmount = atrixData.pcTokens;
      const instantBuy = getInstantBuyPrice(solAmount, tokenAmount, DROPLET_TOKENS);
      const instantSell = getInstantSellPrice(solAmount, tokenAmount, DROPLET_TOKENS);
      const nftValuation = getNftValuation(solAmount, tokenAmount, DROPLET_TOKENS);
      const customSell = getPriceAtSellSolAmount(
        solAmount,
        tokenAmount,
        priceToSell,
        DROPLET_TOKENS
      );
      prices.push({
        collection: token.magicEden,
        ticker: token.token,
        customSell: customSell.price / solPrice,
        nftValuation: nftValuation / solPrice,
        instantBuy: instantBuy / solPrice,
        instantSell: instantSell / solPrice,
        floor,
      });
    })
  );
  return prices;
}

async function getRaydiumPrices(priceToSell) {
  const pairs = await getRaydiumPairs();
  let prices = [];

  await Promise.all(
    BS_TOKENS.map(async (token) => {
      const floor = await getMagicEdenPrice(token.magicEden);
      const raydiumData = pairs.find((pair) => token.amm === pair.ammId);
      const tokenAmount = raydiumData.tokenAmountCoin;
      const solAmount = raydiumData.tokenAmountPc;
      const instantBuy = getInstantBuyPrice(solAmount, tokenAmount, FLOOR_BUYOUT_TOKENS);
      const instantSell = getInstantSellPrice(solAmount, tokenAmount, FLOOR_SELL_TOKENS);
      const nftValuation = getNftValuation(solAmount, tokenAmount, FLOOR_TOKENS);
      const customSell = getPriceAtSellSolAmount(solAmount, tokenAmount, priceToSell, FLOOR_TOKENS);
      prices.push({
        collection: token.magicEden,
        ticker: token.token,
        customSell: customSell.price,
        nftValuation,
        instantBuy,
        instantSell,
        floor,
      });
    })
  );
  return prices;
}

async function getAtrixPairs() {
  const { data } = await axios.get(`${ATRIX_URL}/all`);
  const pairs = data.pools;
  const filteredPairs = pairs.filter((pair) =>
    SOLVENT_TOKENS.find((token) => token.amm === pair.key)
  );
  return filteredPairs;
}

async function getRaydiumPairs() {
  const { data: pairs } = await axios.get(`${RAYDIUM_URL}/main/pairs`);
  const filteredPairs = pairs.filter((pair) => BS_TOKENS.find((token) => token.amm === pair.ammId));
  return filteredPairs;
}

async function getMagicEdenPrice(collectionId) {
  const res = await axios.get(
    `${MAGIC_EDEN_URL}/getCollectionEscrowStats/${collectionId}?edge_cache=true`
  );
  const price = res.data?.results?.floorPrice;
  if (!price) return 0;
  return price / LAMPORTS_PER_SOL;
}

function getNftValuation(solAmount, tokenAmount, nftAmount) {
  return (solAmount / tokenAmount) * nftAmount;
}

function getInstantBuyPrice(solAmount, tokenAmount, buyAmount) {
  const k = solAmount * tokenAmount;
  const newTokenAmount = tokenAmount - buyAmount;
  const newSolAmount = k / newTokenAmount;
  const solToPay = newSolAmount - solAmount;

  return solToPay * (1 + FEE);
}

function getInstantSellPrice(solAmount, tokenAmount, sellAmount) {
  const k = solAmount * tokenAmount;
  const newTokenAmount = tokenAmount + sellAmount;
  const newSolAmount = k / newTokenAmount;
  const solToPay = solAmount - newSolAmount;

  return solToPay * (1 - FEE);
}

function getPriceAtSellSolAmount(solAmount, tokenAmount, sellAmount, nftAmount) {
  const k = solAmount * tokenAmount;
  const newSolAmount = solAmount + sellAmount * (1 - FEE);
  const newTokenAmount = k / newSolAmount;
  const tokensReceived = tokenAmount - newTokenAmount;
  const price = (newSolAmount / newTokenAmount) * nftAmount;

  return { tokensReceived, price };
}

function getDiscount(floor, token) {
  return ((token - floor) / token) * 100;
}

async function getSolPrice() {
  const res = await axios.get("https://production.api.coindesk.com/v2/tb/price/ticker?assets=SOL");
  return res.data?.data?.SOL?.ohlc?.c;
}

const BS_TOKENS = [
  {
    amm: "mb47q5xZJbZsh2gx95xPCzivtvXHXrDoNpJARPDP8z7",
    magicEden: "boryoku_dragonz",
    token: "DRGNZ",
  },
  {
    amm: "2SXKrb4tnALbCpcS5tJz9GjgdFsZLmdyZSUkG2dGp4uY",
    magicEden: "stoned_ape_crew",
    token: "SAC",
  },
  {
    amm: "CEmBdGcayBiU5PYZm77U2RkVfnEicDyRx193UeaqWz5f",
    magicEden: "playground_waves",
    token: "WAVES",
  },
  { amm: "2Qmp9jLU64idYVYrqWy8tiBcnHs7hZhzTgCdxSjsY5JZ", magicEden: "portals", token: "IVRY" },
];

const SOLVENT_TOKENS = [
  {
    amm: "FA2ScSJokN5JJaCVj1UuP2Fbv9c91GqRiU1DvqSWSeXd",
    magicEden: "the_catalina_whale_mixer",
    token: "CWM",
  },
  {
    amm: "4y9wGYFSTDMmkrCGifu657WRf3mVAspSaSkaveUTyZAC",
    magicEden: "degenerate_ape_academy",
    token: "DAPE",
  },
  { amm: "fq96tEMPv8nf2oXg7zjyxMjBwnrfkhtWbKeBEZ5FvAz", magicEden: "thugbirdz", token: "THUGZ" },
  { amm: "3Qxb8TS5QbLemp7nCkWSbxBjn5aj3GuQGX2a1JCWXaM7", magicEden: "degods", token: "DGOD" },
  { amm: "62GyyKoEKsL1iqXPjKkr7zzSxQRPAo8aTe4urfJJFY76", magicEden: "balloonsville", token: "BV" },
  { amm: "DKGQAdbgY1c4JWR96vgdxX5d8KA35s46pGeisEZvoZ8F", magicEden: "genopets", token: "GENO" },
  { amm: "czd4CkfHgmX4QPZf2peWiYaJyipzpCx5z1wU9PDaLBK", magicEden: "aurory", token: "AUR" },
  {
    amm: "FQ3JzCQ7rTSsGmbxK7jyceP5AELabSpFPSMhPuAcnGaL",
    magicEden: "playground_waves",
    token: "PLWAV",
  },
  {
    amm: "DUCCQZbw6KGvm2SNYjF8BkNPG3eWVE1QRKioHdRw1GYK",
    magicEden: "lifinity_flares",
    token: "LIFL",
  },
  {
    amm: "65rRBZwoiG9DHfHtcfYU7rdGoRYzGkhAHX2LYp1mZDxv",
    magicEden: "playground_epoch",
    token: "EPOCH",
  },
  { amm: "7dC1HRENpfpqthHHpGHc2t4BoGMNFPtvpUTEVHQrAUTW", magicEden: "gooney_toons", token: "GOON" },
  {
    amm: "4zdzDF876Yw2HmRKfZ8rC34mNQWZJanCLr9pvdsqWi57",
    magicEden: "galactic_geckos",
    token: "GGSG",
  },
  {
    amm: "6BHZcaaTBQyrn14fmSPmJsjfnqkWQtsspDtVm1sipnb3",
    magicEden: "pesky_penguins",
    token: "PSK",
  },
  {
    amm: "67NkSUhwU1wSNAHWEJAq7ghrhpbsWsXNYwMUWDhCb8gB",
    magicEden: "honey_genesis_bee",
    token: "HNYG",
  },
  {
    amm: "BQnVEEPBBWLxHc4cSBg4rZR3GVgpW3jGw5kuGVojBqQH",
    magicEden: "famous_fox_federation",
    token: "FFF",
  },
  {
    amm: "7yQzTZ9nMpsSePZxgxWpGMK62Zrkr9u7ngEsxyC9j7pG",
    magicEden: "solana_monkey_business",
    token: "SMBD",
  },
];

module.exports = { getPrices };
