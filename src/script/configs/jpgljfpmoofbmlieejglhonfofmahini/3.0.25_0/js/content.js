/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 68);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return MSG_DOWNLOAD_APP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return MSG_LOCATION_SELECTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return MSG_SET_NEXT_NEARBY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return MSG_APP_GET_ACCOUNT_INFO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return MSG_STARTUP_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MSG_API_LOG_IN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return MSG_API_SUBMIT_RATING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MSG_API_SUBMIT_FEEDBACK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return MSG_POPUP_SHOW_PAGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return MSG_POPUP_UPDATE_LAST_TIME_CHANGED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return MSG_POPUP_UPDATE_LAST_LOCATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return MSG_POPUP_SEND_ACCOUNT_INFO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return MSG_POPUP_SHOW_MESSAGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return MSG_GET_USER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return MSG_GET_FLAG_ICON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return MSG_IS_PROXY_SET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return MSG_TOGGLE_CONNECTION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return MSG_LOG_IN; });
const MSG_DOWNLOAD_APP = "DOWNLOAD_APP";
const MSG_LOCATION_SELECTED = "LOCATION_SELECTED";
const MSG_SET_NEXT_NEARBY = "SET_NEXT_NEARBY";
const MSG_APP_GET_ACCOUNT_INFO = "getAccountInfo";
const MSG_STARTUP_DATA = "STARTUP_DATA";
const MSG_API_LOG_IN = "API_LOG_IN";
const MSG_API_SUBMIT_RATING = "API_SUBMIT_RATING";
const MSG_API_SUBMIT_FEEDBACK = "API_SUBMIT_FEEDBACK";
const MSG_POPUP_SHOW_PAGE = "POPUP_SHOW_PAGE";
const MSG_POPUP_UPDATE_LAST_TIME_CHANGED = "POPUP_UPDATE_LAST_TIME_CHANGED";
const MSG_POPUP_UPDATE_LAST_LOCATION = "POPUP_UPDATE_LAST_LOCATION";
const MSG_POPUP_SEND_ACCOUNT_INFO = "POPUP_SEND_ACCOUNT_INFO";
const MSG_POPUP_SHOW_MESSAGE = "POPUP_SHOW_MESSAGE";
const MSG_GET_USER = "GET_USER";
const MSG_GET_FLAG_ICON = "GET_FLAG_ICON";
const MSG_IS_PROXY_SET = "IS_PROXY_SET";
const MSG_TOGGLE_CONNECTION = "TOGGLE_CONNECTION";
const MSG_LOG_IN = "LOG_IN";

/***/ }),

/***/ 2:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _popup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);



const runtimeMessagePromise = data => new Promise((resolve, reject) => {
  chrome.runtime.sendMessage(data, response => {
    if (chrome.runtime.lastError) {
      console.error('chrome.runtime.lastError: ', chrome.runtime.lastError);
      console.error('message data: ', data);
      reject(chrome.runtime.lastError);
    } else {
      resolve(response);
    }
  });
});

