const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const fs = require('fs');
// const iconv = require('iconv-lite');
global.config = require('./config.js');

const fileName = '2020年大众品牌车联网激活第二次考试';
//const str = ``;

const optionsRegex = execRegex(/^\s*([A-Z])、\s*([^,]+)/gmu)(m => { return { op: m[1], value: m[2] }; });

const getDB = execRegex(/^\d{1,50},+\n\s*(.+(\d).+)\n((,+\n\s*[A-Z]、\s*.+\n)+),+\n.+\n.+\n\s*"?标准答案：(.+)\n/gmu)(m => {
  const answers = answerRegex(m[5]);
  const options = optionsRegex(m[3]).map((option, index) => {
    return { option: option.value, correct: answers.includes(option.op) };
  });
  const type = answers.length > 1 ? 3 : 2;
  console.info(options);

  return { tag: fileName, title: titleRegex(m[1]), type, score: parseInt(m[2]), options };
});

MongoClient.connect(global.config.dbUrl, { useUnifiedTopology: true }, function (error, client) {
  assert.equal(null, error);
  console.log('Connected successfully to mongodb server');
  const db = client.db('exam');

  fs.readFile(`./${fileName}.csv`, 'utf-8', function (err, data) {
    assert.equal(null, err);
    const docs = getDB(data);
    // console.info(docs);
    // client.close();
    // return 0;
    const colName = 'yz_questions';
    const qsAmount = docs.length;
    const score = docs.reduce((a, c) => {
      return { score: a.score + c.score };
    });
    //console.log(score);
    //return 0;
    
    db.collection('exams_list').insertOne({ name: fileName, colName, ...score, qsAmount }, function (err, r) {
      assert.equal(null, err);
      assert.equal(1, r.insertedCount);
      console.log('register for exams_list success!');

      db.collection(colName).insertMany(docs, function (err, r) {
        assert.equal(null, err);
        console.log('insert %d questions', r.insertedCount);
        client.close();
      });
    });
  });
});

function removeComma(str) {
  return str.replace(/,|"/g, ''); //取消字符串中出现的所有逗号
}

function answerRegex(str) {
  // const letter2num = new Map([['A', 0],['B', 1],['C', 2],['D', 3],['E', 4],['F', 5],['G', 6],['H', 7],['I', 8],['J', 9],['K', 10],['L', 11],['M', 12],['N', 13],['O', 14],['P', 15]]);
  const s = removeComma(str);
  return Array.from(s);
  //return Array.from(s).map(s => letter2num.get(s));
}

function titleRegex(str) {
  return removeComma(str);
}

function execRegex(regex) {
  return function (f = x => x) {
    return function (str) {
      const docs = [];
      let m;
      while ((m = regex.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
          regex.lastIndex++;
        }
        // The result can be accessed through the `m`-variable.
        // m.forEach((match, groupIndex) => {
        //   console.log(`Found match, group ${groupIndex}: ${match}`);
        // });
        docs.push(f(m));
      }
      return docs;
    };
  };
}
