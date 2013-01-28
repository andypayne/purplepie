(function( $ ) {
  var methods = {
    cssRotate : function (deg, asStr) {
               if (asStr) {
                 return 'transform: rotate(' + deg + 'deg);' +
                        '-moz-transform: rotate(' + deg + 'deg);' +
                        '-webkit-transform: rotate(' + deg + 'deg);' +
                        '-ms-transform: rotate(' + deg + 'deg);' +
                        '-o-transform: rotate(' + deg + 'deg);';
               } else {
                 return { 'transform': 'rotate(' + deg + 'deg);',
                          '-moz-transform': 'rotate(' + deg + 'deg);',
                          '-webkit-transform': 'rotate(' + deg + 'deg);',
                          '-ms-transform': 'rotate(' + deg + 'deg);',
                          '-o-transform': 'rotate(' + deg + 'deg);' };
               }
             },
    cssBorderRadius : function (rad) {
                        return { 'border-radius': rad + 'px',
                                 '-moz-border-radius': rad + 'px',
                                 '-webkit-border-radius': rad + 'px',
                                 '-o-border-radius': rad + 'px' };
                      }
  };
  $.fn.purplePie = function(options_) {
    var $this = $(this);
    var options = $.extend({
      'background-color': '#000',
      'size': '60px',
      'colors': [ '#253494', '#2c7fb8', '#41b6c4', '#a1dab4', '#ffffcc' ]
    }, options_);

    $this.each(function() {
      var pie = $(this);
      var width = parseInt(options['size']);
      var pieCtrCss = { 'height': width + 'px',
                        'width': width + 'px' };
      $.extend(pieCtrCss, methods.cssBorderRadius(width/2));
      pie.css(pieCtrCss);
      var slices = pie.data('slices');
      var psc = $('<div></div>');
      pie.append(psc);
      var pieSliceCtrCss = $.extend({},
                                    pieCtrCss,
                                    { 'position': 'absolute',
                                      'clip': 'rect(0px, ' +
                                          width + 'px, ' +
                                          width + 'px, ' +
                                          (width/2) + 'px)',
                                      'background-color': options['background-color'] },
                                    methods.cssRotate(0, false));

      psc.css(pieSliceCtrCss);
      var sliceTotal = 0;
      for (var i = 0; i < slices.length; i += 1) {
        var bgcolor;
        if (i < options['colors'].length) {
          bgcolor = options['colors'][i];
        } else {
          bgcolor = options['colors'][i - options['colors'].length];
        }

        if ((slices[i] + sliceTotal) < 50) {
          var psc2 = $('<div></div>');
          var ps180 = $('<div style="background-color: ' + bgcolor + '; ' + methods.cssRotate(360*((slices[i] + sliceTotal)/100), true) + '"></div>');

          var ps180Css = $.extend({},
                                  pieCtrCss,
                                  { 'position': 'absolute',
                                    'clip': 'rect(0px, ' + (width/2) + 'px, ' + width + 'px, 0px)' });
          ps180.css(ps180Css);
          psc2.append(ps180);
          var psc2Css = $.extend({},
                                 pieCtrCss,
                                 { 'position': 'absolute',
                                   'background': 'transparent',
                                   'clip': 'rect(0px, ' +
                                      width + 'px, ' +
                                      width + 'px, ' +
                                      (width/2) + 'px)' },
                                 methods.cssRotate(0, false));
          psc2.css(psc2Css);
          psc.prepend(psc2);

          sliceTotal += slices[i];
        } else {
          var ps360 = $('<div style="background-color: ' + bgcolor + '; ' + methods.cssRotate(360*((slices[i] + sliceTotal)/100), true) + '"></div>');
          var ps180360Css = $.extend({},
                                     pieCtrCss,
                                     { 'position': 'absolute',
                                       'clip': 'rect(0px, ' + (width/2) + 'px, ' + width + 'px, 0px)' });
          ps360.css(ps180360Css);
          psc.prepend(ps360);

          var ps180 = $('<div style="background-color: ' + bgcolor + '; ' + methods.cssRotate(180, true) + '"></div>');
          ps180.css(ps180360Css);
          psc.prepend(ps180);
          sliceTotal += slices[i];
        }
      }

      if (sliceTotal > 0.5) {
        psc.css('clip', 'auto');
      }
    });

  

  };
})( jQuery );


