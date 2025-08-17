export function getScrollbarWidth(): number {
  return window.innerWidth - document.documentElement.clientWidth
}

export const appendScrollbarStyles = (): void => {
  const width = getScrollbarWidth()

  if (width > 0) {
    document.documentElement.classList.add('w-scrollbar')
  } else {
    document.documentElement.classList.remove('w-scrollbar')
  }

  setTimeout(() => {
    document.documentElement.style.setProperty('--scroll-bar-width', getScrollbarWidth() + 'px')
    document.documentElement.style.minHeight = '100%'
  }, 10)
}
