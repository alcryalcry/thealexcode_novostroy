export const rawObject = raw => typeof raw === 'object' && raw !== null ? raw : {}

export const rawArray = raw => Array.isArray(raw) ? raw : []

export const rawArrayOfStrings = raw => Array.isArray(raw) ? raw.map(item => String(item)) : []
