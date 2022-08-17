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
/******/ 	return __webpack_require__(__webpack_require__.s = 67);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "b", function() { return /* binding */ StorageUtils; });
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ Storage; });

// CONCATENATED MODULE: ./src/js/ls.js
const ls = {
  get(name, def) {
    const obj = localStorage[name];

    if (!obj) {
      return def;
    }

    try {
      return JSON.parse(obj);
    } catch (e) {
      return def;
    }
  },

  set(name, val) {
    localStorage[name] = JSON.stringify(val);
  },

  remove(name) {
    delete localStorage[name];
  }

};
// EXTERNAL MODULE: ./src/js/platform.js
var platform = __webpack_require__(3);

// CONCATENATED MODULE: ./src/js/storage.js


const KEY_PAGE_TO_SHOW = "PAGE_TO_SHOW";
const KEY_APP_INSTALLED = "APP_INSTALLED";
const KEY_APP_FIRST_CONNECT = "APP_FIRST_CONNECT";
const KEY_APP_CONNECTED = "APP_CONNECTED";
const KEY_APP_UNIQUE_ID = "APP_UNIQUE_ID";
const KEY_API_MODE_SERVERS = "API_MODE_SERVERS";
const KEY_USER_LOCATION = "USER_LOCATION";
const KEY_USER_LAST_LOCATION = "USER_LAST_LOCATION";
const KEY_USER_LAST_CHANGED_TIME = "USER_LAST_CHANGED_TIME";
const KEY_USER_DEFAULT_LOCATION = "USER_DEFAULT_LOCATION";
const KEY_USER_ACCOUNT_INFO = "USER_ACCOUNT_INFO";
const KEY_USER_EMAIL = "USER_EMAIL";
const KEY_USER_PASSWORD = "USER_PASSWORD";
const KEY_IS_PREMIUM = "IS_PREMIUM";
const KEY_SUBSCRIPTIONS = "SUBSCRIPTIONS";
const KEY_SETTINGS_ADVANCED_ANALYSING = "SETTINGS_ADVANCED_ANALYSING";
const KEY_IS_RESIDENTIAL = "main_residential_checked";
const StorageUtils = {
  onStorageChangeAdd(listener) {
    if (platform["d" /* PlatformUtils */].isFirefox()) {
      chrome.storage.onChanged.addListener(listener);
    } else {
      chrome.storage.local.onChanged.addListener(listener);
    }
  },

  onStorageChangeRemove(listener) {
    if (platform["d" /* PlatformUtils */].isFirefox()) {
      chrome.storage.onChanged.removeListener(listener);
    } else {
      chrome.storage.local.onChanged.removeListener(listener);
    }
  }

};

const constructSetStorePromise = (key, val) => new Promise(resolve => {
  chrome.storage.local.set({
    [key]: val
  }, () => {
    resolve(chrome.runtime.lastError);
  });
});

const constructGetStorePromise = key => new Promise(resolve => {
  chrome.storage.local.get(key, result => {
    resolve(Array.isArray(key) ? result : result[key]);
  });
});

const Storage = {
  local: {
    get(keys) {
      return constructGetStorePromise(keys);
    }

  },
  settings: {
    getAdvancedAnalysing() {
      return ls.get(KEY_SETTINGS_ADVANCED_ANALYSING, false);
    },

    setAdvancedAnalysing(val) {
      return ls.set(KEY_SETTINGS_ADVANCED_ANALYSING, val);
    },

    isResidentialChecked() {
      return constructGetStorePromise(KEY_IS_RESIDENTIAL);
    },

    setResidentialChecked(val) {
      return constructSetStorePromise(KEY_IS_RESIDENTIAL, val);
    }

  },
  pages: {
    getPage() {
      return ls.get(KEY_PAGE_TO_SHOW);
    },

    setPage(val) {
      return ls.set(KEY_PAGE_TO_SHOW, val);
    }

  },
  app: {
    isFirstConnect() {
      return ls.get(KEY_APP_FIRST_CONNECT, true);
    },

    setFirstConnect(val) {
      return ls.set(KEY_APP_FIRST_CONNECT, val);
    },

    isInstalled() {
      return ls.get(KEY_APP_INSTALLED, false);
    },

    setInstalled(val) {
      return ls.set(KEY_APP_INSTALLED, val);
    },

    getUniqueID() {
      return ls.get(KEY_APP_UNIQUE_ID, null);
    },

    setUniqueID(value) {
      return ls.set(KEY_APP_UNIQUE_ID, value);
    },

    isConnected() {
      return constructGetStorePromise(KEY_APP_CONNECTED);
    },

    setConnected(val) {
      console.trace('~setConnected~', val);
      return constructSetStorePromise(KEY_APP_CONNECTED, val);
    },

    onConnectedStart(callback) {
      this._onChangedListener = changeInfo => {
        console.log('=> changeInfo: ', changeInfo);

        if (changeInfo[KEY_APP_CONNECTED]) {
          callback(changeInfo[KEY_APP_CONNECTED].newValue);
        }
      }; // chrome.storage.local.onChanged.addListener([KEY_APP_CONNECTED], (val) => {


      StorageUtils.onStorageChangeAdd(this._onChangedListener);
    },

    onConnectedStop() {
      StorageUtils.onStorageChangeRemove(this._onChangedListener);
      this._onChangedListener = null;
    }

  },
  user: {
    // _locationListeners: [],
    getApiModeServes() {
      return ls.get(KEY_API_MODE_SERVERS, []);
    },

    setApiModeServers(val) {
      return ls.set(KEY_API_MODE_SERVERS, val);
    },

    getLocation() {
      return ls.get(KEY_USER_LOCATION);
    },

    /**
     * Sample location:
     * {
     *     city: "Minsk"
     *     country: "Belarus"
     *     countryiso: "BY"
     *     region: "unknown"
     * }
     * @param val
     */
    setLocation(val) {
      // console.log('this._locationListeners: ', this._locationListeners);
      //TODO: change to chrome.store API - no proper onChange support
      // const oldValue = ls.get(KEY_USER_LOCATION);
      // console.log('oldValue: ', oldValue);
      //
      // if (JSON.stringify(oldValue) === JSON.stringify(val)) {
      //   console.log('Same locations - ignore');
      //   return;
      // }
      ls.set(KEY_USER_LOCATION, val); // this._locationListeners.forEach(listener => {
      //   try {
      //     listener(val);
      //   } catch (e) {
      //     console.error('Location onChange callback error: ', e);
      //   }
      // });
    },

    // onLocationChange(callback) {
    //   console.log('~onLocationChange~ his._locationListeners: ', this._locationListeners);
    //   console.log('callback: ', callback);
    //
    //   this._locationListeners.push(callback);
    // },
    getLastLocation() {
      return ls.get(KEY_USER_LAST_LOCATION);
    },

    /**
     * Sample location:
     * {
     *     city: "Minsk"
     *     country: "Belarus"
     *     countryiso: "BY"
     *     region: "unknown"
     * }
     * @param val
     */
    setLastLocation(val) {
      return ls.set(KEY_USER_LAST_LOCATION, val);
    },

    getLastChangedTime() {
      return ls.get(KEY_USER_LAST_CHANGED_TIME);
    },

    setLastChangedTime(val) {
      return ls.set(KEY_USER_LAST_CHANGED_TIME, val);
    },

    getDefaultLocation() {
      return ls.get(KEY_USER_DEFAULT_LOCATION);
    },

    /**
     * Sample location:
     * {
     *     city: "Minsk"
     *     country: "Belarus"
     *     countryiso: "BY"
     *     region: "unknown"
     * }
     * @param val
     */
    setDefaultLocation(val) {
      return ls.set(KEY_USER_DEFAULT_LOCATION, val);
    },

    isPremium() {
      return constructGetStorePromise(KEY_IS_PREMIUM);
    },

    setPremium(value) {
      // console.trace('~setPremium~', value);
      return constructSetStorePromise(KEY_IS_PREMIUM, value);
    },

    onPremiumChange(callback) {
      console.log('PlatformUtils.apiBase(): ', platform["d" /* PlatformUtils */].apiBase());
      StorageUtils.onStorageChangeAdd(changeInfo => {
        if (changeInfo[KEY_IS_PREMIUM]) {
          callback(changeInfo[KEY_IS_PREMIUM].newValue);
        }
      });
    },

    getAccountInfo() {
      return constructGetStorePromise(KEY_USER_ACCOUNT_INFO);
    },

    setAccountInfo(info) {
      return constructSetStorePromise(KEY_USER_ACCOUNT_INFO, info);
    },

    removeAccountInfo() {
      chrome.storage.local.remove(KEY_USER_ACCOUNT_INFO);
    },

    getEmail() {
      return constructGetStorePromise(KEY_USER_EMAIL);
    },

    setEmail(email) {
      return constructSetStorePromise(KEY_USER_EMAIL, email);
    },

    getPassword() {
      return constructGetStorePromise(KEY_USER_PASSWORD);
    },

    setPassword(password) {
      return constructSetStorePromise(KEY_USER_PASSWORD, password);
    },

    getUser() {
      return new Promise(resolve => {
        chrome.storage.local.get([KEY_USER_EMAIL, KEY_USER_PASSWORD], function (result) {
          console.log('getUser', result);
          const hasUser = KEY_USER_EMAIL in result && KEY_USER_PASSWORD in result;
          console.log('hasUser', hasUser);

          if (hasUser) {
            resolve({
              email: result[KEY_USER_EMAIL],
              password: result[KEY_USER_PASSWORD]
            });
          } else {
            resolve(null);
          }
        });
      });
    },

    setUser(user) {
      console.trace('~setUser~', user);
      return new Promise(resolve => {
        if (user) {
          chrome.storage.local.set({
            [KEY_USER_EMAIL]: user.email,
            [KEY_USER_PASSWORD]: user.password
          }, resolve);
        } else {
          chrome.storage.local.remove([KEY_USER_EMAIL, KEY_USER_PASSWORD], resolve);
        }
      });
    }

  },

  //TODO: encrypt subscriptions
  getSubscriptions() {
    return ls.get(KEY_SUBSCRIPTIONS);
  },

  setSubscriptions(subscriptions) {
    return ls.set(KEY_SUBSCRIPTIONS, subscriptions);
  }

};

/***/ }),
/* 1 */
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
/* 2 */
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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PLATFORM_CHROME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PLATFORM_FIREFOX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return PLATFORM_OPERA; });
/* unused harmony export PLATFORM_UNKNOWN */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return PlatformUtils; });
const PLATFORM_CHROME = 'chrome';
const PLATFORM_FIREFOX = 'firefox';
const PLATFORM_OPERA = 'opera';
const PLATFORM_UNKNOWN = 'unknown';
const PlatformUtils = {
  apiBase() {
    return this.isFirefox() ? window.browser : window.chrome;
  },

  isChrome() {
    return navigator.userAgent.indexOf("Chrome") !== -1;
  },

  isFirefox() {
    return navigator.userAgent.indexOf("Firefox") !== -1;
  },

  isOpera() {
    return navigator.userAgent.indexOf(" OPR/") !== -1;
  },

  getPlatform(def = PLATFORM_UNKNOWN) {
    if (this.isOpera()) {
      return PLATFORM_OPERA;
    }

    if (this.isChrome()) {
      return PLATFORM_CHROME;
    }

    if (this.isFirefox()) {
      return PLATFORM_FIREFOX;
    }

    return def;
  }

};

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return addUniqueIdParam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SyncURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AsyncURL; });
/* harmony import */ var _platform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);


const addUniqueIdParam = url => {
  if (!url) {
    return url;
  }

  const id = _storage__WEBPACK_IMPORTED_MODULE_1__[/* Storage */ "a"].app.getUniqueID();

  if (!id) {
    return url;
  }

  return url + (url.includes('?') ? '&' : '?') + 'app_unique_id=' + encodeURIComponent(id);
};
const SyncURL = {
  get URL_BANNED() {
    return addUniqueIdParam("http://www.tuxler.com/extension_event.php?id=banned");
  },

  get URL_EXT_HOME_CHROME() {
    return addUniqueIdParam("https://tuxler.com/extension_event.php?id=install_chrome_ext");
  },

  get URL_EXT_HOME_FIREFOX() {
    return addUniqueIdParam("https://tuxler.com/extension_event.php?id=download_firefox");
  },

  get URL_HELP() {
    return addUniqueIdParam('http://tuxler.com/extension_event.php?id=help');
  },

  get URL_REFERRAL_PROGRAM() {
    return addUniqueIdParam('http://tuxler.com/extension_event.php?id=referral_program');
  },

  get URL_CONTACT_SUPPORT() {
    return addUniqueIdParam('http://tuxler.com/extension_event.php?id=support');
  },

  get URL_UPGRADE_TO_PREMIUM() {
    return addUniqueIdParam('https://tuxler.com/extension_event.php?id=upgrade_to_premium');
  },

  get URL_FF_PRIVATE_MODE_DOC() {
    return addUniqueIdParam('https://tuxler.com/extension_event.php?id=firefox_update_private');
  }

};
const AsyncURL = {
  uninstall() {
    return new Promise(resolve => {
      chrome.runtime.getPlatformInfo(function (info) {
        const system = info.os;
        const browser = _platform__WEBPACK_IMPORTED_MODULE_0__[/* PlatformUtils */ "d"].getPlatform();
        resolve(addUniqueIdParam(`http://tuxler.com/extension_event.php?id=uninstall_chrome_app_new&browser=${browser}&os=${system}`));
      });
    });
  },

  install() {
    return new Promise(resolve => {
      chrome.runtime.getPlatformInfo(function (info) {
        const system = info.os;
        const browser = _platform__WEBPACK_IMPORTED_MODULE_0__[/* PlatformUtils */ "d"].getPlatform();
        resolve(addUniqueIdParam(`http://tuxler.com/extension_event.php?id=install_chrome_app_new&os=${system}&browser=${browser}`));
      });
    });
  },

  _step(step) {
    return new Promise(resolve => {
      chrome.runtime.getPlatformInfo(function (info) {
        const system = info.os;
        const browser = _platform__WEBPACK_IMPORTED_MODULE_0__[/* PlatformUtils */ "d"].getPlatform();
        resolve(addUniqueIdParam(`https://tuxler.com/extension_event.php?id=extension_step${step}&os=${system}&browser=${browser}`));
      });
    });
  },

  step1() {
    return this._step(1);
  },

  step2() {
    return this._step(2);
  },

  step3() {
    return this._step(3);
  }

};

/***/ }),
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(19);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Proxy; });
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var _platform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _pages__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);




window._socksProxyAddr = null;
const Proxy = {
  set() {
    _app__WEBPACK_IMPORTED_MODULE_0__[/* App */ "a"].setProxy();
    window.is_proxy_set = true;
    _app__WEBPACK_IMPORTED_MODULE_0__[/* App */ "a"].getLocalProxyAddress(addr => {
      console.log('App.getLocalProxyAddress: ', addr);
      this.setSocksProxy(addr);
    });
  },

  _setChromeProxy(addr) {
    chrome.proxy.settings.set({
      value: {
        mode: "fixed_servers",
        rules: {
          singleProxy: {
            scheme: "socks5",
            host: addr.proxy,
            port: addr.port
          },
          bypassList: ['<local>', '*tuxler.com', '*tuxlervpn.com', '*tuxlervpn.com:700', '*tuxlervpn.com:701', `*tuxler.com:${addr.port}`, '*tuxler.com:701', '*tuxler.com:700']
        }
      },
      scope: 'regular'
    }, () => {
      console.log('PROXY SET CALLBACK:', chrome.runtime.lastError);
      window.is_proxy_set = true;
    });
  },

  // reconnectSocksProxy() {
  //   console.log('~reconnectSocksProxy~');
  //
  //   const addr = window._socksProxyAddr;
  //     chrome.proxy.settings.clear({scope: 'regular'}, () => {
  //       this._setChromeProxy(addr);
  //       console.log('RECONNECTED');
  //     });
  // },
  async setSocksProxy(addr) {
    console.log('~setSocksProxy~', addr);
    window._socksProxyAddr = addr;
    const platform = _platform__WEBPACK_IMPORTED_MODULE_2__[/* PlatformUtils */ "d"].getPlatform(_platform__WEBPACK_IMPORTED_MODULE_2__[/* PLATFORM_CHROME */ "a"]);
    console.log('platform: ', platform);

    if (platform === _platform__WEBPACK_IMPORTED_MODULE_2__[/* PLATFORM_CHROME */ "a"] || platform === _platform__WEBPACK_IMPORTED_MODULE_2__[/* PLATFORM_OPERA */ "c"]) {
      try {
        chrome.privacy.network.webRTCIPHandlingPolicy.set({
          value: chrome.privacy.IPHandlingPolicy.DISABLE_NON_PROXIED_UDP
        });
      } catch (exc) {
        console.log(exc);
      }

      this._setChromeProxy(addr);
    } else if (platform === _platform__WEBPACK_IMPORTED_MODULE_2__[/* PLATFORM_FIREFOX */ "b"]) {
      // TODO: callback/promise?
      try {
        console.log(' changing proxy....');
        const result = await browser.proxy.settings.set({
          value: {
            proxyType: "manual",
            socks: "" + addr.proxy + ":" + addr.port,
            socksVersion: 5,
            proxyDNS: true,
            passthrough: ['tuxlervpn.com', 'www.tuxlervpn.com', '*tuxlervpn.com', '*tuxlervpn.com:700', 'www.tuxlervpn.com:700', '*tuxlervpn.com:701', 'www.tuxlervpn.com:701', `*tuxlervpn.com:${addr.port}`, 'tuxler.com', 'www.tuxler.com', '*tuxler.com', '*tuxler.com:701', 'tuxler.com:701', 'www.tuxler.com:701', '*tuxler.com:700', 'tuxler.com:700', `*tuxler.com:${addr.port}`, 'www.tuxler.com:700', 'localhost', '127.0.0.1'].join(',')
          }
        });
        console.log('@@@@@result: ', result);
        window.is_proxy_set = true;
      } catch (e) {
        console.log('********* Private mode is not allowed.');
        _pages__WEBPACK_IMPORTED_MODULE_3__[/* Pages */ "g"].showPageFfPrivatePermission();
      }
    }
  },

  unset() {
    console.log('~Proxy::unset()~');
    const platform = _platform__WEBPACK_IMPORTED_MODULE_2__[/* PlatformUtils */ "d"].getPlatform(_platform__WEBPACK_IMPORTED_MODULE_2__[/* PLATFORM_CHROME */ "a"]);

    if (_storage__WEBPACK_IMPORTED_MODULE_1__[/* Storage */ "a"].app.isInstalled()) {
      _app__WEBPACK_IMPORTED_MODULE_0__[/* App */ "a"].unsetProxy();
    }

    window.is_proxy_set = false;
    window._socksProxyAddr = null;

    if (platform === _platform__WEBPACK_IMPORTED_MODULE_2__[/* PLATFORM_CHROME */ "a"] || platform === _platform__WEBPACK_IMPORTED_MODULE_2__[/* PLATFORM_OPERA */ "c"]) {
      chrome.proxy.settings.clear({
        scope: 'regular'
      }, () => {});

      try {
        chrome.privacy.network.webRTCIPHandlingPolicy.set({
          value: chrome.privacy.IPHandlingPolicy.DEFAULT
        });
      } catch (exc) {
        console.log(exc);
      }
    } else if (platform === _platform__WEBPACK_IMPORTED_MODULE_2__[/* PLATFORM_FIREFOX */ "b"]) {
      browser.proxy.settings.set({
        value: {
          proxyType: "system"
        }
      });
    }
  },

  isSet() {
    return window.is_proxy_set;
  }

};

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return PAGE_RATING; });
/* unused harmony export PAGE_INFO_MESSAGE */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return PAGE_LIMIT_FREE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return PAGE_LIMIT_PREMIUM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return PAGE_LIMIT_MULTI_LOGIN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PAGE_LIMIT_DAILY_LOGIN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PAGE_FF_PRIVATE_PERMISSION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return Pages; });
/* harmony import */ var _messages__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var _popup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var _notifications__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(15);




