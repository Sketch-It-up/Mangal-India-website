// Intro splash (change request round 2): shows the Mangal India name for about 1.4 s on the
// first page load of a browser session, then fades away to reveal the page already loading
// underneath. Markup and CSS live in index.html. The splash only appears when this script adds
// the `intro` class, and its CSS animation hides it on its own, so it can never stick on screen.
// Loaded as a plain same-origin script because the Content-Security-Policy blocks inline scripts.
;(function () {
  var root = document.documentElement
  var KEY = 'mangal-intro-seen'

  try {
    if (window.sessionStorage.getItem(KEY)) return
    window.sessionStorage.setItem(KEY, '1')
  } catch (error) {
    // Storage blocked: skip the intro rather than risk showing it on every page.
    return
  }
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  root.classList.add('intro')

  var finished = false
  function finish() {
    if (finished) return
    finished = true
    root.classList.remove('intro', 'intro-skip')
    document.removeEventListener('click', skip, true)
    document.removeEventListener('keydown', skip, true)
    var el = document.getElementById('intro')
    if (el && el.parentNode) el.parentNode.removeChild(el)
  }

  // Click, tap or any key skips: a quick fade, then remove.
  function skip(event) {
    if (finished) return
    if (event.type === 'click') {
      event.preventDefault()
      event.stopPropagation()
    }
    root.classList.add('intro-skip')
    window.setTimeout(finish, 200)
  }

  document.addEventListener('click', skip, true)
  document.addEventListener('keydown', skip, true)
  // Hard stop at 1.5 s, matching the CSS animation.
  window.setTimeout(finish, 1500)
})()
