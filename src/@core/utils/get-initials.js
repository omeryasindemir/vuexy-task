export const getInitials = string => {
  if (typeof string !== 'string' || string.trim() === '') {
    return '' // veya başka bir değer döndürebilirsiniz
  }
  return string.split(/\s/).reduce((response, word) => (response += word.slice(0, 1)), '')
}
