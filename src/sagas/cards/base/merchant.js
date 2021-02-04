import { put, takeEvery, select } from "redux-saga/effects";
import { drawCards, gainActions, playAction } from "../../../actions";
import { gamePlayerIdsSelector, gamePlayerSelector } from "../../../selectors";

// http://wiki.dominionstrategy.com/index.php/Merchant
// If you play a merchant after playing a silver, you do not get
// a bonus for the earlier silver, or a later silver.
export function* asyncPlayMerchant() {
  console.log("wutwut");
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);
  console.log("Plaed a merchant");

  yield put(
    playAction({
      cardName: "Merchant",
      id: player.id,
      logIds: playerIds,
      username: player.username
    })
  );
  yield put(drawCards({ drawAmount: 1, id: player.id }));
  yield put(gainActions({ actionAmount: 1, id: player.id }));
}

const merchantSagas = [takeEvery("ASYNC_PLAY_MERCHANT", asyncPlayMerchant)];

export default merchantSagas;
// To implement this let's add a mutator that modifies
// the state by indicating the amount of bonus you will
// get for playing your next silver.
// That amount could get modified by the throne room.
// Then when you play your next silver we always mutate
// that value back to null.

// This is currenlty implemented by checking the cards in play
// when a silver is palyed. If a merchant was played earlier it puts gainFloatingGOldAmmount : 1
