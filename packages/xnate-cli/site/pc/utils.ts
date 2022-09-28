export enum MenuType {
  TITLE = 1,
  COMPONENT = 2,
  DOCUMENT = 3,
}

export interface IPCLocationInfo {
  language?: string;
  navName?: string;
  secondName?: string;
}

export const getPCLocationInfo = (): IPCLocationInfo => {
  const [, language, navName, secondName] = window.location.pathname.split('/');
  return {
    language,
    navName,
    secondName,
  };
};
