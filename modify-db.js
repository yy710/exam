const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
global.config = require('./config.js');

MongoClient.connect(global.config.dbUrl, { useUnifiedTopology: true }, function (err, client) {
  assert.equal(null, err);
  console.log('Connected successfully to mongodb server');

  const db = client.db('exam');
  const tag = '新迈腾&新迈腾GTE&车联网内部转训';

  db.collection('questions')
    .find()
    .toArray(function (err, res) {
      assert.equal(null, err);
      console.info('%d questions', res.length);

      res.forEach(q => {
        q.options = [{ A: q.A }, { B: q.B }, { C: q.C }, { D: q.D }];
        //q.answer = answer2index(q.answer);
        q.answer = [q.answer];
        delete q.A, q.B, q.C, q.D;

        db.collection('questions').replaceOne({ _id: q._id}, q);
      });

      //client.close();
    });
});

function answer2index(answer) {
  switch (answer) {
    case 'A':
      return 0;
    case 'B':
      return 1;
    case 'C':
      return 2;
    case 'D':
      return 3;
    default:
      break;
  }
}
