document.write(
    `<style>
    .tet_top_left img,
    .tet_bottom_right img {
        width: 100%;
        height: auto;
    }
    .tet_top_left,
    .tet_bottom_left {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 99;
        width: 191px;
        pointer-events: none;
    }
    .tet_bottom_left {
        top: auto;
        bottom: 0;
        left: 0;
        width: 191px;
    }
    .tet_bottom_right {
        position: fixed;
        bottom: 0;
        right: 0;
        z-index: 99;
        width: 191px;
        pointer-events: none;
    }
    @media (max-width: 1331px) {
        .tet_top_left,
        .tet_bottom_right,
        .tet_bottom_left {
            display: none !important;
        }
    }
    </style>
    <div class="tet_top_left"><img src="https://lucthienphong1120.github.io/cdn/images/animation-rain/canhdao.png"/></div>
    <div class="tet_bottom_right"><img src="https://lucthienphong1120.github.io/cdn/images/animation-rain/lan.gif"/></div>
    <div class="tet_bottom_left"><img src="https://lucthienphong1120.github.io/cdn/images/animation-rain/banhtrung.png"/></div>
`);


var number = 20;
if (matchMedia('only screen and (max-width: 767px)').matches) {
    number = 10
}
let img = 'https://lucthienphong1120.github.io/cdn/images/animation-rain/dao-icon.png';
var hideTime = 0;
var distance = 'windowheight'; // windowheight or pageheight;
var ie4up = (document.all) ? 1 : 0;
var ns6up = (document.getElementById && !document.all) ? 1 : 0;

function iecompattest() {
    return (document.compatMode && document.compatMode != 'BackCompat') ? document.documentElement : document.body
}

var dx, xp, yp;
var am, stx, sty;
var i, docWidth = 800, docHeight = 600;
if (ns6up) {
    docWidth = self.innerWidth;
    docHeight = self.innerHeight
} else if (ie4up) {
    docWidth = iecompattest().clientWidth;
    docHeight = iecompattest().clientHeight
}
dx = new Array();
xp = new Array();
yp = new Array();
am = new Array();
stx = new Array();
sty = new Array();
for (i = 0; i < number; ++i) {
    dx[i] = 0;
    xp[i] = Math.random() * (docWidth - 50);
    yp[i] = Math.random() * docHeight;
    am[i] = Math.random() * 20;
    stx[i] = 0.02 + Math.random() / 10;
    sty[i] = 0.7 + Math.random();
    if (ie4up || ns6up) {
        document.write(
            `<div id="dot${i}" style="position:fixed; z-index: ${99+i}; visibility:visible; top:15px; left:15px; pointer-events: none; width:15px">
                <span style="font-size:18px;">
                    <img src="${img}" width="20px">
                </span>
            </div>`
        );
    }
}

function TetIE_NS6() {
    docWidth = ns6up ? window.innerWidth - 10 : iecompattest().clientWidth - 10;
    docHeight = (window.innerHeight && distance == 'windowheight') ? window.innerHeight : (ie4up && distance == 'windowheight') ? iecompattest().clientHeight : (ie4up && !window.opera && distance == 'pageheight') ? iecompattest().scrollHeight : iecompattest().offsetHeight;
    for (i = 0; i < number; ++i) {
        yp[i] += sty[i];
        if (yp[i] > docHeight - 50) {
            xp[i] = Math.random() * (docWidth - am[i] - 30);
            yp[i] = 0;
            stx[i] = 0.02 + Math.random() / 10;
            sty[i] = 0.7 + Math.random()
        }
        dx[i] += stx[i];
        document.getElementById('dot' + i).style.top = yp[i] + 'px';
        document.getElementById('dot' + i).style.left = xp[i] + am[i] * Math.sin(dx[i]) + 'px'
    }
    timer = setTimeout('TetIE_NS6()', 10)
}

function hidesnow() {
    if (window.timer) {
        clearTimeout(timer)
    }
    for (i = 0; i < number; i++) document.getElementById('dot' + i).style.visibility = 'hidden'
}

if (ie4up || ns6up) {
    TetIE_NS6();
    if (hideTime > 0) setTimeout('hidesnow()', hideTime * 1000)
}
