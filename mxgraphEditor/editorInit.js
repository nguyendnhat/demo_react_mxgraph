var urlParams = (function (url) {
  var result = new Object();
  var idx = url.lastIndexOf("?");

  if (idx > 0) {
    var params = url.substring(idx + 1).split("&");

    for (var i = 0; i < params.length; i++) {
      idx = params[i].indexOf("=");

      if (idx > 0) {
        result[params[i].substring(0, idx)] = params[i].substring(
          idx + 1
        );
      }
    }
  }

  return result;
})(window.location.href);

// Default resources are included in grapheditor resources
mxLoadResources = false;

mxBasePath = "./mxgraph";
mxLanguage = "en";

window.RESOURCES_PATH = "/mxgraphEditor/resources";
window.RESOURCE_BASE = "/mxgraphEditor/resources/grapheditor";
window.STENCIL_PATH = "/mxgraphEditor/stencils";
window.IMAGE_PATH = "/mxgraphEditor/images";
window.STYLE_PATH = "/mxgraphEditor/styles";
window.CSS_PATH = "/mxgraphEditor/styles";
window.OPEN_FORM = "/mxgraphEditor/open.html";
window.mxLanguages = "en";