const PAGE_RATING = 'page_rating';
const PAGE_INFO_MESSAGE = 'page_info_message';
const PAGE_LIMIT_FREE = 'page_limit_free';
const PAGE_LIMIT_PREMIUM = 'page_limit_premium';
const PAGE_LIMIT_MULTI_LOGIN = 'page_limit_multi_login';
const PAGE_LIMIT_DAILY_LOGIN = 'page_limit_daily_login';
const PAGE_FF_PRIVATE_PERMISSION = 'page_ff_private_permission';
const Pages = {
  showRatingPage() {
    this._show(PAGE_RATING);
  },

  showInfoMessage(msg) {
    if (_popup__WEBPACK_IMPORTED_MODULE_2__[/* PopupUtils */ "a"].isPopupOpened()) {
      _messages__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].toPopup().showMessage(msg);
    } else {
      _notifications__WEBPACK_IMPORTED_MODULE_3__[/* Notifications */ "a"].showError(msg);
    }
  },

  showLimitFreePage() {
    this._show(PAGE_LIMIT_FREE);
  },

  showLimitPremiumPage() {
    this._show(PAGE_LIMIT_PREMIUM);
  },

  showLimitMultiLogin() {
    this._show(PAGE_LIMIT_MULTI_LOGIN);
  },

  showLimitDailyLogin() {
    this._show(PAGE_LIMIT_DAILY_LOGIN);
  },

  showPageFfPrivatePermission() {
    this._show(PAGE_FF_PRIVATE_PERMISSION);
  },

  _show(page) {
    if (_popup__WEBPACK_IMPORTED_MODULE_2__[/* PopupUtils */ "a"].isPopupOpened()) {
      _messages__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].toPopup().showPage(page);
    } else {
      _storage__WEBPACK_IMPORTED_MODULE_1__[/* Storage */ "a"].pages.setPage(page);
    }
  }

};

/***/ }),
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export STATUS_WRONG_USERNAME_OR_PASSWORD */
/* unused harmony export STATUS_ERROR */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return STATUS_PREMIUM_EXPIRED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return STATUS_OK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BackendApi; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _urls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);


const URL_API_HOST = "https://tuxler.com";
const URL_API_SUBMIT_RATING = URL_API_HOST + '/rating.php';
const URL_API_ACTION_HTTP = 'http://api.tuxler.com/ext_api.php?action=';
const URL_API_ACTION_HTTPS = 'https://api.tuxler.com/ext_api.php?action=';

const addErrorHandler = async (func, params = []) => {
  try {
    return await func(...params);
  } catch (err) {
    console.error(err);
    console.error(err.response);
    console.error(err.response.status);
    return {
      success: false,
      msg: err.message
    };
  }
};

const STATUS_WRONG_USERNAME_OR_PASSWORD = "WRONG_USERNAME_OR_PASSWORD";
const STATUS_ERROR = "ERROR";
const STATUS_PREMIUM_EXPIRED = "PREMIUM_EXPIRED";
const STATUS_OK = "OK";
const ACTION_LOGIN = 'LOGIN';
const ACTION_STARTUP_DATA = 'STARTUP_DATA';
const ACTION_KEEP_ALIVE = 'KEEP_ALIVE';
const ACTION_GET_NEW_SERVER = 'GET_NEW_SERVER';
const BackendApi = {
  async _doApiCall(action, params, https = true) {
    const host = https ? URL_API_ACTION_HTTPS : URL_API_ACTION_HTTP;
    const url = host + action + '&' + Object.entries(params).map(([param, value]) => param + '=' + encodeURIComponent(value)).join('&'); // console.log('~_doApiCall~ url: ', url);

    try {
      const response = await axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(Object(_urls__WEBPACK_IMPORTED_MODULE_1__[/* addUniqueIdParam */ "c"])(url));
      return response.data;
    } catch (e) {
      if (https) {
        return await this._doApiCall(action, params, false);
      }

      return {
        status: STATUS_ERROR,
        description: 'Unknown API error'
      };
    }
  },

  async startupData(username, password) {
    return await this._doApiCall(ACTION_STARTUP_DATA, {
      username,
      password
    });
  },

  async logIn(username, password) {
    return await this._doApiCall(ACTION_LOGIN, {
      username,
      password
    });
  },

  async keepAlive(username, password) {
    return await this._doApiCall(ACTION_KEEP_ALIVE, {
      username,
      password
    });
  },

  async getNewServer(username, password, country_code, city_name) {
    const params = {
      username,
      password
    };

    if (country_code) {
      params.country_code = country_code;
    }

    if (city_name) {
      params.city_name = city_name;
    }

    return await this._doApiCall(ACTION_GET_NEW_SERVER, params);
  },

  //TODO: handle error on rating submission
  async submitRating(rating, email) {
    console.log('BackendApi::submitRating()');
    return await addErrorHandler(async () => {
      // $.ajax({
      //   type: "POST",
      //   timeout: 5000,
      //   cache: false,
      //   url: "https://tuxler.com/rating.php",
      //   contentType: 'application/x-www-form-urlencoded',
      //   dataType: 'text',
      //   data: {type:'star', number:''+star_number, email:email},
      //   error: function(jqXHR, exception) {},
      //   success: function() {}
      // });
      const data = {
        type: 'star',
        number: String(rating),
        email: email
      };
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };
      return (await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(URL_API_SUBMIT_RATING, data, config)).data;
    });
  },

  async submitFeedback(feedback, email) {
    console.log('BackendApi::submitFeedback()');
    return await addErrorHandler(async () => {
      // $.ajax({
      //   type: "POST",
      //   timeout: 5000,
      //   cache: false,
      //   url: "https://tuxler.com/rating.php",
      //   contentType: 'application/x-www-form-urlencoded',
      //   dataType: 'text',
      //   data: {type:'feedback', email:email, feedback:feedback},
      //   error: function(jqXHR, exception) {},
      //   success: function() {}
      // });
      const data = {
        type: 'feedback',
        feedback,
        email
      };
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };
      return (await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(URL_API_SUBMIT_RATING, data, config)).data;
    });
  }

};

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ Badge; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* binding */ changeBadgeOnConnection; });

// CONCATENATED MODULE: ./src/js/utils.js
const MAIN_ICON = chrome.extension.getURL('img/Icon-128.png');
const changeBadge = (text, color) => {
  chrome.browserAction.setBadgeText({
    text
  });
  chrome.browserAction.setBadgeBackgroundColor({
    color
  });
};
const showNotification = (title, message) => {
  chrome.notifications.create(title, {
    type: 'basic',
    iconUrl: MAIN_ICON,
    title,
    message
  });
};
const getActiveTab = () => {
  return new Promise(resolve => {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, tabs => resolve(tabs[0]));
  });
};
// CONCATENATED MODULE: ./src/js/badge.js

const COLOR_GREEN = '#00B100'; //[0, 177, 0, 255];

const COLOR_RED = '#FF0000'; //[255, 0, 0, 255];

const Badge = {
  setNotInstalled() {
    changeBadge('!', COLOR_RED);
  },

  setConnected(iso) {
    console.trace('~Badge.setConnected~', iso);
    changeBadge(iso, COLOR_GREEN);
  },

  setDisconnected() {
    changeBadge('', COLOR_GREEN);
  }

};
const changeBadgeOnConnection = () => {
  let countryISO = "any";
  chrome.storage.local.get('currentCountryISO', function (_currentCountryISO) {
    if (_currentCountryISO.currentCountryISO && _currentCountryISO.currentCountryISO.length > 0) {
      countryISO = _currentCountryISO.currentCountryISO;
    }

    Badge.setConnected(countryISO);
  });
};

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ App; });

