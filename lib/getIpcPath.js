
module.exports = function() {
    var p = require('path');
    var path = process.env.HOME;

    if(process.platform === 'darwin')
        path += '/Library/Puffscoin/gpuffs.ipc';

    if(process.platform === 'freebsd' ||
       process.platform === 'linux' ||
       process.platform === 'sunos')
        path += '/.puffscoin/gpuffs.ipc';

    if(process.platform === 'win32')
        path = '\\\\.\\pipe\\gpuffs.ipc';
    
    console.log('CONNECT to IPC PATH: '+ path);
    return path;
};
