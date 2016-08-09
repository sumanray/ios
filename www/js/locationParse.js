var locationArray = [];
var uniqueIDArray = [];
var tempArray = [];
var firstPassArray = [];

function parseLocationData(){
    if(!checkIfLocationKeysExist()){
        locationArray = [];
        uniqueIDArray = [];
        parseSegments().done( parseSites().done(parseGates().done(parseAreas().done(parseAssets()))) );
    }else{
      //  populateSearchAutoComplete(localStorage.getItem("locationNames"),"local");
        localParse().done(populateSearchAutoComplete(tempArray));
    }
}

var localParse = function(){
    var r = $.Deferred();
    var splitArray = localStorage.getItem("locationNames").split(",");
    for(var i=0; i<splitArray.length; i++){
        tempArray.push (unescape(splitArray[i]));
    }
    return r;
};

function checkIfLocationKeysExist(){
    if (localStorage.getItem("locationNames") === null || localStorage.getItem("locationNames").length === 0) {
        return false;
    }else{
        return true;
    }

}


var parseSegments = function() {
    var r = $.Deferred();
//    $.getJSON('JSONDataDump/segments.json', function(data) {
//              for (var i = 0, len = data.length; i < len; i++) {
//              locationArray.push(escape( data[i].segment.name));
//              uniqueIDArray.push(data[i].segment.unique_id);
//              }
//    });
    
   return r;
    
};

var parseSites = function() {
    var r = $.Deferred();
    $.getJSON('JSONDataDump/sites.json', function(data) {
              for (var i = 0, len = data.length; i < len; i++) {
              locationArray.push(escape(data[i].site.name + " | " + data[i].site.segment.name));
              firstPassArray.push(data[i].site.name + " | " + data[i].site.segment.name);
              uniqueIDArray.push(data[i].site.unique_id);
              }
    });
   
    return r;
};

var parseGates = function() {
    var r = $.Deferred();
    $.getJSON('JSONDataDump/gates.json', function(data) {
              for (var i = 0, len = data.length; i < len; i++) {
              locationArray.push(escape(data[i].gate.name + " | " + data[i].gate.site.name + " | " + data[i].gate.segment.name));
              firstPassArray.push(data[i].gate.name + " | " + data[i].gate.site.name + " | " + data[i].gate.segment.name);
              uniqueIDArray.push(data[i].gate.unique_id);
              }
    });
    
    return r;
};

var parseAreas = function() {
    var r = $.Deferred();
//    $.getJSON('JSONDataDump/areas.json', function(data) {
//              for (var i = 0, len = data.length; i < len; i++) {
//              locationArray.push(escape(data[i].area.name + " | " + data[i].area.gate.name + " | " + data[i].area.site.name + " | " + data[i].area.segment.name));
//              uniqueIDArray.push(data[i].area.unique_id);
//              }
//              });
//    
    return r;
};

var parseAssets = function() {
    var r = $.Deferred();
    $.getJSON('JSONDataDump/assets.json', function(data) {
              for (var i = 0, len = data.length; i < len; i++) {
              locationArray.push(escape(data[i].asset.name + " | "  +data[i].asset.gate.name + " | " + data[i].asset.site.name));
              firstPassArray.push(data[i].asset.name + " | "  +data[i].asset.gate.name + " | " + data[i].asset.site.name);
              uniqueIDArray.push(data[i].asset.unique_id);
              }
              }).done(function(){
           localStorage.setItem("locationNames",locationArray);
           localStorage.setItem("locationUID",uniqueIDArray);
           window.plugins.spinnerDialog.hide();
           populateSearchAutoComplete(firstPassArray);
    });

    return r;
};

function populateSearchAutoComplete(arr){
   
    
//    var splitType;
//    if(type=="local"){
//         splitType = arr.split(",");
//    }else{
//        splitType = arr;
//    }
    $("#searchLocations").autocomplete({
                                       open: function(event, ui) {
                                       $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');
                                       },
                                       appendTo: "#searchLocationResults",
                                       source: function(request, response) {
                                       var results = $.ui.autocomplete.filter(arr, request.term);
                                       
                                       response(results.slice(0, 100));
                                       },
                                       messages: {
                                       noResults: '',
                                       results: function() {}
                                       },
                                       minLength: 2,
                                       delay: 900,
                                       max: 5,
                                       search: function () {
                                       $("#recentLocationsDiv").css("display","none");
                                       document.activeElement.blur();
                                       window.plugins.spinnerDialog.show();
                                       },
                                       response: function () {
                                       $("#recentLocationsDiv").css("display","none");
                                       document.activeElement.blur();

                                       window.plugins.spinnerDialog.hide();
                                       },
                                       select: function (event, ui) { }
                                       }).focus(function(){
                                                
                                                if($(this).val()==""){
                                                $("#recentLocationsDiv").css("display","block");
                                                }
                                });
    populateRecentLocations();
    
        }

function populateRecentLocations(){
     if (localStorage.getItem("recentLocationsKey") != null) {
         console.log(localStorage.getItem("recentLocationsKey"));
    var recentLocationsArray = localStorage.getItem("recentLocationsKey").split(",");
         $(".recent-locations-data").empty();
         for(var i=recentLocationsArray.length-1;i>=0;i--){
        if(i%2==0){
            $(".recent-locations-data").append("<div onclick='selectRecent(this)' class='recent-location-odd-div-class'>"+unescape(recentLocationsArray[i])+"</div>");
        }else{
            $(".recent-locations-data").append("<div onclick='selectRecent(this)' class='recent-location-even-div-class'>"+unescape(recentLocationsArray[i])+"</div>");
            }
        }
     }
     window.plugins.spinnerDialog.hide();
}

function selectRecent(obj){
        $("#searchLocations").val($(obj).text());
}