// CONCATENATED MODULE: ./src/data/serverIpList.js
const SERVER_IP_LIST = [[{
  "country": "Any",
  "countryISO": "any",
  "cities": ["Any"],
  "last": false,
  "flag": "../img/flags/_unknown.png"
}, {
  "country": "Canada",
  "countryISO": "CA",
  "cities": ["Any", "Toronto"],
  "last": false,
  "flag": "../img/flags/CA.png"
}, {
  "country": "Germany",
  "countryISO": "DE",
  "cities": ["Any", "Frankfurt am Main"],
  "last": false,
  "flag": "../img/flags/DE.png"
}, {
  "country": "India",
  "countryISO": "IN",
  "cities": ["Any", "Bangalore"],
  "last": false,
  "flag": "../img/flags/IN.png"
}, {
  "country": "Netherlands",
  "countryISO": "NL",
  "cities": ["Any", "Amsterdam"],
  "last": false,
  "flag": "../img/flags/NL.png"
}, {
  "country": "Singapore",
  "countryISO": "SG",
  "cities": ["Any", "Singapore"],
  "last": false,
  "flag": "../img/flags/SG.png"
}, {
  "country": "United Kingdom",
  "countryISO": "GB",
  "cities": ["Any", "London"],
  "last": false,
  "flag": "../img/flags/GB.png"
}, {
  "country": "United States",
  "countryISO": "US",
  "cities": ["Any", "North Bergen", "Santa Clara", "New York City", "Clifton"],
  "last": true,
  "flag": "../img/flags/US.png"
}], [{
  "country": "Albania",
  "countryISO": "AL",
  "cities": ["Any", "Tirana"],
  "last": false,
  "flag": "../img/flags/AL.png"
}, {
  "country": "Algeria",
  "countryISO": "DZ",
  "cities": ["Any", "Algiers", "Annaba", "Bejaia", "Blida", "Constantine", "Oran"],
  "last": false,
  "flag": "../img/flags/DZ.png"
}, {
  "country": "Angola",
  "countryISO": "AO",
  "cities": ["Any", "Luanda"],
  "last": false,
  "flag": "../img/flags/AO.png"
}, {
  "country": "Any",
  "countryISO": "any",
  "cities": ["Any"],
  "last": false,
  "flag": "../img/flags/_unknown.png"
}, {
  "country": "Argentina",
  "countryISO": "AR",
  "cities": ["Any", "Buenos Aires", "Cordoba", "La Plata", "Mar del Plata", "Mendoza", "Posadas", "Rosario", "San Cristobal", "San Francisco", "San Juan"],
  "last": false,
  "flag": "../img/flags/AR.png"
}, {
  "country": "Armenia",
  "countryISO": "AM",
  "cities": ["Any", "Yerevan"],
  "last": false,
  "flag": "../img/flags/AM.png"
}, {
  "country": "Australia",
  "countryISO": "AU",
  "cities": ["Any", "Adelaide", "Albany", "Alexandria", "Brisbane", "Canberra", "Concord", "George Town", "Gold Coast", "Hamilton", "Melbourne", "Newcastle", "Perth", "Portland", "Richmond", "Sheffield", "Sydney", "Wellington"],
  "last": false,
  "flag": "../img/flags/AU.png"
}, {
  "country": "Austria",
  "countryISO": "AT",
  "cities": ["Any", "Vienna"],
  "last": false,
  "flag": "../img/flags/AT.png"
}, {
  "country": "Azerbaijan",
  "countryISO": "AZ",
  "cities": ["Any", "Baku"],
  "last": false,
  "flag": "../img/flags/AZ.png"
}, {
  "country": "Bangladesh",
  "countryISO": "BD",
  "cities": ["Any", "Chittagong", "Dhaka", "Khulna", "Mymensingh", "Rajshahi"],
  "last": false,
  "flag": "../img/flags/BD.png"
}, {
  "country": "Belarus",
  "countryISO": "BY",
  "cities": ["Any", "Brest", "Minsk"],
  "last": false,
  "flag": "../img/flags/BY.png"
}, {
  "country": "Belgium",
  "countryISO": "BE",
  "cities": ["Any", "Antwerpen", "Brussels", "Charleroi", "Gent", "Liege"],
  "last": false,
  "flag": "../img/flags/BE.png"
}, {
  "country": "Benin",
  "countryISO": "BJ",
  "cities": ["Any", "Cotonou", "Porto-Novo"],
  "last": false,
  "flag": "../img/flags/BJ.png"
}, {
  "country": "Bolivia",
  "countryISO": "BO",
  "cities": ["Any", "La Paz"],
  "last": false,
  "flag": "../img/flags/BO.png"
}, {
  "country": "Brazil",
  "countryISO": "BR",
  "cities": ["Any", "Aracaju", "Belem", "Belo Horizonte", "Brasilia", "Campinas", "Campo Grande", "Campos", "Curitiba", "Feira de Santana", "Florianopolis", "Fortaleza", "Goiania", "Ipatinga", "Joao Pessoa", "Joinville", "Juiz de Fora", "Londrina", "Macau", "Manaus", "Maringa", "Montes Claros", "Porto Alegre", "Recife", "Ribeirao Preto", "Rio de Janeiro", "Salvador", "Santos", "Sao Jose dos Campos", "Sao Paulo", "Sorocaba", "Teresina", "Toledo", "Uberlandia", "Valparaiso", "Vila Velha"],
  "last": false,
  "flag": "../img/flags/BR.png"
}, {
  "country": "Bulgaria",
  "countryISO": "BG",
  "cities": ["Any", "Plovdiv", "Sofia", "Varna"],
  "last": false,
  "flag": "../img/flags/BG.png"
}, {
  "country": "Burkina Faso",
  "countryISO": "BF",
  "cities": ["Any", "Ouagadougou"],
  "last": false,
  "flag": "../img/flags/BF.png"
}, {
  "country": "Cambodia",
  "countryISO": "KH",
  "cities": ["Any", "Phnom Penh"],
  "last": false,
  "flag": "../img/flags/KH.png"
}, {
  "country": "Cameroon",
  "countryISO": "CM",
  "cities": ["Any", "Bamenda", "Douala", "Maroua", "Yaounde"],
  "last": false,
  "flag": "../img/flags/CM.png"
}, {
  "country": "Canada",
  "countryISO": "CA",
  "cities": ["Any", "Baltimore", "Bradford", "Calgary", "Edmonton", "Halifax", "Hamilton", "Huntsville", "Kingston", "Kitchener", "Lancaster", "London", "Montreal", "Newcastle", "Oshawa", "Ottawa", "Perth", "Quebec", "Richmond", "Sydney", "Toronto", "Vancouver", "Windsor", "Winnipeg"],
  "last": false,
  "flag": "../img/flags/CA.png"
}, {
  "country": "Chile",
  "countryISO": "CL",
  "cities": ["Any", "Antofagasta", "Concepcion", "Los Angeles", "San Antonio", "Santiago", "Valparaiso"],
  "last": false,
  "flag": "../img/flags/CL.png"
}, {
  "country": "China",
  "countryISO": "CN",
  "cities": ["Any", "Anshun", "Anyang", "Beijing", "Changsha", "Chengdu", "Chongqing", "Dalian", "Guangzhou", "Haikou", "Handan", "Hangzhou", "Harbin", "Huzhou", "Jiaxing", "Jinan", "Jincheng", "Jinhua", "Lianyungang", "Maoming", "Meizhou", "Nanjing", "Pingdingshan", "Shanghai", "Shantou", "Shenzhen", "Suzhou", "Taoyuan", "Tianjin", "Wenzhou", "Wuhan", "Wuzhou", "Xiamen", "Xuzhou", "Yantai", "Yibin", "Yulin", "Zaozhuang", "Zhanjiang", "Zhengzhou", "Zhenjiang", "Zhuhai", "Zibo"],
  "last": false,
  "flag": "../img/flags/CN.png"
}, {
  "country": "Colombia",
  "countryISO": "CO",
  "cities": ["Any", "Armenia", "Barranquilla", "Bogota", "Bucaramanga", "Cali", "Cartagena", "Ciudad Bolivar", "Cucuta", "Ibague", "La Plata", "Manizales", "Medellin", "Neiva", "Pasto", "Pereira", "San Francisco", "Santa Marta", "Toledo", "Valledupar", "Valparaiso"],
  "last": false,
  "flag": "../img/flags/CO.png"
}, {
  "country": "Congo",
  "countryISO": "CG",
  "cities": ["Any", "Pointe-Noire"],
  "last": false,
  "flag": "../img/flags/CG.png"
}, {
  "country": "Costa Rica",
  "countryISO": "CR",
  "cities": ["Any", "Buenos Aires", "San Jose"],
  "last": false,
  "flag": "../img/flags/CR.png"
}, {
  "country": "Croatia",
  "countryISO": "HR",
  "cities": ["Any", "Zagreb"],
  "last": false,
  "flag": "../img/flags/HR.png"
}, {
  "country": "Czech Republic",
  "countryISO": "CZ",
  "cities": ["Any", "Brno", "Ostrava", "Prague"],
  "last": false,
  "flag": "../img/flags/CZ.png"
}, {
  "country": "Dominican Republic",
  "countryISO": "DO",
  "cities": ["Any", "San Cristobal"],
  "last": false,
  "flag": "../img/flags/DO.png"
}, {
  "country": "Ecuador",
  "countryISO": "EC",
  "cities": ["Any", "Guayaquil", "Quito"],
  "last": false,
  "flag": "../img/flags/EC.png"
}, {
  "country": "Egypt",
  "countryISO": "EG",
  "cities": ["Any", "Alexandria", "Aswan", "Asyut", "Cairo", "Damanhur", "Luxor", "Suez", "Tanta"],
  "last": false,
  "flag": "../img/flags/EG.png"
}, {
  "country": "El Salvador",
  "countryISO": "SV",
  "cities": ["Any", "Armenia", "San Salvador", "Santa Ana"],
  "last": false,
  "flag": "../img/flags/SV.png"
}, {
  "country": "Estonia",
  "countryISO": "EE",
  "cities": ["Any", "Tallinn"],
  "last": false,
  "flag": "../img/flags/EE.png"
}, {
  "country": "Ethiopia",
  "countryISO": "ET",
  "cities": ["Any", "Addis Ababa"],
  "last": false,
  "flag": "../img/flags/ET.png"
}, {
  "country": "Finland",
  "countryISO": "FI",
  "cities": ["Any", "Helsinki"],
  "last": false,
  "flag": "../img/flags/FI.png"
}, {
  "country": "France",
  "countryISO": "FR",
  "cities": ["Any", "Brest", "Marseille", "Nice", "Paris", "Toulon"],
  "last": false,
  "flag": "../img/flags/FR.png"
}, {
  "country": "Gabon",
  "countryISO": "GA",
  "cities": ["Any", "Libreville"],
  "last": false,
  "flag": "../img/flags/GA.png"
}, {
  "country": "Germany",
  "countryISO": "DE",
  "cities": ["Any", "Berlin", "Bielefeld", "Bonn", "Bremen", "Dortmund", "Dresden", "Duisburg", "Hamburg", "Heidelberg", "Karlsruhe", "Mannheim", "Munich", "Stuttgart", "Wiesbaden"],
  "last": false,
  "flag": "../img/flags/DE.png"
}, {
  "country": "Ghana",
  "countryISO": "GH",
  "cities": ["Any", "Accra", "Kumasi", "Tamale"],
  "last": false,
  "flag": "../img/flags/GH.png"
}, {
  "country": "Greece",
  "countryISO": "GR",
  "cities": ["Any", "Athens"],
  "last": false,
  "flag": "../img/flags/GR.png"
}, {
  "country": "Guinea",
  "countryISO": "GN",
  "cities": ["Any", "Conakry"],
  "last": false,
  "flag": "../img/flags/GN.png"
}, {
  "country": "Haiti",
  "countryISO": "HT",
  "cities": ["Any", "Port-au-Prince"],
  "last": false,
  "flag": "../img/flags/HT.png"
}, {
  "country": "Honduras",
  "countryISO": "HN",
  "cities": ["Any", "Tegucigalpa"],
  "last": false,
  "flag": "../img/flags/HN.png"
}, {
  "country": "Hungary",
  "countryISO": "HU",
  "cities": ["Any", "Budapest"],
  "last": false,
  "flag": "../img/flags/HU.png"
}, {
  "country": "India",
  "countryISO": "IN",
  "cities": ["Any", "Agra", "Ahmedabad", "Allahabad", "Bangalore", "Bareilly", "Belgaum", "Bhopal", "Bhubaneshwar", "Bikaner", "Brahmapur", "Chandigarh", "Chennai", "Coimbatore", "Delhi", "Dhaka", "Guntur", "Guwahati", "Gwalior", "Hyderabad", "Indore", "Jaipur", "Kanpur", "Kolhapur", "Kolkata", "Lucknow", "Ludhiana", "Madurai", "Mathura", "Mumbai", "Muzaffarpur", "Nellore", "New Delhi", "Oran", "Patiala", "Pune", "Raipur", "Rohtak", "Salem", "Surat", "Thiruvananthapuram", "Udaipur", "Vadodara", "Vishakhapatnam"],
  "last": false,
  "flag": "../img/flags/IN.png"
}, {
  "country": "Indonesia",
  "countryISO": "ID",
  "cities": ["Any", "Balikpapan", "Bandung", "Bekasi", "Bengkulu", "Bogor", "Bukittinggi", "Denpasar", "Jakarta", "Mataram", "Medan", "Palembang", "Palu", "Samarinda", "Semarang", "Surabaya", "Surakarta", "Yogyakarta"],
  "last": false,
  "flag": "../img/flags/ID.png"
}, {
  "country": "Iraq",
  "countryISO": "IQ",
  "cities": ["Any", "Ad Diwaniyah", "An Nasiriyah", "As Sulaymaniyah", "Baghdad"],
  "last": false,
  "flag": "../img/flags/IQ.png"
}, {
  "country": "Ireland",
  "countryISO": "IE",
  "cities": ["Any", "Dublin"],
  "last": false,
  "flag": "../img/flags/IE.png"
}, {
  "country": "Israel",
  "countryISO": "IL",
  "cities": ["Any", "Haifa", "Jerusalem"],
  "last": false,
  "flag": "../img/flags/IL.png"
}, {
  "country": "Italy",
  "countryISO": "IT",
  "cities": ["Any", "Bari", "Bologna", "Florence", "Milan", "Naples", "Palermo", "Pescara", "Rome", "Verona"],
  "last": false,
  "flag": "../img/flags/IT.png"
}, {
  "country": "Jamaica",
  "countryISO": "JM",
  "cities": ["Any", "Kingston"],
  "last": false,
  "flag": "../img/flags/JM.png"
}, {
  "country": "Japan",
  "countryISO": "JP",
  "cities": ["Any", "Akita", "Gifu", "Hamamatsu", "Miyazaki", "Nagasaki", "Nagoya", "Naha", "Okayama", "Tokyo", "Yokohama"],
  "last": false,
  "flag": "../img/flags/JP.png"
}, {
  "country": "Jordan",
  "countryISO": "JO",
  "cities": ["Any", "Amman", "Irbid"],
  "last": false,
  "flag": "../img/flags/JO.png"
}, {
  "country": "Kazakhstan",
  "countryISO": "KZ",
  "cities": ["Any", "Almaty", "Astana", "Pavlodar", "Qaraghandy", "Semey", "Taraz"],
  "last": false,
  "flag": "../img/flags/KZ.png"
}, {
  "country": "Kyrgyzstan",
  "countryISO": "KG",
  "cities": ["Any", "Osh"],
  "last": false,
  "flag": "../img/flags/KG.png"
}, {
  "country": "Latvia",
  "countryISO": "LV",
  "cities": ["Any", "Riga"],
  "last": false,
  "flag": "../img/flags/LV.png"
}, {
  "country": "Lebanon",
  "countryISO": "LB",
  "cities": ["Any", "Beirut", "Tripoli"],
  "last": false,
  "flag": "../img/flags/LB.png"
}, {
  "country": "Liberia",
  "countryISO": "LR",
  "cities": ["Any", "Monrovia"],
  "last": false,
  "flag": "../img/flags/LR.png"
}, {
  "country": "Libyan Arab Jamahiriya",
  "countryISO": "LY",
  "cities": ["Any", "Misratah", "Tripoli"],
  "last": false,
  "flag": "../img/flags/LY.png"
}, {
  "country": "Lithuania",
  "countryISO": "LT",
  "cities": ["Any", "Kaunas", "Vilnius"],
  "last": false,
  "flag": "../img/flags/LT.png"
}, {
  "country": "Macedonia",
  "countryISO": "MK",
  "cities": ["Any", "Skopje"],
  "last": false,
  "flag": "../img/flags/MK.png"
}, {
  "country": "Madagascar",
  "countryISO": "MG",
  "cities": ["Any", "Antananarivo"],
  "last": false,
  "flag": "../img/flags/MG.png"
}, {
  "country": "Malawi",
  "countryISO": "MW",
  "cities": ["Any", "Lilongwe"],
  "last": false,
  "flag": "../img/flags/MW.png"
}, {
  "country": "Malaysia",
  "countryISO": "MY",
  "cities": ["Any", "Butterworth", "George Town", "Ipoh", "Kota Kinabalu", "Kuala Lumpur", "Sandakan", "Shah Alam", "Sungai Petani"],
  "last": false,
  "flag": "../img/flags/MY.png"
}, {
  "country": "Mauritius",
  "countryISO": "MU",
  "cities": ["Any", "Port Louis"],
  "last": false,
  "flag": "../img/flags/MU.png"
}, {
  "country": "Mexico",
  "countryISO": "MX",
  "cities": ["Any", "Aguascalientes", "Ciudad Juarez", "Culiacan", "Durango", "Gomez Palacio", "Guadalajara", "Hermosillo", "La Paz", "Leon", "Merida", "Mexicali", "Monterrey", "Nuevo Laredo", "Reynosa", "Santa Ana", "Tampico", "Tijuana", "Toluca", "Villahermosa", "Zaragoza"],
  "last": false,
  "flag": "../img/flags/MX.png"
}, {
  "country": "Mongolia",
  "countryISO": "MN",
  "cities": ["Any", "Ulaanbaatar"],
  "last": false,
  "flag": "../img/flags/MN.png"
}, {
  "country": "Morocco",
  "countryISO": "MA",
  "cities": ["Any", "Agadir", "Casablanca", "Kenitra", "Ksar el Kebir", "Meknes", "Rabat", "Safi", "Tangier"],
  "last": false,
  "flag": "../img/flags/MA.png"
}, {
  "country": "Mozambique",
  "countryISO": "MZ",
  "cities": ["Any", "Maputo"],
  "last": false,
  "flag": "../img/flags/MZ.png"
}, {
  "country": "Myanmar",
  "countryISO": "MM",
  "cities": ["Any", "Rangoon"],
  "last": false,
  "flag": "../img/flags/MM.png"
}, {
  "country": "Nepal",
  "countryISO": "NP",
  "cities": ["Any", "Kathmandu"],
  "last": false,
  "flag": "../img/flags/NP.png"
}, {
  "country": "Netherlands",
  "countryISO": "NL",
  "cities": ["Any", "Amsterdam", "Eindhoven", "Rotterdam", "Utrecht"],
  "last": false,
  "flag": "../img/flags/NL.png"
}, {
  "country": "New Zealand",
  "countryISO": "NZ",
  "cities": ["Any", "Albany", "Auckland", "Christchurch", "Hamilton", "Richmond", "Wellington"],
  "last": false,
  "flag": "../img/flags/NZ.png"
}, {
  "country": "Nicaragua",
  "countryISO": "NI",
  "cities": ["Any", "Leon", "Managua"],
  "last": false,
  "flag": "../img/flags/NI.png"
}, {
  "country": "Nigeria",
  "countryISO": "NG",
  "cities": ["Any", "Abeokuta", "Abuja", "Enugu", "Ibadan", "Ilorin", "Kano", "Lagos", "Port Harcourt", "Sapele"],
  "last": false,
  "flag": "../img/flags/NG.png"
}, {
  "country": "Norway",
  "countryISO": "NO",
  "cities": ["Any", "Oslo"],
  "last": false,
  "flag": "../img/flags/NO.png"
}, {
  "country": "Oman",
  "countryISO": "OM",
  "cities": ["Any", "Muscat"],
  "last": false,
  "flag": "../img/flags/OM.png"
}, {
  "country": "Pakistan",
  "countryISO": "PK",
  "cities": ["Any", "Bahawalpur", "Faisalabad", "Gujranwala", "Gujrat", "Hyderabad", "Islamabad", "Karachi", "Kohat", "Lahore", "Mardan", "Multan", "Peshawar", "Quetta", "Rahim Yar Khan", "Rawalpindi", "Sargodha", "Sukkur"],
  "last": false,
  "flag": "../img/flags/PK.png"
}, {
  "country": "Paraguay",
  "countryISO": "PY",
  "cities": ["Any", "Asuncion", "Concepcion"],
  "last": false,
  "flag": "../img/flags/PY.png"
}, {
  "country": "Peru",
  "countryISO": "PE",
  "cities": ["Any", "Arequipa", "Concepcion", "Lima", "Santiago", "Trujillo"],
  "last": false,
  "flag": "../img/flags/PE.png"
}, {
  "country": "Philippines",
  "countryISO": "PH",
  "cities": ["Any", "Bacolod", "Batangas", "Cagayan de Oro", "Davao", "Iloilo", "Manila", "Naga", "Olongapo", "San Diego", "San Jose", "San Juan", "Toledo", "Valencia"],
  "last": false,
  "flag": "../img/flags/PH.png"
}, {
  "country": "Poland",
  "countryISO": "PL",
  "cities": ["Any", "Katowice", "Krakow", "Lublin", "Szczecin", "Warsaw"],
  "last": false,
  "flag": "../img/flags/PL.png"
}, {
  "country": "Portugal",
  "countryISO": "PT",
  "cities": ["Any", "Braga", "Lisbon", "Porto"],
  "last": false,
  "flag": "../img/flags/PT.png"
}, {
  "country": "Qatar",
  "countryISO": "QA",
  "cities": ["Any", "Doha"],
  "last": false,
  "flag": "../img/flags/QA.png"
}, {
  "country": "Romania",
  "countryISO": "RO",
  "cities": ["Any", "Alexandria", "Bucharest", "Cluj-Napoca", "Craiova"],
  "last": false,
  "flag": "../img/flags/RO.png"
}, {
  "country": "Russian Federation",
  "countryISO": "RU",
  "cities": ["Any", "Barnaul", "Belgorod", "Bryansk", "Cheboksary", "Chelyabinsk", "Cherepovets", "Chita", "Irkutsk", "Ivanovo", "Izhevsk", "Kaliningrad", "Kaluga", "Kazan", "Kemerovo", "Khabarovsk", "Kirov", "Krasnodar", "Krasnoyarsk", "Kurgan", "Kursk", "Lipetsk", "Magnitogorsk", "Makhachkala", "Moscow", "Naberezhnyye Chelny", "Novokuznetsk", "Novosibirsk", "Omsk", "Orel", "Orenburg", "Penza", "Samara", "Saransk", "Saratov", "Smolensk", "Sochi", "Tolyatti", "Tomsk", "Tula", "Ufa", "Vladimir", "Vladivostok", "Volgograd", "Voronezh", "Yekaterinburg"],
  "last": false,
  "flag": "../img/flags/RU.png"
}, {
  "country": "Saudi Arabia",
  "countryISO": "SA",
  "cities": ["Any", "Buraydah", "Jeddah", "Medina", "Najran", "Riyadh", "Tabuk"],
  "last": false,
  "flag": "../img/flags/SA.png"
}, {
  "country": "Senegal",
  "countryISO": "SN",
  "cities": ["Any", "Dakar"],
  "last": false,
  "flag": "../img/flags/SN.png"
}, {
  "country": "Singapore",
  "countryISO": "SG",
  "cities": ["Any", "Singapore"],
  "last": false,
  "flag": "../img/flags/SG.png"
}, {
  "country": "Slovakia",
  "countryISO": "SK",
  "cities": ["Any", "Bratislava"],
  "last": false,
  "flag": "../img/flags/SK.png"
}, {
  "country": "Slovenia",
  "countryISO": "SI",
  "cities": ["Any", "Ljubljana"],
  "last": false,
  "flag": "../img/flags/SI.png"
}, {
  "country": "Somalia",
  "countryISO": "SO",
  "cities": ["Any", "Mogadishu"],
  "last": false,
  "flag": "../img/flags/SO.png"
}, {
  "country": "South Africa",
  "countryISO": "ZA",
  "cities": ["Any", "Cape Town", "Durban", "Heidelberg", "Johannesburg", "Newcastle", "Pietermaritzburg", "Port Elizabeth", "Pretoria", "Utrecht"],
  "last": false,
  "flag": "../img/flags/ZA.png"
}, {
  "country": "Spain",
  "countryISO": "ES",
  "cities": ["Any", "Alicante", "Barcelona", "Bilbao", "Cartagena", "Cordoba", "El Paso", "Guadalajara", "Leon", "Madrid", "Malaga", "Murcia", "Palma", "San Sebastian", "Santa Cruz de Tenerife", "Santa Marta", "Toledo", "Valencia", "Zaragoza"],
  "last": false,
  "flag": "../img/flags/ES.png"
}, {
  "country": "Sweden",
  "countryISO": "SE",
  "cities": ["Any", "Stockholm"],
  "last": false,
  "flag": "../img/flags/SE.png"
}, {
  "country": "Switzerland",
  "countryISO": "CH",
  "cities": ["Any", "Basel", "Geneva"],
  "last": false,
  "flag": "../img/flags/CH.png"
}, {
  "country": "Tanzania",
  "countryISO": "TZ",
  "cities": ["Any", "Dar es Salaam"],
  "last": false,
  "flag": "../img/flags/TZ.png"
}, {
  "country": "Thailand",
  "countryISO": "TH",
  "cities": ["Any", "Bangkok", "Chiang Mai", "Hat Yai"],
  "last": false,
  "flag": "../img/flags/TH.png"
}, {
  "country": "Togo",
  "countryISO": "TG",
  "cities": ["Any", "Lome"],
  "last": false,
  "flag": "../img/flags/TG.png"
}, {
  "country": "Tunisia",
  "countryISO": "TN",
  "cities": ["Any", "Sfax", "Sousse", "Tunis"],
  "last": false,
  "flag": "../img/flags/TN.png"
}, {
  "country": "Turkey",
  "countryISO": "TR",
  "cities": ["Any", "Adana", "Ankara", "Antalya", "Antioch", "Batman", "Bursa", "Denizli", "Erzurum", "Gaziantep", "Istanbul", "Kayseri", "Konya", "Palu", "Samsun", "Tarsus", "Trabzon", "Van"],
  "last": false,
  "flag": "../img/flags/TR.png"
}, {
  "country": "Uganda",
  "countryISO": "UG",
  "cities": ["Any", "Kampala"],
  "last": false,
  "flag": "../img/flags/UG.png"
}, {
  "country": "Ukraine",
  "countryISO": "UA",
  "cities": ["Any", "Kiev"],
  "last": false,
  "flag": "../img/flags/UA.png"
}, {
  "country": "United Arab Emirates",
  "countryISO": "AE",
  "cities": ["Any", "Abu Dhabi", "Dubai", "Sharjah"],
  "last": false,
  "flag": "../img/flags/AE.png"
}, {
  "country": "United Kingdom",
  "countryISO": "GB",
  "cities": ["Any", "Birmingham", "Boston", "Bradford", "Bristol", "Cardiff", "Christchurch", "Dallas", "Durham", "Flint", "Glasgow", "Halifax", "Lancaster", "Leeds", "Leicester", "London", "Manchester", "Melbourne", "Newcastle", "Nottingham", "Portsmouth", "Reading", "Richmond", "Rochester", "Sheffield", "Springfield", "Sunderland", "Washington", "Wellington", "Windsor"],
  "last": false,
  "flag": "../img/flags/GB.png"
}, {
  "country": "United States",
  "countryISO": "US",
  "cities": ["Any", "Akron", "Albany", "Albuquerque", "Alexandria", "Allentown", "Amsterdam", "Anaheim", "Ann Arbor", "Antioch", "Arlington", "Athens", "Atlanta", "Augusta", "Aurora", "Austin", "Bakersfield", "Baltimore", "Birmingham", "Boston", "Bradford", "Bridgeport", "Bristol", "Bronx", "Brooklyn", "Buffalo", "Cape Coral", "Charleston", "Charlotte", "Chattanooga", "Chicago", "Cincinnati", "Cleveland", "Colorado Springs", "Columbia", "Columbus", "Concord", "Dallas", "Dayton", "Denton", "Denver", "Des Moines", "Detroit", "Dublin", "Durango", "Durham", "El Paso", "Fayetteville", "Flint", "Florence", "Fort Collins", "Fort Worth", "Fresno", "Geneva", "Glasgow", "Grand Rapids", "Greensboro", "Greenville", "Hamilton", "Harrisburg", "Hartford", "Honolulu", "Houston", "Huntsville", "Indianapolis", "Jackson", "Jacksonville", "Kansas City", "Kingston", "Kissimmee", "Knoxville", "Lancaster", "Lansing", "Las Vegas", "Leicester", "Leon", "Lexington", "Lima", "Little Rock", "London", "Los Angeles", "Louisville", "Madison", "Manchester", "Manhattan", "Medina", "Melbourne", "Memphis", "Mesa", "Miami", "Milwaukee", "Minneapolis", "Monrovia", "Moscow", "Naples", "Nashville", "New Haven", "New Orleans", "Oakland", "Odessa", "Ogden", "Oklahoma City", "Omaha", "Orlando", "Ottawa", "Oxnard", "Palm Coast", "Paris", "Pensacola", "Philadelphia", "Phoenix", "Pittsburgh", "Port Saint Lucie", "Portland", "Portsmouth", "Poughkeepsie", "Providence", "Provo", "Raleigh", "Reading", "Reno", "Richmond", "Riverside", "Rochester", "Rome", "Sacramento", "Saint Louis", "Saint Paul", "Salem", "Salt Lake City", "San Antonio", "San Diego", "San Francisco", "San Jose", "Santa Ana", "Santa Rosa", "Seattle", "Sheffield", "Springfield", "Stockholm", "Stockton", "Syracuse", "Tampa", "Toledo", "Toulon", "Tucson", "Tulsa", "Valparaiso", "Vancouver", "Verona", "Virginia Beach", "Washington", "Wellington", "Wichita", "Windsor", "Worcester", "Youngstown"],
  "last": false,
  "flag": "../img/flags/US.png"
}, {
  "country": "Uruguay",
  "countryISO": "UY",
  "cities": ["Any", "La Paz", "Montevideo", "Rosario"],
  "last": false,
  "flag": "../img/flags/UY.png"
}, {
  "country": "Uzbekistan",
  "countryISO": "UZ",
  "cities": ["Any", "Andijon", "Tashkent"],
  "last": false,
  "flag": "../img/flags/UZ.png"
}, {
  "country": "Venezuela",
  "countryISO": "VE",
  "cities": ["Any", "Barcelona", "Barquisimeto", "Cabimas", "Ciudad Bolivar", "Ciudad Guayana", "Cumana", "Maracaibo", "Maracay", "Maturin", "Merida", "Puerto La Cruz", "Rosario", "San Cristobal", "Trujillo", "Valencia"],
  "last": false,
  "flag": "../img/flags/VE.png"
}, {
  "country": "Vietnam",
  "countryISO": "VN",
  "cities": ["Any", "Bien Hoa", "Da Nang", "Hanoi", "Ho Chi Minh City", "Long Xuyen", "Vinh"],
  "last": false,
  "flag": "../img/flags/VN.png"
}, {
  "country": "Zambia",
  "countryISO": "ZM",
  "cities": ["Any", "Lusaka", "Ndola"],
  "last": false,
  "flag": "../img/flags/ZM.png"
}, {
  "country": "Zimbabwe",
  "countryISO": "ZW",
  "cities": ["Any", "Harare"],
  "last": true,
  "flag": "../img/flags/ZW.png"
}]];
// CONCATENATED MODULE: ./src/data/staticIpList.js
const STATIC_IP_LIST = [{
  "country": "Any",
  "countryISO": "any",
  "cities": ["Any"],
  "last": false,
  "flag": "../img/flags/_unknown.png"
}, {
  "country": "Albania",
  "countryISO": "AL",
  "cities": ["Any", "Tirana"],
  "last": false,
  "flag": "../img/flags/AL.png"
}, {
  "country": "Algeria",
  "countryISO": "DZ",
  "cities": ["Any", "Algiers", "Annaba", "Bejaia", "Blida", "Constantine", "Oran"],
  "last": false,
  "flag": "../img/flags/DZ.png"
}, {
  "country": "Angola",
  "countryISO": "AO",
  "cities": ["Any", "Luanda"],
  "last": false,
  "flag": "../img/flags/AO.png"
}, {
  "country": "Argentina",
  "countryISO": "AR",
  "cities": ["Any", "Buenos Aires", "Cordoba", "La Plata", "Mar del Plata", "Mendoza", "Posadas", "Rosario", "San Cristobal", "San Francisco", "San Juan"],
  "last": false,
  "flag": "../img/flags/AR.png"
}, {
  "country": "Armenia",
  "countryISO": "AM",
  "cities": ["Any", "Yerevan"],
  "last": false,
  "flag": "../img/flags/AM.png"
}, {
  "country": "Australia",
  "countryISO": "AU",
  "cities": ["Any", "Adelaide", "Albany", "Alexandria", "Brisbane", "Canberra", "Concord", "George Town", "Gold Coast", "Hamilton", "Melbourne", "Newcastle", "Perth", "Portland", "Richmond", "Sheffield", "Sydney", "Wellington"],
  "last": false,
  "flag": "../img/flags/AU.png"
}, {
  "country": "Austria",
  "countryISO": "AT",
  "cities": ["Any", "Vienna"],
  "last": false,
  "flag": "../img/flags/AT.png"
}, {
  "country": "Azerbaijan",
  "countryISO": "AZ",
  "cities": ["Any", "Baku"],
  "last": false,
  "flag": "../img/flags/AZ.png"
}, {
  "country": "Bangladesh",
  "countryISO": "BD",
  "cities": ["Any", "Chittagong", "Dhaka", "Khulna", "Mymensingh", "Rajshahi"],
  "last": false,
  "flag": "../img/flags/BD.png"
}, {
  "country": "Belarus",
  "countryISO": "BY",
  "cities": ["Any", "Brest", "Minsk"],
  "last": false,
  "flag": "../img/flags/BY.png"
}, {
  "country": "Belgium",
  "countryISO": "BE",
  "cities": ["Any", "Antwerpen", "Brussels", "Charleroi", "Gent", "Liege"],
  "last": false,
  "flag": "../img/flags/BE.png"
}, {
  "country": "Benin",
  "countryISO": "BJ",
  "cities": ["Any", "Cotonou", "Porto-Novo"],
  "last": false,
  "flag": "../img/flags/BJ.png"
}, {
  "country": "Bolivia",
  "countryISO": "BO",
  "cities": ["Any", "La Paz"],
  "last": false,
  "flag": "../img/flags/BO.png"
}, {
  "country": "Brazil",
  "countryISO": "BR",
  "cities": ["Any", "Aracaju", "Belem", "Belo Horizonte", "Brasilia", "Campinas", "Campo Grande", "Campos", "Curitiba", "Feira de Santana", "Florianopolis", "Fortaleza", "Goiania", "Ipatinga", "Joao Pessoa", "Joinville", "Juiz de Fora", "Londrina", "Macau", "Manaus", "Maringa", "Montes Claros", "Porto Alegre", "Recife", "Ribeirao Preto", "Rio de Janeiro", "Salvador", "Santos", "Sao Jose dos Campos", "Sao Paulo", "Sorocaba", "Teresina", "Toledo", "Uberlandia", "Valparaiso", "Vila Velha"],
  "last": false,
  "flag": "../img/flags/BR.png"
}, {
  "country": "Bulgaria",
  "countryISO": "BG",
  "cities": ["Any", "Plovdiv", "Sofia", "Varna"],
  "last": false,
  "flag": "../img/flags/BG.png"
}, {
  "country": "Burkina Faso",
  "countryISO": "BF",
  "cities": ["Any", "Ouagadougou"],
  "last": false,
  "flag": "../img/flags/BF.png"
}, {
  "country": "Cambodia",
  "countryISO": "KH",
  "cities": ["Any", "Phnom Penh"],
  "last": false,
  "flag": "../img/flags/KH.png"
}, {
  "country": "Cameroon",
  "countryISO": "CM",
  "cities": ["Any", "Bamenda", "Douala", "Maroua", "Yaounde"],
  "last": false,
  "flag": "../img/flags/CM.png"
}, {
  "country": "Canada",
  "countryISO": "CA",
  "cities": ["Any", "Baltimore", "Bradford", "Calgary", "Edmonton", "Halifax", "Hamilton", "Huntsville", "Kingston", "Kitchener", "Lancaster", "London", "Montreal", "Newcastle", "Oshawa", "Ottawa", "Perth", "Quebec", "Richmond", "Sydney", "Toronto", "Vancouver", "Windsor", "Winnipeg"],
  "last": false,
  "flag": "../img/flags/CA.png"
}, {
  "country": "Chile",
  "countryISO": "CL",
  "cities": ["Any", "Antofagasta", "Concepcion", "Los Angeles", "San Antonio", "Santiago", "Valparaiso"],
  "last": false,
  "flag": "../img/flags/CL.png"
}, {
  "country": "China",
  "countryISO": "CN",
  "cities": ["Any", "Anshun", "Anyang", "Beijing", "Changsha", "Chengdu", "Chongqing", "Dalian", "Guangzhou", "Haikou", "Handan", "Hangzhou", "Harbin", "Huzhou", "Jiaxing", "Jinan", "Jincheng", "Jinhua", "Lianyungang", "Maoming", "Meizhou", "Nanjing", "Pingdingshan", "Shanghai", "Shantou", "Shenzhen", "Suzhou", "Taoyuan", "Tianjin", "Wenzhou", "Wuhan", "Wuzhou", "Xiamen", "Xuzhou", "Yantai", "Yibin", "Yulin", "Zaozhuang", "Zhanjiang", "Zhengzhou", "Zhenjiang", "Zhuhai", "Zibo"],
  "last": false,
  "flag": "../img/flags/CN.png"
}, {
  "country": "Colombia",
  "countryISO": "CO",
  "cities": ["Any", "Armenia", "Barranquilla", "Bogota", "Bucaramanga", "Cali", "Cartagena", "Ciudad Bolivar", "Cucuta", "Ibague", "La Plata", "Manizales", "Medellin", "Neiva", "Pasto", "Pereira", "San Francisco", "Santa Marta", "Toledo", "Valledupar", "Valparaiso"],
  "last": false,
  "flag": "../img/flags/CO.png"
}, {
  "country": "Congo",
  "countryISO": "CG",
  "cities": ["Any", "Pointe-Noire"],
  "last": false,
  "flag": "../img/flags/CG.png"
}, {
  "country": "Costa Rica",
  "countryISO": "CR",
  "cities": ["Any", "Buenos Aires", "San Jose"],
  "last": false,
  "flag": "../img/flags/CR.png"
}, {
  "country": "Croatia",
  "countryISO": "HR",
  "cities": ["Any", "Zagreb"],
  "last": false,
  "flag": "../img/flags/HR.png"
}, {
  "country": "Czech Republic",
  "countryISO": "CZ",
  "cities": ["Any", "Brno", "Ostrava", "Prague"],
  "last": false,
  "flag": "../img/flags/CZ.png"
}, {
  "country": "Dominican Republic",
  "countryISO": "DO",
  "cities": ["Any", "San Cristobal"],
  "last": false,
  "flag": "../img/flags/DO.png"
}, {
  "country": "Ecuador",
  "countryISO": "EC",
  "cities": ["Any", "Guayaquil", "Quito"],
  "last": false,
  "flag": "../img/flags/EC.png"
}, {
  "country": "Egypt",
  "countryISO": "EG",
  "cities": ["Any", "Alexandria", "Aswan", "Asyut", "Cairo", "Damanhur", "Luxor", "Suez", "Tanta"],
  "last": false,
  "flag": "../img/flags/EG.png"
}, {
  "country": "El Salvador",
  "countryISO": "SV",
  "cities": ["Any", "Armenia", "San Salvador", "Santa Ana"],
  "last": false,
  "flag": "../img/flags/SV.png"
}, {
  "country": "Estonia",
  "countryISO": "EE",
  "cities": ["Any", "Tallinn"],
  "last": false,
  "flag": "../img/flags/EE.png"
}, {
  "country": "Ethiopia",
  "countryISO": "ET",
  "cities": ["Any", "Addis Ababa"],
  "last": false,
  "flag": "../img/flags/ET.png"
}, {
  "country": "Finland",
  "countryISO": "FI",
  "cities": ["Any", "Helsinki"],
  "last": false,
  "flag": "../img/flags/FI.png"
}, {
  "country": "France",
  "countryISO": "FR",
  "cities": ["Any", "Brest", "Marseille", "Nice", "Paris", "Toulon"],
  "last": false,
  "flag": "../img/flags/FR.png"
}, {
  "country": "Gabon",
  "countryISO": "GA",
  "cities": ["Any", "Libreville"],
  "last": false,
  "flag": "../img/flags/GA.png"
}, {
  "country": "Germany",
  "countryISO": "DE",
  "cities": ["Any", "Berlin", "Bielefeld", "Bonn", "Bremen", "Dortmund", "Dresden", "Duisburg", "Hamburg", "Heidelberg", "Karlsruhe", "Mannheim", "Munich", "Stuttgart", "Wiesbaden"],
  "last": false,
  "flag": "../img/flags/DE.png"
}, {
  "country": "Ghana",
  "countryISO": "GH",
  "cities": ["Any", "Accra", "Kumasi", "Tamale"],
  "last": false,
  "flag": "../img/flags/GH.png"
}, {
  "country": "Greece",
  "countryISO": "GR",
  "cities": ["Any", "Athens"],
  "last": false,
  "flag": "../img/flags/GR.png"
}, {
  "country": "Guinea",
  "countryISO": "GN",
  "cities": ["Any", "Conakry"],
  "last": false,
  "flag": "../img/flags/GN.png"
}, {
  "country": "Haiti",
  "countryISO": "HT",
  "cities": ["Any", "Port-au-Prince"],
  "last": false,
  "flag": "../img/flags/HT.png"
}, {
  "country": "Honduras",
  "countryISO": "HN",
  "cities": ["Any", "Tegucigalpa"],
  "last": false,
  "flag": "../img/flags/HN.png"
}, {
  "country": "Hungary",
  "countryISO": "HU",
  "cities": ["Any", "Budapest"],
  "last": false,
  "flag": "../img/flags/HU.png"
}, {
  "country": "India",
  "countryISO": "IN",
  "cities": ["Any", "Agra", "Ahmedabad", "Allahabad", "Bangalore", "Bareilly", "Belgaum", "Bhopal", "Bhubaneshwar", "Bikaner", "Brahmapur", "Chandigarh", "Chennai", "Coimbatore", "Delhi", "Dhaka", "Guntur", "Guwahati", "Gwalior", "Hyderabad", "Indore", "Jaipur", "Kanpur", "Kolhapur", "Kolkata", "Lucknow", "Ludhiana", "Madurai", "Mathura", "Mumbai", "Muzaffarpur", "Nellore", "New Delhi", "Oran", "Patiala", "Pune", "Raipur", "Rohtak", "Salem", "Surat", "Thiruvananthapuram", "Udaipur", "Vadodara", "Vishakhapatnam"],
  "last": false,
  "flag": "../img/flags/IN.png"
}, {
  "country": "Indonesia",
  "countryISO": "ID",
  "cities": ["Any", "Balikpapan", "Bandung", "Bekasi", "Bengkulu", "Bogor", "Bukittinggi", "Denpasar", "Jakarta", "Mataram", "Medan", "Palembang", "Palu", "Samarinda", "Semarang", "Surabaya", "Surakarta", "Yogyakarta"],
  "last": false,
  "flag": "../img/flags/ID.png"
}, {
  "country": "Iraq",
  "countryISO": "IQ",
  "cities": ["Any", "Ad Diwaniyah", "An Nasiriyah", "As Sulaymaniyah", "Baghdad"],
  "last": false,
  "flag": "../img/flags/IQ.png"
}, {
  "country": "Ireland",
  "countryISO": "IE",
  "cities": ["Any", "Dublin"],
  "last": false,
  "flag": "../img/flags/IE.png"
}, {
  "country": "Israel",
  "countryISO": "IL",
  "cities": ["Any", "Haifa", "Jerusalem"],
  "last": false,
  "flag": "../img/flags/IL.png"
}, {
  "country": "Italy",
  "countryISO": "IT",
  "cities": ["Any", "Bari", "Bologna", "Florence", "Milan", "Naples", "Palermo", "Pescara", "Rome", "Verona"],
  "last": false,
  "flag": "../img/flags/IT.png"
}, {
  "country": "Jamaica",
  "countryISO": "JM",
  "cities": ["Any", "Kingston"],
  "last": false,
  "flag": "../img/flags/JM.png"
}, {
  "country": "Japan",
  "countryISO": "JP",
  "cities": ["Any", "Akita", "Gifu", "Hamamatsu", "Miyazaki", "Nagasaki", "Nagoya", "Naha", "Okayama", "Tokyo", "Yokohama"],
  "last": false,
  "flag": "../img/flags/JP.png"
}, {
  "country": "Jordan",
  "countryISO": "JO",
  "cities": ["Any", "Amman", "Irbid"],
  "last": false,
  "flag": "../img/flags/JO.png"
}, {
  "country": "Kazakhstan",
  "countryISO": "KZ",
  "cities": ["Any", "Almaty", "Astana", "Pavlodar", "Qaraghandy", "Semey", "Taraz"],
  "last": false,
  "flag": "../img/flags/KZ.png"
}, {
  "country": "Kyrgyzstan",
  "countryISO": "KG",
  "cities": ["Any", "Osh"],
  "last": false,
  "flag": "../img/flags/KG.png"
}, {
  "country": "Latvia",
  "countryISO": "LV",
  "cities": ["Any", "Riga"],
  "last": false,
  "flag": "../img/flags/LV.png"
}, {
  "country": "Lebanon",
  "countryISO": "LB",
  "cities": ["Any", "Beirut", "Tripoli"],
  "last": false,
  "flag": "../img/flags/LB.png"
}, {
  "country": "Liberia",
  "countryISO": "LR",
  "cities": ["Any", "Monrovia"],
  "last": false,
  "flag": "../img/flags/LR.png"
}, {
  "country": "Libyan Arab Jamahiriya",
  "countryISO": "LY",
  "cities": ["Any", "Misratah", "Tripoli"],
  "last": false,
  "flag": "../img/flags/LY.png"
}, {
  "country": "Lithuania",
  "countryISO": "LT",
  "cities": ["Any", "Kaunas", "Vilnius"],
  "last": false,
  "flag": "../img/flags/LT.png"
}, {
  "country": "Macedonia",
  "countryISO": "MK",
  "cities": ["Any", "Skopje"],
  "last": false,
  "flag": "../img/flags/MK.png"
}, {
  "country": "Madagascar",
  "countryISO": "MG",
  "cities": ["Any", "Antananarivo"],
  "last": false,
  "flag": "../img/flags/MG.png"
}, {
  "country": "Malawi",
  "countryISO": "MW",
  "cities": ["Any", "Lilongwe"],
  "last": false,
  "flag": "../img/flags/MW.png"
}, {
  "country": "Malaysia",
  "countryISO": "MY",
  "cities": ["Any", "Butterworth", "George Town", "Ipoh", "Kota Kinabalu", "Kuala Lumpur", "Sandakan", "Shah Alam", "Sungai Petani"],
  "last": false,
  "flag": "../img/flags/MY.png"
}, {
  "country": "Mauritius",
  "countryISO": "MU",
  "cities": ["Any", "Port Louis"],
  "last": false,
  "flag": "../img/flags/MU.png"
}, {
  "country": "Mexico",
  "countryISO": "MX",
  "cities": ["Any", "Aguascalientes", "Ciudad Juarez", "Culiacan", "Durango", "Gomez Palacio", "Guadalajara", "Hermosillo", "La Paz", "Leon", "Merida", "Mexicali", "Monterrey", "Nuevo Laredo", "Reynosa", "Santa Ana", "Tampico", "Tijuana", "Toluca", "Villahermosa", "Zaragoza"],
  "last": false,
  "flag": "../img/flags/MX.png"
}, {
  "country": "Mongolia",
  "countryISO": "MN",
  "cities": ["Any", "Ulaanbaatar"],
  "last": false,
  "flag": "../img/flags/MN.png"
}, {
  "country": "Morocco",
  "countryISO": "MA",
  "cities": ["Any", "Agadir", "Casablanca", "Kenitra", "Ksar el Kebir", "Meknes", "Rabat", "Safi", "Tangier"],
  "last": false,
  "flag": "../img/flags/MA.png"
}, {
  "country": "Mozambique",
  "countryISO": "MZ",
  "cities": ["Any", "Maputo"],
  "last": false,
  "flag": "../img/flags/MZ.png"
}, {
  "country": "Myanmar",
  "countryISO": "MM",
  "cities": ["Any", "Rangoon"],
  "last": false,
  "flag": "../img/flags/MM.png"
}, {
  "country": "Nepal",
  "countryISO": "NP",
  "cities": ["Any", "Kathmandu"],
  "last": false,
  "flag": "../img/flags/NP.png"
}, {
  "country": "Netherlands",
  "countryISO": "NL",
  "cities": ["Any", "Amsterdam", "Eindhoven", "Rotterdam", "Utrecht"],
  "last": false,
  "flag": "../img/flags/NL.png"
}, {
  "country": "New Zealand",
  "countryISO": "NZ",
  "cities": ["Any", "Albany", "Auckland", "Christchurch", "Hamilton", "Richmond", "Wellington"],
  "last": false,
  "flag": "../img/flags/NZ.png"
}, {
  "country": "Nicaragua",
  "countryISO": "NI",
  "cities": ["Any", "Leon", "Managua"],
  "last": false,
  "flag": "../img/flags/NI.png"
}, {
  "country": "Nigeria",
  "countryISO": "NG",
  "cities": ["Any", "Abeokuta", "Abuja", "Enugu", "Ibadan", "Ilorin", "Kano", "Lagos", "Port Harcourt", "Sapele"],
  "last": false,
  "flag": "../img/flags/NG.png"
}, {
  "country": "Norway",
  "countryISO": "NO",
  "cities": ["Any", "Oslo"],
  "last": false,
  "flag": "../img/flags/NO.png"
}, {
  "country": "Oman",
  "countryISO": "OM",
  "cities": ["Any", "Muscat"],
  "last": false,
  "flag": "../img/flags/OM.png"
}, {
  "country": "Pakistan",
  "countryISO": "PK",
  "cities": ["Any", "Bahawalpur", "Faisalabad", "Gujranwala", "Gujrat", "Hyderabad", "Islamabad", "Karachi", "Kohat", "Lahore", "Mardan", "Multan", "Peshawar", "Quetta", "Rahim Yar Khan", "Rawalpindi", "Sargodha", "Sukkur"],
  "last": false,
  "flag": "../img/flags/PK.png"
}, {
  "country": "Paraguay",
  "countryISO": "PY",
  "cities": ["Any", "Asuncion", "Concepcion"],
  "last": false,
  "flag": "../img/flags/PY.png"
}, {
  "country": "Peru",
  "countryISO": "PE",
  "cities": ["Any", "Arequipa", "Concepcion", "Lima", "Santiago", "Trujillo"],
  "last": false,
  "flag": "../img/flags/PE.png"
}, {
  "country": "Philippines",
  "countryISO": "PH",
  "cities": ["Any", "Bacolod", "Batangas", "Cagayan de Oro", "Davao", "Iloilo", "Manila", "Naga", "Olongapo", "San Diego", "San Jose", "San Juan", "Toledo", "Valencia"],
  "last": false,
  "flag": "../img/flags/PH.png"
}, {
  "country": "Poland",
  "countryISO": "PL",
  "cities": ["Any", "Katowice", "Krakow", "Lublin", "Szczecin", "Warsaw"],
  "last": false,
  "flag": "../img/flags/PL.png"
}, {
  "country": "Portugal",
  "countryISO": "PT",
  "cities": ["Any", "Braga", "Lisbon", "Porto"],
  "last": false,
  "flag": "../img/flags/PT.png"
}, {
  "country": "Qatar",
  "countryISO": "QA",
  "cities": ["Any", "Doha"],
  "last": false,
  "flag": "../img/flags/QA.png"
}, {
  "country": "Romania",
  "countryISO": "RO",
  "cities": ["Any", "Alexandria", "Bucharest", "Cluj-Napoca", "Craiova"],
  "last": false,
  "flag": "../img/flags/RO.png"
}, {
  "country": "Russian Federation",
  "countryISO": "RU",
  "cities": ["Any", "Barnaul", "Belgorod", "Bryansk", "Cheboksary", "Chelyabinsk", "Cherepovets", "Chita", "Irkutsk", "Ivanovo", "Izhevsk", "Kaliningrad", "Kaluga", "Kazan", "Kemerovo", "Khabarovsk", "Kirov", "Krasnodar", "Krasnoyarsk", "Kurgan", "Kursk", "Lipetsk", "Magnitogorsk", "Makhachkala", "Moscow", "Naberezhnyye Chelny", "Novokuznetsk", "Novosibirsk", "Omsk", "Orel", "Orenburg", "Penza", "Samara", "Saransk", "Saratov", "Smolensk", "Sochi", "Tolyatti", "Tomsk", "Tula", "Ufa", "Vladimir", "Vladivostok", "Volgograd", "Voronezh", "Yekaterinburg"],
  "last": false,
  "flag": "../img/flags/RU.png"
}, {
  "country": "Saudi Arabia",
  "countryISO": "SA",
  "cities": ["Any", "Buraydah", "Jeddah", "Medina", "Najran", "Riyadh", "Tabuk"],
  "last": false,
  "flag": "../img/flags/SA.png"
}, {
  "country": "Senegal",
  "countryISO": "SN",
  "cities": ["Any", "Dakar"],
  "last": false,
  "flag": "../img/flags/SN.png"
}, {
  "country": "Singapore",
  "countryISO": "SG",
  "cities": ["Any", "Singapore"],
  "last": false,
  "flag": "../img/flags/SG.png"
}, {
  "country": "Slovakia",
  "countryISO": "SK",
  "cities": ["Any", "Bratislava"],
  "last": false,
  "flag": "../img/flags/SK.png"
}, {
  "country": "Slovenia",
  "countryISO": "SI",
  "cities": ["Any", "Ljubljana"],
  "last": false,
  "flag": "../img/flags/SI.png"
}, {
  "country": "Somalia",
  "countryISO": "SO",
  "cities": ["Any", "Mogadishu"],
  "last": false,
  "flag": "../img/flags/SO.png"
}, {
  "country": "South Africa",
  "countryISO": "ZA",
  "cities": ["Any", "Cape Town", "Durban", "Heidelberg", "Johannesburg", "Newcastle", "Pietermaritzburg", "Port Elizabeth", "Pretoria", "Utrecht"],
  "last": false,
  "flag": "../img/flags/ZA.png"
}, {
  "country": "Spain",
  "countryISO": "ES",
  "cities": ["Any", "Alicante", "Barcelona", "Bilbao", "Cartagena", "Cordoba", "El Paso", "Guadalajara", "Leon", "Madrid", "Malaga", "Murcia", "Palma", "San Sebastian", "Santa Cruz de Tenerife", "Santa Marta", "Toledo", "Valencia", "Zaragoza"],
  "last": false,
  "flag": "../img/flags/ES.png"
}, {
  "country": "Sweden",
  "countryISO": "SE",
  "cities": ["Any", "Stockholm"],
  "last": false,
  "flag": "../img/flags/SE.png"
}, {
  "country": "Switzerland",
  "countryISO": "CH",
  "cities": ["Any", "Basel", "Geneva"],
  "last": false,
  "flag": "../img/flags/CH.png"
}, {
  "country": "Tanzania",
  "countryISO": "TZ",
  "cities": ["Any", "Dar es Salaam"],
  "last": false,
  "flag": "../img/flags/TZ.png"
}, {
  "country": "Thailand",
  "countryISO": "TH",
  "cities": ["Any", "Bangkok", "Chiang Mai", "Hat Yai"],
  "last": false,
  "flag": "../img/flags/TH.png"
}, {
  "country": "Togo",
  "countryISO": "TG",
  "cities": ["Any", "Lome"],
  "last": false,
  "flag": "../img/flags/TG.png"
}, {
  "country": "Tunisia",
  "countryISO": "TN",
  "cities": ["Any", "Sfax", "Sousse", "Tunis"],
  "last": false,
  "flag": "../img/flags/TN.png"
}, {
  "country": "Turkey",
  "countryISO": "TR",
  "cities": ["Any", "Adana", "Ankara", "Antalya", "Antioch", "Batman", "Bursa", "Denizli", "Erzurum", "Gaziantep", "Istanbul", "Kayseri", "Konya", "Palu", "Samsun", "Tarsus", "Trabzon", "Van"],
  "last": false,
  "flag": "../img/flags/TR.png"
}, {
  "country": "Uganda",
  "countryISO": "UG",
  "cities": ["Any", "Kampala"],
  "last": false,
  "flag": "../img/flags/UG.png"
}, {
  "country": "Ukraine",
  "countryISO": "UA",
  "cities": ["Any", "Kiev"],
  "last": false,
  "flag": "../img/flags/UA.png"
}, {
  "country": "United Arab Emirates",
  "countryISO": "AE",
  "cities": ["Any", "Abu Dhabi", "Dubai", "Sharjah"],
  "last": false,
  "flag": "../img/flags/AE.png"
}, {
  "country": "United Kingdom",
  "countryISO": "GB",
  "cities": ["Any", "Birmingham", "Boston", "Bradford", "Bristol", "Cardiff", "Christchurch", "Dallas", "Durham", "Flint", "Glasgow", "Halifax", "Lancaster", "Leeds", "Leicester", "London", "Manchester", "Melbourne", "Newcastle", "Nottingham", "Portsmouth", "Reading", "Richmond", "Rochester", "Sheffield", "Springfield", "Sunderland", "Washington", "Wellington", "Windsor"],
  "last": false,
  "flag": "../img/flags/GB.png"
}, {
  "country": "United States",
  "countryISO": "US",
  "cities": ["Any", "Akron", "Albany", "Albuquerque", "Alexandria", "Allentown", "Amsterdam", "Anaheim", "Ann Arbor", "Antioch", "Arlington", "Athens", "Atlanta", "Augusta", "Aurora", "Austin", "Bakersfield", "Baltimore", "Birmingham", "Boston", "Bradford", "Bridgeport", "Bristol", "Bronx", "Brooklyn", "Buffalo", "Cape Coral", "Charleston", "Charlotte", "Chattanooga", "Chicago", "Cincinnati", "Cleveland", "Colorado Springs", "Columbia", "Columbus", "Concord", "Dallas", "Dayton", "Denton", "Denver", "Des Moines", "Detroit", "Dublin", "Durango", "Durham", "El Paso", "Fayetteville", "Flint", "Florence", "Fort Collins", "Fort Worth", "Fresno", "Geneva", "Glasgow", "Grand Rapids", "Greensboro", "Greenville", "Hamilton", "Harrisburg", "Hartford", "Honolulu", "Houston", "Huntsville", "Indianapolis", "Jackson", "Jacksonville", "Kansas City", "Kingston", "Kissimmee", "Knoxville", "Lancaster", "Lansing", "Las Vegas", "Leicester", "Leon", "Lexington", "Lima", "Little Rock", "London", "Los Angeles", "Louisville", "Madison", "Manchester", "Manhattan", "Medina", "Melbourne", "Memphis", "Mesa", "Miami", "Milwaukee", "Minneapolis", "Monrovia", "Moscow", "Naples", "Nashville", "New Haven", "New Orleans", "Oakland", "Odessa", "Ogden", "Oklahoma City", "Omaha", "Orlando", "Ottawa", "Oxnard", "Palm Coast", "Paris", "Pensacola", "Philadelphia", "Phoenix", "Pittsburgh", "Port Saint Lucie", "Portland", "Portsmouth", "Poughkeepsie", "Providence", "Provo", "Raleigh", "Reading", "Reno", "Richmond", "Riverside", "Rochester", "Rome", "Sacramento", "Saint Louis", "Saint Paul", "Salem", "Salt Lake City", "San Antonio", "San Diego", "San Francisco", "San Jose", "Santa Ana", "Santa Rosa", "Seattle", "Sheffield", "Springfield", "Stockholm", "Stockton", "Syracuse", "Tampa", "Toledo", "Toulon", "Tucson", "Tulsa", "Valparaiso", "Vancouver", "Verona", "Virginia Beach", "Washington", "Wellington", "Wichita", "Windsor", "Worcester", "Youngstown"],
  "last": false,
  "flag": "../img/flags/US.png"
}, {
  "country": "Uruguay",
  "countryISO": "UY",
  "cities": ["Any", "La Paz", "Montevideo", "Rosario"],
  "last": false,
  "flag": "../img/flags/UY.png"
}, {
  "country": "Uzbekistan",
  "countryISO": "UZ",
  "cities": ["Any", "Andijon", "Tashkent"],
  "last": false,
  "flag": "../img/flags/UZ.png"
}, {
  "country": "Venezuela",
  "countryISO": "VE",
  "cities": ["Any", "Barcelona", "Barquisimeto", "Cabimas", "Ciudad Bolivar", "Ciudad Guayana", "Cumana", "Maracaibo", "Maracay", "Maturin", "Merida", "Puerto La Cruz", "Rosario", "San Cristobal", "Trujillo", "Valencia"],
  "last": false,
  "flag": "../img/flags/VE.png"
}, {
  "country": "Vietnam",
  "countryISO": "VN",
  "cities": ["Any", "Bien Hoa", "Da Nang", "Hanoi", "Ho Chi Minh City", "Long Xuyen", "Vinh"],
  "last": false,
  "flag": "../img/flags/VN.png"
}, {
  "country": "Zambia",
  "countryISO": "ZM",
  "cities": ["Any", "Lusaka", "Ndola"],
  "last": false,
  "flag": "../img/flags/ZM.png"
}, {
  "country": "Zimbabwe",
  "countryISO": "ZW",
  "cities": ["Any", "Harare"],
  "last": true,
  "flag": "../img/flags/ZW.png"
}];
// CONCATENATED MODULE: ./src/js/models/ipList.js



