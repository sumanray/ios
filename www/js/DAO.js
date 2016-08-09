
var insertCheckListNameDescription = function() {
    var r = $.Deferred();
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    
    var checkListName = $("#CheckListTextAreaName").val();
    var checkListDescription = $("#CheckListTextAreaDescription").val();
    var auditorName = localStorage.getItem("storedName");
    var auditorLOB = localStorage.getItem("storedLOB");
    var insertStatement = "Insert into picklist_table (picklist_name,picklist_description,cdatetime,favorite,auditor_name,auditor_lob) values ('"+escape(checkListName)+"','"+escape(checkListDescription)+"',"+  new Date().getTime()+ ",0,'"+auditorName+"','"+auditorLOB+"')";
    
    db.transaction(function(tx) {
                   tx.executeSql(insertStatement);
                   }, function(error) {
                   console.log('transaction error insert: ' + error.message);
                   }, function() {
                   console.log('transaction ok');
                   
                   });
    
    db.transaction(function(tx) {
                   tx.executeSql("select * from picklist_table ORDER BY id DESC LIMIT 1;", [], function(tx, res) {
                                 var len = res.rows.length;
                                 if(len>0)
                                 {
                                 for (var i = 0; i < len; i++)
                                 {
                                 checkListId = res.rows.item(i)['id'];
                                 
                                 }
                                 }
                                 });
                   });
    
    
    
    return r;
    
};

var updateMultipleChoiceQuestionParameters = function(checkListQuestion,questionPhotoVal,questionNotesVal,answerOne,answerTwo,answerThree,answerFour,answerFive,CAMCSelected){
    
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    
    var checkListName = $("#CheckListTextAreaName").val();
    var checkListDescription = $("#CheckListTextAreaDescription").val();
    
    var updateStatement = "Update question_table  set question ='"+ escape(checkListQuestion) +"', photo = '"+questionPhotoVal+"',notes = '"+questionNotesVal+"' where id = "+parseInt(questionIdSelected);
    
    
    db.transaction(function(tx) {
                   tx.executeSql(updateStatement);
                   }, function(error) {
                   console.log('transaction error insert: ' + error.message);
                   }, function() {
                   console.log('transaction ok');
                   
                   });
    
    
    var actualAnswer1 = "";
    var actualAnswer2 = "";
    var actualAnswer3 = "";
    var actualAnswer4 = "";
    var actualAnswer5 = "";
    
    if(answerOne != "Answer1"){
        actualAnswer1 = answerOne;
    }
    if(answerTwo != "Answer2"){
        actualAnswer2 = answerTwo;
    }
    if(answerThree != "Answer3"){
        actualAnswer3 = answerThree;
    }
    if(answerFour != "Answer4"){
        actualAnswer4 = answerFour;
    }
    if(answerFive != "Answer5"){
        actualAnswer5 = answerFive;
    }
    
    if (typeof CAMCSelected === "undefined") {
        CAMCSelected = -1;
    }else{
        CAMCSelected = CAMCSelected.replace("CA","");
    }
    
    
    var updateAnswer = "Update answer_mc_table set answer1 = '"+escape(actualAnswer1) +"', answer2 = '"+escape(actualAnswer2)+"',  answer3 ='"+escape(actualAnswer3)+"',answer4 = '"+escape(actualAnswer4)+"',answer5 = '"+escape(actualAnswer5) +"', corrective_action = "+parseInt(CAMCSelected) +" where question_id = "+parseInt(questionIdSelected);
    
    
    db.transaction(function(tx) {
                   tx.executeSql(updateAnswer);
                   }, function(error) {
                   console.log('transaction error insert: ' + error.message);
                   showAlert(error.message);
                   window.plugins.spinnerDialog.hide();
                   }, function() {
                   console.log('transaction ok');
                   window.plugins.spinnerDialog.hide();
                   questionIdSelected = "";
                   showSelectedCheckList(checkListId);
                   });
    
    
    
    
};


var updateMultipleChoiceSubQuestionParameters = function(checkListQuestion,questionPhotoVal,questionNotesVal,answerOne,answerTwo,answerThree,answerFour,answerFive,CAMCSelected){
    
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    
    
    var updateStatement = "Update sub_question_table  set question ='"+ escape(checkListQuestion) +"', photo = '"+questionPhotoVal+"',notes = '"+questionNotesVal+"' where question_id = "+parseInt(subQuestionIdSelected);
    
    
    db.transaction(function(tx) {
                   tx.executeSql(updateStatement);
                   }, function(error) {
                   console.log('transaction error insert: ' + error.message);
                   }, function() {
                   console.log('transaction ok');
                   
                   });
    
    
    var actualAnswer1 = "";
    var actualAnswer2 = "";
    var actualAnswer3 = "";
    var actualAnswer4 = "";
    var actualAnswer5 = "";
    
    if(answerOne != "Answer1"){
        actualAnswer1 = answerOne;
    }
    if(answerTwo != "Answer2"){
        actualAnswer2 = answerTwo;
    }
    if(answerThree != "Answer3"){
        actualAnswer3 = answerThree;
    }
    if(answerFour != "Answer4"){
        actualAnswer4 = answerFour;
    }
    if(answerFive != "Answer5"){
        actualAnswer5 = answerFive;
    }
    
    if (typeof CAMCSelected === "undefined") {
        CAMCSelected = -1;
    }else{
        CAMCSelected = CAMCSelected.replace("CASub","");
    }
    
    
    var updateAnswer = "Update answer_mc_table set answer1 = '"+escape(actualAnswer1) +"', answer2 = '"+escape(actualAnswer2)+"',  answer3 ='"+escape(actualAnswer3)+"',answer4 = '"+escape(actualAnswer4)+"',answer5 = '"+escape(actualAnswer5) +"', corrective_action = "+parseInt(CAMCSelected) +" where question_id = "+parseInt(subQuestionIdSelected);
    
    
    db.transaction(function(tx) {
                   tx.executeSql(updateAnswer);
                   }, function(error) {
                   console.log('transaction error insert: ' + error.message);
                   showAlert(error.message);
                   window.plugins.spinnerDialog.hide();
                   }, function() {
                   console.log('transaction ok');
                   window.plugins.spinnerDialog.hide();
                   questionIdSelected = "";
                   showSelectedCheckList(checkListId);
                   });
    
    
    
    
};


var updateYNQuestionParameters = function(checkListQuestion,questionPhotoVal,questionNotesVal,CAYNSelected){
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    
    var checkListName = $("#CheckListTextAreaName").val();
    var checkListDescription = $("#CheckListTextAreaDescription").val();
    
    var updateStatement = "Update question_table  set question ='"+ escape(checkListQuestion) +"', photo = '"+questionPhotoVal+"',notes = '"+questionNotesVal+"' where id = "+parseInt(questionIdSelected);
    
    
    db.transaction(function(tx) {
                   tx.executeSql(updateStatement);
                   }, function(error) {
                   console.log('transaction error insert: ' + error.message);
                   }, function() {
                   console.log('transaction ok');
                   
                   });
    
    if (typeof CAYNSelected === "undefined") {
        CAYNSelected = -1;
    }else{
        CAYNSelected = CAYNSelected.replace("CA","");
    }
    var correctiveActionSelected = "";
    if(CAYNSelected == "Yes"){
        correctiveActionSelected = 1;
    }else if(CAYNSelected == "No"){
        correctiveActionSelected = 2;
    }else if(CAYNSelected == "NA"){
        correctiveActionSelected = 3;
    }else{
        correctiveActionSelected = -1;
    }
    
    var updateAnswer = "Update answer_yn_table set corrective_action = "+parseInt(correctiveActionSelected)+" where question_id = "+parseInt(questionIdSelected);
    
    db.transaction(function(tx) {
                   tx.executeSql(updateAnswer);
                   }, function(error) {
                   console.log('transaction error insert: ' + error.message);
                   window.plugins.spinnerDialog.hide();
                   showAlert(error.message);
                   }, function() {
                   console.log('transaction ok');
                   questionIdSelected = "";
                   console.log("Update success for question");
                   window.plugins.spinnerDialog.hide();
                   showSelectedCheckList(checkListId);
                   });
    
    
};

var updateYNSubQuestionParameters = function(checkListQuestion,questionPhotoVal,questionNotesVal,CAYNSelected){
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    
    var updateStatement = "Update sub_question_table  set question ='"+ escape(checkListQuestion) +"', photo = '"+questionPhotoVal+"',notes = '"+questionNotesVal+"' where question_id = "+parseInt(subQuestionIdSelected);
    
    
    db.transaction(function(tx) {
                   tx.executeSql(updateStatement);
                   }, function(error) {
                   console.log('transaction error insert: ' + error.message);
                   }, function() {
                   console.log('transaction ok');
                   
                   });
    
    if (typeof CAYNSelected === "undefined") {
        CAYNSelected = -1;
    }else{
        CAYNSelected = CAYNSelected.replace("CA","");
    }
    var correctiveActionSelected = "";
    if(CAYNSelected == "Yes"){
        correctiveActionSelected = 1;
    }else if(CAYNSelected == "No"){
        correctiveActionSelected = 2;
    }else if(CAYNSelected == "NA"){
        correctiveActionSelected = 3;
    }else{
        correctiveActionSelected = -1;
    }
    
    console.log("I am there");
    var updateAnswer = "Update answer_yn_table set corrective_action = "+parseInt(correctiveActionSelected)+" where question_id = "+parseInt(subQuestionIdSelected);
    
    db.transaction(function(tx) {
                   tx.executeSql(updateAnswer);
                   }, function(error) {
                   console.log('transaction error insert: ' + error.message);
                   window.plugins.spinnerDialog.hide();
                   showAlert(error.message);
                   }, function() {
                   console.log('transaction ok');
                   questionIdSelected = "";
                   console.log("Update success for question");
                   window.plugins.spinnerDialog.hide();
                   showSelectedCheckList(checkListId);
                   });
    
    
};



var updateCheckListNameDescription = function(){
    var r = $.Deferred();
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    
    var checkListName = $("#CheckListTextAreaName").val();
    var checkListDescription = $("#CheckListTextAreaDescription").val();
    
    var updateStatement = "Update picklist_table  set picklist_name ='"+ escape(checkListName) +"',picklist_description = '"+escape(checkListDescription)+"' where id = "+parseInt(checkListId);
    
    db.transaction(function(tx) {
                   tx.executeSql(updateStatement);
                   }, function(error) {
                   console.log('transaction error insert: ' + error.message);
                   }, function() {
                   console.log('transaction ok');
                   $("#checkListDisplay").val("new");
                   });
    
    db.transaction(function(tx) {
                   tx.executeSql("select count(id) as cnt from picklist_table;", [], function(tx, res) {
                                 //console.log("res.rows.length: " + res.rows.length + " -- should be 1");
                                 //console.log("res.rows.item(0).cnt: " + res.rows.item(0).cnt + " -- should be 1");
                                 });
                   });
    
    
    return r;
    
};

var updateFavorite = function(num,divId){
    
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    
    var updateStatement = "Update picklist_table set favorite="+ parseInt(num) +" where id = "+parseInt(divId);
    
    db.transaction(function(tx) {
                   tx.executeSql(updateStatement);
                   }, function(error) {
                   console.log('transaction error insert: ' + error.message);
                   showAlert(error.message);
                   window.plugins.spinnerDialog.hide();
                   }, function() {
                   console.log('transaction ok');
                   window.plugins.spinnerDialog.hide();
                   });
};

var searchAllPicklists = function(val){
    var r = $.Deferred();
    var innerHTMLString = "";
    var selectStatement = "";
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    //Get underlined tab
    var currentView = localStorage.getItem("pickListView");
    
    if(currentView == "myLists"){
        selectStatement = "Select * from picklist_table where picklist_name like '%" + escape(val) +"%' or picklist_description like '%"+ escape(val) +"%' or auditor_name like '%"+ val +"%' or auditor_lob like  '%"+ val +"%'" ;
        
    }else if(currentView == "favorites"){
        selectStatement = "Select * from picklist_table where favorite = 1 and picklist_name like '%" + escape(val) +"%' or picklist_description like '%"+ escape(val) +"%' or auditor_name like '%"+ val +"%' or auditor_lob like  '%"+ val +"%'" ;
        
    }else if(currentView == "allLists"){
        if (checkConnection() == 'No network connection') {
            showAlert("No internet connection found. Please try when connection is available.");
            return;
        }
        var sortOrder = "";
        if(localStorage.getItem("sortOrder") === null){
            sortOrder = "LOB";
        }else{
            sortOrder = localStorage.getItem("sortOrder");
        }
        
        var url = "https://webvan-dev.disney.com/wdpr/safedchecklite/GetPickListData?sortOrder="+sortOrder+"&searchItem="+escape(val);
        var jxhr = $.ajax({
                          type : "POST",
                          url : url,
                          dataType: 'json'
                          
                          }).done(function(data) {
                                  
                                  // console.log(res.rows.item(i)['picklist_name']);
                                  // console.log(res.rows.item(i)['picklist_description']);
                                  // console.log(timeConverter(res.rows.item(i)['cdatetime']));
                                  for(var i =0;i<data.allSharedPickLists.length;i++){
                                  var checklistId = "checklist-"+data.allSharedPickLists[i].id;
                                  innerHTMLString += "<div id="+ checklistId  +" class='checklist-individual-shared-div'>";
                                  innerHTMLString += "<div class='checklist-creator-name'><span class='checklist-name'>"+unescape(data.allSharedPickLists[i].picklist_name)+"</span><span class='checklist-creation-date'>"+timeConverter(data.allSharedPickLists[i].cdatetime)+"</span></div>";
                                  innerHTMLString +=  "<div class='checklist-description'>"+unescape(data.allSharedPickLists[i].picklist_description)+"</div>";
                                  innerHTMLString +=  "<div class='checklist-creator-LOB'>"+data.allSharedPickLists[i].auditor_lob+"</div>";
                                  innerHTMLString +=  "<div class='checklist-auditor-name'><span>"+unescape(data.allSharedPickLists[i].auditor_name)+"</span>";
                                  if(localStorage.getItem("storedName") == data.allSharedPickLists[i].auditor_name && localStorage.getItem("storedLOB") == data.allSharedPickLists[i].auditor_lob ){
                                  innerHTMLString += "<span class='user-created-favorite'><span class='user-image-class'><img src='assets/icon_profile_picklist.png'></span></span>";
                                  }
                                  innerHTMLString += "</div>";
                                  innerHTMLString += "</div>";
                                  }
                                  
                                  
                                  
                                  
                                  $("#checkListindex").html(innerHTMLString);
                                  
                                  window.plugins.spinnerDialog.hide();
                                  // showAlert("Audit data saved successfully");
                                  
                                  
                                  }).fail(function(jqXHR, textStatus) {
                                          console.log(textStatus);
                                          showAlert("Oops. Something went wrong. Please try again later.");
                                          });
    }
    
    if(currentView == "myLists" || currentView == "favorites"  ){
        
        db.transaction(function(tx) {
                       tx.executeSql(selectStatement,[],function(tx,res){
                                     var len = res.rows.length;
                                     if(len>0)
                                     {
                                     for (var i = 0; i < len; i++)
                                     {
                                     // console.log(res.rows.item(i)['picklist_name']);
                                     // console.log(res.rows.item(i)['picklist_description']);
                                     // console.log(timeConverter(res.rows.item(i)['cdatetime']));
                                     var checklistId = "checklist-"+res.rows.item(i)['id'];
                                     innerHTMLString += "<div id="+ checklistId  +" class='checklist-individual-div'>";
                                     innerHTMLString += "<div class='checklist-creator-name'><span class='checklist-name'>"+unescape(res.rows.item(i)['picklist_name'])+"</span><span class='checklist-creation-date'>"+timeConverter(res.rows.item(i)['cdatetime'])+"</span></div>";
                                     innerHTMLString +=  "<div class='checklist-description'>"+unescape(res.rows.item(i)['picklist_description'])+"</div>";
                                     
                                     innerHTMLString +=  "<div class='checklist-creator-LOB'>"+unescape(res.rows.item(i)['auditor_lob'])+"</div>";
                                     innerHTMLString +=  "<div class='checklist-auditor-name'>"+unescape(res.rows.item(i)['auditor_name']);
                                     
                                     if(res.rows.item(i)['favorite']==0){
                                     innerHTMLString += "<span class='user-created-favorite'><span class='user-image-class'><img src='assets/icon_profile_picklist.png'></span><span class='favorite-class'><img class='favorite-image-class' src='assets/icon_unfavorite_picklist.png'></span></span>";
                                     }else{
                                     innerHTMLString += "<span class='user-created-favorite'><span class='user-image-class'><img src='assets/icon_profile_picklist.png'></span><span class='favorite-class'><img class='favorite-image-class' src='assets/icon_favorite_picklist.png'></span></span>";
                                     }
                                     innerHTMLString += "</div>";
                                     innerHTMLString += "</div>";
                                     }
                                     
                                     
                                     
                                     }
                                     $("#checkListindex").html(innerHTMLString);
                                     
                                     }, function(error) {
                                     console.log('transaction error select: ' + error.message);
                                     });
                       }, function(error) {
                       console.log('transaction error: ' + error.message);
                       },function() {
                       console.log('transaction ok');
                       });
    }
    return r;
    
};

