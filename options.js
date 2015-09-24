// Copyright (c) 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

/**
 * @namespace
 */
var jazzChromeExtension = {};

var RE_WEBURL = new RegExp(
  "^" +
  // protocol identifier
  "(?:(?:https?|ftp)://)" +
  // user:pass authentication
  "(?:\\S+(?::\\S*)?@)?" +
  "(?:" +
  // IP address exclusion
  // private & local networks
  "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
  "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
  "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
  // IP address dotted notation octets
  // excludes loopback network 0.0.0.0
  // excludes reserved space >= 224.0.0.0
  // excludes network & broacast addresses
  // (first & last IP address of each class)
  "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
  "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
  "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
  "|" +
  // host name
  "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
  // domain name
  "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
  // TLD identifier
  "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
  // TLD may end with dot
  "\\.?" +
  ")" +
  // port number
  "(?::\\d{2,5})?" +
  // resource path
  "(?:[/?#]\\S*)?" +
  "$", "i"
);

function $(id) {
  return document.getElementById(id);
}

/**
 * Jazz server URL
 */
jazzChromeExtension.jazzServerURL = null;

/**
 * Initializes apply and reset buttons.
 */
jazzChromeExtension.initApplyButton = function() {
  $('apply-settings').onclick = function(event) {
    jazzChromeExtension.jazzServerURL = $('jazz-url').value;
    if ($('jazz-url').value) {
      if (jazzChromeExtension.validateURL($('jazz-url').value)) {
        localStorage.jazzServerURL = $('jazz-url').value;
        alert("The URL was saved");
      } else {
        alert("Invalid URL");
      }
    } else {
      alert("The URL cannot be empty");
    }
  };
};

jazzChromeExtension.validateURL = function(str) {
  return RE_WEBURL.test(str);
};

jazzChromeExtension.loadParams = function() {
  jazzChromeExtension.jazzServerURL = localStorage.jazzServerURL;
  try {
    if (jazzChromeExtension.jazzServerURL) {
      $('jazz-url').value = jazzChromeExtension.jazzServerURL;
    }
  } catch (e) {
    console.log(e);
  }
};

/**
 * Initializes the extension.
 */
jazzChromeExtension.init = function() {
  jazzChromeExtension.initApplyButton();
  jazzChromeExtension.loadParams();
};

document.addEventListener('DOMContentLoaded', jazzChromeExtension.init);
