function createPDF(attr){
        console.log("generating pdf...");
        event.preventDefault();
    
        var doc = new jsPDF();
    
        //PDF resolution 210*305//To DO according calculate image dimensions and show
        var JSONData = new Object();
        var pdfName = "MyQC/QC_"+getCurrentDate()+".pdf";
        doc.setFont("courier");
        doc.setFontType("normal");
        doc.setFontSize("18");
        var storedName = localStorage.getItem("storedName");
        doc.text(10, 10, 'Auditor: '+storedName);
        JSONData.auditorName = storedName;
        JSONData.auditorLOB = localStorage.getItem("storedLOB");
        doc.text(10, 25, 'Completed : '+getCurrentDateTime());
        JSONData.qcCreationTimeStamp = new Date().getTime();
        doc.setLineWidth(0.5);
        doc.line(0, 65, 210, 65);
        doc.setFontSize("28");
        if($('#criticality div[data-role="navbar"] ul li a.ui-btn-active').text()!=""){
            doc.text(80, 75, $('#criticality div[data-role="navbar"] ul li a.ui-btn-active').text());
            JSONData.criticality = $('#criticality div[data-role="navbar"] ul li a.ui-btn-active').text();
        }else{
            JSONData.criticality = "Not specified";
        }
        if($('#keys div[data-role="navbar"] ul li a.ui-btn-active').text()!=""){
            doc.text(80, 90, $('#keys div[data-role="navbar"] ul li a.ui-btn-active').text());
            JSONData.keys = $('#keys div[data-role="navbar"] ul li a.ui-btn-active').text();
        }else{
            JSONData.keys = "Not specified";
        }
        doc.setFontSize("22");
        doc.text(10, 75, 'CRITICALITY : ');
        doc.text(10, 90, 'KEY : ');
        doc.line(0, 100, 210, 100);
        doc.setFontSize("18");
        if( $("#searchLocations").val() != "" ){
            var splitText = doc.splitTextToSize($("#searchLocations").val(),190);
            JSONData.location = $("#searchLocations").val();
            doc.text(10, 40, splitText);
        }else{
            JSONData.location = "Not specified";
        }
      //  doc.addPage();
        var actualHeight = "";
        if(qcImageData.length>0){
            doc.addImage(qcImageData[0],'JPEG',10,115,qcImageData[1],qcImageData[2]);
            JSONData.photo = qcImageData[0];
        }else{
            JSONData.photo = "Not specified";
        }
        if( $("#notesMainTextArea").val() != ""){
             if(qcImageData.length>0){
                 doc.text(10, 230, doc.splitTextToSize($("#notesMainTextArea").val(),190));
             }else{
                 doc.text(10, 115, doc.splitTextToSize($("#notesMainTextArea").val(),190));
             }
            JSONData.notes = $("#notesMainTextArea").val();
        }else{
            JSONData.notes = "Not specified";
        }
 
        var pdfOutput = doc.output();
    
    
    //console.log( pdfOutput );
    
    //NEXT SAVE IT TO THE DEVICE'S LOCAL FILE SYSTEM
    console.log("file system...");
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
                             
                            // console.log(fileSystem.name);
                            // console.log(fileSystem.root.name);
                            // console.log(fileSystem.root.fullPath);
                             //alert(fileSystem.root.fullPath);
                             
                             fileSystem.root.getDirectory("MyQC", {
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
                                                                                                     sendEmail(URI,JSONData);
                                                                                                     
                                                                                                     }else{
                                                                                                     viewPDF(URI);
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


}


function sendEmail(URI,JSONData){
    //Save location to localStorage before clearing
    if (checkConnection() == 'No network connection') {
        showAlert("No internet connection found. Please try when connection is available.");
    }else{
      
        var url = "https://webvan-dev.disney.com/wdpr/safedchecklite/AddQCData";
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

    recentLocationsKeyExist($("#searchLocations").val());
    //Clear QC Screen
    clearQCScreen();
     window.plugins.spinnerDialog.hide();
    cordova.plugins.email.isAvailable(
                function (isAvailable) {
                                      
                                      if(isAvailable){
                                      cordova.plugins.email.open({
                                                                 subject:     'Quick Capture',
                                                                 isHtml:    false,
                                                                 attachments: URI
                                                                 });
                                      }else{
                                      emailNotAvailableNotification();
                                      
                                      }
                                      qcImageData = [];
                        // alert('Service is not available') unless isAvailable;
                }
        );
    }
}


function viewPDF(URI){
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
            console.log(localStorage.getItem("recentLocationsKey").split(","));
        }else{
            recentLocationsLocal.push(escape(locationVal));
            localStorage.setItem("recentLocationsKey",recentLocationsLocal);
            console.log(localStorage.getItem("recentLocationsKey").split(","));
        }
    }
        
}
    
    //console.log(localStorage.getItem("recentLocationsKey"));
}