var searchAllAudits = function(val){
    var r = $.Deferred();
    var innerHTMLString = "";
    
    
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    
    var selectStatement = "Select * from audit_table where audit_name like '%" + escape(val) +"%' or audit_description like '%"+ escape(val) +"%' or location like  '%"+ escape(val) +"%'" ;
    
    var questionCountArray = [];
    var progressArray = [];
    var progressValueArray = [];
    
    
    db.transaction(function(tx) {
                   tx.executeSql(selectStatement,[],function(tx,res){
                                 var len = res.rows.length;
                                 if(len>0)
                                 {
                                 for (var i = 0; i < len; i++)
                                 {
                                 // console.log(res.rows.item(i)['picklist_name']);
                                 // console.log(res.rows.item(i)['picklist_description']);
                                 // console.log(timeConverter(res.rows.item(i)['cdatetime']));
                                 var auditId = "audit-"+res.rows.item(i)['id'];
                                 aID = res.rows.item(i)['id'];
                                 innerHTMLString += "<div id="+ auditId  +" class='audit-individual-div'>";
                                 innerHTMLString += "<div><span class='audit-name'>"+unescape(res.rows.item(i)['audit_name'])+"</span><span class='checklist-creation-date'>"+timeConverter(res.rows.item(i)['cdatetime'])+"</span></div>";
                                 innerHTMLString +=  "<div class='audit-description'>"+unescape(res.rows.item(i)['audit_description'])+"</div>";
                                 innerHTMLString += "<div class='audit-location'>"+unescape(res.rows.item(i)['location'])+"</div>";
                                 //if(parseInt(res.rows.item(i)['qno']) != 0 && parseInt(res.rows.item(i)['question_count']) != 0){
                                 innerHTMLString += "<div class ='audit-progressbar' id='pbar-"+aID+"'></div>";
                                 //}
                                 innerHTMLString += "<div class='audit-progressbar-count'>"+res.rows.item(i)['qno']+" of "+res.rows.item(i)['question_count']+"</div>";
                                 var percentProgress = 0;
                                 if(parseInt(res.rows.item(i)['qno']) == 0 && parseInt(res.rows.item(i)['question_count']) == 0){
                                 percentProgress = 0;
                                 }else{
                                 percentProgress = Math.round((parseInt(res.rows.item(i)['qno']) * 100)/parseInt(res.rows.item(i)['question_count']));
                                 }
                                 innerHTMLString += "</div>";
                                 progressArray.push(aID);
                                 
                                 progressValueArray.push(percentProgress);
                                 
                                 
                                 }
                                 
                                 }
                                 $("#auditIndex").html(innerHTMLString);
                                 for(var j=0;j<progressArray.length;j++){
                                 if(progressArray[j] != 0){
                                 $("<input>").appendTo("#pbar-"+progressArray[j]).attr({"name":"slider","id":"slider-"+progressArray[j],"data-highlight":"true","min":"0","max":"100","value":progressValueArray[j],"type":"range"}).slider({
                                                                                                                                                                                                                                            create: function( event, ui ) {
                                                                                                                                                                                                                                            $(this).parent().find('input').hide();
                                                                                                                                                                                                                                            $(this).parent().find('input').css('margin-left','-9999px'); // Fix for some FF versions
                                                                                                                                                                                                                                            $(this).parent().find('.ui-slider-track').css('margin','0 15px 0 15px').css('pointer-events','none');
                                                                                                                                                                                                                                            $(this).parent().find('.ui-slider-handle').hide();
                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                            if(progressValueArray[j] > -1 &&progressValueArray[j] <= 30){
                                                                                                                                                                                                                                            $(this).closest(".ui-slider").find(".ui-slider-bg").css("background-color", "#cc0000" );
                                                                                                                                                                                                                                            }else if(progressValueArray[j] > 30 && progressValueArray[j] <= 60){
                                                                                                                                                                                                                                            $(this).closest(".ui-slider").find(".ui-slider-bg").css("background-color", "#ffff7f");
                                                                                                                                                                                                                                            }else if(progressValueArray[j] > 60){
                                                                                                                                                                                                                                            $(this).closest(".ui-slider").find(".ui-slider-bg").css("background-color", "#8cc63f" );
                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                            }).slider("refresh");
                                 
                                 }
                                 
                                 
                                 
                                 
                                 }
                                 
                                 
                                 
                                 
                                 
                                 }, function(error) {
                                 console.log('transaction error select: ' + error.message);
                                 });
                   }, function(error) {
                   console.log('transaction error: ' + error.message);
                   },function() {
                   console.log('transaction ok');
                   });
    return r;
    
};



var populateAuditScreen = function(){
    var innerHTMLString = "";
    var r = $.Deferred();
    var concatenatedQuery = "";
    var sortAuditOrder = "";
    if(localStorage.getItem("sortAuditOrder") === null){
        concatenatedQuery += " order by cdatetime asc";
    }else{
        sortAuditOrder = localStorage.getItem("sortAuditOrder");
        
        if(sortAuditOrder == "Location"){
            concatenatedQuery += " order by location asc";
        }else if(sortAuditOrder == "Status"){
            concatenatedQuery += " order by qno*100/question_count asc";
        }else if(sortAuditOrder == "Date"){
            concatenatedQuery += " order by cdatetime asc";
        }
        
    }
    
    
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    
    var selectStatement = "Select * from audit_table "+concatenatedQuery;
    
    
    
    var questionCountArray = [];
    var progressArray = [];
    var progressValueArray = [];
    
    
    
    db.transaction(function(tx) {
                   tx.executeSql(selectStatement,[],function(tx,res){
                                 var len = res.rows.length;
                                 if(len>0)
                                 {
                                 for (var i = 0; i < len; i++)
                                 {
                                 // console.log(res.rows.item(i)['picklist_name']);
                                 // console.log(res.rows.item(i)['picklist_description']);
                                 // console.log(timeConverter(res.rows.item(i)['cdatetime']));
                                 var auditId = "audit-"+res.rows.item(i)['id'];
                                 aID = res.rows.item(i)['id'];
                                 innerHTMLString += "<div id="+ auditId  +" class='audit-individual-div'>";
                                 innerHTMLString += "<div><span class='audit-name'>"+unescape(res.rows.item(i)['audit_name'])+"</span><span class='checklist-creation-date'>"+timeConverter(res.rows.item(i)['cdatetime'])+"</span></div>";
                                 innerHTMLString +=  "<div class='audit-description'>"+unescape(res.rows.item(i)['audit_description'])+"</div>";
                                 innerHTMLString += "<div class='audit-location'>"+unescape(res.rows.item(i)['location'])+"</div>";
                                 
                                 //if(parseInt(res.rows.item(i)['qno']) != 0 && parseInt(res.rows.item(i)['question_count']) != 0){
                                 
                                 innerHTMLString += "<div class ='audit-progressbar' id='pbar-"+aID+"'></div>";
                                 
                                 //}
                                 innerHTMLString += "<div class='audit-progressbar-count'>"+res.rows.item(i)['qno']+" of "+res.rows.item(i)['question_count']+" </div>";
                                 var percentProgress = 0;
                                 
                                 if(parseInt(res.rows.item(i)['qno']) == 0 && parseInt(res.rows.item(i)['question_count']) == 0){
                                 
                                 percentProgress = 0;
                                 
                                 }else{
                                 
                                 percentProgress = Math.round((parseInt(res.rows.item(i)['qno']) * 100)/parseInt(res.rows.item(i)['question_count']));
                                 
                                 }
                                 
                                 innerHTMLString += "</div>";
                                 
                                 progressArray.push(aID);
                                 
                                 
                                 
                                 progressValueArray.push(percentProgress);
                                 
                                 
                                 }
                                 
                                 }
                                 $("#auditIndex").html(innerHTMLString);
                                 for(var j=0;j<progressArray.length;j++){
                                 if(progressArray[j] != 0){
                                 $("<input>").appendTo("#pbar-"+progressArray[j]).attr({"name":"slider","id":"slider-"+progressArray[j],"data-highlight":"true","min":"0","max":"100","value":progressValueArray[j],"type":"range"}).slider({
                                                                                                                                                                                                                                            create: function( event, ui ) {
                                                                                                                                                                                                                                            $(this).parent().find('input').hide();
                                                                                                                                                                                                                                            $(this).parent().find('input').css('margin-left','-9999px'); // Fix for some FF versions
                                                                                                                                                                                                                                            $(this).parent().find('.ui-slider-track').css('margin','0 15px 0 15px').css('pointer-events','none');
                                                                                                                                                                                                                                            $(this).parent().find('.ui-slider-handle').hide();
                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                            if(progressValueArray[j] > -1 &&progressValueArray[j] <= 30){
                                                                                                                                                                                                                                            $(this).closest(".ui-slider").find(".ui-slider-bg").css("background-color", "#cc0000" );
                                                                                                                                                                                                                                            }else if(progressValueArray[j] > 30 && progressValueArray[j] <= 60){
                                                                                                                                                                                                                                            $(this).closest(".ui-slider").find(".ui-slider-bg").css("background-color", "#ffff7f");
                                                                                                                                                                                                                                            }else if(progressValueArray[j] > 60){
                                                                                                                                                                                                                                            $(this).closest(".ui-slider").find(".ui-slider-bg").css("background-color", "#8cc63f" );
                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                            }).slider("refresh");
                                 
                                 
                                 
                                 }
                                 
                                 
                                 }
                                 
                                 
                                 
                                 
                                 
                                 }, function(error) {
                                 console.log('transaction error select: ' + error.message);
                                 });
                   }, function(error) {
                   console.log('transaction error: ' + error.message);
                   },function() {
                   console.log('transaction ok');
                   });
    
    
    return r;
    
}

var populatePickListScreen = function(type){
    
    var innerHTMLString = "";
    var r = $.Deferred();
    
    //  //  if(sortOrder)
    var username = "";
    var concatenatedQuery = "";
    if(type=="userLists"){
        username = localStorage.getItem("storedName");
        concatenatedQuery += " where auditor_name = '"+ username + "'";
    }else if(type=="favorites"){
        concatenatedQuery += " where favorite = 1";
    }
    
    var sortType = "";
    if(localStorage.getItem("sortType")=="ASCENDING"){
        sortType = "asc";
    }else{
        sortType = "desc";
    }
    
    var sortOrder = "";
    if(localStorage.getItem("sortOrder") === null){
        concatenatedQuery += " order by cdatetime "+ sortType;
    }else{
        sortOrder = localStorage.getItem("sortOrder");
        if(sortOrder == "LOB"){
            concatenatedQuery += " order by auditor_lob "+sortType;
        }else if(sortOrder == "Creator"){
            concatenatedQuery += " order by auditor_name "+ sortType;
        }else if(sortOrder == "Date"){
            concatenatedQuery += " order by cdatetime "+ sortType;
        }else if(sortOrder == "Name"){
            concatenatedQuery += " order by picklist_name "+sortType;
        }
        
    }
    
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    
    var selectStatement = "Select * from picklist_table" + concatenatedQuery;
    
    db.transaction(function(tx) {
                   tx.executeSql(selectStatement,[],function(tx,res){
                                 var len = res.rows.length;
                                 if(len>0)
                                 {
                                 for (var i = 0; i < len; i++)
                                 {
                                 // console.log(res.rows.item(i)['picklist_name']);
                                 // console.log(res.rows.item(i)['picklist_description']);
                                 // console.log(timeConverter(res.rows.item(i)['cdatetime']));
                                 var checklistId = "checklist-"+res.rows.item(i)['id'];
                                 innerHTMLString += "<div id="+ checklistId  +" class='checklist-individual-div'>";
                                 innerHTMLString += "<div class='checklist-creator-name'><span class='checklist-name'>"+unescape(res.rows.item(i)['picklist_name'])+"</span><span class='checklist-creation-date'>"+timeConverter(res.rows.item(i)['cdatetime'])+"</span></div>";
                                 innerHTMLString +=  "<div class='checklist-description'>"+unescape(res.rows.item(i)['picklist_description'])+"</div>";
                                 
                                 innerHTMLString +=  "<div class='checklist-creator-LOB'>"+unescape(res.rows.item(i)['auditor_lob'])+"</div>";
                                 innerHTMLString +=  "<div class='checklist-auditor-name'>"+unescape(res.rows.item(i)['auditor_name']);
                                 
                                 if(res.rows.item(i)['favorite']==0){
                                 innerHTMLString += "<span class='user-created-favorite'><span class='user-image-class'><img src='assets/icon_profile_picklist.png'></span><span class='favorite-class'><img class='favorite-image-class' src='assets/icon_unfavorite_picklist.png'></span></span>";
                                 }else{
                                 innerHTMLString += "<span class='user-created-favorite'><span class='user-image-class'><img src='assets/icon_profile_picklist.png'></span><span class='favorite-class'><img class='favorite-image-class' src='assets/icon_favorite_picklist.png'></span></span>";
                                 }
                                 innerHTMLString += "</div>";
                                 innerHTMLString += "</div>";
                                 }
                                 
                                 
                                 
                                 }
                                 $("#checkListindex").html(innerHTMLString);
                                 
                                 }, function(error) {
                                 console.log('transaction error select: ' + error.message);
                                 });
                   }, function(error) {
                   console.log('transaction error: ' + error.message);
                   },function() {
                   console.log('transaction ok');
                   });
    
    return r;
    
};

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp);
    var actualDate = (a.getMonth()+1) + '/' + a.getDate() + '/' + a.getFullYear();
    return actualDate;
}

function showSelectedSection(id){
    
    
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    
    var selectStatement = "Select * from section_table where id="+id;
    
    db.transaction(function(tx) {
                   tx.executeSql(selectStatement,[],function(tx,res){
                                 var len = res.rows.length;
                                 //console.log("length:"+len);
                                 
                                 if(len>0)
                                 {
                                 
                                 for (var i = 0; i < len; i++)
                                 {
                                 $("#sectionTextArea").val(unescape(res.rows.item(i)['section']));
                                 }
                                 $("#sectionDisplay").val("old");
                                 $.mobile.navigate("#addSectionScreen");
                                 }
                                 
                                 }, function(error) {
                                 console.log('transaction error select: ' + error.message);
                                 });
                   }, function(error) {
                   console.log('transaction error: ' + error.message);
                   },function() {
                   console.log('transaction ok');
                   //Reset everything to defaults
                   showQuestionDefaults();
                   $("#questionDisplay").val("new");
                   });
    
}

function showSharedCheckListDetails(data,sharedCheckListName,sharedCheckListDescription,auditorName,auditorLOB,divId){
    $("#auditQuestionAnswers").html("");
    
    var innerHTMLString = "";
    
    var innerSectionsHTMLString = "";
    
    $("#sharedChecklistDetailsName").html(unescape(sharedCheckListName));
    $("#sharedChecklistDetailsDescription").html(unescape(sharedCheckListDescription));
    $("#sharedPickListId").val(divId);
    
    var questionsArray = [];
    var questionsIdArray = [];
    var sectionsArray = [];
    var sectionsIdArray = [];
    var questionsTypeArray = [];
    var questionsSortOrder = [];
    var sectionsSortOrder = [];
    var sectionsWithQuestions = [];
    var questionIdActualArray = [];
    var questionsWithSubQuestionsArray = [];
    var answerMCQuestionIdArray = [];
    var CAMCQuestionArray = [];
    var photoNotesMaterArray = [];
    
    
    var answerMasterArray = [];
    
    
    //Questions
    
    for(var i=0;i<data.questions.length;i++){
        var photoNotesArray = [];
        var questionId = "question-"+data.questions[i].id;
        questionIdActualArray.push(data.questions[i].id);
        questionsIdArray.push(questionId);
        var questionSubQuestionExists = data.questions[i].subQuestionExists;
        if(questionSubQuestionExists == 0){
            questionsWithSubQuestionsArray.push("ui-state-default question-default");
        }else if(questionSubQuestionExists == 1){
            questionsWithSubQuestionsArray.push("ui-state-default question-default-sub-question");
        }
        var photo = data.questions[i].photo;
        var notes = data.questions[i].notes;
        photoNotesArray.push(photo);
        photoNotesArray.push(notes);
        
        photoNotesMaterArray.push(photoNotesArray);
        questionsTypeArray.push(data.questions[i].questionType);
        var questionString = unescape(data.questions[i].question);
        questionsArray.push(questionString);
        var questionOrder = data.questions[i].sortOrder;
        questionsSortOrder.push(questionOrder);
        
        
    }
    
    //MC Questions
    
    for(var i=0;i<data.MCquestions.length;i++){
        answerMCQuestionIdArray.push(data.MCquestions[i].questionId);
        var answerArray = [];
        var answer1 = data.MCquestions[i].answer1;
        if(answer1!==""){
            answerArray.push(unescape(answer1));
        }
        
        var answer2 = data.MCquestions[i].answer2;
        if(answer2!==""){
            answerArray.push(unescape(answer2));
        }
        var answer3 = data.MCquestions[i].answer3;
        if(answer3!==""){
            answerArray.push(unescape(answer3));
        }
        var answer4 = data.MCquestions[i].answer4;
        if(answer4!==""){
            answerArray.push(unescape(answer4));
        }
        var answer5 = data.MCquestions[i].answer5;
        if(answer5!==""){
            answerArray.push(unescape(answer5));
        }
        answerMasterArray.push(answerArray);
        
    }
    
    //Sections
    
    
    for(var i=0;i<data.sections.length;i++){
        var questionList = "";
        var sectionId = "section-"+data.sections[i].id;
        sectionsIdArray.push(sectionId);
        var sectionString = unescape(data.sections[i].section);
        sectionsArray.push(sectionString);
        var sectionOrder = data.sections[i].sortOrder;
        sectionsSortOrder.push(sectionOrder);
        if(data.sections[i].questionList!=""){
            questionList = data.sections[i].questionList;
        }else{
            questionList = "empty";
        }
        sectionsWithQuestions.push(questionList);
        
    }
    
    
    
    var sectionsWithQuestionsString = "";
    for(var i=0;i<sectionsWithQuestions.length;i++){
        sectionsWithQuestionsString += sectionsWithQuestions[i]+",";
    }
    var  sectionsWithQuestionsStringArray = sectionsWithQuestionsString.split(",");
    sectionsWithQuestionsStringArray.pop();
    
    
    var sectionsWithQuestionsArray = [];
    var questionsWithNoSection = [];
    var sectionWithNoQuestionArray = [];
    questionsWithNoSection = arr_diff(questionIdActualArray,sectionsWithQuestionsStringArray);
    var index = questionsWithNoSection.indexOf("empty");
    if (index > -1) {
        questionsWithNoSection.splice(index, 1);
    }
    //get the sections sort order
    //check first section and see if it has any questions
    for(var i=0;i<sectionsWithQuestions.length;i++){
        for(var j=0;j<questionIdActualArray.length;j++){
            if(sectionsWithQuestions[i].indexOf(questionIdActualArray[j])!="-1"){
                sectionsWithQuestionsArray.push(sectionsArray[i]+"||"+questionsIdArray[j]+"||"+questionsArray[j] + "||" + sectionsIdArray[i] + "||" + questionsWithSubQuestionsArray[j] + "||" + questionsTypeArray[j] + "||" + photoNotesMaterArray[j]);
            }else if(sectionsWithQuestions[i]=="empty"){
                var str = sectionsArray[i]+ "||" + sectionsIdArray[i];
                var found = $.inArray(str, sectionWithNoQuestionArray);
                if (found >= 0) {
                } else {
                    
                    sectionWithNoQuestionArray.push(str);
                }
                
            }
        }
    }
    
    for(var i=0;i<sectionsWithQuestions.length;i++){
        if(sectionsWithQuestions[i]=="empty"){
            
            var str = sectionsArray[i]+ "||" + sectionsIdArray[i];
            var found = $.inArray(str, sectionWithNoQuestionArray);
            if (found >= 0) {
            } else {
                
                sectionWithNoQuestionArray.push(str);
            }
            
            
        }
    }
    
    
    innerHTMLString += "<ul id='unsortableQuestionsStatic'>";
    var tempQuestionArray = [];
    var tempQuestionSortArray = [];
    var tempQuestionSubArray  = [];
    var tempActualIdArray = [];
    var tempTypeArray = [];
    var tempPhotoNotesArray = [];
    //Questions with no section go first
    if(questionsWithNoSection.length>0){
        for(var i=0;i<questionsWithNoSection.length;i++){
            for(var j=0;j<questionIdActualArray.length;j++){
                if(questionIdActualArray[j]==questionsWithNoSection[i]){
                    tempActualIdArray.push(questionsWithNoSection[i]);
                    tempQuestionArray.push(questionsArray[j]) ;
                    tempQuestionSortArray.push(questionsSortOrder[j]);
                    tempQuestionSubArray.push(questionsWithSubQuestionsArray[j]);
                    tempTypeArray.push(questionsTypeArray[j]);
                    tempPhotoNotesArray.push(photoNotesMaterArray[j]);
                }
            }
            
            
        }
        var sortedValArray = sortBasedOnAnotherArray(tempQuestionSortArray,tempQuestionArray);
        var sortedIdArray = sortBasedOnAnotherArray(tempQuestionSortArray,tempActualIdArray);
        var sortedSubQuestionArray = sortBasedOnAnotherArray(tempQuestionSortArray,tempQuestionSubArray);
        var sortedTypeArray = sortBasedOnAnotherArray(tempQuestionSortArray,tempTypeArray);
        var sortedPhotoNotesArray = sortBasedOnAnotherArray(tempQuestionSortArray,tempPhotoNotesArray);
        
        for(var l=0;l<sortedValArray.length;l++){
            if(sortedTypeArray[l]=="YN"){
                
                innerHTMLString +=  "<li class='question-YN'  id='question-"+ sortedIdArray[l] +"'>";
                innerHTMLString += "<div class='question-text-details'>"+sortedValArray[l] + "</div>" ;
                
                innerHTMLString += "<div><table class='answer-table'> <tr><td class='answer-style-yes-no'>Yes</td><td class='answer-style-yes-no'>No</td><td class='answer-style-yes-no'>N/A</td></tr></table></div>" ;
                innerHTMLString += "<div class='quick-capture-middle-audit'><div class='quick-capture-middle-col-audit-photo-notes-"+sortedPhotoNotesArray[l][0]+"'><div class='quick-capture-middle-div-question'><img src='assets/icon_photo_small.png'></div></div><div class='quick-capture-middle-col-audit-photo-notes-"+sortedPhotoNotesArray[l][1]+"'><div class='quick-capture-middle-div-question'><img src='assets/icon_notes_small.png'></div></div></div>";
                
                
                innerHTMLString += "</li>";
            }else{
                
                
                for(var p=0;p<answerMCQuestionIdArray.length;p++){
                    if(sortedIdArray[l] == answerMCQuestionIdArray[p] ){
                        if(answerMasterArray[p].length == 1){
                            innerHTMLString +=  "<li class='question-MC-one'  id='question-"+ sortedIdArray[l] +"'>";
                        }else if(answerMasterArray[p].length == 2){
                            innerHTMLString +=  "<li class='question-MC-two'  id='question-"+ sortedIdArray[l] +"'>";
                        }else if(answerMasterArray[p].length == 3){
                            innerHTMLString +=  "<li class='question-MC-three'  id='question-"+ sortedIdArray[l] +"'>";
                        }else if(answerMasterArray[p].length == 4){
                            innerHTMLString +=  "<li class='question-MC-four'  id='question-"+ sortedIdArray[l] +"'>";
                        }else if(answerMasterArray[p].length == 5){
                            innerHTMLString +=  "<li class='question-MC-five'  id='question-"+ sortedIdArray[l] +"'>";
                        }
                        innerHTMLString += "<div class='question-text-details'>"+sortedValArray[l] + "</div>" ;
                        
                        
                        innerHTMLString += "<table class='answer-table'>";
                        for (var k=0;k<answerMasterArray[p].length;k++){
                            innerHTMLString += "<tr><td class='answer-style'>"+answerMasterArray[p][k]+"</td></tr>";
                            
                        }
                    }
                }
                innerHTMLString += "</table>";
                innerHTMLString += "<div class='quick-capture-middle-audit'><div class='quick-capture-middle-col-audit-photo-notes-"+sortedPhotoNotesArray[l][0]+"'><div class='quick-capture-middle-div-question'><img src='assets/icon_photo_small.png'></div></div><div class='quick-capture-middle-col-audit-photo-notes-"+sortedPhotoNotesArray[l][1]+"'><div class='quick-capture-middle-div-question'><img src='assets/icon_notes_small.png'></div></div></div>";
            }
            
        }
        
    }
    
    
    for(var i=0;i<sectionsWithQuestionsArray.length;i++){
        if(i==0 ){
            innerHTMLString +=  "<li class='section-default' id='"+ sectionsWithQuestionsArray[i].split("||")[3]  +"'>";
            innerHTMLString += sectionsWithQuestionsArray[i].split("||")[0];
            innerHTMLString += "</li>";
            
        }else{
            if(sectionsWithQuestionsArray[i].split("-")[0] != sectionsWithQuestionsArray[i-1].split("-")[0]){
                innerHTMLString +=  "<li class='section-default' id='"+ sectionsWithQuestionsArray[i].split("||")[3]  +"'>";
                innerHTMLString += sectionsWithQuestionsArray[i].split("||")[0];
                innerHTMLString += "</li>";
            }
        }
        if(sectionsWithQuestionsArray[i].split("||")[5]=="YN"){
            innerHTMLString +=  "<li class='question-YN'  id='"+ sectionsWithQuestionsArray[i].split("||")[1] +"'>";
            innerHTMLString += "<div class='question-text-details'>"+sectionsWithQuestionsArray[i].split("||")[2] + "</div>" ;
            
            innerHTMLString += "<div><table class='answer-table'> <tr><td class='answer-style-yes-no'>Yes</td><td class='answer-style-yes-no'>No</td><td class='answer-style-yes-no'>N/A</td></tr></table></div>" ;
            innerHTMLString += "<div class='quick-capture-middle-audit'><div class='quick-capture-middle-col-audit-photo-notes-"+sectionsWithQuestionsArray[i].split("||")[6].split(",")[0]+"'><div class='quick-capture-middle-div-question'><img src='assets/icon_photo_small.png'></div></div><div class='quick-capture-middle-col-audit-photo-notes-"+sectionsWithQuestionsArray[i].split("||")[6].split(",")[1]+"'><div class='quick-capture-middle-div-question'><img src='assets/icon_notes_small.png'></div></div></div>";
            innerHTMLString += "</li>";
        }else{
            // innerHTMLString +=  "<li class='question-MC'  id='"+ sectionsWithQuestionsArray[i].split("||")[1] +"'>";
            //innerHTMLString += "<div class='question-text-details'>"+sectionsWithQuestionsArray[i].split("||")[2] + "</div>" ;
            
            var idC = sectionsWithQuestionsArray[i].split("||")[1];
            //  innerHTMLString += "<table class='answer-table'>";
            for(var p=0;p<answerMCQuestionIdArray.length;p++){
                if(idC.split("-")[1] == answerMCQuestionIdArray[p] ){
                    
                    if(answerMasterArray[p].length == 1){
                        innerHTMLString +=  "<li class='question-MC-one'  id='"+ sectionsWithQuestionsArray[i].split("||")[1] +"'>";
                    }else if(answerMasterArray[p].length == 2){
                        innerHTMLString +=  "<li class='question-MC-two'  id='"+ sectionsWithQuestionsArray[i].split("||")[1] +"'>";
                    }else if(answerMasterArray[p].length == 3){
                        innerHTMLString +=  "<li class='question-MC-three'  id='"+ sectionsWithQuestionsArray[i].split("||")[1] +"'>";
                    }else if(answerMasterArray[p].length == 4){
                        innerHTMLString +=  "<li class='question-MC-four'  id='"+ sectionsWithQuestionsArray[i].split("||")[1] +"'>";
                    }else if(answerMasterArray[p].length == 5){
                        innerHTMLString +=  "<li class='question-MC-five'  id='"+ sectionsWithQuestionsArray[i].split("||")[1] +"'>";
                    }
                    innerHTMLString += "<div class='question-text-details'>"+sectionsWithQuestionsArray[i].split("||")[2] + "</div>" ;
                    
                    
                    innerHTMLString += "<table class='answer-table'>";
                    
                    
                    
                    for (var k=0;k<answerMasterArray[p].length;k++){
                        innerHTMLString += "<tr><td class='answer-style'>"+answerMasterArray[p][k]+"</td></tr>";
                        
                    }
                }
            }
            innerHTMLString += "</table>";
            innerHTMLString += "<div class='quick-capture-middle-audit'><div class='quick-capture-middle-col-audit-photo-notes-"+sectionsWithQuestionsArray[i].split("||")[6].split(",")[0]+"'><div class='quick-capture-middle-div-question'><img src='assets/icon_photo_small.png'></div></div><div class='quick-capture-middle-col-audit-photo-notes-"+sectionsWithQuestionsArray[i].split("||")[6].split(",")[1]+"'><div class='quick-capture-middle-div-question'><img src='assets/icon_notes_small.png'></div></div></div>";
            
        }
    }
    
    if(sectionWithNoQuestionArray.length>0){
        for(var i=0;i<sectionWithNoQuestionArray.length;i++){
            innerHTMLString +=  "<li class='section-default' id='"+ sectionWithNoQuestionArray[i].split("||")[1]  +"'>";
            innerHTMLString += sectionWithNoQuestionArray[i].split("||")[0];
            innerHTMLString += "</li>";
            
        }
    }
    innerHTMLString += "</ul>";
    
    $("#staticSharedQuestionsAnswersDetails").html(innerHTMLString);
    if(auditorName != localStorage.getItem("storedName") || auditorLOB != localStorage.getItem("storedLOB")){
        $("#deleteSharedPickList").hide();
    }else{
        $("#deleteSharedPickList").show();
    }
    $.mobile.navigate("#sharedChecklistDetails");
}

function showSelectedCheckListDetails(id){
    $("#auditQuestionAnswers").html("");
    checkListId = id;
    var innerHTMLString = "";
    
    var innerSectionsHTMLString = "";
    
    
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    
    var selectStatement = "Select * from question_table where checklist_id= "+ checkListId +" order by sort_order asc";
    
    var selectSectionsStatement = "Select * from section_table where checklist_id= "+ checkListId +" order by sort_order asc";
    
    var selectMCAnswerStatement = "Select * from answer_mc_table where checklist_id= "+ checkListId ;
    
    var selectChecklist = "Select * from picklist_table where id = "+ checkListId;
    
    
    
    var questionsArray = [];
    var questionsIdArray = [];
    var sectionsArray = [];
    var sectionsIdArray = [];
    var questionsTypeArray = [];
    var questionsSortOrder = [];
    var sectionsSortOrder = [];
    var sectionsWithQuestions = [];
    var questionIdActualArray = [];
    var questionsWithSubQuestionsArray = [];
    var answerMCQuestionIdArray = [];
    var CAMCQuestionArray = [];
    var photoNotesMaterArray = [];
    
    
    var answerMasterArray = [];
    
    
    
    
    db.transaction(function(tx) {
                   tx.executeSql(selectChecklist,[],function(tx,res){
                                 var len = res.rows.length;
                                 
                                 if(len>0)
                                 {
                                 for (var i = 0; i < len; i++)
                                 {
                                 var name = res.rows.item(i)['picklist_name'];
                                 var description = res.rows.item(i)['picklist_description'];
                                 $("#checklistDetailsName").html(unescape(name));
                                 $("#checklistDetailsDescription").html(unescape(description));
                                 }
                                 }
                                 }, function(error) {
                                 console.log('transaction error select: ' + error.message);
                                 });
                   }, function(error) {
                   console.log('transaction error: ' + error.message);
                   },function() {
                   console.log('transaction ok');
                   
                   });
    
    
    
    db.transaction(function(tx) {
                   tx.executeSql(selectMCAnswerStatement,[],function(tx,res){
                                 var len = res.rows.length;
                                 
                                 if(len>0)
                                 {
                                 for (var i = 0; i < len; i++)
                                 {
                                 answerMCQuestionIdArray.push(res.rows.item(i)['question_id']);
                                 var answerArray = [];
                                 var answer1 = res.rows.item(i)['answer1'];
                                 if(answer1!==""){
                                 answerArray.push(unescape(answer1));
                                 }
                                 
                                 var answer2 = res.rows.item(i)['answer2'];
                                 if(answer2!==""){
                                 answerArray.push(unescape(answer2));
                                 }
                                 var answer3 = res.rows.item(i)['answer3'];
                                 if(answer3!==""){
                                 answerArray.push(unescape(answer3));
                                 }
                                 var answer4 = res.rows.item(i)['answer4'];
                                 if(answer4!==""){
                                 answerArray.push(unescape(answer4));
                                 }
                                 var answer5 = res.rows.item(i)['answer5'];
                                 if(answer5!==""){
                                 answerArray.push(unescape(answer5));
                                 }
                                 answerMasterArray.push(answerArray);
                                 }
                                 }
                                 }, function(error) {
                                 console.log('transaction error select: ' + error.message);
                                 });
                   }, function(error) {
                   console.log('transaction error: ' + error.message);
                   },function() {
                   console.log('transaction ok');
                   
                   });
    
    
    
    db.transaction(function(tx) {
                   tx.executeSql(selectStatement,[],function(tx,res){
                                 var len = res.rows.length;
                                 
                                 if(len>0)
                                 {
                                 for (var i = 0; i < len; i++)
                                 {
                                 var photoNotesArray = [];
                                 var questionId = "question-"+res.rows.item(i)['id'];
                                 questionIdActualArray.push(res.rows.item(i)['id']);
                                 questionsIdArray.push(questionId);
                                 var questionSubQuestionExists = res.rows.item(i)['sub_question_exists'];
                                 if(questionSubQuestionExists == 0){
                                 questionsWithSubQuestionsArray.push("ui-state-default question-default");
                                 }else if(questionSubQuestionExists == 1){
                                 questionsWithSubQuestionsArray.push("ui-state-default question-default-sub-question");
                                 }
                                 var photo = res.rows.item(i)['photo'];
                                 var notes = res.rows.item(i)['notes'];
                                 photoNotesArray.push(photo);
                                 photoNotesArray.push(notes);
                                 
                                 photoNotesMaterArray.push(photoNotesArray);
                                 questionsTypeArray.push(res.rows.item(i)['question_type']);
                                 var questionString = unescape(res.rows.item(i)['question']);
                                 questionsArray.push(questionString);
                                 var questionOrder = res.rows.item(i)['sort_order'];
                                 questionsSortOrder.push(questionOrder);
                                 }
                                 }
                                 }, function(error) {
                                 console.log('transaction error select: ' + error.message);
                                 });
                   }, function(error) {
                   console.log('transaction error: ' + error.message);
                   },function() {
                   console.log('transaction ok');
                   
                   });
    
    db.transaction(function(tx) {
                   tx.executeSql(selectSectionsStatement,[],function(tx,res){
                                 var len = res.rows.length;
                                 
                                 if(len>0)
                                 {
                                 for (var i = 0; i < len; i++)
                                 {
                                 var questionList = "";
                                 var sectionId = "section-"+res.rows.item(i)['id'];
                                 sectionsIdArray.push(sectionId);
                                 var sectionString = unescape(res.rows.item(i)['section']);
                                 sectionsArray.push(sectionString);
                                 var sectionOrder = res.rows.item(i)['sort_order'];
                                 sectionsSortOrder.push(sectionOrder);
                                 if(res.rows.item(i)['question_list']!=""){
                                 questionList = res.rows.item(i)['question_list'];
                                 }else{
                                 questionList = "empty";
                                 }
                                 sectionsWithQuestions.push(questionList);
                                 }
                                 }
                                 
                                 }, function(error) {
                                 console.log('transaction error select: ' + error.message);
                                 });
                   }, function(error) {
                   console.log('transaction error: ' + error.message);
                   },function() {
                   console.log('transaction ok');
                   
                   //Get questions that do not have an associated section
                   //questionIdActualArray sectionsWithQuestions;
                   
                   
                   var sectionsWithQuestionsString = "";
                   for(var i=0;i<sectionsWithQuestions.length;i++){
                   sectionsWithQuestionsString += sectionsWithQuestions[i]+",";
                   }
                   var  sectionsWithQuestionsStringArray = sectionsWithQuestionsString.split(",");
                   sectionsWithQuestionsStringArray.pop();
                   
                   
                   var sectionsWithQuestionsArray = [];
                   var questionsWithNoSection = [];
                   var sectionWithNoQuestionArray = [];
                   questionsWithNoSection = arr_diff(questionIdActualArray,sectionsWithQuestionsStringArray);
                   var index = questionsWithNoSection.indexOf("empty");
                   if (index > -1) {
                   questionsWithNoSection.splice(index, 1);
                   }
                   //get the sections sort order
                   //check first section and see if it has any questions
                   for(var i=0;i<sectionsWithQuestions.length;i++){
                   for(var j=0;j<questionIdActualArray.length;j++){
                   if(sectionsWithQuestions[i].indexOf(questionIdActualArray[j])!="-1"){
                   sectionsWithQuestionsArray.push(sectionsArray[i]+"||"+questionsIdArray[j]+"||"+questionsArray[j] + "||" + sectionsIdArray[i] + "||" + questionsWithSubQuestionsArray[j] + "||" + questionsTypeArray[j] + "||" + photoNotesMaterArray[j]);
                   }else if(sectionsWithQuestions[i]=="empty"){
                   var str = sectionsArray[i]+ "||" + sectionsIdArray[i];
                   var found = $.inArray(str, sectionWithNoQuestionArray);
                   if (found >= 0) {
                   } else {
                   
                   sectionWithNoQuestionArray.push(str);
                   }
                   
                   }
                   }
                   }
                   
                   for(var i=0;i<sectionsWithQuestions.length;i++){
                   if(sectionsWithQuestions[i]=="empty"){
                   
                   var str = sectionsArray[i]+ "||" + sectionsIdArray[i];
                   var found = $.inArray(str, sectionWithNoQuestionArray);
                   if (found >= 0) {
                   } else {
                   
                   sectionWithNoQuestionArray.push(str);
                   }
                   
                   
                   }
                   }
                   
                   
                   innerHTMLString += "<ul id='unsortableQuestionsStatic'>";
                   var tempQuestionArray = [];
                   var tempQuestionSortArray = [];
                   var tempQuestionSubArray  = [];
                   var tempActualIdArray = [];
                   var tempTypeArray = [];
                   var tempPhotoNotesArray = [];
                   //Questions with no section go first
                   if(questionsWithNoSection.length>0){
                   for(var i=0;i<questionsWithNoSection.length;i++){
                   for(var j=0;j<questionIdActualArray.length;j++){
                   if(questionIdActualArray[j]==questionsWithNoSection[i]){
                   tempActualIdArray.push(questionsWithNoSection[i]);
                   tempQuestionArray.push(questionsArray[j]) ;
                   tempQuestionSortArray.push(questionsSortOrder[j]);
                   tempQuestionSubArray.push(questionsWithSubQuestionsArray[j]);
                   tempTypeArray.push(questionsTypeArray[j]);
                   tempPhotoNotesArray.push(photoNotesMaterArray[j]);
                   }
                   }
                   
                   
                   }
                   var sortedValArray = sortBasedOnAnotherArray(tempQuestionSortArray,tempQuestionArray);
                   var sortedIdArray = sortBasedOnAnotherArray(tempQuestionSortArray,tempActualIdArray);
                   var sortedSubQuestionArray = sortBasedOnAnotherArray(tempQuestionSortArray,tempQuestionSubArray);
                   var sortedTypeArray = sortBasedOnAnotherArray(tempQuestionSortArray,tempTypeArray);
                   var sortedPhotoNotesArray = sortBasedOnAnotherArray(tempQuestionSortArray,tempPhotoNotesArray);
                   
                   for(var l=0;l<sortedValArray.length;l++){
                   if(sortedTypeArray[l]=="YN"){
                   
                   innerHTMLString +=  "<li class='question-YN'  id='question-"+ sortedIdArray[l] +"'>";
                   innerHTMLString += "<div class='question-text-details'>"+sortedValArray[l] + "</div>" ;
                   
                   innerHTMLString += "<div><table class='answer-table'> <tr><td class='answer-style-yes-no'>Yes</td><td class='answer-style-yes-no'>No</td><td class='answer-style-yes-no'>N/A</td></tr></table></div>" ;
                   innerHTMLString += "<div class='quick-capture-middle-audit'><div class='quick-capture-middle-col-audit-photo-notes-"+sortedPhotoNotesArray[l][0]+"'><div class='quick-capture-middle-div-question'><img src='assets/icon_photo_small.png'></div></div><div class='quick-capture-middle-col-audit-photo-notes-"+sortedPhotoNotesArray[l][1]+"'><div class='quick-capture-middle-div-question'><img src='assets/icon_notes_small.png'></div></div></div>";
                   
                   
                   innerHTMLString += "</li>";
                   }else{
                   
                   
                   for(var p=0;p<answerMCQuestionIdArray.length;p++){
                   if(sortedIdArray[l] == answerMCQuestionIdArray[p] ){
                   if(answerMasterArray[p].length == 1){
                   innerHTMLString +=  "<li class='question-MC-one'  id='question-"+ sortedIdArray[l] +"'>";
                   }else if(answerMasterArray[p].length == 2){
                   innerHTMLString +=  "<li class='question-MC-two'  id='question-"+ sortedIdArray[l] +"'>";
                   }else if(answerMasterArray[p].length == 3){
                   innerHTMLString +=  "<li class='question-MC-three'  id='question-"+ sortedIdArray[l] +"'>";
                   }else if(answerMasterArray[p].length == 4){
                   innerHTMLString +=  "<li class='question-MC-four'  id='question-"+ sortedIdArray[l] +"'>";
                   }else if(answerMasterArray[p].length == 5){
                   innerHTMLString +=  "<li class='question-MC-five'  id='question-"+ sortedIdArray[l] +"'>";
                   }
                   innerHTMLString += "<div class='question-text-details'>"+sortedValArray[l] + "</div>" ;
                   
                   
                   innerHTMLString += "<table class='answer-table'>";
                   for (var k=0;k<answerMasterArray[p].length;k++){
                   innerHTMLString += "<tr><td class='answer-style'>"+answerMasterArray[p][k]+"</td></tr>";
                   
                   }
                   }
                   }
                   innerHTMLString += "</table>";
                   innerHTMLString += "<div class='quick-capture-middle-audit'><div class='quick-capture-middle-col-audit-photo-notes-"+sortedPhotoNotesArray[l][0]+"'><div class='quick-capture-middle-div-question'><img src='assets/icon_photo_small.png'></div></div><div class='quick-capture-middle-col-audit-photo-notes-"+sortedPhotoNotesArray[l][1]+"'><div class='quick-capture-middle-div-question'><img src='assets/icon_notes_small.png'></div></div></div>";
                   }
                   
                   }
                   
                   }
                   
                   
                   for(var i=0;i<sectionsWithQuestionsArray.length;i++){
                   if(i==0 ){
                   innerHTMLString +=  "<li class='section-default' id='"+ sectionsWithQuestionsArray[i].split("||")[3]  +"'>";
                   innerHTMLString += sectionsWithQuestionsArray[i].split("||")[0];
                   innerHTMLString += "</li>";
                   
                   }else{
                   if(sectionsWithQuestionsArray[i].split("-")[0] != sectionsWithQuestionsArray[i-1].split("-")[0]){
                   innerHTMLString +=  "<li class='section-default' id='"+ sectionsWithQuestionsArray[i].split("||")[3]  +"'>";
                   innerHTMLString += sectionsWithQuestionsArray[i].split("||")[0];
                   innerHTMLString += "</li>";
                   }
                   }
                   if(sectionsWithQuestionsArray[i].split("||")[5]=="YN"){
                   innerHTMLString +=  "<li class='question-YN'  id='"+ sectionsWithQuestionsArray[i].split("||")[1] +"'>";
                   innerHTMLString += "<div class='question-text-details'>"+sectionsWithQuestionsArray[i].split("||")[2] + "</div>" ;
                   
                   innerHTMLString += "<div><table class='answer-table'> <tr><td class='answer-style-yes-no'>Yes</td><td class='answer-style-yes-no'>No</td><td class='answer-style-yes-no'>N/A</td></tr></table></div>" ;
                   innerHTMLString += "<div class='quick-capture-middle-audit'><div class='quick-capture-middle-col-audit-photo-notes-"+sectionsWithQuestionsArray[i].split("||")[6].split(",")[0]+"'><div class='quick-capture-middle-div-question'><img src='assets/icon_photo_small.png'></div></div><div class='quick-capture-middle-col-audit-photo-notes-"+sectionsWithQuestionsArray[i].split("||")[6].split(",")[1]+"'><div class='quick-capture-middle-div-question'><img src='assets/icon_notes_small.png'></div></div></div>";
                   innerHTMLString += "</li>";
                   }else{
                   // innerHTMLString +=  "<li class='question-MC'  id='"+ sectionsWithQuestionsArray[i].split("||")[1] +"'>";
                   //innerHTMLString += "<div class='question-text-details'>"+sectionsWithQuestionsArray[i].split("||")[2] + "</div>" ;
                   
                   var idC = sectionsWithQuestionsArray[i].split("||")[1];
                   //  innerHTMLString += "<table class='answer-table'>";
                   for(var p=0;p<answerMCQuestionIdArray.length;p++){
                   if(idC.split("-")[1] == answerMCQuestionIdArray[p] ){
                   
                   if(answerMasterArray[p].length == 1){
                   innerHTMLString +=  "<li class='question-MC-one'  id='"+ sectionsWithQuestionsArray[i].split("||")[1] +"'>";
                   }else if(answerMasterArray[p].length == 2){
                   innerHTMLString +=  "<li class='question-MC-two'  id='"+ sectionsWithQuestionsArray[i].split("||")[1] +"'>";
                   }else if(answerMasterArray[p].length == 3){
                   innerHTMLString +=  "<li class='question-MC-three'  id='"+ sectionsWithQuestionsArray[i].split("||")[1] +"'>";
                   }else if(answerMasterArray[p].length == 4){
                   innerHTMLString +=  "<li class='question-MC-four'  id='"+ sectionsWithQuestionsArray[i].split("||")[1] +"'>";
                   }else if(answerMasterArray[p].length == 5){
                   innerHTMLString +=  "<li class='question-MC-five'  id='"+ sectionsWithQuestionsArray[i].split("||")[1] +"'>";
                   }
                   innerHTMLString += "<div class='question-text-details'>"+sectionsWithQuestionsArray[i].split("||")[2] + "</div>" ;
                   
                   
                   innerHTMLString += "<table class='answer-table'>";
                   
                   
                   
                   for (var k=0;k<answerMasterArray[p].length;k++){
                   innerHTMLString += "<tr><td class='answer-style'>"+answerMasterArray[p][k]+"</td></tr>";
                   
                   }
                   }
                   }
                   innerHTMLString += "</table>";
                   innerHTMLString += "<div class='quick-capture-middle-audit'><div class='quick-capture-middle-col-audit-photo-notes-"+sectionsWithQuestionsArray[i].split("||")[6].split(",")[0]+"'><div class='quick-capture-middle-div-question'><img src='assets/icon_photo_small.png'></div></div><div class='quick-capture-middle-col-audit-photo-notes-"+sectionsWithQuestionsArray[i].split("||")[6].split(",")[1]+"'><div class='quick-capture-middle-div-question'><img src='assets/icon_notes_small.png'></div></div></div>";
                   
                   }
                   }
                   
                   if(sectionWithNoQuestionArray.length>0){
                   for(var i=0;i<sectionWithNoQuestionArray.length;i++){
                   innerHTMLString +=  "<li class='section-default' id='"+ sectionWithNoQuestionArray[i].split("||")[1]  +"'>";
                   innerHTMLString += sectionWithNoQuestionArray[i].split("||")[0];
                   innerHTMLString += "</li>";
                   
                   }
                   }
                   innerHTMLString += "</ul>";
                   $("#staticQuestionsAnswersDetails").html(innerHTMLString);
                   $.mobile.navigate("#checklistDetails");
                   //Create sections and editable sections thats hidden
                   
                   
                   });
    
}



var insertIncompleteAudit = function(id,type){
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    
    
    
    var selectQuestionStatement = "Select count(*) as question_count from question_table where checklist_id="+id;
    
    var qCount = -1;
    
    
    db.transaction(function(tx) {
                   tx.executeSql(selectQuestionStatement,[],function(tx,res){
                                 var len = res.rows.length;
                                 
                                 if(len>0)
                                 {
                                 
                                 for (var i = 0; i < len; i++)
                                 {
                                 qCount = res.rows.item(i)['question_count'];
                                 }
                                 }
                                 
                                 }, function(error) {
                                 console.log('transaction error select: ' + error.message);
                                 });
                   }, function(error) {
                   console.log('transaction error: ' + error.message);
                   },function() {
                   console.log('transaction ok');
                   //Reset everything to defaults
                   
                   });
    
    var selectSubQuestionStatement = "Select count(*) as sub_question_count from sub_question_table where checklist_id="+id;
    
    var qSubCount = -1;
    
    
    db.transaction(function(tx) {
                   tx.executeSql(selectSubQuestionStatement,[],function(tx,res){
                                 var len = res.rows.length;
                                 
                                 if(len>0)
                                 {
                                 
                                 for (var i = 0; i < len; i++)
                                 {
                                 qSubCount = res.rows.item(i)['sub_question_count'];
                                 }
                                 }
                                 
                                 }, function(error) {
                                 console.log('transaction error select: ' + error.message);
                                 });
                   }, function(error) {
                   console.log('transaction error: ' + error.message);
                   },function() {
                   console.log('transaction ok');
                   //Reset everything to defaults
                   
                   });
    
    
    
    
    
    var selectStatement = "Select * from picklist_table where id="+id;
    
    var location = $("#searchLocations").val();
    
    db.transaction(function(tx) {
                   tx.executeSql(selectStatement,[],function(tx,res){
                                 var len = res.rows.length;
                                 
                                 if(len>0)
                                 {
                                 
                                 for (var i = 0; i < len; i++)
                                 {
                                 var name = unescape(res.rows.item(i)['picklist_name']);
                                 var description = unescape(res.rows.item(i)['picklist_description']);
                                 var insertStatement = "Insert into audit_table (audit_name, audit_description,checklist_id,location,cdatetime,qno,question_count,actual_question_count,sub_question_count, sub_questions_answered) values ('"+name+"','"+description+"',"+parseInt(id)+",'"+escape(location)+"',"+  new Date().getTime()+ ",0,"+qCount+","+qCount+","+qSubCount+",0)";
                                 db.transaction(function(tx) {
                                                tx.executeSql(insertStatement);
                                                }, function(error) {
                                                console.log('transaction error insert: ' + error.message);
                                                }, function() {
                                                console.log('transaction ok');
                                                $("#searchLocations").val("");
                                                $('#addLocationDetails').css('background', '#8cc63f');
                                                $('#addLocationDetails').css('color', '#ffffff');
                                                $('#checkNow').css('background', '#a3a3a3');
                                                $('#checkNow').css('color', '#808080');
                                                $('#checkLater').css('color', '#808080');
                                                $('#checkLater').css('background', '#a3a3a3');
                                                if(type=="later"){
                                                $.mobile.navigate("#goAudit");
                                                }else{
                                                db.transaction(function(tx) {
                                                               tx.executeSql("select * from audit_table ORDER BY id DESC LIMIT 1;", [], function(tx, res) {
                                                                             var len = res.rows.length;
                                                                             if(len>0)
                                                                             {
                                                                             for (var i = 0; i < len; i++)
                                                                             {
                                                                             auditId = res.rows.item(i)['id'];
                                                                             auditIdSelected = auditId;
                                                                             populateAuditQuestionScreen(res.rows.item(i)['id'],"complete");
                                                                             
                                                                             
                                                                             }
                                                                             }
                                                                             });
                                                               });
                                                
                                                }
                                                });
                                 }
                                 
                                 }
                                 
                                 }, function(error) {
                                 console.log('transaction error select: ' + error.message);
                                 });
                   }, function(error) {
                   console.log('transaction error: ' + error.message);
                   },function() {
                   console.log('transaction ok');
                   
                   });
    
    
};

var updateAuditLocation = function(locationData){
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    var updateLocation = "";
    updateLocation = "Update audit_table set  location =   '"+escape(locationData) +"' where id = "+parseInt(auditIdSelected)+" and checklist_id = "+parseInt(auditCheckListId);
    db.transaction(function(tx) {
                   tx.executeSql(updateLocation);
                   }, function(error) {
                   console.log('transaction error update audit_table: ' + error.message);
                   }, function() {
                   console.log('transaction updateLocation ok');
                   populateAuditQuestionScreen(auditIdSelected,"complete");
                   $("#searchLocations").val("");
                   });

};

var populateAuditQuestionScreen = function(id,type){
    
    $.mobile.navigate("#startAudit");
    
    auditIdSelected = id;
    
    var questionCount = 0;
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    var selectStatement = "select * from audit_table where id="+parseInt(id);
    var checkListId = -1;
    var percentProgress = 0;
    var innerString = "";
    db.transaction(function(tx) {
                   tx.executeSql(selectStatement,[],function(tx,res){
                                 var len = res.rows.length;
                                 
                                 if(len>0)
                                 {
                                 
                                 for (var i = 0; i < len; i++)
                                 {
                                 var auditName = res.rows.item(i)['audit_name'];
                                 var location = res.rows.item(i)['location'];
                                 checkListId = res.rows.item(i)['checklist_id'];
                                 var questionCount = res.rows.item(i)['question_count'];
                                 var qno = res.rows.item(i)['qno'];
                                 if(parseInt(res.rows.item(i)['qno']) == 0 && parseInt(res.rows.item(i)['question_count']) == 0){
                                 percentProgress = 0;
                                 }else{
                                 percentProgress = Math.round((parseInt(qno) * 100)/parseInt(questionCount));
                                 }
                                 innerString += "<div id='startAuditName' class='audit-name-start-audit'>"+unescape(auditName)+"</div>";
                                 innerString += "<div id='startAuditLocation' class='audit-location-start-audit'>"+unescape(location)+"</div>";
                                 // if(parseInt(res.rows.item(i)['qno']) != 0 && parseInt(res.rows.item(i)['question_count']) != 0){
                                 innerString += "<div id='startAuditProgressbar' class='progressbar-start-audit'></div>";
                                 //}
                                 innerString += "<div id='startAuditQuestionCount' class='question-count-start-audit'>"+qno + " of " + questionCount+"</div>";
                                 innerString += "<div id='deleteAudit' class='delete-audit'>Delete Audit</div>";
                                 $("#auditHeader").html(innerString);
                                 /////
                                 $("<input>").appendTo("#startAuditProgressbar").attr({"name":"sliderCheck","id":"sliderCheck","data-highlight":"true","min":"0","max":"100","value":percentProgress,"type":"range"}).slider({
                                                                                                                                                                                                                             create: function( event, ui ) {
                                                                                                                                                                                                                             $(this).parent().find('input').hide();
                                                                                                                                                                                                                             $(this).parent().find('input').css('margin-left','-9999px'); // Fix for some FF versions
                                                                                                                                                                                                                             $(this).parent().find('.ui-slider-track').css('margin','0 15px 0 15px').css('pointer-events','none');
                                                                                                                                                                                                                             $(this).parent().find('.ui-slider-handle').hide();
                                                                                                                                                                                                                             
                                                                                                                                                                                                                             if(percentProgress > -1 && percentProgress <= 30){
                                                                                                                                                                                                                             $(this).closest(".ui-slider").find(".ui-slider-bg").css("background-color", "#cc0000" );
                                                                                                                                                                                                                             }else if(percentProgress > 30 && percentProgress<= 60){
                                                                                                                                                                                                                             $(this).closest(".ui-slider").find(".ui-slider-bg").css("background-color", "#ffff7f");
                                                                                                                                                                                                                             }else if(percentProgress > 60){
                                                                                                                                                                                                                             $(this).closest(".ui-slider").find(".ui-slider-bg").css("background-color", "#8cc63f" );
                                                                                                                                                                                                                             }
                                                                                                                                                                                                                             }
                                                                                                                                                                                                                             }).slider("refresh");
                                 ////
                                 
                                 
                                 }
                                 }
                                 
                                 }, function(error) {
                                 console.log('transaction error select: ' + error.message);
                                 });
                   }, function(error) {
                   console.log('transaction error: ' + error.message);
                   },function() {
                   console.log('transaction ok');
                   
                   /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                   
                   
                   
                   auditCheckListId = checkListId;
                   
                   var innerHTMLString = "";
                   
                   var innerSectionsHTMLString = "";
                   
                   
                   var selectQuestionStatement = "Select * from question_table where checklist_id= "+ checkListId +" order by sort_order asc";
                   
                   var selectSectionsStatement = "Select * from section_table where checklist_id= "+ checkListId +" order by sort_order asc";
                   
                   var selectMCAnswerStatement = "Select * from answer_mc_table where checklist_id= "+ checkListId ;
                   
                   var selectChecklist = "Select * from picklist_table where id = "+ checkListId;
                   
                   var selectSubQuestions = "Select * from sub_question_table where checklist_id = "+ checkListId;
                   
                   var selectAuditAnswers = "Select * from audit_answer_table where audit_id="+parseInt(id)+" and checklist_id="+checkListId;
                   
                   var selectYNAnswers = "Select * from answer_yn_table where checklist_id= "+ checkListId ;
                   
                   var questionsArray = [];
                   var questionsIdArray = [];
                   var sectionsArray = [];
                   var sectionsIdArray = [];
                   var questionsTypeArray = [];
                   var questionsSortOrder = [];
                   var sectionsSortOrder = [];
                   var sectionsWithQuestions = [];
                   var questionIdActualArray = [];
                   var questionsWithSubQuestionsArray = [];
                   var answerMCQuestionIdArray = [];
                   var CAMCQuestionArray = [];
                   var photoNotesMaterArray = [];
                   var auditAnswersArray = [];
                   var subQuestionsArray = [];
                   var subQuestionResponseArray = [];
                   var answerYNArray = [];
                   
                   
                   
                   var answerMasterArray = [];
                   var answerMCArray = [];
                   
                   
                   
                   db.transaction(function(tx) {
                                  tx.executeSql(selectYNAnswers,[],function(tx,res){
                                                var len = res.rows.length;
                                                
                                                if(len>0)
                                                {
                                                for (var i = 0; i < len; i++)
                                                {
                                                
                                                answerYNArray.push(res.rows.item(i)['question_id']);
                                                answerYNArray.push(res.rows.item(i)['corrective_action']);
                                                
                                                //  auditAnswersArray.push(individualAnswerArray);
                                                
                                                }
                                                }
                                                }, function(error) {
                                                console.log('transaction error select: ' + error.message);
                                                });
                                  }, function(error) {
                                  console.log('transaction error: ' + error.message);
                                  },function() {
                                  console.log('transaction ok');
                                  
                                  });
                   
                   
                   
                   db.transaction(function(tx) {
                                  tx.executeSql(selectAuditAnswers,[],function(tx,res){
                                                var len = res.rows.length;
                                                
                                                if(len>0)
                                                {
                                                for (var i = 0; i < len; i++)
                                                {
                                                
                                                auditAnswersArray.push(res.rows.item(i)['question_id']);
                                                auditAnswersArray.push(res.rows.item(i)['question']);
                                                auditAnswersArray.push(unescape(res.rows.item(i)['answer']));
                                                if(res.rows.item(i)['photo']!=""){
                                                auditAnswersArray.push("photoExists");
                                                }else{
                                                auditAnswersArray.push("photoNotExists");
                                                }
                                                if(res.rows.item(i)['notes']!=""){
                                                auditAnswersArray.push("notesExists");
                                                }else{
                                                auditAnswersArray.push("notesNotExists");
                                                }
                                                auditAnswersArray.push(unescape(res.rows.item(i)['corrective_action']));
                                                //  auditAnswersArray.push(individualAnswerArray);
                                                
                                                }
                                                }
                                                }, function(error) {
                                                console.log('transaction error select: ' + error.message);
                                                });
                                  }, function(error) {
                                  console.log('transaction error: ' + error.message);
                                  },function() {
                                  console.log('transaction ok');
                                  
                                  });
                   
                   db.transaction(function(tx) {
                                  tx.executeSql(selectSubQuestions,[],function(tx,res){
                                                var len = res.rows.length;
                                                
                                                if(len>0)
                                                {
                                                for (var i = 0; i < len; i++)
                                                {
                                                
                                                subQuestionsArray.push(res.rows.item(i)['parent_id']);
                                                subQuestionsArray.push(res.rows.item(i)['question']);
                                                subQuestionsArray.push(res.rows.item(i)['question_id']);
                                                subQuestionsArray.push(res.rows.item(i)['question_type']);
                                                if(res.rows.item(i)['photo']=="active"){
                                                subQuestionsArray.push("active");
                                                }else{
                                                subQuestionsArray.push("inactive");
                                                }
                                                if(res.rows.item(i)['notes']=="active"){
                                                subQuestionsArray.push("active");
                                                }else{
                                                subQuestionsArray.push("inactive");
                                                }
                                                subQuestionsArray.push(res.rows.item(i)['corrective_action']);
                                                //  auditAnswersArray.push(individualAnswerArray);
                                                
                                                }
                                                }
                                                }, function(error) {
                                                console.log('transaction error select: ' + error.message);
                                                });
                                  }, function(error) {
                                  console.log('transaction error: ' + error.message);
                                  },function() {
                                  console.log('transaction ok');
                                  
                                  });
                   
                   
                   db.transaction(function(tx) {
                                  tx.executeSql(selectMCAnswerStatement,[],function(tx,res){
                                                var len = res.rows.length;
                                                
                                                if(len>0)
                                                {
                                                for (var i = 0; i < len; i++)
                                                {
                                                answerMCQuestionIdArray.push(res.rows.item(i)['question_id']);
                                                answerMCArray.push(res.rows.item(i)['question_id']);
                                                answerMCArray.push(res.rows.item(i)['corrective_action']);
                                                var answerArray = [];
                                                var answer1 = res.rows.item(i)['answer1'];
                                                if(answer1!==""){
                                                answerArray.push(unescape(answer1));
                                                }
                                                
                                                var answer2 = res.rows.item(i)['answer2'];
                                                if(answer2!==""){
                                                answerArray.push(unescape(answer2));
                                                }
                                                var answer3 = res.rows.item(i)['answer3'];
                                                if(answer3!==""){
                                                answerArray.push(unescape(answer3));
                                                }
                                                var answer4 = res.rows.item(i)['answer4'];
                                                if(answer4!==""){
                                                answerArray.push(unescape(answer4));
                                                }
                                                var answer5 = res.rows.item(i)['answer5'];
                                                if(answer5!==""){
                                                answerArray.push(unescape(answer5));
                                                }
                                                answerMasterArray.push(answerArray);
                                                }
                                                }
                                                }, function(error) {
                                                console.log('transaction error select: ' + error.message);
                                                });
                                  }, function(error) {
                                  console.log('transaction error: ' + error.message);
                                  },function() {
                                  console.log('transaction ok');
                                  
                                  });
                   
                   
                   
                   db.transaction(function(tx) {
                                  tx.executeSql(selectQuestionStatement,[],function(tx,res){
                                                var len = res.rows.length;
                                                
                                                if(len>0)
                                                {
                                                for (var i = 0; i < len; i++)
                                                {
                                                var photoNotesArray = [];
                                                var questionId = "question-"+res.rows.item(i)['id'];
                                                questionIdActualArray.push(res.rows.item(i)['id']);
                                                questionsIdArray.push(questionId);
                                                var questionSubQuestionExists = res.rows.item(i)['sub_question_exists'];
                                                if(questionSubQuestionExists == 0){
                                                questionsWithSubQuestionsArray.push("notExists");
                                                }else if(questionSubQuestionExists == 1){
                                                questionsWithSubQuestionsArray.push("exists");
                                                }
                                                var photo = res.rows.item(i)['photo'];
                                                var notes = res.rows.item(i)['notes'];
                                                if(res.rows.item(i)['sub_question_response'] == ""){
                                                subQuestionResponseArray.push("-----0-----");
                                                }else{
                                                subQuestionResponseArray.push(res.rows.item(i)['sub_question_response']);
                                                }
                                                photoNotesArray.push(photo);
                                                photoNotesArray.push(notes);
                                                
                                                photoNotesMaterArray.push(photoNotesArray);
                                                questionsTypeArray.push(res.rows.item(i)['question_type']);
                                                var questionString = unescape(res.rows.item(i)['question']);
                                                questionsArray.push(questionString);
                                                var questionOrder = res.rows.item(i)['sort_order'];
                                                questionsSortOrder.push(questionOrder);
                                                }
                                                }
                                                }, function(error) {
                                                console.log('transaction error select: ' + error.message);
                                                });
                                  }, function(error) {
                                  console.log('transaction error: ' + error.message);
                                  },function() {
                                  console.log('transaction ok');
                                  
                                  });
                   
                   db.transaction(function(tx) {
                                  tx.executeSql(selectSectionsStatement,[],function(tx,res){
                                                var len = res.rows.length;
                                                
                                                if(len>0)
                                                {
                                                for (var i = 0; i < len; i++)
                                                {
                                                var questionList = "";
                                                var sectionId = "section-"+res.rows.item(i)['id'];
                                                sectionsIdArray.push(sectionId);
                                                var sectionString = unescape(res.rows.item(i)['section']);
                                                sectionsArray.push(sectionString);
                                                var sectionOrder = res.rows.item(i)['sort_order'];
                                                sectionsSortOrder.push(sectionOrder);
                                                if(res.rows.item(i)['question_list']!=""){
                                                questionList = res.rows.item(i)['question_list'];
                                                }else{
                                                questionList = "empty";
                                                }
                                                sectionsWithQuestions.push(questionList);
                                                }
                                                }
                                                
                                                }, function(error) {
                                                console.log('transaction error select: ' + error.message);
                                                });
                                  }, function(error) {
                                  console.log('transaction error: ' + error.message);
                                  },function() {
                                  console.log('transaction ok');
                                  
                                  //Get questions that do not have an associated section
                                  //questionIdActualArray sectionsWithQuestions;
                                  
                                  
                                  var sectionsWithQuestionsString = "";
                                  for(var i=0;i<sectionsWithQuestions.length;i++){
                                  sectionsWithQuestionsString += sectionsWithQuestions[i]+",";
                                  }
                                  var  sectionsWithQuestionsStringArray = sectionsWithQuestionsString.split(",");
                                  sectionsWithQuestionsStringArray.pop();
                                  
                                  
                                  var sectionsWithQuestionsArray = [];
                                  var questionsWithNoSection = [];
                                  var sectionWithNoQuestionArray = [];
                                  questionsWithNoSection = arr_diff(questionIdActualArray,sectionsWithQuestionsStringArray);
                                  var index = questionsWithNoSection.indexOf("empty");
                                  if (index > -1) {
                                  questionsWithNoSection.splice(index, 1);
                                  }
                                  //get the sections sort order
                                  //check first section and see if it has any questions
                                  for(var i=0;i<sectionsWithQuestions.length;i++){
                                  for(var j=0;j<questionIdActualArray.length;j++){
                                  if(sectionsWithQuestions[i].indexOf(questionIdActualArray[j])!="-1"){
                                  sectionsWithQuestionsArray.push(sectionsArray[i]+"||"+questionsIdArray[j]+"||"+questionsArray[j] + "||" + sectionsIdArray[i] + "||" + questionsWithSubQuestionsArray[j] + "||" + questionsTypeArray[j] + "||" + photoNotesMaterArray[j] + "||" + subQuestionResponseArray[j]);
                                  }else if(sectionsWithQuestions[i]=="empty"){
                                  var str = sectionsArray[i]+ "||" + sectionsIdArray[i];
                                  var found = $.inArray(str, sectionWithNoQuestionArray);
                                  if (found >= 0) {
                                  } else {
                                  
                                  sectionWithNoQuestionArray.push(str);
                                  }
                                  
                                  }
                                  }
                                  }
                                  
                                  for(var i=0;i<sectionsWithQuestions.length;i++){
                                  if(sectionsWithQuestions[i]=="empty"){
                                  
                                  var str = sectionsArray[i]+ "||" + sectionsIdArray[i];
                                  var found = $.inArray(str, sectionWithNoQuestionArray);
                                  if (found >= 0) {
                                  } else {
                                  
                                  sectionWithNoQuestionArray.push(str);
                                  }
                                  
                                  
                                  }
                                  }
                                  
                                  
                                  innerHTMLString += "<ul class='unsortable-audit-class' id='unsortableQuestionsStatic'>";
                                  var tempQuestionArray = [];
                                  var tempQuestionSortArray = [];
                                  var tempQuestionSubArray  = [];
                                  var tempActualIdArray = [];
                                  var tempTypeArray = [];
                                  var tempPhotoNotesArray = [];
                                  var tempSubQuestionResponseArray = [];
                                  //Questions with no section go first
                                  if(questionsWithNoSection.length>0){
                                  for(var i=0;i<questionsWithNoSection.length;i++){
                                  for(var j=0;j<questionIdActualArray.length;j++){
                                  if(questionIdActualArray[j]==questionsWithNoSection[i]){
                                  tempActualIdArray.push(questionsWithNoSection[i]);
                                  tempQuestionArray.push(questionsArray[j]) ;
                                  tempQuestionSortArray.push(questionsSortOrder[j]);
                                  tempQuestionSubArray.push(questionsWithSubQuestionsArray[j]);
                                  tempTypeArray.push(questionsTypeArray[j]);
                                  tempPhotoNotesArray.push(photoNotesMaterArray[j]);
                                  tempSubQuestionResponseArray.push(subQuestionResponseArray[j]);
                                  }
                                  }
                                  
                                  
                                  }
                                  var sortedValArray = sortBasedOnAnotherArray(tempQuestionSortArray,tempQuestionArray);
                                  var sortedIdArray = sortBasedOnAnotherArray(tempQuestionSortArray,tempActualIdArray);
                                  var sortedSubQuestionArray = sortBasedOnAnotherArray(tempQuestionSortArray,tempQuestionSubArray);
                                  var sortedTypeArray = sortBasedOnAnotherArray(tempQuestionSortArray,tempTypeArray);
                                  var sortedPhotoNotesArray = sortBasedOnAnotherArray(tempQuestionSortArray,tempPhotoNotesArray);
                                  var sortedsubQuestionResponseArray = sortBasedOnAnotherArray(tempQuestionSortArray,tempSubQuestionResponseArray);
                                  
                                  for(var l=0;l<sortedValArray.length;l++){
                                  
                                  var middleAuditId = "qcmdDiv-"+ sortedValArray[l];
                                  if(sortedTypeArray[l]=="YN" && checkCompletionTypeSelected(sortedIdArray[l],auditAnswersArray,type)){
                                  
                                  innerHTMLString +=  "<li class='"+getLiYNClass(sortedIdArray[l],auditAnswersArray,answerYNArray)+"'  id='question-"+ sortedIdArray[l] +"'>";
                                  innerHTMLString += "<div class='question-text-details'>"+sortedValArray[l] + "</div>" ;
                                  
                                  
                                  
                                  innerHTMLString += "<div><table class='answer-table'> <tr><td class='"+getAuditClass(sortedIdArray[l],'Yes',auditAnswersArray)+"'>Yes</td><td class='"+getAuditClass(sortedIdArray[l],'No',auditAnswersArray)+"'>No</td><td class='"+getAuditClass(sortedIdArray[l],'N/A',auditAnswersArray)+"'>N/A</td></tr></table></div>" ;
                                  //                                  innerHTMLString += "<div class='quick-capture-middle-audit'><div class='quick-capture-middle-col-audit-photo-notes-"+sortedPhotoNotesArray[l][0]+"'><div class='quick-capture-middle-div-question'><img src='assets/icon_photo_small.png'></div></div><div class='quick-capture-middle-col-audit-photo-notes-"+sortedPhotoNotesArray[l][1]+"'><div class='quick-capture-middle-div-question'><img src='assets/icon_notes_small.png'></div></div></div>";
                                  if(sortedPhotoNotesArray[l][0] == "active" && sortedPhotoNotesArray[l][1]=="inactive"){
                                  innerHTMLString += "<div id='"+middleAuditId+"' class='quick-capture-middle-audit'><div class='"+getPhotoClass(sortedIdArray[l],auditAnswersArray)+"'><div class='quick-capture-middle-div-question-photo'><img class='audit-image-class' src='assets/icon_photo_small.png'></div></div></div>";
                                  }else if(sortedPhotoNotesArray[l][0] == "inactive" && sortedPhotoNotesArray[l][1]=="active"){
                                  innerHTMLString += "<div id='"+middleAuditId+"' class='quick-capture-middle-audit'><div class='"+getNotesClass(sortedIdArray[l],auditAnswersArray)+"'><div class='quick-capture-middle-div-question-notes'><img class='audit-image-class' src='assets/icon_notes_small.png'></div></div></div>";
                                  }else if(sortedPhotoNotesArray[l][0] == "active" && sortedPhotoNotesArray[l][1]=="active"){
                                  innerHTMLString += "<div id='"+middleAuditId+"' class='quick-capture-middle-audit'><div class='"+getPhotoClass(sortedIdArray[l],auditAnswersArray)+"'><div class='quick-capture-middle-div-question-photo'><img class='audit-image-class' src='assets/icon_photo_small.png'></div></div><div class='"+getNotesClass(sortedIdArray[l],auditAnswersArray)+"'><div class='quick-capture-middle-div-question-notes'><img class='audit-image-class' src='assets/icon_notes_small.png'></div></div></div>";
                                  }
                                  innerHTMLString += getLiYNCADiv(sortedIdArray[l],auditAnswersArray,answerYNArray);
                                  innerHTMLString += "</li>";
                                  innerHTMLString += checkIfSubQuestionExists(sortedIdArray[l],subQuestionsArray,auditAnswersArray,answerMasterArray,answerMCQuestionIdArray,sortedsubQuestionResponseArray[l],answerYNArray,type);
                                  }else if(checkCompletionTypeSelected(sortedIdArray[l],auditAnswersArray,type)){
                                  
                                  
                                  for(var p=0;p<answerMCQuestionIdArray.length;p++){
                                  if(sortedIdArray[l] == answerMCQuestionIdArray[p] ){
                                  if(answerMasterArray[p].length == 1){
                                  var text = "question-MC-one";
                                  innerHTMLString +=  "<li class='"+getLiMCClass(sortedIdArray[l],auditAnswersArray,answerMCArray,text)+ "' id='question-"+ sortedIdArray[l] +"'>";
                                  }else if(answerMasterArray[p].length == 2){
                                  var text = "question-MC-two";
                                  innerHTMLString +=  "<li class='"+getLiMCClass(sortedIdArray[l],auditAnswersArray,answerMCArray,text)+ "' id='question-"+ sortedIdArray[l] +"'>";
                                  }else if(answerMasterArray[p].length == 3){
                                  var text = "question-MC-three";
                                  innerHTMLString +=  "<li class='"+getLiMCClass(sortedIdArray[l],auditAnswersArray,answerMCArray,text)+ "' id='question-"+ sortedIdArray[l] +"'>";
                                  }else if(answerMasterArray[p].length == 4){
                                  var text = "question-MC-four";
                                  innerHTMLString +=  "<li class='"+getLiMCClass(sortedIdArray[l],auditAnswersArray,answerMCArray,text)+ "' id='question-"+ sortedIdArray[l] +"'>";
                                  }else if(answerMasterArray[p].length == 5){
                                  var text = "question-MC-five";
                                  innerHTMLString +=  "<li class='"+getLiMCClass(sortedIdArray[l],auditAnswersArray,answerMCArray,text)+ "' id='question-"+ sortedIdArray[l] +"'>";
                                  }
                                  innerHTMLString += "<div class='question-text-details'>"+sortedValArray[l] + "</div>" ;
                                  
                                  
                                  innerHTMLString += "<div><table class='answer-table'>";
                                  for (var k=0;k<answerMasterArray[p].length;k++){
                                  innerHTMLString += "<tr><td class='"+getMCAuditAnswer(sortedIdArray[l],answerMasterArray[p][k],auditAnswersArray)+"'>"+answerMasterArray[p][k]+"</td></tr>";
                                  
                                  }
                                  }
                                  }
                                  innerHTMLString += "</table></div>";
                                  
                                  //                                  innerHTMLString += "<div class='quick-capture-middle-audit'><div class='quick-capture-middle-col-audit-photo-notes-"+sortedPhotoNotesArray[l][0]+"'><div class='quick-capture-middle-div-question'><img src='assets/icon_photo_small.png'></div></div><div class='quick-capture-middle-col-audit-photo-notes-"+sortedPhotoNotesArray[l][1]+"'><div class='quick-capture-middle-div-question'><img src='assets/icon_notes_small.png'></div></div></div>";
                                  
                                  if(sortedPhotoNotesArray[l][0] == "active" && sortedPhotoNotesArray[l][1]=="inactive"){
                                  innerHTMLString += "<div id='"+middleAuditId+"' class='quick-capture-middle-audit'><div class='"+getPhotoClass(sortedIdArray[l],auditAnswersArray)+"'><div class='quick-capture-middle-div-question-photo'><img class='audit-image-class' src='assets/icon_photo_small.png'></div></div></div>";
                                  }else if(sortedPhotoNotesArray[l][0] == "inactive" && sortedPhotoNotesArray[l][1]=="active"){
                                  innerHTMLString += "<div id='"+middleAuditId+"' class='quick-capture-middle-audit'><div class='"+getNotesClass(sortedIdArray[l],auditAnswersArray)+"'><div class='quick-capture-middle-div-question-notes'><img class='audit-image-class' src='assets/icon_notes_small.png'></div></div></div>";
                                  }else if(sortedPhotoNotesArray[l][0] == "active" && sortedPhotoNotesArray[l][1]=="active"){
                                  innerHTMLString += "<div id='"+middleAuditId+"' class='quick-capture-middle-audit'><div class='"+getPhotoClass(sortedIdArray[l],auditAnswersArray)+"'><div class='quick-capture-middle-div-question-photo'><img class='audit-image-class' src='assets/icon_photo_small.png'></div></div><div class='"+getNotesClass(sortedIdArray[l],auditAnswersArray)+"'><div class='quick-capture-middle-div-question-notes'><img class='audit-image-class' src='assets/icon_notes_small.png'></div></div></div>";
                                  }
                                  
                                  innerHTMLString += getLiMCCADiv(sortedIdArray[l],auditAnswersArray,answerMCArray);
                                  
                                  innerHTMLString += "</li>";
                                  innerHTMLString += checkIfSubQuestionExists(sortedIdArray[l],subQuestionsArray,auditAnswersArray,answerMasterArray,answerMCQuestionIdArray,sortedsubQuestionResponseArray[l],answerMCArray,type);
                                  
                                  }
                                  
                                  
                                  }
                                  
                                  }
                                  
                                  
                                  for(var i=0;i<sectionsWithQuestionsArray.length;i++){
                                  if(i==0 ){
                                  innerHTMLString +=  "<li class='section-default' id='"+ sectionsWithQuestionsArray[i].split("||")[3]  +"'>";
                                  innerHTMLString += sectionsWithQuestionsArray[i].split("||")[0];
                                  innerHTMLString += "</li>";
                                  
                                  }else{
                                  if(sectionsWithQuestionsArray[i].split("-")[0] != sectionsWithQuestionsArray[i-1].split("-")[0]){
                                  innerHTMLString +=  "<li class='section-default' id='"+ sectionsWithQuestionsArray[i].split("||")[3]  +"'>";
                                  innerHTMLString += sectionsWithQuestionsArray[i].split("||")[0];
                                  innerHTMLString += "</li>";
                                  }
                                  }
                                  var middleAuditId = "qcmdDiv-"+ sectionsWithQuestionsArray[i].split("||")[1].split("-")[1];
                                  if(sectionsWithQuestionsArray[i].split("||")[5]=="YN" && checkCompletionTypeSelected(sectionsWithQuestionsArray[i].split("||")[1].split("-")[1],auditAnswersArray,type)){
                                  
                                  innerHTMLString +=  "<li class='"+getLiYNClass(sectionsWithQuestionsArray[i].split("||")[1].split("-")[1],auditAnswersArray,answerYNArray)+"'   id='"+ sectionsWithQuestionsArray[i].split("||")[1] +"'>";
                                  innerHTMLString += "<div class='question-text-details'>"+sectionsWithQuestionsArray[i].split("||")[2] + "</div>" ;
                                  
                                  innerHTMLString += "<div><table class='answer-table'> <tr><td class='"+getAuditClass(sectionsWithQuestionsArray[i].split("||")[1].split("-")[1],'Yes',auditAnswersArray)+"'>Yes</td><td class='"+getAuditClass(sectionsWithQuestionsArray[i].split("||")[1].split("-")[1],'No',auditAnswersArray)+"'>No</td><td class='"+getAuditClass(sectionsWithQuestionsArray[i].split("||")[1].split("-")[1],'N/A',auditAnswersArray)+"'>N/A</td></tr></table></div>" ;
                                  
                                  
                                  if(sectionsWithQuestionsArray[i].split("||")[6].split(",")[0] == "active" && sectionsWithQuestionsArray[i].split("||")[6].split(",")[1]=="inactive"){
                                  innerHTMLString += "<div id='"+middleAuditId+"' class='quick-capture-middle-audit'><div class='"+getPhotoClass(sectionsWithQuestionsArray[i].split("||")[1].split("-")[1],auditAnswersArray)+"'><div class='quick-capture-middle-div-question-photo'><img class='audit-image-class' src='assets/icon_photo_small.png'></div></div></div>";
                                  }else if(sectionsWithQuestionsArray[i].split("||")[6].split(",")[0] == "inactive" && sectionsWithQuestionsArray[i].split("||")[6].split(",")[1]=="active"){
                                  innerHTMLString += "<div id='"+middleAuditId+"' class='quick-capture-middle-audit'><div class='"+getNotesClass(sectionsWithQuestionsArray[i].split("||")[1].split("-")[1],auditAnswersArray)+"'><div class='quick-capture-middle-div-question-notes'><img class='audit-image-class' src='assets/icon_notes_small.png'></div></div></div>";
                                  }else if(sectionsWithQuestionsArray[i].split("||")[6].split(",")[0] == "active" && sectionsWithQuestionsArray[i].split("||")[6].split(",")[1]=="active"){
                                  innerHTMLString += "<div id='"+middleAuditId+"' class='quick-capture-middle-audit'><div class='"+getPhotoClass(sectionsWithQuestionsArray[i].split("||")[1].split("-")[1],auditAnswersArray)+"'><div class='quick-capture-middle-div-question-photo'><img class='audit-image-class' src='assets/icon_photo_small.png'></div></div><div class='"+getNotesClass(sectionsWithQuestionsArray[i].split("||")[1].split("-")[1],auditAnswersArray)+"'><div class='quick-capture-middle-div-question-notes'><img class='audit-image-class' src='assets/icon_notes_small.png'></div></div></div>";
                                  }
                                  
                                  innerHTMLString += getLiYNCADiv(sectionsWithQuestionsArray[i].split("||")[1].split("-")[1],auditAnswersArray,answerYNArray);
                                  innerHTMLString += "</li>";
                                  innerHTMLString += checkIfSubQuestionExists(sectionsWithQuestionsArray[i].split("||")[1].split("-")[1],subQuestionsArray,auditAnswersArray,answerMasterArray,answerMCQuestionIdArray,sectionsWithQuestionsArray[i].split("||")[7],answerYNArray,type);
                                  }else if (checkCompletionTypeSelected(sectionsWithQuestionsArray[i].split("||")[1].split("-")[1],auditAnswersArray,type)){
                                  // innerHTMLString +=  "<li class='question-MC'  id='"+ sectionsWithQuestionsArray[i].split("||")[1] +"'>";
                                  //innerHTMLString += "<div class='question-text-details'>"+sectionsWithQuestionsArray[i].split("||")[2] + "</div>" ;
                                  
                                  var idC = sectionsWithQuestionsArray[i].split("||")[1];
                                  //  innerHTMLString += "<table class='answer-table'>";
                                  for(var p=0;p<answerMCQuestionIdArray.length;p++){
                                  if(idC.split("-")[1] == answerMCQuestionIdArray[p] ){
                                  
                                  if(answerMasterArray[p].length == 1){
                                  var text = "question-MC-one";
                                  innerHTMLString +=  "<li class='"+getLiMCClass(sectionsWithQuestionsArray[i].split("||")[1].split("-")[1],auditAnswersArray,answerMCArray,text)+ "' id='"+ sectionsWithQuestionsArray[i].split("||")[1] +"'>";
                                  }else if(answerMasterArray[p].length == 2){
                                  var text = "question-MC-two";
                                  innerHTMLString +=  "<li class='"+getLiMCClass(sectionsWithQuestionsArray[i].split("||")[1].split("-")[1],auditAnswersArray,answerMCArray,text)+ "' id='"+ sectionsWithQuestionsArray[i].split("||")[1] +"'>";
                                  }else if(answerMasterArray[p].length == 3){
                                  var text = "question-MC-three";
                                  innerHTMLString +=  "<li class='"+getLiMCClass(sectionsWithQuestionsArray[i].split("||")[1].split("-")[1],auditAnswersArray,answerMCArray,text)+ "' id='"+ sectionsWithQuestionsArray[i].split("||")[1] +"'>";
                                  }else if(answerMasterArray[p].length == 4){
                                  var text = "question-MC-four";
                                  innerHTMLString +=  "<li class='"+getLiMCClass(sectionsWithQuestionsArray[i].split("||")[1].split("-")[1],auditAnswersArray,answerMCArray,text)+ "' id='"+ sectionsWithQuestionsArray[i].split("||")[1] +"'>";
                                  }else if(answerMasterArray[p].length == 5){
                                  var text = "question-MC-five";
                                  innerHTMLString +=  "<li class='"+getLiMCClass(sectionsWithQuestionsArray[i].split("||")[1].split("-")[1],auditAnswersArray,answerMCArray,text)+ "' id='"+ sectionsWithQuestionsArray[i].split("||")[1] +"'>";
                                  }
                                  
                                  innerHTMLString += "<div class='question-text-details'>"+sectionsWithQuestionsArray[i].split("||")[2] + "</div>" ;
                                  
                                  
                                  innerHTMLString += "<div><table class='answer-table'>";
                                  
                                  
                                  
                                  for (var k=0;k<answerMasterArray[p].length;k++){
                                  innerHTMLString += "<tr><td class='"+getMCAuditAnswer(sectionsWithQuestionsArray[i].split("||")[1].split("-")[1],answerMasterArray[p][k],auditAnswersArray)+"'>"+answerMasterArray[p][k]+"</td></tr>";
                                  
                                  }
                                  }
                                  }
                                  innerHTMLString += "</table></div>";
                                  //                                  innerHTMLString += "<div class='quick-capture-middle-audit'><div class='quick-capture-middle-col-audit-photo-notes-"+sectionsWithQuestionsArray[i].split("||")[6].split(",")[0]+"'><div class='quick-capture-middle-div-question'><img src='assets/icon_photo_small.png'></div></div><div class='quick-capture-middle-col-audit-photo-notes-"+sectionsWithQuestionsArray[i].split("||")[6].split(",")[1]+"'><div class='quick-capture-middle-div-question'><img src='assets/icon_notes_small.png'></div></div></div>";
                                  if(sectionsWithQuestionsArray[i].split("||")[6].split(",")[0] == "active" && sectionsWithQuestionsArray[i].split("||")[6].split(",")[1]=="inactive"){
                                  innerHTMLString += "<div id='"+middleAuditId+"' class='quick-capture-middle-audit'><div class='"+getPhotoClass(sectionsWithQuestionsArray[i].split("||")[1].split("-")[1],auditAnswersArray)+"'><div class='quick-capture-middle-div-question-photo'><img class='audit-image-class' src='assets/icon_photo_small.png'></div></div></div>";
                                  }else if(sectionsWithQuestionsArray[i].split("||")[6].split(",")[0] == "inactive" && sectionsWithQuestionsArray[i].split("||")[6].split(",")[1]=="active"){
                                  innerHTMLString += "<div id='"+middleAuditId+"' class='quick-capture-middle-audit'><div class='"+getNotesClass(sectionsWithQuestionsArray[i].split("||")[1].split("-")[1],auditAnswersArray)+"'><div class='quick-capture-middle-div-question-notes'><img class='audit-image-class' src='assets/icon_notes_small.png'></div></div></div>";
                                  }else if(sectionsWithQuestionsArray[i].split("||")[6].split(",")[0] == "active" && sectionsWithQuestionsArray[i].split("||")[6].split(",")[1]=="active"){
                                  innerHTMLString += "<div id='"+middleAuditId+"' class='quick-capture-middle-audit'><div class='"+getPhotoClass(sectionsWithQuestionsArray[i].split("||")[1].split("-")[1],auditAnswersArray)+"'><div class='quick-capture-middle-div-question-photo'><img class='audit-image-class' src='assets/icon_photo_small.png'></div></div><div class='"+getNotesClass(sectionsWithQuestionsArray[i].split("||")[1].split("-")[1],auditAnswersArray)+"'><div class='quick-capture-middle-div-question-notes'><img class='audit-image-class' src='assets/icon_notes_small.png'></div></div></div>";
                                  }
                                  innerHTMLString += getLiMCCADiv(sectionsWithQuestionsArray[i].split("||")[1].split("-")[1],auditAnswersArray,answerMCArray);
                                  innerHTMLString += "</li>";
                                  innerHTMLString += checkIfSubQuestionExists(sectionsWithQuestionsArray[i].split("||")[1].split("-")[1],subQuestionsArray,auditAnswersArray,answerMasterArray,answerMCQuestionIdArray,sectionsWithQuestionsArray[i].split("||")[7],answerMCArray,type);
                                  }
                                  }
                                  
                                  if(sectionWithNoQuestionArray.length>0){
                                  for(var i=0;i<sectionWithNoQuestionArray.length;i++){
                                  innerHTMLString +=  "<li class='section-default' id='"+ sectionWithNoQuestionArray[i].split("||")[1]  +"'>";
                                  innerHTMLString += sectionWithNoQuestionArray[i].split("||")[0];
                                  innerHTMLString += "</li>";
                                  
                                  }
                                  }
                                  innerHTMLString += "</ul>";
                                  
                                  // $("#staticQuestionsAnswersDetails").html(innerHTMLString);
                                  
                                  $("#auditQuestionAnswers").html(innerHTMLString);
                                  $("#auditQuestionAnswers").attr("class","audit-questions-answers-details-display");
                                  
                                  window.plugins.spinnerDialog.hide();
                                  
                                  
                                  //////////////
                                  
                                  
                                  //////////////
                                  
                                  
                                  
                                  
                                  
                                  
                                  });
                   
                   
                   
                   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                   
                   });
    
    
    
    
    
    
    
};

function deleteAudit(){
    
    
    
    window.plugins.spinnerDialog.show();
    
    
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    
    var deleteAuditTableStatement = "Delete from  audit_table where id = "+parseInt(auditIdSelected);
    
    db.transaction(function(tx) {
                   tx.executeSql(deleteAuditTableStatement);
                   }, function(error) {
                   console.log('transaction error delete question: ' + error.message);
                   }, function() {
                   console.log('transaction ok');
                   });
    
    
    var deleteAuditAnswerTableStatement = "Delete from  audit_answer_table where audit_id = "+parseInt(auditIdSelected);
    
    db.transaction(function(tx) {
                   tx.executeSql(deleteAuditAnswerTableStatement);
                   }, function(error) {
                   console.log('transaction error delete sub question: ' + error.message);
                   }, function() {
                   console.log('transaction ok');
                   window.plugins.spinnerDialog.hide();
                   $.mobile.navigate("#goAudit");
                   });
    
}

var updateCAYNtoEmpty = function(questionId,questiontext){
    console.log("Is this being executed");
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    
    var updateStatement = "Update audit_answer_table set corrective_action = '',cdatetime = "+new Date().getTime()+" where audit_id = "+parseInt(auditIdSelected)+" and checklist_id = "+parseInt(auditCheckListId) + " and question_id="+parseInt(questionId);
    
    
    
    db.transaction(function(tx) {
                   tx.executeSql(updateStatement);
                   }, function(error) {
                   console.log('transaction error update audit_answer_table CA: ' + error.message);
                   }, function() {
                   console.log('transaction ok');
                   $("#question-"+questionId).attr("class","question-YN");
                   $("#CA-"+questionId).remove();
                   });
};

var openCorrectiveActionScreen = function(qid){
    selectStatement = "Select * from audit_answer_table where audit_id="+parseInt(auditIdSelected)+" and checklist_id="+parseInt(auditCheckListId) +" and question_id="+parseInt(qid) ;
    
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    
    db.transaction(function(tx) {
                   tx.executeSql(selectStatement,[],function(tx,res){
                                 len = res.rows.length;
                                 
                                 if(len>0)
                                 {
                                 for(var i=0;i<len;i++){
                                 var correctiveAction = unescape(res.rows.item(i)['corrective_action']);
                                 $("#CATextArea").val(correctiveAction);
                                 $.mobile.navigate("#correctiveAction");
                                 }
                                 }
                                 
                                 
                                 }, function(error) {
                                 console.log('transaction error select: ' + error.message);
                                 });
                   }, function(error) {
                   console.log('transaction error: ' + error.message);
                   },function() {
                   console.log('transaction ok');
                   //Reset everything to defaults
                   });
    
};


var insertAuditCA = function(qid,questionText,answerText,clickedElement){
    
    //    console.log(arr[0]+":"+arr[1]);
    //
    //Check if question exists for the audit, if yes then update else insert
    
    var CAText = $("#CATextArea").val();
    var selectStatement = "";
    selectStatement = "Select * from audit_answer_table where audit_id="+parseInt(auditIdSelected)+" and checklist_id="+parseInt(auditCheckListId) +" and question_id="+parseInt(qid);
    
    
    
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    
    var len = 0;
    
    db.transaction(function(tx) {
                   tx.executeSql(selectStatement,[],function(tx,res){
                                 len = res.rows.length;
                                 
                                 if(len>0)
                                 {
                                 
                                 
                                 var updateStatement = "Update audit_answer_table set corrective_action = '"+ escape(CAText)+"',cdatetime = "+new Date().getTime()+" where audit_id = "+parseInt(auditIdSelected)+" and checklist_id = "+parseInt(auditCheckListId) + " and question_id="+parseInt(qid);
                                 
                                 console.log("updateStatement:"+updateStatement);
                                 
                                 db.transaction(function(tx) {
                                                tx.executeSql(updateStatement);
                                                }, function(error) {
                                                console.log('transaction error update audit_answer_table CA: ' + error.message);
                                                }, function() {
                                                console.log('transaction ok');
                                                console.log("Update CA is ok");
                                                //$.mobile.navigate("#startAudit");
                                                populateAuditQuestionScreen(auditIdSelected,"complete");
                                                $("#CATextArea").val("");
                                                window.plugins.spinnerDialog.hide();
                                                });
                                 
                                 }else{
                                 var insertStatement = "Insert into audit_answer_table (checklist_id,audit_id,question,photo,cdatetime,question_id,notes,corrective_action) values ("+parseInt(auditCheckListId)+","+parseInt(auditIdSelected)+",'"+escape(questionText)+"','',"+new Date().getTime()+","+parseInt(qid)+",'','"+escape(CAText)+"')";
                                 
                                 
                                 console.log("insertStatement:"+insertStatement);
                                 
                                 db.transaction(function(tx) {
                                                tx.executeSql(insertStatement);
                                                }, function(error) {
                                                console.log('transaction error insert audit_answer_table CA: ' + error.message);
                                                }, function() {
                                                console.log('transaction ok');
                                                console.log("Insert CA is ok");
                                                // $.mobile.navigate("#startAudit");
                                                populateAuditQuestionScreen(auditIdSelected,"complete");
                                                $("#CATextArea").val("");
                                                window.plugins.spinnerDialog.hide();
                                                });
                                 
                                 
                                 }
                                 }, function(error) {
                                 console.log('transaction error select: ' + error.message);
                                 });
                   }, function(error) {
                   console.log('transaction error: ' + error.message);
                   },function() {
                   console.log('transaction ok');
                   //Reset everything to defaults
                   });
    
    
    
};


var insertAuditPhoto = function(){
    
    //    console.log(arr[0]+":"+arr[1]);
    //
    //Check if question exists for the audit, if yes then update else insert
    var selectStatement = "";
    selectStatement = "Select * from audit_answer_table where audit_id="+parseInt(auditIdSelected)+" and checklist_id="+parseInt(auditCheckListId) +" and question_id="+parseInt(tempDataArray[0]);
    
    
    
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    
    var len = 0;
    
    db.transaction(function(tx) {
                   tx.executeSql(selectStatement,[],function(tx,res){
                                 len = res.rows.length;
                                 
                                 if(len>0)
                                 {
                                 
                                 
                                 var updateStatement = "Update audit_answer_table set photo = '"+ tempDataArray[3]+"',cdatetime = "+new Date().getTime()+",photo_width = "+tempDataArray[4]+",photo_height="+tempDataArray[5]+" where audit_id = "+parseInt(auditIdSelected)+" and checklist_id = "+parseInt(auditCheckListId) + " and question_id="+parseInt(tempDataArray[0]);
                                 
                                 
                                 db.transaction(function(tx) {
                                                tx.executeSql(updateStatement);
                                                }, function(error) {
                                                console.log('transaction error update audit_answer_table photo: ' + error.message);
                                                }, function() {
                                                console.log('transaction ok');
                                                tempDataArray[2].attr("class","quick-capture-middle-col-audit-photo-notes-active");
                                                window.plugins.spinnerDialog.hide();
                                                tempDataArray = [];
                                                });
                                 
                                 }else{
                                 var insertStatement = "Insert into audit_answer_table (checklist_id,audit_id,question,photo,cdatetime,question_id,notes,corrective_action,photo_width,photo_height,answer) values ("+parseInt(auditCheckListId)+","+parseInt(auditIdSelected)+",'"+escape(tempDataArray[1])+"','"+  tempDataArray[3]+ "',"+new Date().getTime()+","+parseInt(tempDataArray[0])+",'','',"+parseInt(tempDataArray[4])+","+parseInt(tempDataArray[5])+",'')";
                                 
                                 
                                 
                                 db.transaction(function(tx) {
                                                tx.executeSql(insertStatement);
                                                }, function(error) {
                                                console.log('transaction error insert audit_answer_table photo: ' + error.message);
                                                }, function() {
                                                console.log('transaction ok');
                                                tempDataArray[2].attr("class","quick-capture-middle-col-audit-photo-notes-active");
                                                window.plugins.spinnerDialog.hide();
                                                tempDataArray = [];
                                                });
                                 
                                 
                                 }
                                 }, function(error) {
                                 console.log('transaction error select: ' + error.message);
                                 });
                   }, function(error) {
                   console.log('transaction error: ' + error.message);
                   },function() {
                   console.log('transaction ok');
                   //Reset everything to defaults
                   });
    
    
    
};


var insertAuditNotes = function(){
    
    //Check if question exists for the audit, if yes then update else insert
    var selectStatement = "";
    selectStatement = "Select * from audit_answer_table where audit_id="+parseInt(auditIdSelected)+" and checklist_id="+parseInt(auditCheckListId) +" and question_id="+parseInt(tempDataArray[0]) + " and question = '"+escape(tempDataArray[1]) +"'";
    
    
    
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    
    var len = 0;
    
    
    
    db.transaction(function(tx) {
                   tx.executeSql(selectStatement,[],function(tx,res){
                                 len = res.rows.length;
                                 
                                 if(len>0)
                                 {
                                 
                                 
                                 var updateStatement = "Update audit_answer_table set notes = '"+ escape(tempDataArray[3])+"',cdatetime = "+new Date().getTime()+" where audit_id = "+parseInt(auditIdSelected)+" and checklist_id = "+parseInt(auditCheckListId) + " and question_id="+parseInt(tempDataArray[0]);
                                 
                                 
                                 
                                 db.transaction(function(tx) {
                                                tx.executeSql(updateStatement);
                                                }, function(error) {
                                                console.log('transaction error update audit_answer_table photo: ' + error.message);
                                                }, function() {
                                                console.log('transaction ok');
                                                $("#notesMainTextArea").val("");
                                                window.plugins.spinnerDialog.hide();
                                                tempDataArray = [];
                                                populateAuditQuestionScreen(auditIdSelected,"complete");
                                                });
                                 
                                 }else{
                                 var insertStatement = "Insert into audit_answer_table (checklist_id,audit_id,question,notes,cdatetime,question_id,photo,corrective_action) values ("+parseInt(auditCheckListId)+","+parseInt(auditIdSelected)+",'"+escape(tempDataArray[1])+"','"+  escape(tempDataArray[3])+ "',"+new Date().getTime()+","+parseInt(tempDataArray[0])+",'','')";
                                 
                                 
                                 db.transaction(function(tx) {
                                                tx.executeSql(insertStatement);
                                                }, function(error) {
                                                console.log('transaction error insert audit_answer_table photo: ' + error.message);
                                                }, function() {
                                                console.log('transaction ok');
                                                $("#notesMainTextArea").val("");
                                                window.plugins.spinnerDialog.hide();
                                                tempDataArray = [];
                                                populateAuditQuestionScreen(auditIdSelected,"complete");
                                                });
                                 
                                 
                                 }
                                 }, function(error) {
                                 console.log('transaction error select: ' + error.message);
                                 });
                   }, function(error) {
                   console.log('transaction error: ' + error.message);
                   },function() {
                   console.log('transaction ok');
                   //Reset everything to defaults
                   });
    
};


var insertAuditAnswer = function(questionId,questionText,answerText,clickedElement,questionClass,col,row){
    
    
    
    localStorage.setItem("insertAnswer-questionId",questionId);
    localStorage.setItem("insertAnswer-questionText",questionText);
    localStorage.setItem("insertAnswer-answerText",answerText);
    localStorage.setItem("insertAnswer-clickedElement",clickedElement);
    localStorage.setItem("insertAnswer-col",col);
    localStorage.setItem("insertAnswer-row",row);
    
    
    
    
    
    
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    
    var len = 0;
    
    var selectAuditAnswers = "Select * from audit_answer_table where audit_id="+parseInt(auditIdSelected)+" and checklist_id="+parseInt(auditCheckListId);
    
    
    
    var auditAnswersArray = [];
    
    
    
    db.transaction(function(tx) {
                   tx.executeSql(selectAuditAnswers,[],function(tx,res){
                                 var len = res.rows.length;
                                 
                                 if(len>0)
                                 {
                                 for (var i = 0; i < len; i++)
                                 {
                                 
                                 auditAnswersArray.push(res.rows.item(i)['question_id']);
                                 auditAnswersArray.push(res.rows.item(i)['question']);
                                 auditAnswersArray.push(unescape(res.rows.item(i)['answer']));
                                 if(res.rows.item(i)['photo']!=""){
                                 auditAnswersArray.push("photoExists");
                                 }else{
                                 auditAnswersArray.push("photoNotExists");
                                 }
                                 if(res.rows.item(i)['notes']!=""){
                                 auditAnswersArray.push("notesExists");
                                 }else{
                                 auditAnswersArray.push("notesNotExists");
                                 }
                                 auditAnswersArray.push(unescape(res.rows.item(i)['corrective_action']));
                                 //  auditAnswersArray.push(individualAnswerArray);
                                 
                                 }
                                 }
                                 }, function(error) {
                                 console.log('transaction error select: ' + error.message);
                                 });
                   }, function(error) {
                   console.log('transaction error: ' + error.message);
                   },function() {
                   console.log('transaction ok');
                   
                   });
    
    //Check corrective action
    
    var answerYNArray = [];
    var answerMCArray =  [];
    
    
    
    
    
    //////If id is corrective action array change class of closest LI and show CA screen
    
    //    else if(questionClass == "question-MC-one"){
    //
    //    }else if(questionClass == "question-MC-one"){
    //    }else if(questionClass == "question-MC-one"){
    //    }else if(questionClass == "question-MC-one"){
    //    }else if(questionClass == "question-MC-one"){
    //    }
    //Check if question exists for the audit, if yes then update else insert
    
    
    
    var selectStatement = "";
    var actualAnswer = "";
    var totalQuestionCount = "";
    var subQuestionCount = "";
    var actualQNO = "";
    var flag = 0;
    var actualQuestionCount = "";
    var subQuestionsDisplayed = "";
    
    var checkIfSubQuestion = 0;
    var questionHasSubQuestion = 0;
    
    var subQuestionArray = [];
    
    var selectSubQuestions = "Select * from sub_question_table where question_id = "+parseInt(questionId)+" and checklist_id="+parseInt(auditCheckListId);
    //Check if the question has sub question or not
    
    db.transaction(function(tx) {
                   tx.executeSql(selectSubQuestions, [], function(tx, res) {
                                 var len1 = res.rows.length;
                                 if(len1>0)
                                 {
                                 for (var i = 0; i < len1; i++)
                                 {
                                 // var qid = res.rows.item(i)['question_id'];
                                 // subQuestionArray.push(qid);
                                 checkIfSubQuestion = 1;
                                 
                                 
                                 }
                                 }
                                 });
                   window.plugins.spinnerDialog.hide();
                   });
    
    var selectSubQuestionsParent = "Select * from sub_question_table where parent_id = "+parseInt(questionId)+" and checklist_id="+parseInt(auditCheckListId);
    //Check if the question has sub question or not
    
    db.transaction(function(tx) {
                   tx.executeSql(selectSubQuestionsParent, [], function(tx, res) {
                                 var len1 = res.rows.length;
                                 if(len1>0)
                                 {
                                 for (var i = 0; i < len1; i++)
                                 {
                                 var qid = res.rows.item(i)['question_id'];
                                 subQuestionArray.push(qid);
                                 
                                 
                                 
                                 }
                                 }
                                 });
                   window.plugins.spinnerDialog.hide();
                   });
    
    
    
    
    var subQuestionResponse = "";
    
    var innertHTMLString = "";
    var selectSubQuestionResponse = "Select * from question_table where checklist_id="+parseInt(auditCheckListId) +" and id="+parseInt(questionId)+  " and question = '"+escape(questionText) + "' and sub_question_exists = 1";
    
    
    var selectUpdatedAuditAgain = "Select * from audit_table where id = "+parseInt(auditIdSelected)+" and checklist_id = "+parseInt(auditCheckListId) ;
    
    
    db.transaction(function(tx) {
                   tx.executeSql(selectUpdatedAuditAgain, [], function(tx, res) {
                                 var len1 = res.rows.length;
                                 if(len1>0)
                                 {
                                 for (var i = 0; i < len1; i++)
                                 {
                                 var qno = res.rows.item(i)['qno'];
                                 actualQNO = parseInt(qno);
                                 var questionCount = res.rows.item(i)['question_count'];
                                 var subQuestionCount = res.rows.item(i)['sub_question_count'];
                                 actualQuestionCount = res.rows.item(i)['actual_question_count'];
                                 totalQuestionCount = parseInt(questionCount);
                                 
                                 
                                 }
                                 }
                                 });
                   window.plugins.spinnerDialog.hide();
                   });
    
    
    
    db.transaction(function(tx) {
                   tx.executeSql(selectSubQuestionResponse,[],function(tx,res){
                                 var len = res.rows.length;
                                 
                                 if(len>0)
                                 {
                                 
                                 for (var i = 0; i < len; i++)
                                 {
                                 // Sub questions exist:
                                 subQuestionResponse = res.rows.item(i)['sub_question_response'];
                                 
                                 var selectSubQuestions = "Select * from sub_question_table where checklist_id="+parseInt(auditCheckListId) +" and parent_id="+parseInt(questionId) ;
                                 
                                 
                                 
                                 db.transaction(function(tx) {
                                                tx.executeSql(selectSubQuestions,[],function(tx,res){
                                                              var len = res.rows.length;
                                                              
                                                              if(len>0)
                                                              {
                                                              subQuestionCount = len;
                                                              
                                                              for (var i = 0; i < len; i++)
                                                              {
                                                              // Sub questions exist:
                                                              flag = 1;
                                                              var questionIdSQ = res.rows.item(i)['question_id'];
                                                              var questionTypeSQ = res.rows.item(i)['question_type'];
                                                              var questionTextSQ = res.rows.item(i)['question'];
                                                              var photo = res.rows.item(i)['photo'];
                                                              var notes = res.rows.item(i)['notes'];
                                                              if(unescape(subQuestionResponse) == answerText){
                                                              questionHasSubQuestion = 1;
                                                              subQuestionsArray.push(questionIdSQ);
                                                              
                                                              if($("#question-"+questionIdSQ).attr("class") == "question-YN-invisible"){
                                                              
                                                              $("#question-"+questionIdSQ).attr("class",getLiYNClass(questionIdSQ,auditAnswersArray,[]));
                                                              
                                                              
                                                              
                                                              }else if($("#question-"+questionIdSQ).attr("class") == "question-MC-one-invisible"){
                                                              $("#question-"+questionIdSQ).attr("class",getLiMCClass(questionIdSQ,auditAnswersArray,[],"question-MC-one"));
                                                              
                                                              
                                                              }else if($("#question-"+questionIdSQ).attr("class") == "question-MC-two-invisible"){
                                                              $("#question-"+questionIdSQ).attr("class",getLiMCClass(questionIdSQ,auditAnswersArray,[],"question-MC-two"));
                                                              
                                                              
                                                              }else if($("#question-"+questionIdSQ).attr("class") == "question-MC-three-invisible"){
                                                              $("#question-"+questionIdSQ).attr("class",getLiMCClass(questionIdSQ,auditAnswersArray,[],"question-MC-three"));
                                                              
                                                              
                                                              }else if($("#question-"+questionIdSQ).attr("class") == "question-MC-four-invisible"){
                                                              $("#question-"+questionIdSQ).attr("class",getLiMCClass(questionIdSQ,auditAnswersArray,[],"question-MC-four"));
                                                              
                                                              
                                                              }else if($("#question-"+questionIdSQ).attr("class") == "question-MC-five-invisible"){
                                                              $("#question-"+questionIdSQ).attr("class",getLiMCClass(questionIdSQ,auditAnswersArray,[],"question-MC-five"));
                                                              
                                                              }
                                                              
                                                              
                                                              
                                                              
                                                              }else{
                                                              flag = 2;
                                                              questionHasSubQuestion = 0;
                                                              if($("#question-"+questionIdSQ).attr("class") == "question-YN" || $("#question-"+questionIdSQ).attr("class") == "question-YN-CA"){
                                                              $("#question-"+questionIdSQ).attr("class","question-YN-invisible");
                                                              $("#CA-"+questionIdSQ).remove();
                                                              //Delete all questions
                                                              deleteStatementSubQuestions(auditIdSelected,auditCheckListId,questionIdSQ,questionTextSQ,totalQuestionCount,subQuestionCount,i,len,questionHasSubQuestion,actualQuestionCount);
                                                              
                                                              
                                                              }else if($("#question-"+questionIdSQ).attr("class") == "question-MC-one" || $("#question-"+questionIdSQ).attr("class") == "question-MC-one-CA"){
                                                              
                                                              $("#question-"+questionIdSQ).attr("class","question-MC-one-invisible");
                                                              
                                                              $("#CA-"+questionIdSQ).remove();
                                                              //Delete all questions
                                                              
                                                              
                                                              deleteStatementSubQuestions(auditIdSelected,auditCheckListId,questionIdSQ,questionTextSQ,totalQuestionCount,subQuestionCount,i,len,questionHasSubQuestion,actualQuestionCount);
                                                              }else if($("#question-"+questionIdSQ).attr("class") == "question-MC-two" || $("#question-"+questionIdSQ).attr("class") == "question-MC-two-CA"){
                                                              $("#question-"+questionIdSQ).attr("class","question-MC-two-invisible");
                                                              $("#CA-"+questionIdSQ).remove();
                                                              //Delete all questions
                                                              
                                                              
                                                              deleteStatementSubQuestions(auditIdSelected,auditCheckListId,questionIdSQ,questionTextSQ,totalQuestionCount,subQuestionCount,i,len,questionHasSubQuestion,actualQuestionCount);
                                                              }else if($("#question-"+questionIdSQ).attr("class") == "question-MC-three" || $("#question-"+questionIdSQ).attr("class") == "question-MC-three-CA"){
                                                              $("#question-"+questionIdSQ).attr("class","question-MC-three-invisible");
                                                              $("#CA-"+questionIdSQ).remove();
                                                              //Delete all questions
                                                              
                                                              
                                                              deleteStatementSubQuestions(auditIdSelected,auditCheckListId,questionIdSQ,questionTextSQ,totalQuestionCount,subQuestionCount,i,len,questionHasSubQuestion,actualQuestionCount);
                                                              }else if($("#question-"+questionIdSQ).attr("class") == "question-MC-four" || $("#question-"+questionIdSQ).attr("class") == "question-MC-four-CA"){
                                                              $("#question-"+questionIdSQ).attr("class","question-MC-four-invisible");
                                                              $("#CA-"+questionIdSQ).remove();
                                                              //Delete all questions
                                                              
                                                              
                                                              deleteStatementSubQuestions(auditIdSelected,auditCheckListId,questionIdSQ,questionTextSQ,totalQuestionCount,subQuestionCount,i,len,questionHasSubQuestion,actualQuestionCount);
                                                              }else if($("#question-"+questionIdSQ).attr("class") == "question-MC-five"|| $("#question-"+questionIdSQ).attr("class") == "question-MC-five-CA"){
                                                              $("#question-"+questionIdSQ).attr("class","question-MC-five-invisible");
                                                              $("#CA-"+questionIdSQ).remove();
                                                              //Delete all questions
                                                              
                                                              
                                                              deleteStatementSubQuestions(auditIdSelected,auditCheckListId,questionIdSQ,questionTextSQ,totalQuestionCount,subQuestionCount,i,len,questionHasSubQuestion,actualQuestionCount);
                                                              
                                                              }
                                                              
                                                              $("#question-"+questionIdSQ).children().next().children().find("td").each(function (index, value){
                                                                                                                                        $(this).css("background","#ffffff");
                                                                                                                                        $(this).css("color","#808080");
                                                                                                                                        
                                                                                                                                        });
                                                              
                                                              
                                                              
                                                              
                                                              
                                                              }
                                                              
                                                              
                                                              
                                                              }
                                                              
                                                              
                                                              
                                                              
                                                              
                                                              
                                                              
                                                              
                                                              
                                                              }
                                                              
                                                              }, function(error) {
                                                              console.log('transaction error select: ' + error.message);
                                                              });
                                                }, function(error) {
                                                console.log('transaction error: ' + error.message);
                                                },function() {
                                                console.log('transaction ok');
                                                updateCount(subQuestionArray);
                                                //Reset everything to defaults
                                                
                                                });
                                 
                                 
                                 
                                 }
                                 }
                                 
                                 }, function(error) {
                                 console.log('transaction error select here: ' + error.message);
                                 });
                   }, function(error) {
                   console.log('transaction error: ' + error.message);
                   },function() {
                   console.log('transaction ok');
                   selectStatement = "Select * from audit_answer_table where audit_id="+parseInt(auditIdSelected)+" and checklist_id="+parseInt(auditCheckListId) +" and question_id="+parseInt(questionId) + " and question = '"+escape(questionText) +"'";
                   
                   db.transaction(function(tx) {
                                  tx.executeSql(selectStatement,[],function(tx,res){
                                                len = res.rows.length;
                                                for(var i=0;i<len;i++){
                                                actualAnswer = res.rows.item(i)['answer'];
                                                photo = res.rows.item(i)['photo'];
                                                notes = res.rows.item(i)['notes'];
                                                
                                                
                                                }
                                                
                                                if(actualAnswer!="")
                                                {
                                                
                                                
                                                var updateStatement = "Update audit_answer_table set answer = '"+ escape(answerText)+"',cdatetime = "+new Date().getTime()+" where audit_id = "+parseInt(auditIdSelected)+" and checklist_id = "+parseInt(auditCheckListId) + " and question_id="+parseInt(questionId);
                                                
                                                
                                                
                                                db.transaction(function(tx) {
                                                               tx.executeSql(updateStatement);
                                                               }, function(error) {
                                                               console.log('transaction error update audit_answer_table: ' + error.message);
                                                               }, function() {
                                                               console.log('transaction ok');
                                                               });
                                                
                                                
                                                
                                                if(questionHasSubQuestion == 1){
                                                var updateIncompleteAudit = "";
                                                updateIncompleteAudit = "Update audit_table set  question_count =  question_count + "+subQuestionCount +" where id = "+parseInt(auditIdSelected)+" and checklist_id = "+parseInt(auditCheckListId);
                                                db.transaction(function(tx) {
                                                               tx.executeSql(updateIncompleteAudit);
                                                               }, function(error) {
                                                               console.log('transaction error update audit_table: ' + error.message);
                                                               }, function() {
                                                               console.log('transaction updateIncompleteAudit ok');
                                                               
                                                               });
                                                
                                                //  }
                                                var selectUpdatedAudit = "Select * from audit_table where id = "+parseInt(auditIdSelected)+" and checklist_id = "+parseInt(auditCheckListId) ;
                                                
                                                
                                                
                                                db.transaction(function(tx) {
                                                               tx.executeSql(selectUpdatedAudit, [], function(tx, res) {
                                                                             var len1 = res.rows.length;
                                                                             if(len1>0)
                                                                             {
                                                                             for (var i = 0; i < len1; i++)
                                                                             {
                                                                             var qno = res.rows.item(i)['qno'];
                                                                             var questionCount = res.rows.item(i)['question_count'];
                                                                             
                                                                             var percentProgress = Math.round((parseInt(qno) * 100)/parseInt(questionCount));
                                                                             
                                                                             $("#startAuditQuestionCount").html(qno + " of " + questionCount);
                                                                             $("#sliderCheck").val(percentProgress).slider().slider("refresh");
                                                                             
                                                                             if(percentProgress > -1 && percentProgress <= 30){
                                                                             $("#sliderCheck").closest(".ui-slider").find(".ui-slider-bg").css("background-color", "#cc0000" );
                                                                             }else if(percentProgress > 30 && percentProgress<= 60){
                                                                             $("#sliderCheck").closest(".ui-slider").find(".ui-slider-bg").css("background-color", "#ffff7f");
                                                                             }else if(percentProgress > 60){
                                                                             $("#sliderCheck").closest(".ui-slider").find(".ui-slider-bg").css("background-color", "#8cc63f" );
                                                                             }
                                                                             
                                                                             }
                                                                             }
                                                                             });
                                                               window.plugins.spinnerDialog.hide();
                                                               });
                                                }
                                                
                                                }else{
                                                var insertStatement = "Insert into audit_answer_table (checklist_id,audit_id,question,answer,cdatetime,question_id,photo,notes,corrective_action,photo_width,photo_height) values ("+parseInt(auditCheckListId)+","+parseInt(auditIdSelected)+",'"+escape(questionText)+"','"+  escape(answerText)+ "',"+new Date().getTime()+","+parseInt(questionId)+",'','','',0,0)";
                                                
                                                
                                                db.transaction(function(tx) {
                                                               tx.executeSql(insertStatement);
                                                               }, function(error) {
                                                               console.log('transaction error insert audit_answer_table: ' + error.message);
                                                               }, function() {
                                                               console.log('transaction ok');
                                                               });
                                                
                                                console.log("Sub question no:"+checkIfSubQuestion);
                                                var updateIncompleteAudit = "";
                                                console.log("flag here is :"+flag);
                                                console.log("questionHasSubQuestion here is :"+questionHasSubQuestion);
                                                if(questionHasSubQuestion == 0 && flag == 0){
                                                
                                                updateIncompleteAudit = "Update audit_table set qno = qno + 1 where id = "+parseInt(auditIdSelected)+" and checklist_id = "+parseInt(auditCheckListId);
                                                }else if(flag == 1 && questionHasSubQuestion == 1){
                                                
                                                updateIncompleteAudit = "Update audit_table set qno = qno + 1,  question_count =  question_count + "+subQuestionCount +" where id = "+parseInt(auditIdSelected)+" and checklist_id = "+parseInt(auditCheckListId);
                                                
                                                //                                                }else if(flag == 0 && subQuestionsDisplayed == 1){
                                                //                                                if($.inArray(parseInt(questionId),subQuestionArray) == -1){
                                                //                                                updateIncompleteAudit = "Update audit_table set qno = qno + 1 where id = "+parseInt(auditIdSelected)+" and checklist_id = "+parseInt(auditCheckListId);
                                                //                                                }else{
                                                //                                                updateIncompleteAudit = "Update audit_table set sub_questions_answered = sub_questions_answered + 1, qno = qno + 1 where id = "+parseInt(auditIdSelected)+" and checklist_id = "+parseInt(auditCheckListId);
                                                //
                                                //                                                }
                                                //
                                                //                                                }else if(flag == 2 && subQuestionsDisplayed == 1){
                                                //                                                updateIncompleteAudit = "Update audit_table set qno = qno - sub_questions_answered, sub_questions_answered = 0, question_count =  question_count - "+ subQuestionCount +" where id = "+parseInt(auditIdSelected)+" and checklist_id = "+parseInt(auditCheckListId);
                                                //
                                                }else if(flag == 2 && questionHasSubQuestion == 0){
                                                updateIncompleteAudit = "Update audit_table set qno = qno +1, sub_questions_answered = 0  where id = "+parseInt(auditIdSelected)+" and checklist_id = "+parseInt(auditCheckListId);
                                                
                                                }
                                                
                                                
                                                
                                                db.transaction(function(tx) {
                                                               tx.executeSql(updateIncompleteAudit);
                                                               }, function(error) {
                                                               console.log('transaction error update audit_table: ' + error.message);
                                                               }, function() {
                                                               console.log('transaction updateIncompleteAudit ok');
                                                               
                                                               });
                                                
                                                //  }
                                                var selectUpdatedAudit = "Select * from audit_table where id = "+parseInt(auditIdSelected)+" and checklist_id = "+parseInt(auditCheckListId) ;
                                                
                                                
                                                
                                                db.transaction(function(tx) {
                                                               tx.executeSql(selectUpdatedAudit, [], function(tx, res) {
                                                                             var len1 = res.rows.length;
                                                                             if(len1>0)
                                                                             {
                                                                             for (var i = 0; i < len1; i++)
                                                                             {
                                                                             var qno = res.rows.item(i)['qno'];
                                                                             var questionCount = res.rows.item(i)['question_count'];
                                                                             
                                                                             var percentProgress = Math.round((parseInt(qno) * 100)/parseInt(questionCount));
                                                                             
                                                                             $("#startAuditQuestionCount").html(qno + " of " + questionCount);
                                                                             $("#sliderCheck").val(percentProgress).slider().slider("refresh");
                                                                             
                                                                             if(percentProgress > -1 && percentProgress <= 30){
                                                                             $("#sliderCheck").closest(".ui-slider").find(".ui-slider-bg").css("background-color", "#cc0000" );
                                                                             }else if(percentProgress > 30 && percentProgress<= 60){
                                                                             $("#sliderCheck").closest(".ui-slider").find(".ui-slider-bg").css("background-color", "#ffff7f");
                                                                             }else if(percentProgress > 60){
                                                                             $("#sliderCheck").closest(".ui-slider").find(".ui-slider-bg").css("background-color", "#8cc63f" );
                                                                             }
                                                                             
                                                                             }
                                                                             }
                                                                             });
                                                               window.plugins.spinnerDialog.hide();
                                                               });
                                                
                                                
                                                }
                                                
                                                
                                                
                                                
                                                }, function(error) {
                                                console.log('transaction error select: ' + error.message);
                                                });
                                  }, function(error) {
                                  console.log('transaction error: ' + error.message);
                                  },function() {
                                  console.log('transaction ok');
                                  //Reset everything to defaults
                                  });
                   
                   
                   });
    
    
    
    
    
    
    var selectMCAnswerStatement = "Select * from answer_mc_table where checklist_id= "+ parseInt(auditCheckListId);
    
    var type = "";
    
    var selectYNAnswers = "Select * from answer_yn_table where checklist_id= "+ parseInt(auditCheckListId);
    
    db.transaction(function(tx) {
                   tx.executeSql(selectYNAnswers,[],function(tx,res){
                                 var len = res.rows.length;
                                 
                                 if(len>0)
                                 {
                                 for (var i = 0; i < len; i++)
                                 {
                                 
                                 answerYNArray.push(res.rows.item(i)['question_id']);
                                 answerYNArray.push(res.rows.item(i)['corrective_action']);
                                 
                                 
                                 
                                 }
                                 }
                                 }, function(error) {
                                 console.log('transaction error select: ' + error.message);
                                 });
                   }, function(error) {
                   console.log('transaction error: ' + error.message);
                   },function() {
                   console.log('transaction ok');
                   
                   for(var i=0;i<answerYNArray.length;i++){
                   if(answerYNArray[i] == questionId && $("#question-"+questionId).attr("class").indexOf("YN")>0){
                   if(answerYNArray[i+1]==parseInt(col+1)){
                   if($("#question-"+questionId).attr("class") != "question-YN-CA"){
                   $("#question-"+questionId).attr("class","question-YN-CA");
                   console.log("Class YN here is :"+$("#question-"+questionId).attr("class"));
                   var CAid = "CA-"+ questionId;
                   
                   $.mobile.navigate("#correctiveAction");
                   $("#question-"+questionId).append("<div id ='"+CAid+"'  class='corrective-action-div'>Corrective Action</div>");
                   }
                   }else{
                   
                   var updateStatement = "Update audit_answer_table set corrective_action = '',cdatetime = "+new Date().getTime()+" where audit_id = "+parseInt(auditIdSelected)+" and checklist_id = "+parseInt(auditCheckListId) + " and question_id="+parseInt(questionId);
                   
                   console.log("updateStatement:"+updateStatement);
                   
                   db.transaction(function(tx) {
                                  tx.executeSql(updateStatement);
                                  }, function(error) {
                                  console.log('transaction error update audit_answer_table CA: ' + error.message);
                                  }, function() {
                                  console.log('transaction ok');
                                  $("#question-"+questionId).attr("class","question-YN");
                                  $("#CA-"+questionId).remove();
                                  });
                   
                   }
                   }
                   }
                   
                   
                   });
    
    var oldClass = $("#question-"+questionId).attr("class");
    
    db.transaction(function(tx) {
                   tx.executeSql(selectMCAnswerStatement,[],function(tx,res){
                                 var len = res.rows.length;
                                 
                                 if(len>0)
                                 {
                                 for (var i = 0; i < len; i++)
                                 {
                                 answerMCArray.push(res.rows.item(i)['question_id']);
                                 answerMCArray.push(res.rows.item(i)['corrective_action']);
                                 
                                 }
                                 }
                                 }, function(error) {
                                 console.log('transaction error select MC Answer statement : ' + error.message);
                                 });
                   }, function(error) {
                   console.log('transaction error: ' + error.message);
                   },function() {
                   console.log('transaction ok');
                   for(var i=0;i<answerMCArray.length;i++){
                   if(answerMCArray[i] == questionId && $("#question-"+questionId).attr("class").indexOf("MC")>0){
                   if(answerMCArray[i+1]==parseInt(row+1)){
                   
                   var lastClass = $("#question-"+questionId).last().attr("class");
                   console.log("lastClass:"+lastClass);
                   
                   var MCClassesArray = ["question-MC-one-CA","question-MC-two-CA","question-MC-three-CA","question-MC-four-CA","question-MC-five-CA"];
                   if(($.inArray(oldClass,MCClassesArray)==-1)&&lastClass!="corrective-action-div"){
                   
                   $("#question-"+questionId).attr("class",oldClass+"-CA");
                   
                   var CAid = "CA-"+ questionId
                   $("#question-"+questionId).append("<div  id ='"+CAid+"'  class='corrective-action-div'>Corrective Action</div>");
                   $.mobile.navigate("#correctiveAction");
                   
                   
                   }
                   
                   }else{
                   
                   var updateStatement = "Update audit_answer_table set corrective_action = '',cdatetime = "+new Date().getTime()+" where audit_id = "+parseInt(auditIdSelected)+" and checklist_id = "+parseInt(auditCheckListId) + " and question_id="+parseInt(questionId);
                   
                   console.log("updateStatement:"+updateStatement);
                   
                   db.transaction(function(tx) {
                                  tx.executeSql(updateStatement);
                                  }, function(error) {
                                  console.log('transaction error update audit_answer_table CA: ' + error.message);
                                  }, function() {
                                  console.log('transaction ok');
                                  var noCAClass = oldClass.split("-");
                                  $("#question-"+questionId).attr("class",noCAClass[0]+"-"+noCAClass[1]+"-"+noCAClass[2]);
                                  $("#CA-"+questionId).remove();
                                  });
                   
                   }
                   }
                   }
                   
                   
                   });
    
    
    
};



//function checkAnsweredQuestions(){
//    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
//    var numItems = $(".answer-style-yes-no-selected").length + $(".answer-style-selected").length;
//    console.log("numItems:"+numItems);
//    var updateIncompleteAudit = "Update audit_table set qno = "+parseInt(numItems)+" where id = "+parseInt(auditIdSelected)+" and checklist_id = "+parseInt(auditCheckListId);
//
//    db.transaction(function(tx) {
//                   tx.executeSql(updateIncompleteAudit);
//                   }, function(error) {
//                   console.log('transaction error update audit_table: ' + error.message);
//                   }, function() {
//                   console.log('transaction updateIncompleteAudit ok');
//
//                   });
//
//    var selectUpdatedAudit = "Select * from audit_table where id = "+parseInt(auditIdSelected)+" and checklist_id = "+parseInt(auditCheckListId) ;
//
//
//
//    db.transaction(function(tx) {
//                   tx.executeSql(selectUpdatedAudit, [], function(tx, res) {
//                                 var len1 = res.rows.length;
//                                 if(len1>0)
//                                 {
//                                 for (var i = 0; i < len1; i++)
//                                 {
//                                 var qno = res.rows.item(i)['qno'];
//                                 var questionCount = res.rows.item(i)['question_count'];
//
//                                 var percentProgress = Math.round((parseInt(qno) * 100)/parseInt(questionCount));
//
//                                 $("#startAuditQuestionCount").html(qno + " of " + questionCount);
//                                 $("#sliderCheck").val(percentProgress).slider().slider("refresh");
//
//                                 if(percentProgress > -1 && percentProgress <= 30){
//                                 $("#sliderCheck").closest(".ui-slider").find(".ui-slider-bg").css("background-color", "#cc0000" );
//                                 }else if(percentProgress > 30 && percentProgress<= 60){
//                                 $("#sliderCheck").closest(".ui-slider").find(".ui-slider-bg").css("background-color", "#ffff7f");
//                                 }else if(percentProgress > 60){
//                                 $("#sliderCheck").closest(".ui-slider").find(".ui-slider-bg").css("background-color", "#8cc63f" );
//                                 }
//
//                                 }
//                                 }
//                                 });
//                   window.plugins.spinnerDialog.hide();
//                   });
//
//
//}

//var editQuestionCount = function(actualQNO,totalQuestionCount){
//
//    window.plugins.spinnerDialog.show();
//    $("#startAuditQuestionCount").html(actualQNO + " of " + totalQuestionCount);
//    var updateIncompleteAudit = "Update audit_table set question_count = "+parseInt(totalQuestionCount)+" where id = "+parseInt(auditIdSelected)+" and checklist_id = "+parseInt(auditCheckListId);
//    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
//
//
//
//
//    db.transaction(function(tx) {
//                   tx.executeSql(updateIncompleteAudit);
//                   }, function(error) {
//                   console.log('transaction error update audit_table: ' + error.message);
//                   }, function() {
//                   console.log('transaction updateIncompleteAudit ok');
//
//                   });
//
//    var selectUpdatedAudit = "Select * from audit_table where id = "+parseInt(auditIdSelected)+" and checklist_id = "+parseInt(auditCheckListId) ;
//
//
//
//    db.transaction(function(tx) {
//                   tx.executeSql(selectUpdatedAudit, [], function(tx, res) {
//                                 var len1 = res.rows.length;
//                                 if(len1>0)
//                                 {
//                                 for (var i = 0; i < len1; i++)
//                                 {
//                                 var qno = res.rows.item(i)['qno'];
//                                 var questionCount = res.rows.item(i)['question_count'];
//
//                                 var percentProgress = Math.round((parseInt(qno) * 100)/parseInt(questionCount));
//
//                                 $("#startAuditQuestionCount").html(qno + " of " + questionCount);
//                                 $("#sliderCheck").val(percentProgress).slider().slider("refresh");
//
//                                 if(percentProgress > -1 && percentProgress <= 30){
//                                 $("#sliderCheck").closest(".ui-slider").find(".ui-slider-bg").css("background-color", "#cc0000" );
//                                 }else if(percentProgress > 30 && percentProgress<= 60){
//                                 $("#sliderCheck").closest(".ui-slider").find(".ui-slider-bg").css("background-color", "#ffff7f");
//                                 }else if(percentProgress > 60){
//                                 $("#sliderCheck").closest(".ui-slider").find(".ui-slider-bg").css("background-color", "#8cc63f" );
//                                 }
//
//                                 }
//                                 }
//                                 });
//                   window.plugins.spinnerDialog.hide();
//                   });
//
//}


function updateCount(arr){
    
    for(var i=0;i<arr.length;i++){
        //   console.log("arr[i]"+arr[i]);
        //  console.log("class:"+$("#question-"+arr[i]).attr("class"));
    }
    
    var totalQuestions = "";
    
    //Check is answer is in audit array
    //if yes then delete that number of ids to get qno
    //for totdal question count check if visible or invisible
    //if visi
    
}

function   deleteStatementSubQuestions(auditIdSelected,auditCheckListId,questionIdSQ,questionTextSQ,totalQuestionCount,subQuestionCount,i,len,questionHasSubQuestion,actualQuestionCount){
    
    
    
    
    var deleteStatementSubQuestionsQuery = "Delete from audit_answer_table where audit_id="+parseInt(auditIdSelected)+" and checklist_id="+parseInt(auditCheckListId) +" and question_id="+parseInt(questionIdSQ);
    
    
    
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    
    var actualRowsAffected = "";
    db.transaction(function(tx) {
                   tx.executeSql(deleteStatementSubQuestionsQuery,[],function(tx,res){
                                 actualRowsAffected =  res.rowsAffected ;
                                 }, function(error) {
                                 console.log('transaction error select: ' + error.message);
                                 });
                   }, function(error) {
                   console.log('transaction error delete audit_table: ' + error.message);
                   }, function() {
                   console.log('transaction deleteStatementSubQuestions ok');
                   if($("#question-"+questionIdSQ).attr("class") == "question-YN" ||$("#question-"+questionIdSQ).attr("class") == "question-YN-CA"){
                   
                   $("#question-"+questionIdSQ).attr("class","question-YN-invisible");
                   console.log("questionIdSQ:"+questionIdSQ);
                   $("#CA-"+questionIdSQ).remove();
                   
                   }else if($("#question-"+questionIdSQ).attr("class") == "question-MC-one" ||$("#question-"+questionIdSQ).attr("class") == "question-MC-one-CA"){
                   $("#question-"+questionIdSQ).attr("class","question-MC-one-invisible");
                   $("#CA-"+questionIdSQ).remove();
                   
                   }else if($("#question-"+questionIdSQ).attr("class") == "question-MC-two" ||$("#question-"+questionIdSQ).attr("class") == "question-MC-two-CA"){
                   $("#question-"+questionIdSQ).attr("class","question-MC-two-invisible");
                   $("#CA-"+questionIdSQ).remove();
                   
                   }else if($("#question-"+questionIdSQ).attr("class") == "question-MC-three" ||$("#question-"+questionIdSQ).attr("class") == "question-MC-three-CA"){
                   $("#question-"+questionIdSQ).attr("class","question-MC-three-invisible");
                   $("#CA-"+questionIdSQ).remove();
                   
                   }else if($("#question-"+questionIdSQ).attr("class") == "question-MC-four"||$("#question-"+questionIdSQ).attr("class") == "question-MC-four-CA"){
                   $("#question-"+questionIdSQ).attr("class","question-MC-four-invisible");
                   $("#CA-"+questionIdSQ).remove();
                   
                   }else if($("#question-"+questionIdSQ).attr("class") == "question-MC-five"||$("#question-"+questionIdSQ).attr("class") == "question-MC-five-CA"){
                   $("#question-"+questionIdSQ).attr("class","question-MC-five-invisible");
                   $("#CA-"+questionIdSQ).remove();
                   
                   
                   }
                   var updateIncompleteAudit = "";
                   console.log("actualRowsAffected:"+actualRowsAffected);
                   if(actualRowsAffected>0){
                   if(i == len -1){
                   updateIncompleteAudit = "Update audit_table set qno = qno - 1, question_count = question_count - "+len+", sub_questions_answered = 0 where id = "+parseInt(auditIdSelected)+" and checklist_id = "+parseInt(auditCheckListId);
                   }else{
                   updateIncompleteAudit = "Update audit_table set qno = qno - 1, sub_questions_answered = 0 where id = "+parseInt(auditIdSelected)+" and checklist_id = "+parseInt(auditCheckListId);
                   
                   }
                   }else{
                   //How to check if rows have been deleted
                   
                   if((totalQuestionCount - actualQuestionCount) == subQuestionCount){
                   updateIncompleteAudit = "Update audit_table set   question_count =  "+actualQuestionCount+", sub_questions_answered = 0 where id = "+parseInt(auditIdSelected)+" and checklist_id = "+parseInt(auditCheckListId);
                   }else if((totalQuestionCount - actualQuestionCount) > subQuestionCount){
                   if(i == len - 1){
                   updateIncompleteAudit = "Update audit_table set   question_count =  "+(totalQuestionCount-subQuestionCount)+", sub_questions_answered = 0 where id = "+parseInt(auditIdSelected)+" and checklist_id = "+parseInt(auditCheckListId);
                   console.log("updateIncompleteAudit: in here"+updateIncompleteAudit);
                   }
                   }
                   }
                   
                   console.log("updateIncompleteAudit:"+updateIncompleteAudit);
                   db.transaction(function(tx) {
                                  tx.executeSql(updateIncompleteAudit);
                                  }, function(error) {
                                  console.log('transaction error update audit_table: ' + error.message);
                                  }, function() {
                                  console.log('transaction updateIncompleteAudit ok');
                                  var selectUpdatedAudit = "Select * from audit_table where id = "+parseInt(auditIdSelected)+" and checklist_id = "+parseInt(auditCheckListId) ;
                                  
                                  
                                  
                                  db.transaction(function(tx) {
                                                 tx.executeSql(selectUpdatedAudit, [], function(tx, res) {
                                                               var len1 = res.rows.length;
                                                               if(len1>0)
                                                               {
                                                               for (var i = 0; i < len1; i++)
                                                               {
                                                               var qno = res.rows.item(i)['qno'];
                                                               var questionCount = res.rows.item(i)['question_count'];
                                                               
                                                               var percentProgress = Math.round((parseInt(qno) * 100)/parseInt(questionCount));
                                                               
                                                               $("#startAuditQuestionCount").html(qno + " of " + questionCount);
                                                               $("#sliderCheck").val(percentProgress).slider().slider("refresh");
                                                               
                                                               if(percentProgress > -1 && percentProgress <= 30){
                                                               $("#sliderCheck").closest(".ui-slider").find(".ui-slider-bg").css("background-color", "#cc0000" );
                                                               }else if(percentProgress > 30 && percentProgress<= 60){
                                                               $("#sliderCheck").closest(".ui-slider").find(".ui-slider-bg").css("background-color", "#ffff7f");
                                                               }else if(percentProgress > 60){
                                                               $("#sliderCheck").closest(".ui-slider").find(".ui-slider-bg").css("background-color", "#8cc63f" );
                                                               }
                                                               
                                                               }
                                                               }
                                                               });
                                                 
                                                 });
                                  
                                  });
                   
                   
                   });
    
}

var populateNotes = function(){
    
    //Check if question exists for the audit, if yes then update else insert
    var selectStatement = "";
    selectStatement = "Select * from audit_answer_table where audit_id="+parseInt(auditIdSelected)+" and checklist_id="+parseInt(auditCheckListId) +" and question_id="+parseInt(tempDataArray[0]) + " and question = '"+escape(tempDataArray[1]) +"'";
    
    
    
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    
    var len = 0;
    
    db.transaction(function(tx) {
                   tx.executeSql(selectStatement,[],function(tx,res){
                                 len = res.rows.length;
                                 
                                 if(len>0)
                                 {
                                 for (var i = 0; i < len; i++)
                                 {
                                 var notes = res.rows.item(i)['notes'];
                                 $("#notesMainTextArea").val(unescape(notes));
                                 
                                 }
                                 }
                                 
                                 
                                 
                                 }, function(error) {
                                 console.log('transaction error select: ' + error.message);
                                 });
                   }, function(error) {
                   console.log('transaction error: ' + error.message);
                   },function() {
                   console.log('transaction ok');
                   //Reset everything to defaults
                   });
    
};


function showSelectedCheckList(id){
    checkListId = id;
    populateStaticQuestionsScreen();
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    
    var selectStatement = "Select * from picklist_table where id="+id;
    
    
    db.transaction(function(tx) {
                   tx.executeSql(selectStatement,[],function(tx,res){
                                 var len = res.rows.length;
                                 
                                 if(len>0)
                                 {
                                 
                                 for (var i = 0; i < len; i++)
                                 {
                                 $("#CheckListTextAreaName").val(unescape(res.rows.item(i)['picklist_name']));
                                 $("#CheckListTextAreaDescription").val(unescape(res.rows.item(i)['picklist_description']));
                                 }
                                 $("#checkListDisplay").val("old");
                                 $("#staticQuestionsSections").html(localStorage.getItem("populateStaticScreen"));
                                 $.mobile.navigate("#editCheckList");
                                 }
                                 
                                 }, function(error) {
                                 console.log('transaction error select: ' + error.message);
                                 });
                   }, function(error) {
                   console.log('transaction error: ' + error.message);
                   },function() {
                   console.log('transaction ok');
                   //Reset everything to defaults
                   showQuestionDefaults();
                   $("#questionDisplay").val("new");
                   });
    
}

var deleteSection = function(){
    // var r = $.Deferred();
    
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    
    var deleteSectionTableStatement = "Delete from  section_table where id = "+parseInt(sectionIdSelected);
    
    
    db.transaction(function(tx) {
                   tx.executeSql(deleteSectionTableStatement);
                   }, function(error) {
                   console.log('transaction error delete section: ' + error.message);
                   }, function() {
                   console.log('transaction ok');
                   $("#sectionTextArea").val("");
                   populateQuestionsScreen("enable");
                   });
    // return r;
};


var UpdateSectionWithQuestionsList = function(list,sectionId){
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    
    var updateSectionStatement = "Update section_table set question_list ='"+list+"' where id = "+parseInt(sectionId);
    
    db.transaction(function(tx) {
                   tx.executeSql(updateSectionStatement);
                   }, function(error) {
                   console.log('transaction error update section table: ' + error.message);
                   }, function() {
                   console.log('transaction ok');
                   goToReorderQuestions();
                   window.plugins.spinnerDialog.hide();
                   });
    
    
};



var deleteQuestion = function(){
    window.plugins.spinnerDialog.show();
    var r = $.Deferred();
    
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    
    var deleteQuestionTableStatement = "Delete from  question_table where id = "+parseInt(questionIdSelected);
    
    db.transaction(function(tx) {
                   tx.executeSql(deleteQuestionTableStatement);
                   }, function(error) {
                   console.log('transaction error delete question: ' + error.message);
                   }, function() {
                   console.log('transaction ok');
                   });
    
    
    var deleteSubQuestionTableStatement = "Delete from  sub_question_table where parent_id = "+parseInt(questionIdSelected);
    
    db.transaction(function(tx) {
                   tx.executeSql(deleteSubQuestionTableStatement);
                   }, function(error) {
                   console.log('transaction error delete sub question: ' + error.message);
                   }, function() {
                   console.log('transaction ok');
                   });
    
    
    
    var deleteAnswerMCStatement = "Delete from  answer_mc_table where question_id = "+parseInt(questionIdSelected);
    
    
    db.transaction(function(tx) {
                   tx.executeSql(deleteAnswerMCStatement);
                   }, function(error) {
                   console.log('transaction error delete answer mc table: ' + error.message);
                   }, function() {
                   console.log('transaction ok');
                   
                   });
    
    var deleteAnswerYNStatement = "Delete from  answer_yn_table where question_id = "+parseInt(questionIdSelected);
    
    
    db.transaction(function(tx) {
                   tx.executeSql(deleteAnswerYNStatement);
                   }, function(error) {
                   console.log('transaction error delete answer yn table: ' + error.message);
                   }, function() {
                   console.log('transaction ok');
                   questionIdSelected = "";
                   });
    
    var getSection = "Select * from section_table where question_list like '%"+questionIdSelected+"%'";
    
    
    db.transaction(function(tx) {
                   tx.executeSql(getSection,[],function(tx,res){
                                 var len = res.rows.length;
                                 
                                 if(len>0)
                                 {
                                 
                                 for (var i = 0; i < len; i++)
                                 {
                                 var sectionId = res.rows.item(i)['id'];
                                 var questionList = res.rows.item(i)['question_list'];
                                 
                                 if(len == 1){
                                 questionList = "";
                                 }else{
                                 var tempWithCommaAfter = questionIdSelected + ",";
                                 var tempWithCommaBefore =  ","+questionIdSelected ;
                                 questionList = questionList.replace(tempWithCommaAfter,"");
                                 questionList = questionList.replace(tempWithCommaBefore,"");
                                 }
                                 
                                 UpdateSectionWithQuestionsList(questionList,sectionId);
                                 }
                                 
                                 }else{
                                 showSelectedCheckList(checkListId);
                                 window.plugins.spinnerDialog.hide();
                                 }
                                 
                                 }, function(error) {
                                 console.log('transaction error select: ' + error.message);
                                 });
                   }, function(error) {
                   console.log('transaction error: ' + error.message);
                   },function() {
                   console.log('transaction ok');
                   //Reset everything to defaults
                   
                   });
    
    
    
    
    
    //Update section table to delete that question
    
    return r;
};

var deleteCheckList = function(){
    var r = $.Deferred();
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    
    
    
    var deleteQuestionTableStatement = "Delete from  question_table where checklist_id = "+parseInt(checkListId);
    
    
    db.transaction(function(tx) {
                   tx.executeSql(deleteQuestionTableStatement);
                   }, function(error) {
                   console.log('transaction error insert: ' + error.message);
                   }, function() {
                   console.log('transaction ok');
                   });
    
    var deleteSubQuestionTableStatement = "Delete from  sub_question_table where checklist_id = "+parseInt(checkListId);
    
    
    db.transaction(function(tx) {
                   tx.executeSql(deleteSubQuestionTableStatement);
                   }, function(error) {
                   console.log('transaction error insert: ' + error.message);
                   }, function() {
                   console.log('transaction ok');
                   });
    
    var deleteSectionTableStatement = "Delete from  section_table where checklist_id = "+parseInt(checkListId);
    
    
    db.transaction(function(tx) {
                   tx.executeSql(deleteSectionTableStatement);
                   }, function(error) {
                   console.log('transaction error insert: ' + error.message);
                   }, function() {
                   console.log('transaction ok');
                   });
    
    
    var deleteAnswerMCStatement = "Delete from  answer_mc_table where checklist_id = "+parseInt(checkListId);
    
    
    db.transaction(function(tx) {
                   tx.executeSql(deleteAnswerMCStatement);
                   }, function(error) {
                   console.log('transaction error insert: ' + error.message);
                   }, function() {
                   console.log('transaction ok');
                   
                   });
    
    var deleteAnswerYNStatement = "Delete from  answer_yn_table where checklist_id = "+parseInt(checkListId);
    
    
    db.transaction(function(tx) {
                   tx.executeSql(deleteAnswerYNStatement);
                   }, function(error) {
                   console.log('transaction error insert: ' + error.message);
                   }, function() {
                   console.log('transaction ok');
                   
                   });
    
    var deleteStatement = "Delete from  picklist_table where id = "+parseInt(checkListId);
    
    
    db.transaction(function(tx) {
                   tx.executeSql(deleteStatement);
                   }, function(error) {
                   console.log('transaction error insert: ' + error.message);
                   }, function() {
                   console.log('transaction ok');
                   checkListId = "0";
                   $("#checkListDisplay").val("new");
                   });
    
    db.transaction(function(tx) {
                   tx.executeSql("select count(id) as cnt from picklist_table;", [], function(tx, res) {
                                 console.log("res.rows.length: " + res.rows.length + " -- should be 1");
                                 console.log("res.rows.item(0).cnt: " + res.rows.item(0).cnt + " -- should be 1");
                                 });
                   });
    
    return r;
};

function insertMultipleChoiceQuestionParameters(checkListQuestion,questionPhotoVal,questionNotesVal,answerOne,answerTwo,answerThree,answerFour,answerFive,CAMCSelected){
    var questionId = "";
    
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    
    //'CREATE TABLE IF NOT EXISTS question_table (id integer primary key AUTOINCREMENT, question text, cort_order integer, checklist_id integer, question_type text, photo text, notes text)');
    
    var insertStatement = "Insert into question_table (id,question,sort_order,checklist_id,question_type,photo,notes,sub_question_exists,sub_question_response) values ((select max(maxId)+1 from (SELECT IFNULL(MAX(id), 0) + 1 as maxid FROM question_table union all SELECT IFNULL(MAX(question_id), 0) + 1 as maxid FROM sub_question_table) maxes),'"+escape(checkListQuestion)+"',"+0+","+  parseInt(checkListId)+ ",'MC','"+questionPhotoVal+"','"+questionNotesVal+"',0,'')";
    
    
    
    db.transaction(function(tx) {
                   tx.executeSql(insertStatement);
                   }, function(error) {
                   console.log('transaction error insert: ' + error.message);
                   }, function() {
                   console.log('transaction ok');
                   console.log("Insert success for question");
                   });
    
    db.transaction(function(tx) {
                   tx.executeSql("select * from question_table ORDER BY id DESC LIMIT 1;", [], function(tx, res) {
                                 var len = res.rows.length;
                                 if(len>0)
                                 {
                                 for (var i = 0; i < len; i++)
                                 {
                                 questionId = res.rows.item(i)['id'];
                                 
                                 var actualAnswer1 = "";
                                 var actualAnswer2 = "";
                                 var actualAnswer3 = "";
                                 var actualAnswer4 = "";
                                 var actualAnswer5 = "";
                                 
                                 if(answerOne != "Answer1"){
                                 actualAnswer1 = answerOne;
                                 }
                                 if(answerTwo != "Answer2"){
                                 actualAnswer2 = answerTwo;
                                 }
                                 if(answerThree != "Answer3"){
                                 actualAnswer3 = answerThree;
                                 }
                                 if(answerFour != "Answer4"){
                                 actualAnswer4 = answerFour;
                                 }
                                 if(answerFive != "Answer5"){
                                 actualAnswer5 = answerFive;
                                 }
                                 if (typeof CAMCSelected === "undefined") {
                                 CAMCSelected = -1;
                                 }else{
                                 CAMCSelected = CAMCSelected.replace("CA","");
                                 }
                                 
                                 var insertAnswer = "Insert into answer_mc_table (id, answer1,answer2,answer3,answer4,answer5,corrective_action, question_id, checklist_id) values ((SELECT IFNULL(MAX(id), 0) + 1 FROM answer_mc_table),'"+escape(actualAnswer1)+"','"+escape(actualAnswer2)+"','"+  escape(actualAnswer3)+"','"+  escape(actualAnswer4)+"','"+  escape(actualAnswer5)+"',"+parseInt(CAMCSelected)+","+questionId+","+parseInt(checkListId)+")";
                                 
                                 console.log(insertAnswer);
                                 
                                 db.transaction(function(tx) {
                                                tx.executeSql(insertAnswer);
                                                }, function(error) {
                                                console.log('transaction error insert: ' + error.message);
                                                showAlert(error.message);
                                                window.plugins.spinnerDialog.hide();
                                                }, function() {
                                                console.log('transaction ok');
                                                window.plugins.spinnerDialog.hide();
                                                showSelectedCheckList(checkListId);
                                                });
                                 
                                 }
                                 }
                                 }, function(error) {
                                 console.log('transaction error select: ' + error.message);
                                 });
                   }, function(error) {
                   console.log('transaction error: ' + error.message);
                   },function() {
                   console.log('transaction ok');
                   //Reset everything to defaults
                   
                   });
    
    
}


function insertYNQuestionParameters(checkListQuestion,questionPhotoVal,questionNotesVal,CAYNSelected){
    var questionId = "";
    
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    
    var insertStatement = "Insert into question_table (id,question,sort_order,checklist_id,question_type,photo,notes,sub_question_exists,sub_question_response) values ((select max(maxId)+1 from (SELECT IFNULL(MAX(id), 0) + 1 as maxid FROM question_table union all SELECT IFNULL(MAX(question_id), 0) + 1 as maxid FROM sub_question_table) maxes),'"+escape(checkListQuestion)+"',"+0+","+  parseInt(checkListId)+ ",'YN','"+questionPhotoVal+"','"+questionNotesVal+"',0,'')";
    
    console.log(insertStatement);
    
    db.transaction(function(tx) {
                   tx.executeSql(insertStatement);
                   }, function(error) {
                   console.log('transaction error insert: ' + error.message);
                   }, function() {
                   console.log('transaction ok');
                   console.log("Insert success for question");
                   });
    
    db.transaction(function(tx) {
                   tx.executeSql("select * from question_table ORDER BY id DESC LIMIT 1;", [], function(tx, res) {
                                 var len = res.rows.length;
                                 
                                 if(len>0)
                                 {
                                 for (var i = 0; i < len; i++)
                                 {
                                 questionId = res.rows.item(i)['id'];
                                 var correctiveActionSelected = "";
                                 var insertAnswer = "";
                                 if(typeof CAYNSelected === 'undefined'){
                                 insertAnswer = "Insert into answer_yn_table (id,corrective_action, question_id, checklist_id) values ((SELECT IFNULL(MAX(id), 0) + 1 FROM answer_yn_table),-1,"+questionId+","+parseInt(checkListId)+")";
                                 }else{
                                 
                                 CAYNSelected = CAYNSelected.replace("CA","");
                                 
                                 if(CAYNSelected == "Yes"){
                                 correctiveActionSelected = 1;
                                 }else if(CAYNSelected == "No"){
                                 correctiveActionSelected = 2;
                                 }else if(CAYNSelected == "NA"){
                                 correctiveActionSelected = 3;
                                 }
                                 insertAnswer = "Insert into answer_yn_table (id,corrective_action, question_id, checklist_id) values ((SELECT IFNULL(MAX(id), 0) + 1 FROM answer_yn_table),"+parseInt(correctiveActionSelected)+","+questionId+","+parseInt(checkListId)+")";
                                 }
                                 
                                 
                                 console.log(insertAnswer);
                                 
                                 db.transaction(function(tx) {
                                                tx.executeSql(insertAnswer);
                                                }, function(error) {
                                                console.log('transaction error insert: ' + error.message);
                                                window.plugins.spinnerDialog.hide();
                                                showAlert(error.message);
                                                }, function() {
                                                console.log('transaction ok');
                                                window.plugins.spinnerDialog.hide();
                                                showSelectedCheckList(checkListId);
                                                });
                                 
                                 }
                                 }
                                 }, function(error) {
                                 console.log('transaction error select: ' + error.message);
                                 });
                   }, function(error) {
                   console.log('transaction error: ' + error.message);
                   },function() {
                   console.log('transaction ok');
                   //Reset everything to defaults
                   
                   });
    
    
    
}

var populateSectionsOnly = function(){
    var innerSectionsHTMLString = "";
    
    
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    
    
    var selectSectionsStatement = "Select * from section_table where checklist_id= "+ checkListId +" order by sort_order asc";
    
    var sectionsArray = [];
    var sectionsIdArray = [];
    db.transaction(function(tx) {
                   tx.executeSql(selectSectionsStatement,[],function(tx,res){
                                 var len = res.rows.length;
                                 
                                 if(len>0)
                                 {
                                 for (var i = 0; i < len; i++)
                                 {
                                 var questionList = "";
                                 var sectionId = "section-"+res.rows.item(i)['id'];
                                 sectionsIdArray.push(sectionId);
                                 var sectionString = unescape(res.rows.item(i)['section']);
                                 sectionsArray.push(sectionString);
                                 
                                 }
                                 }
                                 
                                 }, function(error) {
                                 console.log('transaction error select: ' + error.message);
                                 });
                   }, function(error) {
                   console.log('transaction error: ' + error.message);
                   },function() {
                   console.log('transaction ok');
                   
                   //Do all the processing here
                   innerSectionsHTMLString += "<ul id='sortableSections'>";
                   for(var i=0;i<sectionsArray.length;i++){
                   innerSectionsHTMLString += "<li class='ui-state-default section-default' id="+ sectionsIdArray[i]  +">";
                   innerSectionsHTMLString += sectionsArray[i];
                   innerSectionsHTMLString += "</li>";
                   }
                   innerSectionsHTMLString += "</ul>";
                   // console.log(innerSectionsHTMLString);
                   $("#questionsSectionsDiv").css("display","none");
                   $("#subQuestionsOnlyDiv").css("display","none");
                   $("#sectionsOnlyDiv").css("display","block");
                   $("#sectionsOnlyDiv").html(innerSectionsHTMLString);
                   $( "#sortableSections" ).sortable({
                                                     update : function(event, ui) {
                                                     //create the array that hold the positions...
                                                     var order = [];
                                                     //loop trought each li...
                                                     $('#sortableSections li').each(function(e) {
                                                                                    var updatePositionStatement = "";
                                                                                    updatePositionStatement = "Update section_table set sort_order="+parseInt(($(this).index() + 1))+" where id="+parseInt($(this).attr('id').replace("section-",""));
                                                                                    console.log(updatePositionStatement);
                                                                                    db.transaction(function(tx) {
                                                                                                   tx.executeSql(updatePositionStatement);
                                                                                                   }, function(error) {
                                                                                                   console.log('transaction error update: ' + error.message);
                                                                                                   }, function() {
                                                                                                   console.log('transaction ok');
                                                                                                   
                                                                                                   
                                                                                                   });
                                                                                    });
                                                     
                                                     }
                                                     //  window.plugins.spinnerDialog.hide();
                                                     
                                                     
                                                     });
                   $.mobile.navigate("#reorderQuestions");
                   });
};

var populateSubQuestionsOnly = function(){
    var innerSubQuestionsHTMLString = "";
    
    var allQueriesArray = [];
    
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    
    
    var selectQuestionsStatement = "Select * from question_table where sub_question_exists = 1 and checklist_id= "+ parseInt(checkListId) +" order by sort_order asc";
    
    var questionsArray = [];
    var subQuestionsArray = [];
    db.transaction(function(tx) {
                   tx.executeSql(selectQuestionsStatement,[],function(tx,res){
                                 var len = res.rows.length;
                                 
                                 
                                 
                                 if(len>0)
                                 {
                                 for (var i = 0; i < len; i++)
                                 {
                                 
                                 var questionId = "";
                                 questionId = res.rows.item(i)['id'];
                                 var questionText = unescape(res.rows.item(i)['question']);
                                 questionsArray.push(questionId);
                                 questionsArray.push(questionText);
                                 var selectSubQuestion = "";
                                 // innerSubQuestionsHTMLString +="<h3>"+questionText+"</h3>";
                                 //innerSubQuestionsHTMLString += "<ul id='sortableSubQuestions-'"+questionId+">";
                                 selectSubQuestion = "Select * from sub_question_table where parent_id = "+parseInt(questionId)+" and checklist_id  = "+parseInt(checkListId)+" order by sort_order asc";
                                 allQueriesArray.push(selectSubQuestion);
                                 
                                 }
                                 }
                                 
                                 }, function(error) {
                                 console.log('transaction error select: ' + error.message);
                                 });
                   }, function(error) {
                   console.log('transaction error: ' + error.message);
                   },function() {
                   console.log('transaction ok');
                   
                   
                   });
    
    db.transaction(function(tx){
                   for(var j=0;j<allQueriesArray.length;j++){
                   tx.executeSql(allQueriesArray[j],[],function(tx,res){
                                 var lenz = res.rows.length;
                                 
                                 
                                 
                                 if(lenz>0)
                                 {
                                 for (var i = 0; i < lenz; i++)
                                 {
                                 var subQuestionId = res.rows.item(i)['question_id'];
                                 var parentId = res.rows.item(i)['parent_id'];
                                 subQuestionsArray.push(subQuestionId);
                                 subQuestionsArray.push(parentId);
                                 var question = unescape(res.rows.item(i)['question']);
                                 
                                 subQuestionsArray.push(question);
                                 }
                                 
                                 }
                                 })
                   }}, function(error) {
                   console.log('transaction error update question: ' + error.message);
                   }, function() {
                   console.log('transaction update question ok');
                   for(var p =0;p<questionsArray.length;p++){
                   if(p==0 || p%2 == 0){
                   innerSubQuestionsHTMLString +="<h3 class='h3-class'>"+questionsArray[p+1]+"</h3>";
                   innerSubQuestionsHTMLString += "<ul class='sortableSubQuestions' id='sortableSubQuestions-"+questionsArray[p]+"'>";
                   for(var q=0;q<subQuestionsArray.length;q++){
                   if(q == 0 || q%3 == 0){
                   if(subQuestionsArray[q+1] == questionsArray[p]){
                   innerSubQuestionsHTMLString += "<li class='ui-state-default question-default-sub-question' id=subquestion-"+ subQuestionsArray[q]  +"-"+subQuestionsArray[q+1]+">";
                   innerSubQuestionsHTMLString += subQuestionsArray[q+2];
                   innerSubQuestionsHTMLString += "</li>";
                   }
                   }
                   }
                   innerSubQuestionsHTMLString += "</ul>";
                   }
                   }
                   $("#questionsSectionsDiv").css("display","none");
                   $("#sectionsOnlyDiv").css("display","none");
                   $("#subQuestionsOnlyDiv").css("display","block");
                   console.log("innerSubQuestionsHTMLString:"+innerSubQuestionsHTMLString);
                   $("#subQuestionsOnlyDiv").html(innerSubQuestionsHTMLString);
                   for(var p =0;p<questionsArray.length;p++){
                   if(p==0 || p%2 == 0){
                   var sortableId = "sortableSubQuestions-"+questionsArray[p];
                   $("#"+ sortableId).sortable({
                                               update : function(event, ui) {
                                               //create the array that hold the positions...
                                               var order = [];
                                               //loop trought each li...
                                               $(this).find("li").each(function(e) {
                                                                       
                                                                       var updatePositionStatement = "";
                                                                       updatePositionStatement = "Update sub_question_table set sort_order="+parseInt(($(this).index() + 1))+" where question_id="+parseInt($(this).attr('id').split("-")[1])+" and parent_id="+parseInt($(this).attr('id').split("-")[2])+ " and checklist_id="+parseInt(checkListId);
                                                                       console.log(updatePositionStatement);
                                                                       db.transaction(function(tx) {
                                                                                      tx.executeSql(updatePositionStatement);
                                                                                      }, function(error) {
                                                                                      console.log('transaction error update: ' + error.message);
                                                                                      }, function() {
                                                                                      console.log('transaction ok');
                                                                                      
                                                                                      
                                                                                      });
                                                                       });
                                               
                                               }
                                               // window.plugins.spinnerDialog.hide();
                                               
                                               
                                               });
                   
                   
                   }
                   
                   }
                   });
};


function populateStaticQuestionsScreen(){
    var innerHTMLString = "";
    
    var innerSectionsHTMLString = "";
    
    
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    
    var selectStatement = "Select * from question_table where checklist_id= "+ checkListId +" order by sort_order asc";
    
    var selectSectionsStatement = "Select * from section_table where checklist_id= "+ checkListId +" order by sort_order asc";
    
    var selectSubQuestionStatement = "Select * from sub_question_table where checklist_id= "+ checkListId +" order by parent_id asc, sort_order asc";
    
    console.log(selectSubQuestionStatement);
    
    var questionsArray = [];
    var questionsIdArray = [];
    var sectionsArray = [];
    var sectionsIdArray = [];
    var questionsSortOrder = [];
    var sectionsSortOrder = [];
    var sectionsWithQuestions = [];
    var questionIdActualArray = [];
    var questionsWithSubQuestionsArray = [];
    var subQuestionsArray = [];
    
    db.transaction(function(tx) {
                   tx.executeSql(selectStatement,[],function(tx,res){
                                 var len = res.rows.length;
                                 
                                 if(len>0)
                                 {
                                 for (var i = 0; i < len; i++)
                                 {
                                 var questionId = "question-"+res.rows.item(i)['id'];
                                 questionIdActualArray.push(res.rows.item(i)['id']);
                                 questionsIdArray.push(questionId);
                                 var questionSubQuestionExists = res.rows.item(i)['sub_question_exists'];
                                 if(questionSubQuestionExists == 0){
                                 questionsWithSubQuestionsArray.push("ui-state-default question-default");
                                 }else if(questionSubQuestionExists == 1){
                                 questionsWithSubQuestionsArray.push("ui-state-default question-default-sub-question");
                                 }
                                 var questionString = unescape(res.rows.item(i)['question']);
                                 questionsArray.push(questionString);
                                 var questionOrder = res.rows.item(i)['sort_order'];
                                 questionsSortOrder.push(questionOrder);
                                 }
                                 }
                                 }, function(error) {
                                 console.log('transaction error select: ' + error.message);
                                 });
                   }, function(error) {
                   console.log('transaction error: ' + error.message);
                   },function() {
                   console.log('transaction ok');
                   
                   });
    
    
    
    db.transaction(function(tx) {
                   tx.executeSql(selectSubQuestionStatement,[],function(tx,res){
                                 var len = res.rows.length;
                                 
                                 if(len>0)
                                 {
                                 for (var i = 0; i < len; i++)
                                 {
                                 
                                 var questionId = res.rows.item(i)['question_id'];
                                 var parentId = res.rows.item(i)['parent_id'];
                                 var question = unescape(res.rows.item(i)['question']);
                                 subQuestionsArray.push(questionId);
                                 subQuestionsArray.push(parentId);
                                 subQuestionsArray.push(question);
                                 }
                                 }
                                 }, function(error) {
                                 console.log('transaction error select: ' + error.message);
                                 });
                   }, function(error) {
                   console.log('transaction error: ' + error.message);
                   
                   },function() {
                   console.log('transaction ok');
                   
                   });
    
    db.transaction(function(tx) {
                   tx.executeSql(selectSectionsStatement,[],function(tx,res){
                                 var len = res.rows.length;
                                 
                                 if(len>0)
                                 {
                                 for (var i = 0; i < len; i++)
                                 {
                                 var questionList = "";
                                 var sectionId = "section-"+res.rows.item(i)['id'];
                                 sectionsIdArray.push(sectionId);
                                 var sectionString = unescape(res.rows.item(i)['section']);
                                 sectionsArray.push(sectionString);
                                 var sectionOrder = res.rows.item(i)['sort_order'];
                                 sectionsSortOrder.push(sectionOrder);
                                 if(res.rows.item(i)['question_list']!=""){
                                 questionList = res.rows.item(i)['question_list'];
                                 }else{
                                 questionList = "empty";
                                 }
                                 sectionsWithQuestions.push(questionList);
                                 }
                                 }
                                 
                                 }, function(error) {
                                 console.log('transaction error select: ' + error.message);
                                 });
                   }, function(error) {
                   console.log('transaction error: ' + error.message);
                   },function() {
                   console.log('transaction ok');
                   
                   //Get questions that do not have an associated section
                   //questionIdActualArray sectionsWithQuestions;
                   
                   
                   var sectionsWithQuestionsString = "";
                   for(var i=0;i<sectionsWithQuestions.length;i++){
                   sectionsWithQuestionsString += sectionsWithQuestions[i]+",";
                   }
                   var  sectionsWithQuestionsStringArray = sectionsWithQuestionsString.split(",");
                   sectionsWithQuestionsStringArray.pop();
                   
                   
                   var sectionsWithQuestionsArray = [];
                   var questionsWithNoSection = [];
                   var sectionWithNoQuestionArray = [];
                   questionsWithNoSection = arr_diff(questionIdActualArray,sectionsWithQuestionsStringArray);
                   var index = questionsWithNoSection.indexOf("empty");
                   if (index > -1) {
                   questionsWithNoSection.splice(index, 1);
                   }
                   //get the sections sort order
                   //check first section and see if it has any questions
                   for(var i=0;i<sectionsWithQuestions.length;i++){
                   for(var j=0;j<questionIdActualArray.length;j++){
                   if(sectionsWithQuestions[i].indexOf(questionIdActualArray[j])!="-1"){
                   sectionsWithQuestionsArray.push(sectionsArray[i]+"||"+questionsIdArray[j]+"||"+questionsArray[j] + "||" + sectionsIdArray[i] + "||" + questionsWithSubQuestionsArray[j] );
                   }else if(sectionsWithQuestions[i]=="empty"){
                   var str = sectionsArray[i]+ "||" + sectionsIdArray[i];
                   var found = $.inArray(str, sectionWithNoQuestionArray);
                   if (found >= 0) {
                   } else {
                   
                   sectionWithNoQuestionArray.push(str);
                   }
                   
                   }
                   }
                   }
                   
                   for(var i=0;i<sectionsWithQuestions.length;i++){
                   if(sectionsWithQuestions[i]=="empty"){
                   
                   var str = sectionsArray[i]+ "||" + sectionsIdArray[i];
                   var found = $.inArray(str, sectionWithNoQuestionArray);
                   if (found >= 0) {
                   } else {
                   
                   sectionWithNoQuestionArray.push(str);
                   }
                   
                   
                   }
                   }
                   
                   
                   
                   
                   innerHTMLString += "<ul id='unsortableQuestions'>";
                   var tempQuestionArray = [];
                   var tempQuestionSortArray = [];
                   var tempQuestionSubArray  = [];
                   var tempActualIdArray = [];
                   //Questions with no section go first
                   if(questionsWithNoSection.length>0){
                   for(var i=0;i<questionsWithNoSection.length;i++){
                   for(var j=0;j<questionIdActualArray.length;j++){
                   if(questionIdActualArray[j]==questionsWithNoSection[i]){
                   tempActualIdArray.push(questionsWithNoSection[i]);
                   tempQuestionArray.push(questionsArray[j]) ;
                   tempQuestionSortArray.push(questionsSortOrder[j]);
                   tempQuestionSubArray.push(questionsWithSubQuestionsArray[j]);
                   }
                   }
                   
                   
                   }
                   var sortedValArray = sortBasedOnAnotherArray(tempQuestionSortArray,tempQuestionArray);
                   var sortedIdArray = sortBasedOnAnotherArray(tempQuestionSortArray,tempActualIdArray);
                   var sortedSubQuestionArray = sortBasedOnAnotherArray(tempQuestionSortArray,tempQuestionSubArray);
                   
                   for(var l=0;l<sortedValArray.length;l++){
                   innerHTMLString +=  "<li class='ui-state-default question-default' id='question-"+ sortedIdArray[l] +"'>";
                   innerHTMLString += sortedValArray[l] ;
                   innerHTMLString += "</li>";
                   
                   //Check if this question has sub questions
                   for(var m=0;m<subQuestionsArray.length;m++){
                   if(sortedIdArray[l] == subQuestionsArray[m+1] && m%3 == 0){
                   innerHTMLString +=  "<li class='ui-state-default question-default-sub-question' id='subQuestion-"+ subQuestionsArray[m] +"'>";
                   innerHTMLString +=  "  - "+subQuestionsArray[m+2] ;
                   innerHTMLString += "</li>";
                   }
                   }
                   }
                   
                   }
                   
                   
                   for(var i=0;i<sectionsWithQuestionsArray.length;i++){
                   if(i==0 ){
                   innerHTMLString +=  "<li class='ui-state-default section-default' id='"+ sectionsWithQuestionsArray[i].split("||")[3]  +"'>";
                   innerHTMLString += sectionsWithQuestionsArray[i].split("||")[0];
                   innerHTMLString += "</li>";
                   
                   }else{
                   if(sectionsWithQuestionsArray[i].split("-")[0] != sectionsWithQuestionsArray[i-1].split("-")[0]){
                   innerHTMLString +=  "<li class='ui-state-default section-default' id='"+ sectionsWithQuestionsArray[i].split("||")[3]  +"'>";
                   innerHTMLString += sectionsWithQuestionsArray[i].split("||")[0];
                   innerHTMLString += "</li>";
                   }
                   }
                   
                   innerHTMLString +=  "<li class='ui-state-default question-default'  id='"+ sectionsWithQuestionsArray[i].split("||")[1] +"'>";
                   innerHTMLString += sectionsWithQuestionsArray[i].split("||")[2] ;
                   innerHTMLString += "</li>";
                   
                   //Check if this question has sub questions
                   for(var m=0;m<subQuestionsArray.length;m++){
                   if(sectionsWithQuestionsArray[i].split("||")[1].split("-")[1] == subQuestionsArray[m+1] && m%3 == 0){
                   innerHTMLString +=  "<li class='ui-state-default question-default-sub-question' id='subQuestion-"+ subQuestionsArray[m] +"'>";
                   innerHTMLString +=  "  - "+subQuestionsArray[m+2] ;
                   innerHTMLString += "</li>";
                   }
                   }
                   
                   
                   }
                   
                   if(sectionWithNoQuestionArray.length>0){
                   for(var i=0;i<sectionWithNoQuestionArray.length;i++){
                   innerHTMLString +=  "<li class='ui-state-default section-default' id='"+ sectionWithNoQuestionArray[i].split("||")[1]  +"'>";
                   innerHTMLString += sectionWithNoQuestionArray[i].split("||")[0];
                   innerHTMLString += "</li>";
                   
                   }
                   }
                   innerHTMLString += "</ul>";
                   
                   localStorage.setItem("populateStaticScreen",innerHTMLString);
                   
                   //Create sections and editable sections thats hidden
                   
                   
                   });
    
    
    
    
}

var populateQuestionsScreen = function(type){
    var r = $.Deferred();
    
    $("#reorderSpan").attr("class","reorder-active");
    $("#reorderSubQuestionsSpan").attr("class","reorder-sub-inactive");
    $("#reorderSectionSpan").attr("class","reorder-section-inactive");
    
    var innerHTMLString = "";
    
    var innerSectionsHTMLString = "";
    
    
    
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    
    var selectStatement = "Select * from question_table where checklist_id= "+ checkListId +" order by sort_order asc";
    
    var selectSectionsStatement = "Select * from section_table where checklist_id= "+ checkListId +" order by sort_order asc";
    
    var questionsArray = [];
    var questionsIdArray = [];
    var questionsWithSubQuestionsArray = [];
    var sectionsArray = [];
    var sectionsIdArray = [];
    var questionsSortOrder = [];
    var sectionsSortOrder = [];
    var sectionsWithQuestions = [];
    var questionIdActualArray = [];
    
    db.transaction(function(tx) {
                   tx.executeSql(selectStatement,[],function(tx,res){
                                 var len = res.rows.length;
                                 if(len>0)
                                 {
                                 for (var i = 0; i < len; i++)
                                 {
                                 var questionId = "question-"+res.rows.item(i)['id'];
                                 questionIdActualArray.push(res.rows.item(i)['id']);
                                 var questionSubQuestionExists = res.rows.item(i)['sub_question_exists'];
                                 if(questionSubQuestionExists == 0){
                                 questionsWithSubQuestionsArray.push("ui-state-default question-default");
                                 }else if(questionSubQuestionExists == 1){
                                 questionsWithSubQuestionsArray.push("ui-state-default question-default-sub-question");
                                 }
                                 questionsIdArray.push(questionId);
                                 var questionString = unescape(res.rows.item(i)['question']);
                                 questionsArray.push(questionString);
                                 var questionOrder = res.rows.item(i)['sort_order'];
                                 questionsSortOrder.push(questionOrder);
                                 }
                                 }
                                 }, function(error) {
                                 console.log('transaction error select: ' + error.message);
                                 });
                   }, function(error) {
                   console.log('transaction error: ' + error.message);
                   },function() {
                   console.log('transaction ok');
                   
                   });
    
    db.transaction(function(tx) {
                   tx.executeSql(selectSectionsStatement,[],function(tx,res){
                                 var len = res.rows.length;
                                 
                                 if(len>0)
                                 {
                                 for (var i = 0; i < len; i++)
                                 {
                                 var questionList = "";
                                 var sectionId = "section-"+res.rows.item(i)['id'];
                                 sectionsIdArray.push(sectionId);
                                 var sectionString = unescape(res.rows.item(i)['section']);
                                 sectionsArray.push(sectionString);
                                 var sectionOrder = res.rows.item(i)['sort_order'];
                                 sectionsSortOrder.push(sectionOrder);
                                 if(res.rows.item(i)['question_list']!=""){
                                 questionList = res.rows.item(i)['question_list'];
                                 }else{
                                 questionList = "empty";
                                 }
                                 sectionsWithQuestions.push(questionList);
                                 }
                                 }
                                 
                                 }, function(error) {
                                 console.log('transaction error select: ' + error.message);
                                 });
                   }, function(error) {
                   console.log('transaction error: ' + error.message);
                   },function() {
                   console.log('transaction ok');
                   
                   //Get questions that do not have an associated section
                   //questionIdActualArray sectionsWithQuestions;
                   
                   
                   var sectionsWithQuestionsString = "";
                   for(var i=0;i<sectionsWithQuestions.length;i++){
                   sectionsWithQuestionsString += sectionsWithQuestions[i]+",";
                   }
                   var  sectionsWithQuestionsStringArray = sectionsWithQuestionsString.split(",");
                   sectionsWithQuestionsStringArray.pop();
                   
                   //Do all the processing here
                   innerSectionsHTMLString += "<ul id='sortableSections'>";
                   for(var i=0;i<sectionsArray.length;i++){
                   innerSectionsHTMLString += "<li class='ui-state-default section-default' id="+ sectionsIdArray[i]  +">";
                   innerSectionsHTMLString += sectionsArray[i];
                   innerSectionsHTMLString += "</li>";
                   }
                   innerSectionsHTMLString += "</ul>";
                   // console.log(innerSectionsHTMLString);
                   //$("#sectionsOnlyDiv").html(innerSectionsHTMLString);
                   $( "#sortableSections" ).sortable({
                                                     update : function(event, ui) {
                                                     //create the array that hold the positions...
                                                     var order = [];
                                                     //loop trought each li...
                                                     $('#sortableSections li').each(function(e) {
                                                                                    var updatePositionStatement = "";
                                                                                    updatePositionStatement = "Update section_table set sort_order="+parseInt(($(this).index() + 1))+" where id="+parseInt($(this).attr('id').replace("section-",""));
                                                                                    console.log(updatePositionStatement);
                                                                                    db.transaction(function(tx) {
                                                                                                   tx.executeSql(updatePositionStatement);
                                                                                                   }, function(error) {
                                                                                                   console.log('transaction error update: ' + error.message);
                                                                                                   }, function() {
                                                                                                   console.log('transaction ok');
                                                                                                   
                                                                                                   
                                                                                                   });
                                                                                    });
                                                     
                                                     }
                                                     //  window.plugins.spinnerDialog.hide();
                                                     
                                                     
                                                     });
                   
                   
                   var sectionsWithQuestionsArray = [];
                   var questionsWithNoSection = [];
                   var sectionWithNoQuestionArray = [];
                   questionsWithNoSection = arr_diff(questionIdActualArray,sectionsWithQuestionsStringArray);
                   var index = questionsWithNoSection.indexOf("empty");
                   if (index > -1) {
                   questionsWithNoSection.splice(index, 1);
                   }
                   //get the sections sort order
                   //check first section and see if it has any questions
                   for(var i=0;i<sectionsWithQuestions.length;i++){
                   for(var j=0;j<questionIdActualArray.length;j++){
                   if(sectionsWithQuestions[i].indexOf(questionIdActualArray[j])!="-1"){
                   sectionsWithQuestionsArray.push(sectionsArray[i]+"||"+questionsIdArray[j]+"||"+questionsArray[j] + "||" + sectionsIdArray[i] + "||" + questionsWithSubQuestionsArray[j] );
                   }else if(sectionsWithQuestions[i]=="empty"){
                   var str = sectionsArray[i]+ "||" + sectionsIdArray[i];
                   var found = $.inArray(str, sectionWithNoQuestionArray);
                   if (found >= 0) {
                   } else {
                   
                   sectionWithNoQuestionArray.push(str);
                   }
                   
                   }
                   }
                   }
                   
                   
                   for(var i=0;i<sectionsWithQuestions.length;i++){
                   if(sectionsWithQuestions[i]=="empty"){
                   
                   var str = sectionsArray[i]+ "||" + sectionsIdArray[i];
                   var found = $.inArray(str, sectionWithNoQuestionArray);
                   if (found >= 0) {
                   } else {
                   
                   sectionWithNoQuestionArray.push(str);
                   }
                   
                   
                   }
                   }
                   
                   
                   innerHTMLString += "<ul id='sortableQuestions'>";
                   var tempQuestionArray = [];
                   var tempQuestionSubArray = [];
                   var tempQuestionSortArray = [];
                   var tempActualIdArray = [];
                   //Questions with no section go first
                   if(questionsWithNoSection.length>0){
                   for(var i=0;i<questionsWithNoSection.length;i++){
                   for(var j=0;j<questionIdActualArray.length;j++){
                   if(questionIdActualArray[j]==questionsWithNoSection[i]){
                   tempActualIdArray.push(questionsWithNoSection[i]);
                   tempQuestionArray.push(questionsArray[j]) ;
                   tempQuestionSortArray.push(questionsSortOrder[j]);
                   tempQuestionSubArray.push(questionsWithSubQuestionsArray[j]);
                   }
                   }
                   
                   
                   }
                   var sortedValArray = sortBasedOnAnotherArray(tempQuestionSortArray,tempQuestionArray);
                   var sortedIdArray = sortBasedOnAnotherArray(tempQuestionSortArray,tempActualIdArray);
                   var sortedSubQuestionArray = sortBasedOnAnotherArray(tempQuestionSortArray,tempQuestionSubArray);
                   for(var l=0;l<sortedValArray.length;l++){
                   innerHTMLString +=  "<li class='ui-state-default question-default' id='question-"+ sortedIdArray[l] +"'>";
                   innerHTMLString += sortedValArray[l] ;
                   innerHTMLString += "</li>";
                   }
                   
                   }
                   
                   
                   for(var i=0;i<sectionsWithQuestionsArray.length;i++){
                   if(i==0 ){
                   innerHTMLString +=  "<li class='ui-state-default section-default' id='"+ sectionsWithQuestionsArray[i].split("||")[3]  +"'>";
                   innerHTMLString += sectionsWithQuestionsArray[i].split("||")[0];
                   innerHTMLString += "</li>";
                   
                   }else{
                   if(sectionsWithQuestionsArray[i].split("-")[0] != sectionsWithQuestionsArray[i-1].split("-")[0]){
                   innerHTMLString +=  "<li class='ui-state-default section-default' id='"+ sectionsWithQuestionsArray[i].split("||")[3]  +"'>";
                   innerHTMLString += sectionsWithQuestionsArray[i].split("||")[0];
                   innerHTMLString += "</li>";
                   }
                   }
                   
                   innerHTMLString +=  "<li class='ui-state-default question-default' id='"+ sectionsWithQuestionsArray[i].split("||")[1] +"'>";
                   innerHTMLString += sectionsWithQuestionsArray[i].split("||")[2] ;
                   innerHTMLString += "</li>";
                   
                   }
                   
                   if(sectionWithNoQuestionArray.length>0){
                   for(var i=0;i<sectionWithNoQuestionArray.length;i++){
                   innerHTMLString +=  "<li class='ui-state-default section-default' id='"+ sectionWithNoQuestionArray[i].split("||")[1]  +"'>";
                   innerHTMLString += sectionWithNoQuestionArray[i].split("||")[0];
                   innerHTMLString += "</li>";
                   
                   }
                   }
                   innerHTMLString += "</ul>";
                   
                   $("#questionsSectionsDiv").css("display","block");
                   $("#subQuestionsOnlyDiv").css("display","none");
                   $("#sectionsOnlyDiv").css("display","none");
                   $("#questionsSectionsDiv").html(innerHTMLString);
                   
                   $( "#sortableSections" ).disableSelection();
                   var updatedIdArray = [];
                   
                   var questionLiString = "";
                   
                   $( "#sortableQuestions" ).sortable({
                                                      update : function(event, ui) {
                                                      //create the array that hold the positions...
                                                      var order = [];
                                                      //loop trought each li...
                                                      $('#sortableQuestions li').each(function(e) {
                                                                                      order.push($(this).attr('id'));
                                                                                      
                                                                                      
                                                                                      });
                                                      
                                                      var sectionIndex = 1;
                                                      var questionIndex = 1;
                                                      var questionIndexString = "";
                                                      var lastSectionIdArray  = [];
                                                      var allQueriesArray = [];
                                                      for(var i=0;i<order.length;i++){
                                                      var updatePositionStatement = "";
                                                      if(order[i].indexOf("section")!="-1"){
                                                      updatePositionStatement = "Update section_table set sort_order="+parseInt(sectionIndex)+" where id="+parseInt(order[i].replace("section-",""));
                                                      lastSectionIdArray.push( order[i].replace("section-",""));
                                                      allQueriesArray.push(updatePositionStatement);
                                                      updatePositionStatement = "";
                                                      // console.log(updatePositionStatement);
                                                      sectionIndex++;
                                                      if(i>0 && (order[i-1].indexOf("section")!="-1")){//Section followed by a section
                                                      console.log("This section has no questions");
                                                      updatePositionStatement = "Update section_table set question_list='' where id="+lastSectionIdArray[sectionIndex-3];
                                                      
                                                      console.log(updatePositionStatement);
                                                      allQueriesArray.push(updatePositionStatement);
                                                      
                                                      updatePositionStatement = "";
                                                      }
                                                      
                                                      else  if(i>0 && (order[i-1].indexOf("question")!="-1")){//Section followed by a question
                                                      questionIndexString = questionIndexString.slice(0,-1);
                                                      updatePositionStatement = "Update section_table set question_list='"+questionIndexString+"' where id="+lastSectionIdArray[sectionIndex-3];
                                                      console.log(updatePositionStatement);
                                                      allQueriesArray.push(updatePositionStatement);
                                                      
                                                      questionIndexString = "";
                                                      updatePositionStatement = "";
                                                      
                                                      }
                                                      
                                                      if(i==order.length-1){//Last section in array with no questions
                                                      updatePositionStatement = "Update section_table set question_list='' where id="+parseInt(order[i].replace("section-",""));
                                                      console.log(updatePositionStatement);
                                                      
                                                      allQueriesArray.push(updatePositionStatement);
                                                      
                                                      updatePositionStatement = "";
                                                      
                                                      }
                                                      
                                                      }else if(order[i].indexOf("question")!="-1"){
                                                      updatePositionStatement = "Update question_table set sort_order="+parseInt(questionIndex)+" where id="+parseInt(order[i].replace("question-",""));
                                                      console.log(updatePositionStatement);
                                                      allQueriesArray.push(updatePositionStatement);
                                                      
                                                      
                                                      updatePositionStatement = "";
                                                      
                                                      questionIndex++;
                                                      if(i>0 && (order[i-1].indexOf("question")!="-1")){//Previous array value was question
                                                      questionIndexString += parseInt(order[i].replace("question-","")) + ",";
                                                      console.log(questionIndexString);
                                                      
                                                      }else if(i>0 && (order[i-1].indexOf("section")!="-1")){//Previous array value was section
                                                      questionIndexString += parseInt(order[i].replace("question-","")) + ",";
                                                      console.log(questionIndexString);
                                                      
                                                      
                                                      }
                                                      if(i==(order.length-1)){//Last question
                                                      
                                                      questionIndexString = questionIndexString.slice(0,-1);
                                                      if(lastSectionIdArray.length>0){
                                                      updatePositionStatement = "Update section_table set question_list='"+questionIndexString+"' where id="+lastSectionIdArray[lastSectionIdArray.length-1];
                                                      console.log(updatePositionStatement);
                                                      allQueriesArray.push(updatePositionStatement);
                                                      }
                                                      
                                                      
                                                      
                                                      updatePositionStatement = "";
                                                      questionIndexString = "";
                                                      }
                                                      }
                                                      }
                                                      
                                                      db.transaction(function(tx){
                                                                     for(var j=0;j<allQueriesArray.length;j++){
                                                                     tx.executeSql(allQueriesArray[j]);
                                                                     }}, function(error) {
                                                                     console.log('transaction error update question: ' + error.message);
                                                                     }, function() {
                                                                     console.log('transaction update question ok');
                                                                     });
                                                      
                                                      }
                                                      
                                                      
                                                      //  window.plugins.spinnerDialog.hide();
                                                      
                                                      
                                                      });
                   
                   if(type=="disable"){
                   $( "#sortableQuestions" ).sortable("disable");
                   $("#editSpan").attr("class","edit-active");
                   $("#reorderSpan").attr("class","reorder-inactive");
                   $("#reorderSectionSpan").attr("class","reorder-section-inactive");
                   }
                   $.mobile.navigate("#reorderQuestions");
                   //Create sections and editable sections thats hidden
                   
                   
                   });
    
    
    
    return r;
    
};



var getSelectedQuestionText = function(questionId){
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    
    var selectQuestion = "select * from question_table where id = "+ questionId + " and checklist_id ="+parseInt(checkListId);
    
    db.transaction(function(tx) {
                   tx.executeSql(selectQuestion, [], function(tx, res) {
                                 var len = res.rows.length;
                                 
                                 if(len>0)
                                 $("#selectResponse").empty();
                                 
                                 {
                                 for (var i = 0; i < len; i++)
                                 {
                                 // questionId = res.rows.item(i)['id'];
                                 var questionText = res.rows.item(i)['question'];
                                 var sub_question_exists = res.rows.item(i)['sub_question_exists'];
                                 var sub_question_response = res.rows.item(i)['sub_question_response'];
                                 
                                 $("#checkListTextAreaSubQuestion").val(unescape(questionText));
                                 var questionType = res.rows.item(i)['question_type'];
                                 
                                 if(questionType == "YN"){
                                 if(sub_question_response == ""){
                                 $("#selectResponse").append($("<option></option>").attr("value","none").attr("selected","selected").text("Select Response"));
                                 }else{
                                 $("#selectResponse").append($("<option></option>").attr("value","none").text("Select Response"));
                                 }
                                 
                                 if(sub_question_response == "Yes"){
                                 $("#selectResponse").append($("<option></option>").attr("value","Yes").attr("selected","selected").text("Yes"));
                                 }else{
                                 $("#selectResponse").append($("<option></option>").attr("value","Yes").text("Yes"));
                                 }
                                 
                                 if(sub_question_response == "No"){
                                 $("#selectResponse").append($("<option></option>").attr("value","No").attr("selected","selected").text("No"));
                                 }else{
                                 $("#selectResponse").append($("<option></option>").attr("value","No").text("No"));
                                 }
                                 
                                 if(sub_question_response == "N/A"){
                                 $("#selectResponse").append($("<option></option>").attr("value","N/A").attr("selected","selected").text("N/A"));
                                 }else{
                                 $("#selectResponse").append($("<option></option>").attr("value","N/A").text("N/A"));
                                 }
                                 
                                 //
                                 
                                 }else{
                                 var selectAnswer = "Select * from answer_mc_table where question_id="+questionId + " and checklist_id ="+parseInt(checkListId);
                                 console.log(selectAnswer);
                                 tx.executeSql(selectAnswer, [], function(tx, res) {
                                               
                                               var len = res.rows.length;
                                               if(len>0)
                                               
                                               {
                                               for (var i = 0; i < len; i++)
                                               {
                                               
                                               var answer1 = res.rows.item(i)['answer1'];
                                               var answer2 = res.rows.item(i)['answer2'];
                                               var answer3 = res.rows.item(i)['answer3'];
                                               var answer4 = res.rows.item(i)['answer4'];
                                               var answer5 = res.rows.item(i)['answer5'];
                                               
                                               if(sub_question_response == ""){
                                               $("#selectResponse").append($("<option></option>").attr("value","none").attr("selected","selected").text("Select Response"));
                                               }else{
                                               $("#selectResponse").append($("<option></option>").attr("value","none").text("Select Response"));
                                               }
                                               
                                               if(answer1 != ""){
                                               if(unescape(sub_question_response) == unescape(answer1)){
                                               $("#selectResponse").append($("<option></option>").attr("value",answer1).attr("selected","selected").text(unescape(answer1)));
                                               }else{
                                               $("#selectResponse").append($("<option></option>").attr("value",answer1).text(unescape(answer1)));
                                               }
                                               
                                               
                                               }
                                               if(answer2 != ""){
                                               if(unescape(sub_question_response) == unescape(answer2)){
                                               $("#selectResponse").append($("<option></option>").attr("value",answer2).attr("selected","selected").text(unescape(answer2)));
                                               }else{
                                               $("#selectResponse").append($("<option></option>").attr("value",answer2).text(unescape(answer2)));
                                               }
                                               }
                                               if(answer3 != ""){
                                               if(unescape(sub_question_response) == unescape(answer3)){
                                               $("#selectResponse").append($("<option></option>").attr("value",answer3).attr("selected","selected").text(unescape(answer3)));
                                               }else{
                                               $("#selectResponse").append($("<option></option>").attr("value",answer3).text(unescape(answer3)));
                                               }
                                               }
                                               if(answer4 != ""){
                                               if(unescape(sub_question_response) == unescape(answer4)){
                                               $("#selectResponse").append($("<option></option>").attr("value",answer4).attr("selected","selected").text(unescape(answer4)));
                                               }else{
                                               $("#selectResponse").append($("<option></option>").attr("value",answer4).text(unescape(answer4)));
                                               }
                                               }
                                               if(answer5 != ""){
                                               if(unescape(sub_question_response) == unescape(answer5)){
                                               $("#selectResponse").append($("<option></option>").attr("value",answer5).attr("selected","selected").text(unescape(answer5)));
                                               }else{
                                               $("#selectResponse").append($("<option></option>").attr("value",answer5).text(unescape(answer5)));
                                               }
                                               }
                                               
                                               }
                                               }
                                               });
                                 
                                 }
                                 
                                 var selectOtherQuestions = "Select * from question_table where id != "+questionId+" and sub_question_exists=0 and checklist_id ="+parseInt(checkListId);
                                 var innerHTMLString = "";
                                 tx.executeSql(selectOtherQuestions, [], function(tx, res) {
                                               var len = res.rows.length;
                                               if(len>0)
                                               
                                               {
                                               for (var i = 0; i < len; i++)
                                               {
                                               var questionText = res.rows.item(i)['question'];
                                               var questionId = res.rows.item(i)['id'];
                                               innerHTMLString += "<div id='checkBoxDiv'>";
                                               innerHTMLString += "<label class='reorder-inactive'><input type='checkbox' data-mini='true' name='subQuestionCheckBox' value='question-"+questionId+"' />"+unescape(questionText)+"</label>";
                                               innerHTMLString += "</div>";
                                               }
                                               }
                                               
                                               });
                                 
                                 var selectSubQuestions = "Select * from sub_question_table where parent_id= "+questionId+ " and checklist_id ="+parseInt(checkListId);
                                 
                                 var innerHTMLString2 = "";
                                 tx.executeSql(selectSubQuestions, [], function(tx, res) {
                                               var len = res.rows.length;
                                               if(len>0)
                                               
                                               {
                                               for (var i = 0; i < len; i++)
                                               {
                                               var questionText = res.rows.item(i)['question'];
                                               var questionId = res.rows.item(i)['question_id'];
                                               innerHTMLString2 += "<div id='checkBoxDiv'>";
                                               innerHTMLString2 += "<label class='reorder-inactive'><input type='checkbox' data-mini='true' name='subQuestionCheckBox' checked value='question-"+questionId+"' />"+unescape(questionText)+"</label>";
                                               innerHTMLString2 += "</div>";
                                               }
                                               }
                                               $("#conditionalQuestionsDiv").html(innerHTMLString+innerHTMLString2);
                                               });
                                 
                                 $.mobile.navigate("#addSubQuestionScreen");
                                 window.plugins.spinnerDialog.hide();
                                 
                                 }
                                 }
                                 });
                   });
    
};


var showSelectedQuestion = function(questionId){
    console.log("I am coming in showSelectedQuestion");
    if($("#multipleChoice").is("[disabled=disabled]")){
        
        $("#multipleChoice").prop("disabled", false);
    }
    if($("#yesNO").is("[disabled=disabled]")){
        
        $("#yesNO").prop("disabled", false);
    }
    
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    
    var selectQuestion = "select * from question_table where id = "+ questionId + " and checklist_id ="+parseInt(checkListId);
    
    var selectAnswer = "";
    
    db.transaction(function(tx) {
                   tx.executeSql(selectQuestion, [], function(tx, res) {
                                 var len = res.rows.length;
                                 if(len>0)
                                 
                                 {
                                 for (var i = 0; i < len; i++)
                                 {
                                 // questionId = res.rows.item(i)['id'];
                                 var questionText = res.rows.item(i)['question'];
                                 var questionType = res.rows.item(i)['question_type'];
                                 var photoStatus = res.rows.item(i)['photo'];
                                 var notesStatus = res.rows.item(i)['notes'];
                                 var selectedCheckListId = res.rows.item(i)['checklist_id'];
                                 var sub_question_exists = res.rows.item(i)['sub_question_exists'];
                                 var selectAnswer = "";
                                 
                                 $("#CheckListTextAreaQuestion").val(unescape(questionText));
                                 $("#questionDisplay").val("old");
                                 if(photoStatus == "active"){
                                 $("#questionPhotoDiv").css('background','#0088c7');
                                 $("#question-photo-text").css('color','#ffffff');
                                 $("#question-photo-value").val("active");
                                 }else{
                                 $("#questionPhotoDiv").css('background','#ffffff');
                                 $("#question-photo-text").css('color','#808080');
                                 $("#question-photo-value").val("inactive");
                                 }
                                 
                                 
                                 
                                 if(notesStatus == "active"){
                                 $("#questionNotesDiv").css('background','#0088c7');
                                 $("#question-notes-text").css('color','#ffffff');
                                 $("#question-notes-value").val("active");
                                 }else{
                                 $("#questionNotesDiv").css('background','#ffffff');
                                 $("#question-notes-text").css('color','#808080');
                                 $("#question-notes-value").val("inactive");
                                 }
                                 
                                 if(sub_question_exists == 1){
                                 $("#linkedSubQuestion").css("display","block");
                                 }else{
                                 $("#linkedSubQuestion").css("display","none");
                                 }
                                 
                                 
                                 if(questionType == "YN"){
                                 
                                 selectAnswer = "Select * from answer_yn_table where question_id="+questionId + " and checklist_id ="+parseInt(checkListId);
                                 if ($("#multipleChoice").prop("checked")){
                                 console.log("YN is enabled answer is YN");
                                 
                                 console.log("MC Checked:"+$("#multipleChoice").prop("checked"));
                                 console.log("MC Disabled:"+$("#multipleChoice").prop("disabled"));
                                 console.log("MC Enabled:"+$("#multipleChoice").prop("enabled"));
                                 console.log("YN Checked:"+$("#yesNO").prop("checked"))
                                 console.log("YN Disabled:"+$("#yesNO").prop("disabled"));
                                 console.log("MC Enabled:"+$("#yesNO").prop("enabled"));
                                 $("#yesNO").prop("disabled", false).checkboxradio("refresh");
                                 $("#multipleChoice").attr("checked", false);
                                 $("#yesNO").attr("checked", true);
                                 $("#yesNO").prop("checked", true).checkboxradio("refresh");
                                 $("#multipleChoice").prop("disabled",true).checkboxradio("refresh");
                                 //$("input[type='radio']").checkboxradio("refresh");
                                 
                                 }else{
                                 //console.log("YN is enabled answer is MC");
                                 console.log("MC Checked:"+$("#multipleChoice").prop("checked"));
                                 console.log("MC Disabled:"+$("#multipleChoice").prop("disabled"));
                                 console.log("MC Enabled:"+$("#multipleChoice").prop("enabled"));
                                 console.log("YN Checked:"+$("#yesNO").prop("checked"))
                                 console.log("YN Disabled:"+$("#yesNO").prop("disabled"));
                                 console.log("MC Enabled:"+$("#yesNO").prop("enabled"));
                                 if($("#yesNO").is("[disabled=disabled]")){
                                 
                                 
                                 $("#yesNO").prop("disabled", false);
                                 }
                                 $("#yesNO").attr("checked", true);
                                 $("#yesNO").prop("checked", true);
                                 $("#multipleChoice").prop("disabled",true);
                                 
                                 }
                                 
                                 
                                 tx.executeSql(selectAnswer, [], function(tx, res) {
                                               var len = res.rows.length;
                                               if(len>0)
                                               
                                               {
                                               for (var i = 0; i < len; i++)
                                               {
                                               
                                               
                                               var correctiveAction = res.rows.item(i)['corrective_action'];
                                               if(correctiveAction==1){
                                               $( "#CAYes" ).attr("class","corrective-action-yes-no-selected");
                                               }else if(correctiveAction==2){
                                               $( "#CANo" ).attr("class","corrective-action-yes-no-selected");
                                               }else if(correctiveAction==3){
                                               $( "#CANA" ).attr("class","corrective-action-yes-no-selected");
                                               }
                                               $.mobile.navigate("#editCheckListQuestion");
                                               window.plugins.spinnerDialog.hide();
                                               }
                                               }
                                               }, function(error) {
                                               console.log('transaction error select yn table: ' + error.message);
                                               }, function() {
                                               console.log('transaction select yn table ok');
                                               
                                               });
                                 
                                 
                                 }else{
                                 selectAnswer = "Select * from answer_mc_table where question_id="+questionId + " and checklist_id ="+parseInt(checkListId);
                                 if ($("#yesNO").prop("checked")){
                                 
                                 console.log("YN is disabled answer is MC");
                                 
                                 console.log("MC Checked:"+$("#multipleChoice").prop("checked"));
                                 console.log("MC Disabled:"+$("#multipleChoice").prop("disabled"));
                                 console.log("MC Enabled:"+$("#multipleChoice").prop("enabled"));
                                 console.log("YN Checked:"+$("#yesNO").prop("checked"))
                                 console.log("YN Disabled:"+$("#yesNO").prop("disabled"));
                                 console.log("MC Enabled:"+$("#yesNO").prop("enabled"));
                                 $("#multipleChoice").prop("disabled", false);
                                 $("#yesNO").prop("checked", false).checkboxradio("refresh");
                                 $("#multipleChoice").attr("checked", true);
                                 $("#multipleChoice").prop("checked", true).checkboxradio("refresh");
                                 
                                 $("#yesNO").prop("disabled",true).checkboxradio("refresh");
                                 // $("input[type='radio']").checkboxradio("refresh");
                                 
                                 }else{
                                 console.log("YN is enabled answer is MC");
                                 console.log("MC Checked:"+$("#multipleChoice").prop("checked"));
                                 console.log("MC Disabled:"+$("#multipleChoice").prop("disabled"));
                                 console.log("MC Enabled:"+$("#multipleChoice").prop("enabled"));
                                 console.log("YN Checked:"+$("#yesNO").prop("checked"))
                                 console.log("YN Disabled:"+$("#yesNO").prop("disabled"));
                                 console.log("MC Enabled:"+$("#yesNO").prop("enabled"));
                                 $("#multipleChoice").prop("disabled",false);
                                 $("#yesNO").prop("disabled",true);
                                 $("#multipleChoice").attr("checked", true);
                                 $("#yesNO").prop("disabled",true);
                                 $("#yesNO").prop("checked", true);
                                 
                                 console.log("YN is enabled answer is MC");
                                 console.log("MC Checked:"+$("#multipleChoice").prop("checked"));
                                 console.log("MC Disabled:"+$("#multipleChoice").prop("disabled"));
                                 console.log("MC Enabled:"+$("#multipleChoice").prop("enabled"));
                                 console.log("YN Checked:"+$("#yesNO").prop("checked"))
                                 console.log("YN Disabled:"+$("#yesNO").prop("disabled"));
                                 console.log("MC Enabled:"+$("#yesNO").prop("enabled"));
                                 
                                 
                                 }
                                 // $("#yesNO").prop("checked",false);
                                 //$("#multipleChoice").prop("checked", true);
                                 
                                 tx.executeSql(selectAnswer, [], function(tx, res) {
                                               
                                               
                                               var len = res.rows.length;
                                               if(len>0)
                                               
                                               {
                                               for (var i = 0; i < len; i++)
                                               {
                                               
                                               var answer1 = res.rows.item(i)['answer1'];
                                               var answer2 = res.rows.item(i)['answer2'];
                                               var answer3 = res.rows.item(i)['answer3'];
                                               var answer4 = res.rows.item(i)['answer4'];
                                               var answer5 = res.rows.item(i)['answer5'];
                                               var correctiveAction = res.rows.item(i)['corrective_action'];
                                               $("#Answer1").text(unescape(answer1));
                                               $("#Answer2").text(unescape(answer2));
                                               $("#Answer3").text(unescape(answer3));
                                               $("#Answer4").text(unescape(answer4));
                                               $("#Answer5").text(unescape(answer5));
                                               $("#CA"+correctiveAction.toString()).attr("class","corrective-action-style-selected");
                                               $.mobile.navigate("#editCheckListQuestion");
                                               
                                               window.plugins.spinnerDialog.hide();
                                               }
                                               }
                                               }, function(error) {
                                               console.log('transaction error select mc table: ' + error.message);
                                               }, function() {
                                               console.log('transaction select mc table ok');
                                               
                                               });
                                 
                                 }
                                 
                                 
                                 
                                 }
                                 }
                                 });
                   
                   });
    
};

var showSelectedSubQuestion = function(questionId){
    //By default disable both
    
    if($("#multipleChoiceSub").is("[disabled=disabled]")){
        
        $("#multipleChoiceSub").prop("disabled", false);
    }
    if($("#yesNOSub").is("[disabled=disabled]")){
        
        $("#yesNOSub").prop("disabled", false);
    }
    
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    
    var selectQuestion = "select * from sub_question_table where question_id = "+ questionId + " and checklist_id ="+parseInt(checkListId);
    
    var selectAnswer = "";
    
    db.transaction(function(tx) {
                   tx.executeSql(selectQuestion, [], function(tx, res) {
                                 var len = res.rows.length;
                                 if(len>0)
                                 
                                 {
                                 for (var i = 0; i < len; i++)
                                 {
                                 // questionId = res.rows.item(i)['id'];
                                 var questionText = res.rows.item(i)['question'];
                                 var questionType = res.rows.item(i)['question_type'];
                                 var photoStatus = res.rows.item(i)['photo'];
                                 var notesStatus = res.rows.item(i)['notes'];
                                 var selectedCheckListId = res.rows.item(i)['checklist_id'];
                                 var selectAnswer = "";
                                 
                                 $("#CheckListTextAreaSubQuestion").val(unescape(questionText));
                                 if(photoStatus == "active"){
                                 $("#questionPhotoDivSub").css('background','#0088c7');
                                 $("#question-photo-text-sub").css('color','#ffffff');
                                 $("#question-photo-value-sub").val("active");
                                 }else{
                                 $("#questionPhotoDivSub").css('background','#ffffff');
                                 $("#question-photo-text-sub").css('color','#808080');
                                 $("#question-photo-value-sub").val("inactive");
                                 }
                                 
                                 
                                 
                                 if(notesStatus == "active"){
                                 $("#questionNotesDiv").css('background','#0088c7');
                                 $("#question-notes-text").css('color','#ffffff');
                                 $("#question-notes-value").val("active");
                                 }else{
                                 $("#questionNotesDiv").css('background','#ffffff');
                                 $("#question-notes-text").css('color','#808080');
                                 $("#question-notes-value").val("inactive");
                                 }
                                 
                                 
                                 
                                 
                                 if(questionType == "YN"){
                                 
                                 selectAnswer = "Select * from answer_yn_table where question_id="+questionId + " and checklist_id ="+parseInt(checkListId);
                                 if ($("#multipleChoiceSub").attr("checked")){
                                 
                                 $("#yesNOSub").prop("disabled", false).checkboxradio("refresh");
                                 $("#multipleChoiceSub").attr("checked", false);
                                 $("#yesNOSub").attr("checked", true);
                                 $("#yesNOSub").prop("checked", true).checkboxradio("refresh");
                                 $("#multipleChoiceSub").prop("disabled",true).checkboxradio("refresh");
                                 //$("input[type='radio']").checkboxradio("refresh");
                                 
                                 }else{
                                 if($("#yesNOSub").is("[disabled=disabled]")){
                                 
                                 $("#yesNOSub").prop("disabled", false);
                                 }
                                 $("#yesNOSub").attr("checked", true);
                                 $("#yesNOSub").prop("checked", true);
                                 $("#multipleChoiceSub").prop("disabled",true);
                                 
                                 }
                                 
                                 
                                 
                                 tx.executeSql(selectAnswer, [], function(tx, res) {
                                               var len = res.rows.length;
                                               if(len>0)
                                               
                                               {
                                               for (var i = 0; i < len; i++)
                                               {
                                               
                                               
                                               var correctiveAction = res.rows.item(i)['corrective_action'];
                                               if(correctiveAction==1){
                                               $( "#CAYesSub" ).attr("class","corrective-action-yes-no-selected");
                                               }else if(correctiveAction==2){
                                               $( "#CANoSub" ).attr("class","corrective-action-yes-no-selected");
                                               }else if(correctiveAction==3){
                                               $( "#CANASub" ).attr("class","corrective-action-yes-no-selected");
                                               }
                                               $.mobile.navigate("#editCheckListSubQuestion");
                                               window.plugins.spinnerDialog.hide();
                                               }
                                               }
                                               }, function(error) {
                                               console.log('transaction error select yn table: ' + error.message);
                                               }, function() {
                                               console.log('transaction select yn table ok');
                                               
                                               });
                                 
                                 
                                 }else{
                                 selectAnswer = "Select * from answer_mc_table where question_id="+questionId + " and checklist_id ="+parseInt(checkListId);
                                 if ($("#yesNOSub").attr("checked")){
                                 console.log("YN is disabled answer is MC");
                                 $("#multipleChoiceSub").prop("disabled", false);
                                 $("#yesNOSub").prop("checked", false).checkboxradio("refresh");
                                 $("#multipleChoiceSub").attr("checked", true);
                                 $("#multipleChoiceSub").prop("checked", true).checkboxradio("refresh");
                                 
                                 $("#yesNOSub").prop("disabled",true).checkboxradio("refresh");
                                 // $("input[type='radio']").checkboxradio("refresh");
                                 
                                 }else{
                                 
                                 
                                 $("#multipleChoiceSub").prop("disabled",false);
                                 $("#yesNOSub").prop("disabled",true);
                                 $("#multipleChoiceSub").attr("checked", true);
                                 $("#yesNOSub").prop("disabled",true);
                                 $("#yesNOSub").prop("checked", true);
                                 
                                 
                                 }
                                 // $("#yesNO").prop("checked",false);
                                 //$("#multipleChoice").prop("checked", true);
                                 
                                 tx.executeSql(selectAnswer, [], function(tx, res) {
                                               
                                               
                                               var len = res.rows.length;
                                               if(len>0)
                                               
                                               {
                                               for (var i = 0; i < len; i++)
                                               {
                                               
                                               var answer1 = res.rows.item(i)['answer1'];
                                               var answer2 = res.rows.item(i)['answer2'];
                                               var answer3 = res.rows.item(i)['answer3'];
                                               var answer4 = res.rows.item(i)['answer4'];
                                               var answer5 = res.rows.item(i)['answer5'];
                                               var correctiveAction = res.rows.item(i)['corrective_action'];
                                               $("#Answer1Sub").text(unescape(answer1));
                                               $("#Answer2Sub").text(unescape(answer2));
                                               $("#Answer3Sub").text(unescape(answer3));
                                               $("#Answer4Sub").text(unescape(answer4));
                                               $("#Answer5Sub").text(unescape(answer5));
                                               $("#CA"+correctiveAction.toString()+"Sub").attr("class","corrective-action-style-selected");
                                               $.mobile.navigate("#editCheckListSubQuestion");
                                               
                                               window.plugins.spinnerDialog.hide();
                                               }
                                               }
                                               }, function(error) {
                                               console.log('transaction error select mc table: ' + error.message);
                                               }, function() {
                                               console.log('transaction select mc table ok');
                                               
                                               });
                                 
                                 }
                                 
                                 
                                 
                                 }
                                 }
                                 });
                   
                   });
    
};



var uncheckedQuestions = function(checkedArr,uncheckedArr,selectedReponse){
    var r = $.Deferred();
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    var uncheckedArrNew = uncheckedArr.filter(function(v){return v!==''});
    
    db.transaction(function(tx){
                   for(var j=0;j<uncheckedArrNew.length;j++){
                   console.log("unchecked elements:"+uncheckedArrNew[j]);
                   var selectStatement = "Select * from sub_question_table where question_id="+uncheckedArrNew[j].split("-")[1] + " and checklist_id ="+parseInt(checkListId);;
                   console.log(selectStatement);
                   tx.executeSql(selectStatement,[], function(tx, res) {
                                 var len = res.rows.length;
                                 if(len>0){
                                 for (var i = 0; i < len; i++)
                                 {
                                 var question_id = res.rows.item(i)['question_id'];
                                 var parent_id = res.rows.item(i)['parent_id'];
                                 var question = res.rows.item(i)['question'];
                                 var checklist_id = res.rows.item(i)['checklist_id'];
                                 var question_type = res.rows.item(i)['question_type'];
                                 var photo = res.rows.item(i)['photo'];
                                 var notes = res.rows.item(i)['notes'];
                                 
                                 
                                 //Insert these values into question_table
                                 
                                 var insertNewStatement = "Insert into question_table (id,question,checklist_id,question_type,photo,notes,sub_question_exists,sort_order,sub_question_response) values("+parseInt(question_id)+",'"+question+"',"+checklist_id+",'"+question_type+"','"+photo+"','"+notes+"',0,-1,'')";
                                 
                                 
                                 db.transaction(function(tx){
                                                
                                                tx.executeSql(insertNewStatement);
                                                }, function(error) {
                                                console.log('transaction error insert sub question: ' + error.message);
                                                }, function() {
                                                console.log('transaction insert subquestion ok');
                                                });
                                 
                                 //Delete those rows from sub_question_table
                                 
                                 var deleteStatement = "Delete from sub_question_table where question_id =  "+parseInt(question_id)+ " and checklist_id ="+parseInt(checkListId);;
                                 console.log("Delete Statement :"+deleteStatement);
                                 db.transaction(function(tx){
                                                
                                                tx.executeSql(deleteStatement);
                                                }, function(error) {
                                                console.log('transaction error delete sub question: ' + error.message);
                                                }, function() {
                                                console.log('transaction delete subquestion ok');
                                                });
                                 }
                                 
                                 
                                 
                                 }
                                 });
                   
                   
                   
                   
                   
                   }
                   });
    
    return r;
};

var createChecklistJSON = function(checkListId){
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    var selectQuestionStatement = "Select * from question_table where checklist_id= "+ checkListId +" order by sort_order asc";
    
    var selectSectionsStatement = "Select * from section_table where checklist_id= "+ checkListId +" order by sort_order asc";
    
    var selectMCAnswerStatement = "Select * from answer_mc_table where checklist_id= "+ checkListId ;
    
    var selectYNStatement = "Select * from answer_yn_table where checklist_id= "+ checkListId ;
    
    var selectSubQuestionsStatement = "Select * from sub_question_table where checklist_id= "+ checkListId ;
    
    var selectChecklist = "Select * from picklist_table where id = "+ checkListId;
    
    var JSONData = new Object();
    var questionsArrayObject = [];
    var sectionsArrayObject = [];
    var subQuestionsArrayObject = [];
    var YNQuestionsArrayObject = [];
    var MCQuestionsArrayObject = [];
    
    db.transaction(function(tx){
                   tx.executeSql(selectChecklist,[], function(tx, res) {
                                 var len = res.rows.length;
                                 
                                 if(len>0){
                                 for (var i = 0; i < len; i++)
                                 {
                                 
                                 JSONData.pickListName = res.rows.item(i)['picklist_name'];
                                 JSONData.pickListDescription = res.rows.item(i)['picklist_description'];
                                 JSONData.pickListCreationTimeStamp = res.rows.item(i)['cdatetime'];
                                 JSONData.pickListAuditorName = res.rows.item(i)['auditor_name'];
                                 JSONData.pickListAuditorLOB = res.rows.item(i)['auditor_lob'];
                                 }
                                 //Execute the next SQL - Questions
                                 
                                 tx.executeSql(selectQuestionStatement,[], function(tx, res) {
                                               var len = res.rows.length;
                                               
                                               if(len>0){
                                               for (var i = 0; i < len; i++)
                                               {
                                               var questionObject = new Object();
                                               questionObject.qid = res.rows.item(i)['id'];
                                               questionObject.questionText = res.rows.item(i)['question'];
                                               questionObject.sortOrder = res.rows.item(i)['sort_order'];
                                               questionObject.questionType = res.rows.item(i)['question_type'];
                                               questionObject.photo = res.rows.item(i)['photo'];
                                               questionObject.notes = res.rows.item(i)['notes'];
                                               questionObject.subQuestionsExists = res.rows.item(i)['sub_question_exists'];
                                               questionObject.subQuestionResponse = res.rows.item(i)['sub_question_response'];
                                               questionsArrayObject.push(questionObject);
                                               
                                               
                                               }
                                               
                                               }
                                               //Execute the next SQL - Sections
                                               tx.executeSql(selectSectionsStatement,[], function(tx, res) {
                                                             var len = res.rows.length;
                                                             
                                                             if(len>0){
                                                             for (var i = 0; i < len; i++)
                                                             {
                                                             var sectionObject = new Object();
                                                             sectionObject.sectionId = res.rows.item(i)['id'];
                                                             sectionObject.checklistId = res.rows.item(i)['checklist_id'];
                                                             sectionObject.sortOrder = res.rows.item(i)['sort_order'];
                                                             sectionObject.sectionText = res.rows.item(i)['section'];
                                                             sectionObject.questionList = res.rows.item(i)['question_list'];
                                                             sectionsArrayObject.push(sectionObject);
                                                             
                                                             
                                                             }
                                                             
                                                             }
                                                             //Execute the next SQL - Sub Questions
                                                             tx.executeSql(selectSubQuestionsStatement,[], function(tx, res) {
                                                                           var len = res.rows.length;
                                                                           
                                                                           if(len>0){
                                                                           for (var i = 0; i < len; i++)
                                                                           {
                                                                           var subQuestionObject = new Object();
                                                                           subQuestionObject.qid = res.rows.item(i)['question_id'];
                                                                           subQuestionObject.pid = res.rows.item(i)['parent_id'];
                                                                           subQuestionObject.question = res.rows.item(i)['question'];
                                                                           subQuestionObject.checklistId = res.rows.item(i)['checklist_id'];
                                                                           subQuestionObject.questionType = res.rows.item(i)['question_type'];
                                                                           subQuestionObject.sortOrder = res.rows.item(i)['sort_order'];
                                                                           subQuestionObject.photo = res.rows.item(i)['photo'];
                                                                           subQuestionObject.notes = res.rows.item(i)['notes'];
                                                                           subQuestionsArrayObject.push(subQuestionObject);
                                                                           
                                                                           
                                                                           }
                                                                           
                                                                           }
                                                                           
                                                                           //Execute the next SQL - YN Questions
                                                                           tx.executeSql(selectYNStatement,[], function(tx, res) {
                                                                                         var len = res.rows.length;
                                                                                         
                                                                                         if(len>0){
                                                                                         for (var i = 0; i < len; i++)
                                                                                         {
                                                                                         var YNQuestionObject = new Object();
                                                                                         YNQuestionObject.id = res.rows.item(i)['id'];
                                                                                         YNQuestionObject.qid = res.rows.item(i)['question_id'];
                                                                                         YNQuestionObject.CA = res.rows.item(i)['corrective_action'];
                                                                                         YNQuestionObject.checklistId = res.rows.item(i)['checklist_id'];
                                                                                         
                                                                                         YNQuestionsArrayObject.push(YNQuestionObject);
                                                                                         
                                                                                         
                                                                                         }
                                                                                         
                                                                                         }
                                                                                         //Execute the next SQL - MC Questions
                                                                                         tx.executeSql(selectMCAnswerStatement,[], function(tx, res) {
                                                                                                       var len = res.rows.length;
                                                                                                       
                                                                                                       if(len>0){
                                                                                                       for (var i = 0; i < len; i++)
                                                                                                       {
                                                                                                       var MCQuestionObject = new Object();
                                                                                                       MCQuestionObject.id = res.rows.item(i)['id'];
                                                                                                       MCQuestionObject.qid = res.rows.item(i)['question_id'];
                                                                                                       MCQuestionObject.CA = res.rows.item(i)['corrective_action'];
                                                                                                       MCQuestionObject.checklistId = res.rows.item(i)['checklist_id'];
                                                                                                       MCQuestionObject.answer1 = res.rows.item(i)['answer1'];
                                                                                                       MCQuestionObject.answer2 = res.rows.item(i)['answer2'];
                                                                                                       MCQuestionObject.answer3 = res.rows.item(i)['answer3'];
                                                                                                       MCQuestionObject.answer4 = res.rows.item(i)['answer4'];
                                                                                                       MCQuestionObject.answer5 = res.rows.item(i)['answer5'];
                                                                                                       
                                                                                                       MCQuestionsArrayObject.push(MCQuestionObject);
                                                                                                       
                                                                                                       
                                                                                                       }
                                                                                                       
                                                                                                       }
                                                                                                       });
                                                                                         });
                                                                           });
                                                             
                                                             });
                                               
                                               
                                               });
                                 
                                 
                                 
                                 }
                                 });
                   
                   
                   }, function(error) {
                   console.log('transaction error delete  subquestion: ' + error.message);
                   }, function() {
                   console.log('transaction delete subquestion ok');
                   JSONData.questions = questionsArrayObject;
                   JSONData.sections = sectionsArrayObject;
                   JSONData.subquestions = subQuestionsArrayObject;
                   JSONData.YNquestions = YNQuestionsArrayObject;
                   JSONData.MCquestions = MCQuestionsArrayObject;
                   var url = "https://webvan-dev.disney.com/wdpr/safedchecklite/AddCheckListData";
                   var jxhr = $.ajax({
                                     type : "POST",
                                     url : url,
                                     data : {jsonData:JSON.stringify(JSONData)}// serializes the form's elements.
                                     
                                     }).done(function(data) {
                                             //console.log(data);
                                             window.plugins.spinnerDialog.hide();
                                             navigator.notification.alert(
                                                                          "Your checklist has been successfully shared",  // message
                                                                          alertDismissed,         // callback
                                                                          'Success',            // title
                                                                          'Done'                  // buttonName
                                                                          );
                                             }).fail(function(jqXHR, textStatus) {
                                                     console.log(textStatus);
                                                     showAlert("Oops. Something went wrong. Please try again later.");
                                                     });
                   window.plugins.spinnerDialog.hide();
                   });
};

var copySharedPickListToLocal = function(){
    var pickListData = localStorage.getItem("sharedPickList");
    var pickListDetails = localStorage.getItem("sharedPickListData");
    pickListData = JSON.parse(pickListData);
    pickListDetails = JSON.parse(pickListDetails);
    
    var insertedCheckListId = -1;
    
    var auditorName = localStorage.getItem("storedName");
    var auditorLOB = localStorage.getItem("storedLOB");
    var allQueriesArray = [];
    
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    
    var insertStatement = "Insert into picklist_table (picklist_name,picklist_description,cdatetime,favorite,auditor_name,auditor_lob) values ('"+pickListData.checkListName+"','"+pickListData.checkListDescription+"',"+  new Date().getTime()+ ",0,'"+auditorName+"','"+auditorLOB+"')";
    
    
    db.transaction(function(tx) {
                   tx.executeSql(insertStatement);
                   }, function(error) {
                   console.log('transaction error insert: ' + error.message);
                   }, function() {
                   console.log('transaction ok');
                   
                   });
    
    db.transaction(function(tx) {
                   tx.executeSql("select * from picklist_table ORDER BY id DESC LIMIT 1;", [], function(tx, res) {
                                 var len = res.rows.length;
                                 if(len>0)
                                 {
                                 for (var i = 0; i < len; i++)
                                 {
                                 insertedCheckListId = res.rows.item(i)['id'];
                                 ////////////////
                                 
                                 
                                 //YN Questions
                                 
                                 for(var l=0;l<pickListDetails.YNquestions.length;l++){
                                 
                                 allQueriesArray.push("Insert into answer_yn_table (id,corrective_action,question_id,checklist_id) values( "+pickListDetails.YNquestions[l].id+","+pickListDetails.YNquestions[l].CA+","+pickListDetails.YNquestions[l].questionId+","+insertedCheckListId+")");
                                 
                                 }
                                 
                                 //Questions
                                 
                                 for(var j=0;j<pickListDetails.questions.length;j++){
                                 
                                 
                                 allQueriesArray.push("Insert into question_table (id,question,sort_order,checklist_id,question_type,photo,notes,sub_question_exists,sub_question_response) values( "+pickListDetails.questions[j].id+",'"+pickListDetails.questions[j].question+"',"+pickListDetails.questions[j].sortOrder+","+insertedCheckListId+",'"+pickListDetails.questions[j].questionType+"','"+pickListDetails.questions[j].photo+"','"+pickListDetails.questions[j].notes+"',"+pickListDetails.questions[j].subQuestionExists+",'"+pickListDetails.questions[j].subQuestionResponse+"')");
                                 
                                 }
                                 
                                 //MC Questions
                                 
                                 for(var k=0;k<pickListDetails.MCquestions.length;k++){
                                 
                                 
                                 allQueriesArray.push("Insert into answer_mc_table (id,answer1,answer2,answer3,answer4,answer5,corrective_action,question_id,checklist_id) values( "+pickListDetails.MCquestions[k].id+",'"+pickListDetails.MCquestions[k].answer1+"','"+pickListDetails.MCquestions[k].answer2+"','"+pickListDetails.MCquestions[k].answer3+"','"+pickListDetails.MCquestions[k].answer4+"','"+pickListDetails.MCquestions[k].answer5+"',"+parseInt(pickListDetails.MCquestions[k].CA)+","+pickListDetails.MCquestions[k].questionId+","+insertedCheckListId+")");
                                 
                                 }
                                 
                                 
                                 // Sub Questions
                                 
                                 
                                 for(var m=0;m<pickListDetails.subquestions.length;m++){
                                 
                                 
                                 allQueriesArray.push("Insert into sub_question_table (question_id,parent_id,question,checklist_id,question_type,photo,notes,sort_order) values( "+pickListDetails.subquestions[m].questionId+","+pickListDetails.subquestions[m].parentId+",'"+pickListDetails.subquestions[m].question+"',"+insertedCheckListId+",'"+pickListDetails.subquestions[m].questionType+"','"+pickListDetails.subquestions[m].photo+"','"+pickListDetails.subquestions[m].notes+"',"+parseInt(pickListDetails.subquestions[m].sortOrder)+")");
                                 
                                 }
                                 
                                 //Sections
                                 
                                 for(var n=0;n<pickListDetails.sections.length;n++){
                                 
                                 
                                 allQueriesArray.push("Insert into section_table (id,checklist_id,section,sort_order,question_list) values( "+pickListDetails.sections[n].id+","+insertedCheckListId+",'"+pickListDetails.sections[n].section+"',"+pickListDetails.sections[n].sortOrder+",'"+pickListDetails.sections[n].questionList+"')");
                                 
                                 }
                                 
                                 ///////////////
                                 
                                 
                                 db.transaction(function(tx){
                                                for(var z=0;z<allQueriesArray.length;z++){
                                                tx.executeSql(allQueriesArray[z]);
                                                }}, function(error) {
                                                console.log('transaction error update question: ' + error.message);
                                                }, function() {
                                                console.log('transaction update question ok');
                                                //Add alert here
                                                navigator.notification.alert(
                                                                             "Checklist has been successfully added to your device",  // message
                                                                             alertDismissed,         // callback
                                                                             'Success',            // title
                                                                             'Done'                  // buttonName
                                                                             );
                                                });
                                 
                                 }
                                 }
                                 });
                   });
    
    
    
    
    
    
    
};

var populateAllListsTab = function(){
    if (checkConnection() == 'No network connection') {
        showAlert("No internet connection found. Please try when connection is available.");
        return;
    }
    
    var sortOrder = "";
    if(localStorage.getItem("sortOrder") === null){
        sortOrder = "LOB";
    }else{
        sortOrder = localStorage.getItem("sortOrder");
    }
    
    var innerHTMLString = "";
    var url = "https://webvan-dev.disney.com/wdpr/safedchecklite/GetPickListData?sortOrder="+sortOrder+"&searchItem=emptyString";
    var jxhr = $.ajax({
                      type : "POST",
                      url : url,
                      dataType: 'json'
                      
                      }).done(function(data) {
                              
                              // console.log(res.rows.item(i)['picklist_name']);
                              // console.log(res.rows.item(i)['picklist_description']);
                              // console.log(timeConverter(res.rows.item(i)['cdatetime']));
                              for(var i =0;i<data.allSharedPickLists.length;i++){
                              var checklistId = "checklist-"+data.allSharedPickLists[i].id;
                              innerHTMLString += "<div id="+ checklistId  +" class='checklist-individual-shared-div'>";
                              innerHTMLString += "<div class='checklist-creator-name'><span class='checklist-name'>"+unescape(data.allSharedPickLists[i].picklist_name)+"</span><span class='checklist-creation-date'>"+timeConverter(data.allSharedPickLists[i].cdatetime)+"</span></div>";
                              innerHTMLString +=  "<div class='checklist-description'>"+unescape(data.allSharedPickLists[i].picklist_description)+"</div>";
                              innerHTMLString +=  "<div class='checklist-creator-LOB'>"+data.allSharedPickLists[i].auditor_lob+"</div>";
                              innerHTMLString +=  "<div class='checklist-auditor-name'><span>"+unescape(data.allSharedPickLists[i].auditor_name)+"</span>";
                              if(localStorage.getItem("storedName") == data.allSharedPickLists[i].auditor_name && localStorage.getItem("storedLOB") == data.allSharedPickLists[i].auditor_lob ){
                              innerHTMLString += "<span class='user-created-favorite'><span class='user-image-class'><img src='assets/icon_profile_picklist.png'></span></span>";
                              }
                              innerHTMLString += "</div>";
                              innerHTMLString += "</div>";
                              }
                              
                              
                              
                              
                              $("#checkListindex").html(innerHTMLString);
                              
                              window.plugins.spinnerDialog.hide();
                              // showAlert("Audit data saved successfully");
                              
                              
                              }).fail(function(jqXHR, textStatus) {
                                      console.log(textStatus);
                                      showAlert("Oops. Something went wrong. Please try again later.");
                                      });
};

var checkedQuestions = function(checkedArr,uncheckedArr,selectedReponse){
    var r = $.Deferred();
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    db.transaction(function(tx){
                   for(var i=0;i<checkedArr.length;i++){
                   var selectStatement = "Select *  from question_table where id="+checkedArr[i].split("-")[1];
                   tx.executeSql(selectStatement,[], function(tx, res) {
                                 var len = res.rows.length;
                                 if(len>0){
                                 for (var i = 0; i < len; i++)
                                 {
                                 var question_id = res.rows.item(i)['id']
                                 var question_text =  res.rows.item(i)['question'];
                                 var checklist_id =  res.rows.item(i)['checklist_id'];
                                 var question_type =  res.rows.item(i)['question_type'];
                                 var photo =  res.rows.item(i)['photo'];
                                 var notes =  res.rows.item(i)['notes'];
                                 
                                 var insertStatement = "Insert into sub_question_table (question_id,parent_id,question,checklist_id,question_type,photo,notes,sort_order) values("+parseInt(question_id)+","+questionIdSelected+",'"+question_text+"',"+checklist_id+",'"+question_type+"','"+photo+"','"+notes+"',-1)";
                                 
                                 var deleteStatement = "Delete from question_table where id = "+parseInt(question_id);
                                 
                                 
                                 
                                 
                                 //Check if these values are in sub_question_table
                                 
                                 var selectSubQuestionStatement = "Select * from sub_question_table where question_id="+parseInt(question_id) + " and checklist_id ="+parseInt(checkListId);
                                 tx.executeSql(selectSubQuestionStatement,[], function(tx, res) {
                                               var len = res.rows.length;
                                               if(len==0){
                                               //Insert these values into sub_question_table
                                               db.transaction(function(tx){
                                                              
                                                              tx.executeSql(insertStatement);
                                                              }, function(error) {
                                                              console.log('transaction error insert sub question: ' + error.message);
                                                              }, function() {
                                                              console.log('transaction insert subquestion ok');
                                                              $("#linkedSubQuestion").css("display","block");
                                                              });
                                               
                                               
                                               //Delete those rows from question_table;
                                               
                                               
                                               db.transaction(function(tx){
                                                              console.log("deleteStatement:"+deleteStatement);
                                                              tx.executeSql(deleteStatement);
                                                              }, function(error) {
                                                              console.log('transaction error delete  subquestion: ' + error.message);
                                                              }, function() {
                                                              console.log('transaction delete subquestion ok');
                                                              });
                                               }
                                               }, function(error) {
                                               console.log('transaction error length issue: ' + error.message);
                                               }, function() {
                                               console.log('transaction delete subquestion ok');
                                               });
                                 
                                 
                                 
                                 
                                 }
                                 }
                                 });
                   }
                   });
    
    return r;
    
    
};

var updateQuestionTableExists = function(selectedResponse){
    var r = $.Deferred();
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    //Check if its a new condition or condition already exists
    var selectQuestion = "Select * from question_table where id = "+questionIdSelected + " and checklist_id ="+parseInt(checkListId);
    var updateStatement = "Update question_table set sub_question_exists = 1,sub_question_response = '"+ selectedResponse +"'  where id = "+parseInt(questionIdSelected) + " and checklist_id ="+parseInt(checkListId);
    
    db.transaction(function(tx){
                   tx.executeSql(selectQuestion,[], function(tx, res) {
                                 var len = res.rows.length;
                                 
                                 if(len>0){
                                 for (var i = 0; i < len; i++)
                                 {
                                 var  sub_question_exists_already =  res.rows.item(i)['sub_question_exists'];
                                 //Update question_table set sub_question_exists value to 1
                                 if(sub_question_exists_already==0 || sub_question_exists_already==1){
                                 db.transaction(function(tx){
                                                
                                                tx.executeSql(updateStatement);
                                                }, function(error) {
                                                console.log('transaction error update  subquestion: ' + error.message);
                                                }, function() {
                                                console.log('transaction update subquestion ok');
                                                $("#linkedSubQuestion").css("display","block");
                                                });
                                 }else{
                                 updateQuestionTableNotExists();
                                 }
                                 
                                 
                                 }
                                 
                                 }
                                 });
                   });
    return r;
};

var updateQuestionTableNotExists = function(){
    //Lastly check if question id has any sub questions. If it doesnt then update questionId with sub_question_exists as 0 and reponse empty
    var selectEmptySubQuestion = "Select * from sub_question_table where parent_id="+parseInt(questionIdSelected) + " and checklist_id ="+parseInt(checkListId);
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    db.transaction(function(tx) {
                   tx.executeSql(selectEmptySubQuestion,[],function(tx,res){
                                 var len = res.rows.length;
                                 console.log("len in updateQuestionTableNotExists:"+len);
                                 if(len==0)
                                 {
                                 var updateQuestionStatement = "Update question_table set sub_question_exists = 0, sub_question_response='' where id =  "+parseInt(questionIdSelected) + " and checklist_id ="+parseInt(checkListId);;
                                 
                                 db.transaction(function(tx){
                                                
                                                tx.executeSql(updateQuestionStatement);
                                                }, function(error) {
                                                console.log('transaction error update sub question exists: ' + error.message);
                                                }, function() {
                                                console.log('transaction update sub question exists ok');
                                                $("#linkedSubQuestion").css("display","none");
                                                });
                                 }
                                 }, function(error) {
                                 console.log('transaction error select sub_question_table: ' + error.message);
                                 });
                   }, function(error) {
                   console.log('transaction error sub_question_table: ' + error.message);
                   },function() {
                   console.log('transaction ok');
                   
                   });
    
};

var deleteSubQuestion = function(){
    var r = $.Deferred();
    var allQueriesArray = [];
    var parent_id = "";
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    //Check if its a new condition or condition already exists
    var selectQuestion = "Select * from sub_question_table where question_id = "+parseInt(subQuestionIdSelected) + " and checklist_id="+parseInt(checkListId);
    
    db.transaction(function(tx) {
                   tx.executeSql(selectQuestion,[], function(tx, res) {
                                 var len = res.rows.length;
                                 if(len>0){
                                 for (var i = 0; i < len; i++)
                                 {
                                 var question_id = res.rows.item(i)['question_id']
                                 var question_text =  res.rows.item(i)['question'];
                                 var checklist_id =  res.rows.item(i)['checklist_id'];
                                 var question_type =  res.rows.item(i)['question_type'];
                                 parent_id = res.rows.item(i)['parent_id'];
                                 var photo =  res.rows.item(i)['photo'];
                                 var notes =  res.rows.item(i)['notes'];
                                 
                                 //Insert these values into question_table
                                 var insertNewStatement = "";
                                 insertNewStatement = "Insert into question_table (id,question,checklist_id,question_type,photo,notes,sub_question_exists,sort_order,sub_question_response) values("+parseInt(question_id)+",'"+question_text+"',"+checklist_id+",'"+question_type+"','"+photo+"','"+notes+"',0,-1,'')";
                                 allQueriesArray.push(insertNewStatement);
                                 
                                 var deleteStatement = "";
                                 deleteStatement = "Delete from sub_question_table where question_id =  "+parseInt(question_id) + " and checklist_id ="+parseInt(checkListId);
                                 
                                 allQueriesArray.push(deleteStatement);
                                 
                                 //                                 var updateQuestionStatement = "";
                                 //                                 updateQuestionStatement = "Update question_table set sub_question_exists = 0, sub_question_response='' where id =  "+parseInt(questionIdSelected) + " and checklist_id ="+parseInt(checkListId);
                                 //
                                 //                                 allQueriesArray.push(updateQuestionStatement);
                                 
                                 
                                 
                                 
                                 }
                                 }
                                 });
                   });
    db.transaction(function(tx){
                   for(var j=0;j<allQueriesArray.length;j++){
                   console.log("AllQueries:"+allQueriesArray[j]);
                   tx.executeSql(allQueriesArray[j]);
                   }}, function(error) {
                   console.log('transaction error update question: ' + error.message);
                   }, function() {
                   console.log('transaction update question ok');
                   var selectStatement = "Select * from sub_question_table where parent_id = "+parseInt(parent_id)+" and checklist_id ="+parseInt(checkListId);
                   
                   
                   db.transaction(function(tx) {
                                  tx.executeSql(selectStatement,[], function(tx, res) {
                                                var len = res.rows.length;
                                                if(len==0){
                                                console.log("Length here is 0");
                                                var updateQuestionStatement = "";
                                                updateQuestionStatement = "Update question_table set sub_question_exists = 0, sub_question_response='' where id =  "+parseInt(parent_id) + " and checklist_id ="+parseInt(checkListId);
                                                db.transaction(function(tx) {
                                                               tx.executeSql(updateQuestionStatement);
                                                               }, function(error) {
                                                               console.log('transaction error insert: ' + error.message);
                                                               }, function() {
                                                               console.log('transaction ok');
                                                               showSelectedCheckList(checkListId);
                                                               });
                                                
                                                }else{
                                                
                                                showSelectedCheckList(checkListId);
                                                }
                                                });
                                  });
                   
                   });
    
};


var deleteAllSubQuestions = function(){
    var r = $.Deferred();
    var allQueriesArray = [];
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    //Check if its a new condition or condition already exists
    var selectQuestion = "Select * from sub_question_table where parent_id = "+parseInt(questionIdSelected) + " and checklist_id="+parseInt(checkListId);
    
    db.transaction(function(tx) {
                   tx.executeSql(selectQuestion,[], function(tx, res) {
                                 var len = res.rows.length;
                                 if(len>0){
                                 for (var i = 0; i < len; i++)
                                 {
                                 var question_id = res.rows.item(i)['question_id']
                                 var question_text =  res.rows.item(i)['question'];
                                 var checklist_id =  res.rows.item(i)['checklist_id'];
                                 var question_type =  res.rows.item(i)['question_type'];
                                 var photo =  res.rows.item(i)['photo'];
                                 var notes =  res.rows.item(i)['notes'];
                                 
                                 //Insert these values into question_table
                                 var insertNewStatement = "";
                                 insertNewStatement = "Insert into question_table (id,question,checklist_id,question_type,photo,notes,sub_question_exists,sort_order,sub_question_response) values("+parseInt(question_id)+",'"+question_text+"',"+checklist_id+",'"+question_type+"','"+photo+"','"+notes+"',0,-1,'')";
                                 allQueriesArray.push(insertNewStatement);
                                 
                                 var deleteStatement = "";
                                 deleteStatement = "Delete from sub_question_table where question_id =  "+parseInt(question_id) + " and checklist_id ="+parseInt(checkListId);
                                 
                                 allQueriesArray.push(deleteStatement);
                                 
                                 var updateQuestionStatement = "";
                                 updateQuestionStatement = "Update question_table set sub_question_exists = 0, sub_question_response='' where id =  "+parseInt(questionIdSelected) + " and checklist_id ="+parseInt(checkListId);
                                 
                                 allQueriesArray.push(updateQuestionStatement);
                                 
                                 
                                 
                                 
                                 }
                                 }
                                 });
                   });
    db.transaction(function(tx){
                   for(var j=0;j<allQueriesArray.length;j++){
                   console.log("AllQueries:"+allQueriesArray[j]);
                   tx.executeSql(allQueriesArray[j]);
                   }}, function(error) {
                   console.log('transaction error update question: ' + error.message);
                   }, function() {
                   console.log('transaction update question ok');
                   $("#linkedSubQuestion").css("display","none");
                   showSelectedQuestion(questionIdSelected);
                   });
    
    
};



var saveSection = function(){
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    
    var sectionText = $("#sectionTextArea").val();
    
    var statement = "";
    
    if($("#sectionDisplay").val() == "new"){
        statement = "Insert into section_table (id,checklist_id,section,question_list,sort_order) values ((SELECT IFNULL(MAX(id), 0) + 1 FROM section_table),"+parseInt(checkListId)+",'"+escape(sectionText)+"','',-1)";
    }else{
        statement = "Update section_table set section = '"+escape(sectionText)+"' where id="+parseInt(sectionIdSelected);
    }
    console.log(statement);
    
    
    db.transaction(function(tx) {
                   tx.executeSql(statement);
                   }, function(error) {
                   console.log('transaction error insert: ' + error.message);
                   }, function() {
                   console.log('transaction ok');
                   if($("#sectionDisplay").val() == "new"){
                   showSelectedCheckList(checkListId);
                   }else{
                   populateQuestionsScreen("enable");
                   $("#sectionTextArea").val() = "";
                   }
                   
                   
                   });
    
};



function arr_diff (a1, a2) {
    
    var a = [], diff = [];
    
    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }
    
    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }
    
    for (var k in a) {
        diff.push(k);
    }
    
    return diff;
};

