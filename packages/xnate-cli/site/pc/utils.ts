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

export const getRouteList = (baseRoute = [], menu = {}, navs = []) => {
  const routeMap = navs.filter((n) => n.index).map((m) => m.path);
  const configRoute = [];

  routeMap.forEach((route) => {
    const path = route.replace('/', '');
    const routeList = menu[path] ?? [];
    const firstRoute = routeList.shift();
    let redirect = route.path;
    if (firstRoute) {
      redirect = firstRoute.children ? firstRoute.children[0].path : firstRoute.path;
    }
    configRoute.push({
      path: route,
      redirect: redirect,
    });
  });

  console.log(configRoute);
};
