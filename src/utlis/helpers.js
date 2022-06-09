import { randomNumber } from './randomNumber'

export const hitPlayer = (state) => {
    const random = randomNumber()

    if (random > state) {
        return (state = 0)
    }
    return state - random
}