const ANY_TEXT = "Any"; //json containig new country/city list

function IPListUpdate(list_all) {
  var keys = ['server', 'residential'];
  var ret_fin = [];
  var iplist = [[], []];
  var total = 0;
  var total_made = {
    cnt: 0
  };

  for (var i_1 = 0; i_1 < keys.length; i_1++) {
    var json = list_all[i_1];
    total += json.length;
  }

  for (var i_1 = 0; i_1 < keys.length; i_1++) {
    var json = list_all[i_1];
    var total_local = json.length;

    for (var i = 0; i < total_local; i++) {
      (function (index, c_index, total_made_) {
        var tmp = json[index];
        tmp.last = index == total_local - 1;
        App.getCountryFlagName(tmp.countryISO, function (ret) {
          tmp.flag = "../img/flags/" + ret;
          iplist[c_index].push(tmp);
          total_made_.cnt++;

          if (tmp.last) {
            if (total_made_.cnt == total) {
              chrome.storage.local.set({
                "serveriplist": iplist
              });
            }
          }
        });
      })(i, i_1, total_made);
    }
  }
}

const IPList = function () {
  chrome.storage.local.get('serveriplist', function (result) {
    if (typeof result.serveriplist === 'undefined') {
      chrome.storage.local.set({
        "serveriplist": SERVER_IP_LIST
      });
    }
  });
  chrome.storage.local.get('staticiplist', function (result) {
    if (typeof result.staticiplist === 'undefined') {
      chrome.storage.local.set({
        "staticiplist": STATIC_IP_LIST
      });
    }
  });
};

