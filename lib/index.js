/* jshint browser: true */

var eevee = require('eevee')
var query = require('query')
var tap = require('tap-event')
var keyname = require('keyname')
var classes = require('classes')
var closest = require('closest')
var clickable = require('clickable')
var matches = require('matches-selector')

exports = module.exports = require('emitter')()
exports.position = positionDropdown
exports.open = openDropdown
exports.close = closeDropdown
exports.clear = clearMenus

document.addEventListener('click', onclick, false)
document.addEventListener('touchstart', tap(onclick), false)
document.addEventListener('focus', clearAllMenus, true)

document.addEventListener('keyup', function (e) {
  switch (keyname(e.which)) {
    case 'esc': return clearMenus()
  }
}, false)

eevee(document)
.on('click touchstart', '.Dropdown-toggle', function (e) {
  e.preventDefault()
  e.stopPropagation()

  var dropdown = closest(this, '.Dropdown')
  var c_dropdown = classes(dropdown)
  var activate = !c_dropdown.has('open')

  // just clear all the menus
  if (!activate) return clearMenus()

  // clear all menus but this one
  clearMenus(dropdown)
  // open this one
  openDropdown(dropdown)
})

function onclick(e) {
  if (!clickable(e)) return
  clearAllMenus(e)
}

/**
 * Clear all menus whenever a click or tap event occurs,
 * but don't clear the current one.
 */

function clearAllMenus(e) {
  var target = e.target
  var dropdown
  if (matches(target, '.Dropdown.open, .Dropdown.open *')) {
    dropdown = closest(target, '.Dropdown', true)
  }
  clearMenus(dropdown)
}

/**
 * Clear all menus except `except`.
 */

function clearMenus(except) {
  var dropdowns = query.all('.Dropdown.open')
  var dropdown
  for (var i = 0; i < dropdowns.length; i++) {
    dropdown = dropdowns[i]
    if (dropdown !== except) closeDropdown(dropdown)
  }
}

/**
 * Position a menu.
 */

function positionDropdown(dropdown) {
  var c_dropdown = classes(dropdown)
  var rect = dropdown.getBoundingClientRect()
  var d_width = dropdown.offsetWidth
  // var d_height = dropdown.offsetHeight
  var menu = query('.Dropdown-menu', dropdown)
  var m_width = menu.offsetWidth
  var m_height = menu.offsetHeight
  var pos_x = 'left' // left-justified by default
  var pos_y = 'down' // drop down by default
  // calculate pos_x only if the menu is larger than .Dropdown
  if (d_width < m_width) {
    var w_width = window.innerWidth
    if (m_width - d_width > w_width - rect.right) pos_x = 'right'
  }
  // calculate pos_y
  var w_height = window.innerHeight
  if (m_height > w_height - rect.bottom) pos_y = 'up'
  c_dropdown
    .add(pos_x)
    .add(pos_y)
    .remove(pos_x === 'left' ? 'right' : 'left')
    .remove(pos_y === 'down' ? 'up' : 'down')
  return dropdown
}

/**
 * Open a menu.
 */

function openDropdown(dropdown) {
  var c_dropdown = classes(dropdown)
  if (c_dropdown.has('open')) return
  positionDropdown(dropdown)
  c_dropdown.add('open')
  exports.emit('open', dropdown)
  return dropdown
}

function closeDropdown(dropdown) {
  classes(dropdown).remove('open')
  exports.emit('close', dropdown)
  return dropdown
}