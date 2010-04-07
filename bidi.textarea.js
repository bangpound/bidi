/*global $, Drupal, goog */
"use strict";
goog.require('goog.i18n.bidi');

Drupal.behaviors.bidiTextarea = function (context) {
  var $body;
  
  $body = $('#edit-body-wrapper', context);

  $('textarea', $body).each(function () {
    goog.i18n.bidi.setElementDirAndAlign(this, goog.i18n.bidi.detectRtlDirectionality($(this).val()));
  });
};
