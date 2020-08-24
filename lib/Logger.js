var DEBUG = false;
try {
	var config = require('../config');
	DEBUG = ('object' === typeof config.debug) ? !!config.debug.enabled : false;
} catch (e) {}
// NOTE: Avoid using ES6 features (const, template strings, etc) as this shared with browser side code

/*
 * Logger class.
 *
 * Construct with a sectionID.
 *
 * e.g.
 *
 * function notificationHandler(...) {
 *   const log = Logger('Notification');
 *   // ...
 *   log('emitting notification');
 * }
 * function messageHandler(...) {
 *   const log = Logger('Chat');
 *   // ...
 *   log.error('cannot send message');
 * }
 */
var STYLES = {
	bold:      ['\u001b[1m', '\u001b[22m'],
	underline: ['\u001b[4m', '\u001b[24m'],

	red:        ['\u001b[31m', '\u001b[39m'],
	yellow:     ['\u001b[33m', '\u001b[39m'],
	blue:       ['\u001b[34m', '\u001b[39m'],
	blueBright: ['\u001b[94m', '\u001b[39m'],
	grey:       ['\u001b[90m', '\u001b[39m'],
};
STYLES.gray = STYLES.grey;  // aliases


function Logger(section) {
	section = section || '';

	var SEVERITY = {
		ERROR: 'ERROR',
		WARN:  'WARN',
		INFO:  'INFO',
		DEBUG: 'DEBUG',
	}

	var style = function(style, str) { return str; }; // no-op unless we are outputting to terminal
	try {
		// Node.js
		if ('object' === typeof process && process.stdout && process.stdout.isTTY) {
			style = function(style, str) {
				return style[0] + str + style[1];
			};
		}
	} catch (e) {}

	function _now() {
		return (new Date()).toISOString();
	}

	// Format into a log message string, including adding timestamp
	function _format(msg, severity) {
		severity = severity || SEVERITY.WARN;

		var ts = style(STYLES.grey, _now());
		var sev = severity;
		switch (severity) {
			case SEVERITY.ERROR:
				sev = style(STYLES.red, severity);
				sev = style(STYLES.bold, sev);
				break;
			case SEVERITY.WARN:
				sev = style(STYLES.yellow, severity);
				break;
			case SEVERITY.INFO:
				sev = style(STYLES.blueBright, severity);
				break;
			default:
				sev = severity;
		}
		return '[' + ts + '][' + section + '][' + sev + '] ' + msg;
	}


	// This bypasses formatting, useful for dumping object contents
	function _raw_log(msg)   { console.log(msg); }
	function _raw_error(msg) { console.error(msg); }
	function _raw_warn(msg)  { console.warn(msg); }
	function _raw(msg)       { _raw_log(msg); }


	function error(msg) {
		//_raw_error(_format(msg, SEVERITY.ERROR));
		_raw(_format(msg, SEVERITY.ERROR));
	}

	function warn(msg) {
		//_raw_warn(_format(msg, SEVERITY.WARN));
		_raw(_format(msg, SEVERITY.WARN));
	}

	function info(msg) {
		//_raw_log(_format(msg, SEVERITY.INFO));
		_raw(_format(msg, SEVERITY.INFO));
	}

	function debug(msg) {
		if (DEBUG) {
			_raw(_format(msg, SEVERITY.DEBUG));
		}
	}

	function debug_raw(msgOrObject) {
		if (DEBUG) {
			_raw(msgOrObject);
		}
	}


	// Final object
	function log(msg) {
		info(msg);
	}
	log.error = error;
	log.warn = warn;
	log.info = info;
	log.debug = debug;
	log.debug_raw = debug_raw;
	// Aliases
	log.err = log.error;
	log.warning = log.warn;

	return log;
}


module.exports = Logger;
