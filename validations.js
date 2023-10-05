export function emptyValidation(textElement) {
  if (textElement.value.trim() === '') return true
  else return false
}
