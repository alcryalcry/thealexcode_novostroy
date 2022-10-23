import axios from '@/plugins/axios'
import { rawObject } from '@/utils'

export async function fetchSettings () {
  const res = await axios.get('api/homepage?populate=*')
  return rawObject(res).data
}

export async function fetchAbout () {
  const res = await axios.get('api/about?populate=*')
  return rawObject(res).data
}

export async function fetchPartners () {
  const res = await axios.get('api/partner?populate=*')
  return rawObject(res).data
}

export async function fetchProjects () {
  const res = await axios.get('api/projects?populate=*')
  return rawObject(res).data
}

export async function fetchTeam () {
  const res = await axios.get('api/team?populate=*')
  return rawObject(res).data
}

export async function sendFeedback (data) {
  const res = await axios.post('api/feedbacks', data)
  return rawObject(res)
}