const Messages = new class {
  constructor() {
    this._eventHandlers = [];
    chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
      this._router(data, sender, sendResponse);
    });
  }

  on(handlers) {
    this._eventHandlers.push(handlers);
  }

  _router(data, sender, sendResponse) {
    this._eventHandlers.forEach(handlersBlock => {
      for (let i = 0; i < handlersBlock.length; i += 2) {
        if (handlersBlock[i] === data.action) {
          handlersBlock[i + 1](data, sender, sendResponse);
        }
      }
    });
  }

  toApi() {
    return {
      startupData(username, passHash) {
        return runtimeMessagePromise({
          action: _actions__WEBPACK_IMPORTED_MODULE_0__[/* MSG_STARTUP_DATA */ "q"],
          username,
          passHash
        });
      },

      logIn(username, passHash) {
        return runtimeMessagePromise({
          action: _actions__WEBPACK_IMPORTED_MODULE_0__[/* MSG_API_LOG_IN */ "a"],
          username,
          passHash
        });
      },

      submitRating(rating) {
        return runtimeMessagePromise({
          action: _actions__WEBPACK_IMPORTED_MODULE_0__[/* MSG_API_SUBMIT_RATING */ "c"],
          rating
        });
      },

      submitFeedback(msg) {
        return runtimeMessagePromise({
          action: _actions__WEBPACK_IMPORTED_MODULE_0__[/* MSG_API_SUBMIT_FEEDBACK */ "b"],
          msg
        });
      }

    };
  }

  toApp() {
    return {
      getAccountInfo(email, pass) {
        return runtimeMessagePromise({
          action: _actions__WEBPACK_IMPORTED_MODULE_0__[/* MSG_APP_GET_ACCOUNT_INFO */ "d"],
          args: [email, pass]
        });
      }

    };
  }

  toPopup() {
    return {
      updateLastTimeChanged(time) {
        if (_popup__WEBPACK_IMPORTED_MODULE_1__[/* PopupUtils */ "a"].isPopupOpened()) {
          return runtimeMessagePromise({
            action: _actions__WEBPACK_IMPORTED_MODULE_0__[/* MSG_POPUP_UPDATE_LAST_TIME_CHANGED */ "o"],
            time
          });
        }
      },

      updateLastLocation(location) {
        console.trace('~updateLastLocation~', JSON.stringify(location));

        if (_popup__WEBPACK_IMPORTED_MODULE_1__[/* PopupUtils */ "a"].isPopupOpened()) {
          return runtimeMessagePromise({
            action: _actions__WEBPACK_IMPORTED_MODULE_0__[/* MSG_POPUP_UPDATE_LAST_LOCATION */ "n"],
            location
          });
        }
      },

      sendAccountInfo(valid, premium) {
        if (_popup__WEBPACK_IMPORTED_MODULE_1__[/* PopupUtils */ "a"].isPopupOpened()) {
          return runtimeMessagePromise({
            action: _actions__WEBPACK_IMPORTED_MODULE_0__[/* MSG_POPUP_SEND_ACCOUNT_INFO */ "k"],
            valid
          });
        }
      },

      showPage(page) {
        if (_popup__WEBPACK_IMPORTED_MODULE_1__[/* PopupUtils */ "a"].isPopupOpened()) {
          return runtimeMessagePromise({
            action: _actions__WEBPACK_IMPORTED_MODULE_0__[/* MSG_POPUP_SHOW_PAGE */ "m"],
            page
          });
        }
      },

      showMessage(msg) {
        if (_popup__WEBPACK_IMPORTED_MODULE_1__[/* PopupUtils */ "a"].isPopupOpened()) {
          return runtimeMessagePromise({
            action: _actions__WEBPACK_IMPORTED_MODULE_0__[/* MSG_POPUP_SHOW_MESSAGE */ "l"],
            msg
          });
        }
      }

    };
  }

  toBackground() {
    return {
      downloadApp(url) {
        return runtimeMessagePromise({
          action: _actions__WEBPACK_IMPORTED_MODULE_0__[/* MSG_DOWNLOAD_APP */ "e"],
          url
        });
      },

      locationSelected(countryISO, city) {
        console.trace("locationSelected", arguments);
        return runtimeMessagePromise({
          action: _actions__WEBPACK_IMPORTED_MODULE_0__[/* MSG_LOCATION_SELECTED */ "i"],
          countryISO,
          city
        });
      },

      setNextNearby(countryISO, city) {
        return runtimeMessagePromise({
          action: _actions__WEBPACK_IMPORTED_MODULE_0__[/* MSG_SET_NEXT_NEARBY */ "p"],
          countryISO,
          city
        });
      },

      toggleConnection(connected) {
        return runtimeMessagePromise({
          action: _actions__WEBPACK_IMPORTED_MODULE_0__[/* MSG_TOGGLE_CONNECTION */ "r"],
          connected
        });
      },

      getUser() {
        return runtimeMessagePromise({
          action: _actions__WEBPACK_IMPORTED_MODULE_0__[/* MSG_GET_USER */ "g"]
        });
      },

      getFlagIcon(iso, medium = false) {
        return runtimeMessagePromise({
          action: _actions__WEBPACK_IMPORTED_MODULE_0__[/* MSG_GET_FLAG_ICON */ "f"],
          medium,
          iso
        });
      },

      isProxySet() {
        return runtimeMessagePromise({
          action: _actions__WEBPACK_IMPORTED_MODULE_0__[/* MSG_IS_PROXY_SET */ "h"]
        });
      },

      logIn(email, password) {
        return runtimeMessagePromise({
          action: _actions__WEBPACK_IMPORTED_MODULE_0__[/* MSG_LOG_IN */ "j"],
          email,
          password
        });
      }

    };
  }

}();
/* harmony default export */ __webpack_exports__["a"] = (Messages);

/***/ }),

/***/ 5:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export PORT_NAME */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return createConnectionPort; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopupUtils; });
const PORT_NAME = 'popup';
const createConnectionPort = () => {
  chrome.runtime.connect({
    name: PORT_NAME
  });
};
const PopupUtils = new class {
  constructor() {
    this.popupOpened = false;
    chrome.runtime.onConnect.addListener(externalPort => {
      if (externalPort.name !== PORT_NAME) {
        return;
      }

      externalPort.onDisconnect.addListener(() => {
        this.popupOpened = false;
      });
      this.popupOpened = true;
    });
  }

  isPopupOpened() {
    return this.popupOpened;
  }

}();

/***/ }),

/***/ 68:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(69);


/***/ }),

/***/ 69:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _messages__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
const EVT_ACTIVATE_PREMIUM = 'TUX_EVENT:ACTIVATE_PREMIUM';

window.addEventListener(EVT_ACTIVATE_PREMIUM, function (e) {
  _messages__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].toBackground().logIn(e.detail.email, e.detail.password);
}, false);

/***/ })

/******/ });