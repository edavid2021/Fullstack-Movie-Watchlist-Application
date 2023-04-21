var config ={};
config.app = {};
config.server = {};
config.db = {};

config.server.port = 5678;

config.db.host = 'studentdb.4dvz4nf.mongodb.net'
config.db.port = 80;
config.db.user ='admin';
config.db.password = 'admin';
config.db.name = 'Studentdb';
config.db.collection = 'Students';
module.exports = config;
