$(function () {
  // hamburger
  $("#toggle-btn").click(function () {
    $(this).toggleClass("off");
    $(".header nav").toggleClass("slide-in");
    $(".nav-mask").toggleClass("on");
  });

  $(".header nav a").click(function () {
    if ($(window).width() < 1280) {
      $("#toggle-btn").toggleClass("off");
      $(".header nav").toggleClass("slide-in");
      $(".nav-mask").toggleClass("on");
    }
  });

  // #link卷軸滑動動畫
  $('a[href^="#"]').on("click", function (event) {
    var target = $(this.getAttribute("href"));
    if (target.length) {
      event.preventDefault();
      $("html,body")
        .stop()
        .animate(
          {
            scrollTop: target.offset().top + 1,
          },
          1000
        );
    }
  });

  // header底色
  $(window).scroll(function () {
    if (window.pageYOffset == 0) {
      $(".header").removeClass("bgc");
    } else {
      $(".header").addClass("bgc");
    }
  });

  var $kvIndex = 3;
  var kvx = 0;
  if (window.innerWidth > 1440) {
    kvX = 700;
  } else if (window.innerWidth > 1279) {
    kvX = 550;
  } else if (window.innerWidth > 767) {
    kvX = 500;
  } else {
    kvX = 350;
  }
  // kv carousel
  $("#kv-carousel").Cloud9Carousel({
    yRadius: 0,
    xRadius: kvX,
    autoPlay: 1,
    frontItemClass: "front",
    speed: 1,
    autoPlayDeplay: 4000,
    bringToFront: true,
    onRendered: function (carousel) {
      $("#kv-card-title").text(carousel.nearestItem().element.alt);
    },
  });
  setInterval(function () {
    var $kvIndex = ($("#kv-carousel img.front").index() + 2) % 4;
    $("#kv-carousel img")
      .eq($kvIndex)
      .addClass("back")
      .siblings()
      .removeClass("back");
  }, 1000);
  $(window).resize(function () {
    if (window.innerWidth > 1440) {
      kvX = 700;
    } else if (window.innerWidth > 1279) {
      kvX = 550;
    } else if (window.innerWidth > 767) {
      kvX = 500;
    } else {
      kvX = 350;
    }
    // Clone actual carousel
    $("#kv-carousel").data("carousel").deactivate();
    var clone = $("#kv-carousel").clone();
    $("#kv-carousel").remove();
    $(".kv-carousel-wrapper").append(clone);

    // Call Cloud9Carousel again
    $(function () {
      $("#kv-carousel").Cloud9Carousel({
        yRadius: 0,
        xRadius: kvX,
        autoPlay: 1,
        frontItemClass: "front",
        speed: 1,
        autoPlayDeplay: 4000,
        bringToFront: true,
        onRendered: function (carousel) {
          $("#kv-card-title").text(carousel.nearestItem().element.alt);
        },
      });
    });

    var myElement = document.getElementById("kv-carousel");
    var hammertime = new Hammer(myElement);
    hammertime.on("swipeleft", function () {
      $("#kv-carousel").data("carousel").go(1);
    });
    hammertime.on("swiperight", function () {
      $("#kv-carousel").data("carousel").go(-1);
    });
  });

  var myElement = document.getElementById("kv-carousel");
  var hammertime = new Hammer(myElement);
  hammertime.on("swipeleft", function () {
    $("#kv-carousel").data("carousel").go(1);
  });
  hammertime.on("swiperight", function () {
    $("#kv-carousel").data("carousel").go(-1);
  });

  // sec2 主要其他功能 toggle
  $(".sec2-toggle .btn").click(function () {
    $(this).addClass("on").siblings().removeClass("on");
    var $index = $(this).index();
    if ($index == 0) {
      $(".sec2-toggle").removeClass("changed");
      $(".sec2-wrapper").eq(1).removeClass("on");
      $(".sec2-wrapper").eq(0).addClass("on");
    } else {
      $(".sec2-toggle").addClass("changed");
      $(".sec2-wrapper").eq(0).removeClass("on");
      $(".sec2-wrapper").eq(1).addClass("on");
    }
  });

  // sec2 右側選單
  $(".sec2-wrapper .right-wrapper li").mousemove(function () {
    if ($(this).hasClass("on")) {
      return false;
    }
    $(this).addClass("on").siblings().removeClass("on");
    var $index = $(this).index(".sec2-wrapper .right-wrapper li");
    $(".sec2-wrapper .left-wrapper>li")
      .eq($index)
      .siblings()
      .removeClass("on")
      .hide();
    $(".sec2-wrapper .left-wrapper>li").eq($index).show().addClass("on");
  });

  // sec3 slider
  $("#section3-slider").slick({
    prevArrow: $("#section3-prev"),
    nextArrow: $("#section3-next"),
    infinite: false,
    centerMode: true,
    slidesToShow: 3,
    dots: true,
    variableWidth: true,
    appendDots: $("#section3-slider-nav-container"),
    centerPadding: "0px",
    useTransform: false,
    focusOnSelect: true,
  });
  $("#section3-slider").on(
    "beforeChange",
    function (event, slick, currentSlide, nextSlide) {
      var carPercent = (nextSlide / 4) * 100 + "%";
      // console.log(carPercent);
      $("#sec3-car").css("left", carPercent);
    }
  );

  // sec5 常見問題 select
  if (window.innerWidth >= 768) {
    $("#sec5-select").selectmenu({
      change: function (event, ui) {
        var $index = ui.item.value;
        $("#section5 .dropdown-wrapper").removeClass("show");
        $("#section5 .dropdown-wrapper")
          .eq($index)
          .addClass("show")
          .siblings()
          .removeClass("show");
      },
    });
  } else {
    $("#sec5-select").change(function () {
      var $index = $(this).val();
      $("#section5 .dropdown-wrapper").removeClass("show");
      $("#section5 .dropdown-wrapper")
        .eq($index)
        .addClass("show")
        .siblings()
        .removeClass("show");
    });
  }

  // sec5 常見問題 下拉QA
  $("#section5 .dropdown-wrapper li .title").click(function () {
    if ($(this).hasClass("opened")) {
      $(this).removeClass("opened");
      $(this).siblings(".text").slideUp();
    } else {
      $(this).siblings(".text").slideDown();
      $(this).addClass("opened");
    }
  });

  // particlesJS
  $("#particles-js").css({
    width: $("html").width() + "px",
    height: $("html").height() + "px",
  });
  $(window).resize(function () {
    $("#particles-js").css({
      width: $("html").width() + "px",
      height: $("html").height() + "px",
    });
  });
  particlesJS("particles-js", {
    particles: {
      number: {
        value: 12,
        density: {
          enable: false,
          value_area: 5000,
        },
      },
      color: {
        value: "#ffffff",
      },
      shape: {
        type: "image",
        stroke: {
          width: 0,
          color: "#000000",
        },
        polygon: {
          nb_sides: 5,
        },
        image: {
          src: "./img/blue.png",
          width: 472,
          height: 472,
        },
      },
      opacity: {
        value: 1,
        random: true,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 472,
        random: true,
        anim: {
          enable: false,
          speed: 30,
          size_min: 200,
          sync: false,
        },
      },
      line_linked: {
        enable: false,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 6,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "bounce",
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: false,
          mode: "repulse",
        },
        onclick: {
          enable: false,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: {
          distance: 200,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
    config_demo: {
      hide_card: false,
      background_color: "#b61924",
      background_image: "",
      background_position: "50% 50%",
      background_repeat: "no-repeat",
      background_size: "cover",
    },
  });

  // aos
  $('*[data-aos|="nojs"]').each(function () {
    var $this = $(this);
    $this.attr("data-aos", $this.attr("data-aos").replace("nojs-", ""));
  });
  AOS.init({
    // startEvent: 'load',
  });

  document.addEventListener("aos:in:icon1", function () {
    $("#icon1").addClass("slide");
  });
  document.addEventListener("aos:in:icon2", function () {
    $("#icon2").addClass("slide");
  });

  // kv youtube影片開關
  $("#kv-yt-btn").click(function () {
    $("#kv-iframe").prop("src", $("#kv-iframe").data("src"));
    $("#iframe-wrap-kv").fadeIn();
  });
  $("#iframe-wrap-kv .iframe-bg").click(function () {
    $("#kv-iframe").prop("src", "");
    $("#iframe-wrap-kv").fadeOut();
  });

  // sec3 感測器安裝影片 youtube影片開關
  $("#section3-yt-btn").click(function () {
    $("#sec3-iframe").prop("src", $("#sec3-iframe").data("src"));
    $("#iframe-wrap-sec3").fadeIn();
  });
  $("#iframe-wrap-sec3 .iframe-bg").click(function () {
    $("#sec3-iframe").prop("src", "");
    $("#iframe-wrap-sec3").fadeOut();
  });

  // 常見問題 感測器操作 youtube影片開關
  $("#demo-yt-btn").click(function () {
    $("#demo-iframe").prop("src", $("#demo-iframe").data("src"));
    $("#iframe-wrap-demo").fadeIn();
  });
  $("#iframe-wrap-demo .iframe-bg").click(function () {
    $("#demo-iframe").prop("src", "");
    $("#iframe-wrap-demo").fadeOut();
  });
});
