// let initial = {
//   range: [],
//   current: {
//     lat: 37.77,
//     long: -122.41
//   },
//   index: 0
// }

let initial = {
  index: 0
}

const updateTime = (state = initial, action) => {
  switch (action.type) {
    case 'UPDATE_TIME':
      // return {
      //   ...state,
      //   index: action.payload
      // }
      return {
        index: action.payload
      }
    default:
      return state
  }
}

export default updateTime;