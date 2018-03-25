const fs = require("fs");
const async = require("async");
const _ = require("lodash");
const Redis = require("ioredis");
let RedisClient = new Redis();
filename = process.argv[2];

fs.readFile(filename, 'utf8', function (err, data) {
    if (err) throw err;
    let here = data.split("\n");
    //console.log(here);
    async.eachLimit(here,1,(item,cb)=>{
        console.log(item);
        let item2= item.split('');
        updateinRedis(item2,(err,res)=>{
            if(err){
                cb(null);
            }else{
                console.log(res);
                cb(null);
            }
        })
    })
});

function updateinRedis(thisArray,callBackMain) {
        console.log(thisArray);
        let newKey="";
        async.eachLimit(thisArray,1,(key,cb2)=>{
            newKey = newKey.concat(key);
            console.log(`--->   ${newKey}`);
            RedisClient
            .multi()
            .zadd("names-Females-A", 0, newKey)
            .exec((res) => {
                cb2(null);
            });
        },(done)=>{
            callBackMain(null, "done");
        })
}