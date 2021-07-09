export const rawObject = raw => typeof raw === 'object' && raw !== null ? raw : {}

export const rawArray = raw => Array.isArray(raw) ? raw : []

export const rawArrayOfStrings = raw => Array.isArray(raw) ? raw.map(item => String(item)) : []

export class AppModel {
  static createFromRaw () {
    return Object.assign(new this(), {})
  }

  static createListFromRaw (rawList) {
    return rawArray(rawList).map(item => this.createFromRaw(item))
  }
}
