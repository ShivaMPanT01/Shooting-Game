import './App.css'
import React, { useEffect, useReducer } from 'react'
import {
    PLAYER_1_HEALTH,
    PLAYER_2_HEALTH,
    RESET_GAME,
    START_GAME,
    PLAYER_1_WIN_COUNT,
    PLAYER_2_WIN_COUNT,
    NEXT_ROUND,
    SUCCESS_MSG,
    TOTAL_MATCHS,
    MAX_HEALTH,
} from './script/Constants'

import { hitPlayer } from './utlis/helpers'

const initialState = {
    [PLAYER_1_HEALTH]: MAX_HEALTH,
    [PLAYER_2_HEALTH]: MAX_HEALTH,
    [START_GAME]: false,
    [PLAYER_1_WIN_COUNT]: 0,
    [PLAYER_2_WIN_COUNT]: 0,
    [SUCCESS_MSG]: '',
}

const reducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case PLAYER_1_HEALTH:
            return {
                ...state,
                [PLAYER_1_HEALTH]: hitPlayer(state[PLAYER_1_HEALTH]),
            }
        case PLAYER_2_HEALTH:
            return {
                ...state,
                [PLAYER_2_HEALTH]: hitPlayer(state[PLAYER_2_HEALTH]),
            }
        case START_GAME:
            return {
                ...state,
                [START_GAME]: !state[START_GAME],
            }
        case RESET_GAME:
            return initialState

        case PLAYER_1_WIN_COUNT: {
            return {
                ...state,
                [PLAYER_1_WIN_COUNT]: state[PLAYER_1_WIN_COUNT] + 1,
            }
        }
        case PLAYER_2_WIN_COUNT: {
            return {
                ...state,
                [PLAYER_2_WIN_COUNT]: state[PLAYER_2_WIN_COUNT] + 1,
            }
        }
        case SUCCESS_MSG: {
            return {
                ...state,
                [SUCCESS_MSG]: payload,
            }
        }
        case NEXT_ROUND: {
            return {
                ...state,
                [PLAYER_1_HEALTH]: MAX_HEALTH,
                [PLAYER_2_HEALTH]: MAX_HEALTH,
            }
        }
        default:
            return state
    }
}
function App() {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        if (state.player_1_health === 0) {
            dispatch({ type: PLAYER_2_WIN_COUNT })
            dispatch({ type: SUCCESS_MSG, payload: 'Player 2 Won the Round' })
            return
        } else if (state.player_2_health === 0) {
            dispatch({ type: PLAYER_1_WIN_COUNT })
            dispatch({ type: SUCCESS_MSG, payload: 'Player 1 Won the Round' })
            return
        }
    }, [state.player_1_health, state.player_2_health])

    useEffect(() => {
        if (
            state.player_1_win_count + state.player_2_win_count ===
            TOTAL_MATCHS
        ) {
            if (state.player_1_win_count > state.player_2_win_count) {
                alert('Player 1 Won the Game')
                dispatch({ type: RESET_GAME })
            } else if (state.player_1_win_count < state.player_2_win_count) {
                alert('Player 2 Won the Game')
                dispatch({ type: RESET_GAME })
            }
        } else if (state.player_1_win_count === 3) {
            alert('Player 1 Won the Game')
            dispatch({ type: RESET_GAME })
        } else if (state.player_2_win_count === 3) {
            alert('Player 2 Won the Game')
            dispatch({ type: RESET_GAME })
        }
    }, [state.player_1_win_count, state.player_2_win_count])

    return (
        <div className="container">
            <div>
                <button
                    onClick={() => {
                        state.start_game
                            ? dispatch({ type: RESET_GAME })
                            : dispatch({ type: START_GAME })
                    }}
                >
                    {state.start_game ? 'click to reset' : 'Click to Start '}
                </button>
            </div>
            {state.start_game && (
                <>
                    <div className="player-container">
                        <div className="player">
                            <h3>Player 1 Health : {state[PLAYER_1_HEALTH]}</h3>
                            <button
                                disabled={
                                    state[PLAYER_2_HEALTH] === 0 ||
                                    state[PLAYER_1_HEALTH] === 0
                                        ? true
                                        : false
                                }
                                onClick={() => {
                                    dispatch({
                                        type: PLAYER_2_HEALTH,
                                    })
                                }}
                            >
                                Click to Hit Player 2
                            </button>
                        </div>
                        <div className="player">
                            <h3>Player 2 Health : {state[PLAYER_2_HEALTH]}</h3>
                            <button
                                disabled={
                                    state[PLAYER_1_HEALTH] === 0 ||
                                    state[PLAYER_2_HEALTH] === 0
                                        ? true
                                        : false
                                }
                                onClick={() => {
                                    dispatch({
                                        type: PLAYER_1_HEALTH,
                                    })
                                }}
                            >
                                Click to Hit Player 1
                            </button>
                        </div>
                    </div>
                    {state[SUCCESS_MSG] && (
                        <p className="success-mssg">
                            <b> {state[SUCCESS_MSG]} </b>
                        </p>
                    )}
                    {
                        <div>
                            <div>
                                <button
                                    onClick={() => {
                                        dispatch({ type: NEXT_ROUND })
                                        dispatch({
                                            type: SUCCESS_MSG,
                                            payload: '',
                                        })
                                    }}
                                >
                                    Play Next Round
                                </button>
                                {/* {Winner} */}
                                <div>
                                    <h3>
                                        Player 1 - Won:{' '}
                                        {state[PLAYER_1_WIN_COUNT]}
                                    </h3>
                                    <h3>
                                        Player 2 - Won:{' '}
                                        {state[PLAYER_2_WIN_COUNT]}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    }
                </>
            )}
        </div>
    )
}

export default App