IPList.prototype.getAvailableCountriesCities = function (list_all) {
  var keys = ['server', 'residential'];
  var ret_fin = [];

  for (var i_1 = 0; i_1 < keys.length; i_1++) {
    var list = list_all[keys[i_1]];
    var ret = [{
      'country': ANY_TEXT,
      'countryISO': ANY_TEXT.toLowerCase(),
      'cities': [ANY_TEXT]
    }];
    var count_countries = Object.keys(list).length;

    for (var ciso in list) {
      var data = list[ciso];
      var cfull = data.country_full;
      if (["a1", "a2", "kp"].indexOf(ciso.toLowerCase()) != -1 || ciso.length <= 0) continue;
      if (cfull.toLowerCase() == "unknown" || cfull.length <= 0) continue;

      if (typeof data.cities !== 'undefined' && typeof data.cities.length !== 'undefined' && data.cities.length > 0) {
        var cities = [ANY_TEXT];

        for (var i2 = 0; i2 < data.cities.length; i2++) {
          var city = data.cities[i2].city;
          var rfull = data.cities[i2].regionfull;
          if (city.toLowerCase() == 'unknown' || city.length <= 0) continue;
          var was_already = false;

          for (var it = 0; it < cities.length; it++) {
            if (cities[it] == city) {
              was_already = true;
              break;
            }
          }

          if (!was_already) cities.push(city);
        }

        ret.push({
          'country': cfull,
          'countryISO': ciso,
          'cities': cities
        });
      }
    }

    function compare(a, b) {
      if (a.country < b.country) return -1;
      if (a.country > b.country) return 1;
      return 0;
    }

    ret.sort(compare);
    ret_fin.push(ret);
  }

  return ret_fin;
};

IPList.prototype.update = function (list) {
  this.list = this.getAvailableCountriesCities(list);
  IPListUpdate(this.list);
};
// EXTERNAL MODULE: ./src/js/storage.js + 1 modules
var storage = __webpack_require__(0);

// EXTERNAL MODULE: ./src/js/pages.js
var pages = __webpack_require__(8);

// EXTERNAL MODULE: ./src/js/proxy.js
var js_proxy = __webpack_require__(7);

// EXTERNAL MODULE: ./src/js/badge.js + 1 modules
var badge = __webpack_require__(12);

// EXTERNAL MODULE: ./src/js/messages.js
var messages = __webpack_require__(2);

// EXTERNAL MODULE: ./src/js/tabs.js
var js_tabs = __webpack_require__(16);

