function createAuditPDF(attr){
 //   console.log("auditAnswersArray:"+auditAnswersArray);
        console.log("generating pdf...");
        event.preventDefault();
    
    
    var auditorName = "";
    var auditorLOB = "";
    var checklistCreationDate = "";
    
    
    //Audit Answers
    
    var auditAnswersArray = [];
    var CAArray = [];
    var auditQuestionIDArray = [];
    var JSONData = new Object();
    var auditAnswersArrayObject = [];
    var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
    var selectCheckList = "Select * from picklist_table where id = "+parseInt(auditCheckListId);
    
    db.transaction(function(tx) {
                   tx.executeSql(selectCheckList,[],function(tx,res){
                                 var len = res.rows.length;
                                 
                                 if(len>0)
                                 {
                                 for (var i = 0; i < len; i++)
                                 {
                                    auditorName = res.rows.item(i)['auditor_name'];
                                    JSONData.auditorName = auditorName;
                                    auditorLOB = res.rows.item(i)['auditor_lob'];
                                    JSONData.auditorLOB = auditorLOB;
                                    checklistCreationDate = res.rows.item(i)['cdatetime'];
                                    JSONData.checklistCreationDate = checklistCreationDate;
                                 
                                 }
                                 }
                                 });
                   });
                   
    
    var selectAuditAnswers = "Select * from audit_answer_table where audit_id="+parseInt(auditIdSelected)+" and checklist_id="+parseInt(auditCheckListId);
    
    db.transaction(function(tx) {
                   tx.executeSql(selectAuditAnswers,[],function(tx,res){
                                 var len = res.rows.length;
                                 
                                 if(len>0)
                                 {
                                 for (var i = 0; i < len; i++)
                                 {
                                 var answerObject = new Object();
                                 auditAnswersArray.push(res.rows.item(i)['question_id']);
                                 auditQuestionIDArray.push(res.rows.item(i)['question_id']);
                                 auditAnswersArray.push(unescape(res.rows.item(i)['question']));
                                 answerObject.question = unescape(res.rows.item(i)['question']);
                                 auditAnswersArray.push(unescape(res.rows.item(i)['answer']));
                                 answerObject.answer = unescape(res.rows.item(i)['answer']);
                                 auditAnswersArray.push(res.rows.item(i)['photo']);
                                 answerObject.photo = res.rows.item(i)['photo'];
                                 auditAnswersArray.push(unescape(res.rows.item(i)['notes']));
                                 answerObject.notes = unescape(res.rows.item(i)['notes']);
                                 auditAnswersArray.push(unescape(res.rows.item(i)['corrective_action']));
                                 auditAnswersArray.push(res.rows.item(i)['photo_width']);
                                 auditAnswersArray.push(res.rows.item(i)['photo_height']);
                                 answerObject.CA = unescape(res.rows.item(i)['corrective_action']);
                                 auditAnswersArrayObject.push(answerObject);
                                 if(res.rows.item(i)['corrective_action']!=''){
                                 CAArray.push(unescape(res.rows.item(i)['corrective_action']));
                                 }
                                 
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
                   var doc = new jsPDF();
                   var name = localStorage.getItem("storedName");
                   var textName = "Auditor : ";
                   //PDF resolution 210*305//To DO according calculate image dimensions and show
                   var pdfName = "MyAudits/Audit_"+getCurrentDate()+".pdf";
                   var pageHeight= doc.internal.pageSize.height;
                   var pageWidth= doc.internal.pageSize.width;
                   doc.setFont("courier");
                   doc.setFontType("normal");
                   doc.setTextColor(0,0,0);
                   doc.setFontSize("18");
                   doc.text(10, 10, textName);
                   doc.setFontType("bold");
                   doc.text(35,10,name);
                   doc.setFontType("normal");
                   doc.text(10, 20, "Completed : ");
                   doc.setFontType("bold");
                   doc.text(45,20,getCurrentDateTime());
                   var auditName = $( "#auditHeader div:first-child" ).html();
                   JSONData.auditLocation = auditName;
                   var auditLocation = $( "#auditHeader div:nth-child(2)" ).html();
                   JSONData.auditSubmissionDate = new Date().getTime();
                   JSONData.auditLocation = auditLocation;
                   doc.text(10, 40, $( "#auditHeader div:first-child" ).html());
                   doc.text(10, 50, doc.splitTextToSize($( "#auditHeader div:nth-child(2)" ).html(),190));
                   doc.setLineWidth(0.5);
                   doc.line(10, 65, 200, 65);
                   doc.setFontType("normal");
                   doc.text(10, 75, 'Completed : ');
                   doc.setFontType("bold");
                   doc.text(45, 75,$( "#auditHeader div:nth-child(4)" ).html());
                   JSONData.completedStatus =  $("#auditHeader div:nth-child(4)" ).html();
                   doc.setFontType("normal");
                   doc.text(10, 85, 'Corrective Actions : ');
                   doc.setFontType("bold");
                   doc.text(65, 85, CAArray.length.toString());
                   JSONData.CACompleted =  CAArray.length.toString();
                   doc.setLineWidth(0.5);
                   doc.line(10, 90, 200, 90);
                   var y = 100;
                   var index = 0;
                   
                   JSONData.auditAnswers = auditAnswersArrayObject;
                   
                   
                   $("#auditQuestionAnswers ul li").each(function() {
                                var liClass = $(this).attr("class");
                                
                                if(liClass.indexOf("question")>-1){
                                var questionText = $(this).find('div:first-child').html();
                                
                                var liID = $(this).attr("id").split("-")[1];
                                index++;
                                y = y + 5;
                                doc.setFontType("normal");
                                doc.setTextColor(0,0,0);
                                doc.text(10, y, index+".");
                                doc.setFontType("normal");
                                doc.setTextColor(0,0,0);
                                doc.text(15,y,doc.splitTextToSize(questionText,190));
                                if(questionText.length>0 && questionText.length<=100){
                                        y = y + 15;
                                }else if(questionText.length>100 && questionText.length<=200){
                                        y = y + 30;
                                }else if(questionText.length>200 && questionText.length<=300){
                                        y = y + 45;
                                }
                                if(y>300){
                                        doc.addPage();
                                        y = 10;
                                }
                                if($.inArray(parseInt(liID),auditQuestionIDArray) == -1){
                                doc.setFontType("italic");
                                doc.setTextColor(0,0,0);
                                doc.text(15,y,'Not Completed.');
                                y = y+15;
                                if(y>300){
                                        doc.addPage();
                                        y = 10;
                                }
                                }else{
                                for(var i=0;i<auditAnswersArray.length;i++){
                                if(auditAnswersArray[i]==liID && auditAnswersArray[i+1]==questionText ){
                                                        
                                if(auditAnswersArray[i+2]!=""){
                                doc.setFontType("bold");
                                doc.setFontType("normal");
                                doc.setTextColor(0,0,0);
                                doc.text(15,y,doc.splitTextToSize(auditAnswersArray[i+2],190));
                               
                                }
                                if(auditAnswersArray[i+2].length>0 && auditAnswersArray[i+2].length<=100){
                                        y = y + 15;
                                }else if(auditAnswersArray[i+2].length>100 && auditAnswersArray[i+2].length<=200){
                                        y = y + 30;
                                }else if(auditAnswersArray[i+2].length>200 && auditAnswersArray[i+2].length<=300){
                                        y = y + 45;
                                }
                                if(y>300){
                                        doc.addPage();
                                         y = 10;
                                }
                                //add notes
                                if(y>260){
                                        doc.addPage();
                                        y = 10;
                                }
                                if(auditAnswersArray[i+4]!=""){
                                        doc.setFontType("bold");
                                        doc.setFontType("normal");
                                        doc.setTextColor(0,0,0);
                                        doc.text(15,y,doc.splitTextToSize(auditAnswersArray[i+4],190));
                                       
                                }
                                                       
                                if(auditAnswersArray[i+4].length>0 && auditAnswersArray[i+4].length<=100){
                                        y = y + 15;
                                }else if(auditAnswersArray[i+4].length>100 && auditAnswersArray[i+4].length<=200){
                                        y = y + 30;
                                }else if(auditAnswersArray[i+4].length>200 && auditAnswersArray[i+4].length<=300){
                                        y = y + 45;
                                }
                                if(y>300){
                                        doc.addPage();
                                         y = 10;
                                }
                                //add photo
                                if(auditAnswersArray[i+3]!=""){
                                    if(y>205){
                                        doc.addPage();
                                        y = 10;
                                }
                                var imageData = "data:image/jpeg;base64,"+auditAnswersArray[i+3];
                                doc.addImage(imageData,'JPEG',10,y,auditAnswersArray[i+6],auditAnswersArray[i+7]);
                                        y = y + 100;
                                if(y>300){
                                        doc.addPage();
                                        y = 10;
                                }
                                }
                                //add corrective action
                                                         
                                if(y>260){
                                        doc.addPage();
                                        y = 10;
                                }
                                if(auditAnswersArray[i+5]!=""){
                                        doc.setFontType("bold");
                                        doc.setTextColor(255,0,0);
                                        doc.text(15,y,doc.splitTextToSize(auditAnswersArray[i+5],190));
                                        
                                        if(auditAnswersArray[i+5].length>=0 && auditAnswersArray[i+5].length<=100){
                                            y = y + 15;
                                        }else if(auditAnswersArray[i+5].length>100 && auditAnswersArray[i+5].length<=200){
                                            y = y + 30;
                                        }else if(auditAnswersArray[i+5].length>200 && auditAnswersArray[i+5].length<=300){
                                            y = y + 45;
                                        }
                                }
                                
                                
                                if(y>300){
                                        doc.addPage();
                                        y = 10;
                                }
                                }
                                
                                }
                                                        
                                }
                                
                                
                                }else{
                                var sectionText = $(this).html();
                                                        
                                y = y + 5;
                                doc.setFont("times");
                                doc.setFontType("italic");
                                doc.setTextColor(0,0,0);
                                doc.text(15,y,doc.splitTextToSize(sectionText,190));
                                y = y + 15;
                                if(y>300){
                                doc.addPage();
                                y = 10;
                                }
                                }
                                //console.log(liID);
                                  //                       console.log($(this).find('div:first-child').html());
                                   //                      console.log($(this).find('div:first-child').attr('id'));
                    });
                  // console.log("auditAnswersArray:"+auditAnswersArray);
                   var pdfOutput = doc.output();
                   //NEXT SAVE IT TO THE DEVICE'S LOCAL FILE SYSTEM
                   console.log("file system...");
                   window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
                                            
                                            // console.log(fileSystem.name);
                                            // console.log(fileSystem.root.name);
                                            // console.log(fileSystem.root.fullPath);
                                            //alert(fileSystem.root.fullPath);
                                            
                                            fileSystem.root.getDirectory("MyAudits", {
                                                                         create: true,
                                                                         exclusive: false
                                                                         }, function(dir) {
                                                                         
                                                                         fileSystem.root.getFile(pdfName, {
                                                                                                 create: true
                                                                                                 }, function(entry) {
                                                                                                 var fileEntry = entry;
                                                                                                 //console.log(entry);
                                                                                                 var URI= fileSystem.root.toURL()+pdfName;
                                                                                                 entry.createWriter(function(writer) {
                                                                                                                    writer.onwrite = function(evt) {
                                                                                                                    console.log("write success");
                                                                                                                    };
                                                                                                                    console.log("writing to file");
                                                                                                                    var data = pdfOutput;
                                                                                                                    var buffer = new ArrayBuffer(data.length);
                                                                                                                    var array = new Uint8Array(buffer);
                                                                                                                    for (var i = 0; i < data.length; i++) {
                                                                                                                    array[i] = data.charCodeAt(i);
                                                                                                                    }
                                                                                                                    writer.write(buffer);
                                                                                                                    //writer.write(pdfOutput);
                                                                                                                    if(attr =='message'){
                                                                                                                    sendAuditEmail(URI,auditName,auditLocation,JSONData);
                                                                                                                    }else{
                                                                                                                    viewAuditPDF(URI);
                                                                                                                    }
                                                                                                                    }, function(error) {
                                                                                                                    console.log(error);
                                                                                                                    });
                                                                                                 }, function(error) {
                                                                                                 console.log(error);
                                                                                                 });
                                                                         }, function(error) {});
                                            }, function(event) {
                                            //console.log(evt.target.error.code);
                                            });

                   });
    ///////////////

   
//        console.log("pageHeight:"+pageHeight);
//        console.log("pageWidth:"+pageWidth);
//        var text = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean m';
//        console.log("length here is:"+text.length);
//        var dim = doc.getTextDimensions(text);
//       // var textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
//       // var textHeight = doc.getStringUnitHeight(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
//    //console.log("dim:"+dim.h);
//    //console.log("textHeight:"+textHeight);
//    //7 lines 500 characters
//    //3 lines 200 characters
//       // doc.text(10,40,doc.splitTextToSize(text,190))
//    //doc.text(10,62,doc.splitTextToSize(text,190))
//    console.log("Line Height:"+doc.internal.getLineHeight());
//        //$("ul li").each(function() { console.log($(this).text()) });
////          doc.setLineWidth(0.5);
////        doc.line(0, 65, 210, 65);
////        doc.setFontSize("28");
////        if($('#criticality div[data-role="navbar"] ul li a.ui-btn-active').text()!=""){
////            doc.text(80, 75, $('#criticality div[data-role="navbar"] ul li a.ui-btn-active').text());
////        }
////        if($('#keys div[data-role="navbar"] ul li a.ui-btn-active').text()!=""){
////            doc.text(80, 90, $('#keys div[data-role="navbar"] ul li a.ui-btn-active').text());
////        }
////        doc.setFontSize("22");
////        doc.text(10, 75, 'CRITICALITY : ');
////        doc.text(10, 90, 'KEY : ');
////        doc.line(0, 100, 210, 100);
////        doc.setFontSize("18");
////        if( $("#searchLocations").val() != "" ){
////            var splitText = doc.splitTextToSize($("#searchLocations").val(),190);
////            doc.text(10, 40, splitText);
////        }
////      //  doc.addPage();
////        if(qcImageData.length>0){
////            doc.addImage(qcImageData[0],'JPEG',60,115,90,90);
////        }
////        if( $("#notesMainTextArea").val() != ""){
////            doc.text(10, 230, doc.splitTextToSize($("#notesMainTextArea").val(),190));
////        }
 
    
    
    
    //console.log( pdfOutput );
    
    

}


function sendAuditEmail(URI,auditName,auditLocation,JSONData){
    if (checkConnection() == 'No network connection') {
        showAlert("No internet connection found. Please try when connection is available.");
    }else{
    var url = "https://webvan-dev.disney.com/wdpr/safedchecklite/AddAuditData";
    var jxhr = $.ajax({
                      type : "POST",
                      url : url,
                      data : {jsonData:JSON.stringify(JSONData)}// serializes the form's elements.
                     
                      }).done(function(data) {
                              console.log(data);
                             // showAlert("Audit data saved successfully");
                              }).fail(function(jqXHR, textStatus) {
                                      console.log(textStatus);
                                      showAlert("Oops. Something went wrong. Please try again later.");
                              });
  
    //Save location to localStorage before clearing
    recentLocationsKeyExist(auditLocation);
    //Clear QC Screen
    deleteAudit();
     window.plugins.spinnerDialog.hide();
    cordova.plugins.email.isAvailable(
                function (isAvailable) {
                                      
                                      if(isAvailable){
                                      cordova.plugins.email.open({
                                                                 subject:     auditName,
                                                                 isHtml:    false,
                                                                 attachments: URI
                                                                 });
                                      }else{
                                      emailNotAvailableNotification();
                                      
                                      }
                        // alert('Service is not available') unless isAvailable;
                }
        );
    }
}


function viewAuditPDF(URI){
    
    cordova.plugins.fileOpener2.open(
                                     URI, // You can also use a Cordova-style file uri: cdvfile://localhost/persistent/Download/starwars.pdf
                                     'application/pdf',
                                     {
                                     error : function(e) {
                                     console.log('Error status: ' + e.status + ' - Error message: ' + e.message);
                                     },
                                     success : function () {
                                     console.log('file opened successfully');                
                                     }
                                     }
                                     );
    window.plugins.spinnerDialog.hide();
}


function getCurrentDateTime(){
    var currentdate = new Date();
    var today = (currentdate.getMonth()+1)  + "/" + currentdate.getDate() + "/" + currentdate.getFullYear();
    var time =  ((currentdate.getHours() < 10)?"0":"") + ((currentdate.getHours()>12)?(currentdate.getHours()-12):currentdate.getHours()) +":"+ ((currentdate.getMinutes() < 10)?"0":"") + currentdate.getMinutes() +":"+ ((currentdate.getSeconds() < 10)?"0":"") + currentdate.getSeconds() + " "+((currentdate.getHours()>12)?('PM'):'AM') + ", ";
    
    return (time+today);
}

function getCurrentDate(){
    var currentdate = new Date();
    var today = (currentdate.getMonth()+1)  + "_" + currentdate.getDate() + "_" + currentdate.getFullYear();
    return today;
}



function alertDismissed() {
   window.plugins.spinnerDialog.hide();
}

function emailNotAvailableNotification(){
    navigator.notification.alert(
                                 'You have no default email setup on your device to use this feature.',  // message
                                 emailAlertDismissed,
                                 'Error',
                                 'Done'
                                 );
}

function emailAlertDismissed(){
    
}

function recentLocationsKeyExist(locationVal){
    if (localStorage.getItem("recentLocationsKey") === null || localStorage.getItem("recentLocationsKey").length === 0) {
        var recentLocationsArray = [];
        recentLocationsArray.push(escape(locationVal));
        localStorage.setItem("recentLocationsKey",recentLocationsArray);
        
    }
    else{
        var recentLocationsLocal = localStorage.getItem("recentLocationsKey").split(",");
//        var escapedLocationVal = escape(locationVal);
//        var unescapedArray = [];
//        for (var i=0;i<recentLocationLocal.length;i++){
//            unescapedArray.push(unescape(recentLocationLocal[i]));
//        }
      //  console.log("Value here is :"+$.inArray(locationVal,unescapedArray));
       // console.log("Check in array:"+$.inArray(escape(locationVal), localStorage.getItem("recentLocationsKey").split(","));
        //&& $.inArray(escapedLocationVal, localStorage.getItem("recentLocationsKey").split(","))!=-1
        var recentLocationsArray = [];
        if(locationVal!=""){//Check if location values is not empty and location exists in recent Locations already

        if(recentLocationsLocal.length > 4){
            recentLocationsLocal.pop();
            recentLocationsLocal.push(escape(locationVal));
            localStorage.setItem("recentLocationsKey",recentLocationsLocal);
           // console.log(localStorage.getItem("recentLocationsKey").split(","));
        }else{
            recentLocationsLocal.push(escape(locationVal));
            localStorage.setItem("recentLocationsKey",recentLocationsLocal);
           // console.log(localStorage.getItem("recentLocationsKey").split(","));
        }
    }
        
}
    
    //console.log(localStorage.getItem("recentLocationsKey"));
}