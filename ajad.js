$(document).ready(function() {
  $("#newQuote").on("click", function() {
    $.getJSON(
      "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=",
      function(a) {
        $("#quote-content").append(
          a[0].content + "<p>— " + a[0].title + "</p>"
        );
      }
    );
  });

  $("#newQuote2").on("click", function(e) {
    e.preventDefault();
    $.ajax({
      url:
        "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=",
      success: function(data) {
        var post = data.shift(); // The data is an array of posts. Grab the first one.
        $("#quote-title").text(post.title);
        $("#quote-content").html(post.content);

        // If the Source is available, use it. Otherwise hide it.
        if (
          typeof post.custom_meta !== "undefined" &&
          typeof post.custom_meta.Source !== "undefined"
        ) {
          $("#quote-source").html("Source:" + post.custom_meta.Source);
        } else {
          $("#quote-source").text("");
        }
      },
      cache: false
    });
  });
});
