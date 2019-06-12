var config = require('../lib/config'),
    Helpers = require('../lib/helpers'),
    assert = require('chai').assert;

// METHOD
var method = 'puffs_protocolVersion';

// TEST
var asyncTest = function(host, done){
    Helpers.send(host, {
        id: config.rpcMessageId++, jsonrpc: "2.0", method: method,
        
        // PARAMETERS
        params: []

    }, function(result, status) {
        assert.equal(status, 200, 'has status code');
        assert.property(result, 'result', (result.error) ? result.error.message : 'error');
        assert.isString(result.result, 'is string');

        done();
    });
};


describe(method, function(){
    Helpers.eachHost(function(key, host){
        describe(key, function(){
            it('should return a version number as HEX string', function(done){
                asyncTest(host, done);
            });
        });
    });
});

