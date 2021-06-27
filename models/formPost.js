import { rawObject } from './_utils'

export default function (raw = {}) {
  const {
    name = '',
    phone = '',
    email = ''
  } = rawObject(raw)

  return {
    name,
    email,
    phone
  }
}
