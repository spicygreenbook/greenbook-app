
export function getImage(path, config) {
    let path_str = '../public/' + path;
    console.log('pub path', path_str, config)
    let ret;
    //if (!config.isWeb){
        ret = require('../public/images/logo_nav_dark.png');
    //}
    return ret
}
