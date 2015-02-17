var Db = require('mongodb').Db,
Connection = require('mongodb').Connection,
Server = require('mongodb').Server,
BSON = require('mongodb').BSON,
ObjectID = require('mongodb').ObjectID;

DB = function(host, port) {
    this.server = new Server(host, port, { auto_reconnect: true });
    this.db = new Db('nodejstr-blog', this.server);
    this.db.open(function(err, db) {
        if(!err) {
            console.log("DB is ready for dogfight at port " + port);
        }
    });
};

DB.prototype.getCollection = function(callback) {
    this.db.collection('projectDoc', function(error, collection) {
        if(error)
            callback(error);
        else
            callback(null, collection);
    });
};

DB.prototype.findAll = function(callback) {
    this.getCollection(function(error, collection) {
        if(error)
            callback(error)
        else {
            collection.find().toArray(function(error, results) {
                if(error)
                    callback(error)
                else
                    callback(null, results)
                db.
            });
        }
    });
};

DB.prototype.GetProjectList = function(callback) {
    this.getCollection(function(error, collection) {
        if(error)
            callback(error)
        else {
            collection.find().toArray(function(error, results) {
                if(error)
                    callback(error)
                else
                    callback(null, results)
            });
        }
    });
};

DB.prototype.findById = function(id, callback) {
    this.getCollection(function(error, collection) {
        if(error)
            callback(error)
        else {
            collection.findOne({
                id: collection.db.bson_serializer.ObjectID.createFromHexString(id)
            }, function(error, result) {
                if(error)
                    callback(error)
                else
                    callback(null, result)
            });
        }
    });
};

DB.prototype.save = function(recs, callback) {
    this.getCollection(function(error, collection) {
        if(error)
            callback(error);
        else {
            if(typeof (recs.length) == "undefined")
                recs = [recs];
            for(var i = 0; i < recs.length; i++) {
                post = recs[i];
                post.id = new ObjectID();
                if(post.created_at === undefined)
                    post.created_at = new Date();
            }
            collection.insert(recs, function() {
                callback(null, recs);
            });
        }
    });
};

exports.DB = DB;