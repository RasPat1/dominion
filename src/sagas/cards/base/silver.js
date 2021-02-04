import { countBy } from "lodash/countBy";
import { put, takeEvery, select } from "redux-saga/effects";
import { gainFloatingGold, playTreasure } from "../../../actions";
import { gamePlayerIdsSelector, gamePlayerSelector } from "../../../selectors";

export function* asyncPlaySilver() {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);
  console.log("[ASYNC SILVER] The silver was played", player.cards);
  if (
    player.cards.inplay.includes("Merchant") &&
    !player.cards.inplay.includes("Silver")
  ) {
    console.log("[CardPlayed] Merchant bonus applies");
    yield put(gainFloatingGold({ floatingGoldAmount: 1 }));
  }
  console.log("[Card Played]", player.cards);

  yield put(
    playTreasure({
      cardName: "Silver",
      id: player.id,
      logIds: playerIds,
      username: player.username
    })
  );
}

const silverSagas = [takeEvery("ASYNC_PLAY_SILVER", asyncPlaySilver)];

export default silverSagas;
