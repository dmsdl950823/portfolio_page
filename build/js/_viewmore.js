(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";function jsonLoad(){var n=new XMLHttpRequest;n.onreadystatechange=function(){if(4===this.readyState&&200===this.status)try{jsonapplier(JSON.parse(this.responseText),parseInt(window.location.hash.replace("#","")),decodeURI(window.location.hash).split("#")[2])}catch(n){console.log(n)}},n.open("GET","../json/works.json",!0),n.send()}function jsonapplier(n,s,a){var t=s;console.log(n),document.getElementById("subTitle").innerHTML=a;var i=window.matchMedia("(max-width: 375px)").matches,c=n.filter(function(n){return n.work_type===t});$(document).ready(function(){$(".slider-for").slick({slidesToShow:1,slidesToScroll:1,arrows:!1,fade:!0,asNavFor:".slider-nav"}),$(".slider-nav").slick({slidesToShow:3,slidesToScroll:1,asNavFor:".slider-for",dots:i,centerMode:!0,focusOnSelect:!0});c.map(function(n){var s;s="Web Page"===a?'\n                    <div class="dataContribution_wrap">\n                        <div class="data_contribution">\n                            <p>\n                                <strong>Participation</strong>\n                                <span>\n                                    '.concat(n.participate,' %\n                                    <small class="g_back">\n                                        <i class="graph" style="width: ').concat(n.design,'%"></i>\n                                    </small>\n                                </span>\n                            </p>\n                            <p>\n                                <strong>Coding</strong>\n                                <span>\n                                    ').concat(n.coding,' %\n                                    <small class="g_back">\n                                        <i class="graph" style="width: ').concat(n.design,'%"></i>\n                                    </small>\n                                </span>\n                            </p>\n                            <p>\n                                <strong>Design</strong>\n                                <span>\n                                    ').concat(n.design,' %\n                                    <small class="g_back">\n                                        <i class="graph" style="width: ').concat(n.design,'%"></i>\n                                    </small>\n                                </span>\n                            </p>\n                        </div>\n                        <div class="desc_brwz_wrap">\n                            <p class="data_desc">').concat(n.description_eng,'</p>\n                            <div class="browzer">\n                                <strong>CrossBrowser</strong>\n                                <ul>\n                                    ').concat(function(){var s=[];if(null!==n.browser){for(var a=n.browser.split(", "),t=0;t<a.length;t++)s.push("<li>".concat(a[t],"</li>"));return s.toString().replace(/,/g,"")}}(),"\n                                </ul>\n                            </div>\n                        </div>\n                    </div>"):'\n                    <div class="dataContribution_wrap">\n                        <div class="data_contribution __data_contribution">\n                            <p>\n                                <strong>Participation</strong>\n                                <span>\n                                    '.concat(n.participate,'%\n                                    <small class="g_back">\n                                        <i class="graph" style="width: ').concat(n.design,'%"></i>\n                                    </small>\n                                </span>\n                            </p>\n                            <p>\n                                <strong>Design</strong>\n                                <span>\n                                    ').concat(n.design,' %\n                                    <small class="g_back">\n                                        <i class="graph" style="width: ').concat(n.design,'%"></i>\n                                    </small>\n                                </span>\n                            </p>\n                        </div>\n                        <div class="desc_brwz_wrap __desc_brwz_wrap">\n                            <p class="__data_desc">').concat(n.description_eng,"</p>\n                        </div>\n                    </div>");var t='<div>\n                                    <a href="'.concat(n.href,'" class="page_anchor" target="_blank">\n                                        <img src="../images/').concat(n.img_src,'" alt=').concat(n.id,' />\n                                    </a>\n                                    <h3 class="largeTitle">').concat(n.title,'</h3>\n                                    <h4 class="dataSubTit">').concat(n.subtitle,"</h4>\n                                    ").concat(s,"\n                                </div>"),i='<div \n                                    style="\n                                    background: url(../images/'.concat(n.img_src,') center center / contain no-repeat;\n                                    ">\n                                    <img src="../images/width_image.jpg" style="opacity: 0"/>\n                                    <p class="smallTitle"><span>').concat(n.title,"</span></p>\n                                </div>");$(".slider-for").slick("slickAdd",t),$(".slider-nav").slick("slickAdd",i)})})}jsonLoad();

},{}]},{},[1]);