// CONCATENATED MODULE: ./src/js/iso.js
//TODO: convert to JSON: data/iso.js
const ISO = [];
ISO.push("A1");
ISO.push("Anonymous Proxy");
ISO.push("A2");
ISO.push("Satellite Provider");
ISO.push("AD");
ISO.push("Andorra");
ISO.push("AE");
ISO.push("United Arab Emirates");
ISO.push("AF");
ISO.push("Afghanistan");
ISO.push("AG");
ISO.push("Antigua and Barbuda");
ISO.push("AI");
ISO.push("Anguilla");
ISO.push("AL");
ISO.push("Albania");
ISO.push("AM");
ISO.push("Armenia");
ISO.push("AN");
ISO.push("Netherlands Antilles");
ISO.push("AO");
ISO.push("Angola");
ISO.push("AP");
ISO.push("Asia/Pacific Region");
ISO.push("AQ");
ISO.push("Antarctica");
ISO.push("AR");
ISO.push("Argentina");
ISO.push("AS");
ISO.push("American Samoa");
ISO.push("AT");
ISO.push("Austria");
ISO.push("AU");
ISO.push("Australia");
ISO.push("AW");
ISO.push("Aruba");
ISO.push("AX");
ISO.push("Aland Islands");
ISO.push("AZ");
ISO.push("Azerbaijan");
ISO.push("BA");
ISO.push("Bosnia and Herzegovina");
ISO.push("BB");
ISO.push("Barbados");
ISO.push("BD");
ISO.push("Bangladesh");
ISO.push("BE");
ISO.push("Belgium");
ISO.push("BF");
ISO.push("Burkina Faso");
ISO.push("BG");
ISO.push("Bulgaria");
ISO.push("BH");
ISO.push("Bahrain");
ISO.push("BI");
ISO.push("Burundi");
ISO.push("BJ");
ISO.push("Benin");
ISO.push("BM");
ISO.push("Bermuda");
ISO.push("BN");
ISO.push("Brunei Darussalam");
ISO.push("BO");
ISO.push("Bolivia");
ISO.push("BR");
ISO.push("Brazil");
ISO.push("BS");
ISO.push("Bahamas");
ISO.push("BT");
ISO.push("Bhutan");
ISO.push("BV");
ISO.push("Bouvet Island");
ISO.push("BW");
ISO.push("Botswana");
ISO.push("BY");
ISO.push("Belarus");
ISO.push("BZ");
ISO.push("Belize");
ISO.push("CA");
ISO.push("Canada");
ISO.push("CC");
ISO.push("Cocos (Keeling) Islands");
ISO.push("CD");
ISO.push("Congo");
ISO.push("CF");
ISO.push("Central African Republic");
ISO.push("CG");
ISO.push("Congo");
ISO.push("CH");
ISO.push("Switzerland");
ISO.push("CI");
ISO.push("Cote d'Ivoire");
ISO.push("CK");
ISO.push("Cook Islands");
ISO.push("CL");
ISO.push("Chile");
ISO.push("CM");
ISO.push("Cameroon");
ISO.push("CN");
ISO.push("China");
ISO.push("CO");
ISO.push("Colombia");
ISO.push("CR");
ISO.push("Costa Rica");
ISO.push("CU");
ISO.push("Cuba");
ISO.push("CV");
ISO.push("Cape Verde");
ISO.push("CX");
ISO.push("Christmas Island");
ISO.push("CY");
ISO.push("Cyprus");
ISO.push("CZ");
ISO.push("Czech Republic");
ISO.push("DE");
ISO.push("Germany");
ISO.push("DJ");
ISO.push("Djibouti");
ISO.push("DK");
ISO.push("Denmark");
ISO.push("DM");
ISO.push("Dominica");
ISO.push("DO");
ISO.push("Dominican Republic");
ISO.push("DZ");
ISO.push("Algeria");
ISO.push("EC");
ISO.push("Ecuador");
ISO.push("EE");
ISO.push("Estonia");
ISO.push("EG");
ISO.push("Egypt");
ISO.push("EH");
ISO.push("Western Sahara");
ISO.push("ER");
ISO.push("Eritrea");
ISO.push("ES");
ISO.push("Spain");
ISO.push("ET");
ISO.push("Ethiopia");
ISO.push("EU");
ISO.push("Europe");
ISO.push("FI");
ISO.push("Finland");
ISO.push("FJ");
ISO.push("Fiji");
ISO.push("FK");
ISO.push("Falkland Islands (Malvinas)");
ISO.push("FM");
ISO.push("Micronesia");
ISO.push("FO");
ISO.push("Faroe Islands");
ISO.push("FR");
ISO.push("France");
ISO.push("GA");
ISO.push("Gabon");
ISO.push("GB");
ISO.push("United Kingdom");
ISO.push("GD");
ISO.push("Grenada");
ISO.push("GE");
ISO.push("Georgia");
ISO.push("GF");
ISO.push("French Guiana");
ISO.push("GG");
ISO.push("Guernsey");
ISO.push("GH");
ISO.push("Ghana");
ISO.push("GI");
ISO.push("Gibraltar");
ISO.push("GL");
ISO.push("Greenland");
ISO.push("GM");
ISO.push("Gambia");
ISO.push("GN");
ISO.push("Guinea");
ISO.push("GP");
ISO.push("Guadeloupe");
ISO.push("GQ");
ISO.push("Equatorial Guinea");
ISO.push("GR");
ISO.push("Greece");
ISO.push("GS");
ISO.push("South Georgia and the South Sandwich Islands");
ISO.push("GT");
ISO.push("Guatemala");
ISO.push("GU");
ISO.push("Guam");
ISO.push("GW");
ISO.push("Guinea-Bissau");
ISO.push("GY");
ISO.push("Guyana");
ISO.push("HK");
ISO.push("Hong Kong");
ISO.push("HM");
ISO.push("Heard Island and McDonald Islands");
ISO.push("HN");
ISO.push("Honduras");
ISO.push("HR");
ISO.push("Croatia");
ISO.push("HT");
ISO.push("Haiti");
ISO.push("HU");
ISO.push("Hungary");
ISO.push("ID");
ISO.push("Indonesia");
ISO.push("IE");
ISO.push("Ireland");
ISO.push("IL");
ISO.push("Israel");
ISO.push("IM");
ISO.push("Isle of Man");
ISO.push("IN");
ISO.push("India");
ISO.push("IO");
ISO.push("British Indian Ocean Territory");
ISO.push("IQ");
ISO.push("Iraq");
ISO.push("IR");
ISO.push("Iran");
ISO.push("IS");
ISO.push("Iceland");
ISO.push("IT");
ISO.push("Italy");
ISO.push("JE");
ISO.push("Jersey");
ISO.push("JM");
ISO.push("Jamaica");
ISO.push("JO");
ISO.push("Jordan");
ISO.push("JP");
ISO.push("Japan");
ISO.push("KE");
ISO.push("Kenya");
ISO.push("KG");
ISO.push("Kyrgyzstan");
ISO.push("KH");
ISO.push("Cambodia");
ISO.push("KI");
ISO.push("Kiribati");
ISO.push("KM");
ISO.push("Comoros");
ISO.push("KN");
ISO.push("Saint Kitts and Nevis");
ISO.push("KP");
ISO.push("Korea (KP)");
ISO.push("KR");
ISO.push("Korea (KR)");
ISO.push("KW");
ISO.push("Kuwait");
ISO.push("KY");
ISO.push("Cayman Islands");
ISO.push("KZ");
ISO.push("Kazakhstan");
ISO.push("LA");
ISO.push("Lao People's Democratic Republic");
ISO.push("LB");
ISO.push("Lebanon");
ISO.push("LC");
ISO.push("Saint Lucia");
ISO.push("LI");
ISO.push("Liechtenstein");
ISO.push("LK");
ISO.push("Sri Lanka");
ISO.push("LR");
ISO.push("Liberia");
ISO.push("LS");
ISO.push("Lesotho");
ISO.push("LT");
ISO.push("Lithuania");
ISO.push("LU");
ISO.push("Luxembourg");
ISO.push("LV");
ISO.push("Latvia");
ISO.push("LY");
ISO.push("Libyan Arab Jamahiriya");
ISO.push("MA");
ISO.push("Morocco");
ISO.push("MC");
ISO.push("Monaco");
ISO.push("MD");
ISO.push("Moldova");
ISO.push("ME");
ISO.push("Montenegro");
ISO.push("MG");
ISO.push("Madagascar");
ISO.push("MH");
ISO.push("Marshall Islands");
ISO.push("MK");
ISO.push("Macedonia");
ISO.push("ML");
ISO.push("Mali");
ISO.push("MM");
ISO.push("Myanmar");
ISO.push("MN");
ISO.push("Mongolia");
ISO.push("MO");
ISO.push("Macao");
ISO.push("MP");
ISO.push("Northern Mariana Islands");
ISO.push("MQ");
ISO.push("Martinique");
ISO.push("MR");
ISO.push("Mauritania");
ISO.push("MS");
ISO.push("Montserrat");
ISO.push("MT");
ISO.push("Malta");
ISO.push("MU");
ISO.push("Mauritius");
ISO.push("MV");
ISO.push("Maldives");
ISO.push("MW");
ISO.push("Malawi");
ISO.push("MX");
ISO.push("Mexico");
ISO.push("MY");
ISO.push("Malaysia");
ISO.push("MZ");
ISO.push("Mozambique");
ISO.push("NA");
ISO.push("Namibia");
ISO.push("NC");
ISO.push("New Caledonia");
ISO.push("NE");
ISO.push("Niger");
ISO.push("NF");
ISO.push("Norfolk Island");
ISO.push("NG");
ISO.push("Nigeria");
ISO.push("NI");
ISO.push("Nicaragua");
ISO.push("NL");
ISO.push("Netherlands");
ISO.push("NO");
ISO.push("Norway");
ISO.push("NP");
ISO.push("Nepal");
ISO.push("NR");
ISO.push("Nauru");
ISO.push("NU");
ISO.push("Niue");
ISO.push("NZ");
ISO.push("New Zealand");
ISO.push("OM");
ISO.push("Oman");
ISO.push("PA");
ISO.push("Panama");
ISO.push("PE");
ISO.push("Peru");
ISO.push("PF");
ISO.push("French Polynesia");
ISO.push("PG");
ISO.push("Papua New Guinea");
ISO.push("PH");
ISO.push("Philippines");
ISO.push("PK");
ISO.push("Pakistan");
ISO.push("PL");
ISO.push("Poland");
ISO.push("PM");
ISO.push("Saint Pierre and Miquelon");
ISO.push("PN");
ISO.push("Pitcairn");
ISO.push("PR");
ISO.push("Puerto Rico");
ISO.push("PS");
ISO.push("Palestinian Territory");
ISO.push("PT");
ISO.push("Portugal");
ISO.push("PW");
ISO.push("Palau");
ISO.push("PY");
ISO.push("Paraguay");
ISO.push("QA");
ISO.push("Qatar");
ISO.push("RE");
ISO.push("Reunion");
ISO.push("RO");
ISO.push("Romania");
ISO.push("RS");
ISO.push("Serbia");
ISO.push("RU");
ISO.push("Russian Federation");
ISO.push("RW");
ISO.push("Rwanda");
ISO.push("SA");
ISO.push("Saudi Arabia");
ISO.push("SB");
ISO.push("Solomon Islands");
ISO.push("SC");
ISO.push("Seychelles");
ISO.push("SD");
ISO.push("Sudan");
ISO.push("SE");
ISO.push("Sweden");
ISO.push("SG");
ISO.push("Singapore");
ISO.push("SH");
ISO.push("Saint Helena");
ISO.push("SI");
ISO.push("Slovenia");
ISO.push("SJ");
ISO.push("Svalbard and Jan Mayen");
ISO.push("SK");
ISO.push("Slovakia");
ISO.push("SL");
ISO.push("Sierra Leone");
ISO.push("SM");
ISO.push("San Marino");
ISO.push("SN");
ISO.push("Senegal");
ISO.push("SO");
ISO.push("Somalia");
ISO.push("SR");
ISO.push("Suriname");
ISO.push("ST");
ISO.push("Sao Tome and Principe");
ISO.push("SV");
ISO.push("El Salvador");
ISO.push("SY");
ISO.push("Syrian Arab Republic");
ISO.push("SZ");
ISO.push("Swaziland");
ISO.push("TC");
ISO.push("Turks and Caicos Islands");
ISO.push("TD");
ISO.push("Chad");
ISO.push("TF");
ISO.push("French Southern Territories");
ISO.push("TG");
ISO.push("Togo");
ISO.push("TH");
ISO.push("Thailand");
ISO.push("TJ");
ISO.push("Tajikistan");
ISO.push("TK");
ISO.push("Tokelau");
ISO.push("TL");
ISO.push("Timor-Leste");
ISO.push("TM");
ISO.push("Turkmenistan");
ISO.push("TN");
ISO.push("Tunisia");
ISO.push("TO");
ISO.push("Tonga");
ISO.push("TR");
ISO.push("Turkey");
ISO.push("TT");
ISO.push("Trinidad and Tobago");
ISO.push("TV");
ISO.push("Tuvalu");
ISO.push("TW");
ISO.push("Taiwan");
ISO.push("TZ");
ISO.push("Tanzania");
ISO.push("UA");
ISO.push("Ukraine");
ISO.push("UG");
ISO.push("Uganda");
ISO.push("UM");
ISO.push("United States Minor Outlying Islands");
ISO.push("US");
ISO.push("United States");
ISO.push("UY");
ISO.push("Uruguay");
ISO.push("UZ");
ISO.push("Uzbekistan");
ISO.push("VA");
ISO.push("Holy See (Vatican City State)");
ISO.push("VC");
ISO.push("Saint Vincent and the Grenadines");
ISO.push("VE");
ISO.push("Venezuela");
ISO.push("VG");
ISO.push("Virgin Islands (GB)");
ISO.push("VI");
ISO.push("Virgin Islands (US)");
ISO.push("VN");
ISO.push("Vietnam");
ISO.push("VU");
ISO.push("Vanuatu");
ISO.push("WF");
ISO.push("Wallis and Futuna");
ISO.push("WS");
ISO.push("Samoa");
ISO.push("YE");
ISO.push("Yemen");
ISO.push("YT");
ISO.push("Mayotte");
ISO.push("ZA");
ISO.push("South Africa");
ISO.push("ZM");
ISO.push("Zambia");
ISO.push("ZW");
ISO.push("Zimbabwe");
const getIsoByCountry = country => {
  let result = "";

  for (let i = 1; i < ISO.length; i += 2) {
    if (ISO[i] === country) {
      result = ISO[i - 1];
      break;
    }
  }

  return result;
};
// CONCATENATED MODULE: ./src/js/xml.js
function xml2json(xml) {
  try {
    var obj = {};

    if (xml.children.length > 0) {
      for (var i = 0; i < xml.children.length; i++) {
        var item = xml.children.item(i);
        var nodeName = item.nodeName;
        if (typeof obj[nodeName] == "undefined") obj[nodeName] = xml2json(item);else {
          if (typeof obj[nodeName].push == "undefined") {
            var old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }

          obj[nodeName].push(xml2json(item));
        }
      }
    } else obj = xml.textContent;

    return obj;
  } catch (e) {}

  return {};
}

const JSONfromXML = xml => {
  xml = "<obj>" + xml + "</obj>";
  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(xml, "text/xml");
  var ret = xml2json(xmlDoc);
  ret = ret.obj;
  return ret;
};
const getTag = (tag, search) => {
  var ret = false;
  var matches;
  var rgx = new RegExp(tag + ":([^;]*)", "gm");
  if ((matches = rgx.exec(search)) !== null) ret = matches[1];
  return ret;
};
// EXTERNAL MODULE: ./src/js/popup.js
var popup = __webpack_require__(5);

// EXTERNAL MODULE: ./src/js/urls.js
var urls = __webpack_require__(4);

// CONCATENATED MODULE: ./src/js/app.js











const PORT_START = 1701;
const PORT_STEP = 9001;
const CMD_SET_PROXY = 'SET_PROXY';
const CMD_UNSET_PROXY = 'UNSET_PROXY';
const CMD_TRY_TO_KEEP_ALIVE = 'tryToKeepAlive';
const CMD_GET_APP_STATE = 'getAppState';
const CMD_GET_ACCOUNT_INFO = 'getAccountInfo';
const CMD_LOG_IN = 'logIn';
const CMD_LOGIN_HELPER = 'loginHelper';
const CMD_GET_COUNTRY_FLAG_NAME = 'getCountryFlagName';
const CMD_GET_LOCAL_PROXY_ADDRESS = 'getLocalProxyAddress';
const CMD_CHANGE_IP_COUNTRY_CITY = 'changeIPCountryCity';
const CMD_CHANGE_IP_COUNTRY_CITY_NEW = 'changeIPCountryCityNew';
window.ports_web_sockets = [];
window.ipList = new IPList(); //TODO: is it something for debugging?

window.waiting_acc = false;
window.changeIPOnLogIn = false;
let interval_;

function ParseMessage(message, ret) {
  // console.log('ParseMessage: ', message, ret);
  var matches;
  var rgx = /<message>([\s\S]*)(<details>)([\s\S]*)(<\/details>)<\/message>/gm;

  if ((matches = rgx.exec(message)) !== null) {
    ret.message = matches[1];
    ret.details = matches[3];
    return true;
  }

  return false;
}

function changeIPToCurrent(cb) {
  console.trace('~changeIPToCurrent~');
  chrome.storage.local.get('currentCountryISO', function (_currentCountryISO) {
    chrome.storage.local.get(['currentCity', 'selectedCity'], function (_currentCity) {
      chrome.storage.local.get('main_residential_checked', function (ret) {
        var is_residential = false;

        if (typeof ret.main_residential_checked !== 'undefined' && ret.main_residential_checked) {
          is_residential = true;
        }

        var currentCountryISO = "";
        var currentCity = "";
        if (typeof _currentCountryISO.currentCountryISO !== 'undefined' && _currentCountryISO.currentCountryISO.length > 0) currentCountryISO = _currentCountryISO.currentCountryISO;
        console.log('_currentCity: ', _currentCity);
        if (typeof _currentCity.selectedCity !== 'undefined' && _currentCity.selectedCity.length > 0 && _currentCity.selectedCity !== 'Any') currentCity = _currentCity.selectedCity; // if (typeof _currentCity.currentCity !== 'undefined' && _currentCity.currentCity.length > 0)
        //   currentCity = _currentCity.currentCity;

        chrome.storage.local.get('app_non_residential', function ({
          app_non_residential
        }) {
          console.log('1 app_non_residential: ', app_non_residential);

          if (app_non_residential) {
            App.changeIPCountryCityNew(currentCountryISO, currentCity, false, is_residential);
          } else {
            App.changeIPCountryCity(currentCountryISO, currentCity, false);
          }

          cb && cb();
        });
      });
    });
  });
}

const AppResponseHandler = {
  setUniqueID(id) {
    storage["a" /* Storage */].app.setUniqueID(id);
  },

  onConnectedTasks(connected) {
    Object(js_tabs["a" /* closeStep1Tab */])();

    if (window.tab_info2 != false) {
      try {
        if (chrome.runtime.lastError) {}

        chrome.tabs.remove(window.tab_info2);

        if (chrome.runtime.lastError) {}
      } catch (err) {}

      window.tab_info2 = false;
    }

    chrome.storage.local.get('was_shown_info', function (res) {
      if (typeof res.was_shown_info === 'undefined' || !res.was_shown_info) {
        chrome.storage.local.set({
          'was_shown_info': true
        });
        urls["a" /* AsyncURL */].step3().then(url => {
          chrome.tabs.create({
            url
          }, function (tab) {
            window.tab_info3 = tab.id;
          });
        });
      }
    });
    chrome.storage.local.set({
      'isConnecting': !connected
    });
    storage["a" /* Storage */].app.setConnected(connected);
    console.log('----------------> connectionStateChanged before Timeout: ', connected);

    if (connected) {
      storage["a" /* Storage */].user.getUser().then(user => {
        console.log('user: ', user);

        if (user) {
          App.logIn(user.email, user.password);
        }
      });
      window.changeIPOnLogIn = true;
      var sec = 5; //if server didn't change IP try again in 5 seconds

      setTimeout(function () {
        chrome.storage.local.get('lastChangedTimeInternal', function (_lastChangedTimeInternal) {
          console.log('_lastChangedTimeInternal: ', _lastChangedTimeInternal);
          var ct = Date.now();
          var lt = typeof _lastChangedTimeInternal.lastChangedTimeInternal !== 'undefined' ? _lastChangedTimeInternal.lastChangedTimeInternal : 0;
          console.log('ct - lt: ', ct - lt);
          console.log('Will change: ', ct - lt > sec * 1000);

          if (ct - lt > sec * 1000) {
            changeIPToCurrent();
          }
        });
      }, sec * 1000);
    }
  },

  connectionStateChanged(connected) {
    console.trace('~connectionStateChanged~, ' + connected);
    storage["a" /* Storage */].app.isConnected().then(isAlreadyConnected => {
      console.log('isAlreadyConnected: ', isAlreadyConnected);

      if (isAlreadyConnected === connected) {
        console.log('RETURN');
        return;
      } // We need to reconnect on the first run because the app is buggy and don't update location correctly.
      // Even when it is sending correct response that everything was updated


      if (connected && storage["a" /* Storage */].app.isFirstConnect()) {
        storage["a" /* Storage */].app.setFirstConnect(false);
        js_proxy["a" /* Proxy */].unset();
        setTimeout(() => {
          js_proxy["a" /* Proxy */].set();
          setTimeout(() => {
            this.onConnectedTasks(connected);
          }, 500);
        }, 500);
      } else {
        this.onConnectedTasks(connected);
      }
    });
  },

  /**
   * called after calling getAccountInfo or logIn
   * you receive back email, passl, if password is ok, just_check depends on which function you previously called
   */
  logInResponse(emaill, passl, passok, premium, just_check) {
    if (just_check) {
      console.log('Messages.toPopup().sendAccountInfo: ', passok);
      messages["a" /* default */].toPopup().sendAccountInfo(passok);
      storage["a" /* Storage */].user.setPremium(premium);
    } else {
      var helperFunc = function () {
        if (typeof window.changeIPOnLogIn !== 'undefined' && window.changeIPOnLogIn) {
          window.changeIPOnLogIn = false;
          changeIPToCurrent();
        }
      };

      if (premium) {
        chrome.storage.local.set({
          'isLimit': false
        });
        storage["a" /* Storage */].user.setPremium(true);
        helperFunc();
      } else {
        chrome.storage.local.get('app_non_residential', function ({
          app_non_residential
        }) {
          let show_no_residential = false;

          if (app_non_residential) {
            show_no_residential = true;
          }

          chrome.storage.local.get('main_residential_checked', function (ret1) {
            chrome.storage.local.get("serveriplist", function (lst) {
              chrome.storage.local.get("staticiplist", function (lstold) {
                var locations = lstold.staticiplist;
                var is_residential = false;
                if (typeof ret1.main_residential_checked !== 'undefined') is_residential = ret1.main_residential_checked;

                try {
                  if (show_no_residential && Array.isArray(lst.serveriplist) && lst.serveriplist.length === 2) {
                    locations = is_residential ? lst.serveriplist[1] : lst.serveriplist[0];
                  }
                } catch (err) {
                  console.log(err);
                }

                chrome.storage.local.set({
                  'currentCity': locations[0].cities[0]
                });
                helperFunc();
              });
            });
          });
        });
      }
    }
  },

  /**
   * json.currentIPLocationPool - used for desktop ignore
   * json.currentIPLocationChanges - how many times user changed IP since last reset - see resetInfo
   * json.currentBandwidth - how many bandwidth (bytes) user used since last reset - see resetInfo
   *
   * @param json
   */
  accountInfo(json) {// No implementation
  },

  ipListReceived(json) {
    window.ipList.update(json);
  },

  /**
   * app calls this function when user was premium and became free user
   * it can happen when standard premium account expires or free premium time has ended
   */
  premiumExpired() {
    chrome.storage.local.set({
      'freePremiumTime': 0
    });
    storage["a" /* Storage */].user.setPremium(false);
  },

  showMessage(json) {//ignore for now
  },

  /**
   * called when user requested country/city or nearby change by calling changeIPCountryCity(countryISO, city, next_nearby)
   * @param json
   * @param limit - if false means change was successful if true there was IP change limit and IP wasn't changed
   */
  ipChanged(json, limit) {
    /**
     * The app is sending IP_CHANGED_SUCCESSFULLY_NEW message right after startup.
     * Even if it is disconnected.
     */
    const now = Date.now();
    chrome.storage.local.set({
      'lastChangedTimeInternal': now
    });

    if (limit) {
      this._setLimited();
    } else {
      chrome.storage.local.set({
        'isLimit': false
      });
      storage["a" /* Storage */].user.setLastChangedTime(now);
      messages["a" /* default */].toPopup().updateLastTimeChanged(now);

      this._setLastLocation(json.location.country, json.location.city);
    }
  },

  ipChangedButLimit(json) {
    const now = Date.now();
    chrome.storage.local.set({
      'lastChangedTimeInternal': now
    });
    storage["a" /* Storage */].user.setLastChangedTime(now);
    messages["a" /* default */].toPopup().updateLastTimeChanged(now);

    this._setLimited();

    this._setLastLocation(json.location.country, json.location.city);
  },

  limitsInfo(json) {//json
    //ipLocationPoolLimit - ignore used for desktop
    //ipLocationChangesLimit - how many times can change IP until next reset (-1 no limit) - see resetInfo
    //bandwidthLimit - how many bytes user can download/upload until next reset (-1 no limit) - see resetInfo
    //isIPSharingActive - does this user IP is shared with others
    //enabledRedirectHTTPS - back capability - now it's always true
    //enabledAutomaticIPChange - back capability - now it's always true
  },

  resetInfo(time) {
    //Date object containing local time when IP change limits will be reset
    //for example user can change IP 10 times a day
    //this time means that he will be again available to change IP 10 times  when
    //current time > time (arg)
    chrome.storage.local.set({
      'reset_hours': time
    });
  },

  /**
   * app calls this function when user is premium
   * it's called when user is standard premium or free premium time user
   */
  welcomeToPremium() {
    chrome.storage.local.get('isLimit', function (isl) {
      if (typeof isl.isLimit !== 'undefined' && isl.isLimit) {
        changeIPToCurrent(function () {
          chrome.storage.local.set({
            'isLimit': false
          });
        });
      }
    });
    storage["a" /* Storage */].user.setPremium(true);
  },

  /**
   * JSON format
   *
   *  {
   *     "ip": "46.56.240.226",
   *     "location": {
   *         "country": "Belarus",
   *         "region": "BY-MI",
   *         "countryiso": "BY",
   *         "city": "Minsk"
   *     }
   *  }
   *
   * @param json
   */
  clientIP(json) {
    console.log('~clientIP~: ', json);
    storage["a" /* Storage */].user.setDefaultLocation(json.location);
    storage["a" /* Storage */].user.setLocation(json.location); //json containig this client IP location details
  },

  /**
   * when you receive this callback it means that user is free premium time user not standard premium
   * it can be received just after logging in or anytime cause if standard premium expires
   * server will switch to free premium time if it is available
   * argument utime is an int representing seconds left while user will be premium
   *
   * @param utime
   */
  freeTimeUpdate(utime) {
    chrome.storage.local.set({
      'freePremiumTime': utime
    });

    if (utime > 0) {
      storage["a" /* Storage */].user.setPremium(true);
      chrome.storage.local.set({
        'isLimit': false
      });
    }
  },

  _setLastLocation(country, city) {
    console.log('~_setLastLocation~ country: ', country, city);
    const countryISO = getIsoByCountry(country);
    App.getCountryFlagName(countryISO, function (ret) {
      console.log('getCountryFlagName: countryISO: ' + countryISO + ', ret: ', ret);
      var country_translated = chrome.i18n.getMessage("country_" + countryISO.toLowerCase());
      if (typeof country_translated !== 'undefined' && country_translated.length > 0) country = country_translated;
      const loc = {
        city,
        country,
        region: "unknown",
        countryiso: countryISO
      };
      console.log('~ipChanged~ Proxy.isSet(): ', js_proxy["a" /* Proxy */].isSet());

      if (js_proxy["a" /* Proxy */].isSet()) {
        // Proxy.reconnectSocksProxy();
        storage["a" /* Storage */].user.setLocation(loc);
        chrome.storage.local.set({
          'currentCountryISO': countryISO
        });
        chrome.storage.local.set({
          'currentCity': city
        });
        console.log('countryISO: ', countryISO);
        console.log('city: ', city);
        messages["a" /* default */].toPopup().updateLastLocation(loc);
        badge["a" /* Badge */].setConnected(countryISO);
      } else {
        storage["a" /* Storage */].user.setLastLocation(loc);
      }
    });
  },

  _setLimited() {
    chrome.storage.local.set({
      'isLimit': true
    });
    chrome.storage.local.get('app_non_residential', function ({
      app_non_residential
    }) {
      let show_no_residential = false;

      if (app_non_residential) {
        show_no_residential = true;
      }

      chrome.storage.local.get('main_residential_checked', function (ret1) {
        chrome.storage.local.get("staticiplist", function (lstold) {
          chrome.storage.local.get("serveriplist", async function (lst) {
            var locations = lstold.staticiplist;
            var is_residential = false;
            if (typeof ret1.main_residential_checked !== 'undefined') is_residential = ret1.main_residential_checked;

            try {
              if (show_no_residential && Array.isArray(lst.serveriplist) && lst.serveriplist.length === 2) locations = is_residential ? lst.serveriplist[1] : lst.serveriplist[0];
            } catch (err) {
              console.log(err);
            }

            var currentCountryISO = locations[0].countryISO;
            var currentCity = locations[0].cities[0];
            chrome.storage.local.set({
              'currentCountryISO': currentCountryISO,
              'currentCity': currentCity
            });
            const isConnected = await storage["a" /* Storage */].app.isConnected();

            if (isConnected) {
              badge["a" /* Badge */].setConnected(currentCountryISO);
            }
          });
        });
      });
    });
  }

};

