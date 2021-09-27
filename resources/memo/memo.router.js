import {Router} from 'express';
import fs from 'fs';
import fsPromise from 'fs.promises';
import express from 'express';

let memoList = [];
const router = Router();
const app = express();

const jsonFile = fs.readFileSync('./storeddata.txt', "utf-8",(err, data) => {
    if (err) throw err;
    let jsonData = app.json(data);
    return jsonData;
});


router.post("/", (req, res) => {
    const memo = {
        id: new Date().getTime(),
        message: req.body.message
    };
    memoList.push(memo);

    const storedData = JSON.stringify(memoList);

    console.log(storedData);

    fs.writeFile("./storeddata.txt", storedData, "utf-8", function(err){
        if (err) return console.log(err);
        console.log('got it!');
    });

    res.send({
        message: "created"
    });
});

router.get("/", (req, res) => {

    res.send({
        message: JSON.parse(jsonFile)
    })
});

router.get("/:id", (req, res) => {
    console.log(req.params);
    const memo = JSON.parse(jsonFile).find((memo) => {
        return memo.id == req.params.id
    })

    res.send({
        memo: memo
    })
});

router.put("/:id", (req, res) => {
    const memo = memoList.find((memo) => {
        return memo.id == req.params.id
    })

    memo.message = req.body.message;

    res.send({
        message: "updated"
    })
});

router.delete("/:id", (req, res) => {
    const index = memoList.findIndex( (memo) => {
        return memo.id == req.params.id
    })

    memoList.splice(index, 1);

    res.send({
        message: "deleted"
    })
});

export default router;