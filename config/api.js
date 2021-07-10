import axios from '@/plugins/axios'
import { API_ROUTES } from '@/config/constants'
import { rawObject } from '@/utils'

export async function fetchSettings () {
  const res = await axios.get(API_ROUTES.settings)
  return rawObject(res).data
}

export async function fetchAbout () {
  const res = await axios.get(API_ROUTES.about)
  return rawObject(res).data
}

export async function fetchPartners () {
  const res = await axios.get(API_ROUTES.partners)
  return rawObject(res).data
}

export async function fetchProjects () {
  const res = await axios.get(API_ROUTES.projects)
  return rawObject(res).data
}

export async function fetchTeam () {
  const res = await axios.get(API_ROUTES.team)
  return rawObject(res).data
}
