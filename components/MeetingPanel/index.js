'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DateTimePicker = require('react-widgets/lib/DateTimePicker');

var _DateTimePicker2 = _interopRequireDefault(_DateTimePicker);

var _DropdownList = require('react-widgets/lib/DropdownList');

var _DropdownList2 = _interopRequireDefault(_DropdownList);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactWidgetsMoment = require('react-widgets-moment');

var _reactWidgetsMoment2 = _interopRequireDefault(_reactWidgetsMoment);

require('react-widgets/dist/css/react-widgets.css');

var _Date = require('../../assets/images/Date.svg');

var _Date2 = _interopRequireDefault(_Date);

var _Time = require('../../assets/images/Time.svg');

var _Time2 = _interopRequireDefault(_Time);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _Switch = require('../Switch');

var _Switch2 = _interopRequireDefault(_Switch);

var _CheckBox = require('../CheckBox');

var _CheckBox2 = _interopRequireDefault(_CheckBox);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _MeetingSection = require('../MeetingSection');

var _MeetingSection2 = _interopRequireDefault(_MeetingSection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MINUTE_SCALE = 4;
var HOUR_SCALE = 13;

function getMinutesList(MINUTE_SCALE) {
  return new Array(MINUTE_SCALE).fill(0).map(function (_, key) {
    var value = 60 / MINUTE_SCALE * key;
    var text = (value + '0').slice(0, 2) + ' m.';
    return {
      value: value,
      text: text
    };
  });
}

function getHoursList(HOUR_SCALE) {
  if (HOUR_SCALE > 23) {
    throw new Error('HOUR_SCALE must be less than 23.');
  }
  return new Array(HOUR_SCALE).fill(0).map(function (_, value) {
    var text = ('0' + value + '0').slice(-3, -1) + ' h.';
    return {
      value: value,
      text: text
    };
  });
}

var minutesList = getMinutesList(MINUTE_SCALE);
var hoursList = getHoursList(HOUR_SCALE);

var Topic = function Topic(_ref) {
  var update = _ref.update,
      currentLocale = _ref.currentLocale,
      meeting = _ref.meeting;
  return _react2.default.createElement(
    _MeetingSection2.default,
    { hideTopBorderLine: true },
    _react2.default.createElement(
      'div',
      { className: _styles2.default.inline },
      _react2.default.createElement(
        'span',
        { className: _styles2.default.label },
        _i18n2.default.getString('topic', currentLocale)
      ),
      _react2.default.createElement('input', {
        type: 'text',
        className: _styles2.default.input,
        value: meeting.topic || '',
        onChange: function onChange(_ref2) {
          var target = _ref2.target;

          update((0, _extends3.default)({}, meeting, {
            topic: target.value
          }));
        } })
    )
  );
};

Topic.propTypes = {
  update: _propTypes2.default.func.isRequired,
  currentLocale: _propTypes2.default.string.isRequired,
  meeting: _propTypes2.default.object.isRequired
};

var When = function When(_ref3) {
  var isRecurring = _ref3.isRecurring,
      currentLocale = _ref3.currentLocale,
      meeting = _ref3.meeting,
      update = _ref3.update,
      that = _ref3.that,
      onToggle = _ref3.onToggle,
      minTime = _ref3.minTime;
  return !isRecurring ? _react2.default.createElement(
    _MeetingSection2.default,
    { title: _i18n2.default.getString('when', currentLocale) },
    _react2.default.createElement(
      'div',
      { className: _styles2.default.dateTimeBox },
      _react2.default.createElement(
        'div',
        { className: _styles2.default.list },
        _react2.default.createElement(
          'div',
          { className: _styles2.default.datePicker },
          _react2.default.createElement(_DateTimePicker2.default, {
            culture: currentLocale,
            time: false,
            value: new Date(meeting.schedule.startTime),
            onChange: function onChange(startTime) {
              if (startTime) {
                update((0, _extends3.default)({}, meeting, {
                  schedule: (0, _extends3.default)({}, meeting.schedule, {
                    startTime: startTime.getTime()
                  })
                }));
              }
            },
            ref: function ref(_ref4) {
              that.date = _ref4;
            },
            format: 'MM/DD/YY',
            min: new Date()
          })
        ),
        _react2.default.createElement(
          'div',
          { className: _styles2.default.dateIcon },
          _react2.default.createElement(_Date2.default, {
            onClick: function onClick() {
              return onToggle('date');
            },
            className: _styles2.default.icon })
        )
      ),
      _react2.default.createElement(
        'div',
        { className: _styles2.default.list },
        _react2.default.createElement(
          'div',
          { className: _styles2.default.timePicker },
          _react2.default.createElement(_DateTimePicker2.default, (0, _extends3.default)({
            culture: 'en',
            date: false,
            ref: function ref(_ref5) {
              that.time = _ref5;
            },
            value: new Date(meeting.schedule.startTime),
            onChange: function onChange(startTime) {
              if (startTime) {
                update((0, _extends3.default)({}, meeting, {
                  schedule: (0, _extends3.default)({}, meeting.schedule, {
                    startTime: startTime.getTime()
                  })
                }));
              }
            },
            format: 'hh:mm A'
          }, minTime))
        ),
        _react2.default.createElement(
          'div',
          { className: _styles2.default.timeIcon },
          _react2.default.createElement(_Time2.default, {
            onClick: function onClick() {
              return onToggle('time');
            },
            className: _styles2.default.icon })
        )
      )
    )
  ) : null;
};

When.propTypes = {
  update: _propTypes2.default.func.isRequired,
  currentLocale: _propTypes2.default.string.isRequired,
  meeting: _propTypes2.default.object.isRequired,
  isRecurring: _propTypes2.default.bool.isRequired,
  that: _propTypes2.default.object.isRequired,
  onToggle: _propTypes2.default.func.isRequired,
  minTime: _propTypes2.default.object.isRequired
};

var Duration = function Duration(_ref6) {
  var isRecurring = _ref6.isRecurring,
      currentLocale = _ref6.currentLocale,
      meeting = _ref6.meeting,
      update = _ref6.update;
  return !isRecurring ? _react2.default.createElement(
    _MeetingSection2.default,
    { title: _i18n2.default.getString('duration', currentLocale) },
    _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)(_styles2.default.spaceBetween, _styles2.default.duration) },
      _react2.default.createElement(
        'div',
        { className: _styles2.default.list },
        _react2.default.createElement(
          'div',
          { className: _styles2.default.hoursList },
          _react2.default.createElement(_DropdownList2.default, {
            data: hoursList,
            valueField: 'value',
            textField: 'text',
            value: parseInt(meeting.schedule.durationInMinutes / 60, 10),
            onChange: function onChange(_ref7) {
              var value = _ref7.value;

              var restMinutes = meeting.schedule.durationInMinutes % 60;
              var isMax = value === hoursList.slice(-1)[0].value;
              restMinutes = isMax ? 0 : restMinutes;
              var durationInMinutes = value * 60 + restMinutes;
              update((0, _extends3.default)({}, meeting, {
                schedule: (0, _extends3.default)({}, meeting.schedule, {
                  durationInMinutes: durationInMinutes
                })
              }));
            } })
        )
      ),
      _react2.default.createElement(
        'div',
        { className: _styles2.default.list },
        _react2.default.createElement(
          'div',
          { className: _styles2.default.minutesList },
          _react2.default.createElement(_DropdownList2.default, {
            data: minutesList,
            valueField: 'value',
            textField: 'text',
            value: meeting.schedule.durationInMinutes % 60 || 0,
            onChange: function onChange(_ref8) {
              var value = _ref8.value;

              var restHours = parseInt(meeting.schedule.durationInMinutes / 60, 10);
              var isMax = restHours === hoursList.slice(-1)[0].value;
              var minutes = isMax ? 0 : value;
              var durationInMinutes = restHours * 60 + minutes;
              update((0, _extends3.default)({}, meeting, {
                schedule: (0, _extends3.default)({}, meeting.schedule, {
                  durationInMinutes: durationInMinutes
                })
              }));
            } })
        )
      )
    )
  ) : null;
};

