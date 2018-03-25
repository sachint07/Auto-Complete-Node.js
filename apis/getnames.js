"use strict";
const express = require("express");
const Router = express.Router();
const replyFunc = require("../utils/replyFunction");
const R = require("../models/dbWrapper").getDB();

Router.get("/get/:searchedTerm", (request, reply) => {

    let { searchedTerm } = request.params;

    fetchNames(searchedTerm, (errorfetchNames, responsefetchNames) => {
        if (errorfetchNames) {
            return replyFunc.replyFunction(204, errorfetchNames, reply);
        } else {
            return replyFunc.replyFunction(200, responsefetchNames, reply);
        }
    })
})


function fetchNames(searchedTerm, callbackFetchNames) {

    R.db.redis.zrank("names-Females-A", searchedTerm).then((resultsRank) => {
        console.log(`-- > ${resultsRank}`);
        if(resultsRank==null){
            return callbackFetchNames("error", null);
        }
        let count = resultsRank + 50;
        R.db.redis.zrange("names-Females-A", resultsRank, count)
            .then((resultsRange) => {
                return callbackFetchNames(null, resultsRange)
            })
    }).catch((e) => {
        return callbackFetchNames(e, null);
    })
}

module.exports = Router;