var defaultData = [ {
	"Month" : "January",
	"Goal" : 4000,
	"Actual" : 1233
}, {
	"Month" : "February",
	"Goal" : 5000,
	"Actual" : 5613
}, {
	"Month" : "March",
	"Goal" : 5000,
	"Actual" : 4302
}, {
	"Month" : "April",
	"Goal" : 6000,
	"Actual" : 7230
} ];

var chartSample = {
	displayBarChart : function(id, plotData) {
		$.jqplot(id, plotData.seriesData, {
			
	        seriesDefaults:{
	            renderer:$.jqplot.BarRenderer,
	            pointLabels: { show: true }
	        },
	        series:[
	                {label:'Goal'},
	                {label:'Actual'}
	            ],
	        legend: {
	            show: true,
	            placement: 'outsideGrid'
	        },
	        axes: {
	            xaxis: {
	                renderer: $.jqplot.CategoryAxisRenderer,
	                ticks: plotData.seriesLabels
	            },
	            yaxis: {
	                tickOptions: {formatString: "$%'i"}
	            }
  	  		}
		});
	},
	// Get data into the required format, then display the chart
	displayChart: function(id, data) {
		// console.log("data: " + JSON.stringify(data));
		var series1 = [];
		var series2 = [];
		var labels = [];
		// Get the data into the format jqPlot wants it:
		for (var i = 0; i < data.length; i++) {
			series1.push(parseFloat(data[i].Goal));
			series2.push(parseFloat(data[i].Actual));
			labels.push(data[i].Month);
		}
		var plotSettings = {
				seriesData: [series1, series2],
				seriesLabels: labels
		};
		// console.log("plotSettings: " + JSON.stringify(plotSettings));
		chartSample.displayBarChart(id, plotSettings);
	}
};

$(document).ready(function() {
	chartSample.displayChart('ChartDiv', defaultData);
});
