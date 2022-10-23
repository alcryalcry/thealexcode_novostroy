import axios from '@/plugins/axios'
import { rawObject } from '@/utils'

export async function fetchSettings () {
  const res = await axios.get('settings')
  return rawObject(res).data
}

export async function fetchAbout () {
  const res = await axios.get('about')
  return rawObject(res).data
}

export async function fetchPartners () {
  const res = await axios.get('partners')
  return rawObject(res).data
}

export async function fetchProjects () {
  const res = await axios.get('projects')
  return rawObject(res).data
}

export async function fetchTeam () {
  const res = await axios.get('team')
  return rawObject(res).data
}

export async function sendFeedback (data) {
  const res = await axios.post('feedback', data)
  return rawObject(res)
}