Duration.propTypes = {
  update: _propTypes2.default.func.isRequired,
  currentLocale: _propTypes2.default.string.isRequired,
  meeting: _propTypes2.default.object.isRequired,
  isRecurring: _propTypes2.default.bool.isRequired
};

var RecurringMeeting = function RecurringMeeting(_ref9) {
  var isRecurring = _ref9.isRecurring,
      currentLocale = _ref9.currentLocale,
      update = _ref9.update,
      meeting = _ref9.meeting;
  return _react2.default.createElement(
    _MeetingSection2.default,
    { className: _styles2.default.section },
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { className: _styles2.default.spaceBetween },
        _react2.default.createElement(
          'span',
          { className: _styles2.default.label },
          _i18n2.default.getString('recurringMeeting', currentLocale)
        ),
        _react2.default.createElement(_Switch2.default, {
          checked: isRecurring,
          onChange: function onChange(isCheckRecurring) {
            var meetingType = isCheckRecurring ? 'Recurring' : 'Scheduled';
            update((0, _extends3.default)({}, meeting, {
              meetingType: meetingType
            }));
          } })
      ),
      isRecurring ? _react2.default.createElement(
        'div',
        { className: _styles2.default.recurringDescribe },
        _i18n2.default.getString('recurringDescribe', currentLocale)
      ) : null
    )
  );
};

