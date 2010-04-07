/*global $, Drupal, goog */
"use strict";
goog.require('goog.i18n.bidi');
goog.require('goog.dom.Range');
goog.require('goog.dom.selection');

Drupal.behaviors.bidiRtlButtons = function (context) {
  var $body, makeSwitcher;

  makeSwitcher = function (element, direction) {
    return function () {
      var method, selection, text;

      method = 'enforce' + direction + 'InText';

      selection = goog.dom.selection.getText(element);
      text = goog.i18n.bidi[method](selection);
      goog.dom.selection.setText(element, text);

      return false;
    };
  };

  $body = $('#edit-body-wrapper', context);

  $body
    .prepend(
      $('<button>RTL</button>').click(makeSwitcher($('#edit-body')[0], 'Rtl'))
    )
    .prepend(
      $('<button>LTR</button>').click(makeSwitcher($('#edit-body')[0], 'Ltr'))
    );

  $('textarea', $body).each(function () {
    goog.i18n.bidi.setElementDirAndAlign(this, goog.i18n.bidi.detectRtlDirectionality($(this).val()));
  });
};
