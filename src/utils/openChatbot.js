// The chat widget is BotPenguin, loaded by the <script id="messenger-widget-b">
// tag in index.html. Once its iframe boots it exposes
// window.BotPenguinWindow(action, 'BotPenguin') — the second argument is a
// literal the widget checks, without it the call silently no-ops.
//
// A mounted iframe is NOT the same as a ready one: opening posts a "start"
// message into the iframe, and if the inner app hasn't attached its listener
// yet the message is dropped and the user gets an empty chat window. The widget
// un-hides its own launcher bubble at exactly the moment the iframe reports
// back as rendered, so the launcher's visibility is the readiness signal.

const IFRAME_ID = 'BotPenguin-messenger';
const LAUNCHER_ID = 'botpenguin-launcher-12';
const POLL_INTERVAL = 100;
const MAX_WAIT = 2000;

function isChatbotReady() {
  if (typeof window.BotPenguinWindow !== 'function') return false;
  if (!document.getElementById(IFRAME_ID)) return false;

  const launcher = document.getElementById(LAUNCHER_ID);
  if (!launcher) return false;

  return window.getComputedStyle(launcher).visibility === 'visible';
}

function tryOpenChatbot() {
  if (!isChatbotReady()) return false;

  // Every BotPenguin method dereferences getElementById() unguarded, so a
  // half-torn-down widget throws rather than returning false.
  try {
    // Re-opening an already open window re-posts "start" and resets the chat.
    if (window.BotPenguin && new window.BotPenguin().isWindowOpen()) return true;

    window.BotPenguinWindow('open', 'BotPenguin');
    return true;
  } catch {
    return false;
  }
}

// Fallback for when the widget never loads (ad blockers, or the bot's own
// per-device / per-URL visibility rules). Mirrors the Lenis-then-native scroll
// used by the header nav so the motion matches the rest of the site.
function scrollToContact() {
  const targetEl = document.querySelector('#contact');
  if (!targetEl) return;

  const headerEl = document.querySelector('header');
  const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 80;

  if (window.lenis) {
    window.lenis.scrollTo(targetEl, { offset: -headerHeight, duration: 1.4 });
    return;
  }

  window.scrollTo({
    top: targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight,
    behavior: 'smooth'
  });
}

/**
 * Opens the chatbot window. Waits briefly for a still-booting widget, then
 * gives up and scrolls to the contact section instead — a click that does
 * nothing visible for seconds reads as broken.
 */
export default function openChatbot(e) {
  if (e) e.preventDefault();

  if (tryOpenChatbot()) return;

  const startedAt = Date.now();
  const timer = setInterval(() => {
    if (tryOpenChatbot()) {
      clearInterval(timer);
      return;
    }
    if (Date.now() - startedAt >= MAX_WAIT) {
      clearInterval(timer);
      scrollToContact();
    }
  }, POLL_INTERVAL);
}
