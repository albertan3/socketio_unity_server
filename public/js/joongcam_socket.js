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
      }//if

      if(myuser_id == "sec_user" || myuser_id == "morethan3"){

        socket.emit('get_firstUserRTC_data',"get_firstUserRTC_data");
      }

});

$(function(){

  socket.emit('get_avail_username');


});

socket.on('get_firstUserRTC_data', function(data){
    document.getElementById('otherId').value = data;

});

//text

//if my id is second get first persons data

//if first person send data

$("#login_text").on('input', function() {
      loginSumit();
});

function loginSumit(){

      var textlogin = $("#login_text").val();

         // alert("login:"+ textlogin);

           var texter = { logintext: textlogin};

          socket.emit('logintext', texter);

}//loginSumig
