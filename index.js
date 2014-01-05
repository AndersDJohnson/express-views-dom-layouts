/*
 * An HTML extends-block implementation, for use with express-views-dom.
 */

var forEach = function (list, iterator) {
  Array.prototype.forEach.call(list, iterator);
};

module.exports = function (window, done, params, callback) {
  var document = window.document;
  var root = document.documentElement;
  // if we have an extender, we're in a layout, so extend...
  if (params.extender) {
    var blocks = params.extender.querySelectorAll('block');
    forEach(blocks, function (block) {
      var forName = block.attributes.for.value;
      var _blocks = root.querySelectorAll('block[name=' + forName + ']');
      forEach(_blocks, function (_block) {
        _block.innerHTML = block.innerHTML;
      });
    });
  }
  // check if this view is an <extends>...
  var _extends = root.querySelector('body > extends');
  if (_extends) {
    var viewName = _extends.attributes.from.value;
    // set the <extends> element on params
    params.extender = _extends;
    // render the extended view (will recurse)
    done(null, viewName);
  }
  else {
    // we're done extending, so prepare for final render...
    // unwrap blocks
    forEach(root.querySelectorAll('block[name]'), function (block) {
      var nextSibling = block.nextSibling;
      var parentNode = block.parentNode;
      parentNode.removeChild(block);
      forEach(block.childNodes, function (childNode) {
        parentNode.insertBefore(childNode, nextSibling);
      });
    });

    if (callback) callback();
  }
};
