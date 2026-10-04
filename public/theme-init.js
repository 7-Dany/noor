// First-visit theme fallback. Runs parser-blocking in <head>, before first
// paint, and only acts when server rendering left no theme class (no cookie
// yet). When SSR did render a class (returning visitor), this is a no-op and
// the cookie stays authoritative.
//
// Kept as a plain file (not bundled) so it stays CSP-allowlistable and
// editable as real JavaScript.
try {
  var classes = document.documentElement.classList;
  if (!classes.contains("light") && !classes.contains("dark")) {
    classes.add(
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light",
    );
  }
} catch (e) {
  // Storage/DOM unavailable: leave the default theme.
}