function ShowBWOverLoad(overall) {
  try {
    var query = {
      active: true,
      currentWindow: true
    };
    chrome.tabs.query(query, function (tabs) {
      try {
        var currentTab = tabs[0]; // there will be only one in this array

        console.log(currentTab); // also has properties like currentTab.id

        chrome.tabs.insertCSS(tabs.id, {
          file: "inject/bandwidth.css"
        }, function () {
          const id = storage["a" /* Storage */].app.getUniqueID();

          if (id) {
            chrome.tabs.executeScript(tabs.id, {
              code: `window._uniqueId="${id}";`
            }, function () {
              chrome.tabs.executeScript(tabs.id, {
                file: "inject/bandwidth.js"
              }, function () {});
            });
          } else {
            chrome.tabs.executeScript(tabs.id, {
              file: "inject/bandwidth.js"
            }, function () {});
          }
        });
      } catch (exc) {}
    });
  } catch (exc) {}
}

function NewMessageApp(msg) {
  console.log('NewMessageApp: ', JSON.stringify(msg));
  var json;

  switch (msg.message) {
    case "SHOW_RATING":
      pages["g" /* Pages */].showRatingPage();
      break;

    case "MESSAGE_LIMIT_FREE":
      pages["g" /* Pages */].showLimitFreePage();
      break;

    case "MESSAGE_LIMIT_PREMIUM":
      pages["g" /* Pages */].showLimitPremiumPage();
      break;

    case "MESSAGE_LIMIT_MULTI_LOGIN":
      pages["g" /* Pages */].showLimitMultiLogin();
      break;

    case "MESSAGE_LIMIT_COUNTRY":
      pages["g" /* Pages */].showLimitDailyLogin();
      break;

    case "SHOW_MESSAGE_NEW_TYPE_BAN":
      var message = msg.details;
      message = message.split("\\n").join("\n"); //MOT_USED since 2.2.6
      //chrome.runtime.sendMessage({action: "banned_message", details: message});

      break;

    case "SHOW_MESSAGE_DEBUG_APP":
      break;

    case "BANDWIDTH_INCREASE":
    case "BANDWIDTH_INCREASE_PREMIUM_USER":
      ShowBWOverLoad(msg.details === "overall");
      ShowBWOverLoad(msg.details === "overall");
      break;

    case "CONNECTED":
      AppResponseHandler.connectionStateChanged(true);
      break;

    case "UNIQUE_ID":
      AppResponseHandler.setUniqueID(msg.details);
      break;

    case "DISCONNECTED":
      AppResponseHandler.connectionStateChanged(false);
      break;

    case "RECEIVED_ACCOUNT_INFO":
      const p = getTag("passok", msg.details);
      const pr = getTag("premium", msg.details);
      const e = getTag("email", msg.details);
      const pass = getTag("password", msg.details);

      if (window.waiting_acc) {
        window.waiting_acc = false;
        App.loginHelper(e, pass);
        AppResponseHandler.logInResponse(e, pass, p === "1", pr === "1", false);
      } else {
        AppResponseHandler.logInResponse(e, pass, p === "1", pr === "1", true);
      }

      break;

    case "UNAUTHORIZED_ACCESS":
      //console.log("msg_server:"+JSON.stringify(msg, null, 4));
      //unathorizedAccess();
      break;

    case "ACCOUNT_INFO":
      json = JSON.parse(msg.details.length <= 0 ? "{}" : msg.details);
      AppResponseHandler.accountInfo(json);
      break;

    case "LIMITS_INFO":
      json = JSON.parse(msg.details.length <= 0 ? "{}" : msg.details);
      AppResponseHandler.limitsInfo(json);
      break;

    case "BANNED_IP_COMPILANCE":
      chrome.storage.local.set({
        'isBannedIPCompilance': true
      });
      break;

    case "BANNED_IP_HOSTING":
      //user is using IP that is hosted service
      chrome.storage.local.set({
        'isBannedIP': true
      });
      break;

    case "UNBANNED_IP_HOSTING":
      chrome.storage.local.set({
        'isBannedIP': false
      });
      break;

    case "PREMIUM_INFO":
      //purchaseDate - date time string or -1 when free user
      //expirationDate - date time string or -1 when free user
      const defInfo = {
        purchaseDate: "-1",
        expirationDate: "-1"
      };
      let premiumInfo;

      if (msg.details.length === 0) {
        premiumInfo = defInfo;
      } else {
        try {
          premiumInfo = Object.assign(defInfo, JSON.parse(msg.details));
        } catch (e) {
          // Possible exception during JSON parsing.
          premiumInfo = defInfo;
        }
      }

      storage["a" /* Storage */].user.setAccountInfo(premiumInfo);
      break;

    case "RESET_INFO":
      AppResponseHandler.resetInfo(msg.details);
      break;

    case "NEW_TYPE":
      chrome.storage.local.set({
        'app_non_residential': true
      });
      break;

    case "ACCOUNT_CREATION":
      break;

    case "IPLISTJSON":
      AppResponseHandler.ipListReceived(JSON.parse(msg.details));
      break;

    case "IS_PREMIUM_HIDDEN_MESSAGE":
      AppResponseHandler.welcomeToPremium();
      break;

    case "IP_NOT_CHANGED_MULTI_LOGIN":
      pages["g" /* Pages */].showInfoMessage(msg.message);
      break;

    case "SHOW_MESSAGE":
      //console.log("msg_server:"+JSON.stringify(msg, null, 4));
      json = JSONfromXML(msg.details);

      if (json.type === "WELCOME_TO_PREMIUM") {
        AppResponseHandler.welcomeToPremium();
      } else if (json.type === "PREMIUM_EXPIRED") {
        AppResponseHandler.premiumExpired();
      } else {
        AppResponseHandler.showMessage(json);
      }

      break;

    case "SHOW_MESSAGE1":
      AppResponseHandler.showMessage(JSONfromXML(msg.details));
      break;

    case "IP_NOT_CHANGED_LIMITS":
      AppResponseHandler.ipChanged(JSONfromXML(msg.details), true);
      break;

    case "IP_CHANGED_SUCCESSFULLY":
    case "IP_CHANGED_SUCCESSFULLY_NEW":
      AppResponseHandler.ipChanged(JSONfromXML(msg.details), false);
      break;

    case "IP_CHANGED_SUCCESSFULLY_BUT_LIMIT":
      AppResponseHandler.ipChangedButLimit(JSONfromXML(msg.details));
      break;

    case "YOUR_IP":
      AppResponseHandler.clientIP(JSONfromXML(msg.details));
      break;

    case "FREE_TIME_LEFT":
      AppResponseHandler.freeTimeUpdate(parseInt(msg.details));
      break;
    //ignore for now may be useful in the future

    case "IP_CHANGED_FAILED_FREE":
      break;

    case "IP_NOT_CHANGED_NOT_AVAILABLE":
      break;

    case "IP_NOT_CHANGED_OVERLOADED":
      break;

    case "IP_CHANGED_SUCCESSFULLY_ALREADY_USING":
      break;

    case "IP_BECAME_UNAVAILABLE_AND_YOU_HAVE_REACHED_LIMITS":
      break;

    case "IP_BECAME_UNAVAILABLE":
      break;
  }
}

function gotMessageApp(m) {
  NewMessageApp(m);
}

function AppConnection(address, onclose, onsuccess, inst_id) {
  this.address = address;
  this.ws = new WebSocket(this.address);
  this.onclose_callback = onclose;
  this.onsuccess_callback = onsuccess;
  this.inst_id = inst_id;
  this.first_msg = true;
  this.was_closed = false;
  this.first_non_init = true;

  if (chrome.runtime.lastError) {}

  var this_ = this;
  this.cid = 0;
  this.map = {};
  this.timerID = 0;
  setTimeout(function () {
    if (this_.ws.readyState !== WebSocket.OPEN) {
      this_.ws.close();
      this_.ws.onclose();
    }
  }, 7000);

  this.keepalive = function keepAlive() {
    var timeout = 20000;
    this_.sendMessage("KEEP_ALIVE");
    this_.timerID = setTimeout(keepAlive, timeout);
  };

  this.cancelkeepalive = function cancelKeepAlive() {
    if (this_.timerID) {
      clearTimeout(this_.timerID);
    }
  };

  this.sendMessage = function (m, callback) {
    //TODO assign ID to message and call callback when set
    if (typeof callback === 'undefined') callback = function (m) {};
    m = JSON.stringify(m);
    var cid = this_.cid;
    this_.cid++;
    if (typeof callback !== 'undefined') this_.map[cid] = callback;
    if (this_.ws.readyState === WebSocket.OPEN) this_.ws.send(cid + ":" + m);
  };

  this.ws.onopen = function () {
    this_.ws.send("HELLO TUXLER APP");
    this_.keepalive();
  };

  this.ws.onmessage = function (evt) {
    var received_msg = evt.data;

    if (this_.first_msg) {
      this_.first_msg = false;

      if (received_msg === "WELCOME TO TUXLER APP") {
        if (typeof this_.onsuccess_callback !== 'undefined') this_.onsuccess_callback(this_);
        console.log('this_.first_non_init: ', this_.first_non_init);

        if (this_.first_non_init) {
          this_.first_non_init = false;
          connectedApp();
        }
      } else {
        this_.ws.close();
        this_.ws.onclose();
      }
    } else {
      var idx;

      if ((idx = received_msg.indexOf(":")) === -1) {
        this_.ws.close();
        this_.ws.onclose();
      } else {
        var cid = parseInt(received_msg.substring(0, idx));
        received_msg = received_msg.substring(idx + 1);

        if (cid in this_.map) {
          var exc = false;
          var json;

          try {
            json = JSON.parse(received_msg);
          } catch (exc) {
            exc = true;
          }

          if (typeof json === 'undefined') exc = true;else {
            for (var key in json) {
              if (json[key] == "undefined") json[key] = undefined;
            }
          }
          this_.map[cid](exc ? received_msg : json);
        } else {
          var ret = {};
          if (ParseMessage(received_msg, ret)) gotMessageApp(ret);
        }
      }
    }
  };

  this.ws.onclose = function () {
    if (!this_.was_closed) {
      this_.was_closed = true;
      if (typeof this_.onclose_callback !== 'undefined') this_.onclose_callback(this_.inst_id);

      try {
        if (this_.timerID != 0) this_.cancelkeepalive();
      } catch (exc) {}

      if (!this_.first_non_init) {
        disconnectedApp();
      }
    }
  };
}

function startWebSocket() {
  var current_instances = window.ports_web_sockets.length;
  var instances = {};

  const onclose = function (i) {
    instances[i] = undefined;
    current_instances--;

    if (current_instances === 0) {
      notInstalled(false);
      setTimeout(function () {
        startWebSocket();
      }, 1000);
    }
  };

  const onsuccess = function (instance) {
    console.log('~onsuccess~', instance);
    window.appConnection = instance; // Storage.app.setInstalled(true);

    if (window.is_proxy_set) {
      App.setProxy();
    } else {
      App.unsetProxy();
    }
  };

  for (let i = 0; i < window.ports_web_sockets.length; i++) {
    instances[i] = new AppConnection("ws://127.0.0.1:" + window.ports_web_sockets[i] + "/tuxler", onclose, onsuccess, i);
  }
}

function notInstalled(startSocket) {
  // Badge.setNotInstalled();
  storage["a" /* Storage */].app.setInstalled(false);

  if (startSocket) {
    startWebSocket();
  }

  clearInterval(interval_);
}

function disconnectedApp() {
  console.log('~disconnectedApp()~');
  console.log('Proxy.isSet(): ', js_proxy["a" /* Proxy */].isSet());

  if (js_proxy["a" /* Proxy */].isSet()) {
    js_proxy["a" /* Proxy */].unset();
  }

  storage["a" /* Storage */].app.setInstalled(false);
  storage["a" /* Storage */].app.setConnected(false);
  window.AppIsRunning = false;
}

async function connectedApp() {
  console.log('~connectedApp()~');
  storage["a" /* Storage */].app.setInstalled(true);
  window.AppIsRunning = true;

  if (chrome.runtime.lastError) {
    console.error(chrome.runtime.lastError);
  }

  const isConnected = await storage["a" /* Storage */].app.isConnected();
  console.log('isConnected: ', isConnected);

  if (isConnected) {
    if (window.taskProxy) {
      proxy.manager.set();
    }

    window.taskProxy = false;
    var countryISO = "any";
    chrome.storage.local.get('currentCountryISO', function (_currentCountryISO) {
      if (typeof _currentCountryISO.currentCountryISO !== 'undefined' && _currentCountryISO.currentCountryISO.length > 0) {
        countryISO = _currentCountryISO.currentCountryISO;
      }

      badge["a" /* Badge */].setConnected(countryISO);
    });
  } else {
    badge["a" /* Badge */].setDisconnected();
  } //setInterval(function(){ShowBWOverLoad(true);}, 5000);

}

function resetStorageData() {
  console.log('~resetStorageData~');
  storage["a" /* Storage */].app.setInstalled(false);
  storage["a" /* Storage */].app.setConnected(false);
  storage["a" /* Storage */].user.setPremium(false);
  chrome.storage.local.set({
    'isLimit': false
  });
  chrome.storage.local.set({
    'isConnecting': true
  });
  chrome.storage.local.set({
    'freePremiumTime': 0
  });
}

function task() {
  console.log('~task()~');
  App.tryToKeepAlive();
  notInstalled(true);
}

const App = new class {
  constructor() {
    this._initPorts();
  }

  _initPorts() {
    let port = PORT_START;

    while (port < 65000) {
      if (port !== 12347 && port !== 23321 && port !== 23320) {
        window.ports_web_sockets.push(port);
      }

      port += PORT_STEP;
    }
  }

  start() {
    resetStorageData();
    App.getAppState();
    interval_ = setInterval(task, 5000);
    task();
  }

  setProxy() {
    console.log('~setProxy~: ', CMD_SET_PROXY);
    this.sendMessage(CMD_SET_PROXY);
  }

  unsetProxy() {
    this.sendMessage(CMD_UNSET_PROXY);
  }

  changeIPCountryCityNew(countryISO, city, next_nearby, is_residential) {
    console.trace('~changeIPCountryCityNew~');
    const args = JSON.stringify([countryISO, city, next_nearby, is_residential]);
    console.log('Message To app:', JSON.stringify({
      name: CMD_CHANGE_IP_COUNTRY_CITY_NEW,
      args
    }));
    this.sendMessage({
      name: CMD_CHANGE_IP_COUNTRY_CITY_NEW,
      args
    });
  }

  changeIPCountryCity(countryISO, city, next_nearby) {
    const args = JSON.stringify([countryISO, city, next_nearby]);
    this.sendMessage({
      name: CMD_CHANGE_IP_COUNTRY_CITY,
      args
    });
  }

  getLocalProxyAddress(callback) {
    this.sendMessage({
      name: CMD_GET_LOCAL_PROXY_ADDRESS,
      args: "[]"
    }, callback);
  }

  tryToKeepAlive() {
    this.sendMessage({
      name: CMD_TRY_TO_KEEP_ALIVE,
      args: "[]"
    });
  }

  getAppState() {
    this.sendMessage({
      name: CMD_GET_APP_STATE,
      args: "[]"
    });
  }

  loginHelper() {
    this.sendMessage({
      name: CMD_LOGIN_HELPER,
      args: "[]"
    });
  }
  /**
   * asynchronous function to login to server with email:password
   * call this function every time you receive ConnectionStateChanged(true)
   * email is an email address
   * passl is password - should be SHA1 but can be plain text
   * withoutcheck and force are helper variables ignore them
   * callback logInResponse(emaill, passl, passok, premium, false)
   * if provided email:pass are premium you will get
   * welcomeToPremium() callback
   */


  logIn(email, pass) {
    storage["a" /* Storage */].user.setPremium(false);
    chrome.storage.local.set({
      'freePremiumTime': 0,
      'isLimit': false
    });
    storage["a" /* Storage */].user.removeAccountInfo();
    const msg = {
      name: CMD_LOG_IN,
      args: JSON.stringify([email, pass])
    };
    this.sendMessage(msg);
  }

  getCountryFlagName(countryISO, callback) {
    // 103:{"name":"getCountryFlagName","args":"[\"SN\",null]"}
    const msg = {
      name: CMD_GET_COUNTRY_FLAG_NAME,
      args: JSON.stringify([countryISO])
    };
    this.sendMessage(msg, callback);
  }

  sendMessage(m, callback) {
    if (!callback) {
      callback = function (resp) {};
    }

    let exception = false;

    try {
      window.appConnection.sendMessage(m, callback);
    } catch (exc) {
      console.log(exc);
      exception = true;
    }

    return !exception;
  }

}();

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(51);

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Notifications; });
const MAIN_ICON = chrome.extension.getURL('img/icon128.png');
const Notifications = {
  showError(msg) {
    chrome.notifications.create('error', {
      type: 'basic',
      iconUrl: MAIN_ICON,
      title: "Tuxler Error",
      message: msg
    });
  },

  showMessage(msg) {
    chrome.notifications.create('info', {
      type: 'basic',
      iconUrl: MAIN_ICON,
      title: "Tuxler",
      message: msg
    });
  }

};

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return closeStep1Tab; });
//close step 1 tab
const closeStep1Tab = () => {
  if (window.tab_info !== false) {
    try {
      if (chrome.runtime.lastError) {}

      chrome.tabs.remove(window.tab_info);

      if (chrome.runtime.lastError) {}
    } catch (err) {}

    window.tab_info = false;
  }
};

