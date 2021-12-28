/* # flowchart.js GIMMICK
 *
 * Create flowcharts with flowchart.js
 *
 * ## Usage
 *
 *     [gimmick:flowchartjs]( <your flowchart file> )
 *
 *     [gimmick:yuml (flowchartjs_version: '1.16.0') ]( <your flowchart file) )
 *
 *     [gimmick:yuml (flowchartjs_version: '1.16.0', raphael_version: '2.2.0') ]( <your flowchart file>)
 */

(function($) {
    'use strict';
    function flowchartjs($link, opt, text) {
        var default_options = {
            flowchartjs_version: '1.17.0',  
            raphael_version: '2.3.0',  
        };
        var options = $.extend ({}, default_options, opt);
        return $link.each(function(i,e) {
            var $this = $(e);
            var diagramFile = $this.attr('href');
            $.ajax({
                url : diagramFile,
                dataType : "text",
                success : function(data) {
                var $div = $('<div id="diagram"/>');
                $this.replaceWith($div);
                    $.getScript("http://cdnjs.cloudflare.com/ajax/libs/raphael/"  + options.raphael_version+ "/raphael.min.js", function ()  {
                        $.getScript("https://cdnjs.cloudflare.com/ajax/libs/flowchart/" + options.flowchartjs_version + "/flowchart.min.js", function() {
                             console.log("loaded");
                             var chart = flowchart.parse(data);
                             chart.drawSVG('diagram');
                        });
                    });
                }                    
            });
        });
    } 
    var flowchartjsGimmick = {
        name: 'flowchartjs',
        version: $.md.version,
        once: function() {
            $.md.linkGimmick(this, 'flowchartjs', flowchartjs);
            $.md.registerScript(this, '', {
                license: 'LGPL',
                loadstage: 'postgimmick',
                finishstage: 'all_ready'
            });
        }
    };
    $.md.registerGimmick(flowchartjsGimmick);

}(jQuery));
