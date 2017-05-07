var socket = io();
var _r = 0, _g = 0, _b = 0;

//var availUsers ={"first_user":"avail", "sec_user":"avail"};
var myuser_id= "";

var syncInputVal = function(msg){

  $.each(msg,function(key,value){
    window["_" + key] = value;
    $("input[data-id='"+key+"']").val(value);
    console.log(key,value);
  });

}

socket.on('sent_init_signal', function(msg){

  document.getElementById('messages').textContent += msg.sent_init_signal + '\n';
    console.log("socket io sent_init_signal: ");
});

socket.on('sent_second_recieving', function(msg){

  document.getElementById('messages').textContent += msg.sent_second_recieving + '\n';
    console.log("sent_second_recieving: "+ msg.sent_second_recieving);

      if(myuser_id=="first_user"){
            document.getElementById('otherId').value = msg.sent_second_recieving;
      }

});

socket.on('sent_init_signal', function(msg){

  document.getElementById('messages').textContent += msg.sent_init_signal + '\n';
    console.log("socket io sent_init_signal: ");
});

socket.on('updatechat', function(username, data){
  document.getElementById('messages').textContent += username+": "+ data + '\n';
});

socket.on('adduser', function(username){

if(myuser_id==""){

  myuser_id = username;

  console.log("myuser_id: "+ myuser_id);
}

});

$(function(){

  socket.emit('get_avail_username');
/*
  if(availUsers["first_user"]=="avail"){
       myuser_id="first_user";
       availUsers["first_user"]="false";
    socket.emit('adduser', "first_user");

    console.log("myuser_id:"+myuser_id);
  }else if(availUsers["sec_user"]=="avail"){

    myuser_id="sec_user";
    availUsers["sec_user"]="false";
  socket.emit('adduser', "sec_user");
  console.log("myuser_id:"+myuser_id);
  }else{
        myuser_id ="morethan3";
  socket.emit('adduser', "morethan3");
  console.log("myuser_id:"+myuser_id);

  }
*/
  var changeRGB = function(){

    //console.log(color);
    socket.emit('sent_init_signal', "get available usernames");
  };
/*
  $("input[type=range]").on('change',function(){
    var theId = $(this).data('id');
    window["_" + theId] = $(this).val();
    changeRGB();
  });
*/
//  changeRGB();
});

//text

$("#login_text").on('input', function() {
      loginSumit();
});

function loginSumit(){

      var textlogin = $("#login_text").val();

         // alert("login:"+ textlogin);

           var texter = { logintext: textlogin};

          socket.emit('logintext', texter);

}//loginSumig
