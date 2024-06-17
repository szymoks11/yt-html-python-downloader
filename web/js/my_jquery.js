$("#clip").click(function() {
    $("#start").toggle();
    $("#stop").toggle();
  });

$(document).ready(function(){
  $('input[name="link"]').change(function(){
      if ( $(this).val().length > 0 ){
        var output_data = document.getElementById("link").value;
        if (output_data == "") {
        console.log("pass")
        }
        else {
        var function0 = eel.quality_list(output_data)(call_back_quality);
        }
      }
  });
});

