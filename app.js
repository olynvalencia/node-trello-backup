(function(){
	'use strict';
	
	var Trello = require("node-trello");
	var _ = require("underscore");
	var fs = require("fs");
	var path = require("path");
	
	var apiKey = process.argv[2];
	var token = process.argv[3];
	
	var t = new Trello(apiKey, token);
	
	var curDate = new Date();
	var dateString = getDateString(curDate);
	var dir = path.join(__dirname, "exports", dateString);
	
	t.get("/1/members/me/boards", function(error, data) {
		if (error) throw error;
		
		_.each(data, function(board, boardIdx) {
			exportBoardToJSON(board);
		});
	});

	function exportBoardToJSON(board) {
		t.get("/1/boards/" + board.id, {
			actions: "all",
			actions_limit: "1000",
			cards: "all", 
			lists: "all",
			members: "all",
			member_fields: "all",
			checklists: "all",
			fields: "all"
		}, function(error, data) {
			if (error) throw error;
			
			createExportFile(board.name, JSON.stringify(data));
		});
	}
	
	function createExportFile(boardName, jsonExportString) {
		var filename = boardName.replace(/[/\s]/g, "_") + ".json";
		var filepath = path.join(dir, filename);
		console.log(filepath);
		fs.mkdir(dir, function(error) {
			if (error && error.code != "EEXIST") throw error;
			
			fs.writeFile(filepath, jsonExportString, function(error) {
				if (error) throw error;
				console.log("File saved: " + filepath);
			});	
		});
	}
	
	function getDateString(dateIn) {
		var dd = dateIn.getDate(),
			mm = dateIn.getMonth() + 1,
			yyyy = dateIn.getFullYear();
			
		return yyyy.toString() + mm.toString() + dd.toString();
	}
})();