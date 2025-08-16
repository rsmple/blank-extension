export const getIsDark = (): boolean => {
  return true
}

export const appendDarkMode = () => {
  if (getIsDark()) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
