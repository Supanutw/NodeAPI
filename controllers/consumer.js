"use strict";
const config = require('../config.js');

var kafka = require("kafka-node");
var Consumer = kafka.Consumer;
var Offset = kafka.Offset;
var Client = kafka.KafkaClient;
var argv = require("optimist").argv;
var topic = argv.topic;
var p = argv.p || 0;
var a = argv.a || 0;
var client = new Client({
  kafkaHost: config.kafkahost,
});


var topics = []
const _Topic = require("../Topic_Consumer.json");
const {
  connection
} = require("mongoose");
_Topic.forEach(Element => {
  if (_Topic.length > 0) {
    topics.push({
      topic: Element.Topic,
      partition: p
    })
  }
});



// var topics = [{
//     topic: 'IceTopic5',
//     partition: p,
//   },
//   {
//     topic: 'IceTopic',
//     partition: p,
//   },
// ];
var options = {
  autoCommit: true,
  fetchMaxWaitMs: 1000,
  fetchMaxBytes: 1024 * 1024,
};

var consumer = new Consumer(client, topics, options);
var offset = new Offset(client);

consumer.on("message", function (message) {
  console.log(message.value);
  console.log(message);
});

consumer.on("error", function (err) {
  console.log("error", err);
});

/*
 * If consumer get `offsetOutOfRange` event, fetch data from the smallest(oldest) offset
 */
consumer.on("offsetOutOfRange", function (topic) {
  topic.maxNum = 2;
  offset.fetch([topic], function (err, offsets) {
    if (err) {
      return console.error(err);
    }
    var min = Math.min.apply(null, offsets[topic.topic][topic.partition]);
    consumer.setOffset(topic.topic, topic.partition, min);
  });
});