var previousPage = "";
var checkListId = "";
var questionIdSelected = "";
var subQuestionIdSelected = "";
var sectionIdSelected = "";
var auditIdSelected = "";
var auditCheckListId = "";
var tempDataArray = [];
var subQuestionsArray  = [];



var qcImageData = [];


$(document).ready(function() {
                 // alert("Browser width:"+$( window ).width());
                //  console.log(db);
                  window.location.hash = 'login';
                  $.mobile.initializePage();
                  
                  $('#profile').on('pagebeforeshow', function(e, data) {
                                   checkUserNameLOBExists();
                                 });
                  
                  $("#username").on("focus", function() {
                                    if ($(this).val() == "User Name"){
                                        $(this).val("");
                                    }
                                    });
                  
                  $("#password").on("focus", function() {
                                    $("#password").attr('type', 'text');
                                    }, function() {
                                    if ($(this).val() == "Password"){
                                    $(this).val("");
                                    }
                                    $("#password").attr('type', 'password');
                                    });
                  
                  $("#loginform").on( 'submit', function(event) {
                                     $.mobile.navigate("#profile");
                                     });
                  
//                  $("#submit").on("click touchend", function() {
//                                  
//                                  //window.location.hash = 'profile';
//                                   $.mobile.navigate("#profile");
//                                  });
                  
                  $("#profilePL").on("click touchend", function() {
                                 
                                 //window.location.hash = 'profile';
                                 $.mobile.navigate("#profile");
                                 });
                  
                  $("#profileGA").on("click touchend", function() {
                                     
                                     //window.location.hash = 'profile';
                                     $.mobile.navigate("#profile");
                                     });
                  
                  $("#logOff").on("click touchend", function() {
                                  
                                  window.location.hash = 'login';
                                  });
                  
                  $("#quickCaptureProfile").on("click touchstart", function() {
                                               event.preventDefault();
                                               //Check username and password are in localStorage or not
                                               if(!checkUserNameLOBEmpty()){
                                               showAlert("Please enter Name and LOB on this screen to continue");
                                               }else{
                                               $.mobile.navigate("#quickCapture");
                                               }
                                               });

                  $("#quickCapturePL").on("click touchend", function() {
                                          
                                                $.mobile.navigate("#quickCapture");
                                          
                                                });
                  
                  $("#quickCaptureGA").on("click touchend", function() {
                                          
                                          $.mobile.navigate("#quickCapture");
                                          
                                          });
                  
                  $("#goCheckPL").on("click touchend", function() {
                                          
                                          $.mobile.navigate("#goAudit");
                                          
                                          });
                  
                  
                  $("#goCheckQC").on("click touchend", function() {
                                          
                                          $.mobile.navigate("#goAudit");
                                          
                                          });
                  

                  
                  $("#picklistProfile").on("click touchstart", function() {
                                                event.preventDefault();
                                                if(!checkUserNameLOBEmpty()){
                                                showAlert("Please enter Name and LOB on this screen to continue");
                                                }else{
                                                $.mobile.navigate("#pickList");
                                                }
                                               });
                  
                  $("#goCheckProfile").on("click touchstart", function() {
                                           event.preventDefault();
                                           if(!checkUserNameLOBEmpty()){
                                           showAlert("Please enter Name and LOB on this screen to continue");
                                           }else{
                                           $.mobile.navigate("#goAudit");
                                           }
                                           });
                  
                  $("#picklistQC").on("click touchend", function() {
                                           
                                           $.mobile.navigate("#pickList");
                                           
                                           });
                  
                  $("#picklistGA").on("click touchend", function() {
                                      
                                      $.mobile.navigate("#pickList");
                                      
                                      });
                  
                  
                  
                  $("#profileQC").on("click touchend", function() {
                                     
                                     window.location.hash = 'profile';
                                     
                                     });
                  
                  //Makes sure tapping outside of QC popup does not take you back to previous screen
                  
                  $("#popupQC").popup({
                                      history: false
                                      });
                  
                  //Persist navbar selections across multiple screens
                  
                  $('#criticality div[data-role="navbar"] ul li a').on('click', function() {
                                                                       window.plugins.spinnerDialog.show();
                                                                       //Remove all active selections
                                                                       $("#criticalityNavBar").find('a').each(function(i) {
//                                                                                                              if ($(this).hasClass('ui-btn-active') || $(this).hasClass('ui-btn-active ui-state-persist')) {
                                                                                                              $(this).removeClass('ui-btn-active');
                                                                                                              $(this).removeClass('ui-btn-active ui-state-persist');
                                                                                                       //       }
                                                                                                              
                                                                                                              });
                                                                       $(this).addClass('ui-btn-active ui-state-persist');
                                                                       window.plugins.spinnerDialog.hide();
                                                                       });
                  
                  $('#keys div[data-role="navbar"] ul li a').on('click', function() {
                                                                window.plugins.spinnerDialog.show();
                                                                //Remove all active selections
                                                                $("#keyNavBar").find('a').each(function(i) {
                                                                                              // if ($(this).hasClass('ui-btn-active') || $(this).hasClass('ui-btn-active ui-state-persist')) {
                                                                                               $(this).removeClass('ui-btn-active');
                                                                                               $(this).removeClass('ui-btn-active ui-state-persist');
                                                                                           //    }
                                                                                               
                                                                                               });
                                                                $(this).addClass('ui-btn-active ui-state-persist');
                                                                window.plugins.spinnerDialog.hide();
                                                                });
                  
                  //Tap location on QC Screen
                  $("#locationDivCapture").on("click touchend", function() {
                                              $.mobile.navigate("#location");
                                              });
                  //////////////////////////////////////////////////
                  
                  //Handle clear on Quick Capture Screen
                  
                  $("#clearQC").on("click touchend", function() {
                                   clearQCScreen();
                                   });
                  /////////////////////////////////////////////////
                  
                  //get previous page id before you go to location always as the page is being used in multiple screens
                  
                  $('#location').on('pagebeforeshow', function(e, data) {
                                     window.plugins.spinnerDialog.show();
                                    previousPage = data.prevPage.attr('id');
                                    parseLocationData();
                    });
                  
                  //get previous page id before you go to notes always as the page is being used in multiple screens
                  
                  $('#notes').on('pagebeforeshow', function(e, data) {
                                    previousPage = data.prevPage.attr('id');
                                    if(previousPage == "startAudit"){
                                    populateNotes();
                                    }
                                    });
                  
                  //get previous page id before you go to answer always as the page is being used in multiple screens
                  
                  $('#editCheckListAnswer').on('pagebeforeshow', function(e, data) {
                                 previousPage = data.prevPage.attr('id');
                                 console.log("previous page:"+previousPage);
                                 });
                  
                  $('#startAudit').on('pagebeforeshow', function(e, data){
                                      previousPage = data.prevPage.attr('id');
                                      });
                  
                  $('#addSubQuestionScreen').on('pagebeforeshow', function(e, data) {
                                               $(".sub-question-response").css("width", $(window).width()-5);
                                               $(".select-response-class").css("width", $(window).width()-30);
                                               });
                  
                  
                  //Populate checklists created by user
                  
                  $('#pickList').on('pagebeforeshow', function(e, data) {
                                    window.plugins.spinnerDialog.show();
                                    $("#searchPickList").val("");
                                    $("#searchSubmit").text("FIND");
                                    
                                    var currentView = "";
                                    $("#sortNavBar").find('a').each(function(i) {
                                                                           $(this).removeClass('ui-btn-active');
                                                                           //$(this).removeClass('ui-btn-active ui-state-persist');
                                                                           });
                                    //localStorage.setItem("pickListView","myLists");
                                    if(localStorage.getItem("sortOrder") === null){
                                    $("#dateTab").addClass('ui-btn-active');
                                    localStorage.setItem("sortOrder","Date");
                                    }else{
                                    var sortOrder = localStorage.getItem("sortOrder");
                                    if(sortOrder == "LOB"){
                                        $("#lobTab").addClass('ui-btn-active');
                                    }else if(sortOrder == "Creator"){
                                        $("#creatorTab").addClass('ui-btn-active');
                                    }else if(sortOrder == "Date"){
                                        $("#dateTab").addClass('ui-btn-active');
                                    }else if(sortOrder == "Name"){
                                        $("#nameTab").addClass('ui-btn-active');
                                    }
                                    }
                                    
                                    if(localStorage.getItem("pickListView") === null){
                                    localStorage.setItem("pickListView","myLists");
                                    currentView = "myLists";
                                    }else{
                                    currentView = localStorage.getItem("pickListView");
                                    }
                                    
                                    if(localStorage.getItem("sortType") === null){
                                            localStorage.setItem("sortType","ASCENDING");
                                            $("#sortType").text("ASCENDING");
                                    }else{
                                            $("#sortType").text(localStorage.getItem("sortType"));
                                    }
                                    
                                   
                                    if(currentView == "myLists"){
                                    //Change here
                                    $("#myListsSpan").attr("class","mylists-active");
                                    $("#allListsSpan").attr("class","alllists-inactive");
                                    $("#favoritesSpan").attr("class","favorites-inactive");
                                    populatePickListScreen("userLists").done(hideSpinner());
                                    }else if(currentView == "favorites"){
                                    $("#myListsSpan").attr("class","mylists-inactive");
                                    $("#allListsSpan").attr("class","alllists-inactive");
                                    $("#favoritesSpan").attr("class","favorites-active");
                                    populatePickListScreen("favorites").done(hideSpinner());
                                    }else if(currentView == "allLists"){
                                    $("#myListsSpan").attr("class","mylists-inactive");
                                    $("#allListsSpan").attr("class","alllists-active");
                                    $("#favoritesSpan").attr("class","favorites-inactive");
                                    $("#checkListindex").html("");
                                    populateAllListsTab();
                                    }
                                    });
                  
//                  //remove input focus for checklist name and description//bad idea causes more distortion
//                  
//                  $('#editCheckList').on('pageinit', function(e, data) {
//                                         $("#CheckListTextAreaName").blur();
//                                         $("#CheckListTextAreaDescription").blur();
//                                    });
                  
                  
                 //Populate Audit Screen
                  
                  $('#goAudit').on('pagebeforeshow', function(e, data) {
                                    window.plugins.spinnerDialog.show();
                                   
                                   
                                   $("#sortAuditNavBar").find('a').each(function(i) {
                                                                        $(this).removeClass('ui-btn-active');
                                                                        //$(this).removeClass('ui-btn-active ui-state-persist');
                                                                        });
                                   
                                   $("#searchAuditPickList").val("");
                                   $("#searchSubmitGA").text("FIND");
                                   if(localStorage.getItem("sortAuditOrder") === null){
                                   localStorage.setItem("sortAuditOrder","Date");
                                   }else{
                                   var sortAuditOrder = localStorage.getItem("sortAuditOrder");
                                   if(sortAuditOrder == "Status"){
                                   $("#statusTab").addClass('ui-btn-active');
                                   }else if(sortAuditOrder == "Location"){
                                   $("#locationTab").addClass('ui-btn-active');
                                   }else if(sortAuditOrder == "Date"){
                                   $("#dateAuditTab").addClass('ui-btn-active');
                                   }
                                   }
                                  
                                   
                                    populateAuditScreen().done(hideSpinner());
                                    });
                  
                  $(document).on('pagebeforecreate', '[data-role="page"]', function() {
                                 var interval = setInterval(function() {
                                                             window.plugins.spinnerDialog.show();
                                                            clearInterval(interval);
                                                            }, 1);
                                 });
                  
                  $(document).on('pageshow', '[data-role="page"]', function() {
                                 var interval = setInterval(function() {
                                                             window.plugins.spinnerDialog.hide();
                                                            clearInterval(interval);
                                                            }, 100);
                                 });
                  
                  $(document).on("pageinit", "#quickCapture", function(event) {
                                 $("#popupQC").on({
                                                  popupbeforeposition: function() {
                                                  $('.ui-popup-screen').off();
                                                  }
                                                  });
                                 });
                  
                  //Take a picture
                  $("#captureNow").on("click touchend", function() {
                                      event.preventDefault();
                                      window.plugins.spinnerDialog.show();
                                      navigator.camera.getPicture(onSuccess, onFail, {
                                                                  quality: 50,destinationType: Camera.DestinationType.DATA_URL,correctOrientation: true
                                                                  });
                                      });
                  
                  //Open Notes screen, get rid of popup
                  $("#notesNow").on("click touchend", function() {
                                    ////
                                    //$("#popupQC").popup("open");
                                    $.mobile.navigate("#notes");
                                    
                                    });
                  
                  
                  
                  $(".search-location-div").keydown(function(event) {
                                     if($("#searchLocations").val()=="")
                                        {
                                           $("#recentLocationsDiv").css("display","block");         
                                                    
                                        }
                                });
                  
                  //Clear pressed on Location
                  $("#clearLocation").on("click touchend", function(e) {
                                          e.preventDefault();
                                            $("#searchLocations").val("");
                                            $("#recentLocationsDiv").css("display","block");
                                          });
                  
                  
                  //Close location from popup screen
                  $("#cancelLocation").on("click touchstart", function(e) {
                                          e.preventDefault();
                                    if (previousPage == "quickCapture") {
                                          $.mobile.navigate("#quickCapture");
                                          }else  if (previousPage == "checklistDetails") {
                                          $.mobile.navigate("#checklistDetails");
                                          if($("#searchLocations").val()!=""){
                                          $("#searchLocations").val("");
                                          $('#addLocationDetails').css('background', '#8cc63f');
                                          $('#addLocationDetails').css('color', '#ffffff');
                                          $('#checkNow').css('background', '#a3a3a3');
                                          $('#checkNow').css('color', '#808080');
                                          $('#checkLater').css('color', '#808080');
                                          $('#checkLater').css('background', '#a3a3a3');
//                                          $('#addLocationDetails').css('background', '#4d4d4d');
//                                          $('#addLocationDetails').css('color', '#ffffff');
//                                          $('#checkNow').css('background', '#8cc63f');
//                                          $('#checkNow').css('color', '#ffffff');
//                                          $('#checkLater').css('color', '#ffffff');
//                                          $('#checkLater').css('background', '#4d4d4d');
                                          }if(previousPage == "checklistDetails"){
                                          $('#addLocationDetails').css('background', '#8cc63f');
                                          $('#addLocationDetails').css('color', '#ffffff');
                                          $('#checkNow').css('background', '#a3a3a3');
                                          $('#checkNow').css('color', '#808080');
                                          $('#checkLater').css('color', '#808080');
                                          $('#checkLater').css('background', '#a3a3a3');
                                          }
                                          }else  if (previousPage == "startAudit") {
                                            $("#searchLocations").val("");
                                            $.mobile.navigate("#startAudit");
                                          }
                                          });
                  
                  //Clear pressed on Location
                  $("#clearLocation").on("click touchend", function(e) {
                                         e.preventDefault();
                                         $("#searchLocations").val("");
                                         $("#recentLocationsDiv").css("display","block");
                                         });
                  
                  //Location done clicked
                  $("#locationDone").on("click touchstart", function(e) {
                                     e.preventDefault();
                                     if (previousPage == "quickCapture") {
                                     $.mobile.navigate("#quickCapture");
                                      
                                     if($("#searchLocations").val()!=""){
                                     $('#locationDivCapture').css('background', '#0088c7');
                                     $('.location-text-large').css('color', '#ffffff');
                                     }else{
                                     $('#locationDivCapture').css('background', '#ffffff');
                                     $('.location-text-large').css('color', '#808080');
                                     }
                                        }else if(previousPage == "checklistDetails"){
                                    $.mobile.navigate("#checklistDetails");
                                    if($("#searchLocations").val()!=""){
                                        $('#addLocationDetails').css('background', '#4d4d4d');
                                        $('#addLocationDetails').css('color', '#ffffff');
                                        $('#checkNow').css('background', '#8cc63f');
                                        $('#checkNow').css('color', '#ffffff');
                                        $('#checkLater').css('color', '#ffffff');
                                        $('#checkLater').css('background', '#4d4d4d');
                                    }else{
                                    $('#addLocationDetails').css('background', '#8cc63f');
                                    $('#addLocationDetails').css('color', '#ffffff');
                                    }
                                        }else if(previousPage == "startAudit"){
                                        if($("#searchLocations").val()==""){
                                            showAlert("Location field is mandatory");
                                            return;
                                        }else{
                                            updateAuditLocation($("#searchLocations").val());
                                        }
                                    }
                  
                  
                                     });
                  
                  
                  //Close Notes from Notes screen
                  $("#cancelNotes").on("click touchstart", function(e) {
                                          e.preventDefault();
                                          if (previousPage == "quickCapture") {
                                          $.mobile.navigate("#quickCapture");
                                          }else if(previousPage == "startAudit"){
                                          $("#notesMainTextArea").val("");
                                          populateAuditQuestionScreen(auditIdSelected,"complete");
                                          }
                                          });
                 
                  
                  //Notes done clicked
                  $("#notesDone").on("click touchend", function(e) {
                                      e.preventDefault();
                    if (previousPage == "quickCapture") {
                        $.mobile.navigate("#quickCapture");
                    if($("#notesMainTextArea").val()!=""){
                       $('#QCNotesMiddleDiv').css('background', '#0088c7');
                       $('.quick-capture-middle-span-notes').css('color', '#ffffff');
                            }else{
                       $('#QCNotesMiddleDiv').css('background', '#ffffff');
                       $('.quick-capture-middle-span-notes').css('color', '#808080');
                    }
                    }else if(previousPage == "startAudit"){
                        
                        tempDataArray.push($("#notesMainTextArea").val());
                        insertAuditNotes();
                       
                    }
                      
                  });
                  //Create pdf and send email
                  $("#sendQC").on("touchend", function(e) {
                                  e.preventDefault();
                        window.plugins.spinnerDialog.show();
                        if($('#criticality div[data-role="navbar"] ul li a.ui-btn-active').text()=="" && $('#keys div[data-role="navbar"] ul li a.ui-btn-active').text()=="" && $("#searchLocations").val() == "" && qcImageData.length==0 && $("#QCTextAreaId").val() == ""){
                                  navigator.notification.alert(
                                                               'Please select atleast one attribute to send a message',  // message
                                                               alertDismissed,         // callback
                                                               'Error',            // title
                                                               'Done'                  // buttonName
                                                               );
                            }else{
                                  
                                  createPDF('message');
                            }
                                
                    });
                  
    

                //Create pdf and view in InApp Browser
                $("#viewPDF").on("touchend", function(e) {
                                e.preventDefault();
                window.plugins.spinnerDialog.show();
                if($('#criticality div[data-role="navbar"] ul li a.ui-btn-active').text()=="" && $('#keys div[data-role="navbar"] ul li a.ui-btn-active').text()=="" && $("#searchLocations").val() == "" && qcImageData.length==0 && $("#QCTextAreaId").val() == ""){
                navigator.notification.alert(
                                             'Please select atleast one attribute to view PDF',  // message
                                             alertDismissed,         // callback
                                             'Error',            // title
                                             'Done'                  // buttonName
                                             );
                }else{
                
                createPDF('view');
                }
                
                });
                  
                  //Click Delete on picklist main screen
                  $("#deletePL").on("click touchstart", function(e) {
                                event.preventDefault();
                                if($("#checkListDisplay").val() == "new"){
                                    showAlert("Checklist not created. You cannot delete an uncreated checklist");
                                }else{
                                 //Confirm delete
                                    navigator.notification.confirm(
                                                                   'Are you sure you want to delete this checklist?', // message
                                                                   onConfirm,            // callback to invoke with index of button pressed
                                                                   'Delete checklist',           // title
                                                                   ['OK','Cancel']     // buttonLabels
                                                                   );
                                    
                                 
                                }
                  });
                  
                  
                  //Click new on pickList screen
                  $("#newPL").on("click touchstart", function(e) {
                                 event.preventDefault();
                                 $("#CheckListTextAreaName").val("");
                                 $("#CheckListTextAreaDescription").val("");
                                 $("#staticQuestionsSections").html("");
                                 $("#checkListDisplay").val("new");
                                 $.mobile.navigate("#editCheckList");
                                 });
                  
                  //Click favorites on picklist screen
                  $("#favoritesSpan").on("click touchstart", function(e) {
                                 event.preventDefault();
                                 $("#searchPickList").val("");
                                 $("#searchSubmit").text("FIND");
                                 localStorage.setItem("pickListView","favorites");
                                 $(this).attr("class","favorites-active");
                                 $("#myListsSpan").attr("class","mylists-inactive");
                                 $("#allListsSpan").attr("class","alllists-inactive");
                                 $("#checkListindex").html("");
                                 populatePickListScreen("favorites").done(hideSpinner());       
                                 });
                  
                  //Click my lists on picklist screen
                  $("#myListsSpan").on("click touchstart", function(e) {
                                         event.preventDefault();
                                         $("#searchPickList").val("");
                                         $("#searchSubmit").text("FIND");
                                         localStorage.setItem("pickListView","myLists");
                                         $(this).attr("class","mylists-active");
                                         $("#favoritesSpan").attr("class","favorites-inactive");
                                         $("#allListsSpan").attr("class","alllists-inactive");
                                         $("#checkListindex").html("");
                                         populatePickListScreen("userLists").done(hideSpinner());
                                         });
                  
                  //Click all lists on picklist screen
                  $("#allListsSpan").on("click touchstart", function(e) {
                                       event.preventDefault();
                                        $("#searchPickList").val("");
                                        $("#searchSubmit").text("FIND");
                                        if (checkConnection() == 'No network connection') {
                                        showAlert("No internet connection found. Please try when connection is available.");
                                        }else{
                                       localStorage.setItem("pickListView","allLists");
                                       $(this).attr("class","alllists-active");
                                       $("#favoritesSpan").attr("class","favorites-inactive");
                                       $("#myListsSpan").attr("class","mylists-inactive");
                                       $("#checkListindex").html("");
                                        populateAllListsTab();
                                        }
                                       //populatePickListScreen("allLists").done(hideSpinner());
                                       });
                  
                  
                  //Click search icon
                  $("#searchIcon").on("click touchstart", function(e) {
                                      event.preventDefault();
                                      if($("#SearchPickList").css("display") == "none"){
                                      $("#SortPickList").css("display","none");
                                      $("#SearchPickList").css("display","block");
                                      $("#seachImage").attr("src","assets/icon_search_blue.png");
                                      $("#filterImage").attr("src","assets/icon_filter.png");
                                      $("#checkListindex").attr("class","checklist-index");
                                      }else{
                                      $("#searchPickList").val("");
                                      $("#seachImage").attr("src","assets/icon_search.png");
                                      $("#checkListindex").attr("class","checklist-index-nofilter");
                                      $("#SearchPickList").css("display","none");
                                      }
                                      });
                  
                  //Click search Go icon
                  $("#searchSubmit").on("click touchstart", function(e) {
                                        e.preventDefault();
                                        if($("#searchSubmit").text()=="FIND"){
                                        
                                        var searchKey = $("#searchPickList").val();
                                        if(searchKey == ""){
                                        return;
                                        }else{
                                        window.plugins.spinnerDialog.show();
                                        $("#searchSubmit").text("CLEAR");
                                        searchAllPicklists(searchKey).done(hideSpinner());
                                        }
                                        }else{
                                        $("#searchPickList").val("");
                                        $("#searchSubmit").text("FIND");
                                        var currentView = localStorage.getItem("pickListView");
                                        if(currentView == "myLists"){
                                        populatePickListScreen("userLists").done(hideSpinner());
                                        }else if(currentView == "favorites"){
                                        populatePickListScreen("favorites").done(hideSpinner());
                                        }else if(currentView == "allLists"){
                                        populateAllListsTab();
                                        }
                                        }
                                     
                                      });

                  
                  //Click Filter icon
                  $("#filterIcon").on("click touchstart", function(e) {
                                        event.preventDefault();
                                        $("#SearchPickList").css("display","none");
                                        $("#seachImage").attr("src","assets/icon_search.png");
                                        if($("#filterImage").attr("src") == "assets/icon_filter_blue.png"){
                                            $("#filterImage").attr("src","assets/icon_filter.png");
                                            $("#checkListindex").attr("class","checklist-index-nofilter");
                                            $("#SortPickList").css("display","none");
                                        }else{
                                            $("#filterImage").attr("src","assets/icon_filter_blue.png");
                                            $("#checkListindex").attr("class","checklist-index");
                                            $("#SortPickList").css("display","block");
                                            populatePickListScreen(localStorage.getItem("pickListView")).done(hideSpinner());
                                        }
                                      
                                        });
                  
                  //Click ascending or descending on sort nav bar
                  $("#sortType").on("click touchstart", function(e) {
                                      event.preventDefault();
                                    if($("#sortType").text()=="ASCENDING"){
                                            localStorage.setItem("sortType","DESCENDING");
                                            $("#sortType").text("DESCENDING");
                                            populatePickListScreen(localStorage.getItem("pickListView")).done(hideSpinner());
                                        }else{
                                            localStorage.setItem("sortType","ASCENDING");
                                            $("#sortType").text("ASCENDING");
                                            populatePickListScreen(localStorage.getItem("pickListView")).done(hideSpinner());
                                    }
                                });
                  
                  //Tap sort nav bar
                  $("#SortPickList div[data-role='navbar'] ul li a").on("click touchstart", function(e) {
                                        var sortOrder = $('#SortPickList div[data-role="navbar"] ul li a.ui-btn-active').text();
                                       localStorage.setItem("sortOrder",sortOrder);
                                      //  populatePickListScreen(localStorage.getItem("pickListView")).done(hideSpinner());
                                                                        //Change here
                                                                        
                                                                        if(localStorage.getItem("pickListView") === null){
                                                                        localStorage.setItem("pickListView","myLists");
                                                                        currentView = "myLists";
                                                                        }else{
                                                                        currentView = localStorage.getItem("pickListView");
                                                                        }
                                                                        
                                                                        if(localStorage.getItem("sortType") === null){
                                                                        localStorage.setItem("sortType","ASCENDING");
                                                                        $("#sortType").text("ASCENDING");
                                                                        }else{
                                                                        $("#sortType").text(localStorage.getItem("sortType"));
                                                                        }
                                                                        
                                                                      //  console.log("currentView:"+currentView);
                                                                        if(currentView == "myLists"){
                                                                        populatePickListScreen("userLists").done(hideSpinner());
                                                                        }else if(currentView == "favorites"){
                                                                        populatePickListScreen("favorites").done(hideSpinner());
                                                                        }else if(currentView == "allLists"){
                                                                        populateAllListsTab();
                                                                        }

                                       });

                  
                  
                  //tap on filter icon on Go Auidt screen
                  $("#filterIconGA").on("click touchstart", function(e) {
                                      event.preventDefault();
                                      $("#SearchAuditPickList").css("display","none");
                                      $("#seachImageGA").attr("src","assets/icon_search.png");
                                      if($("#filterImageGA").attr("src") == "assets/icon_filter_blue.png"){
                                      $("#filterImageGA").attr("src","assets/icon_filter.png");
                                      $("#auditIndex").attr("class","audit-index-nofilter");
                                      $("#SortAuditPickList").css("display","none");
                                      }else{
                                      $("#filterImageGA").attr("src","assets/icon_filter_blue.png");
                                      $("#auditIndex").attr("class","audit-index");
                                      $("#SortAuditPickList").css("display","block");
                                      populateAuditScreen().done(hideSpinner());
                                      }
                                      
                                      });
                  
                  //Tap on search icon on Go Audit screen
                  //Click search icon
                  $("#searchIconGA").on("click touchstart", function(e) {
                                      event.preventDefault();
                                      if($("#SearchAuditPickList").css("display") == "none"){
                                      $("#SortAuditPickList").css("display","none");
                                      $("#SearchAuditPickList").css("display","block");
                                      $("#seachImageGA").attr("src","assets/icon_search_blue.png");
                                      $("#filterImageGA").attr("src","assets/icon_filter.png");
                                      $("#auditIndex").attr("class","audit-index");
                                      }else{
                                      $("#searchAuditPickList").val("");
                                      $("#seachImageGA").attr("src","assets/icon_search.png");
                                      $("#auditIndex").attr("class","audit-index-nofilter");
                                      $("#SearchAuditPickList").css("display","none");
                                      }
                                      });
                  
                  //Tap sort nav bar on audit screen
                  $("#SortAuditPickList div[data-role='navbar'] ul li a").on("click touchstart", function(e) {
                                                                        
                                                                        var sortAuditOrder = $('#SortAuditPickList div[data-role="navbar"] ul li a.ui-btn-active').text();
                                                                        localStorage.setItem("sortAuditOrder",sortAuditOrder);
                                                                        populateAuditScreen().done(hideSpinner());
                                                                             
                                                                           
                                                                        });
                  
                  //Click search Go icon on audit screen
                  $("#searchSubmitGA").on("click touchstart", function(e) {
                                        event.preventDefault();
                                          
                                          if($("#searchSubmitGA").text()=="FIND"){
                                          
                                          var searchKey = $("#searchAuditPickList").val();
                                          if(searchKey == ""){
                                          return;
                                          }else{
                                          window.plugins.spinnerDialog.show();
                                          $("#searchSubmitGA").text("CLEAR");
                                          searchAllAudits(searchKey).done(hideSpinner());
                                          }
                                          }else{
                                          $("#searchAuditPickList").val("");
                                          $("#searchSubmitGA").text("FIND");
                                          populateAuditScreen().done(hideSpinner());
                                          }
                                    });
                  
                
                  
                  //Click Add Question on picklist screen
                  $("#addQuestion").on("click touchend", function(e) {
                                       e.preventDefault();
                                       if($("#CheckListTextAreaName").val() == ""){
                                       event.preventDefault();
                                       showAlert("Please enter checklist name to continue");
                                       }else{
                                       
                                       event.preventDefault();
                                       if($("#checkListDisplay").val() == "new"){
                                       insertCheckListNameDescription().done(goToAddQuestion() );
                                       }else{
                                       goToAddQuestion();
                                       }
                                       
                                       }
                                 
                                 });
                  
                 
                  
                  //Click Multiplechoice disabled corrective action selection
                  
                   $("#multipleChoice").on("click touchend", function(e) {
                                           e.preventDefault();
                                           $("#CAYes").attr("class","corrective-action-yes-no");
                                           $("#CANo").attr("class","corrective-action-yes-no");
                                           $("#CANA").attr("class","corrective-action-yes-no");
                  
                    });
                  
                  //Click YES/NO/NA disabled corrective action selection
                  
                  $("#yesNO").on("click touchend", function(e) {
                                          var CAArray = ["CA1","CA2","CA3","CA4","CA5"];
                                          for(var i=0;i<CAArray.length;i++){
                                          $("#"+CAArray[i]).attr("class","corrective-action-style");
                                          }
                                          });
                  
                  //Question Photo Div clicked
                  $("#questionPhotoDiv").on("click touchstart", function(e) {
                                            event.preventDefault();
                                            if($("#question-photo-value").val()=="inactive"){
                                            $(this).css('background','#0088c7');
                                            $("#question-photo-text").css('color','#ffffff');
                                            $("#question-photo-value").val("active");
                                            }else{
                                            $(this).css('background','#ffffff');
                                            $("#question-photo-text").css('color','#808080');
                                            $("#question-photo-value").val("inactive");
                                            }
                    });
                  
                  //Sub Question Photo Div clicked
                  $("#questionPhotoDivSub").on("click touchstart", function(e) {
                                            event.preventDefault();
                                            if($("#question-photo-value-sub").val()=="inactive"){
                                            $(this).css('background','#0088c7');
                                            $("#question-photo-text-sub").css('color','#ffffff');
                                            $("#question-photo-value-sub").val("active");
                                            }else{
                                            $(this).css('background','#ffffff');
                                            $("#question-photo-text-sub").css('color','#808080');
                                            $("#question-photo-value-sub").val("inactive");
                                            }
                                            });
                  
                  //Question Notes Div clicked
                  $("#questionNotesDiv").on("click touchstart", function(e) {
                                            event.preventDefault();
                                            if($("#question-notes-value").val()=="inactive"){
                                            $(this).css('background','#0088c7');
                                            $("#question-notes-text").css('color','#ffffff');
                                            $("#question-notes-value").val("active");
                                            }else{
                                            $(this).css('background','#ffffff');
                                            $("#question-notes-text").css('color','#808080');
                                            $("#question-notes-value").val("inactive");
                                            }
                                            });
                  
                  //SubQuestion Photo Div clicked
                  $("#questionNotesDivSub").on("click touchstart", function(e) {
                                            event.preventDefault();
                                            if($("#question-notes-value-sub").val()=="inactive"){
                                            $(this).css('background','#0088c7');
                                            $("#question-notes-text-sub").css('color','#ffffff');
                                            $("#question-notes-value-sub").val("active");
                                            }else{
                                            $(this).css('background','#ffffff');
                                            $("#question-notes-text-sub").css('color','#808080');
                                            $("#question-notes-value-sub").val("inactive");
                                            }
                                            });
                  
                  $("td:not(.td2)").on("click touchstart", function(e) {
                            event.preventDefault();
                            
                            var clickedCell = $(this).text();
                                       if(e.target.id=="CAYes" || e.target.id=="CANo" || e.target.id == "CANA"){
                                     //  $( this ).siblings().attr("class","corrective-action-yes-no");
                                       var CAYesNoArray = ["CAYes","CANo","CANA"];
                                       CAYesNoArray = jQuery.grep(CAYesNoArray, function(value) {
                                                             return value != e.target.id;
                                                             });
                                       
                                       for(var i=0;i<CAYesNoArray.length;i++){
                                       $("#"+CAYesNoArray[i]).attr("class","corrective-action-yes-no");
                                       }
                                       if($(this).attr("class")=="corrective-action-yes-no"){
                                       $( this ).attr("class","corrective-action-yes-no-selected");
                                       }else if($(this).attr("class")=="corrective-action-yes-no-selected"){
                                       $( this ).attr("class","corrective-action-yes-no");
                                       }
                                      
                                       }else if(e.target.id=="CAYesSub" || e.target.id=="CANoSub" || e.target.id == "CANASub"){
                                       //  $( this ).siblings().attr("class","corrective-action-yes-no");
                                       var CAYesNoArray = ["CAYesSub","CANoSub","CANASub"];
                                       CAYesNoArray = jQuery.grep(CAYesNoArray, function(value) {
                                                                  return value != e.target.id;
                                                                  });
                                       
                                       for(var i=0;i<CAYesNoArray.length;i++){
                                       $("#"+CAYesNoArray[i]).attr("class","corrective-action-yes-no");
                                       }
                                       if($(this).attr("class")=="corrective-action-yes-no"){
                                       $( this ).attr("class","corrective-action-yes-no-selected");
                                       }else if($(this).attr("class")=="corrective-action-yes-no-selected"){
                                       $( this ).attr("class","corrective-action-yes-no");
                                       }
                                       
                                       }else if(e.target.id=="Answer1" || e.target.id=="Answer2" || e.target.id == "Answer3" || e.target.id == "Answer4" || e.target.id == "Answer5"){
                                       //Check if the text is Answer1/Answer2/ so and so forth
                                       if($("#" +e.target.id).text() == e.target.id){
                                       localStorage.setItem("temporaryAnswerId",e.target.id);
                                       $.mobile.navigate("#editCheckListAnswer");
                                       }else{
                                       localStorage.setItem("temporaryAnswerId",e.target.id);
                                       $("#answerMainTextArea").val($("#" +e.target.id).text());
                                       $.mobile.navigate("#editCheckListAnswer");
                                       }
                                       }else if(e.target.id=="Answer1Sub" || e.target.id=="Answer2Sub" || e.target.id == "Answer3Sub" || e.target.id == "Answer4Sub" || e.target.id == "Answer5Sub"){
                                       //Check if the text is Answer1/Answer2/ so and so forth
                                       if(($("#" +e.target.id).text())+"Sub" == e.target.id){
                                       localStorage.setItem("temporaryAnswerId",$("#" +e.target.id).text());
                                       $.mobile.navigate("#editCheckListAnswer");
                                       }else{
                                       localStorage.setItem("temporaryAnswerId",e.target.id);
                                       $("#answerMainTextArea").val($("#" +e.target.id).text());
                                       $.mobile.navigate("#editCheckListAnswer");
                                       }
                                       }else if(e.target.id=="CA1" || e.target.id=="CA2" || e.target.id == "CA3" || e.target.id == "CA4" || e.target.id == "CA5"){
//                                       $( "#answerTable tr:nth-child(1) td:nth-child(2)" ).attr("class","corrective-action-style");
//                                       $( "#answerTable tr:nth-child(2) td:nth-child(2)" ).attr("class","corrective-action-style");
//                                       $( "#answerTable tr:nth-child(3) td:nth-child(2)" ).attr("class","corrective-action-style");
//                                       $( "#answerTable tr:nth-child(4) td:nth-child(2)" ).attr("class","corrective-action-style");
//                                       $( "#answerTable tr:nth-child(5) td:nth-child(2)" ).attr("class","corrective-action-style");
                                       var CAArray = ["CA1","CA2","CA3","CA4","CA5"];
                                       CAArray = jQuery.grep(CAArray, function(value) {
                                                       return value != e.target.id;
                                                       });
                                       
                                       for(var i=0;i<CAArray.length;i++){
                                        $("#"+CAArray[i]).attr("class","corrective-action-style");
                                       }
                                       if($( this ).siblings().text()!=""){
                                       if($(this).attr("class")=="corrective-action-style"){
                                       $( this ).attr("class","corrective-action-style-selected");
                                       }else if($(this).attr("class")=="corrective-action-style-selected"){
                                       $( this ).attr("class","corrective-action-style");
                                       }
                                       }
                                       }else if(e.target.id=="CASub1" || e.target.id=="CASub2" || e.target.id == "CASub3" || e.target.id == "CASub4" || e.target.id == "CASub5"){
                                       //                                       $( "#answerTable tr:nth-child(1) td:nth-child(2)" ).attr("class","corrective-action-style");
                                       //                                       $( "#answerTable tr:nth-child(2) td:nth-child(2)" ).attr("class","corrective-action-style");
                                       //                                       $( "#answerTable tr:nth-child(3) td:nth-child(2)" ).attr("class","corrective-action-style");
                                       //                                       $( "#answerTable tr:nth-child(4) td:nth-child(2)" ).attr("class","corrective-action-style");
                                       //                                       $( "#answerTable tr:nth-child(5) td:nth-child(2)" ).attr("class","corrective-action-style");
                                       var CAArray = ["CASub1","CASub2","CASub3","CASub4","CASub5"];
                                       CAArray = jQuery.grep(CAArray, function(value) {
                                                             return value != e.target.id;
                                                             });
                                       
                                       for(var i=0;i<CAArray.length;i++){
                                       $("#"+CAArray[i]).attr("class","corrective-action-style");
                                       }
                                       if($( this ).siblings().text()!=""){
                                       if($(this).attr("class")=="corrective-action-style"){
                                       $( this ).attr("class","corrective-action-style-selected");
                                       }else if($(this).attr("class")=="corrective-action-style-selected"){
                                       $( this ).attr("class","corrective-action-style");
                                       }
                                       }
                                       }
                  });
                  
                  //Click Cancel on Answer screen
                  $("#cancelAnswer").on("click touchend", function(e) {
                                       e.preventDefault();
                                       $("#answerMainTextArea").val("");
                                       $.mobile.navigate("#editCheckListQuestion");
                                       });
                  
                  //Click Done on Answer screen
                  $("#answerDone").on("click touchend", function(e) {
                                     // console.log("temporaryAnswerId:"+localStorage.getItem("temporaryAnswerId"));
                                        e.preventDefault();
                                        var answerID = localStorage.getItem("temporaryAnswerId");
                                        if($("#answerMainTextArea").val()!=""){
                                        $("#" + answerID).text($("#answerMainTextArea").val());
                                        $("#answerMainTextArea").val("");
                                      if(previousPage == "editCheckListQuestion"){
                                        $.mobile.navigate("#editCheckListQuestion");
                                      }else{
                                         $.mobile.navigate("#editCheckListSubQuestion");
                                      }
                                        localStorage.setItem("temporaryAnswerId","");
                                        }else{
                                        $("#" + answerID).text(answerID);
                                        $( this ).siblings().attr("class","corrective-action-style");
                                        $("#answerMainTextArea").val("");
                                      if(previousPage == "editCheckListQuestion"){
                                      $.mobile.navigate("#editCheckListQuestion");
                                      }else{
                                      $.mobile.navigate("#editCheckListSubQuestion");
                                      }
                                        localStorage.setItem("temporaryAnswerId","");
                                        }
                                      
                                      
                                        });
                  
                  //Click share on checklist details screen
                  $("#shareButton").on("click touchend", function(e) {
                                       e.preventDefault();
                                      // console.log("checklistId:"+checkListId);
                                       if (checkConnection() == 'No network connection') {
                                       showAlert("No internet connection found. Please try submitting audit data when connection is available.");
                                       }else{
                                       navigator.notification.confirm(
                                                                      'Are you sure you want to share your list with everyone?', // message
                                                                      onConfirmSharePickList,            // callback to invoke with index of button pressed
                                                                      'Shared Checklist',           // title
                                                                      ['Share to All List','Cancel']     // buttonLabels
                                                                      );
                                       
                                       
                                       
                                       }
                                         });
                  
                  //Click copy on checklist details screen
                  $("#copySharedPickList").on("click touchend", function(e) {
                                             e.preventDefault();
                                             // console.log("checklistId:"+checkListId);
                                              
                                              navigator.notification.confirm(
                                                                             'Are you sure you want to copy this shared Picklist?', // message
                                                                             onConfirmCopyPickList,            // callback to invoke with index of button pressed
                                                                             'Shared Checklist',           // title
                                                                             ['Copy to My List','Cancel']     // buttonLabels
                                                                             );
                                             ;
                                    });
                  
                  //Click Done on checklist screen
                  $("#checkListDone").on("click touchend", function(e) {
                                         if($("#CheckListTextAreaName").val() == ""){
                                         event.preventDefault();
                                         showAlert("Please enter checklist name to continue");
                                         }else{
                                         event.preventDefault();
                                         if($("#checkListDisplay").val() == "new"){

                                         insertCheckListNameDescription().done(goToPickList() );
                                         
                                         }else if($("#checkListDisplay").val() == "old"){
                                         
                                         updateCheckListNameDescription().done(showSelectedCheckListDetails(checkListId) );
                                         
                                         }
                                         
                                         }
                                         });
                  
                  //Click cancel on checklist screen
                  $("#cancelCheckList").on("click touchend", function(e) {
                                         e.preventDefault();
                                           if($("#checkListDisplay").val() == "new"){
                                           $.mobile.navigate("#pickList");
                                           }else{
                                            showSelectedCheckListDetails(checkListId);
                                           }
                                        
                                           
                                         
                                         });
                  
                  
                  //Tap on individual checklist or favorite icon from picklist screen
                $(document).on("tap", ".checklist-individual-div", function(e) {
                                 e.preventDefault();
                                 $("#searchPickList").val("");
                                 $("#searchSubmit").text("FIND");
                                 var className = $(e.target).prop("class");
                                 var divId = ($(this).attr("id"));
                                 divId = divId.replace("checklist-","");
                                 if (className.indexOf("favorite") !== -1 ){
                                 window.plugins.spinnerDialog.show();
                                 if($(this).find(".favorite-image-class").attr("src")=="assets/icon_unfavorite_picklist.png"){
                                 $(this).find(".favorite-image-class").attr("src","assets/icon_favorite_picklist.png");
                                 updateFavorite('1',divId);
                                 }else{
                                 $(this).find(".favorite-image-class").attr("src","assets/icon_unfavorite_picklist.png");
                                 updateFavorite('0',divId);
                                 }
                                 }else{
                                 showSelectedCheckListDetails(divId);
                                 }
                                 

                });
                  
                  //Tap on individual checklist from picklist screen - all Lists
                  $(document).on("tap", ".checklist-individual-shared-div", function(e) {
                                 e.preventDefault();
                                 if (checkConnection() == 'No network connection') {
                                 showAlert("No internet connection found. Please try when connection is available.");
                                 }else{
                                 //Get id, picklist name and description
                                 var divId = ($(this).attr("id"));
                                 divId = divId.replace("checklist-","");
                                 var sharedCheckListName = $(this).find(".checklist-name").text();
                                 var sharedCheckListDescription = $(this).find(".checklist-description").text();
                                 
                                 var auditorName = $(this).find(".checklist-auditor-name").children(":first").text();
                                
                                 var auditorLOB = $(this).find(".checklist-creator-LOB").text();
                                 
                                 var sharedPickListObject = new Object();
                                 sharedPickListObject.checkListName = sharedCheckListName;
                                 sharedPickListObject.checkListDescription = sharedCheckListDescription;
                                 localStorage.setItem("sharedPickList",JSON.stringify(sharedPickListObject));
                                 
                                 var url = "https://webvan-dev.disney.com/wdpr/safedchecklite/GetPickListDetails?id="+divId;
                                 var jxhr = $.ajax({
                                                   type : "POST",
                                                   url : url,
                                                   dataType: 'json'
                                                   }).done(function(data) {
                                                           localStorage.setItem("sharedPickListData",JSON.stringify(data));
                                                           showSharedCheckListDetails(data,sharedCheckListName,sharedCheckListDescription,auditorName,auditorLOB,divId);
                                                           // showAlert("Audit data saved successfully");
                                                           }).fail(function(jqXHR, textStatus) {
                                                                   console.log(textStatus);
                                                                   showAlert("Oops. Something went wrong. Please try again later.");
                                                                   });
                                 }
                                 });
                  
                  //Delete shared picklist
                  $("#deleteSharedPickList").on("click touchend", function(e) {
                                     e.preventDefault();
                                    if (checkConnection() == 'No network connection') {
                                    showAlert("No internet connection found. Please try when connection is available.");
                                        }else{
                                    navigator.notification.confirm(
                                    'Are you sure you want to delete this publicly shared checklist?', // message
                                    onConfirmDeleteSharedPickList,            // callback to invoke with index of button pressed
                                    'Delete shared checklist',           // title
                                    ['OK','Cancel']     // buttonLabels
                                    );
                                }
                                    
                                                
                            });
                  
                  //Tap on location on actual audit screen
                  
                  $(document).on("tap", ".audit-location-start-audit", function(e) {
                                 
                                 $("#searchLocations").val($(this).html());
                                 $.mobile.navigate("#location");
                                 
                                 });
                  
                  //Tap on individual audit on audit list screen
                  
                  $(document).on("tap", ".unsortable-audit-class", function(e) {
                                 e.preventDefault();
                                 var clickedElement = $(e.target);
                                 
                               
                                 
                                 var questionId = "";
                                 var questionText = "";
                                 var answerText = "";
                                 var questionClass = "";
                                 var row="";
                                 var col = "";
                                 if((clickedElement.attr("class")== "answer-style-yes-no" && e.target.nodeName == "TD")||(clickedElement.attr("class")== "answer-style-yes-no-selected" && e.target.nodeName == "TD")){
                                 window.plugins.spinnerDialog.show();
                                 clickedElement.css("color","#ffffff");
                                 clickedElement.css("background","#0088c7");
                                 clickedElement.siblings().css("color","#808080");
                                 clickedElement.siblings().css("background","#ffffff");
                                 questionId = clickedElement.closest("li").attr("id").split("-")[1];
                                 questionClass = clickedElement.closest("li").attr("class");
                                 questionText = clickedElement.closest("div").prev().html();
                                 answerText = clickedElement.text();
                                  col = clickedElement.parent().children().index(clickedElement);
                                  row = clickedElement.parent().parent().children().index(clickedElement.parent());
                                 insertAuditAnswer(questionId,questionText,answerText,clickedElement,questionClass,col,row);
                                 }else if((clickedElement.attr("class")== "answer-style" && e.target.nodeName == "TD")||(clickedElement.attr("class")== "answer-style-selected" && e.target.nodeName == "TD")){
                                 window.plugins.spinnerDialog.show();
                                 clickedElement.css("color","#ffffff");
                                 clickedElement.css("background","#0088c7");
                                 clickedElement.parent().siblings().children().css("color","#808080");
                                 clickedElement.parent().siblings().children().css("background","#ffffff");
                                 questionId = clickedElement.closest("li").attr("id").split("-")[1];
                                 questionClass = clickedElement.closest("li").attr("class");
                                 questionText = clickedElement.closest("div").prev().html();
                                 answerText = clickedElement.text();
                                  col = clickedElement.parent().children().index(clickedElement);
                                  row = clickedElement.parent().parent().children().index(clickedElement.parent());
                                   insertAuditAnswer(questionId,questionText,answerText,clickedElement,questionClass,col,row);
                                 }else if(clickedElement.attr("class")== "quick-capture-middle-div-question-notes"){
                                 var parentElement = clickedElement.parent();
                                 questionId = parentElement.closest("li").attr("id").split("-")[1];
                                 var typeClicked = parentElement.children().find("img").attr("src");
                                 questiontext = parentElement.parent().attr("id").split("-")[1];
                                 tempDataArray.push(questionId,questiontext,clickedElement);
                                 $.mobile.navigate("#notes");
                                 }else if(clickedElement.attr("class")== "quick-capture-middle-div-question-photo"){
                                 var parentElement = clickedElement.parent();
                                 questionId = parentElement.closest("li").attr("id").split("-")[1];
                                 var typeClicked = parentElement.children().find("img").attr("src");
                                 questiontext = parentElement.parent().attr("id").split("-")[1];
                                 tempDataArray.push(questionId,questiontext,clickedElement);
                                 navigator.camera.getPicture(onSuccessAudit, onFailAudit, {
                                                             quality: 50,destinationType: Camera.DestinationType.DATA_URL,correctOrientation: true
                                                             });
                                 }
                                 else if(clickedElement.attr("class")== "quick-capture-middle-col-audit-photo-notes-inactive"){
                                // console.log("class here:"+clickedElement.attr("class"));
                                 questionId = clickedElement.closest("li").attr("id").split("-")[1];
                                 var typeClicked = clickedElement.children().find("img").attr("src");
                                 questiontext = clickedElement.parent().attr("id").split("-")[1];
                                 tempDataArray.push(questionId,questiontext,clickedElement);
                                 //console.log("questiontext:"+questiontext);
                                  if(typeClicked == "assets/icon_photo_small.png"){
                                 
                                 navigator.camera.getPicture(onSuccessAudit, onFailAudit, {
                                                              quality: 50,destinationType: Camera.DestinationType.DATA_URL,correctOrientation: true
                                                             });
                                 }else if(typeClicked == "assets/icon_notes_small.png"){
                                 $.mobile.navigate("#notes");
                                 }
                                 }else if (e.target.nodeName =="IMG"){
                                 questionId = clickedElement.closest("li").attr("id").split("-")[1];
                                 var typeClicked = clickedElement.closest("img").attr("src");
                                 var elementForClassChange = clickedElement.closest(".quick-capture-middle-col-audit-photo-notes-inactive");
                                 questiontext = clickedElement.parent().parent().parent().attr("id").split("-")[1];
                                 tempDataArray.push(questionId,questiontext,elementForClassChange);
                                 if(typeClicked == "assets/icon_photo_small.png"){
                                 
                                 navigator.camera.getPicture(onSuccessAudit, onFailAudit, {
                                                             quality: 50,destinationType: Camera.DestinationType.DATA_URL,correctOrientation: true
                                                             });
                                 }else if(typeClicked == "assets/icon_notes_small.png"){
                                    $.mobile.navigate("#notes");
                                 }
                                 
                                 }
                                 
                                 
                                 //insertAuditAnswer(questionId,questionText,answerText);
                                 
                        });
                  
                  //Tap on View PDF on audit screen
                  $("#viewAuditPDF").on("click touchend", function(e) {
                                        e.preventDefault();
                                        window.plugins.spinnerDialog.show();
                                        createAuditPDF('view');
                                        });
                  
                  //Tap on Submit PDF on audit screen
                  $("#sendAuditPDF").on("click touchend", function(e) {
                                        e.preventDefault();
                                        window.plugins.spinnerDialog.show();
                                        createAuditPDF('message');
                                        });

                   //OnSuccess Image Audit


                function onSuccessAudit(imageData) {
                  
                  window.plugins.spinnerDialog.show();
                  var img = new Image();
                  img.onload = function(){
                  tempDataArray.push(imageData);
                  tempDataArray.push(Math.round((img.width * 90)/img.height));
                  tempDataArray.push(90);
                  if(this.complete){
                  insertAuditPhoto();
                  }
                  };
                  img.src = "data:image/jpeg;base64," + imageData;
                  
    
                }

                function onFailAudit(imageData) {
    
                        console.log(imageData);
    
                }


                  //Tap on complete and incomplete on audit question screen
                  $("#completeAuditSpan").on("click touchend", function(e) {
                                           e.preventDefault();
                                             if($(this).attr("class")=="complete-span-unselected"){
                                             $(this).removeClass("complete-span-unselected").addClass("complete-span-selected");
                                             
                                             $("#incompleteAuditSpan").removeClass("incomplete-span-selected").addClass("incomplete-span-unselected");
                                             populateAuditQuestionScreen(auditIdSelected,"complete");
                                             }
                                           
                                           });
                  
                  $("#incompleteAuditSpan").on("click touchend", function(e) {
                                             e.preventDefault();
                                             if($(this).attr("class")=="incomplete-span-unselected"){
                                             $(this).removeClass("incomplete-span-unselected").addClass("incomplete-span-selected");
                                             $("#completeAuditSpan").removeClass("complete-span-selected").addClass("complete-span-unselected");
                                               populateAuditQuestionScreen(auditIdSelected,"incomplete");
                                             }
                                             
                                             });
                  
                  //Pause pressed on audit question screen
                  $("#pauseAudit").on("click touchend", function(e) {
                                               e.preventDefault();
                                               $("#auditQuestionAnswers").html("");
                                               $.mobile.navigate("#goAudit");
                                               
                                               });
                  
                  //Tap on delete audit
                   $(document).on("click touchend", "#deleteAudit", function(e) {
                  
                                      e.preventDefault();
                                       navigator.notification.confirm(
                                                                      'Are you sure you want to delete this Audit?', // message
                                                                      onAuditDeleteConfirm,            // callback to invoke with index of button pressed
                                                                      'Delete Audit',           // title
                                                                      ['OK','Cancel']     // buttonLabels
                                                                      );
                                      
                                      });
                  
                  
                  //Tap on corrective action in audit
                  $(document).on("click touchstart", ".corrective-action-div", function(e) {
                                 
                                 e.preventDefault();
                                 
                                 var qId =$(this).attr("id").split("-")[1];
                                 openCorrectiveActionScreen(qId);
                                 });

                  
                  //CA done
                  $("#CADone").on("click touchstart", function(e) {
                                  e.preventDefault();
                                  window.plugins.spinnerDialog.show();
                                  if ($("#CATextArea").val() == ""){
                                  showAlert("Please enter corrective action to continue");
                                  
                                  }else{
                                  insertAuditCA(localStorage.getItem("insertAnswer-questionId"),localStorage.getItem("insertAnswer-questionText"),localStorage.getItem("insertAnswer-answerText"),localStorage.getItem("insertAnswer-clickedElement"));
                                  
                                  // $.mobile.navigate("#startAudit");
                                  }
                                 
                                  
                });

                  
                  
                  
                                   
                  //Tap on individual checklist or favorite icon from picklist screen
                  $(document).on("tap", ".audit-individual-div", function(e) {
                                 e.preventDefault();
                                 var divId = ($(this).attr("id"));
                                 divId = divId.replace("audit-","");
                                 auditIdSelected = divId;
                                 window.plugins.spinnerDialog.show();
                                 populateAuditQuestionScreen(divId,"complete");
                               
                                 
                                 });
                  
                  //Cancel checklist question - show defaults and go to previous screen
                  
                  $("#cancelCheckListQuestion").on("click touchend", function(e) {
                                                   e.preventDefault();
                                                   
                                                  // $("#yesNO").checkboxradio('enable');
                                                   //$("#multipleChoice").checkboxradio('enable');
                                                  // $("input[type='radio']").checkboxradio("refresh");
                                                   showSelectedCheckList(checkListId);
                                                   showQuestionDefaults();
                                    });
                  
                  //Cancel checklist sub question - show defaults and go to previous screen
                  $("#cancelCheckListSubQuestion").on("click touchend", function(e) {
                                                   e.preventDefault();
                                                  // $("#yesNOSub").checkboxradio('enable');
                                                  // $("#multipleChoiceSub").checkboxradio('enable');
                                                   //$("input[type='radio']").checkboxradio("refresh");
                                                   showSelectedCheckList(checkListId);
                                                   showSubQuestionDefaults();
                                                   });
                  
                //Done checklist question - show defaults, save to DB and go to previous screen
                  
                  $("#doneCheckListQuestion").on("click touchend", function(e) {
                                                   e.preventDefault();
                                                   if($("#CheckListTextAreaQuestion").val() == ""){
                                                        showAlert("Please enter question to continue");
                                                        return;
                                                    }
                                                 
                                                   var checkListQuestion = $("#CheckListTextAreaQuestion").val();
                                                   var questionPhotoVal = $("#question-photo-value").val();
                                                   var questionNotesVal = $("#question-notes-value").val();
                                                   window.plugins.spinnerDialog.show();

                                                   var selectedRadio = $("input[type='radio'][name='answerType']:checked");
                                                   var selectedRadioId = selectedRadio.attr("id");
                                                 
                                                    if(selectedRadioId == "multipleChoice"){
                                                    var answerOne = $( "#answerTable tr:nth-child(1) td:nth-child(1)" ).text();
                                                    var answerTwo = $( "#answerTable tr:nth-child(2) td:nth-child(1)" ).text();
                                                    var answerThree = $( "#answerTable tr:nth-child(3) td:nth-child(1)" ).text();
                                                    var answerFour = $( "#answerTable tr:nth-child(4) td:nth-child(1)" ).text();
                                                    var answerFive = $( "#answerTable tr:nth-child(5) td:nth-child(1)" ).text();
                                                    if(answerOne == "Answer1" && answerTwo == "Answer2" && answerThree == "Answer3" &&  answerFour == "Answer4" && answerFive == "Answer5"){
                                                        showAlert("Please enter atleast one answer for the selection you made.");
                                                        return;
                                                    }
                                                    //Select corrective action selected for multiple choice
                                                    var CAMCSelected = $("#answerTable").find(".corrective-action-style-selected").attr("id");
                                                 if($("#questionDisplay").val() == "new"){
                                                 insertMultipleChoiceQuestionParameters(checkListQuestion,questionPhotoVal,questionNotesVal,answerOne,answerTwo,answerThree,answerFour,answerFive,CAMCSelected);
                                                 }else{
                                                 updateMultipleChoiceQuestionParameters(checkListQuestion,questionPhotoVal,questionNotesVal,answerOne,answerTwo,answerThree,answerFour,answerFive,CAMCSelected);
                                                 }
                                                 // $("input[type='radio']").checkboxradio("refresh");
                                                 
                                                    //
                                                    }else if(selectedRadioId == "yesNO"){
                                                    var CAYNSelected = "";
                                                    CAYNSelected = $("#YNTable").find(".corrective-action-yes-no-selected").attr("id");
                                                  if($("#questionDisplay").val() == "new"){
                                                
                                                    insertYNQuestionParameters(checkListQuestion,questionPhotoVal,questionNotesVal,CAYNSelected);
                                                        }else{
                                                
                                                    updateYNQuestionParameters(checkListQuestion,questionPhotoVal,questionNotesVal,CAYNSelected);
                                                        }
                                                 // $("input[type='radio']").checkboxradio("refresh");
                                                        }else{
                                                 //Confirm delete
                                                 navigator.notification.confirm(
                                                                                'Are you sure you have completed this question?', // message
                                                                                onQuestionConfirm,            // callback to invoke with index of button pressed
                                                                                'Question done',           // title
                                                                                ['OK','Cancel']     // buttonLabels
                                                                                );
                                                        }
                                                   });
                  
                  
                  //Done checklist sub question - show defaults, save to DB and go to previous screen
                  
                  $("#doneCheckListSubQuestion").on("click touchend", function(e) {
                                                 e.preventDefault();
                                                 if($("#CheckListTextAreaSubQuestion").val() == ""){
                                                 showAlert("Please enter question to continue");
                                                 return;
                                                 }
                                                  
                                                 var checkListSubQuestion = $("#CheckListTextAreaSubQuestion").val();
                                                 var subquestionPhotoVal = $("#question-photo-value-sub").val();
                                                 var subquestionNotesVal = $("#question-notes-value-sub").val();
                                                 window.plugins.spinnerDialog.show();
                                                 
                                                 var selectedRadio = $("input[type='radio'][name='answerTypeSub']:checked");
                                                 var selectedRadioId = selectedRadio.attr("id");
                                                 
                                                 if(selectedRadioId == "multipleChoiceSub"){
                                                 var answerOne = $( "#answerTableSub tr:nth-child(1) td:nth-child(1)" ).text();
                                                 var answerTwo = $( "#answerTableSub tr:nth-child(2) td:nth-child(1)" ).text();
                                                 var answerThree = $( "#answerTableSub tr:nth-child(3) td:nth-child(1)" ).text();
                                                 var answerFour = $( "#answerTableSub tr:nth-child(4) td:nth-child(1)" ).text();
                                                 var answerFive = $( "#answerTableSub tr:nth-child(5) td:nth-child(1)" ).text();
                                                 if(answerOne == "Answer1" && answerTwo == "Answer2" && answerThree == "Answer3" &&  answerFour == "Answer4" && answerFive == "Answer5"){
                                                 showAlert("Please enter atleast one answer for the selection you made.");
                                                 return;
                                                 }
                                                 //Select corrective action selected for multiple choice
                                                 var CAMCSelected = $("#answerTableSub").find(".corrective-action-style-selected").attr("id");
                                                 
                                                 updateMultipleChoiceSubQuestionParameters(checkListSubQuestion,subquestionPhotoVal,subquestionNotesVal,answerOne,answerTwo,answerThree,answerFour,answerFive,CAMCSelected);
                                                 
                                                 // $("input[type='radio']").checkboxradio("refresh");
                                                 
                                                 //
                                                 }else if(selectedRadioId == "yesNOSub"){
                                                 var CAYNSelected = "";
                                                 CAYNSelected = $("#YNTableSub").find(".corrective-action-yes-no-selected").attr("id");
                                                  
                                                 updateYNSubQuestionParameters(checkListSubQuestion,subquestionPhotoVal,subquestionNotesVal,CAYNSelected);
                                                 
                                                 // $("input[type='radio']").checkboxradio("refresh");
                                                 }else{
                                                 //Confirm delete
                                                 navigator.notification.confirm(
                                                                                'Are you sure you have completed this question?', // message
                                                                                onQuestionConfirm,            // callback to invoke with index of button pressed
                                                                                'Question done',           // title
                                                                                ['OK','Cancel']     // buttonLabels
                                                                                );
                                                 }
                                                 });
                  
                  //Tap Add Sub Question on picklist screen
                  $("#addSubQuestion").on("click touchend", function(e) {
                                          if($("#questionDisplay").val() == "new"){
                                          e.preventDefault();
                                          showAlert("Conditional questions can be added only to existing questions");
                                          }else{
                                          getSelectedQuestionText(questionIdSelected);
                                          }
                                          
                                          });
                  
                  //Tap Sub question done
                  $("#subQuestionDone").on("click touchend", function(e) {
                                           
                                           e.preventDefault();
                                           //get all checked checkboxes
                                           var allCheckedVals = [];
                                           var allUnCheckedVals = [];
                                           $("#checkBoxDiv :checked").each(function() {
                                                                   allCheckedVals.push($(this).val());
                                                                   });
                                           $("#checkBoxDiv :not(:checked)").each(function() {
                                                                           allUnCheckedVals.push($(this).val());
                                                                           });
                                           
                                           console.log("allCheckedVals:"+allCheckedVals);
                                           console.log("allUnCheckedVals:"+allUnCheckedVals);
                                           var selectedResponse = $( "#selectResponse option:selected" ).val();
                                           console.log("selectedresponse:"+selectedResponse);
                                          
                                           if(selectedResponse == "none"){
                                                showAlert("Please enter a valid response to proceed");
                                                return;
                                           }else{
                                                window.plugins.spinnerDialog.show();
                                           
                                           //Checked questions followed by unchecked questions followed by update question_table if sub questions exist followed by update question_table if sub_questions do not exist
                                           
                                           checkedQuestions(allCheckedVals,allUnCheckedVals,selectedResponse).done( uncheckedQuestions(allCheckedVals,allUnCheckedVals,selectedResponse).done(updateQuestionTableExists(selectedResponse).done(completeSubQuestion())) );
                                           
//                                           checkedQuestions(allCheckedVals,allUnCheckedVals,selectedResponse).done(uncheckedQuestions(allCheckedVals,allUnCheckedVals,selectedResponse)
//                                           
//                                                addSubQuestions(allCheckedVals,allUnCheckedVals,selectedResponse).complete(gotoSelectedQuestion).done(completeSubQuestion);
                                           
                                           }
                                           
                                           
                                           });
                  
                  //Tap Sub question cancel
                  $("#cancelSubQuestion").on("click touchend", function(e) {
                                             
                                             e.preventDefault();
                                             showSelectedQuestion(questionIdSelected);
                                             
                                             });
                  
                  //Tap delete sub question
                  $("#deleteSubQuestion").on("click touchend", function(e) {
                                             
                                             e.preventDefault();
                                             deleteAllSubQuestions();
                                             
                                             });
                  
                  //Tap delete individual sub question
                  $("#deletePLSubQuestion").on("click touchend", function(e) {
                                             
                                             e.preventDefault();
                                             deleteSubQuestion();
                                             
                                             });
                  //Tap reorder questions tab on reorder screen
                  $("#reorderQuestion").on("click touchend", function(e) {
                                           e.preventDefault();
                                           $("#reorderSpan").attr("class","reorder-inactive");
                                           $("#reorderSubQuestionsSpan").attr("class","reorder-sub-inactive");
                                           $("#reorderSectionSpan").attr("class","reorder-section-active");
                                           populateSectionsOnly();
                                            
                                           });
                  //Tap cancel reorder
                  $("#cancelReorder").on("click touchend", function(e) {
                                           e.preventDefault();
                                           showSelectedCheckList(checkListId);
                                           });
                  
                  $("#reorderDone").on("click touchend", function(e) {
                                         e.preventDefault();
                                         showSelectedCheckList(checkListId);
                                         });
                  
                  $(document).on("tap", "#unsortableQuestions li", function(e) {
                                 e.preventDefault();
                                 
                                 // sortable instance does not exist
                                 window.plugins.spinnerDialog.show();
                                 if(($(this).attr("id").indexOf("question"))>-1){
                                 questionIdSelected = $(this).attr("id").replace("question-","");
                                 showSelectedQuestion(questionIdSelected);
                                 }else if(($(this).attr("id").indexOf("section"))>-1){
                                 sectionIdSelected = $(this).attr("id").replace("section-","");
                                 showSelectedSection(sectionIdSelected);
                                 }else{
                                 subQuestionIdSelected = $(this).attr("id").replace("subQuestion-","");
                                 showSelectedSubQuestion(subQuestionIdSelected);
                                 }
                                 
                                 
                            });
                  
                  $("#reorderSpan").on("click touchend", function(e) {
                                       
                                       e.preventDefault();
                                       if($(this).attr("class") == "reorder-inactive"){
                                            $(this).attr("class","reorder-active");
                                            $("#reorderSubQuestionsSpan").attr("class","reorder-sub-inactive");
                                            $("#reorderSectionSpan").attr("class","reorder-section-inactive");
                                            $( "#sortableQuestions" ).sortable("enable");
                                            populateQuestionsScreen("enable");
                                       }
                                       

                    });
                  
                  $("#reorderSectionSpan").on("click touchend", function(e) {
                                       
                                       e.preventDefault();
                                       if($(this).attr("class") == "reorder-section-inactive"){
                                       $(this).attr("class","reorder-section-active");
                                       $("#reorderSubQuestionsSpan").attr("class","reorder-section-inactive");
                                       $("#reorderSpan").attr("class","reorder-inactive");
                                       //$( "#sortableQuestions" ).sortable("enable");
                                        populateSectionsOnly();
                                       }
                                       
                                       
                                       });
                  
                  

                  $("#reorderSubQuestionsSpan").on("click touchend", function(e) {
                                       
                                       e.preventDefault();
                                       if($(this).attr("class") == "reorder-sub-inactive"){
                                       $(this).attr("class","reorder-sub-active");
                                       $("#reorderSpan").attr("class","reorder-inactive");
                                       $("#reorderSectionSpan").attr("class","reorder-section-inactive");
                                       populateSubQuestionsOnly();
                                    }

                            });
                  
                  
                  
                  
                  
                  $("#addSection").on("click touchend", function(e) {
                                      e.preventDefault();
                                      if($("#CheckListTextAreaName").val() == ""){
                                      event.preventDefault();
                                      showAlert("Please enter checklist name to continue");
                                      }else{
                                      
                                      event.preventDefault();
                                      $("#sectionTextArea").val("");
                                      $("#sectionDisplay").val("new");
                                      if($("#checkListDisplay").val() == "new"){
                                      insertCheckListNameDescription().done(goToAddSection() );
                                      }else{
                                      goToAddSection();
                                      }
                                      }
                                      
                                    });
                  
                  
                  $("#sectionDone").on("click touchend", function(e) {
                                      e.preventDefault();
                                       if($("#sectionTextArea").val()!="")
                                    {
                                       saveSection();
                                    }
                            });
                  
                  $("#deleteSection").on("click touchend", function(e) {
                                       e.preventDefault();
                                         if($("#sectionDisplay").val()=="new"){
                                         showAlert("Section not created. You cannot delete an uncreated section");
                                         }else{
                                         navigator.notification.confirm(
                                                                        'Are you sure you want to delete this section?', // message
                                                                        onSectionDeleteConfirm,            // callback to invoke with index of button pressed
                                                                        'Delete section',           // title
                                                                        ['OK','Cancel']     // buttonLabels
                                                                        );
                                         }
                                         
                                         
                            });
                  
                  $("#cancelSection").on("click touchend", function(e) {
                                         e.preventDefault();
                                         $("#sectionTextArea").val("");
                                         if($("#sectionDisplay").val() == "new"){
                                         showSelectedCheckList(checkListId);
                                         }else{
                                         populateQuestionsScreen("enable");
                                         $("#sectionTextArea").val() = "";
                                         }
                                         });
                  
                  $("#editChecklistDetails").on("click touchend", function(e) {
                                         e.preventDefault();
                                         $("#searchLocations").val("");
                                         $('#addLocationDetails').css('background', '#8cc63f');
                                         $('#addLocationDetails').css('color', '#ffffff');
                                         $('#checkNow').css('background', '#a3a3a3');
                                         $('#checkNow').css('color', '#808080');
                                         $('#checkLater').css('color', '#808080');
                                         $('#checkLater').css('background', '#a3a3a3');
                                         showSelectedCheckList(checkListId);
                                         
                                         });
                  
                  
                  $("#cancelCheckListDetails").on("click touchend", function(e) {
                                                e.preventDefault();
                                                //Defaut location to none and search location to null
                                                  $("#searchLocations").val("");
                                                  $('#addLocationDetails').css('background', '#8cc63f');
                                                  $('#addLocationDetails').css('color', '#ffffff');
                                                  $('#checkNow').css('background', '#a3a3a3');
                                                  $('#checkNow').css('color', '#808080');
                                                  $('#checkLater').css('color', '#808080');
                                                  $('#checkLater').css('background', '#a3a3a3');
                                                 $.mobile.navigate("#pickList");
                                                 });
                  
                  $("#cancelSharedCheckListDetails").on("click touchend", function(e) {
                                                  e.preventDefault();
                                                  
                                                  $.mobile.navigate("#pickList");
                                                  });
                  
                  $("#addLocationDetails").on("click touchend", function(e) {
                                                  e.preventDefault();
                                                  
                                                  $.mobile.navigate("#location");
                                                  });
                  
                  
                  $("#checkLater").on("click touchend", function(e) {
                                              e.preventDefault();
                                            if($("#searchLocations").val() == ""){
                                            showAlert("Please enter location to initiate an audit");
                                            }else{
                                              insertIncompleteAudit(checkListId,"later");
                                            }
                                              });
                  
                  $("#checkNow").on("click touchend", function(e) {
                                      e.preventDefault();
                                    if($("#searchLocations").val() == ""){
                                    showAlert("Please enter location to initiate an audit");
                                    }else{
                                      insertIncompleteAudit(checkListId,"now");
                                    }
                                      
                                      });
                  
                  
                  $("#deletePLQuestion").on("click touchend", function(e) {
                                         e.preventDefault();
                                         
                                            if($("#questionDisplay").val() == "new"){
                                            showAlert("Question not created. You cannot delete an uncreated question");
                                            }else{
                                            //Confirm delete
                                            navigator.notification.confirm(
                                                                           'Are you sure you want to delete this question?', // message
                                                                           onQuestionDeleteConfirm,            // callback to invoke with index of button pressed
                                                                           'Delete question',           // title
                                                                           ['OK','Cancel']     // buttonLabels
                                                                           );
                                         }
                  
                            });

                 });




                    //Check Network connection before quick capture screen loads (Blue/Yellow undeline)

                    $(document).on("pagebeforeshow", "#quickCapture", function(event) {
                                 if (checkConnection() == 'No network connection') {
                                 $('#quickCaptureFocus').css('border-bottom', 'solid 4px #fbb03b');
                                 } else {
                                 $('#quickCaptureFocus').css('border-bottom', 'solid 4px #0088c7');
                                 }
                                 });
                  
                  //Check Network connection before profile screen loads (Blue/Yellow undeline)
                  
                    $(document).on("pagebeforeshow", "#profile", function(event) {
                                 if (checkConnection() == 'No network connection') {
                                 $('#profileFocus').css('border-bottom', 'solid 4px #fbb03b');
                                 $('#onlineDiv').css('display', 'none');
                                 $('#offlineDiv').css('display', 'block');
                                 } else {
                                 $('#profileFocus').css('border-bottom', 'solid 4px #0088c7');
                                 $('#onlineDiv').css('display', 'block');
                                 $('#offlineDiv').css('display', 'none');
                                 }
                                 });

                //Check Network connection before pick screen screen loads (Blue/Yellow underline)

                    $(document).on("pagebeforeshow", "#pickList", function(event) {
                                if (checkConnection() == 'No network connection') {
                                $('#picklistFocus').css('border-bottom', 'solid 4px #fbb03b');
                                } else {
                                $('#picklistFocus').css('border-bottom', 'solid 4px #0088c7');
                                }
                                });

                //Check Network connection before pick screen screen loads (Blue/Yellow underline)

                    $(document).on("pagebeforeshow", "#goAudit", function(event) {
                                if (checkConnection() == 'No network connection') {
                                $('#goCheckFocus').css('border-bottom', 'solid 4px #fbb03b');
                                } else {
                                $('#goCheckFocus').css('border-bottom', 'solid 4px #0088c7');
                                }
                                });

                  //Event driven --- check if the device is online
                  function onOnline() {
                  if ($.mobile.activePage.attr('id') == "profile") {
                  $('#profileFocus').css('border-bottom', 'solid 4px #0088c7');
                  $('#onlineDiv').css('display', 'block');
                  $('#offlineDiv').css('display', 'none');
                  } else if ($.mobile.activePage.attr('id') == "quickCapture") {
                  $('#quickCaptureFocus').css('border-bottom', 'solid 4px #0088c7');
                  }else if ($.mobile.activePage.attr('id') == "pickList") {
                  $('#picklistFocus').css('border-bottom', 'solid 4px #0088c7');
                  }else if ($.mobile.activePage.attr('id') == "goAudit") {
                  $('#goCheckFocus').css('border-bottom', 'solid 4px #0088c7');
                  }
                  }
                  
                  //Event driven --- check if the device is offline
                  function onOffline() {
                  if ($.mobile.activePage.attr('id') == "profile") {
                  $('#profileFocus').css('border-bottom', 'solid 4px #fbb03b');
                  $('#onlineDiv').css('display', 'none');
                  $('#offlineDiv').css('display', 'block');
                  } else if ($.mobile.activePage.attr('id') == "quickCapture") {
                  $('#quickCaptureFocus').css('border-bottom', 'solid 4px #fbb03b');
                  }else if ($.mobile.activePage.attr('id') == "pickList") {
                  $('#picklistFocus').css('border-bottom', 'solid 4px #fbb03b');
                  }else if ($.mobile.activePage.attr('id') == "goAudit") {
                  $('#goCheckFocus').css('border-bottom', 'solid 4px #fbb03b');
                  }
                  }


                  
                  //Checks Network Connection
                  
                  function checkConnection() {
                  var networkState = navigator.connection.type;
                  
                  var states = {};
                  states[Connection.UNKNOWN] = 'Unknown connection';
                  states[Connection.ETHERNET] = 'Ethernet connection';
                  states[Connection.WIFI] = 'WiFi connection';
                  states[Connection.CELL_2G] = 'Cell 2G connection';
                  states[Connection.CELL_3G] = 'Cell 3G connection';
                  states[Connection.CELL_4G] = 'Cell 4G connection';
                  states[Connection.CELL] = 'Cell generic connection';
                  states[Connection.NONE] = 'No network connection';
                  
                  return states[networkState];
                  }
                  
                  //Successfully captured a picture. Replace existing icon with image taken
                  
                  function onSuccess(imageData) {
                 
                  qcImageData.push("data:image/jpeg;base64," + imageData);
//                  var i = new Image();
//                  i.onload = function(){
//                      qcImageData.push(i.width);
//                      qcImageData.push(i.height);
//                   };
//                  i.src = "data:image/jpeg;base64," + imageData;
//                  $("#qcPhoto").hide();
//                  var image = new Image();
//                  $("#qcPhoto").attr("src", "data:image/jpeg;base64," + imageData);
//                  $("#qcPhoto").width(90); // Units are assumed to be pixels
//                  $("#qcPhoto").height(90);
//                      $("#qcPhoto").show();
                  
                      if($("#notesMainTextArea").val()!=""){
                          $('#QCNotesMiddleDiv').css('background', '#0088c7');
                          $('.quick-capture-middle-span-notes').css('color', '#ffffff');
                      }else{
                          $('#QCNotesMiddleDiv').css('background', '#ffffff');
                          $('.quick-capture-middle-span-notes').css('color', '#808080');
                      }
                  //See if this works
                      
                      
                      var img = new Image();
                      img.onload = function(){
                          qcImageData.push(Math.round((img.width * 90)/img.height));
                          qcImageData.push(90);
                          
                          
                      };
                    img.src = "data:image/jpeg;base64,"+imageData;
                  //console.log("imageData"+imageData);
                  //console.log($("#qcPhoto").attr("src").filename());
//                  if ($("#qcPhoto").attr("src").toLowerCase().indexOf("icon_photo_large.png") != -1) {
//                  $('#QCPhotoMiddleDiv').css('background', '#ffffff');
//                  $('.quick-capture-middle-span-photo').css('color', '#808080');
//                  } else {
                  $('#QCPhotoMiddleDiv').css('background', '#0088c7');
                  $('.quick-capture-middle-span-photo').css('color', '#ffffff');
                  //}
                      window.plugins.spinnerDialog.hide();
                  }
                  
                  //Failed to capture picture. Shows alert!
                  
                  function onFail(message) {
                  window.plugins.spinnerDialog.hide();
                      $('#QCPhotoMiddleDiv').css('background', '#ffffff');
                      $('.quick-capture-middle-span-photo').css('color', '#808080');
                  showAlert("Picture failure: " + message);
                  //navigator.camera.cleanup(onCleanUpSuccess, onCleanUpFail);
                  }

                  function clearQCScreen(){
                       window.plugins.spinnerDialog.show();
                      //Remove selected criticality
                      $("#criticalityNavBar").find('a').each(function(i) {
                                                             $(this).removeClass('ui-btn-active');
                                                             $(this).removeClass('ui-btn-active ui-state-persist');
                                                             });
                      //Remove selected key
                      $("#keyNavBar").find('a').each(function(i) {
                                                     $(this).removeClass('ui-btn-active');
                                                     $(this).removeClass('ui-btn-active ui-state-persist');
                                                     });
                        qcImageData = [];//Remove all elements of array
                        $("#qcPhoto").attr("src", "assets/icon_photo_large.png");
                        $("#QCPhotoMiddleDiv").css("background", "#ffffff");
                        $("#notesMainTextArea").val("");
                        $("#QCNotesMiddleDiv").css("background", "#ffffff");
                        $("#locationDivCapture").css("background", "#ffffff");
                        $('.location-text-large').css('color', '#808080');
                        $('.quick-capture-middle-span-notes').css('color', '#808080');
                        $('.quick-capture-middle-span-photo').css('color', '#808080');

                        $("#searchLocations").val("");
                        window.plugins.spinnerDialog.hide();
                      
                    }

                    function showAlert(msg){
                        navigator.notification.alert(
                                                     msg,  // message
                                                     alertDismissed,         // callback
                                                     'Error',            // title
                                                     'Done'                  // buttonName
                                                     );
                        
                    }

                    function goToPickList(){
                        $.mobile.navigate("#pickList");
                        $("#CheckListTextAreaName").val("");
                        $("#CheckListTextAreaDescription").val("");
                        $("#staticQuestionsSections").html("");
                    }

                    function goToAddSection(){
                        $.mobile.navigate("#addSectionScreen");
                        $("#CheckListTextAreaName").val("");
                        $("#CheckListTextAreaDescription").val("");
                    }

                    function goToAddQuestion(){
                        
                        
                        if($("#multipleChoice").is("[disabled=disabled]")){
                            console.log("Am I here");
                            $("#multipleChoice").prop("disabled", false).checkboxradio("refresh");
                            $("#multipleChoice").prop("enabled", true).checkboxradio("refresh");
                            $("#multipleChoice").checkboxradio('enable').checkboxradio("refresh")
                        }
                        if ($("#multipleChoice").attr("checked")){
                            $("#multipleChoice").attr("checked", false);
                            $("#multipleChoice").prop("checked", false).checkboxradio("refresh");
                            }
                        
                        if ($("#yesNO").attr("checked")){
                            $("#yesNO").attr("checked", false);
                            $("#yesNO").prop("checked", false).checkboxradio("refresh");
                            
                        }
                        if($("#yesNO").is("[disabled=disabled]")){
                            
                            $("#yesNO").prop("disabled", false).checkboxradio("refresh");
                            $("#yesNO").prop("enabled", true).checkboxradio("refresh");
                            $("#yesNO").checkboxradio('enable').checkboxradio("refresh")
                        }
                        $.mobile.navigate("#editCheckListQuestion");
                        $("#CheckListTextAreaName").val("");
                        $("#CheckListTextAreaDescription").val("");
                    }

                    function goToReorderQuestions(){
                        populateQuestionsScreen("enable");
                        showQuestionDefaults();
                    }

                    function hideSpinner(){
                        window.plugins.spinnerDialog.hide();
                    }

                    function onConfirm(buttonIndex) {
                        if(buttonIndex==1){
                           deleteCheckList().done(goToPickList() );
                        }
                    }

                    function onConfirmSharePickList(buttonIndex) {
                        if(buttonIndex==1){
                            window.plugins.spinnerDialog.show();
                            createChecklistJSON(checkListId);
                        }
                    }

                    function onConfirmDeleteSharedPickList(buttonIndex) {
                        if(buttonIndex==1){
                            var id = $("#sharedPickListId").val();
                            var url = "https://webvan-dev.disney.com/wdpr/safedchecklite/DeletePickList?id="+id;
                            var jxhr = $.ajax({
                                              type : "POST",
                                              url : url
                                              
                                              }).done(function(data) {
                                                      // showAlert("Audit data saved successfully");
                                                      $.mobile.navigate("#pickList");
                                                      $("#staticSharedQuestionsAnswersDetails").html("");
                                                      $("#sharedChecklistDetailsName").html("");
                                                      $("#sharedChecklistDetailsDescription").val("");
                                                      $("#sharedPickListId").val("");
                                                      }).fail(function(jqXHR, textStatus) {
                                                              console.log(textStatus);
                                                              showAlert("Oops. Something went wrong. Please try again later.");
                                                              });
                        }
                    }


                    function onQuestionDeleteConfirm(buttonIndex){
                        if(buttonIndex==1){
                            deleteQuestion();
                        }
                    }

                    function onSectionDeleteConfirm(buttonIndex){
                        if(buttonIndex==1){
                            deleteSection();
                        }
                    }

                    function onConfirmCopyPickList(buttonIndex){
                        if(buttonIndex==1){
                            copySharedPickListToLocal();
                        }
                    }


                    function onQuestionConfirm(buttonIndex){
                        if(buttonIndex==1){
                            window.plugins.spinnerDialog.hide();
                            showSelectedCheckList(checkListId);
                            $("#CheckListTextAreaQuestion").val("");
                            $("#checkListTextAreaSubQuestion").val("");
                            showQuestionDefaults();
                        }else{
                            window.plugins.spinnerDialog.hide();
                        }
                    }

                    function onAuditDeleteConfirm(buttonIndex){
                        if(buttonIndex==1){
                            deleteAudit();
                        }
                    }

                    function gotoSelectedQuestion(){
                        showSelectedQuestion(questionIdSelected);
                        $("#selectResponse").val("none");
                        $("#selectResponse").selectedIndex = 0;
                        $(" #selectResponse ").selectmenu("refresh", true);
                        window.plugins.spinnerDialog.hide();
                    }

                    function checkUserNameLOBEmpty(){
                        if ($("#storedName").val() == "" || $("#storedLOB").val()=="") {
                            return false;
                        }else{
                            localStorage.setItem("storedName",$("#storedName").val());
                            localStorage.setItem("storedLOB",$("#storedLOB").val());
                            return true;
                        }
                    }

                    function  checkUserNameLOBExists(){
                        if (localStorage.getItem("storedName") != null) {
                            $("#storedName").val(localStorage.getItem("storedName"));
                            $("#storedLOB").val(localStorage.getItem("storedLOB"));
                        }
                    }

                    function completeSubQuestion(){
                        window.plugins.spinnerDialog.hide();
                      
                        showSelectedQuestion(questionIdSelected);
                       
                    }



                    function showQuestionDefaults(){
                        //$("#yesNO").checkboxradio('enable');
                        //$("#multipleChoice").checkboxradio('enable');
                        //$("input[type='radio']").checkboxradio("refresh");
                        $("#linkedSubQuestion").css("display","none");

                        $("#CheckListTextAreaQuestion").val("");
                        $("#questionPhotoDiv").css("background","#ffffff");
                        $("#question-photo-text").css("color","#808080");
                        $("#question-photo-value").val("inactive");
                        
                        $("#questionNotesDiv").css('background','#ffffff');
                        $("#question-notes-text").css('color','#808080');
                        $("#question-notes-value").val("inactive");
                        
                        $("#CAYes").attr("class","corrective-action-yes-no");
                        $("#CANo").attr("class","corrective-action-yes-no");
                        $("#CANA").attr("class","corrective-action-yes-no");
                        
                        
                        $( "#answerTable tr:nth-child(1) td:nth-child(2)" ).attr("class","corrective-action-style");
                        $( "#answerTable tr:nth-child(2) td:nth-child(2)" ).attr("class","corrective-action-style");
                        $( "#answerTable tr:nth-child(3) td:nth-child(2)" ).attr("class","corrective-action-style");
                        $( "#answerTable tr:nth-child(4) td:nth-child(2)" ).attr("class","corrective-action-style");
                        $( "#answerTable tr:nth-child(5) td:nth-child(2)" ).attr("class","corrective-action-style");
                        
                        $( "#answerTable tr:nth-child(1) td:nth-child(1)" ).text("Answer1");
                        $( "#answerTable tr:nth-child(2) td:nth-child(1)" ).text("Answer2");
                        $( "#answerTable tr:nth-child(3) td:nth-child(1)" ).text("Answer3");
                        $( "#answerTable tr:nth-child(4) td:nth-child(1)" ).text("Answer4");
                        $( "#answerTable tr:nth-child(5) td:nth-child(1)" ).text("Answer5");
                    }

                    function showSubQuestionDefaults(){
                        //$("#yesNO").checkboxradio('enable');
                        //$("#multipleChoice").checkboxradio('enable');
                        //$("input[type='radio']").checkboxradio("refresh");
                        $("#linkedSubQuestion").css("display","none");
    
                        $("#CheckListTextAreaSubQuestion").val("");
                        $("#questionPhotoDivSub").css("background","#ffffff");
                        $("#question-photo-text-sub").css("color","#808080");
                        $("#question-photo-value-sub").val("inactive");
    
                        $("#questionNotesDivSub").css('background','#ffffff');
                        $("#question-notes-text-sub").css('color','#808080');
                        $("#question-notes-value-sub").val("inactive");
    
                        $("#CAYesSub").attr("class","corrective-action-yes-no");
                        $("#CANoSub").attr("class","corrective-action-yes-no");
                        $("#CANASub").attr("class","corrective-action-yes-no");
    
    
                        $( "#answerTableSub tr:nth-child(1) td:nth-child(2)" ).attr("class","corrective-action-style");
                        $( "#answerTableSub tr:nth-child(2) td:nth-child(2)" ).attr("class","corrective-action-style");
                        $( "#answerTableSub tr:nth-child(3) td:nth-child(2)" ).attr("class","corrective-action-style");
                        $( "#answerTableSub tr:nth-child(4) td:nth-child(2)" ).attr("class","corrective-action-style");
                        $( "#answerTableSub tr:nth-child(5) td:nth-child(2)" ).attr("class","corrective-action-style");
    
                        $( "#answerTableSub tr:nth-child(1) td:nth-child(1)" ).text("Answer1");
                        $( "#answerTableSub tr:nth-child(2) td:nth-child(1)" ).text("Answer2");
                        $( "#answerTableSub tr:nth-child(3) td:nth-child(1)" ).text("Answer3");
                        $( "#answerTableSub tr:nth-child(4) td:nth-child(1)" ).text("Answer4");
                        $( "#answerTableSub tr:nth-child(5) td:nth-child(1)" ).text("Answer5");
                    }