function sortBasedOnAnotherArray(A,B){
    var all = [];
    
    for (var i = 0; i < B.length; i++) {
        all.push({ 'A': A[i], 'B': B[i] });
    }
    
    all.sort(function(a, b) {
             return a.A - b.A;
             });
    
    A = [];
    B = [];
    
    for (var i = 0; i < all.length; i++) {
        A.push(all[i].A);
        B.push(all[i].B);
    }
    
    return B;
    
}

function getAuditClass(qid,answer,arr){
    
    var className = "answer-style-yes-no";
    for(var i=0;i<arr.length;i++){
        if(arr[i]==qid){
            if( arr[i+2] == answer){
                className = "answer-style-yes-no-selected";
                
            }
        }
        
    }
    
    return className;
}


function getMCAuditAnswer(qid,answer,arr){
    
    var className = "answer-style";
    for(var i=0;i<arr.length;i++){
        if(arr[i]==qid){
            if( arr[i+2] == answer){
                className = "answer-style-selected";
                
            }
        }
        
    }
    
    return className;
}

function checkCompletionTypeSelected(qid,arr,type){
    var status = false;
    if(type=="complete"){
        status = true;
    }else{
        if($.inArray(parseInt(qid),arr) == -1){
            return true;
        }
        
    }
    return status;
}

