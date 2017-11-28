'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _presenceStatus$avali;

var _presenceStatus = require('ringcentral-integration/modules/Presence/presenceStatus');

var _presenceStatus2 = _interopRequireDefault(_presenceStatus);

var _dndStatus = require('ringcentral-integration/modules/Presence/dndStatus');

var _dndStatus2 = _interopRequireDefault(_dndStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (_presenceStatus$avali = {}, (0, _defineProperty3.default)(_presenceStatus$avali, _presenceStatus2.default.avalible, '利用可能'), (0, _defineProperty3.default)(_presenceStatus$avali, _presenceStatus2.default.offline, '非表示'), (0, _defineProperty3.default)(_presenceStatus$avali, _presenceStatus2.default.busy + _dndStatus2.default.takeAllCalls, '取り込み中'), (0, _defineProperty3.default)(_presenceStatus$avali, _presenceStatus2.default.busy + _dndStatus2.default.doNotAcceptDepartmentCalls, '取り込み中'), (0, _defineProperty3.default)(_presenceStatus$avali, _presenceStatus2.default.busy + _dndStatus2.default.doNotAcceptAnyCalls, '応答不可'), _presenceStatus$avali);

// @key: @#@"[presenceStatus.avalible]"@#@ @source: @#@"Available"@#@
// @key: @#@"[presenceStatus.offline]"@#@ @source: @#@"Invisible"@#@
// @key: @#@"[presenceStatus.busy+dndStatus.takeAllCalls]"@#@ @source: @#@"Busy"@#@
// @key: @#@"[presenceStatus.busy+dndStatus.doNotAcceptDepartmentCalls]"@#@ @source: @#@"Busy"@#@
// @key: @#@"[presenceStatus.busy+dndStatus.doNotAcceptAnyCalls]"@#@ @source: @#@"Do not Disturb"@#@
//# sourceMappingURL=ja-JP.js.map