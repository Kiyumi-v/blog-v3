const whiteList = new Set();
whiteList.add('/login');
whiteList.add('/');
whiteList.add('403');
whiteList.add('404');

export default whiteList;
