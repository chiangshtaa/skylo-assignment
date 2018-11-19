const axios = require('axios');

export const getData = (start, end) => {
  return dispatch => {
    return axios.get('/skyloData', {
      params: {
        start: start,
        end: end
      }
    })
    .then((res) => {
      console.log('response', res.data.devices['dd7295fa-6c65-484d-b38d-30df3bc31c0c']);
      let dataStream = res.data.devices['dd7295fa-6c65-484d-b38d-30df3bc31c0c'];
      dispatch(getDataSuccess(dataStream));
      return dataStream;
    })
    .catch((err) => console.log(err));
  }
}

export const changeTime = (index) => {
  return dispatch => {
    return dispatch(updateTime(index))
  }
}


const getDataSuccess = data => ({
  type: 'GET_DATA_SUCCESS',
  payload: data,
  current: data[0]
})

const updateTime = (index) => ({
  type: 'UPDATE_TIME',
  payload: index
})




// export const getData = (data) => ({
//   type: 'GET_DATA',
//   data: data
// });

// export const setVisibilityFilter = filter => ({
//   type: 'SET_VISIBILITY_FILTER',
//   filter
// })

// export const toggleTodo = id => ({
//   type: 'TOGGLE_TODO',
//   id
// })

// export const VisibilityFilters = {
//   SHOW_ALL: 'SHOW_ALL',
//   SHOW_COMPLETED: 'SHOW_COMPLETED',
//   SHOW_ACTIVE: 'SHOW_ACTIVE'
// }