function getPhotoClass(qid,arr){
    var className = "quick-capture-middle-col-audit-photo-notes-inactive";
    if(arr!=""){
        for(var i=0;i<arr.length;i++){
            if(arr[i]==qid){
                if( arr[i+3] == "photoExists"){
                    className = "quick-capture-middle-col-audit-photo-notes-active";
                    
                }
            }
            
        }
    }
    return className;
}

function getNotesClass(qid,arr){
    var className = "quick-capture-middle-col-audit-photo-notes-inactive";
    if(arr!=""){
        for(var i=0;i<arr.length;i++){
            if(arr[i]==qid){
                if( arr[i+4] == "notesExists"){
                    className = "quick-capture-middle-col-audit-photo-notes-active";
                    
                }
            }
            
        }
    }
    return className;
}

function checkIfSubQuestionExists(questionId,subQuestionsArray,auditAnswersArray,answerMasterArray,answerMCQuestionIdArray,subQuestionResponse,answerYNMCArray,type){
    
    
    
    
    //    auditAnswersArray.push(res.rows.item(i)['question_id']);
    //    auditAnswersArray.push(res.rows.item(i)['question']);
    //    auditAnswersArray.push(unescape(res.rows.item(i)['answer']));
    
    var innerHTMLString = "";
    
    
    // console.log("checkCompletionTypeSelected(questionId,auditAnswersArray,type):"+checkCompletionTypeSelected(questionId,auditAnswersArray,type));
    
    for(var i=0;i<subQuestionsArray.length;i++){
        if(subQuestionsArray[i]==questionId &&  subQuestionsArray[i+3]=="YN" && checkCompletionTypeSelected(questionId,auditAnswersArray,type)){
            
            
            
            var middleAuditId = "qcmdDiv-"+ questionId;
            innerHTMLString +=  "<li class='"+getSubQuestionClass(subQuestionResponse,questionId,auditAnswersArray,subQuestionsArray[i+2])+"'  id='question-"+ subQuestionsArray[i+2] +"'>";
            innerHTMLString += "<div class=' '>"+unescape(subQuestionsArray[i+1]) + "</div>" ;
            
            innerHTMLString += "<div><table class='answer-table'> <tr><td class='"+getAuditClass(subQuestionsArray[i+2],'Yes',auditAnswersArray)+"'>Yes</td><td class='"+getAuditClass(subQuestionsArray[i+2],'No',auditAnswersArray)+"'>No</td><td class='"+getAuditClass(subQuestionsArray[i+2],'N/A',auditAnswersArray)+"'>N/A</td></tr></table></div>" ;
            //                                  innerHTMLString += "<div class='quick-capture-middle-audit'><div class='quick-capture-middle-col-audit-photo-notes-"+sortedPhotoNotesArray[l][0]+"'><div class='quick-capture-middle-div-question'><img src='assets/icon_photo_small.png'></div></div><div class='quick-capture-middle-col-audit-photo-notes-"+sortedPhotoNotesArray[l][1]+"'><div class='quick-capture-middle-div-question'><img src='assets/icon_notes_small.png'></div></div></div>";
            if(subQuestionsArray[i+4] == "active" && subQuestionsArray[i+5]=="inactive"){
                innerHTMLString += "<div id='"+middleAuditId+"' class='quick-capture-middle-audit'><div class='"+getPhotoClass(subQuestionsArray[i+2],auditAnswersArray)+"'><div class='quick-capture-middle-div-question'><img class='audit-image-class' src='assets/icon_photo_small.png'></div></div></div>";
            }else if(subQuestionsArray[i+4] == "inactive" && subQuestionsArray[i+5]=="active"){
                innerHTMLString += "<div id='"+middleAuditId+"' class='quick-capture-middle-audit'><div class='"+getNotesClass(subQuestionsArray[i+2],auditAnswersArray)+"'><div class='quick-capture-middle-div-question'><img class='audit-image-class' src='assets/icon_notes_small.png'></div></div></div>";
            }else if(subQuestionsArray[i+4] == "active" && subQuestionsArray[i+5]=="active"){
                innerHTMLString += "<div id='"+middleAuditId+"' class='quick-capture-middle-audit'><div class='"+getPhotoClass(subQuestionsArray[i+2],auditAnswersArray)+"'><div class='quick-capture-middle-div-question'><img class='audit-image-class' src='assets/icon_photo_small.png'></div></div><div class='"+getNotesClass(subQuestionsArray[i+2],auditAnswersArray)+"'><div class='quick-capture-middle-div-question'><img class='audit-image-class' src='assets/icon_notes_small.png'></div></div></div>";
            }
            
            innerHTMLString += getLiYNCADiv(subQuestionsArray[i+2],auditAnswersArray,answerYNMCArray);
            
            innerHTMLString += "</li>";
            
        }else if(subQuestionsArray[i]==questionId &&  subQuestionsArray[i+3]=="MC" && checkCompletionTypeSelected(questionId,auditAnswersArray,type)){
            
            var middleAuditId = "qcmdDiv-"+ questionId;
            for(var j=0;j<answerMCQuestionIdArray.length;j++){
                if(subQuestionsArray[i+2] == answerMCQuestionIdArray[j]){
                    //console.log("questionId here in answerMaster:"+answerMasterArray[j][0]);
                    
                    
                    if(answerMasterArray[j].length == 1){
                        innerHTMLString +=  "<li class='"+getSubQuestionClassMC(subQuestionResponse,questionId,auditAnswersArray,'question-MC-one',subQuestionsArray[i+2])+"'  id='question-"+ subQuestionsArray[i+2] +"'>";
                    }else if(answerMasterArray[j].length == 2){
                        innerHTMLString +=  "<li class='"+getSubQuestionClassMC(subQuestionResponse,questionId,auditAnswersArray,'question-MC-two',subQuestionsArray[i+2])+"'  id='question-"+ subQuestionsArray[i+2] +"'>";
                    }else if(answerMasterArray[j].length == 3){
                        innerHTMLString +=  "<li class='"+getSubQuestionClassMC(subQuestionResponse,questionId,auditAnswersArray,'question-MC-three',subQuestionsArray[i+2])+"'  id='question-"+ subQuestionsArray[i+2] +"'>";
                    }else if(answerMasterArray[j].length == 4){
                        innerHTMLString +=  "<li class='"+getSubQuestionClassMC(subQuestionResponse,questionId,auditAnswersArray,'question-MC-four',subQuestionsArray[i+2])+"'  id='question-"+ subQuestionsArray[i+2] +"'>";
                    }else if(answerMasterArray[j].length == 5){
                        innerHTMLString +=  "<li class='"+getSubQuestionClassMC(subQuestionResponse,questionId,auditAnswersArray,'question-MC-five',subQuestionsArray[i+2])+"'  id='question-"+ subQuestionsArray[i+2] +"'>";
                    }
                    
                    innerHTMLString += "<div class='question-text-details'>"+unescape(subQuestionsArray[i+1]) + "</div>" ;
                    innerHTMLString += "<div><table class='answer-table'>";
                    
                    for (var k=0;k<answerMasterArray[j].length;k++){
                        innerHTMLString += "<tr><td class='"+getMCAuditAnswer(subQuestionsArray[i+2],answerMasterArray[j][k],auditAnswersArray)+"'>"+answerMasterArray[j][k]+"</td></tr>";
                        
                    }
                    innerHTMLString += "</table></div>";
                    
                    
                    
                }
            }
            if(subQuestionsArray[i+4] == "active" && subQuestionsArray[i+5]=="inactive"){
                innerHTMLString += "<div id='"+middleAuditId+"' class='quick-capture-middle-audit'><div class='"+getPhotoClass(subQuestionsArray[i+2],auditAnswersArray)+"'><div class='quick-capture-middle-div-question'><img class='audit-image-class' src='assets/icon_photo_small.png'></div></div></div>";
            }else if(subQuestionsArray[i+4] == "inactive" && subQuestionsArray[i+5]=="active"){
                innerHTMLString += "<div id='"+middleAuditId+"' class='quick-capture-middle-audit'><div class='"+getNotesClass(subQuestionsArray[i+2],auditAnswersArray)+"'><div class='quick-capture-middle-div-question'><img class='audit-image-class' src='assets/icon_notes_small.png'></div></div></div>";
            }else if(subQuestionsArray[i+4] == "active" && subQuestionsArray[i+5]=="active"){
                innerHTMLString += "<div id='"+middleAuditId+"' class='quick-capture-middle-audit'><div class='"+getPhotoClass(subQuestionsArray[i+2],auditAnswersArray)+"'><div class='quick-capture-middle-div-question'><img class='audit-image-class' src='assets/icon_photo_small.png'></div></div><div class='"+getNotesClass(subQuestionsArray[i+2],auditAnswersArray)+"'><div class='quick-capture-middle-div-question'><img class='audit-image-class' src='assets/icon_notes_small.png'></div></div></div>";
            }
            
            innerHTMLString += getLiMCCADiv(subQuestionsArray[i+2],auditAnswersArray,answerYNMCArray);
            
            innerHTMLString += "</li>";
            
        }
    }
    
    
    
    return innerHTMLString;
    
    
    
}


