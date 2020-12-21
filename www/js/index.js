/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready

// Initialize your app
var myApp = new Framework7();
// Export selectors engine
var $$ = Dom7;

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
  var html ='';
  var i;

  $$.ajax({
    url:'http://localhost/zonatech/users.php',
    //data:{'json_order':1},
    type:'GET',
    dataType:'json',
    // beforeSend:function(){
    // myApp.showPreloader('Please Wait');
    // },
    success:function(data){
        //myApp.alert(data[0].fullname);

        $$('.content-block-title').html('SERVICOS ACTIVOS');
        html+='  <div class="list-block"><ul>';

        for(i=0; i< data.length; i++){
          html+='<li><a href="about.html" class="item-link">';
          html+='<div class="item-content"><div class="item-inner">';
          html+='<div class="item-title">'+ data[i].fullname +'</div></div></div></a></li>';
        }
      html+='</ul></div>';
          $$('.results').html(html);
    }
  });
}
