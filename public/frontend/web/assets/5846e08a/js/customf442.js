$(document).ready(function(){

// smooth state
$(function(){
  'use strict';
  var $page = $('body'),
      options = {
        debug: true,
        prefetch: true,
        cacheLength: 2,
        onStart: {
          duration: 250, // Duration of our animation
          render: function ($container) {
            // Add your CSS animation reversing class
            $container.addClass('is-exiting');
            // Restart your animation
            smoothState.restartCSSAnimations();
          }
        },
        onReady: {
          duration: 0,
          render: function ($container, $newContent) {
            // Remove your CSS animation reversing class
            $container.removeClass('is-exiting');
            // Inject the new content
            $container.html($newContent);
          }
        }
      },
      smoothState = $page.smoothState(options).data('smoothState');
});

 $('[data-toggle="popover"]').popover();
 $('[data-toggle="tooltip"]').tooltip();

$(window).scroll(function() {    
    var scroll = $(window).scrollTop();
    if (scroll >= 2) {
        $("header").addClass("white");
    } else {
    $("header").removeClass("white");
      }
});
$('.modal').on('hidden.bs.modal', function (e) {
    if($('.modal').hasClass('show')) {
    $('body').addClass('modal-open');
    }    
});
 // $("body").removeClass("modal-open");
// scroll nav

// word limit
$(document).ready(function(){
    var maxLength = 70;
    $(".show-read-more").each(function(){
        var myStr = $(this).text();
        if($.trim(myStr).length > maxLength){
            var newStr = myStr.substring(0, maxLength);
            var removedStr = myStr.substring(maxLength, $.trim(myStr).length);
            $(this).empty().html(newStr);
            $(this).append(' <a href="javascript:void(0);" class="read-more">read more...</a>');
            $(this).append('<span class="more-text">' + removedStr + '</span>');
        }
    });
    $(".read-more").click(function(){
        $(this).siblings(".more-text").contents().unwrap();
        $(this).remove();
    });
});






// sticky side
//Sticky Sidebar
(function(){var c,f;c=this.jQuery||window.jQuery;f=c(window);c.fn.stick_in_parent=function(b){var A,w,B,n,p,J,k,E,t,K,q,L;null==b&&(b={});t=b.sticky_class;B=b.inner_scrolling;E=b.recalc_every;k=b.parent;p=b.offset_top;n=b.spacer;w=b.bottoming;null==p&&(p=0);null==k&&(k=void 0);null==B&&(B=!0);null==t&&(t="is_stuck");A=c(document);null==w&&(w=!0);J=function(a){var b;return window.getComputedStyle?(a=window.getComputedStyle(a[0]),b=parseFloat(a.getPropertyValue("width"))+parseFloat(a.getPropertyValue("margin-left"))+
parseFloat(a.getPropertyValue("margin-right")),"border-box"!==a.getPropertyValue("box-sizing")&&(b+=parseFloat(a.getPropertyValue("border-left-width"))+parseFloat(a.getPropertyValue("border-right-width"))+parseFloat(a.getPropertyValue("padding-left"))+parseFloat(a.getPropertyValue("padding-right"))),b):a.outerWidth(!0)};K=function(a,b,q,C,F,u,r,G){var v,H,m,D,I,d,g,x,y,z,h,l;if(!a.data("sticky_kit")){a.data("sticky_kit",!0);I=A.height();g=a.parent();null!=k&&(g=g.closest(k));if(!g.length)throw"failed to find stick parent";
v=m=!1;(h=null!=n?n&&a.closest(n):c("<div />"))&&h.css("position",a.css("position"));x=function(){var d,f,e;if(!G&&(I=A.height(),d=parseInt(g.css("border-top-width"),10),f=parseInt(g.css("padding-top"),10),b=parseInt(g.css("padding-bottom"),10),q=g.offset().top+d+f,C=g.height(),m&&(v=m=!1,null==n&&(a.insertAfter(h),h.detach()),a.css({position:"",top:"",width:"",bottom:""}).removeClass(t),e=!0),F=a.offset().top-(parseInt(a.css("margin-top"),10)||0)-p,u=a.outerHeight(!0),r=a.css("float"),h&&h.css({width:J(a),
height:u,display:a.css("display"),"vertical-align":a.css("vertical-align"),"float":r,"position":"static"}),e))return l()};x();if(u!==C)return D=void 0,d=p,z=E,l=function(){var c,l,e,k;if(!G&&(e=!1,null!=z&&(--z,0>=z&&(z=E,x(),e=!0)),e||A.height()===I||x(),e=f.scrollTop(),null!=D&&(l=e-D),D=e,m?(w&&(k=e+u+d>C+q,v&&!k&&(v=!1,a.css({position:"fixed",bottom:"",top:d}).trigger("sticky_kit:unbottom"))),e<F&&(m=!1,d=p,null==n&&("left"!==r&&"right"!==r||a.insertAfter(h),h.detach()),c={position:"",width:"",top:""},a.css(c).removeClass(t).trigger("sticky_kit:unstick")),
B&&(c=f.height(),u+p>c&&!v&&(d-=l,d=Math.max(c-u,d),d=Math.min(p,d),m&&a.css({top:d+"px"})))):e>F&&(m=!0,c={position:"fixed",top:d},c.width="border-box"===a.css("box-sizing")?a.outerWidth()+"px":a.width()+"px",a.css(c).addClass(t),null==n&&(a.after(h),"left"!==r&&"right"!==r||h.append(a)),a.trigger("sticky_kit:stick")),m&&w&&(null==k&&(k=e+u+d>C+q),!v&&k)))return v=!0,"static"===g.css("position")&&g.css({position:"relative"}),a.css({position:"absolute",bottom:b,top:"auto"}).trigger("sticky_kit:bottom")},
y=function(){x();return l()},H=function(){G=!0;f.off("touchmove",l);f.off("scroll",l);f.off("resize",y);c(document.body).off("sticky_kit:recalc",y);a.off("sticky_kit:detach",H);a.removeData("sticky_kit");a.css({position:"",bottom:"",top:"",width:""});g.position("position","");if(m)return null==n&&("left"!==r&&"right"!==r||a.insertAfter(h),h.remove()),a.removeClass(t)},f.on("touchmove",l),f.on("scroll",l),f.on("resize",y),c(document.body).on("sticky_kit:recalc",y),a.on("sticky_kit:detach",H),setTimeout(l,
0)}};q=0;for(L=this.length;q<L;q++)b=this[q],K(c(b));return this}}).call(this);




// remove


// date picker

$(".datepicker").datepicker({
  format: 'yyyy-mm-dd',
  startView: "2",
  getDate: true,
  autoHide:true
});



// change password


$("#changepassword").change(function() {
    if($(this).prop('checked')) {
        $(".show-hide").addClass("open");
    } else {
        $(".show-hide").removeClass("open");
    }
});


// menu toggle

// close responsive
$(".header-menu-toggle, .close-header-menu, .navigation a, .menu_overlay_menu").click(function() {
  $(".navigation").toggleClass('open');
  $(".header-menu-toggle").toggleClass('open');
    $("body").toggleClass('overflow');  
    $(".menu_overlay_menu").toggleClass('open');  
});



// side menu

$(".menu-toggle").click(function() {
  $(".sidebar-navigation").addClass('open');
    $("body").addClass('overflow');    
    $(".side-menu-items-overlay").addClass('open');
});



$(".sidebar-navigation ul li a, .sidebar-navigation h4, .side-menu-items-overlay").click(function() {
  $(".sidebar-navigation").removeClass('open');
    $("body").removeClass('overflow');    
    $(".side-menu-items-overlay").removeClass('open');
});




// sidemenu links close

$(".cart-toggle").click(function() {
  $(".cart-mini-mobile").addClass('open');
    $("body").addClass('overflow');   
    $(".cart-overlay ").addClass('open');   
    
});


$(".cart-mini-inner h3, .cart-overlay").click(function() {
  $(".cart-mini-mobile").removeClass('open');
    $("body").removeClass('overflow');  
    $(".cart-overlay").removeClass('open');     
});





// Cache selectors
var lastId,
    topMenu = $(".sidebar-navigation-inner ul li"),
    topMenuHeight = topMenu.outerHeight() + 75,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(e){
  var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+0;
  $('html, body').stop().animate({ 
      scrollTop: offsetTop
  }, 300);
  e.preventDefault();
});

// Bind to scroll
$(window).scroll(function(){
   // Get container scroll position
   var fromTop = $(this).scrollTop()+topMenuHeight + 75;
   
   // Get id of current scroll item
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   // Get the id of the current element
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   
   if (lastId !== id) {
       lastId = id;
       // Set/remove active class
       menuItems
         .parent().removeClass("active")
         .end().filter("[href='#"+id+"']").parent().addClass("active");
   }                   
});




// particles

particlesJS('particles-js',
  
  {
  "particles": {
    "number": {
      "value": 96,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#4fbd50"
    },
    "shape": {
      "type": "triangle",
      "stroke": {
        "width": 1,
        "color": "#4fbd50"
      },
      "polygon": {
        "nb_sides": 4
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.13629002517356945,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 11.83721462448409,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#d7d7d7",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}

);






});

// listing fixed

$(window).scroll(function(){
  if ($(window).scrollTop() >= 300) {
    $('.listing-restaurant-filters').addClass('fixed');
   }
   else {
    $('.listing-restaurant-filters').removeClass('fixed');
   }
});



// search scroll to top

$(".listing-restaurant-filters .search-list").click(function() {
      $("html, body").animate({ scrollTop: 0 }, "slow");
     return false;
 });

// location focus

$('#change-location').on('shown.bs.modal', function () {
   $('.search-location input').focus();
});


// loader
  $('.loader').on('click', function() {
    var $this = $(this);
    var loadingText = '<i class="fa fa-circle-o-notch fa-spin"></i> loading...';
    if ($(this).html() !== loadingText) {
      $this.data('original-text', $(this).html());
      $this.html(loadingText);
    }
    setTimeout(function() {
      $this.html($this.data('original-text'));
    }, 2000);
  });


// loader
  $('.loader-2').on('click', function() {
    var $this = $(this);
    var loadingText = '';
    if ($(this).html() !== loadingText) {
      $this.data('original-text', $(this).html());
      $this.html(loadingText);
      $this.addClass("loader-image");
    }
    setTimeout(function() {
      $this.html($this.data('original-text'));
    }, 500);

     setTimeout(function() {
      $this.removeClass("loader-image");
    }, 500);

  });


// modal loader

$('.modal').on('shown.bs.modal', function() {
      $('.modal-dialog').addClass("loaders");
 setTimeout(function() {
    $('.modal-dialog').removeClass("loaders")
 }, 500);
});







 // pagination

$(document).ready(function(){

      var list = $(".loadmore-page li");
      var numToShow = 5 ;
      var button = $(".loading");
      var numInList = list.length;
      list.hide();
      if (numInList > numToShow) {
        button.show();
      } else {
        button.hide();
      }
      list.slice(0, numToShow).show();



      button.click(function(){
          var showing = list.filter(':visible').length;
          list.slice(showing - 1, showing + numToShow).fadeIn();
          var nowShowing = list.filter(':visible').length;
          if (nowShowing >= numInList) {
            button.hide();
          }
      });

});



// active class dynamic
$(document).ready(function() {
$(".navigation [href]").each(function() {
if (this.href == window.location.href) {
$(this).addClass("active");
}
});
});




// equal height
// equl height
;( function( $, window, document, undefined )
{
    'use strict';

    var $list       = $( '.address_list_check' ),
        $items      = $list.find( '.address_list' ),
        setHeights  = function()
        {
            $items.css( 'height', 'auto' );

            var perRow = Math.floor( $list.width() / $items.width() );
            if( perRow == null || perRow < 2 ) return true;

            for( var i = 0, j = $items.length; i < j; i += perRow )
            {
                var maxHeight   = 0,
                    $row        = $items.slice( i, i + perRow );

                $row.each( function()
                {
                    var itemHeight = parseInt( $( this ).outerHeight() );
                    if ( itemHeight > maxHeight ) maxHeight = itemHeight;
                });
                $row.css( 'height', maxHeight );
            }
        };

    
    setHeights();
    $( window ).on( 'resize', setHeights );

    
})( jQuery, window, document );


// footer closepanel

$("footer .col-sm-3 h3").click(function() {
  $(this).parent().toggleClass('open');   
});



// type click new
$('.form-icon input:text').click(
    function(){
        $(this).val('');
    });

// sticky responsive size



$(document).ready(function() {
    // Optimalisation: Store the references outside the event handler:
    var $window = $(window);

    function checkWidth() {
        var windowsize = $window.width();
        if (windowsize > 1023) {

         
// scroll stick
$(document).ready(function(){
  if($('[data-coloums]').length>0) {
    var stickySidebar = new StickySidebar('[data-coloums]', {
        topSpacing: 100,
        bottomSpacing: 25,
        containerSelector: '[data-parent]',
        innerWrapperSelector: '[data-coloums]'
      });
  }
});


$(function() {
  return $("[data-sticky_column]").stick_in_parent({
    parent: "[data-sticky_parent]"
  });
});


        }
    }
    // Execute on load
    checkWidth();
    // Bind event listener
    $(window).resize(checkWidth);
})
