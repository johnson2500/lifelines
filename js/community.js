// After document loads do this
$(document).ready(function () {
	'use strict';
	
	
	//==================================================
	//==== Vars ========================================
	//==================================================
	

	var communityPost = new Encouragement();
	
	//==================================================
	//==== Dom Munipulation ============================
	//==================================================
	
	function createCommunityPost(comPost){
		// creat elements to append to the Comment section 
		var wrapper = document.createElement("div");
		var communityPostContent = document.createElement("div");
		var innerPad = document.createElement("p");
		var author = document.createElement("h7");
		var specifiers = document.createElement("p");
		
		// add classes to elements
		wrapper.className = "row";
		innerPad.className = "small-1 column";
		communityPostContent.className = "small-11 columns";
		
		// add unique id
		communityPostContent.id = comPost.recordID;
		
		// add content for the actual life line
		author.textContent = comPost.content;
		specifiers.textContent = comPost.ownerUniqueID + " / Votes: [Pos: " + comPost.posVotes + ",Neg " + comPost.negVotes +  "]";

		communityPostContent.appendChild(author);
		communityPostContent.appendChild(specifiers);
		
		wrapper.appendChild(innerPad);
		wrapper.appendChild(communityPostContent);
		
		// add event listner
		communityPostContent.addEventListener("click",function(){alert(comPost.recordID)})
		
		if(communityPostContent.responseFlag === 0){
		$("#encCommentSec").append(wrapper);
		} else {
		$("#encCommentSec").append(wrapper);
		}
	}
	
	function postCommunity(communityPost) {
		for(var i = 0; i< communityPost.length;i++) {
			createCommunityPost(communityPost[i]);
		}
	}
	
	
	//==================================================
	//==== Icloud ======================================
	//==================================================
	
	
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
		var queryLifeLines = { recordType: 'Encouragement' };
		var itemArray = [];
		
		publicDB.performQuery(queryLifeLines)
			.then(function(response) {
				if(response.hasErrors) {
					console.error("this is an error",response.errors[0]);
					return;
				}
			var records = response._results;
			var numberOfRecords = records.length;
		
			if (numberOfRecords === 0) {
				console.error('No matching items');
				return;
			} else {
				records.forEach(function(item){
					var x = new Encouragement();
					x.constructor(item)
					itemArray.push(x)
				})
				postCommunity(itemArray)
			}
		});
		
}
	
	//==================================================
	//==================================================
	//==================================================
	
	$("#loadMoreButton").click(function () {
		//console.log("im here")
		var i;
		for (i = 0; i < 20; i++) {
			$("#encCommentSec").append(
				"<h7>Fake Data -- </h7><p>" + "hey" + "</p>"
			);
			//console.log("in Loop");
		}
	});
	
	$("#sendEncButton").click(function () {
		var content = $("#CommunityText").val();
		//console.log(content)
		if (content != ""){
			communityPost.content = content;
			communityPost.ownerUniqueID = activeUser.uniqueID;
			communityPost.date = new Date().valueOf();
			$.post(
				'../PHP/community.php',
				{
					recordID : communityPost.date, 
					date: communityPost.date, 
					ownerUniqueID: communityPost.ownerUniqueID, 
					content: 	communityPost.content,
					active: communityPost.active, 
					posVotes: communityPost.posVotes, 
					negVotes:communityPost.negVotes
				},
				function () {
					//console.log(communityPost);
					$("#encCommentSec").prepend(
						"<div id = \"" + communityPost.recordID +"\"class = \"row\"><div class=\"small-1 columns comments\"><p></p></div><div class =\"small-11 columns\"><h7>" + communityPost.content + "</h7><p>" + communityPost.ownerUniqueID + " / Votes: [Pos: " + communityPost.posVotes + ",Neg " + communityPost.negVotes +  "]</p></div>");
					$("#CommunityText").val("");
				}
			);
		} else {
			alert("Message has no content!");
		}
	});

	initICloud()
	queryIcloud()
	
});



/*
$.post(
		'../PHP/community.php',
		function (msg) {
			postCommunity(JSON.parse(msg));
		})


*/