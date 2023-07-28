function fadeOut(new_location){
    document.body.style.animation = "fadeOutAnimation 750ms linear forwards"
    setTimeout(
      function(){
        window.location.href=new_location;
      },
      650
    )
}