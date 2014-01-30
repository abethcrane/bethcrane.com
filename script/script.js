$("img").mouseover(
function () {
  var sourceI = $(this).attr("src");
  var lengthI = sourceI.length;
  sourceI = sourceI.substring(0, lengthI - 4);
  sourceI = sourceI + "b.jpg";
  $(this).attr("src", sourceI);
}
);

$("img").mouseout(
function () {
  var sourceI = $(this).attr("src");
  var lengthI = sourceI.length;
  sourceI = sourceI.substring(0, lengthI - 5);
  sourceI = sourceI + ".jpg";
  $(this).attr("src", sourceI);
}
);
