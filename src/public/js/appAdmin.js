$(document).ready(() => {
  $("ul li").click(function () {
    // Remove the active class from all li elements
    $("ul li").removeClass("active");

    // Add the active class to the clicked li element
    $(this).addClass("active");
    $(".title-acticle").text(this.textContent);
  });

  $(".contanier-section:nth-child(n + 2)").hide();

  $("li").on("click", function () {
    $(".contanier-section").hide();
    $(".contanier-section:nth-child(" + $(this).val() + ")").show();
  });
});
