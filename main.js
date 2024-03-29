isServerLaunched = false;
var myCodeMirrorMD,
  myCodeMirrorHTML,
  myCodeMirrorCSS,
  myCodeMirrorJS;


var splitter, splitter2, panel_left, panel_right, panel_right2;
var last_x, window_width;
function initTabs(){
  //open every tabs once to init codemirror correctly
  openInTab('main_page');
  openInTab('index_page');
  openInTab('style_page');
  openInTab('preview_page');
  openInTab('Welcome_page');
  delTab('index_page');
  delTab('main_page');
  delTab('style_page');
  load_treeview_events();
  arret_du_générateur_d_improbabilité_infinie();

}
function init(ThreePanels = false) {
  window_width = window.innerWidth;
  splitter = document.getElementById("splitter");
  panel_left = document.getElementById("panel_left");
  panel_right = document.getElementById("panel_right");
  panel_right2 = document.getElementById("panel_right2");
  splitter2 = document.getElementById("splitter2");

  splitter.removeEventListener("mousedown", spMouseDown_3panels_splitter1);
  splitter2.removeEventListener("mousedown", spMouseDown_3panels_splitter2);
  splitter.removeEventListener("mousedown", spMouseDown_2panels);

  var dx = panel_left.clientWidth;
  document.getElementById("reducer_btn").style.left = dx + "px";
  splitter.style.marginLeft = dx + "px";
  dx += splitter.clientWidth - 1;
  //panel_right.style.marginLeft = dx + "px";
  if (ThreePanels) {
    panel_right.style.float = "left";
    panel_right.style.marginLeft = "";
    //panel_right.style.float="left";

    splitter2.style.display = "";
    panel_right2.style.display = "";

    panel_right.style.width = (window_width - dx) / 2 + "px";
    dx += panel_right.clientWidth;
    splitter2.style.marginLeft = dx - 5 + "px";
    dx += splitter2.clientWidth;
    panel_right2.style.marginLeft = dx - 5 + "px";
    panel_right2.style.width = window_width - dx + "px";
    splitter.addEventListener("mousedown", spMouseDown_3panels_splitter1);
    splitter2.addEventListener("mousedown", spMouseDown_3panels_splitter2);
  } else {
    panel_right.style.float = "";

    panel_right.style.marginLeft = dx + "px";
    dx = window_width - dx;
    panel_right.style.width = dx + "px";
    console.log(panel_right.style);
    splitter.addEventListener("mousedown", spMouseDown_2panels);
  }


}

/*----------------------------Gestion du resize 2 panels----------------------------*/
function spMouseDown_2panels(e) {
  splitter.removeEventListener("mousedown", spMouseDown_2panels);
  window.addEventListener("mousemove", spMouseMove_2panels);
  window.addEventListener("mouseup", spMouseUp_2panels);
  last_x = e.clientX;
}

function spMouseUp_2panels(e) {
  window.removeEventListener("mousemove", spMouseMove_2panels);
  window.removeEventListener("mouseup", spMouseUp_2panels);
  splitter.addEventListener("mousedown", spMouseDown_2panels);
  resetPosition_2panels(last_x);
}

function spMouseMove_2panels(e) {
  resetPosition_2panels(e.clientX);
}

function resetPosition_2panels(nowX) {
  var dx = nowX - last_x;
  dx += panel_left.clientWidth;
  document.getElementById("reducer_btn").style.left = dx + "px";
  panel_left.style.width = dx + "px";
  splitter.style.marginLeft = dx + "px";
  dx += splitter.clientWidth - 1;
  panel_right.style.marginLeft = dx + "px";
  dx = window_width - dx;
  panel_right.style.width = dx + "px";
  last_x = nowX;
}
/*---------------------------------------------------------------------------------*/

/*----------------------------Gestion du resize 3 panels----------------------------*/

function spMouseDown_3panels_splitter1(e) {
  splitter.removeEventListener("mousedown", spMouseDown_3panels_splitter1);
  window.addEventListener("mousemove", spMouseMove_3panels_splitter1);
  window.addEventListener("mouseup", spMouseUp_3panels_splitter1);
  last_x = e.clientX;
}

function spMouseDown_3panels_splitter2(e) {
  document.getElementById("frameK").style.display = "none";
  splitter2.removeEventListener("mousedown", spMouseDown_3panels_splitter2);
  window.addEventListener("mousemove", spMouseMove_3panels_splitter2);
  window.addEventListener("mouseup", spMouseUp_3panels_splitter2);
  last_x2 = e.clientX;
}

