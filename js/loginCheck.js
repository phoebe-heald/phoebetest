//$(document).on("pageshow", "#indexPage", function(event) {
//
//  if (localStorage.url.length == 0)
//  {
//    alert("You have no URL set. If you are not redirected to your settings, please go to settings.");
//    $.mobile.changePage('settings.html');
//  }
//});

function doLogout()
{
  if (confirm('Are you sure you want to log out?'))
  {
    $.mobile.changePage('index.html');
  }
}


$(document).on("pageshow", "#settingsPage", function(event) {
  //alert(localStorage.url);
  localStorage.currentURL = "settings.html";
  $('#URL').val(localStorage.url);
});

$(document).on("pageshow", "#menuPage", function(event) {
  //alert(localStorage.url);
  localStorage.currentURL = "menu.html";
  //alert ("Saving URL" + this.href);
});


$('a').on('click', function() {
  //alert (localStorage.currentURL);
  localStorage.currentURL = this.href;
});


function saveSettings()
{
  //alert ("Here");
  if (typeof(Storage) == "undefined")
  {
    //no storage available
    alert("Sorry, your device does not support storage.");
    return;
  }
  else
  {
    var url = $('#URL').val();
    localStorage.url = url;
    $.mobile.changePage('index.html', {transition: "pop"});
  }
}

$(document).keypress(function(e) {
    if(e.which == 13) {
      doValidate();
    }
});


function doValidate()
{
  var userId = document.forms['myForm'].elements['login'].value;
  var errFlg = false;
  userId = jQuery.trim(userId);
  if (userId.length === 0)
  {
    alert('Please enter your User ID');
    errFlg = true;
  }
  var password = document.forms['myForm'].elements['password'].value;
  password = jQuery.trim(password);
  if (password.length === 0)
  {
    alert('Please enter your password');
    errFlg = true;
  }

  if (errFlg === false)
  {
    //document.forms['myForm'].submit();
    var url = localStorage.url;
    //alert(url);
    $.ajax({
      url: 'http://' + localStorage.url + '/HR/login_ajax.php',
      cache: false,
      data: {'request': 'CHECKUSER', 'login': userId, 'password': password},
      dataType: 'json',
      success: function(data)
      {
        if (data.loginOk == true)
        {
          sessionStorage.userId = userId;
          //get todays date ^ ^
          $.mobile.changePage("menu.html", {transition: "slideup"});
        }
        else
        {
          alert('You have entered an incorrect user ID or password. Please try again.');
        }
      }
    });

  }

}