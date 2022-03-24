// ==UserScript==
// @name         FLoatClipBoard
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Make a floating button for using clipboard easily.
// @author       MiyaMya
// @include      /www.google.com
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @icon         data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAArdJREFUeNqMU11IFFEYPXdmd9RdVzd1FbayMjOyiMAgFPPFIgJ7CCqiXiJffAiCEIwInwqKoF7Deooso58tCpRCCCwyC/xBTawtKU3Xv3X/3N2Z3b19946jPnaHOzPc+33nfOe75zLOOVp8gSe+/sgpZ5aC/x2LsTRaGzxX1WBl0+uByWSNnuK5CmMgPGTEpFfG+qfJwegBGDMBbCpDIJzewipav/MsmwKVyI00h502ju114fT+fAqCyJRJD3pD8A2EIUhErFgjUrB91/xcIKaJprTAjpYjRThY7iAwq1hBz5Chb+/POG68ncdU0CAQsxSbDKEYd46Km8dLsNubhYTBJYMsl5IZo8oooa7CAYdWjKZHf4nQ3FdWOLCZ2MuLNcQpOcW51KuRHM1mEvjndAxPJVCYq6J2u0P2RYzVttdS2Xe6FySqRmwxPYPLvgCanwUwG0mj58cyLnTM4NLTaRza5YRBCAJ4FWBboR0vByLoGokRK8O9niV89MfROxFH24cgqstyZANHpnV43Xacr86Hx6WuAQhNgvU+BU8uGlJSXo4CF3nD41TlPmQvgIVoCkNTupRrswB+U1JduROvBiPU6QXcPlGCTRtsCMczOLonF9c75/FrzkCZR0OSjq//T0Ie82oFXaNRnKzKgyub4d23KJqfB2RFO0o0vB9fRudwlHQD56rdeDMUNb1gNVEc6cS8QZqX0Xy4SJqpcziGlhez6B6L4uHnJYzNJNFY44ZOZvtEfbEcqayzC9r7QpgJp3D3rBdnDuShfqfDdBsFtzduRAEdYVtPUMav5K/1QFXM5Y6vIamvgXRXep1IEEABNfHxlxAGJ5MQl89yoczYemWci1soTLPiDfPycKsuE9hyppUq/oVjlYv1hbfKijS/0GYNQSAqEkzmNNfYuuuc0DmqSrP7/gkwANB3JDPWOgUeAAAAAElFTkSuQmCC
// @grant        GM_addStyle
// ==/UserScript==

(function () {
    'use strict';
    console.log($);
    GM_addStyle(`
    ul.navigation{
    z-index:99;
    position:fixed;
    left:10%; /* 調整左右 */
    top:88%; /* 調整上下 */
    }
    ul.navigation li {
        float:left;
        position: relative;
        list-style: none;
    }

    ul.navigation li a {
        display: block;
        padding: 5px 5px;
        text-decoration: none;
    }

    ul.navigation>li>a {
        border-bottom: 1px solid #CCC;
        border-left: 1px solid #CCC;
    }

    ul.navigation>li>a:hover {
        color: #666;
        background: #DDD;
    }

    ul.navigation li a:hover {
        color: #666;
        background: #DDD;
    }

    ul.navigation li ul {
        display: none;
        float: left;
        position: absolute;
        margin: 0;
        padding: 0;
        bottom:0%;
        left:100%;
    }

    ul.navigation li:hover>ul {
        display: block;
    }

    ul.navigation ul li {
        border-bottom: 1px solid #DDD;
    }

    ul.navigation ul li:last-child {
        border-bottom: none;
    }

    ul.navigation ul a {
        width: 200px;
        padding: 15px 15px;
        color: #666;
        background: #EEE;
    }

    ul.navigation ul a:hover {
        background: #CCC;
    }

    ul.navigation ul li:hover>ul {
        display: block;
        position: absolute;
        bottom: 0;
        left: 100%;
    }
    .arrow-bottom{
        display:inline-block;
        margin-left: 5px;
        margin-bottom:2.5px;
        border-bottom: 4px solid #000;
        border-right: 4px solid transparent;
        border-left: 4px solid transparent;
        width: 1px;
        height: 1px;
    }
    .arrow-right{
        display:inline-block;
        margin-left: 12px;
        border-top: 3px solid transparent;
        border-bottom: 3px solid transparent;
        border-left: 3px solid #666;
        width: 1px;
        height: 1px;
    }
    `);
    let CS = {
        "name": "CS", //標籤名字
        "content": [{
            "name": "標籤1",
            "content": [
                `內容1-1`,
                `內容1-2`
            ],
        },
        {
            "name": "標籤2",
            "content": [
                `內容2-1`,
            ]
        },
        ],
    };
    let element = $(document.createElement('ul'));
    element.addClass('navigation');
    let firstli = $(document.createElement('li'));
    firstli.append(`<a href="#" onclick="return false;">${CS.name}</a>`);
    let firstul = $(document.createElement('ul'));
    CS.content.forEach(e => {
        let str = "";
        str += `
				<li><a href="#" onclick="return false;">${e.name}</a>
					<ul>`;
        e.content.forEach(c => {
            str += `<li class="clickEvClass"><a href="#" onclick="return false;">${c}</a></li>`;
        });
        str += `
					</ul>
				</li>`;
        firstul.append(str);
    });
    firstli.append(firstul);
    element.append(firstli);
    if ($(`body`).length != 0) {
        $(`body`).append(element);
        $("ul.navigation > li:has(ul) > a").append(`<div class="arrow-bottom"></div>`);
        $("ul.navigation > li ul li:has(ul) > a").append(`<div class="arrow-right"></div>`);
        $(".clickEvClass").click(clipEvent);
        clearInterval(detectiveTimer);
    }

    function clipEvent() {
        var copyFrom = document.createElement("textarea");
        var text = $(this).text();
        copyFrom.textContent = text;
        document.body.appendChild(copyFrom);
        copyFrom.select();
        document.execCommand('copy');
        copyFrom.blur();
        document.body.removeChild(copyFrom);
    }
})();