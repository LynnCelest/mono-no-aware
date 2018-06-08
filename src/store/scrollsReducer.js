const UNFINISHED = 'unfinished'

const initState = {
    scroll1: {
        length: 3,
        state: UNFINISHED,
        //don't forget to rename these with more reasonable names, probably having to do with the monster
        pieces: ['scroll1_part1', 'scroll1_part2', 'scroll1_part3']
    },
    scroll2: {
        length: 4,
        //this is the initial state; it will move
        state: UNFINISHED,
    },
    scroll3:  {
        length: 3,
        state: UNFINISHED
    }
}

/**
 * ACTIONS
 */

const COLLECT_SCROLL = 'COLLECT_SCROLL'
const BIND_SCROLL = 'BIND_SCROLL'
const FINISH_SCROLL = 'FINISH_SCROLL'
const READ_SCROLL = 'READ_SCROLL'

/**
 * ACTION CREATORS
 */

let collectScroll = (scroll) => {
    const action = {type: COLLECT_SCROLL, scroll}
    return action;
}
let bindScroll = (scrollPage) => {
    const action = {type: BIND_SCROLL, scrollPage}
    return action;
}
let finishScroll = (scroll) => {
    const action = {type: FINISH_SCROLL, scroll}
    return action
}
let readScroll = (scroll) => {
    const action = {type: READ_SCROLL, scroll}
    return action;
}


//as soon as you collect the scroll, it chooses randomly from a list of the possible remaining scrolls, then removes the item from the list

export const chooseScroll = () => {

}

const error = {message: 'You have to have more than one of the same scroll to bind them together!'}

export const bindScroll = (scroll) => {
    switch (scroll.name) {
        case scroll1:
            //set scroll1.state
            //d
            break;
        case scroll2:
            //set scroll2.state
        case scroll3:
            //set scroll3.state


        default:
            return error;
    }
}

export const readScroll = () => {

}


const reducer = (state = initState, action) => {
    switch (action.type) {
        case (COLLECT_SCROLL):
        //check to see if you already have a piece of the same scroll in your inventory
        //if so, invite the user to bind them together
        break;
        case (BIND_SCROLL):
        //take the separate scrolls and then connect them
        //return the final connected scroll back to the user.
        //set the state of the scroll in question to the number of completed pages it now has
        break;
        default:
            return state
    }
}

export default reducer
