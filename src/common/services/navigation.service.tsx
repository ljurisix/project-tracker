let _navigator: any;

function setTopLevelNavigator(navigatorRef: any) {
  _navigator = navigatorRef;
}

function navigate(route: string) {
  _navigator.history.push(route);
}

export default {
  navigate,
  setTopLevelNavigator,
};
