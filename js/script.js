var cur_img = 1;
var img_num = 5;

function loops() {
    var logo = $("#logo");
    var next_img = (cur_img === img_num - 1) ? 1 : cur_img + 1;
    logo.removeClass().addClass("img" + next_img.toString()).addClass("circle");
    cur_img = next_img;
 };

$(document).ready(
   function() {
   
      drawCircle('.imageCircle', 0, 62, 90, 40, 50);

      $("a.imageCircle").mouseover(
         function() {
            $(this).css("opacity","0.7");
            $('#circleText').text($(this).attr("id"));
         }
      );

      $(".imageCircle").mouseout(
         function() {
            $(this).css("opacity","1.0");
            $('#circleText').text("");
         }
      );

    
    setInterval(function(){loops();}, 2000);			
			
	$(".jobs").colorbox({rel:'jobslink', inline: true, transition:"none", width: "50%"});
	$(".projects a.box").colorbox({rel:'projectlink', inline: true, transition:"none", width: "50%"});
    $("#csesoc"     ).colorbox({inline:true, width:"50%"});
    $("#cserevue"   ).colorbox({inline:true, width:"50%"});
    $("#quidditch"  ).colorbox({inline:true, width:"50%"});
    $("#stureps"    ).colorbox({inline:true, width:"50%"});    
    $("#srec"       ).colorbox({inline:true, width:"50%"});    
    $("#voice"      ).colorbox({inline:true, width:"50%"});    
    $("#engsoc"     ).colorbox({inline:true, width:"50%"}); 
    $("#CV"         ).colorbox({iframe:true, width:"80%", height:"80%"});
   }
);

$(window).resize(function() {
    $.fn.colorbox.load(); 
});