const express = require('express');
const path = require('path');
var request = require('request');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/public')));

let options = {
  // url: url,
  method: 'GET',
  headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRqYXlAZm9yZC5jb20iLCJzeXN0ZW1Sb2xlIjoic3lzdGVtVXNlciIsImlhdCI6MTU0MTAwNzAzMiwiaXNzIjoiaHR0cDovL3dlYi1zZXJ2ZXJzLWRldi0xNDI1MzI1MDI4LnVzLXdlc3QtMi5lbGIuYW1hem9uYXdzLmNvbSIsInN1YiI6ImUyMmE2MjlkLWRlYTAtNDc0Yi04YzY5LTFlODQwYmZkMzRmYSIsImp0aSI6IjY0Nzk2YWIwLTlhYTItNGY3Ny04OTk4LWI1MzMzYzhlMmI5OCJ9.aIGEX_qigixaA17dcO0KNJay-R_704FDaugfkIAeVLA"
  }
}

console.log('here');
app.get('/skyloData', (req, res) => {
  console.log(req.query.start, req.query.end);
  const url = `http://alpha.skylo.io/api/devices/history/ids/dd7295fa-6c65-484d-b38d-30df3bc31c0c?since=${req.query.start}&until=${req.query.end}`;
  options.url = url;
  request(options, (error, response, body) => {
    if (error) {
      throw error;
    } else {
      // console.log('body', body);
      res.send(body);
    }
  })
})

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/client/public/index.html'));
// });


const port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log(`App listening on port ${port}`);
});








