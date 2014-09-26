$(document).on("pageinit", "#searchPage", function(event) {
  $('#searchTxt').keyup(function()
  {
    //alert ("Key Press");
    if ($('#searchTxt').val().length >= 3)
    {
      doSearch();
    }
  });
});

$('a').on('click', function() {
  localStorage.currentURL = this.href;
});


function doSearch()
{
  var searchTxt = document.forms['searchBox'].elements['searchTxt'].value;
  $('#searchResult').html("");
  //alert (url);
  $.ajax
          ({
            type: "POST",
            url: "http://" + localStorage.url + "/HR/prodSearch_ajax.php",
            cache: false,
            data: {'request': 'searchTxt', 'searchTxt': searchTxt},
            dataType: 'json',
            async: false,
            success: function(data)
            {
              $('#errMsg').html(data.errMsg);
              //$('#searchResult').html(data.resultStr);
              var outputStr = '';
              if (data.resultData != null)
              {
                var dataArray = data.resultData;
                outputStr = '<table id="tab1">';
                for (var i = 0; i < dataArray.length; i++)
                {
                  outputStr = outputStr +
                          "<tr><td>" + dataArray[i].prodCode + "&nbsp;" + dataArray[i].prodDesc + "</td></tr>";

                }
                outputStr = outputStr + "</table>";
                $('#searchResult').html(outputStr);
              }
            }
          });
}


function getProd(prodCode)
{
  //alert ('Loading page');

  //alert (url);
  $.ajax
          ({
            type: "POST",
            url: "http://" + localStorage.url + "HR/prodSearch_ajax.php",
            cache: false,
            data: {'request': 'getProd', 'prodCode': prodCode},
            dataType: 'json',
            async: false,
            success: function(data)
            {
              $('#errMsg').html(data.errMsg);
              //$('#searchResult').html(data.resultStr);
              var outputStr = '';
              if (data.resultData != null)
              {
                var dataArray = data.resultData;
//                    outputStr = '<ul>';
//                    for (var i = 0; i < dataArray.length; i++)
//                    {
//                      outputStr = outputStr + "<li>" + dataArray[i].prodCode + "</li><li>" + dataArray[i].prodDesc + "</li><li>" + dataArray[i].vol + "</li><li>" + dataArray[i].weight + "</li><li>" + dataArray[i].calorie + "</li><li>" + dataArray[i].sugar + "</li><li>" + dataArray[i].fat + "</li><li>" + dataArray[i].barCode + "</li><li>" + dataArray[i].cost + "</li><li>" + dataArray[i].price + "</li><li>" + dataArray[i].currency + "</li><li>" + dataArray[i].partType + "</li>";
//
//                    }
//                    outputStr = outputStr + "</ul>";
                $('#prodCode').html(dataArray[0].prodCode + "&nbsp;" + "-" + "&nbsp;");
                $('#prodDesc').html(dataArray[0].prodDesc);
                $('#vol').val(dataArray[0].vol);
                $('#weight').val(dataArray[0].weight);
                $('#calorie').val(dataArray[0].calorie);
                $('#sugar').val(dataArray[0].sugar);
                $('#fat').val(dataArray[0].fat);
                $('#cost').val(dataArray[0].cost);
                $('#price').val(dataArray[0].price);
                $('#currency').val(dataArray[0].currency);
                $('#partType').val(dataArray[0].partType);
                $('#title').html(dataArray[0].title);
              }
            }
          });
}

$(document).on("pageinit", "#prodMaintPage", function(event) {
  getProd('MONKHA');
});