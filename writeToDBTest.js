//	function initICloud(){
//		CloudKit.configure({
//			containers: [{
//				containerIdentifier: 'iCloud.com.gapfox.Lifelines',
//				apiToken: '52aa61718d199c0cd3e2ad366d894063b053c2c20eec29a493efc1f620d2d198',
//				environment: 'development'
//			}]
//		});
//	}
//		
//	function queryIcloud(){		
//    var container = CloudKit.getDefaultContainer();
//		var publicDB = container.publicCloudDatabase;
//		var queryLifeLines = { recordType: 'Encouragement' };
//		var itemArray = [];
//		
//		publicDB.performQuery(queryLifeLines)
//			.then(function(response) {
//				if(response.hasErrors) {
//					console.error("this is an error",response.errors[0]);
//					return;
//				}
//			
//			var records = response._results;
//			var numberOfRecords = records.length;
//		
//			if (numberOfRecords === 0) {
//				console.error('No matching items');
//				return;
//			} else {
//				records.forEach(function(item){
//					var x = new Encouragement();
//					x.constructor(item)
//					itemArray.push(x)
//				})
//				postCommunity(itemArray)
//			}
//		});
//		
//}
//
//	function writeToDBTest(){
//		var db = "RyansRecType";
//		
//    var container = CloudKit.getDefaultContainer();
//		var publicDB = container.publicCloudDatabase;
//		
//		var record = {
//			recordName: "test",
//			recordType: 'test',
//			fields: {
//				title: {
//					value: 'MacKerricher State Park'
//        },
//				address: {
//					value: 'Fort Bragg, CA'
//				}
//			}
//		};
//		console.log(publicDB)
//
//		publicDB.saveRecords(record).then(function(response) {
//    if (response.hasErrors) {
//        var ckError = response.errors[0];
//        // Insert error handling or throw the error and handle it using catch() later
//        throw ckError;
//    } else {
//        // Insert successfully saved record code
//        var record = response.records[0];
//    }
//});
//		
//	}
//
//
//initICloud();
//
//writeToDBTest();
//
///* 
//
//var record = {
//    recordType: 'List',
//    recordName: TheRecordIWannaUpdate,
//    recordChangeTag: TheRecordTag,
//    fields: {
//      TheFieldToUpdate: {
//        value: 42
//      }
//    }
//};
//The Save Policy does not work for me, but you can add it.
//
//var options = {  
//      zoneName: undefined,
//      operationType : 'forceUpdate'
//  };
//
//container.publicCloudDatabase.saveRecord(record,options)
//    .then(function(response) {
//    if(response.hasErrors) {
//        console.log(response.errors[0]);
//    } else {
//        console.log("It's working");
//    }
// });
//
//*/
