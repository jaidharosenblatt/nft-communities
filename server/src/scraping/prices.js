const axios = require("axios");

const FLOOR_BUYOUT_TOKENS = 1010;
const FLOOR_SELL_TOKENS = 990;
const FLOOR_TOKENS = 1000;
const FEE = 0.0025;

const RAYDIUM_URL = "https://api.raydium.io/v2";
const MAGIC_EDEN_URL = "https://api-mainnet.magiceden.io/rpc/";
const LAMPORTS_PER_SOL = 1000000000;

async function getPrices() {
  const pairs = await getRaydiumPrices();
  let prices = [];
  await Promise.all(
    BS_TOKENS.map(async (token) => {
      const floor = await getMagicEdenPrice(token.magicEden);
      const raydiumData = pairs.find((pair) => token.amm === pair.ammId);
      const tokenAmount = raydiumData.tokenAmountCoin;
      const solAmount = raydiumData.tokenAmountPc;
      const instantBuy = getInstantBuyPrice(solAmount, tokenAmount, FLOOR_BUYOUT_TOKENS);
      const instantSell = getInstantSellPrice(solAmount, tokenAmount, FLOOR_SELL_TOKENS);
      const nftValuation = getNftValuation(solAmount, tokenAmount);
      const sell2Sol = getPriceAtSellSolAmount(solAmount, tokenAmount, 2);
      prices.push({
        collection: token.magicEden,
        discount: getDiscount(floor, nftValuation),
        sell2Sol,
        nftValuation,
        instantBuy,
        instantSell,
        floor,
        difference: floor - instantBuy,
      });
    })
  );
  //   return prices.sort((a, b) => b.difference - a.difference);
  return prices.sort((a, b) => a.discount - b.discount);
}

async function getRaydiumPrices() {
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

function getNftValuation(solAmount, tokenAmount) {
  return (solAmount / tokenAmount) * FLOOR_TOKENS;
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

function getPriceAtSellSolAmount(solAmount, tokenAmount, sellAmount) {
  const k = solAmount * tokenAmount;
  const newSolAmount = solAmount + sellAmount * (1 - FEE);
  const newTokenAmount = k / newSolAmount;
  const tokensReceived = tokenAmount - newTokenAmount;

  return tokensReceived;
}

function getDiscount(floor, token) {
  return ((token - floor) / token) * 100;
}

const BS_TOKENS = [
  { amm: "mb47q5xZJbZsh2gx95xPCzivtvXHXrDoNpJARPDP8z7", magicEden: "boryoku_dragonz" },
  { amm: "2SXKrb4tnALbCpcS5tJz9GjgdFsZLmdyZSUkG2dGp4uY", magicEden: "stoned_ape_crew" },
  { amm: "CEmBdGcayBiU5PYZm77U2RkVfnEicDyRx193UeaqWz5f", magicEden: "playground_waves" },
  { amm: "2Qmp9jLU64idYVYrqWy8tiBcnHs7hZhzTgCdxSjsY5JZ", magicEden: "portals" },
];

const SOLVENT_TOKENS = [
  { amm: "FA2ScSJokN5JJaCVj1UuP2Fbv9c91GqRiU1DvqSWSeXd", magicEden: "the_catalina_whale_mixer" },
  { amm: "9qLYpPsVaaHW1ckhxNcZH2oMgTCz32F2uqNwaoUXFjQG", magicEden: "degenerate_ape_academy" },
];

module.exports = { getPrices };