function getSubQuestionClass(subQuestionResponse,questionId,auditAnswersArray,subQuestionId){
    
    var className = "question-YN-invisible";
    
    if(auditAnswersArray !==""){
        for(var i =0;i<auditAnswersArray.length;i++){
            
            if(questionId == auditAnswersArray[i]){
                
                if(unescape(subQuestionResponse) == auditAnswersArray[i+2]){
                    
                    className = "question-YN";
                    
                    for(var j =0;j<auditAnswersArray.length;j++){
                        
                        if(subQuestionId == auditAnswersArray[j] && auditAnswersArray[j+5] !=""){
                            className = "question-YN-CA";
                        }
                    }
                }
                
                
            }
        }
    }
    
    return className;
    
    
}

function getSubQuestionClassMC(subQuestionResponse,questionId,auditAnswersArray,cname,subQuestionId){
    
    
    var  className = cname+"-invisible";
    var classNameCA = cname+"-CA";
    
    if(auditAnswersArray !==""){
        for(var i =0;i<auditAnswersArray.length;i++){
            
            if(questionId == auditAnswersArray[i]){
                
                if(unescape(subQuestionResponse) == auditAnswersArray[i+2]){
                    className = cname;
                    for(var j =0;j<auditAnswersArray.length;j++){
                        
                        if(subQuestionId == auditAnswersArray[j] && auditAnswersArray[j+5] !=""){
                            className = classNameCA;
                        }
                    }
                }
                
                
                
            }
        }
    }
    
    
    return className;
    
}

