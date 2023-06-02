function fadeOut(new_location){
    document.body.style.animation = "fadeOutAnimation 750ms linear"
    setTimeout(
      function(){
        window.location.href=new_location;
      },
      650
    )
}