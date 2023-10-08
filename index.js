const express = require('express');
const cors = require('cors');

const app = express();
const { PORT = 3030, BG_COLOR = 'white' } = process.env;
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
  <html>
    <body style="background-color: ${BG_COLOR}">
      <pre>Hello World</pre>
    </body>
  </html>
  `);
});

app.get('/api/v1/employees', (req, res) => {
  res.json([
    {
      name: 'Vincent Llauderes',
      occupation: 'Software Engineer',
    },
    {
      name: 'Apple Ortega Pangantihon',
      occupation: 'Marketing',
    },
  ]);
});

app.listen(PORT, () => {
  console.log(`App is listening on http//:localhost${PORT}`);
});
