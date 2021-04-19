import firebase from '@/utils/Firebase'

const indonesianMonth = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
]

const appendZero = (val: number): string =>
  val < 10 ? `0${val}` : val.toString()

const DateToInputValueHTML = (date: Date): string => {
  const month = date.getMonth() + 1
  const day = date.getDate()
  const year = date.getFullYear()
  return `${year}-${appendZero(month)}-${appendZero(day)}`
}

const HeadingDateFormat = (
  firebaseDate: firebase.firestore.Timestamp
): string => {
  const date = firebaseDate.toDate()
  const month = date.getMonth()
  const day = date.getDate()
  const year = date.getFullYear()
  const format = `${day} ${indonesianMonth[month]} ${year}`
  return format
}

const generateFirebaseTimestampNow = (): firebase.firestore.Timestamp =>
  new firebase.firestore.Timestamp(new Date().getTime() / 1000, 0)

const DateToFirebase = (date: Date): firebase.firestore.Timestamp =>
  new firebase.firestore.Timestamp(date.getTime() / 1000, 0)

export {
  DateToInputValueHTML,
  HeadingDateFormat,
  generateFirebaseTimestampNow,
  DateToFirebase,
}
