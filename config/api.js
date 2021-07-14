import axios from '@/plugins/axios'
import { ApiRoutes } from '@/config/constants'
import { rawObject } from '@/utils'

export async function fetchSettings () {
  const res = await axios.get(ApiRoutes.Settings)
  return rawObject(res).data
}

export async function fetchAbout () {
  const res = await axios.get(ApiRoutes.About)
  return rawObject(res).data
}

export async function fetchPartners () {
  const res = await axios.get(ApiRoutes.Partners)
  return rawObject(res).data
}

export async function fetchProjects () {
  const res = await axios.get(ApiRoutes.Projects)
  return rawObject(res).data
}

export async function fetchTeam () {
  const res = await axios.get(ApiRoutes.Team)
  return rawObject(res).data
}
