export enum MenuType {
  TITLE = 1,
  COMPONENT = 2,
  DOCUMENT = 3,
}

export interface IPCLocationInfo {
  language: string
  navName: string
}

export const getPCLocationInfo = (): IPCLocationInfo => {
  const [, language, navName] = window.location.pathname.split('/')
  return {
    language,
    navName,
  }
}
