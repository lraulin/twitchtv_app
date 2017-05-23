$(document).ready(function() {
  var following = [];
  // Free Code Camp stream info and status API call
  $.ajax({
    type: "GET",
    url: "https://api.twitch.tv/kraken/users/freecodecamp",
    headers: {
      'Client-ID': '135bqazcj0nwnhh9ir0re0v3pj0ami'
    },
    success: function(data1) {
      if(data1.stream===null) {
        $('#fccStatus').html("Free Code Camp is currently OFFLINE!");
      } else {
        $('#fccStatus').html("Free Code Camp is currently ONLINE!");
      }
    }
  });

  $.ajax({
    type: "GET",
    url: "https://api.twitch.tv/kraken/users/freecodecamp/follows/channels/",
    headers: {
      'Client-ID': '135bqazcj0nwnhh9ir0re0v3pj0ami'
    },
    success: function(data2) {
      console.log(data2);
      for (var i=0; i<data2.follows.length; i++) {
        var displayName = data2.follows[i].channel.display_name;
        var logo = data2.follows[i].channel.logo;
        var status = data2.follows[i].channel.status;
        var channelURL = data2.follows[i].channel.url;
        if (logo===null) {
          logo = "http://web.vmc3.com/projects/bufs/branch/marines/logos/NoLogo.jpg";
        }
        if (data2.follows[i].channel.stream === undefined) {
          status = "Offline"
        }
        $("#followerInfo").prepend("<div class='row'>" + "<div class='col-md-4'>"
        + "<img src='" + logo + "'>"
        + "</div>" + "<div class='col-md-4 displayName'><a href='" + channelURL + "'>"+ displayName + "</a></div>" + "<div class='col-md-4'>"
        + status + "</div></div>");
      }
	}
  });

  var deletedFollowers = ['brunofin', 'comster404'];
  for (var i=0; i<deletedFollowers; i++) {
  	$.ajax({
  	  type: "GET",
  	  url: "https://api.twitch.tv/kraken/streams/" + following[i],
  	  headers: {
  		'Client-ID': '135bqazcj0nwnhh9ir0re0v3pj0ami'
  	  },
  	  error: function(data3) {
  		  var logo = "http://web.vmc3.com/projects/bufs/branch/marines/logos/NoLogo.jpg";
  		  var displayName = data3.statusText;
  		  var status = data3.status;

  		  $("#followerInfo").prepend("<div class='row'>" + "<div class='col-md-4'>"
  		  + "<img src='" + logo + "'>"
  		  + "</div>" + "<div class='col-md-4'>" + displayName + "</div>" + "<div class='col-md-4'>"
  		  + status + "</div></div>");
      }
    });
  }
});
