// Initialize your app
var myApp = new Framework7();
// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

//getDataf7();http://localhost/appservidor/users.phphttp://localhost/appservidor/users.phphttp://localhost/appservidor/users.php

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});

getDataf7();


function get_products_details(params) {
  //myApp.alert(params, 'ID PRODUDTO');
  mainView.router.loadPage('about.html');
}


function getDataf7() {
  var html ='';
  var i;
  //myApp.alert ('Getting Data from server', 'Analises de Dados');

  $$.ajax({
    //url:'https://appsevidor.herokuapp.com/users.php',
    url:'http://localhost/appservidor/users.php',
    type:'GET',
    dataType:'json',
    // beforeSend:function(){
    // myApp.showPreloader('Please Wait');
    // },
    success:function(data){
        //console.log(data[0].fullname);

        $$('.content-block-title').html('SERVICOS ACTIVOS');
        html+='  <div class="list-block"><ul>';

        for(i=0; i< data.length; i++){
          html+=' <li onclick="get_products_details(this.value)" value="'+data[i].id+'" class="list_products"><a href="#" class="item-link item-content">';
         
          html+='<div class="item-media"><img src="img/stock.png" width="60" height="50"></div>';
          html+='<div class="item-inner">';
          html+='<div class="item-title">'+data[i].details +'</div>';
          html+='<div class="item-after"><span class="badge">'+ data[i].preco +',00</span></div>';

          html+='</div></a></li>';
        }

        html+='</ul></div>';
          $$('.results').html(html);
    }

})
}

// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}

var mySwiper = myApp.swiper('.swiper-container', {
  pagination: '.swiper-pagination',
  paginationHide: false,
  paginationClickable: true,
  nextButton: '.swiper-button-next',
  prevButton: '.swiper-button-prev',
}); 


var autocompleteStandaloneAjax = myApp.autocomplete({
  openIn: 'page', //open in page
  opener: $$('#autocomplete-standalone-ajax'), //link that opens autocomplete
  multiple: true, //allow multiple values
  valueProperty: 'id', //object's "value" property name
  textProperty: 'name', //object's "text" property name
  limit: 50,
  preloader: true, //enable preloader
  source: function (autocomplete, query, render) {
      var results = [];
      if (query.length === 0) {
          render(results);
          return;
      }
      // Show Preloader
      autocomplete.showPreloader();
      // Do Ajax request to Autocomplete data
      $$.ajax({
          url: 'autocomplete-languages.json',
          method: 'GET',
          dataType: 'json',
          //send "query" to server. Useful in case you generate response dynamically
          data: {
              query: query
          },
          success: function (data) {
              // Find matched items
              for (var i = 0; i < data.length; i++) {
                  if (data[i].name.toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(data[i]);
              }
              // Hide Preoloader
              autocomplete.hidePreloader();
              // Render items by passing array with result items
              render(results);
          }
      });
  },
  onChange: function (autocomplete, value) {
      var itemText = [],
          inputValue = [];
      for (var i = 0; i < value.length; i++) {
          itemText.push(value[i].name);
          inputValue.push(value[i].id);
      }
      // Add item text value to item-after
      $$('#autocomplete-standalone-ajax').find('.item-after').text(itemText.join(', '));
      // Add item value to input value
      $$('#autocomplete-standalone-ajax').find('input').val(inputValue.join(', '));
  }
});
