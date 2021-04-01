import { ValidationResult } from 'Types'

const MAX_FULLNAME = 100
const MIN_PASSWORD = 6
const MAX_PASSWORD = 16

const isContainASCII = (text: string, start: number, end: number): boolean => {
  for (let i = 0; i < text.length; i += 1) {
    const ascii = text.charCodeAt(i)
    const numberAscii = ascii >= start && ascii <= end

    if (numberAscii) return true
  }
  return false
}

const isValidFullName = (fullName: string): ValidationResult => {
  if (fullName.length >= MAX_FULLNAME) {
    return {
      errorMessage: `Maksimal ${MAX_FULLNAME} karakter`,
    }
  }

  return {
    errorMessage: '',
  }
}

const isValidEmail = (email: string): ValidationResult => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    email
  )

  if (!emailRegex) {
    return {
      errorMessage: 'Email tidak valid',
    }
  }

  return {
    errorMessage: '',
  }
}

const isValidPassword = (password: string): ValidationResult => {
  const hasNumber = isContainASCII(password, 48, 57)
  const hasLower = isContainASCII(password, 97, 122)

  if (password.length < MIN_PASSWORD) {
    return {
      errorMessage: `Minimal panjang password ${MIN_PASSWORD} karakter`,
    }
  }

  if (password.length > MAX_PASSWORD) {
    return {
      errorMessage: `Maksimal panjang password ${MAX_PASSWORD} karakter`,
    }
  }

  if (!hasLower || !hasNumber) {
    return {
      errorMessage: 'Password harus berisi angka dan huruf kecil',
    }
  }

  return {
    errorMessage: '',
  }
}

export { isValidFullName, isValidEmail, isValidPassword }
