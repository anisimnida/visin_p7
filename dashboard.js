google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(getSpreadsheetData);

function getSpreadsheetData() {
  var spreadsheetId = '1kh865J7uGpI_FglAOGmOFKGGZatCn6Cc5oi-0l_0vgE';

  // Penjualan dalam setahun (grafik batang)
  var range1 = 'TS!A1:B13';
  var query1 = new google.visualization.Query('https://docs.google.com/spreadsheets/d/' + spreadsheetId + '/gviz/tq?range=' + range1);
  query1.send(function (response) {
    handleQueryResponse(response, 'chart1', 'Penjualan dalam setahun', 'column');
  });

  // Pendapatan dalam setahun (grafik garis)
  var range2 = 'TS!E1:F13';
  var query2 = new google.visualization.Query('https://docs.google.com/spreadsheets/d/' + spreadsheetId + '/gviz/tq?range=' + range2);
  query2.send(function (response) {
    handleQueryResponse(response, 'chart2', 'Pendapatan dalam setahun', 'line');
  });

  // Penjualan berdasarkan kategori produk (grafik lingkaran)
  var range3 = 'TS!A16:B20';
  var query3 = new google.visualization.Query('https://docs.google.com/spreadsheets/d/' + spreadsheetId + '/gviz/tq?range=' + range3);
  query3.send(function (response) {
    handleQueryResponse(response, 'chart3', 'Penjualan berdasarkan kategori produk', 'pie');
  });

  // Total penjualan (tampilan angka)
  var range4 = 'TS!C14';
  var query4 = new google.visualization.Query('https://docs.google.com/spreadsheets/d/' + spreadsheetId + '/gviz/tq?range=' + range4);
  query4.send(function (response) {
    handleQueryResponse(response, 'chart4', 'Total Penjualan', 'number');
  });
}

function handleQueryResponse(response, chartId, chartTitle, chartType) {
  if (response.isError()) {
    console.error('Error: ' + response.getMessage());
    return;
  }

  var data = response.getDataTable();
  var options = {
    title: chartTitle,
    width: 400,
    height: 300
  };

  var chart;

  switch (chartType) {
    case 'column':
      chart = new google.visualization.ColumnChart(document.getElementById(chartId));
      break;
    case 'line':
      chart = new google.visualization.LineChart(document.getElementById(chartId));
      break;
    case 'pie':
      chart = new google.visualization.PieChart(document.getElementById(chartId));
      break;
    case 'number':
      chart = new google.visualization.NumberFormat(document.getElementById(chartId));
      options = {
        prefix: 'Rp',
        decimalSymbol: ',',
        groupingSymbol: '.',
        fractionDigits: 2
      };
      break;
    default:
      console.error('Invalid chart type');
      return;
  }

  chart.draw(data, options);
}