function spMouseUp_3panels_splitter1(e) {
  window.removeEventListener("mousemove", spMouseMove_3panels_splitter1);
  window.removeEventListener("mouseup", spMouseUp_3panels_splitter1);
  splitter.addEventListener("mousedown", spMouseDown_3panels_splitter1);
  resetPosition_3panels_splitter1(last_x);
}

function spMouseUp_3panels_splitter2(e) {
  document.getElementById("frameK").style.display = "";
  window.removeEventListener("mousemove", spMouseMove_3panels_splitter2);
  window.removeEventListener("mouseup", spMouseUp_3panels_splitter2);
  splitter2.addEventListener("mousedown", spMouseDown_3panels_splitter2);
  resetPosition_3panels_splitter2(last_x2);
}

function spMouseMove_3panels_splitter1(e) {
  resetPosition_3panels_splitter1(e.clientX);
}

function spMouseMove_3panels_splitter2(e) {
  resetPosition_3panels_splitter2(e.clientX);
}

function resetPosition_3panels_splitter1(nowX) {
  var dx = nowX - last_x;
  dx += panel_left.clientWidth;
  document.getElementById("reducer_btn").style.left = dx + "px";
  panel_left.style.width = dx + "px";
  splitter.style.marginLeft = dx + "px";
  dx += splitter.clientWidth;
  //panel_right.style.marginLeft = dx + "px";

  panel_right.style.width = (window_width - dx) / 2 + "px";
  dx += panel_right.clientWidth;
  splitter2.style.marginLeft = dx - 5 + "px";
  dx += splitter2.clientWidth;
  panel_right2.style.marginLeft = dx - 5 + "px";
  panel_right2.style.width = window_width - dx + "px";
  last_x = nowX;
}

function resetPosition_3panels_splitter2(nowX) {
  var dx = nowX - last_x2;
  dx += panel_right.clientWidth;
  panel_right.style.width = dx + "px";
  splitter2.style.marginLeft = dx - 5 + panel_left.clientWidth + splitter.clientWidth + "px";
  dx += splitter2.clientWidth;
  panel_right2.style.marginLeft = dx - 5 + panel_left.clientWidth + splitter.clientWidth + "px";
  dx += panel_left.clientWidth + splitter.clientWidth;
  panel_right2.style.width = window_width - dx + "px";
  last_x2 = nowX;
}
/*---------------------------------------------------------------------------------*/


var passiveSupported = false;

try {
  var options = Object.defineProperty({}, "passive", {
    get: function () {
      passiveSupported = true;
    }
  });

  window.addEventListener("test", options, options);
  window.removeEventListener("test", options, options);
} catch (err) {
  passiveSupported = false;
}


document.querySelectorAll(".title_barre_outil").forEach(function (element) {
  element.addEventListener("click", function () {
    /*document.querySelectorAll(".title_barre_outil").forEach(function(element2) {
    element2.querySelector(".title_barre_outil_menu").classList.add("hide");
    });*/
    element.querySelector(".title_barre_outil_menu").classList.remove("hide");
    element.querySelector(".title_barre_outil_menu").focus();
  });

  element.addEventListener("focusout", function () {

    element.querySelector(".title_barre_outil_menu").classList.add("hide");
  });

});

G_lstopentab = ["Welcome_page"];

