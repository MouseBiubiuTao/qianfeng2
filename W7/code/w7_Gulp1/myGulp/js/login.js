const express = require('express');
const db = require('../db')

const router = express.Router();
module.exports = router;

router.get('/', async (req, res) => {
    const {
        username,
        password,
        mdl
    } = req.query;

    const sql = `select id,username,regtime from user where username='${username}' and password='${password}'`

    const data = await db(sql);
    console.log(data);
    console.log(username);
    console.log(password);

    if (data.length > 0) {
        res.send({
            code: 200,
            data: data[0],
            message: 'success'
        })
    } else {
        res.send({
            code: 400,
            data: [],
            message: 'fail'
        })
    }
})