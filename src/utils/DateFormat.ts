import Firebase from 'firebase'

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

const DateFormat = (firebaseDate: Firebase.firestore.Timestamp): string => {
  const date = firebaseDate.toDate()
  const month = date.getMonth()
  const day = date.getDate()
  const year = date.getFullYear()
  const format = `${day} ${indonesianMonth[month]} ${year}`
  return format
}

export default DateFormat