function openInTab(idNodeToOpen) {
  //voir https://codepen.io/rafaelavlucas/pen/MLKGba
  if (typeof G_lstopentab[0] === 'undefined') {

    arret_du_générateur_d_improbabilité_infinie();
  }
  if (G_lstopentab.indexOf(idNodeToOpen) === -1) {
    G_lstopentab.push(idNodeToOpen);

  }
  let currTab = idNodeToOpen.substring(0, idNodeToOpen.indexOf("_page")) + "_tab";
  console.log(currTab);
  try {
    document.getElementsByClassName("barre_nav_tabs_currOpen")[0].classList.remove("barre_nav_tabs_currOpen");

  } catch (e) {
    console.log(e)
  }
  document.getElementById(currTab).classList.add("barre_nav_tabs_currOpen");
  document.getElementById(currTab).style.display = "";

  for (let i = 0; i < G_lstopentab.length; i++) {
    document.getElementById(G_lstopentab[i]).style.display = "none";
  }
  document.getElementById(idNodeToOpen).style.display = "";

  let footerExt, footerEnc = "UTF-8",
    footerWCR = "CRLF";
  switch (idNodeToOpen) {

    case 'README_page':
      footerExt = "GitHub Markdown";
      if (document.getElementById(idNodeToOpen).children.length <= 0) {
        myCodeMirrorMD = CodeMirror(document.getElementById("README_page"), {
          value: mdToShow,
          mode: "gfm",
          theme: "default",
          lineWrapping: false,
          scrollbarStyle: "overlay",
          lineNumbers: true
        });
      }
      break;
    case 'index_page':
      footerExt = "HTML";
      if (document.getElementById(idNodeToOpen).children.length <= 0) {
        myCodeMirrorHTML = CodeMirror(document.getElementById("index_page"), {
          value: htmlToShow,
          mode: "htmlmixed",
          extraKeys: {
            "Ctrl-Space": "autocomplete"
          },
          gutters: ["CodeMirror-lint-markers"],
          lint: true,
          autoCloseBrackets: true,
          theme: "default",
          lineWrapping: false,
          lineNumbers: true,
          scrollbarStyle: "overlay"
        });
      }
      break;
    case 'style_page':
      footerExt = "CSS";
      if (document.getElementById(idNodeToOpen).children.length <= 0) {
        myCodeMirrorCSS = CodeMirror(document.getElementById("style_page"), {
          value: cssToShow,
          mode: "css",
          extraKeys: {
            "Ctrl-Space": "autocomplete"
          },
          gutters: ["CodeMirror-lint-markers"],
          lint: true,
          autoCloseBrackets: true,
          theme: "default",
          lineWrapping: false,
          lineNumbers: true,
          scrollbarStyle: "overlay"
        });
      }
      break;
    case 'main_page':
      footerExt = "JavaScript";
      if (document.getElementById(idNodeToOpen).children.length <= 0) {
        myCodeMirrorJS = CodeMirror(document.getElementById("main_page"), {
          value: jsToShow,
          mode: "javascript",
          extraKeys: {
            "Ctrl-Space": "autocomplete"
          },
          gutters: ["CodeMirror-lint-markers"],
          lint: true,
          autoCloseBrackets: true,
          theme: "default",
          lineWrapping: false,
          lineNumbers: true,
          scrollbarStyle: "overlay"
        });
      }
      break;
    case 'preview_page':
      var browser = document.getElementsByClassName("z-browser")[0];
      new Browser(browser);
      footerExt = "";
      footerEnc = "";
      footerWCR = "";
      break;
    default:
      footerExt = "";
      footerEnc = "";
      footerWCR = "";
  }
  document.getElementById("extPage_footer").innerText = footerExt;
  document.getElementById("encPage_footer").innerText = footerEnc;
  document.getElementById("wcrPage_footer").innerText = footerWCR;

}

function delTab(idNodeToOpen) {
  console.log("deltab");
  if (G_lstopentab.indexOf(idNodeToOpen) !== -1) {
    G_lstopentab.splice(G_lstopentab.indexOf(idNodeToOpen), 1);
  }

  let currTab = idNodeToOpen.substring(0, idNodeToOpen.indexOf("_page")) + "_tab";
  if (document.getElementById(currTab).classList.contains("barre_nav_tabs_currOpen")) {
    document.getElementById(currTab).classList.remove("barre_nav_tabs_currOpen");
    // document.getElementById(G_lstopentab[0]).classList.add("barre_nav_tabs_currOpen");
    console.log(G_lstopentab[0]);
    if (typeof G_lstopentab[0] !== 'undefined') {
      openInTab(G_lstopentab[0]);
    } else {
      lancement_du_générateur_d_improbabilité_infinie();
    }

  }
  document.getElementById(currTab).style.display = "none";
  document.getElementById(idNodeToOpen).style.display = "none";

}


let show_reducer = function (elem) {
  elem.style.display = "block";
  window.setTimeout(function () {
    elem.classList.add('is-visible'); // Make the element visible
  }, 0.50);
};

let hide_reducer = function (elem) {
  elem.classList.remove('is-visible');
  window.setTimeout(function () {
    elem.style.display = "none";
  }, 50);
};

