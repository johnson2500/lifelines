
'use strict'
//=== Real Classes ======================================

function Member(){
	this.dateJoined = 0;
	this.uniqueID = "";
	this.recordID = "";
	this.emailAddress = "";
	this.firstName = "";
	this.lastName = "";
	this.friendsList = "";
	this.setNewUser = function(memberObj){
		console.log(memberObj)
	}
}

function Lifeline(){
	this.active = 0;
	this.content = "";
	this.date = 0;
	this.negVotes = 0;
	this.posVotes = 0;
	this.ownerUniqueID = "";
	this.response = "";
	this.responseFlag = false;
	this.sendTo = "";
	this.recordID = "";
	
	this.constructor = function(obj){
		this.active = obj.fields.active.value;
		this.content = obj.fields.content.value;
		this.date = obj.fields.date.value;
		this.negVotes = obj.fields.negVotes.value;
		this.posVotes = 	obj.fields.posVotes.value;
		this.ownerUniqueID = obj.fields.ownerUniqueID.value;
		this.response = obj.fields.response.value;
		this.responseFlag = obj.fields.responseFlag.value;
		this.sendTo = obj.fields.sendTo.value;
		this.recordID = obj.recordName;
	}
}

function Encouragement(){
	this.active = 0;
	this.content = "";
	this.date = 0;
	this.negVotes = 0;
	this.posVotes = 0;
	this.ownerUniqueID = "";
	this.recordID = "";
	
	this.constructor = function(obj){
		this.active = obj.fields.active.value;
		this.content = obj.fields.content.value;
		this.date = obj.fields.date.value;
		this.negVotes = obj.fields.negVotes.value;
		this.posVotes = 	obj.fields.posVotes.value;
		this.ownerUniqueID = obj.fields.ownerUniqueID.value;
		this.recordID = obj.recordName;
		
	}
	
}

function QueryForIcloud(){
  this.query =  {
    recordType: "Lifelines",
    filterBy: [
      {
        comparator: "EQUALS",
        fieldValue: {
        	value: {
            recordName: "rjohnson",
          }
        }
      }
    ],
    sortBy: [
      {
        systemFieldName: "createdTimestamp",
        ascending: true
      }
    ]
  };
	this.setTable = function(databaseTable){
		this.recordType = databaseTable;
	};
	this.setDataBaseFilter = function(arr){
		this.filterBy = arr;
	}
}


Date.prototype.getDateString = function(){
		var month = this.getMonth() + 1;
		month = month.toString();
		var day = this.getDate().toString();
		var year = this.getFullYear().toString();
		if( month < 10){
			month = "0" + month;
		}
		
		if (parseInt(day)<10){
			day = "0" + day;
		}
		return month + "/" + day + "/" + year;
	}

Date.prototype.getDateTime = function(){
	var hours = this.getHours();
	var minutes = this.getMinutes();
	
	if ( minutes < 10 ){
		minutes = "0" + minutes;
	}
	
	if ( hours >= 12 ){
		hours = hours -12;
		minutes += " PM";
	} else {
		minutes += " AM";
	}
	return " " + hours + ":" + minutes;
}

function parseNSDate(date){
	return new Date(parseInt(date)).getDateString();
}

function parseNSTime(date){
	return new Date(parseInt(date)).getDateTime();
}


	

//=== Real Var ========================================

var activeUser = new Member();
activeUser.firstName = "Ryan";
activeUser.lastName = "Johnson";
activeUser.uniqueID = "ecollins";
activeUser.email = "johnson2500@live.com";

//=== Shares ==========================================







