//Modify below to consume the REST Service
//This code consumes the data from DB2
function getInventorySaledb2() {
            var dtaobj = new Array();
            var labels  = new Array();
            var data_elec = new Array();
            var data_digi = new Array();
        //Re-usable code for REST Consume    
        var i = 0;
        $.ajax({
        //URL for REST API
         url: "//e5.23.5177.ip4.static.sl-reverse.com:9443/.RestAPI/rest/sales/report",
         type: "GET",
         dataType: "json",
         contentType: "application/json"
            })
         .done(function (data) {
           //Iterate the data
          $.each(data.sales, function(index, value) {
        //Get the values assigned to the Array
                    labels[i] = value.mon;
                    data_elec[i] = value.elec_Sale;
                    data_digi[i] = value.digi_Sale;
                    i++;
                    });
            dtaobj = [labels, data_elec, data_digi];
            
            //Pass values to the chart
            salesChart(dtaobj);       
            
});
}

function getInventorySaleNoSql() {
            var dtaobj = new Array();
            var labels  = new Array();
            var data_elec = new Array();
            var data_digi = new Array();
        //Re-usable code for REST Consume    
        var i = 0;
        $.ajax({
        //URL for REST API
         url: "https://jeez07z.cloudant.com/autosales/inventorysales/",
         type: "GET",
         headers: {
                'Authorization': "Basic amVlejA3ejpTdWoyMjQ2Mzc="
        },
         xhrFields: {
              "withCredentials": "true"
           },
         dataType: "json",
         contentType: "application/json"
            })
         .done(function (data) {
           //Iterate the data
        $.each(data.sales, function(index, value) {
        //Get the values assigned to the Array
                    labels[i] = index;
                    data_elec[i] = value.elec_Sale;
                    data_digi[i] = value.digi_Sale;
                    i++;
                    });
            dtaobj = [labels, data_elec, data_digi];
            
            //Pass values to the chart
            salesChart(dtaobj);
            
});
}

//Goals
function getGoals() {
            var goalType  = new Array();
            var completed = new Array();
            var totalGoals = new Array();
            var color;
        //Re-usable code for REST Consume    
        var i = 0;
        $.ajax({
        //URL for REST API
         url: "https://jeez07z.cloudant.com/goals/status/",
         type: "GET",
         dataType: "json",
         contentType: "application/json"
            })
         .done(function (data) {
           //Iterate the data
          $.each(data.goals, function(index, value) {
        //Get the values assigned to the Array
                    goalType[i] = value.goal_type;
                    completed[i] = value.completed;
                    totalGoals[i] = value.total;
                    
                    if(  ((completed[i]/totalGoals[i]) * 100) <= 80 && ((completed[i]/totalGoals[i]) * 100) > 60 )
                    color = "yellow"
                    if(  ((completed[i]/totalGoals[i]) * 100) <= 60 && ((completed[i]/totalGoals[i]) * 100) > 40 )
                    color = "aqua"
                    if(  ((completed[i]/totalGoals[i]) * 100) <= 40 )
                    color = "red"
                    if(  ((completed[i]/totalGoals[i]) * 100) > 80 )
                    color = "green"

                    $("#goals").append("<div class='progress-group'><span class='progress-text'>"+goalType[i]+"</span><span class='progress-number'><b>"+completed[i]+"</b>/"+totalGoals[i]+"</span><div class='progress sm'><div class='progress-bar progress-bar-"+color+"' style='width: "+((completed[i]/totalGoals[i]) * 100)+"%'></div></div>");
                    i++;
                    });
});
}