function getLiYNClass(qid,auditAnswersArray,answerYNArray){
    
    
    var className = "question-YN";
    if(auditAnswersArray !==""){
        for(var i=0;i<auditAnswersArray.length;i++){
            if(qid == auditAnswersArray[i]){
                if (auditAnswersArray[i+5]!="" && typeof auditAnswersArray[i+5] !== "undefined"){
                    className = "question-YN-CA";
                }
            }
        }
    }
    return className;
    
    
}


function getLiMCClass(qid,auditAnswersArray,answerYNArray,originalClass){
    
    
    var className = originalClass;
    if(auditAnswersArray !==""){
        for(var i=0;i<auditAnswersArray.length;i++){
            if(qid == auditAnswersArray[i] ){
                if (auditAnswersArray[i+5]!="" && typeof auditAnswersArray[i+5] !== "undefined"){
                    className = originalClass+"-CA";
                }
            }
        }
    }
    return className;
    
    
}


function getLiMCCADiv(qid,auditAnswersArray,answerMCArray){
    var innerHTMLString = "";
    
    if(auditAnswersArray !==""){
        for(var i=0;i<auditAnswersArray.length;i++){
            if(qid == auditAnswersArray[i]){
                if (auditAnswersArray[i+5]!="" && typeof auditAnswersArray[i+5] !== "undefined"){
                    var CAid = "CA-"+qid;
                    innerHTMLString += "<div id ='"+CAid+"'  class='corrective-action-div'>Corrective Action</div>";
                }
            }
        }
    }
    
    return innerHTMLString;
    
}

function getLiYNCADiv(qid,auditAnswersArray,answerYNArray){
    
    var innerHTMLString = "";
    if(auditAnswersArray !==""){
        for(var i=0;i<auditAnswersArray.length;i++){
            if(qid == auditAnswersArray[i]){
                if (auditAnswersArray[i+5]!="" && typeof auditAnswersArray[i+5] !== "undefined") {
                    var CAid = "CA-"+qid;
                    innerHTMLString += "<div id ='"+CAid+"'  class='corrective-action-div'>Corrective Action</div>";
                }
            }
        }
    }
    return innerHTMLString;
    
}




