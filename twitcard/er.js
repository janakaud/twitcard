exports.handler = function(request, response) {

    //TODO maybe remove this - and allow users to preview the generated metatags?
    // if anyone other than Twitterbot hits this, there's something wrong!
    if (!(request.headers["user-agent"] || "").startsWith("Twitterbot")) {
        return response.status(400).json({error: "Twitterbot's eyes only!"});
    }

    let urlQry = request.query["url"];
    if (!urlQry) {
        throw new TypeError("Missing target URL");
    }
    let url = decodeURIComponent(urlQry);

    let title = request.query["title"];
    let description = request.query["description"];

    let image = request.query["image"];
    if (image) {
        image = decodeURIComponent(image);
    }

    // @-free Twitter username
    let user = request.query["user"];
    if (user && user.startsWith("@")) {
        user = user.substring(1);
    }

    //TODO fetch any missing values from URL's metatags

    response.send(`<!DOCTYPE html>
<html>
<head>
<meta name="twitter:card" content="summary_large_image">
${user ? `<meta name="twitter:site" content="@${user}">
<meta name="twitter:creator" content="${user}">` : ""}
<meta name="twitter:url" content="${url}">
<meta name="twitter:URL" content="${url}">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image:src" content="${image}">
</head>
</html>`);
}