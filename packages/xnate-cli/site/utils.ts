export const getTheme = (theme = 'XNATE_THEMES') => {};

export function isPhone() {
  return /Android|webOS|iPhone|iPod|BlackBerry|Pad/i.test(navigator.userAgent);
}

export function inIframe() {
  return window.self !== window.top;
}