RecurringMeeting.propTypes = {
  update: _propTypes2.default.func.isRequired,
  currentLocale: _propTypes2.default.string.isRequired,
  meeting: _propTypes2.default.object.isRequired,
  isRecurring: _propTypes2.default.bool.isRequired
};

var Video = function Video(_ref10) {
  var currentLocale = _ref10.currentLocale,
      meeting = _ref10.meeting,
      update = _ref10.update;
  return _react2.default.createElement(
    _MeetingSection2.default,
    { title: _i18n2.default.getString('video', currentLocale), withSwitch: true },
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(_styles2.default.labelLight, _styles2.default.fixTopMargin) },
        _i18n2.default.getString('videoDescribe', currentLocale)
      ),
      _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(_styles2.default.spaceBetween, _styles2.default.fixTopMargin) },
        _react2.default.createElement(
          'span',
          { className: _styles2.default.labelLight },
          _i18n2.default.getString('host', currentLocale)
        ),
        _react2.default.createElement(_Switch2.default, {
          checked: meeting.startHostVideo,
          onChange: function onChange(startHostVideo) {
            update((0, _extends3.default)({}, meeting, {
              startHostVideo: startHostVideo
            }));
          } })
      ),
      _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(_styles2.default.spaceBetween, _styles2.default.fixTopMargin) },
        _react2.default.createElement(
          'span',
          { className: _styles2.default.labelLight },
          _i18n2.default.getString('participants', currentLocale)
        ),
        _react2.default.createElement(_Switch2.default, {
          checked: meeting.startParticipantsVideo,
          onChange: function onChange(startParticipantsVideo) {
            update((0, _extends3.default)({}, meeting, {
              startParticipantsVideo: startParticipantsVideo
            }));
          } })
      )
    )
  );
};

Video.propTypes = {
  update: _propTypes2.default.func.isRequired,
  currentLocale: _propTypes2.default.string.isRequired,
  meeting: _propTypes2.default.object.isRequired
};

var AudioOptions = function AudioOptions(_ref11) {
  var currentLocale = _ref11.currentLocale,
      update = _ref11.update,
      meeting = _ref11.meeting,
      data = _ref11.data;
  return _react2.default.createElement(
    _MeetingSection2.default,
    { title: _i18n2.default.getString('audioOptions', currentLocale), withSwitch: true },
    _react2.default.createElement(_CheckBox2.default, {
      onSelect: function onSelect(_ref12) {
        var key = _ref12.key;

        var audioOptions = key.split('_');
        update((0, _extends3.default)({}, meeting, {
          audioOptions: audioOptions
        }));
      },
      valueField: 'key',
      textField: 'text',
      selected: meeting.audioOptions.join('_'),
      data: data })
  );
};

AudioOptions.propTypes = {
  update: _propTypes2.default.func.isRequired,
  currentLocale: _propTypes2.default.string.isRequired,
  meeting: _propTypes2.default.object.isRequired,
  data: _propTypes2.default.array.isRequired
};

var MeetingOptions = function MeetingOptions(_ref13) {
  var currentLocale = _ref13.currentLocale,
      meeting = _ref13.meeting,
      update = _ref13.update;
  return _react2.default.createElement(
    _MeetingSection2.default,
    { title: _i18n2.default.getString('meetingOptions', currentLocale), withSwitch: true },
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(_styles2.default.spaceBetween, _styles2.default.fixTopMargin) },
        _react2.default.createElement(
          'span',
          { className: _styles2.default.labelLight },
          _i18n2.default.getString('requirePassword', currentLocale)
        ),
        _react2.default.createElement(_Switch2.default, {
          checked: meeting._requireMeetingPassword,
          onChange: function onChange(_requireMeetingPassword) {
            var password = _requireMeetingPassword ? null : meeting.password;
            update((0, _extends3.default)({}, meeting, {
              _requireMeetingPassword: _requireMeetingPassword,
              password: password
            }));
          } })
      ),
      meeting._requireMeetingPassword ? _react2.default.createElement(
        'div',
        { className: _styles2.default.passwordBox },
        _react2.default.createElement(
          'div',
          { className: _styles2.default.labelLight },
          _i18n2.default.getString('password', currentLocale)
        ),
        _react2.default.createElement('input', {
          type: 'password',
          className: _styles2.default.password,
          value: meeting.password || '',
          onChange: function onChange(_ref14) {
            var target = _ref14.target;

            if (target.value.length <= 10) {
              update((0, _extends3.default)({}, meeting, {
                password: target.value
              }));
            }
          } })
      ) : null,
      _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(_styles2.default.spaceBetween, _styles2.default.fixTopMargin) },
        _react2.default.createElement(
          'span',
          { className: _styles2.default.labelLight },
          _i18n2.default.getString('enableJoinBeforeHost', currentLocale)
        ),
        _react2.default.createElement(_Switch2.default, {
          checked: meeting.allowJoinBeforeHost,
          onChange: function onChange(allowJoinBeforeHost) {
            update((0, _extends3.default)({}, meeting, {
              allowJoinBeforeHost: allowJoinBeforeHost
            }));
          } })
      )
    )
  );
};

