/*
 * Copyright 2013 Apigee Corporation.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
/*
 * This is a set of objects that can be used for piping and creating various streams,
 * mainly used for chid process support.
 */

var net = require('net');
var stream = require('stream');

module.exports.createReadableStream = function(fd) {
  return new net.Socket({
    fd: fd,
    readable: true,
    writable: false
  });
};

module.exports.createWritableStream = function(fd) {
  return new net.Socket({
    fd: fd,
    readable: false,
    writable: true
  });
};

// Set up a pipe from "fd" to target
module.exports.startInputPipe = function(fd, target) {
  switch (fd) {
    case 0:
      process.stdin.pipe(target);
      break;
    default:
      throw Error('Invalid fd ' + fd);
  }
};

module.exports.startOutputPipe = function(fd, target) {
  switch (fd) {
    case 1:
      target.pipe(process.stdout);
      break;
    case 2:
      target.pipe(process.stderr);
      break;
    default:
      throw Error('Invalid fd ' + fd);
  }
};

module.exports.createPassThrough = function() {
  return new stream.PassThrough();
};

module.exports.isNodeSpawned = function(name) {
  return (name === process.argv[0])
};
