const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const _ = require('lodash');

server.use(middlewares);

server.get('/compare', (req, res) => {
  const { rev1, rev2 } = req.query;
  const data = router.db.get('revisions').value();

  const oldRev = _.find(data, { revisao: rev1 });
  const newRev = _.find(data, { revisao: rev2 });

  if (oldRev && newRev) {
    res.json({ old_rev: oldRev, new_rev: newRev });
  } else {
    res.status(404).send('Revisions not found');
  }
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
