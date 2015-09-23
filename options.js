// Copyright (c) 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

/**
 * @namespace
 */
var jazzChromeExtension = {};

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
    //if (jazzChromeExtension.validateURL(jazzChromeExtension.jazzServerURL)) {
      localStorage.jazzServerURL = $('jazz-url').value;
      alert("The URL was saved!");
    //} else {
    //  alert("Please enter a valid URL");
    //}
  };
};

jazzChromeExtension.validateURL = function(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  if (!pattern.test(str)) {
    return false;
  } else {
    return true;
  }
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
