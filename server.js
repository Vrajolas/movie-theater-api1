const express = require('express');
const app = expres();
const { db } = require('./models/db');
const port = 3000;
const showRouter = require('./router/show-router');
const userRouter = require ('./router/user-router');

app.use(express.json());

app.use(showRouter);
app.use('/shows/:show', showRouter);
app.use(userRouter);
app.use('/users/:user', userRouter);


app.listen(port, () => {
  db.sync()
  console.log(`App listening on port ${port}`)
});