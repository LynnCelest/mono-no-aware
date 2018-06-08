import { dispatch } from 'redux';

/**
 * ACTION TYPES
 */
let SET_GENDER = 'SET_GENDER'

 /**
  * ACTION CREATORS
  */

let setGender = (gender) => {
    const action = {type: SET_GENDER, gender}
}

/**
 * BOUND ACTION CREATORS
 */

const boundSetGender = (gender) => dispatch(setGender(gender))


const initState = {
    gender: '',
    image: '',
    pron1: '',
    pron2: '',
    pronPoss1: '',
    pronPoss2: '',
    name: '',
    title: ''
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case (SET_GENDER):
            switch (action.gender) {
                case ('F'):

                        return Object.assign({}, state, {gender: 'female',
                        image: '',
                        pron1: 'she',
                        pron2: 'her',
                        pronPoss1: 'her',
                        pronPoss2: 'hers',
                        title: 'milady'});


                case ('M'):

                        return Object.assign({}, state, {gender: 'male',
                        image: '',
                        pron1: 'he',
                        pron2: 'him',
                        pronPoss1: 'his',
                        pronPoss2: 'his',
                        title: 'milord'});
                case ('NB'):
                        return Object.assign({}, state, {gender: 'nonbinary',
                        image: '',
                        pron1: 'they',
                        pron2: 'them',
                        pronPoss1: 'their',
                        pronPoss2: 'theirs',
                        title: 'my friend',
                        name: 'Setsuna'
                    });
                default:
                    return state;
                    }
            default: return state;

            }
    }


export default reducer
