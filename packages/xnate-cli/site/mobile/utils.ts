export const getAllComponents = (menus = []) => {
  return menus
    .map((m) => {
      return m.children.map((c) => {
        c.path = c.path.replace(/\/components\//, '');
        return c;
      });
    })
    .flat();
};
