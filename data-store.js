var _ = require('lodash-node');
var existingUsers = require('./existing-users');
var existingTips = require('./tips');


var dataStore = {};

var services = ["Health", "Education", "Agriculture"];
var users = existingUsers.concat([]);
var tips = _.merge({}, existingTips);

dataStore.addUser = function(user){
	users.push(user);
}

dataStore.getUsers = function(service){
	return users;
}

dataStore.addUserToService = function(service, phoneNumber){
	console.log('addUserToService called  ' + service + "    " + phoneNumber);
	var user = _.find(users, function(user) {
	  return user.phoneNumber === phoneNumber;
	});
	if(user){
		user[service] = true;
	} else {
		var newUser = {};
		newUser["phoneNumber"] = phoneNumber;
		newUser[service] = true;
		users.push(newUser);
		console.log('new user created + ' + phoneNumber);
	}

}

dataStore.getUsersForService = function(service){
	return _.filter(users, function(user) {
  		return user[service] === true;
	});
}

dataStore.getServices = function(){
	return services;
}

dataStore.addService = function(service){
	services.push(service);
}

dataStore.serviceExists = function(service){
	return _.any(services, function(s) {
	  	return s.toLowerCase().trim() == service.toLowerCase().trim();
	});
}

dataStore.getTips = function(){
	return tips;
}

dataStore.addTip = function(key, msg, service){
	tips[key] = {
		"service": service,
		"msg": msg
	};
}

dataStore.tipExists = function(tip){
	return _.any(tips, function(v, k) {
	  	return k.toLowerCase().trim() == tip.toLowerCase().trim();
	});
	// return !_.isUndefined(tips[tip]);
}

module.exports = dataStore;
