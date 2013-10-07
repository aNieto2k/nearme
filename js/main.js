if ("geolocation" in navigator) {
var YQL = "http://api.flickr.com/services/rest/?method=flickr.photos.search&lat={latitude}&lon={longitude}&radius=5&page=1&api_key=b8c6508b16ee8a544616f89c609cb114&format=json&nojsoncallback=1&per_page={perpage}&sort=interestingness-desc";

  function loadImages(){
    console.log("Cambiamos");
    
    var $content = $("#content");
    var source   = $("#gallery_template").html();
    var template = Handlebars.compile(source);

    var perpage = 50; //$("#items").val();

    
    navigator.geolocation.getCurrentPosition(function(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      YQL = YQL.replace("{latitude}", latitude);
      YQL = YQL.replace("{longitude}", longitude);
      YQL = YQL.replace("{perpage}", perpage);

      $content.addClass("loading");
      $.getJSON(YQL, function (data){
        window.data = data;
        if (data.stat != "ok") $content.text("No hay resultados");

        var html   = template(data.photos);

        $("#gallery_template").after(html);

      $content.removeClass("loading");
      $("#gallery").justifiedGallery({
        'usedSuffix':'lt100', 
        'justifyLastRow':false, 
        'rowHeight':70, 
        'fixedHeight':false, 
        'lightbox':true, 
        'captions':true, 
        'margins':1
      });

    });
      
    });
  }  

  $("#items").bind("change", loadImages);
  loadImages();

} else {
  alert("Esta aplicación necesita de la geolocalización para funcionar");
}