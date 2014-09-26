var pi2 = Math.PI * 2;
var interval = 10;
var initialized = false;
var running = false;
var elementList = [];
var elementIndex = 0;

function init() {
    var tagNameList = ['div', 'img', "section", "ul", "ol", "li", "article", "footer", "p", "span", "h1", "h2", "h3", "table" ];
    for (var i = 0; i < tagNameList.length; ++i) {
        var nodeList = document.getElementsByTagName(tagNameList[i]);
        var nodeNum = nodeList.length;
        for (var j = 0; j < nodeNum; ++j) {
            var elem = nodeList[j];
            if (elem.style.display !== 'none'
                && elem.style.visibility !== 'hidden') {
                if (elem.style.position === 'static') {
                    elem.style.position = 'relative';
                }
                var ox = (elem.style.left === "" || elem.style.left === "auto") ? 0 : parseInt(elem.style.left);
                var oy = (elem.style.top === "" || elem.style.top === "auto") ? 0 : parseInt(elem.style.top);
                elementList.push({
                    "elem": elem,
                    "angle": 0,
                    "ox": ox,
                    "oy": oy,
                    "angleDelta": Math.PI / (Math.random() * 10 + 150),
                    "amplitude": Math.random() * 10 + 2,
                    "wait": Math.floor(Math.random() * 50)
                });
            }
        }
    }

    initialized = true;
}

function toggleFluctuations() {
    if (!initialized) {
        init();
    }

    running = !running;

    runFluctuations();
}

function runFluctuations() {
    if (elementList.length < 1) {
        running = false;
    }

    if (!running) return;

    for (var i = 0; i < elementList.length; ++i) {
        elem = elementList[i];

        if (elem.wait > 0) {
            elem.wait -= 1;
        } else {
            elem.angle += elem.angleDelta;
            if (elem.angle > pi2) {
                elem.angle = 0;
            }

            offsetX = elem.ox + Math.floor(Math.sin(elem.angle) * elem.amplitude);
            elem.elem.style.left = offsetX + "px";
        }
    }

    setTimeout(runFluctuations, interval);
}

