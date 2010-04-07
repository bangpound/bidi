/*global $, Drupal, goog */
"use strict";
goog.require('goog.i18n.bidi');
goog.require('goog.dom.Range');
goog.require('goog.dom.selection');

Drupal.behaviors.bidiButtons = function (context) {
  var makeSwitcher;

  makeSwitcher = function (element, direction) {
    return function () {
      var method, selection, text;

      method = 'enforce' + direction + 'InText';

      selection = goog.dom.selection.getText(element);

      if (selection.length > 0) {
        text = goog.i18n.bidi[method](selection);
      }
      else {
        text = (direction === 'Rtl') ? goog.i18n.bidi.Format.RLM : goog.i18n.bidi.Format.LRM;
      }

      goog.dom.selection.setText(element, text);

      return false;
    };
  };

  $('#edit-body-wrapper', context)
    .prepend(
      $('<button>RTL</button>').click(makeSwitcher($('#edit-body')[0], 'Rtl'))
    )
    .prepend(
      $('<button>LTR</button>').click(makeSwitcher($('#edit-body')[0], 'Ltr'))
    );
};
