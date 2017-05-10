$(document).ready(function () {
	'use strict';
	
	function addLifeLines(obj) {
		for (var i = 0;i<obj.length;i++){
			createLifeLineDom(obj[i]);
		}
		}
	
	$("#sendEnc").click(function () {
		if($("#encCommentText").val() != '') {
			var encouragement = new newLifeLineInst();
			var D = new Date().getTime();
			encouragement.content = $("#encCommentText").val();
			encouragement.ownerUniqueID = "eCollins"; 
			encouragement.date = D;
			encouragement.recordID = D;
			encouragement.sentTo = "rJohnson";
			$.post( 
				'../PHP/enc.php',
				{
					recordID : D, 
					date: D,
					ownerUniqueID: encouragement.ownerUniqueID,
					sentTo: encouragement.sentTo,
					content: encouragement.content,
					reponseFlag: 3,
					response: '',
					active: 1,
					posVotes: 0,
					negVotes: 0
				},
				function (msg) {console.log(msg)});
		} else { 
			alert("Message Has No Content")
	}
	});
	
	// function for creating actual DOM for Encoragment
	function createLifeLineDom(life){
		// creat elements to append to the Comment section 
		var wrapper = document.createElement("div");
		var lifeLineContent = document.createElement("div");
		var innerPad = document.createElement("p");
		var message = document.createElement("h7");
		var specifiers = document.createElement("p");
		
		// add classes to elements
		wrapper.className = "row";
		innerPad.className = "small-1 column";
		lifeLineContent.className = "small-11 columns";
		
		// add unique id
		lifeLineContent.id = life.recordID;
		
		// add content for the actual life line
		message.textContent = life.content;
		specifiers.textContent = life.sendTo + " on " + parseNSDate(life.date) + " @" + parseNSTime(life.date)

		lifeLineContent.appendChild(message);
		lifeLineContent.appendChild(specifiers);
		
		wrapper.appendChild(innerPad);
		wrapper.appendChild(lifeLineContent);
		
		// add event listner
		lifeLineContent.addEventListener("click",function(){alert("hey")})
		
		if(life.responseFlag === 0){
		$("#unansweredLifeLines").append(wrapper);
		} else {
		$("#answeredLifeLines").append(wrapper);
		}
	}
	
	
	//=== Icloud Functions =======================================
	
	function initICloud(){
		CloudKit.configure({
			containers: [{
				containerIdentifier: 'iCloud.com.gapfox.Lifelines',
				apiToken: '52aa61718d199c0cd3e2ad366d894063b053c2c20eec29a493efc1f620d2d198',
				environment: 'development'
			}]
		});
	}
		
	function queryIcloud(){		
    var container = CloudKit.getDefaultContainer();
		var publicDB = container.publicCloudDatabase;
		
		var query = {
			recordType: 'Lifelines',
			filterBy: [{
				comparator: 'EQUALS',
        fieldName: 'ownerUniqueID',
				fieldValue: {
					value: activeUser.uniqueID
				}
			}]
		}
		
		var itemArray = [];
		
		publicDB.performQuery(query)
			.then(function(response) {
				if(response.hasErrors) {
					console.error("this is an error",response.errors[0]);
					return;
				}
			
			var records = response._results;
			var numberOfRecords = records.length;
			console.log(response)
			if (numberOfRecords === 0) {
				console.error('No matching items');
				return;
			} else {
				records.forEach(function(item){
					var x = new Lifeline();
					x.constructor(item)
					itemArray.push(x)
				})
				addLifeLines(itemArray)
			}
		});
		
}
	
	//=== Icloud Functions =======================================
	
	
		
		initICloud();
		queryIcloud();
	
});

/*
$.post(
		"../PHP/enc.php",
		{ get: 'rJohnson'},
		function(encouragement){
			addLifeLines(JSON.parse(encouragement));
		});
*/