document.getElementById("panel_left").addEventListener("mouseover", function () {
  show_reducer(document.querySelector(".reducer_btn"));
});
document.getElementById("panel_left").addEventListener("mouseleave", function () {
  hide_reducer(document.querySelector(".reducer_btn"));
});
let callback_show_augmenter = function (event) {
  let show_reducer = function (elem) {
    elem.style.display = "block";
    window.setTimeout(function () {
      elem.classList.add('is-visible2'); // Make the element visible
    }, 0.50);
  };

  let hide_reducer = function (elem) {
    elem.classList.remove('is-visible2');
    window.setTimeout(function () {
      elem.style.display = "none";
    }, 50);
  };
  if (event.clientX < 50) {
    if (document.getElementById("augmenter_btn").style.display !== "block") {
      show_reducer(document.getElementById("augmenter_btn"));
    }
  } else {
    if (document.getElementById("augmenter_btn").style.display !== "none") {
      hide_reducer(document.getElementById("augmenter_btn"));
    }
  }
}

function toggle_panel() {
  if (document.getElementById("panel_left").style.display == "none") {
    //todo : modifs init splitter

    augment_panel();
    init();
  } else {
    //todo : modifs init splitter  

    reduce_panel();
    //init();
  }
}

function reduce_panel() {
  document.getElementById("panel_left").style.display = "none";
  document.getElementById("splitter").style.display = "none";
  document.getElementById("panel_right").style["margin-left"] = "";
  document.getElementById("panel_right").style.width = "100%";
  //create div here
  let augmenter = document.createElement("div");
  augmenter.setAttribute("id", "augmenter_btn");
  augmenter.setAttribute("class", "augmenter_btn");
  augmenter.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="16" viewBox="0 0 8 16"><path fill="#9da5b4" fill-rule="evenodd" d="M7.5 8l-5 5L1 11.5 4.75 8 1 4.5 2.5 3l5 5z"/></svg>';
  augmenter.setAttribute("onclick", "toggle_panel()");
  document.body.appendChild(augmenter);

  document.addEventListener("mousemove", callback_show_augmenter, passiveSupported ? {
    passive: true
  } : false);
}

function augment_panel() {
  document.removeEventListener("mousemove", callback_show_augmenter, passiveSupported ? {
    passive: true
  } : false);
  document.getElementById("panel_left").style.display = "";
  document.getElementById("splitter").style.display = "";
  document.getElementById("panel_right").style["margin-left"] = "";
  document.getElementById("panel_right").style.width = "";
  document.body.removeChild(document.getElementById("augmenter_btn"));
}

function Packages_launchServer() {
  //window.location.href = "https://alexandrebonvalle.fr/server/";
  if (!isServerLaunched) {
    isServerLaunched = true;
    init(true);
  }
  var browser = document.getElementsByClassName("z-browser")[0];
  new Browser(browser);
}


/**/
var Browser = function (elem) {
  var that = this;

  that.elem = elem;
  that.url = that.elem.getAttribute("data-url") || 'http://127.0.0.1:5500/index.html';

  that.timer;

  that.address_bar;
  that.iframe;

  // the entire logic
  that.createBrowser().loadUrl();

}

Browser.prototype.createBrowser = function () {
  var that = this;

  var ctrls, ctrlBtn, previous, next, bar, address, reload, content, thewebsite;

  //    empty the original
  while (that.elem.firstChild) {
    that.elem.removeChild(that.elem.firstChild);
  }

  //    The ctrls
  ctrls = document.createElement("div");
  ctrls.className += " ctrls";

  ctrlBtn = document.createElement("div");
  ctrlBtn.className += " ctrl-btn";
  ctrls.appendChild(ctrlBtn);

  previous = document.createElement("div");
  next = document.createElement("div");
  previous.className += " previous";
  next.className += " next";
  ctrlBtn.appendChild(previous);
  ctrlBtn.appendChild(next);


  bar = document.createElement("div");
  bar.className += " bar";
  ctrls.appendChild(bar);

  address = document.createElement("input");
  address.className += " address";
  address.value = that.url;

  address.onkeyup = function (e) {
    clearTimeout(that.timer);
    if (e.which == 13) {
      that.url = address.value;
      that.loadUrl();
    } else {
      that.timer = setTimeout(function () {
        that.url = address.value;
        that.loadUrl();
      }, 3000);
    }
  };

  that.address_bar = address;
  bar.appendChild(address);

  reload = document.createElement("div");
  reload.className += " reload";
  reload.addEventListener("click", function () {
    that.loadUrl();
  })
  bar.appendChild(reload);

  //    content
  content = document.createElement("div");
  content.setAttribute('id', 'contentK');
  content.className += " content";

  thewebsite = document.createElement("iframe");
  thewebsite.className += " thewebsite";
  thewebsite.setAttribute('id', 'frameK');
  thewebsite.setAttribute('frameborder', 0);
  thewebsite.setAttribute('sandbox', 'allow-forms allow-modals allow-scripts');

  //    thewebsite.src = that.url; // chaining at the beginning;
  that.iframe = thewebsite;
  content.appendChild(thewebsite);

  that.elem.appendChild(ctrls);
  that.elem.appendChild(content);

  return that;
}


