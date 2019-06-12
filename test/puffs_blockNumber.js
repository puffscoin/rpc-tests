var config = require('../lib/config'),
    Helpers = require('../lib/helpers'),
    assert = require('chai').assert;

// METHOD
var method = 'puffs_blockNumber';

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
        assert.match(result.result, /^0x/, 'should be HEX starting with 0x');
        assert.isNumber(+result.result, 'can be converted to a number');

        var expectedBlockNumber = config.testBlocks.blocks.reduce(function (acc, current) {
            return Math.max(acc, current.blockHeader.number); // let's take the longest chain
        }, 0);

        assert.equal(+result.result, expectedBlockNumber, 'should have the right length');

        done();
    });
};

describe(method, function(){
    Helpers.eachHost(function(key, host){
        describe(key, function(){
            it('should return a number as hexstring', function(done){
                asyncTest(host, done);
            });
        });
    });
});
