 
$(document).ready(function () {
	
	
	function postLifeLines(lifelines) {
		for(var i = 0; i< lifelines.length;i++) {
			createLifeLinePost(lifelines[i]);
		}
	}
	
	function createLifeLinePost(lifeLinePost){
		// creat elements to append to the Comment section 
		var wrapper = document.createElement("div");
		var lifeLinePostContent = document.createElement("div");
		var innerPad = document.createElement("p");
		var content = document.createElement("h7");
		var specifiers = document.createElement("p");
		
		// add classes to elements
		wrapper.className = "row";
		innerPad.className = "small-1 column";
		lifeLinePostContent.className = "small-11 columns";
		
		// add unique id
		lifeLinePostContent.id = lifeLinePost.recordID;
		
		// add content for the actual life line
		specifiers.textContent = lifeLinePost.ownerUniqueID + " / Votes: [Pos: " + lifeLinePost.posVotes + ",Neg " + lifeLinePost.negVotes +  "]";
	
		
		// add event listner
		//lifeLinePostContent.addEventListener("click",function(){alert("hey")})
		
		if(lifeLinePost.responseFlag === 0){
			content.textContent = lifeLinePost.content;
			lifeLinePostContent.appendChild(content);
			lifeLinePostContent.appendChild(specifiers);
			wrapper.appendChild(innerPad);
			wrapper.appendChild(lifeLinePostContent);	
			$("#friendsInNeedSec").append(wrapper);
		} else {
			content.textContent = lifeLinePost.response;
			lifeLinePostContent.appendChild(content);
			lifeLinePostContent.appendChild(specifiers);
			wrapper.appendChild(innerPad);
			wrapper.appendChild(lifeLinePostContent);	
			$("#responseSec").append(wrapper);
		}
		lifeLinePostContent.addEventListener("click",function(){
			createLifeLinePopUp(lifeLinePost)
		});
	}
	
	function createLifeLinePopUp(postObject){
		console.log(postObject)
		var posVote = document.createElement("button");
		var negVote = document.createElement("button");
		var cancel = document.createElement("button");
		var pop = document.getElementById("lifeLinesPopUp");
		
		pop.className = "popup center"
		pop.innerHTML = "<p class='center'><strong>Cast Vote</strong></p>"  +postObject.content;
		
		cancel.id = "cancelButtonLife";
		posVote.id = "posVoteLife";
		negVote.id = "negVoteLife";
		
		posVote.innerHTML = "Thumbs Up";
		negVote.innerHTML = "Thumbs Down";
		cancel.innerHTML = "<strong>Cancel</strong>";
		
		cancel.className = "button blue-text responseButtons";
		negVote.className = "button blue-text responseButtons";
		posVote.className = "button blue-text responseButtons";		
		
		pop.appendChild(posVote);
		pop.appendChild(negVote);
		pop.appendChild(cancel);
		
		$("#posVoteLife").click(function(){
			console.log("pos");
			// send positive vote
		});
		
		$("#negVoteLife").click(function(){
			console.log("neg");
			// send negative vote
		});
		
		$("#cancelButtonLife").click(function(){
			$("#lifeLinesPopUp").hide();
			console.log("test")
		});
		$("#lifeLinesPopUp").show();
	console.log("test")
			
	}
	
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
        fieldName: 'sendTo',
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
			
			if (numberOfRecords === 0) {
				console.error('No matching items');
				return;
			} else {
				records.forEach(function(item){
					var x = new Lifeline();
					x.constructor(item)
					itemArray.push(x)
				})
				postLifeLines(itemArray)
			}
		});
		
}
	
	initICloud();
	queryIcloud();
	
	
									
	
});


//	$.post(
//		'../PHP/lifeline.php',
//		{activeUser : activeUser },
//		function (msg) {
//			postLifeLines(JSON.parse(msg));
//		}
//	);