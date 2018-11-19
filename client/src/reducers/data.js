let initial = {
  range: [
    {
      lat: 37.77,
      lng: -122.41
    }
  ],
  current: {
    lat: 37.77,
    long: -122.41
  }
}


const data = (state = initial, action) => {
  switch (action.type) {
    case 'GET_DATA_SUCCESS':
      return {
        ...state,
        range: action.payload,
        current: action.current
      }
      // return {
      //   range: action.payload,
      //   current: action.current
      // }
    default:
      return state
  }
}

export default data;

// {
//     ...state,
//     nestedState
//   }