Browser.prototype.loadUrl = function () {
  var that = this;
  let lstPageServer = ["http://127.0.0.1:5500/index.html"];
  if (lstPageServer.indexOf(that.address_bar.value) != -1) {

    var old_element = document.getElementById("frameK");
    var new_element = old_element.cloneNode(true);
    new_element.removeAttribute("src");
    new_element.removeAttribute("sandbox");
    old_element.parentNode.replaceChild(new_element, old_element);

    const css = myCodeMirrorCSS.getValue();
    const js = myCodeMirrorJS.getValue();
    let html = myCodeMirrorHTML.getValue();
    html = addToHTML(html, css, js);
    var previewFrame = document.getElementById('frameK');
    var preview = previewFrame.contentDocument || previewFrame.contentWindow.document;
    preview.open();
    preview.write(html);
    preview.close();
  } else {
    that.iframe.src = that.address_bar.value;

  }
}

function addToHTML(aHtml, aCss, aJs) {
  const regJs = new RegExp(/(<script)\s+src\s?=\s?".\/js\/main.js"\s?>\s?<\/script>/, 'gim');
  let result = aHtml.replace(regJs, "<\script>" + aJs + "<\/script>");
  console.log(result);
  const regCss = new RegExp(/<link\s+(rel(\s?)+=(\s?)+"(\s?)+stylesheet(\s?)+"\s|type(\s?)+=(\s?)+"(\s?)+text\/css(\s?)+"\s)?(\s?)+(rel(\s?)+=(\s?)+"(\s?)+stylesheet(\s?)+"\s|type(\s?)+=(\s?)+"(\s?)+text\/css(\s?)+"\s)?(\s?)+href(\s?)+=(\s?)+"(\s?)+.\/css\/style.css(\s?)+"(\s?)+(rel(\s?)+=(\s?)+"(\s?)+stylesheet(\s?)+"\s|type(\s?)+=(\s?)+"(\s?)+text\/css(\s?)+"\s)?(\s?)+(rel(\s?)+=(\s?)+"(\s?)+stylesheet(\s?)+"|type(\s?)+=(\s?)+"(\s?)+text\/css(\s?)+")?(\s?)+>/, 'gim');

  result = result.replace(regCss, "<style>" + aCss + "</style>");
  console.log(result);

  return result;
}

function arret_du_générateur_d_improbabilité_infinie() {
  console.log("arret");
  document.getElementById("pages").style.display = "";
  document.getElementById("lastDivStanding").style.display = "none";
  document.getElementById("hearth_of_gold").src = "";
}

function lancement_du_générateur_d_improbabilité_infinie() {
  console.log("lancement");
  document.getElementById("pages").style.display = "none";
  document.getElementById("lastDivStanding").style.display = "";
  document.getElementById("hearth_of_gold").src = "https://abonvalle.github.io/infinite-improbability-drive/";
}

function load_treeview_events() {
  document.querySelectorAll(".treeview_elem").forEach(function (anElem) {
    anElem.addEventListener("mousedown", treeview_elem_mousedown, false);
  });
}

function treeview_elem_mousedown(e) {
  console.log(e.currentTarget);
  e.stopPropagation();
  const node = e.currentTarget;
  document.querySelectorAll(".treeview_elem_clicked,.treeview_elem_selected").forEach(function (anElem) {
    anElem.classList.remove("treeview_elem_clicked", "treeview_elem_selected");
  });
  node.classList.add("treeview_elem_clicked", "treeview_elem_selected");
  document.addEventListener("mousedown", declick_treeview_elem, false);
}

function declick_treeview_elem(e) {
  document.querySelectorAll(".treeview_elem_clicked,.treeview_elem_selected").forEach(function (anElem) {
    anElem.classList.remove("treeview_elem_clicked");
  });
  document.removeEventListener("mousedown", declick_treeview_elem, false);
}