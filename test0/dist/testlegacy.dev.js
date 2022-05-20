"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require("chai"),
    expect = _require.expect;

var _require2 = require("hardhat"),
    ethers = _require2.ethers;

describe("Knives Legacy", function () {
  var KnivesLegacy;
  var addr1;
  var addr2;
  var addr3;
  var knives_legacy;
  before(function _callee() {
    var _ref, _ref2;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(ethers.getSigners());

          case 2:
            _ref = _context.sent;
            _ref2 = _slicedToArray(_ref, 4);
            owner = _ref2[0];
            addr1 = _ref2[1];
            addr2 = _ref2[2];
            addr3 = _ref2[3];
            _context.next = 10;
            return regeneratorRuntime.awrap(ethers.getContractFactory("KnivesLegacy"));

          case 10:
            KnivesLegacy = _context.sent;
            _context.next = 13;
            return regeneratorRuntime.awrap(KnivesLegacy.deploy("KnivesLegacy", "KNIVES", "https://ipfs.io/ipfs/QmPng9SjXxB3Vsud6h2rZPPjnVgSWFN1eGKRaAJ8JfFVfd/", "0xd9d2176F94135824Ba8D5768ba8edb61D08E21f4"));

          case 13:
            knives_legacy = _context.sent;
            _context.next = 16;
            return regeneratorRuntime.awrap(knives_legacy.deployed());

          case 16:
          case "end":
            return _context.stop();
        }
      }
    });
  });
  describe("NFT", function () {
    it("Should unpause the contract", function _callee2() {
      var setPauseTx;
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(knives_legacy.pause(false));

            case 2:
              setPauseTx = _context2.sent;
              _context2.next = 5;
              return regeneratorRuntime.awrap(setPauseTx.wait());

            case 5:
              _context2.t0 = expect;
              _context2.next = 8;
              return regeneratorRuntime.awrap(knives_legacy.paused());

            case 8:
              _context2.t1 = _context2.sent;
              (0, _context2.t0)(_context2.t1).to.equal(false);

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      });
    });
    it("Should not allow addr1 to unpause", function _callee3() {
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(expect(knives_legacy.connect(addr1).pause(true)).to.be.revertedWith("Ownable: caller is not the owner"));

            case 2:
              _context3.t0 = expect;
              _context3.next = 5;
              return regeneratorRuntime.awrap(knives_legacy.paused());

            case 5:
              _context3.t1 = _context3.sent;
              (0, _context3.t0)(_context3.t1).to.equal(false);

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      });
    });
  });
});