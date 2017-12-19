var express = require('express');
var router = express.Router();
var Twit = require('twit');
var T = new Twit({
    consumer_key: '7wtf0CsmZRfVxMxlLjd0Y2RtF',
    consumer_secret: 'zw4LuVJVOBVB3Mdf7xHbKdpdE90PyrF4EfQLGrRhTmEEWQh7Rx',
    access_token: '725330955372621824-yHbHxGM3ztAbqkCM4uiIPHjwFiK6nBM',
    access_token_secret: 'TBjhEW7CPzGeu6d5i098L4sWlqlJnNSTGKBP303W271QA',
    timeout_ms: 60*1000
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/message', function (req, res, next) {

    var to = req.body.to;
    var from = req.body.from;
    var type = req.body.type;
    var message = req.body.message;

    if(type == "printer"){
        var SerialPort = require('serialport');
        var port = new SerialPort('/dev/ttyACM0',{
            baudrate: 9600,
            parser: SerialPort.parsers.readline('\n')
        });

        port.on('open', function() {
            port.write(from+','+to+','+message, function(err) {
                if (err) {
                    return console.log('Error on write: ', err.message);
                }
                console.log('데이터 전송완료\n');
            });
        });
      res.status(200).send('success');
    } else if(type == "twitter"){
        T.post('statuses/update', {status:message},
            function (err, data, response) {
                res.status(200).send(data);
            });
    }
});

router.get('/friends', function (req, res, next) {
    var data = {
        data: [
            {
                name: '김민기',
                id: 12345
            },
            {
                name: '김현동',
                id: 12340
            }
        ]
    };//넣을 데이터

    res.status(200).send(data);

});

router.get('/tweet/friends', function (req, res, next) {
    T.get('followers/list', {screen_name: 'tolga_tezel'},
        function (err, data, response) {
            console.log(data);
            res.status(200).send(data);
        });
});

router.post('/tweet', function (req, res, next) {
    console.log("Hello World");

    res.status(200).send("잘 나오고 있으니 안심해");
// /tweet 로 끝나면 나오는 결과
});

router.post('/tweet/upload', function (req, res, next) {
    var message = 'Hi, there';
    T.post('statuses/update', {status:message},
        function (err, data, response) {
            res.status(200).send(data);
        })
});

module.exports = router;
