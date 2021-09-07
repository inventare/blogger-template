var imgr = new Array();
imgr[0] = "http://sites.google.com/site/fdblogsite/Home/nothumbnail.gif";
var showRandomImg = true;
var featured_numposts = 5;

function sliderposts(blog) {
    var j = showRandomImg ? Math["floor"]((imgr["length"] + 1) * Math["random"]()) : 0;
    var img = new Array();
    var maxpost = featured_numposts;
    if (featured_numposts > blog.feed.entry.length) {
        maxpost = blog.feed.entry.length;
    }
    for (var i = 0; i < maxpost; i += 1) {
        var post = blog.feed.entry[i];
        var postCategory = post.category && post.category.length > 0 ? post.category[0].term : 'Sem Categoria';
        var postTitle = post.title['$t'];
        var postLink = '';
        var postAuthor = post.author[0].name['$t'];
        if (i == blog.feed.entry.length) {
            break;
        }
        for (var n = 0; n < post.link.length; n += 1) {
            if (post.link[n].rel == "alternate") {
                postLink = post.link[n].href;
                break;
            }
        }
        var postContent = '';
        if ('content' in post) {
            postContent = post.content['$t'];
        } else {
            if ('summary' in post) {
                postContent = post.summary['$t'];
            } else {
                postContent = "";
            }
        }
        if (j > imgr["length"] - 1) {
            j = 0;
        }
        img[i] = imgr[j];
        var text = postContent;
        var a = text.indexOf("<img");
        var b = text.indexOf("src=\"", a);
        var c = text.indexOf("\"", b + 5);
        var d = text.substr(b + 5, c - b - 5);
        if (a != -1 && b != -1 && c != -1 && d != "") {
            img[i] = d;
        }
        var publishedDate = post.published['$t'].substring(0, 10);
        if (i === 0) {
            document.write(
                "<a href=\"" + postLink + "\" class=\"main-post col-post\" style=\"background-image: url(" + img[i] + ")\">" +
                "   <span class=\"remotwa c1\">" + postCategory + "</span>" +
                "   <div class=\"content\">" + 
                "       <h3 class=\"entry-title\">" + postTitle + "</h3>" +
                "       <div class='date-l'><i class='fa fa-calendar'></i>" + publishedDate + "</div>" +
                "       <div class='date-r'><i class='fa fa-user'></i>" + postAuthor + "</div>" +
                "   </div>" +
                "</a>"
            );
        } else {
            const spanClass = "c" + (i + 1).toString();
            document.write(
                "<a href=\"" + postLink + "\" class=\"secondary-post col-post " + spanClass +"\" style=\"background-image: url(" + img[i] + ")\">" +
                "   <span class=\"" + spanClass + "\">" + postCategory + "</span>" +
                "   <div class=\"content\">" + 
                "       <h4>" + postTitle + "</h4>" +
                "       <div class='date-l'><i class='fa fa-calendar'></i>" + publishedDate + "</div>" +
                "       <div class='date-r'><i class='fa fa-user'></i>" + postAuthor + "</div>" +
                "   </div>" +
                "</a>"
            );
        }
        j += 1;
    }
    document.write("<a href='/search' class='feauterdButton'>Ver Todos os Artigos</a>");
}