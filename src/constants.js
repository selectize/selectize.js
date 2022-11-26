/**
 * @var {boolean} IS_MAC Check if device is a Mac
 */
var IS_MAC = uaDetect("macOS", /Mac/);
/**
 * @var {number} KEY_A
 */
var KEY_A = 65;
/**
 * @var {number} KEY_COMMA
 */
var KEY_COMMA = 188;
/**
 * @var {number} KEY_RETURN
 */
var KEY_RETURN = 13;
/**
 * @var {number} KEY_ESC
 */
var KEY_ESC = 27;
/**
 * @var {number} KEY_LEFT
 */
var KEY_LEFT = 37;
/**
 * @var {number} KEY_UP
 */
var KEY_UP = 38;
/**
 * @var {number} KEY_P
 */
var KEY_P = 80;
/**
 * @var {number} KEY_RIGHT
 */
var KEY_RIGHT = 39;
/**
 * @var {number} KEY_DOWN
 */
var KEY_DOWN = 40;
/**
 * @var {number} KEY_N
 */
var KEY_N = 78;
/**
 * @var {number} KEY_BACKSPACE
 */
var KEY_BACKSPACE = 8;
/**
 * @var {number} KEY_DELETE
 */
var KEY_DELETE = 46;
/**
 * @var {number} KEY_SHIFT
 */
var KEY_SHIFT = 16;
/**
 * @var {number} KEY_CMD
 */
var KEY_CMD = IS_MAC ? 91 : 17;
/**
 * @var {number} KEY_CTRL
 */
var KEY_CTRL = IS_MAC ? 18 : 17;
/**
 * @var {number} KEY_TAB
 */
var KEY_TAB = 9;
/**
 * @var {number} TAG_SELECT
 */
var TAG_SELECT = 1;
/**
 * @var {number} TAG_INPUT
 */
var TAG_INPUT = 2;

/**
 * @var {number} SUPPORTS_VALIDITY_API Check if device support validity api, for now, android support in general is too spotty to support validity
 */
var SUPPORTS_VALIDITY_API = !uaDetect("Android", /android/i) && !!document.createElement('input').validity;
