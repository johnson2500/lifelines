'use strict';
$(document).ready(function () {
	// on load get data for user!!! 
	// Hard coded

	// sets field to correct infor according to user 
	$("#settingsUI").val(activeUser.userName);
	$("#settingsUI").prop("readonly", true);
	$("#settingsFN").val(activeUser.firstName);
	$("#settingsE").val(activeUser.email);
	$("#settingsLN").val(activeUser.lastName);
});