// "use strict";
const config = require('../config.js');
const model = require("../models/producer.model");

// method post producer
exports.producer = (req, res) => {

  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const _model = new model(req.body);
  if (_model.Topic == "") {
    return res.status(400).send({
      message: "Topic can not be empty!",
    });
  }

  // Producer Kafka ###########################
  var kafka = require("kafka-node");
  var Producer = kafka.Producer;
  var KeyedMessage = kafka.KeyedMessage;
  var Client = kafka.KafkaClient;
  // var client = new Client("10.7.55.55");
  var client = new Client({
    kafkaHost: config.kafkahost,
  });
  var argv = require("optimist").argv;
  var topic = argv.topic || _model.Topic;
  var p = argv.p || 0;
  var a = argv.a || 0;
  var producer = new Producer(client, {
    requireAcks: 1,
  });

  // console.log(_model)
  producer.on("ready", function () {
    var message = _model.Message;
    var keyedMessage = new KeyedMessage(_model.Events, _model.Message);
    producer.send(
      [{
        topic: _model.Topic,
        partition: p,
        messages: [keyedMessage],
        attributes: a,
      }, ],
      function (err, result) {
        console.log(err || result);
        res.json(_model);
        // process.exit();
      }
    );
  });

  producer.on("error", function (err) {
    console.log("error", err);
  });

  // console.log(req)
};