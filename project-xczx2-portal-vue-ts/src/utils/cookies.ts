import Cookies from 'js-cookie'

// domain
const domain = process.env.VUE_APP_SERVER_DOMAIN

// App
const sidebarStatusKey = 'sidebar_status'
export const getSidebarStatus = () => Cookies.get(sidebarStatusKey)
export const setSidebarStatus = (sidebarStatus: string) =>
  Cookies.set(sidebarStatusKey, sidebarStatus)

// Token
const tokenKey = 'jwt'
export const getToken = () => Cookies.get(tokenKey)
export const setToken = (token: string) => {
  if (domain) {
    Cookies.set(tokenKey, token, {
      domain: domain
    })
  } else {
    Cookies.set(tokenKey, token)
  }
}
export const removeToken = () => {
  if (domain) {
    Cookies.remove(tokenKey, { domain: domain })
  } else {
    Cookies.remove(tokenKey)
  }
}

// Name
const nameKey = 'portal_access_name'
export const getName = () => Cookies.get(nameKey)
export const setName = (name: string) => {
  if (domain) {
    Cookies.set(nameKey, name, {
      domain: domain
    })
  } else {
    Cookies.set(nameKey, name)
  }
}
export const removeName = () => {
  if (domain) {
    Cookies.remove(nameKey, { domain: domain })
  } else {
    Cookies.remove(nameKey)
  }
}
