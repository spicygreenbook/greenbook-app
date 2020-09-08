/* unused because we cant do require() dynamically, inputs have to be static*/
export function getImage(path, config) {
    let path_str = '../public/' + path;
    console.log('pub path', path_str, config)
    let ret;
    //ret = require(path_str);
    return ret
}
