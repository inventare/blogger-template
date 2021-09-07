var thumbnail_mode = "yes";
var summary_noimg = 390;
var summary_img = 285;

function removeHtmlTag(strx, chop) {
    if (strx.indexOf("<") != -1) {
        var s = strx.split("<");
        for (var i = 0; i < s.length; i++) {
            if (s[i].indexOf(">") != -1) {
                s[i] = s[i].substring(s[i].indexOf(">") + 1, s[i].length);
            }
        }
        strx = s.join("");
    }
    chop = chop < strx.length - 1 ? chop : strx.length - 2;
    while (strx.charAt(chop - 1) != " " && strx.indexOf(" ", chop) != -1) chop++;
    strx = strx.substring(0, chop - 1);
    return strx + "...";
}

function createSummaryAndThumb(post_body, post_image, post_desc, post_url) {
    var raw_body = document.getElementById(post_body);
    var raw_image = document.getElementById(post_image);
    var raw_desc = document.getElementById(post_desc);
    var image_tag = "";
    var imgs = raw_body.getElementsByTagName("img");
    var sum_len = summary_noimg;
    if (thumbnail_mode == "yes") {
        if (imgs.length >= 1) {
            image_tag = "<a href=" + post_url + "><img src=" + imgs[0]["src"] + " style='width:100%;' /></a>";
            sum_len = summary_img;
        }
    }
    var desc = "<p>" + removeHtmlTag(raw_body.innerHTML, sum_len) + "</p>";
    raw_image.innerHTML = image_tag;
    raw_desc.innerHTML = desc;
    raw_body.parentNode.removeChild(raw_body);
}