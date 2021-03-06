# Puffscoin RPC tests


Untested:

- puffs_sendTransaction
- puffs_compileSolidity
- puffs_getFilterChanges
- puffs_getWork
- puffs_submitWork
- shh_post
- shh_newGroup
- shh_addToGroup
- shh_getFilterChanges
- shh_getMessages

A note on tests: everything in the pending state or which requires newly created logs or transcations can't be tested, as the fixed blockchain is not mining.


## Usage

1. clone `$ git clone https://github.com/puffscoin/rpc-tests`
2. `$ cd rpc-tests`
3. `$ git submodule update --init`
4. `$ npm install`
5. start a local CPP node at `http://localhost:8080` and local GO node at `http://localhost:11363`
6. The nodes need the following state to work: https://github.com/puffscoin/tests/blob/develop/BlockchainTests/bcRPC_API_Test.json

**NOTE** If you run the tests make sure you update the `lib/tests` submodule as well as the `tests` repository, which you use to load the blockchain state so that both are in the same state.

### Running the tests

To run the tests start the node(s) at the ports described in `lib/config.js` (See [Start a node with a certain state](#start-a-node-with-a-certain-state)) and run:

    $ make test

**NOTE** you need to restart and reload the blocktests in the nodes, so that all pending and mined transactions get cleared from the test chain.

### Running test only for specific protocols

You can also run only tests for `puffs_`, `shh_` or `net_` RPC methods as follows:

    $ make test.puffs
    $ make test.shh
    $ make test.net

If you don't want to run the tests against all nodes, or run against remote nodes, just change the `hosts` in the `lib/config.js`.


### Running over an IPC connection

To test using the IPC connection, your node needs to run on the default IPC path. Then start with the following:

    $ make test.ipc
    $ make test.puffs.ipc
    $ make test.shh.ipc
    $ make test.net.ipc

### Running single tests

To run a single test you need to install mocha globally:

```bash
$ npm install -g mocha
$ cd rpc-tests
$ mocha test/1_testConnection.js test/puffs_myMethod.js
# add --ipc when you want to use the IPC connection
$ mocha test/1_testConnection.js test/puffs_myMethod.js --ipc
```

By changing the last file name to whatever method you want to test, you can run test only for that specifc method.

### Start a node with a certain state

To load a fixed state, clone the puffscoin test repo as follows:

    $ git clone https://github.com/puffscoin/rpc-tests

#### Go

Run the following go cli command to load the `RPC_API_Test` test:

    $ gpuffsrpctest --json <pathToTheTestRepo>/lib/tests/BlockchainTests/bcRPC_API_Test.json --test RPC_API_Test

#### C++

Run the following c++ cli command to load the `RPC_API_Test` test:

    $ puffsrpctest --json <pathToTheTestRepo>/lib/tests/BlockchainTests/bcRPC_API_Test.json --test RPC_API_Test

#### Python

Run the following python cli command to load the `RPC_API_Test` test:

    $ pyethsapp -l :info,puffs.chainservice:debug,jsonrpc:debug -c jsonrpc.listen_port=8081 -c p2p.max_peers=0 -c p2p.min_peers=0 blocktest <pathToTheTestRepo>/lib/tests/BlockchainTests/bcRPC_API_Test.json RPC_API_Test

For also testing/using ipc, use the the following command:

    $ pyethapp -l :info,puffs.chainservice:debug,jsonrpc:debug -c jsonrpc.listen_port=8081 -c p2p.max_peers=0 -c p2p.min_peers=0 -c ipc.ipcpath=$HOME/.puffscoin/gpuffs.ipc blocktest <pathToTheTestRepo>/lib/tests/BlockchainTests/bcRPC_API_Test.json RPC_API_Test
    
## License

The MIT License

Copyright (c) 2015 Fabian Vogelsteller

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
