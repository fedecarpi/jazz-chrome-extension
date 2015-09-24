// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var ACTION = "action";
var ACTION_WORK_ITEM_SEARCH = "com.ibm.team.workitem.search";
var SEARCH_QUERY_PARAM = "q";
var ACTION_VIEW_WORK_ITEM = "com.ibm.team.workitem.viewWorkItem";
var WORK_ITEM_ID_PARAM = "id";

function $(id) {
  return document.getElementById(id);
}

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });
};

document.addEventListener('DOMContentLoaded', function() {
  $('submit-query').onclick = function(event) {
    if (localStorage.jazzServerURL) {
      var q = $("query").value;
      var url = null;
      //Free text search
      if (isNaN(q)) {
        url = localStorage.jazzServerURL + "#" + ACTION + "=" + ACTION_WORK_ITEM_SEARCH + "&" + SEARCH_QUERY_PARAM + "=" + q;
      } else {
        //Work item ID search
        url = localStorage.jazzServerURL + "#" + ACTION + "=" + ACTION_VIEW_WORK_ITEM + "&" + WORK_ITEM_ID_PARAM + "=" + q;
      }
      chrome.tabs.create({
        'url': url
      });
    } else {
      alert("Please go to options and set the jazz server URL");
    }
  };

  $('query').onkeydown = function(event) {
    if (event.keyCode == 13) {
      $('submit-query').click();
    }
  };

});