MeetingOptions.propTypes = {
  update: _propTypes2.default.func.isRequired,
  currentLocale: _propTypes2.default.string.isRequired,
  meeting: _propTypes2.default.object.isRequired
};

var MeetingPanel = function (_Component) {
  (0, _inherits3.default)(MeetingPanel, _Component);

  function MeetingPanel() {
    var _ref15;

    (0, _classCallCheck3.default)(this, MeetingPanel);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = (0, _possibleConstructorReturn3.default)(this, (_ref15 = MeetingPanel.__proto__ || (0, _getPrototypeOf2.default)(MeetingPanel)).call.apply(_ref15, [this].concat(args)));

    _this.props.init();
    _moment2.default.locale(_this.props.currentLocale);
    (0, _reactWidgetsMoment2.default)();
    return _this;
  }

  (0, _createClass3.default)(MeetingPanel, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          update = _props.update,
          meeting = _props.meeting,
          hidden = _props.hidden,
          disabled = _props.disabled,
          invite = _props.invite,
          currentLocale = _props.currentLocale,
          ScheduleButton = _props.scheduleButton;

      if (!(0, _keys2.default)(meeting).length) {
        return null;
      }
      var onToggle = function onToggle(type) {
        if (_this2[type]._values.open) {
          _this2[type].refs.inner.close();
        } else {
          _this2[type].focus();
          _this2[type].refs.inner.toggle();
        }
      };
      var isRecurring = meeting.meetingType === 'Recurring';
      var telephonyOnly = _i18n2.default.getString('telephonyOnly', currentLocale);
      var voIPOnly = _i18n2.default.getString('voIPOnly', currentLocale);
      var both = _i18n2.default.getString('both', currentLocale);
      var AUDIO_OPTIONS = [{
        key: 'Phone',
        text: telephonyOnly
      }, {
        key: 'ComputerAudio',
        text: voIPOnly

      }, {
        key: 'Phone_ComputerAudio',
        text: both
      }];
      var minTime = new Date(meeting.schedule.startTime) < +new Date() ? { min: new Date() } : {};
      return _react2.default.createElement(
        'div',
        { className: _styles2.default.meetingPanel },
        !hidden ? _react2.default.createElement(
          'div',
          { className: _styles2.default.scroll },
          _react2.default.createElement(Topic, {
            meeting: meeting,
            update: update,
            currentLocale: currentLocale }),
          _react2.default.createElement(When, {
            isRecurring: isRecurring,
            currentLocale: currentLocale,
            meeting: meeting,
            update: update,
            that: this,
            onToggle: onToggle,
            minTime: minTime }),
          _react2.default.createElement(Duration, {
            isRecurring: isRecurring,
            currentLocale: currentLocale,
            meeting: meeting,
            update: update }),
          _react2.default.createElement(RecurringMeeting, {
            isRecurring: isRecurring,
            currentLocale: currentLocale,
            meeting: meeting,
            update: update }),
          _react2.default.createElement(Video, {
            currentLocale: currentLocale,
            meeting: meeting,
            update: update }),
          _react2.default.createElement(AudioOptions, {
            data: AUDIO_OPTIONS,
            currentLocale: currentLocale,
            meeting: meeting,
            update: update }),
          _react2.default.createElement(MeetingOptions, {
            currentLocale: currentLocale,
            meeting: meeting,
            update: update })
        ) : null,
        _react2.default.createElement(ScheduleButton, {
          hidden: hidden,
          disabled: disabled,
          meeting: meeting,
          onClick: invite })
      );
    }
  }]);
  return MeetingPanel;
}(_react.Component);

MeetingPanel.propTypes = {
  update: _propTypes2.default.func.isRequired,
  invite: _propTypes2.default.func.isRequired,
  init: _propTypes2.default.func.isRequired,
  meeting: _propTypes2.default.object.isRequired,
  currentLocale: _propTypes2.default.string.isRequired,
  scheduleButton: _propTypes2.default.func.isRequired,
  disabled: _propTypes2.default.bool,
  hidden: _propTypes2.default.bool
};

MeetingPanel.defaultProps = {
  disabled: false,
  hidden: false
};

exports.default = MeetingPanel;
//# sourceMappingURL=index.js.map