/***/ }),
/* 17 */,
/* 18 */,
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(6);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(6);
var normalizeHeaderName = __webpack_require__(56);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(23);
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(23);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(27)))

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(6);
var settle = __webpack_require__(57);
var buildURL = __webpack_require__(20);
var buildFullPath = __webpack_require__(59);
var parseHeaders = __webpack_require__(62);
var isURLSameOrigin = __webpack_require__(63);
var createError = __webpack_require__(24);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(64);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(58);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(6);

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'params', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy'];
  var defaultToConfig2Keys = [
    'baseURL', 'url', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress',
    'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath'
  ];

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys);

  var otherKeys = Object
    .keys(config2)
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, function otherKeysDefaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 27 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(6);
var bind = __webpack_require__(19);
var Axios = __webpack_require__(52);
var mergeConfig = __webpack_require__(25);
var defaults = __webpack_require__(22);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(26);
axios.CancelToken = __webpack_require__(65);
axios.isCancel = __webpack_require__(21);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(66);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(6);
var buildURL = __webpack_require__(20);
var InterceptorManager = __webpack_require__(53);
var dispatchRequest = __webpack_require__(54);
var mergeConfig = __webpack_require__(25);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(6);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(6);
var transformData = __webpack_require__(55);
var isCancel = __webpack_require__(21);
var defaults = __webpack_require__(22);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(6);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(6);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(24);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(60);
var combineURLs = __webpack_require__(61);

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(6);

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(6);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(6);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(26);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(121);


/***/ }),
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/js/actions.js
var actions = __webpack_require__(1);

// EXTERNAL MODULE: ./src/js/api.js
var api = __webpack_require__(11);

// EXTERNAL MODULE: ./src/js/storage.js + 1 modules
var storage = __webpack_require__(0);

// EXTERNAL MODULE: ./src/js/badge.js + 1 modules
var badge = __webpack_require__(12);

// EXTERNAL MODULE: ./src/js/app.js + 5 modules
var app = __webpack_require__(13);

// EXTERNAL MODULE: ./src/js/proxy.js
var proxy = __webpack_require__(7);

// EXTERNAL MODULE: ./src/js/messages.js
var messages = __webpack_require__(2);

// EXTERNAL MODULE: ./src/js/tabs.js
var tabs = __webpack_require__(16);

// EXTERNAL MODULE: ./src/js/notifications.js
var notifications = __webpack_require__(15);

// CONCATENATED MODULE: ./src/js/app-local.js






const KEEP_ALIVE_INTERVAL = 30 * 1000;
const USER_CHECK_INTERVAL = 30 * 60 * 1000;
const ApiBasedApp = {
  async startKeepAlive() {
    console.log('~startKeepAlive~');
    const user = await storage["a" /* Storage */].user.getUser();
    console.log('user: ', user);

    if (!user) {
      return;
    }

    await api["a" /* BackendApi */].keepAlive(user.email, user.password);
    this.keepAliveIntervalId = setInterval(() => {
      api["a" /* BackendApi */].keepAlive(user.email, user.password);
    }, KEEP_ALIVE_INTERVAL);
    const selectedLocation = await storage["a" /* Storage */].local.get(['selectedCountryISO', 'selectedCity']);
    console.log('selectedLocation: ', selectedLocation);
    return await this.getServerInfo(user, selectedLocation.selectedCountryISO, selectedLocation.selectedCity);
  },

  startUserCheck() {
    this._doUserCheck();

    this.userCheckIntervalId = setInterval(() => {
      this._doUserCheck();
    }, USER_CHECK_INTERVAL);
  },

  _stopUserCheck() {
    if (this.userCheckIntervalId) {
      clearInterval(this.userCheckIntervalId);
      this.userCheckIntervalId = null;
    }
  },

  async _doUserCheck() {
    const user = await storage["a" /* Storage */].user.getUser();

    if (!user) {
      return;
    }

    const userStatus = await api["a" /* BackendApi */].logIn(user.email, user.password);

    if (userStatus.status === api["c" /* STATUS_PREMIUM_EXPIRED */]) {
      notifications["a" /* Notifications */].showMessage('Your premium account is expired');
      storage["a" /* Storage */].user.setPremium(false);

      this._stopUserCheck(); //TODO: and if connected


      if (!storage["a" /* Storage */].app.isInstalled()) {
        this.disconnect();
      }
    }

    if (userStatus.status === api["b" /* STATUS_OK */]) {
      storage["a" /* Storage */].user.setPremium(true);
    }
  },

  async getServerInfo(user, countryISO, city) {
    const serverInfo = await api["a" /* BackendApi */].getNewServer(user.email, user.password, countryISO, city);
    console.log('serverInfo: ', serverInfo);

    if (serverInfo.status === api["b" /* STATUS_OK */]) {
      return serverInfo.data;
    }

    if (serverInfo.status === api["c" /* STATUS_PREMIUM_EXPIRED */]) {
      storage["a" /* Storage */].user.setPremium(false);
    }

    return null;
  },

  setProxy(serverInfo) {
    //TODO: add error handling?
    if (!serverInfo) {
      return false;
    }

    proxy["a" /* Proxy */].setSocksProxy({
      proxy: serverInfo.hostname,
      port: serverInfo.port
    });
    const now = Date.now();
    storage["a" /* Storage */].user.setLastChangedTime(now);
    messages["a" /* default */].toPopup().updateLastTimeChanged(now);
    const loc = {
      city: serverInfo.city_name,
      country: serverInfo.country_name,
      region: serverInfo.region_name,
      countryiso: serverInfo.country_code
    };
    console.log('location: ', loc); //TODO: add error handling?
    //TODO: change location in callback?

    storage["a" /* Storage */].user.setLocation(loc);
    storage["a" /* Storage */].user.setLastLocation(loc);
    chrome.storage.local.set({
      'currentCountryISO': serverInfo.country_code
    });
    chrome.storage.local.set({
      'currentCity': serverInfo.city_name
    });
    messages["a" /* default */].toPopup().updateLastLocation(loc);
    return true;
  },

  disconnect() {
    this.stopKeepAlive();
    badge["a" /* Badge */].setDisconnected();
    proxy["a" /* Proxy */].unset();
    const loc = storage["a" /* Storage */].user.getDefaultLocation();
    console.log('@loc: ', loc);
    storage["a" /* Storage */].user.setLocation(loc);
    messages["a" /* default */].toPopup().updateLastLocation(loc);
  },

  stopKeepAlive() {
    if (this.keepAliveIntervalId) {
      clearInterval(this.keepAliveIntervalId);
      this.keepAliveIntervalId = null;
    }
  }

};
// EXTERNAL MODULE: ./src/js/urls.js
var urls = __webpack_require__(4);

// CONCATENATED MODULE: ./src/js/background.js










window.tab_info = false;
window.tab_info2 = false;
window.tab_info3 = false;

const downloadApp = url => {
  window.download_url = url;
  Object(tabs["a" /* closeStep1Tab */])();
  chrome.tabs.create({
    url
  });
};

const appConnect = () => {
  console.log('~appConnect~');
  chrome.storage.local.get(['isBannedIPCompilance', 'isBannedIP'], function (ret) {
    if (ret.isBannedIPCompilance) {
      storage["a" /* Storage */].app.setConnected(false);
      proxy["a" /* Proxy */].unset(); //TODO: show it
      // scope.compilanceBlock = "block";

      return;
    }

    if (ret.isBannedIP) {
      storage["a" /* Storage */].app.setConnected(false);
      proxy["a" /* Proxy */].unset();
      chrome.tabs.create({
        url: urls["b" /* SyncURL */].URL_BANNED
      });
      return;
    }

    proxy["a" /* Proxy */].set();
    const lastChangedTime = storage["a" /* Storage */].user.getLastChangedTime();
    console.log('lastChangedTime: ', lastChangedTime);
    messages["a" /* default */].toPopup().updateLastTimeChanged(lastChangedTime);
    const loc = storage["a" /* Storage */].user.getLastLocation();
    console.log('Storage.user.getLastLocation(): ', loc);

    if (loc) {
      console.log('Storage.user.getLocation(): ', storage["a" /* Storage */].user.getLocation());
      storage["a" /* Storage */].user.setLocation(loc);
      chrome.storage.local.set({
        'currentCountryISO': loc.countryiso
      });
      chrome.storage.local.set({
        'currentCity': loc.city
      });
    }

    messages["a" /* default */].toPopup().updateLastLocation(loc);
    storage["a" /* Storage */].app.setConnected(true);
    Object(badge["b" /* changeBadgeOnConnection */])();
  });
};

const locationChange = (_nearby, providedCountryISO, providedCity) => {
  chrome.storage.local.get('main_residential_checked', ({
    main_residential_checked
  }) => {
    console.log('main_residential_checked: ', main_residential_checked);
    console.log('providedCountryISO: ', providedCountryISO);
    console.log('providedCity: ', providedCity);
    let is_residential = false;

    if (typeof main_residential_checked !== 'undefined' && main_residential_checked) {
      is_residential = true;
    }

    chrome.storage.local.get('app_non_residential', function ({
      app_non_residential
    }) {
      console.log('2 app_non_residential: ', app_non_residential);

      if (app_non_residential) {
        app["a" /* App */].changeIPCountryCityNew(providedCountryISO, providedCity, false, is_residential);
      } else {
        app["a" /* App */].changeIPCountryCity(providedCountryISO, providedCity, false);
      }
    });
  });
}; // const locationChange = (_nearby, providedCountryISO, providedCity) => {
//   chrome.storage.local.get('main_residential_checked', function (ret1) {
//     console.log('main_residential_checked: ', ret1);
//     console.log('providedCountryISO: ', providedCountryISO);
//     console.log('providedCity: ', providedCity);
//
//     chrome.storage.local.get("staticiplist", function (lstold) {
//       chrome.storage.local.get("serveriplist", function (lst) {
//         var locations = lstold.staticiplist;
//
//         var is_residential = false;
//
//         if (typeof ret1.main_residential_checked !== 'undefined')
//           is_residential = ret1.main_residential_checked;
//
//         try {
//           if (Array.isArray(lst.serveriplist) && lst.serveriplist.length === 2)
//             locations = is_residential ? lst.serveriplist[1] : lst.serveriplist[0];
//         } catch (err) {
//           console.log(err);
//         }
//
//         console.log('locations: ', locations);
//         var currentCountryISO = locations[0].countryISO;
//         var currentCity = locations[0].cities[0];
//
//         chrome.storage.local.get(['selectedCountryISO', 'currentCountryISO'], function (_currentCountryISO) {
//           console.log('_currentCountryISO: ', _currentCountryISO);
//
//           chrome.storage.local.get('currentCity', function (_currentCity) {
//             console.log('currentCity: ', currentCity);
//
//             chrome.storage.local.get('main_residential_checked', function (ret) {
//               console.log('2  main_residential_checked: ', ret);
//
//               var is_residential = false;
//
//               if (typeof ret.main_residential_checked !== 'undefined' && ret.main_residential_checked)
//                 is_residential = true;
//
//               if (typeof _currentCountryISO.selectedCountryISO !== 'undefined' && _currentCountryISO.selectedCountryISO.length > 0)
//                 currentCountryISO = _currentCountryISO.selectedCountryISO;
//               else if (typeof _currentCountryISO.currentCountryISO !== 'undefined' && _currentCountryISO.currentCountryISO.length > 0)
//                 currentCountryISO = _currentCountryISO.currentCountryISO;
//
//               if (typeof _currentCity.currentCity !== 'undefined' && _currentCity.currentCity.length > 0)
//                 currentCity = _currentCity.currentCity;
//
//               // TODO: remove storage calls when we will be ready
//               if (providedCountryISO) {
//                 currentCountryISO = providedCountryISO;
//               }
//
//               if (providedCity) {
//                 currentCity = providedCity
//               }
//
//               App.changeIPCountryCityNew(currentCountryISO, currentCity, _nearby, is_residential);
//             });
//           });
//         });
//       });
//     });
//   });
// };


const appDisconnect = () => {
  console.log('~appDisconnect~');
  proxy["a" /* Proxy */].unset();
  storage["a" /* Storage */].app.setConnected(false);
  console.log('Storage.user.getDefaultLocation(): ', storage["a" /* Storage */].user.getDefaultLocation());
  const lastLocation = storage["a" /* Storage */].user.getLocation();
  const oldLocation = storage["a" /* Storage */].user.getDefaultLocation();
  storage["a" /* Storage */].user.setLocation(oldLocation);
  storage["a" /* Storage */].user.setLastLocation(lastLocation);
  messages["a" /* default */].toPopup().updateLastLocation(oldLocation);
  badge["a" /* Badge */].setDisconnected();
};

const initMessageListeners = () => {
  chrome.runtime.onMessageExternal.addListener(function (msg, sender, sendResponse) {
    if (msg.action === "check_installed") {
      sendResponse({
        is_installed: "yes"
      });
    }
  });
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('BG MESSAGE: ' + JSON.stringify(message));

    switch (message.action) {
      case actions["e" /* MSG_DOWNLOAD_APP */]:
        downloadApp(message.url);
        sendResponse();
        break;

      case actions["i" /* MSG_LOCATION_SELECTED */]:
        badge["a" /* Badge */].setConnected(message.countryISO);

        if (storage["a" /* Storage */].app.isInstalled()) {
          locationChange(false, message.countryISO, message.city);
          sendResponse();
        } else {
          (async () => {
            const user = await storage["a" /* Storage */].user.getUser();
            console.log('user: ', user);
            const info = await ApiBasedApp.getServerInfo(user, message.countryISO, message.city);
            console.log('info: ', info);
            ApiBasedApp.setProxy(info);
            sendResponse();
          })();
        }

        break;

      case actions["p" /* MSG_SET_NEXT_NEARBY */]:
        if (storage["a" /* Storage */].app.isInstalled()) {
          locationChange(true, message.countryISO, message.city || 'Any');
          sendResponse();
        } else {
          //TODO: duplicated from above
          (async () => {
            const user = await storage["a" /* Storage */].user.getUser();
            console.log('user: ', user);
            const info = await ApiBasedApp.getServerInfo(user, message.countryISO, message.city);
            console.log('info: ', info);
            ApiBasedApp.setProxy(info);
            sendResponse();
          })();
        }

        break;

      case actions["d" /* MSG_APP_GET_ACCOUNT_INFO */]:
        //TODO: move to App
        const msg = {
          name: message.action,
          args: JSON.stringify(message.args)
        };
        app["a" /* App */].sendMessage(msg, sendResponse);
        break;
      //
      // Background-related events
      //

      /*************************************************/

      case actions["f" /* MSG_GET_FLAG_ICON */]:
        console.log('Storage.app.isInstalled(): ', storage["a" /* Storage */].app.isInstalled());

        if (storage["a" /* Storage */].app.isInstalled()) {
          app["a" /* App */].getCountryFlagName(message.iso, iconName => {
            const path = message.medium ? 'img/flags-medium/' + iconName.toLowerCase() : 'img/flags/' + iconName;
            sendResponse(chrome.runtime.getURL(path));
          });
        } else {
          const path = (message.medium ? 'img/flags-medium/' + message.iso.toLowerCase() : 'img/flags/' + message.iso) + '.png';
          sendResponse(chrome.runtime.getURL(path));
        }

        break;

      case actions["h" /* MSG_IS_PROXY_SET */]:
        sendResponse(proxy["a" /* Proxy */].isSet());
        break;
      //
      // API-related events
      //

      /*************************************************/

      case actions["q" /* MSG_STARTUP_DATA */]:
        api["a" /* BackendApi */].startupData(message.username, message.passHash).then(sendResponse);
        break;

      case actions["a" /* MSG_API_LOG_IN */]:
        api["a" /* BackendApi */].logIn(message.username, message.passHash).then(sendResponse);
        break;

      case actions["c" /* MSG_API_SUBMIT_RATING */]:
        api["a" /* BackendApi */].submitRating(message.rating, storage["a" /* Storage */].user.getEmail() || '').then(sendResponse);
        break;

      case actions["b" /* MSG_API_SUBMIT_FEEDBACK */]:
        api["a" /* BackendApi */].submitFeedback(message.msg, storage["a" /* Storage */].user.getEmail() || '').then(sendResponse);
        break;

      case actions["r" /* MSG_TOGGLE_CONNECTION */]:
        console.log('Storage.app.isInstalled(): ', storage["a" /* Storage */].app.isInstalled());

        if (storage["a" /* Storage */].app.isInstalled()) {
          if (message.connected) {
            appConnect();
          } else {
            appDisconnect();
          }

          sendResponse();
        } else {
          if (message.connected) {
            ApiBasedApp.startKeepAlive().then(serverInfo => {
              console.log('Keep_alive sent! serverInfo: ', serverInfo);

              if (serverInfo) {
                badge["a" /* Badge */].setConnected(serverInfo.country_code);
                ApiBasedApp.setProxy(serverInfo);
                sendResponse();
              } else {
                // Premium Expired
                sendResponse(api["c" /* STATUS_PREMIUM_EXPIRED */]);
              } // Proxy.
              // data:
              //   city_name: "Amsterdam"
              // country_code: "NL"
              // country_name: "Netherlands"
              // hostname: "142.93.139.162"
              // password: "206c80413b9a96c1312cc346b7d2517b84463edd"
              // port: 501
              // region_name: "Amsterdam"
              // username: "viktar@test.com"

            });
          } else {
            ApiBasedApp.disconnect();
            sendResponse();
          }
        }

        break;

      case actions["g" /* MSG_GET_USER */]:
        storage["a" /* Storage */].user.getUser().then(sendResponse);
        break;

      case actions["j" /* MSG_LOG_IN */]:
        storage["a" /* Storage */].user.setUser({
          email: message.email,
          password: message.password
        });
        app["a" /* App */].logIn(message.email, message.password);
        sendResponse();
        break;
    }

    return true;
  });
};

const resetLocation = () => {
  const oldLocation = storage["a" /* Storage */].user.getDefaultLocation();
  console.log('@@oldLocation: ', oldLocation);

  if (oldLocation) {
    storage["a" /* Storage */].user.setLocation(oldLocation);
  }
};

const onExtensionInstalled = () => {
  chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason === "install") {
      chrome.storage.local.get('was_shown_info', function (res) {
        urls["a" /* AsyncURL */].step1().then(url => {
          chrome.tabs.create({
            url
          }, function (tab) {
            window.tab_info = tab.id;
            window.download_id = false;
            chrome.downloads.onChanged.addListener(function (downloadItem) {
              console.log('chrome.downloads.onChanged: ', downloadItem);
              console.log('window.download_id: ', window.download_id);

              if (window.download_id == downloadItem.id) {
                console.log('window.tab_info2L: ', window.tab_info2);
                console.log('downloadItem: ', downloadItem);

                if (window.tab_info2 == false && typeof downloadItem.state !== 'undefined' && downloadItem.state.current == "complete") {
                  console.log('opending url2...');
                  urls["a" /* AsyncURL */].step2().then(urlStep2 => {
                    console.log('urlStep2: ', urlStep2);
                    chrome.tabs.create({
                      url: urlStep2
                    }, function (tab) {
                      window.tab_info2 = tab.id;
                    });
                  });
                }
              }
            });
            chrome.downloads.onCreated.addListener(function (downloadItem) {
              console.log('downloadItem: ', downloadItem);
              console.log('window.download_url: ', window.download_url);

              if (downloadItem.url == window.download_url) {
                window.download_id = downloadItem.id;
              }

              if (window.download_id == false) {
                if (downloadItem.url.toLowerCase().includes("tuxler") && (downloadItem.url.toLowerCase().includes(".exe") || downloadItem.url.toLowerCase().includes(".pkg"))) {
                  window.download_id = downloadItem.id;
                }
              }
            });
          });
        });
      });
    }
  });
};

const initExtension = () => {
  initMessageListeners();
  resetLocation();
  app["a" /* App */].start();
  ApiBasedApp.startUserCheck();
  onExtensionInstalled();
};

initExtension();

/***/ })
/******/ ]);