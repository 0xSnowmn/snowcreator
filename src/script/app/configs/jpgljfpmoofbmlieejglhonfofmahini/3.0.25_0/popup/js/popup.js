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
/******/ 	return __webpack_require__(__webpack_require__.s = 70);
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
/* 9 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ addStylesClient; });

// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/listToStyles.js
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}

// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/addStylesClient.js
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Vue.js v2.6.11
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
!function(e,t){ true?module.exports=t():undefined}(this,function(){"use strict";var e=Object.freeze({});function t(e){return null==e}function n(e){return null!=e}function r(e){return!0===e}function i(e){return"string"==typeof e||"number"==typeof e||"symbol"==typeof e||"boolean"==typeof e}function o(e){return null!==e&&"object"==typeof e}var a=Object.prototype.toString;function s(e){return"[object Object]"===a.call(e)}function c(e){var t=parseFloat(String(e));return t>=0&&Math.floor(t)===t&&isFinite(e)}function u(e){return n(e)&&"function"==typeof e.then&&"function"==typeof e.catch}function l(e){return null==e?"":Array.isArray(e)||s(e)&&e.toString===a?JSON.stringify(e,null,2):String(e)}function f(e){var t=parseFloat(e);return isNaN(t)?e:t}function p(e,t){for(var n=Object.create(null),r=e.split(","),i=0;i<r.length;i++)n[r[i]]=!0;return t?function(e){return n[e.toLowerCase()]}:function(e){return n[e]}}var d=p("slot,component",!0),v=p("key,ref,slot,slot-scope,is");function h(e,t){if(e.length){var n=e.indexOf(t);if(n>-1)return e.splice(n,1)}}var m=Object.prototype.hasOwnProperty;function y(e,t){return m.call(e,t)}function g(e){var t=Object.create(null);return function(n){return t[n]||(t[n]=e(n))}}var _=/-(\w)/g,b=g(function(e){return e.replace(_,function(e,t){return t?t.toUpperCase():""})}),$=g(function(e){return e.charAt(0).toUpperCase()+e.slice(1)}),w=/\B([A-Z])/g,C=g(function(e){return e.replace(w,"-$1").toLowerCase()});var x=Function.prototype.bind?function(e,t){return e.bind(t)}:function(e,t){function n(n){var r=arguments.length;return r?r>1?e.apply(t,arguments):e.call(t,n):e.call(t)}return n._length=e.length,n};function k(e,t){t=t||0;for(var n=e.length-t,r=new Array(n);n--;)r[n]=e[n+t];return r}function A(e,t){for(var n in t)e[n]=t[n];return e}function O(e){for(var t={},n=0;n<e.length;n++)e[n]&&A(t,e[n]);return t}function S(e,t,n){}var T=function(e,t,n){return!1},E=function(e){return e};function N(e,t){if(e===t)return!0;var n=o(e),r=o(t);if(!n||!r)return!n&&!r&&String(e)===String(t);try{var i=Array.isArray(e),a=Array.isArray(t);if(i&&a)return e.length===t.length&&e.every(function(e,n){return N(e,t[n])});if(e instanceof Date&&t instanceof Date)return e.getTime()===t.getTime();if(i||a)return!1;var s=Object.keys(e),c=Object.keys(t);return s.length===c.length&&s.every(function(n){return N(e[n],t[n])})}catch(e){return!1}}function j(e,t){for(var n=0;n<e.length;n++)if(N(e[n],t))return n;return-1}function D(e){var t=!1;return function(){t||(t=!0,e.apply(this,arguments))}}var L="data-server-rendered",M=["component","directive","filter"],I=["beforeCreate","created","beforeMount","mounted","beforeUpdate","updated","beforeDestroy","destroyed","activated","deactivated","errorCaptured","serverPrefetch"],F={optionMergeStrategies:Object.create(null),silent:!1,productionTip:!1,devtools:!1,performance:!1,errorHandler:null,warnHandler:null,ignoredElements:[],keyCodes:Object.create(null),isReservedTag:T,isReservedAttr:T,isUnknownElement:T,getTagNamespace:S,parsePlatformTagName:E,mustUseProp:T,async:!0,_lifecycleHooks:I},P=/a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;function R(e,t,n,r){Object.defineProperty(e,t,{value:n,enumerable:!!r,writable:!0,configurable:!0})}var H=new RegExp("[^"+P.source+".$_\\d]");var B,U="__proto__"in{},z="undefined"!=typeof window,V="undefined"!=typeof WXEnvironment&&!!WXEnvironment.platform,K=V&&WXEnvironment.platform.toLowerCase(),J=z&&window.navigator.userAgent.toLowerCase(),q=J&&/msie|trident/.test(J),W=J&&J.indexOf("msie 9.0")>0,Z=J&&J.indexOf("edge/")>0,G=(J&&J.indexOf("android"),J&&/iphone|ipad|ipod|ios/.test(J)||"ios"===K),X=(J&&/chrome\/\d+/.test(J),J&&/phantomjs/.test(J),J&&J.match(/firefox\/(\d+)/)),Y={}.watch,Q=!1;if(z)try{var ee={};Object.defineProperty(ee,"passive",{get:function(){Q=!0}}),window.addEventListener("test-passive",null,ee)}catch(e){}var te=function(){return void 0===B&&(B=!z&&!V&&"undefined"!=typeof global&&(global.process&&"server"===global.process.env.VUE_ENV)),B},ne=z&&window.__VUE_DEVTOOLS_GLOBAL_HOOK__;function re(e){return"function"==typeof e&&/native code/.test(e.toString())}var ie,oe="undefined"!=typeof Symbol&&re(Symbol)&&"undefined"!=typeof Reflect&&re(Reflect.ownKeys);ie="undefined"!=typeof Set&&re(Set)?Set:function(){function e(){this.set=Object.create(null)}return e.prototype.has=function(e){return!0===this.set[e]},e.prototype.add=function(e){this.set[e]=!0},e.prototype.clear=function(){this.set=Object.create(null)},e}();var ae=S,se=0,ce=function(){this.id=se++,this.subs=[]};ce.prototype.addSub=function(e){this.subs.push(e)},ce.prototype.removeSub=function(e){h(this.subs,e)},ce.prototype.depend=function(){ce.target&&ce.target.addDep(this)},ce.prototype.notify=function(){for(var e=this.subs.slice(),t=0,n=e.length;t<n;t++)e[t].update()},ce.target=null;var ue=[];function le(e){ue.push(e),ce.target=e}function fe(){ue.pop(),ce.target=ue[ue.length-1]}var pe=function(e,t,n,r,i,o,a,s){this.tag=e,this.data=t,this.children=n,this.text=r,this.elm=i,this.ns=void 0,this.context=o,this.fnContext=void 0,this.fnOptions=void 0,this.fnScopeId=void 0,this.key=t&&t.key,this.componentOptions=a,this.componentInstance=void 0,this.parent=void 0,this.raw=!1,this.isStatic=!1,this.isRootInsert=!0,this.isComment=!1,this.isCloned=!1,this.isOnce=!1,this.asyncFactory=s,this.asyncMeta=void 0,this.isAsyncPlaceholder=!1},de={child:{configurable:!0}};de.child.get=function(){return this.componentInstance},Object.defineProperties(pe.prototype,de);var ve=function(e){void 0===e&&(e="");var t=new pe;return t.text=e,t.isComment=!0,t};function he(e){return new pe(void 0,void 0,void 0,String(e))}function me(e){var t=new pe(e.tag,e.data,e.children&&e.children.slice(),e.text,e.elm,e.context,e.componentOptions,e.asyncFactory);return t.ns=e.ns,t.isStatic=e.isStatic,t.key=e.key,t.isComment=e.isComment,t.fnContext=e.fnContext,t.fnOptions=e.fnOptions,t.fnScopeId=e.fnScopeId,t.asyncMeta=e.asyncMeta,t.isCloned=!0,t}var ye=Array.prototype,ge=Object.create(ye);["push","pop","shift","unshift","splice","sort","reverse"].forEach(function(e){var t=ye[e];R(ge,e,function(){for(var n=[],r=arguments.length;r--;)n[r]=arguments[r];var i,o=t.apply(this,n),a=this.__ob__;switch(e){case"push":case"unshift":i=n;break;case"splice":i=n.slice(2)}return i&&a.observeArray(i),a.dep.notify(),o})});var _e=Object.getOwnPropertyNames(ge),be=!0;function $e(e){be=e}var we=function(e){var t;this.value=e,this.dep=new ce,this.vmCount=0,R(e,"__ob__",this),Array.isArray(e)?(U?(t=ge,e.__proto__=t):function(e,t,n){for(var r=0,i=n.length;r<i;r++){var o=n[r];R(e,o,t[o])}}(e,ge,_e),this.observeArray(e)):this.walk(e)};function Ce(e,t){var n;if(o(e)&&!(e instanceof pe))return y(e,"__ob__")&&e.__ob__ instanceof we?n=e.__ob__:be&&!te()&&(Array.isArray(e)||s(e))&&Object.isExtensible(e)&&!e._isVue&&(n=new we(e)),t&&n&&n.vmCount++,n}function xe(e,t,n,r,i){var o=new ce,a=Object.getOwnPropertyDescriptor(e,t);if(!a||!1!==a.configurable){var s=a&&a.get,c=a&&a.set;s&&!c||2!==arguments.length||(n=e[t]);var u=!i&&Ce(n);Object.defineProperty(e,t,{enumerable:!0,configurable:!0,get:function(){var t=s?s.call(e):n;return ce.target&&(o.depend(),u&&(u.dep.depend(),Array.isArray(t)&&function e(t){for(var n=void 0,r=0,i=t.length;r<i;r++)(n=t[r])&&n.__ob__&&n.__ob__.dep.depend(),Array.isArray(n)&&e(n)}(t))),t},set:function(t){var r=s?s.call(e):n;t===r||t!=t&&r!=r||s&&!c||(c?c.call(e,t):n=t,u=!i&&Ce(t),o.notify())}})}}function ke(e,t,n){if(Array.isArray(e)&&c(t))return e.length=Math.max(e.length,t),e.splice(t,1,n),n;if(t in e&&!(t in Object.prototype))return e[t]=n,n;var r=e.__ob__;return e._isVue||r&&r.vmCount?n:r?(xe(r.value,t,n),r.dep.notify(),n):(e[t]=n,n)}function Ae(e,t){if(Array.isArray(e)&&c(t))e.splice(t,1);else{var n=e.__ob__;e._isVue||n&&n.vmCount||y(e,t)&&(delete e[t],n&&n.dep.notify())}}we.prototype.walk=function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)xe(e,t[n])},we.prototype.observeArray=function(e){for(var t=0,n=e.length;t<n;t++)Ce(e[t])};var Oe=F.optionMergeStrategies;function Se(e,t){if(!t)return e;for(var n,r,i,o=oe?Reflect.ownKeys(t):Object.keys(t),a=0;a<o.length;a++)"__ob__"!==(n=o[a])&&(r=e[n],i=t[n],y(e,n)?r!==i&&s(r)&&s(i)&&Se(r,i):ke(e,n,i));return e}function Te(e,t,n){return n?function(){var r="function"==typeof t?t.call(n,n):t,i="function"==typeof e?e.call(n,n):e;return r?Se(r,i):i}:t?e?function(){return Se("function"==typeof t?t.call(this,this):t,"function"==typeof e?e.call(this,this):e)}:t:e}function Ee(e,t){var n=t?e?e.concat(t):Array.isArray(t)?t:[t]:e;return n?function(e){for(var t=[],n=0;n<e.length;n++)-1===t.indexOf(e[n])&&t.push(e[n]);return t}(n):n}function Ne(e,t,n,r){var i=Object.create(e||null);return t?A(i,t):i}Oe.data=function(e,t,n){return n?Te(e,t,n):t&&"function"!=typeof t?e:Te(e,t)},I.forEach(function(e){Oe[e]=Ee}),M.forEach(function(e){Oe[e+"s"]=Ne}),Oe.watch=function(e,t,n,r){if(e===Y&&(e=void 0),t===Y&&(t=void 0),!t)return Object.create(e||null);if(!e)return t;var i={};for(var o in A(i,e),t){var a=i[o],s=t[o];a&&!Array.isArray(a)&&(a=[a]),i[o]=a?a.concat(s):Array.isArray(s)?s:[s]}return i},Oe.props=Oe.methods=Oe.inject=Oe.computed=function(e,t,n,r){if(!e)return t;var i=Object.create(null);return A(i,e),t&&A(i,t),i},Oe.provide=Te;var je=function(e,t){return void 0===t?e:t};function De(e,t,n){if("function"==typeof t&&(t=t.options),function(e,t){var n=e.props;if(n){var r,i,o={};if(Array.isArray(n))for(r=n.length;r--;)"string"==typeof(i=n[r])&&(o[b(i)]={type:null});else if(s(n))for(var a in n)i=n[a],o[b(a)]=s(i)?i:{type:i};e.props=o}}(t),function(e,t){var n=e.inject;if(n){var r=e.inject={};if(Array.isArray(n))for(var i=0;i<n.length;i++)r[n[i]]={from:n[i]};else if(s(n))for(var o in n){var a=n[o];r[o]=s(a)?A({from:o},a):{from:a}}}}(t),function(e){var t=e.directives;if(t)for(var n in t){var r=t[n];"function"==typeof r&&(t[n]={bind:r,update:r})}}(t),!t._base&&(t.extends&&(e=De(e,t.extends,n)),t.mixins))for(var r=0,i=t.mixins.length;r<i;r++)e=De(e,t.mixins[r],n);var o,a={};for(o in e)c(o);for(o in t)y(e,o)||c(o);function c(r){var i=Oe[r]||je;a[r]=i(e[r],t[r],n,r)}return a}function Le(e,t,n,r){if("string"==typeof n){var i=e[t];if(y(i,n))return i[n];var o=b(n);if(y(i,o))return i[o];var a=$(o);return y(i,a)?i[a]:i[n]||i[o]||i[a]}}function Me(e,t,n,r){var i=t[e],o=!y(n,e),a=n[e],s=Pe(Boolean,i.type);if(s>-1)if(o&&!y(i,"default"))a=!1;else if(""===a||a===C(e)){var c=Pe(String,i.type);(c<0||s<c)&&(a=!0)}if(void 0===a){a=function(e,t,n){if(!y(t,"default"))return;var r=t.default;if(e&&e.$options.propsData&&void 0===e.$options.propsData[n]&&void 0!==e._props[n])return e._props[n];return"function"==typeof r&&"Function"!==Ie(t.type)?r.call(e):r}(r,i,e);var u=be;$e(!0),Ce(a),$e(u)}return a}function Ie(e){var t=e&&e.toString().match(/^\s*function (\w+)/);return t?t[1]:""}function Fe(e,t){return Ie(e)===Ie(t)}function Pe(e,t){if(!Array.isArray(t))return Fe(t,e)?0:-1;for(var n=0,r=t.length;n<r;n++)if(Fe(t[n],e))return n;return-1}function Re(e,t,n){le();try{if(t)for(var r=t;r=r.$parent;){var i=r.$options.errorCaptured;if(i)for(var o=0;o<i.length;o++)try{if(!1===i[o].call(r,e,t,n))return}catch(e){Be(e,r,"errorCaptured hook")}}Be(e,t,n)}finally{fe()}}function He(e,t,n,r,i){var o;try{(o=n?e.apply(t,n):e.call(t))&&!o._isVue&&u(o)&&!o._handled&&(o.catch(function(e){return Re(e,r,i+" (Promise/async)")}),o._handled=!0)}catch(e){Re(e,r,i)}return o}function Be(e,t,n){if(F.errorHandler)try{return F.errorHandler.call(null,e,t,n)}catch(t){t!==e&&Ue(t,null,"config.errorHandler")}Ue(e,t,n)}function Ue(e,t,n){if(!z&&!V||"undefined"==typeof console)throw e;console.error(e)}var ze,Ve=!1,Ke=[],Je=!1;function qe(){Je=!1;var e=Ke.slice(0);Ke.length=0;for(var t=0;t<e.length;t++)e[t]()}if("undefined"!=typeof Promise&&re(Promise)){var We=Promise.resolve();ze=function(){We.then(qe),G&&setTimeout(S)},Ve=!0}else if(q||"undefined"==typeof MutationObserver||!re(MutationObserver)&&"[object MutationObserverConstructor]"!==MutationObserver.toString())ze="undefined"!=typeof setImmediate&&re(setImmediate)?function(){setImmediate(qe)}:function(){setTimeout(qe,0)};else{var Ze=1,Ge=new MutationObserver(qe),Xe=document.createTextNode(String(Ze));Ge.observe(Xe,{characterData:!0}),ze=function(){Ze=(Ze+1)%2,Xe.data=String(Ze)},Ve=!0}function Ye(e,t){var n;if(Ke.push(function(){if(e)try{e.call(t)}catch(e){Re(e,t,"nextTick")}else n&&n(t)}),Je||(Je=!0,ze()),!e&&"undefined"!=typeof Promise)return new Promise(function(e){n=e})}var Qe=new ie;function et(e){!function e(t,n){var r,i;var a=Array.isArray(t);if(!a&&!o(t)||Object.isFrozen(t)||t instanceof pe)return;if(t.__ob__){var s=t.__ob__.dep.id;if(n.has(s))return;n.add(s)}if(a)for(r=t.length;r--;)e(t[r],n);else for(i=Object.keys(t),r=i.length;r--;)e(t[i[r]],n)}(e,Qe),Qe.clear()}var tt=g(function(e){var t="&"===e.charAt(0),n="~"===(e=t?e.slice(1):e).charAt(0),r="!"===(e=n?e.slice(1):e).charAt(0);return{name:e=r?e.slice(1):e,once:n,capture:r,passive:t}});function nt(e,t){function n(){var e=arguments,r=n.fns;if(!Array.isArray(r))return He(r,null,arguments,t,"v-on handler");for(var i=r.slice(),o=0;o<i.length;o++)He(i[o],null,e,t,"v-on handler")}return n.fns=e,n}function rt(e,n,i,o,a,s){var c,u,l,f;for(c in e)u=e[c],l=n[c],f=tt(c),t(u)||(t(l)?(t(u.fns)&&(u=e[c]=nt(u,s)),r(f.once)&&(u=e[c]=a(f.name,u,f.capture)),i(f.name,u,f.capture,f.passive,f.params)):u!==l&&(l.fns=u,e[c]=l));for(c in n)t(e[c])&&o((f=tt(c)).name,n[c],f.capture)}function it(e,i,o){var a;e instanceof pe&&(e=e.data.hook||(e.data.hook={}));var s=e[i];function c(){o.apply(this,arguments),h(a.fns,c)}t(s)?a=nt([c]):n(s.fns)&&r(s.merged)?(a=s).fns.push(c):a=nt([s,c]),a.merged=!0,e[i]=a}function ot(e,t,r,i,o){if(n(t)){if(y(t,r))return e[r]=t[r],o||delete t[r],!0;if(y(t,i))return e[r]=t[i],o||delete t[i],!0}return!1}function at(e){return i(e)?[he(e)]:Array.isArray(e)?function e(o,a){var s=[];var c,u,l,f;for(c=0;c<o.length;c++)t(u=o[c])||"boolean"==typeof u||(l=s.length-1,f=s[l],Array.isArray(u)?u.length>0&&(st((u=e(u,(a||"")+"_"+c))[0])&&st(f)&&(s[l]=he(f.text+u[0].text),u.shift()),s.push.apply(s,u)):i(u)?st(f)?s[l]=he(f.text+u):""!==u&&s.push(he(u)):st(u)&&st(f)?s[l]=he(f.text+u.text):(r(o._isVList)&&n(u.tag)&&t(u.key)&&n(a)&&(u.key="__vlist"+a+"_"+c+"__"),s.push(u)));return s}(e):void 0}function st(e){return n(e)&&n(e.text)&&!1===e.isComment}function ct(e,t){if(e){for(var n=Object.create(null),r=oe?Reflect.ownKeys(e):Object.keys(e),i=0;i<r.length;i++){var o=r[i];if("__ob__"!==o){for(var a=e[o].from,s=t;s;){if(s._provided&&y(s._provided,a)){n[o]=s._provided[a];break}s=s.$parent}if(!s&&"default"in e[o]){var c=e[o].default;n[o]="function"==typeof c?c.call(t):c}}}return n}}function ut(e,t){if(!e||!e.length)return{};for(var n={},r=0,i=e.length;r<i;r++){var o=e[r],a=o.data;if(a&&a.attrs&&a.attrs.slot&&delete a.attrs.slot,o.context!==t&&o.fnContext!==t||!a||null==a.slot)(n.default||(n.default=[])).push(o);else{var s=a.slot,c=n[s]||(n[s]=[]);"template"===o.tag?c.push.apply(c,o.children||[]):c.push(o)}}for(var u in n)n[u].every(lt)&&delete n[u];return n}function lt(e){return e.isComment&&!e.asyncFactory||" "===e.text}function ft(t,n,r){var i,o=Object.keys(n).length>0,a=t?!!t.$stable:!o,s=t&&t.$key;if(t){if(t._normalized)return t._normalized;if(a&&r&&r!==e&&s===r.$key&&!o&&!r.$hasNormal)return r;for(var c in i={},t)t[c]&&"$"!==c[0]&&(i[c]=pt(n,c,t[c]))}else i={};for(var u in n)u in i||(i[u]=dt(n,u));return t&&Object.isExtensible(t)&&(t._normalized=i),R(i,"$stable",a),R(i,"$key",s),R(i,"$hasNormal",o),i}function pt(e,t,n){var r=function(){var e=arguments.length?n.apply(null,arguments):n({});return(e=e&&"object"==typeof e&&!Array.isArray(e)?[e]:at(e))&&(0===e.length||1===e.length&&e[0].isComment)?void 0:e};return n.proxy&&Object.defineProperty(e,t,{get:r,enumerable:!0,configurable:!0}),r}function dt(e,t){return function(){return e[t]}}function vt(e,t){var r,i,a,s,c;if(Array.isArray(e)||"string"==typeof e)for(r=new Array(e.length),i=0,a=e.length;i<a;i++)r[i]=t(e[i],i);else if("number"==typeof e)for(r=new Array(e),i=0;i<e;i++)r[i]=t(i+1,i);else if(o(e))if(oe&&e[Symbol.iterator]){r=[];for(var u=e[Symbol.iterator](),l=u.next();!l.done;)r.push(t(l.value,r.length)),l=u.next()}else for(s=Object.keys(e),r=new Array(s.length),i=0,a=s.length;i<a;i++)c=s[i],r[i]=t(e[c],c,i);return n(r)||(r=[]),r._isVList=!0,r}function ht(e,t,n,r){var i,o=this.$scopedSlots[e];o?(n=n||{},r&&(n=A(A({},r),n)),i=o(n)||t):i=this.$slots[e]||t;var a=n&&n.slot;return a?this.$createElement("template",{slot:a},i):i}function mt(e){return Le(this.$options,"filters",e)||E}function yt(e,t){return Array.isArray(e)?-1===e.indexOf(t):e!==t}function gt(e,t,n,r,i){var o=F.keyCodes[t]||n;return i&&r&&!F.keyCodes[t]?yt(i,r):o?yt(o,e):r?C(r)!==t:void 0}function _t(e,t,n,r,i){if(n)if(o(n)){var a;Array.isArray(n)&&(n=O(n));var s=function(o){if("class"===o||"style"===o||v(o))a=e;else{var s=e.attrs&&e.attrs.type;a=r||F.mustUseProp(t,s,o)?e.domProps||(e.domProps={}):e.attrs||(e.attrs={})}var c=b(o),u=C(o);c in a||u in a||(a[o]=n[o],i&&((e.on||(e.on={}))["update:"+o]=function(e){n[o]=e}))};for(var c in n)s(c)}else;return e}function bt(e,t){var n=this._staticTrees||(this._staticTrees=[]),r=n[e];return r&&!t?r:(wt(r=n[e]=this.$options.staticRenderFns[e].call(this._renderProxy,null,this),"__static__"+e,!1),r)}function $t(e,t,n){return wt(e,"__once__"+t+(n?"_"+n:""),!0),e}function wt(e,t,n){if(Array.isArray(e))for(var r=0;r<e.length;r++)e[r]&&"string"!=typeof e[r]&&Ct(e[r],t+"_"+r,n);else Ct(e,t,n)}function Ct(e,t,n){e.isStatic=!0,e.key=t,e.isOnce=n}function xt(e,t){if(t)if(s(t)){var n=e.on=e.on?A({},e.on):{};for(var r in t){var i=n[r],o=t[r];n[r]=i?[].concat(i,o):o}}else;return e}function kt(e,t,n,r){t=t||{$stable:!n};for(var i=0;i<e.length;i++){var o=e[i];Array.isArray(o)?kt(o,t,n):o&&(o.proxy&&(o.fn.proxy=!0),t[o.key]=o.fn)}return r&&(t.$key=r),t}function At(e,t){for(var n=0;n<t.length;n+=2){var r=t[n];"string"==typeof r&&r&&(e[t[n]]=t[n+1])}return e}function Ot(e,t){return"string"==typeof e?t+e:e}function St(e){e._o=$t,e._n=f,e._s=l,e._l=vt,e._t=ht,e._q=N,e._i=j,e._m=bt,e._f=mt,e._k=gt,e._b=_t,e._v=he,e._e=ve,e._u=kt,e._g=xt,e._d=At,e._p=Ot}function Tt(t,n,i,o,a){var s,c=this,u=a.options;y(o,"_uid")?(s=Object.create(o))._original=o:(s=o,o=o._original);var l=r(u._compiled),f=!l;this.data=t,this.props=n,this.children=i,this.parent=o,this.listeners=t.on||e,this.injections=ct(u.inject,o),this.slots=function(){return c.$slots||ft(t.scopedSlots,c.$slots=ut(i,o)),c.$slots},Object.defineProperty(this,"scopedSlots",{enumerable:!0,get:function(){return ft(t.scopedSlots,this.slots())}}),l&&(this.$options=u,this.$slots=this.slots(),this.$scopedSlots=ft(t.scopedSlots,this.$slots)),u._scopeId?this._c=function(e,t,n,r){var i=Pt(s,e,t,n,r,f);return i&&!Array.isArray(i)&&(i.fnScopeId=u._scopeId,i.fnContext=o),i}:this._c=function(e,t,n,r){return Pt(s,e,t,n,r,f)}}function Et(e,t,n,r,i){var o=me(e);return o.fnContext=n,o.fnOptions=r,t.slot&&((o.data||(o.data={})).slot=t.slot),o}function Nt(e,t){for(var n in t)e[b(n)]=t[n]}St(Tt.prototype);var jt={init:function(e,t){if(e.componentInstance&&!e.componentInstance._isDestroyed&&e.data.keepAlive){var r=e;jt.prepatch(r,r)}else{(e.componentInstance=function(e,t){var r={_isComponent:!0,_parentVnode:e,parent:t},i=e.data.inlineTemplate;n(i)&&(r.render=i.render,r.staticRenderFns=i.staticRenderFns);return new e.componentOptions.Ctor(r)}(e,Wt)).$mount(t?e.elm:void 0,t)}},prepatch:function(t,n){var r=n.componentOptions;!function(t,n,r,i,o){var a=i.data.scopedSlots,s=t.$scopedSlots,c=!!(a&&!a.$stable||s!==e&&!s.$stable||a&&t.$scopedSlots.$key!==a.$key),u=!!(o||t.$options._renderChildren||c);t.$options._parentVnode=i,t.$vnode=i,t._vnode&&(t._vnode.parent=i);if(t.$options._renderChildren=o,t.$attrs=i.data.attrs||e,t.$listeners=r||e,n&&t.$options.props){$e(!1);for(var l=t._props,f=t.$options._propKeys||[],p=0;p<f.length;p++){var d=f[p],v=t.$options.props;l[d]=Me(d,v,n,t)}$e(!0),t.$options.propsData=n}r=r||e;var h=t.$options._parentListeners;t.$options._parentListeners=r,qt(t,r,h),u&&(t.$slots=ut(o,i.context),t.$forceUpdate())}(n.componentInstance=t.componentInstance,r.propsData,r.listeners,n,r.children)},insert:function(e){var t,n=e.context,r=e.componentInstance;r._isMounted||(r._isMounted=!0,Yt(r,"mounted")),e.data.keepAlive&&(n._isMounted?((t=r)._inactive=!1,en.push(t)):Xt(r,!0))},destroy:function(e){var t=e.componentInstance;t._isDestroyed||(e.data.keepAlive?function e(t,n){if(n&&(t._directInactive=!0,Gt(t)))return;if(!t._inactive){t._inactive=!0;for(var r=0;r<t.$children.length;r++)e(t.$children[r]);Yt(t,"deactivated")}}(t,!0):t.$destroy())}},Dt=Object.keys(jt);function Lt(i,a,s,c,l){if(!t(i)){var f=s.$options._base;if(o(i)&&(i=f.extend(i)),"function"==typeof i){var p;if(t(i.cid)&&void 0===(i=function(e,i){if(r(e.error)&&n(e.errorComp))return e.errorComp;if(n(e.resolved))return e.resolved;var a=Ht;a&&n(e.owners)&&-1===e.owners.indexOf(a)&&e.owners.push(a);if(r(e.loading)&&n(e.loadingComp))return e.loadingComp;if(a&&!n(e.owners)){var s=e.owners=[a],c=!0,l=null,f=null;a.$on("hook:destroyed",function(){return h(s,a)});var p=function(e){for(var t=0,n=s.length;t<n;t++)s[t].$forceUpdate();e&&(s.length=0,null!==l&&(clearTimeout(l),l=null),null!==f&&(clearTimeout(f),f=null))},d=D(function(t){e.resolved=Bt(t,i),c?s.length=0:p(!0)}),v=D(function(t){n(e.errorComp)&&(e.error=!0,p(!0))}),m=e(d,v);return o(m)&&(u(m)?t(e.resolved)&&m.then(d,v):u(m.component)&&(m.component.then(d,v),n(m.error)&&(e.errorComp=Bt(m.error,i)),n(m.loading)&&(e.loadingComp=Bt(m.loading,i),0===m.delay?e.loading=!0:l=setTimeout(function(){l=null,t(e.resolved)&&t(e.error)&&(e.loading=!0,p(!1))},m.delay||200)),n(m.timeout)&&(f=setTimeout(function(){f=null,t(e.resolved)&&v(null)},m.timeout)))),c=!1,e.loading?e.loadingComp:e.resolved}}(p=i,f)))return function(e,t,n,r,i){var o=ve();return o.asyncFactory=e,o.asyncMeta={data:t,context:n,children:r,tag:i},o}(p,a,s,c,l);a=a||{},$n(i),n(a.model)&&function(e,t){var r=e.model&&e.model.prop||"value",i=e.model&&e.model.event||"input";(t.attrs||(t.attrs={}))[r]=t.model.value;var o=t.on||(t.on={}),a=o[i],s=t.model.callback;n(a)?(Array.isArray(a)?-1===a.indexOf(s):a!==s)&&(o[i]=[s].concat(a)):o[i]=s}(i.options,a);var d=function(e,r,i){var o=r.options.props;if(!t(o)){var a={},s=e.attrs,c=e.props;if(n(s)||n(c))for(var u in o){var l=C(u);ot(a,c,u,l,!0)||ot(a,s,u,l,!1)}return a}}(a,i);if(r(i.options.functional))return function(t,r,i,o,a){var s=t.options,c={},u=s.props;if(n(u))for(var l in u)c[l]=Me(l,u,r||e);else n(i.attrs)&&Nt(c,i.attrs),n(i.props)&&Nt(c,i.props);var f=new Tt(i,c,a,o,t),p=s.render.call(null,f._c,f);if(p instanceof pe)return Et(p,i,f.parent,s);if(Array.isArray(p)){for(var d=at(p)||[],v=new Array(d.length),h=0;h<d.length;h++)v[h]=Et(d[h],i,f.parent,s);return v}}(i,d,a,s,c);var v=a.on;if(a.on=a.nativeOn,r(i.options.abstract)){var m=a.slot;a={},m&&(a.slot=m)}!function(e){for(var t=e.hook||(e.hook={}),n=0;n<Dt.length;n++){var r=Dt[n],i=t[r],o=jt[r];i===o||i&&i._merged||(t[r]=i?Mt(o,i):o)}}(a);var y=i.options.name||l;return new pe("vue-component-"+i.cid+(y?"-"+y:""),a,void 0,void 0,void 0,s,{Ctor:i,propsData:d,listeners:v,tag:l,children:c},p)}}}function Mt(e,t){var n=function(n,r){e(n,r),t(n,r)};return n._merged=!0,n}var It=1,Ft=2;function Pt(e,a,s,c,u,l){return(Array.isArray(s)||i(s))&&(u=c,c=s,s=void 0),r(l)&&(u=Ft),function(e,i,a,s,c){if(n(a)&&n(a.__ob__))return ve();n(a)&&n(a.is)&&(i=a.is);if(!i)return ve();Array.isArray(s)&&"function"==typeof s[0]&&((a=a||{}).scopedSlots={default:s[0]},s.length=0);c===Ft?s=at(s):c===It&&(s=function(e){for(var t=0;t<e.length;t++)if(Array.isArray(e[t]))return Array.prototype.concat.apply([],e);return e}(s));var u,l;if("string"==typeof i){var f;l=e.$vnode&&e.$vnode.ns||F.getTagNamespace(i),u=F.isReservedTag(i)?new pe(F.parsePlatformTagName(i),a,s,void 0,void 0,e):a&&a.pre||!n(f=Le(e.$options,"components",i))?new pe(i,a,s,void 0,void 0,e):Lt(f,a,e,s,i)}else u=Lt(i,a,e,s);return Array.isArray(u)?u:n(u)?(n(l)&&function e(i,o,a){i.ns=o;"foreignObject"===i.tag&&(o=void 0,a=!0);if(n(i.children))for(var s=0,c=i.children.length;s<c;s++){var u=i.children[s];n(u.tag)&&(t(u.ns)||r(a)&&"svg"!==u.tag)&&e(u,o,a)}}(u,l),n(a)&&function(e){o(e.style)&&et(e.style);o(e.class)&&et(e.class)}(a),u):ve()}(e,a,s,c,u)}var Rt,Ht=null;function Bt(e,t){return(e.__esModule||oe&&"Module"===e[Symbol.toStringTag])&&(e=e.default),o(e)?t.extend(e):e}function Ut(e){return e.isComment&&e.asyncFactory}function zt(e){if(Array.isArray(e))for(var t=0;t<e.length;t++){var r=e[t];if(n(r)&&(n(r.componentOptions)||Ut(r)))return r}}function Vt(e,t){Rt.$on(e,t)}function Kt(e,t){Rt.$off(e,t)}function Jt(e,t){var n=Rt;return function r(){null!==t.apply(null,arguments)&&n.$off(e,r)}}function qt(e,t,n){Rt=e,rt(t,n||{},Vt,Kt,Jt,e),Rt=void 0}var Wt=null;function Zt(e){var t=Wt;return Wt=e,function(){Wt=t}}function Gt(e){for(;e&&(e=e.$parent);)if(e._inactive)return!0;return!1}function Xt(e,t){if(t){if(e._directInactive=!1,Gt(e))return}else if(e._directInactive)return;if(e._inactive||null===e._inactive){e._inactive=!1;for(var n=0;n<e.$children.length;n++)Xt(e.$children[n]);Yt(e,"activated")}}function Yt(e,t){le();var n=e.$options[t],r=t+" hook";if(n)for(var i=0,o=n.length;i<o;i++)He(n[i],e,null,e,r);e._hasHookEvent&&e.$emit("hook:"+t),fe()}var Qt=[],en=[],tn={},nn=!1,rn=!1,on=0;var an=0,sn=Date.now;if(z&&!q){var cn=window.performance;cn&&"function"==typeof cn.now&&sn()>document.createEvent("Event").timeStamp&&(sn=function(){return cn.now()})}function un(){var e,t;for(an=sn(),rn=!0,Qt.sort(function(e,t){return e.id-t.id}),on=0;on<Qt.length;on++)(e=Qt[on]).before&&e.before(),t=e.id,tn[t]=null,e.run();var n=en.slice(),r=Qt.slice();on=Qt.length=en.length=0,tn={},nn=rn=!1,function(e){for(var t=0;t<e.length;t++)e[t]._inactive=!0,Xt(e[t],!0)}(n),function(e){var t=e.length;for(;t--;){var n=e[t],r=n.vm;r._watcher===n&&r._isMounted&&!r._isDestroyed&&Yt(r,"updated")}}(r),ne&&F.devtools&&ne.emit("flush")}var ln=0,fn=function(e,t,n,r,i){this.vm=e,i&&(e._watcher=this),e._watchers.push(this),r?(this.deep=!!r.deep,this.user=!!r.user,this.lazy=!!r.lazy,this.sync=!!r.sync,this.before=r.before):this.deep=this.user=this.lazy=this.sync=!1,this.cb=n,this.id=++ln,this.active=!0,this.dirty=this.lazy,this.deps=[],this.newDeps=[],this.depIds=new ie,this.newDepIds=new ie,this.expression="","function"==typeof t?this.getter=t:(this.getter=function(e){if(!H.test(e)){var t=e.split(".");return function(e){for(var n=0;n<t.length;n++){if(!e)return;e=e[t[n]]}return e}}}(t),this.getter||(this.getter=S)),this.value=this.lazy?void 0:this.get()};fn.prototype.get=function(){var e;le(this);var t=this.vm;try{e=this.getter.call(t,t)}catch(e){if(!this.user)throw e;Re(e,t,'getter for watcher "'+this.expression+'"')}finally{this.deep&&et(e),fe(),this.cleanupDeps()}return e},fn.prototype.addDep=function(e){var t=e.id;this.newDepIds.has(t)||(this.newDepIds.add(t),this.newDeps.push(e),this.depIds.has(t)||e.addSub(this))},fn.prototype.cleanupDeps=function(){for(var e=this.deps.length;e--;){var t=this.deps[e];this.newDepIds.has(t.id)||t.removeSub(this)}var n=this.depIds;this.depIds=this.newDepIds,this.newDepIds=n,this.newDepIds.clear(),n=this.deps,this.deps=this.newDeps,this.newDeps=n,this.newDeps.length=0},fn.prototype.update=function(){this.lazy?this.dirty=!0:this.sync?this.run():function(e){var t=e.id;if(null==tn[t]){if(tn[t]=!0,rn){for(var n=Qt.length-1;n>on&&Qt[n].id>e.id;)n--;Qt.splice(n+1,0,e)}else Qt.push(e);nn||(nn=!0,Ye(un))}}(this)},fn.prototype.run=function(){if(this.active){var e=this.get();if(e!==this.value||o(e)||this.deep){var t=this.value;if(this.value=e,this.user)try{this.cb.call(this.vm,e,t)}catch(e){Re(e,this.vm,'callback for watcher "'+this.expression+'"')}else this.cb.call(this.vm,e,t)}}},fn.prototype.evaluate=function(){this.value=this.get(),this.dirty=!1},fn.prototype.depend=function(){for(var e=this.deps.length;e--;)this.deps[e].depend()},fn.prototype.teardown=function(){if(this.active){this.vm._isBeingDestroyed||h(this.vm._watchers,this);for(var e=this.deps.length;e--;)this.deps[e].removeSub(this);this.active=!1}};var pn={enumerable:!0,configurable:!0,get:S,set:S};function dn(e,t,n){pn.get=function(){return this[t][n]},pn.set=function(e){this[t][n]=e},Object.defineProperty(e,n,pn)}function vn(e){e._watchers=[];var t=e.$options;t.props&&function(e,t){var n=e.$options.propsData||{},r=e._props={},i=e.$options._propKeys=[];e.$parent&&$e(!1);var o=function(o){i.push(o);var a=Me(o,t,n,e);xe(r,o,a),o in e||dn(e,"_props",o)};for(var a in t)o(a);$e(!0)}(e,t.props),t.methods&&function(e,t){e.$options.props;for(var n in t)e[n]="function"!=typeof t[n]?S:x(t[n],e)}(e,t.methods),t.data?function(e){var t=e.$options.data;s(t=e._data="function"==typeof t?function(e,t){le();try{return e.call(t,t)}catch(e){return Re(e,t,"data()"),{}}finally{fe()}}(t,e):t||{})||(t={});var n=Object.keys(t),r=e.$options.props,i=(e.$options.methods,n.length);for(;i--;){var o=n[i];r&&y(r,o)||(a=void 0,36!==(a=(o+"").charCodeAt(0))&&95!==a&&dn(e,"_data",o))}var a;Ce(t,!0)}(e):Ce(e._data={},!0),t.computed&&function(e,t){var n=e._computedWatchers=Object.create(null),r=te();for(var i in t){var o=t[i],a="function"==typeof o?o:o.get;r||(n[i]=new fn(e,a||S,S,hn)),i in e||mn(e,i,o)}}(e,t.computed),t.watch&&t.watch!==Y&&function(e,t){for(var n in t){var r=t[n];if(Array.isArray(r))for(var i=0;i<r.length;i++)_n(e,n,r[i]);else _n(e,n,r)}}(e,t.watch)}var hn={lazy:!0};function mn(e,t,n){var r=!te();"function"==typeof n?(pn.get=r?yn(t):gn(n),pn.set=S):(pn.get=n.get?r&&!1!==n.cache?yn(t):gn(n.get):S,pn.set=n.set||S),Object.defineProperty(e,t,pn)}function yn(e){return function(){var t=this._computedWatchers&&this._computedWatchers[e];if(t)return t.dirty&&t.evaluate(),ce.target&&t.depend(),t.value}}function gn(e){return function(){return e.call(this,this)}}function _n(e,t,n,r){return s(n)&&(r=n,n=n.handler),"string"==typeof n&&(n=e[n]),e.$watch(t,n,r)}var bn=0;function $n(e){var t=e.options;if(e.super){var n=$n(e.super);if(n!==e.superOptions){e.superOptions=n;var r=function(e){var t,n=e.options,r=e.sealedOptions;for(var i in n)n[i]!==r[i]&&(t||(t={}),t[i]=n[i]);return t}(e);r&&A(e.extendOptions,r),(t=e.options=De(n,e.extendOptions)).name&&(t.components[t.name]=e)}}return t}function wn(e){this._init(e)}function Cn(e){e.cid=0;var t=1;e.extend=function(e){e=e||{};var n=this,r=n.cid,i=e._Ctor||(e._Ctor={});if(i[r])return i[r];var o=e.name||n.options.name,a=function(e){this._init(e)};return(a.prototype=Object.create(n.prototype)).constructor=a,a.cid=t++,a.options=De(n.options,e),a.super=n,a.options.props&&function(e){var t=e.options.props;for(var n in t)dn(e.prototype,"_props",n)}(a),a.options.computed&&function(e){var t=e.options.computed;for(var n in t)mn(e.prototype,n,t[n])}(a),a.extend=n.extend,a.mixin=n.mixin,a.use=n.use,M.forEach(function(e){a[e]=n[e]}),o&&(a.options.components[o]=a),a.superOptions=n.options,a.extendOptions=e,a.sealedOptions=A({},a.options),i[r]=a,a}}function xn(e){return e&&(e.Ctor.options.name||e.tag)}function kn(e,t){return Array.isArray(e)?e.indexOf(t)>-1:"string"==typeof e?e.split(",").indexOf(t)>-1:(n=e,"[object RegExp]"===a.call(n)&&e.test(t));var n}function An(e,t){var n=e.cache,r=e.keys,i=e._vnode;for(var o in n){var a=n[o];if(a){var s=xn(a.componentOptions);s&&!t(s)&&On(n,o,r,i)}}}function On(e,t,n,r){var i=e[t];!i||r&&i.tag===r.tag||i.componentInstance.$destroy(),e[t]=null,h(n,t)}!function(t){t.prototype._init=function(t){var n=this;n._uid=bn++,n._isVue=!0,t&&t._isComponent?function(e,t){var n=e.$options=Object.create(e.constructor.options),r=t._parentVnode;n.parent=t.parent,n._parentVnode=r;var i=r.componentOptions;n.propsData=i.propsData,n._parentListeners=i.listeners,n._renderChildren=i.children,n._componentTag=i.tag,t.render&&(n.render=t.render,n.staticRenderFns=t.staticRenderFns)}(n,t):n.$options=De($n(n.constructor),t||{},n),n._renderProxy=n,n._self=n,function(e){var t=e.$options,n=t.parent;if(n&&!t.abstract){for(;n.$options.abstract&&n.$parent;)n=n.$parent;n.$children.push(e)}e.$parent=n,e.$root=n?n.$root:e,e.$children=[],e.$refs={},e._watcher=null,e._inactive=null,e._directInactive=!1,e._isMounted=!1,e._isDestroyed=!1,e._isBeingDestroyed=!1}(n),function(e){e._events=Object.create(null),e._hasHookEvent=!1;var t=e.$options._parentListeners;t&&qt(e,t)}(n),function(t){t._vnode=null,t._staticTrees=null;var n=t.$options,r=t.$vnode=n._parentVnode,i=r&&r.context;t.$slots=ut(n._renderChildren,i),t.$scopedSlots=e,t._c=function(e,n,r,i){return Pt(t,e,n,r,i,!1)},t.$createElement=function(e,n,r,i){return Pt(t,e,n,r,i,!0)};var o=r&&r.data;xe(t,"$attrs",o&&o.attrs||e,null,!0),xe(t,"$listeners",n._parentListeners||e,null,!0)}(n),Yt(n,"beforeCreate"),function(e){var t=ct(e.$options.inject,e);t&&($e(!1),Object.keys(t).forEach(function(n){xe(e,n,t[n])}),$e(!0))}(n),vn(n),function(e){var t=e.$options.provide;t&&(e._provided="function"==typeof t?t.call(e):t)}(n),Yt(n,"created"),n.$options.el&&n.$mount(n.$options.el)}}(wn),function(e){var t={get:function(){return this._data}},n={get:function(){return this._props}};Object.defineProperty(e.prototype,"$data",t),Object.defineProperty(e.prototype,"$props",n),e.prototype.$set=ke,e.prototype.$delete=Ae,e.prototype.$watch=function(e,t,n){if(s(t))return _n(this,e,t,n);(n=n||{}).user=!0;var r=new fn(this,e,t,n);if(n.immediate)try{t.call(this,r.value)}catch(e){Re(e,this,'callback for immediate watcher "'+r.expression+'"')}return function(){r.teardown()}}}(wn),function(e){var t=/^hook:/;e.prototype.$on=function(e,n){var r=this;if(Array.isArray(e))for(var i=0,o=e.length;i<o;i++)r.$on(e[i],n);else(r._events[e]||(r._events[e]=[])).push(n),t.test(e)&&(r._hasHookEvent=!0);return r},e.prototype.$once=function(e,t){var n=this;function r(){n.$off(e,r),t.apply(n,arguments)}return r.fn=t,n.$on(e,r),n},e.prototype.$off=function(e,t){var n=this;if(!arguments.length)return n._events=Object.create(null),n;if(Array.isArray(e)){for(var r=0,i=e.length;r<i;r++)n.$off(e[r],t);return n}var o,a=n._events[e];if(!a)return n;if(!t)return n._events[e]=null,n;for(var s=a.length;s--;)if((o=a[s])===t||o.fn===t){a.splice(s,1);break}return n},e.prototype.$emit=function(e){var t=this._events[e];if(t){t=t.length>1?k(t):t;for(var n=k(arguments,1),r='event handler for "'+e+'"',i=0,o=t.length;i<o;i++)He(t[i],this,n,this,r)}return this}}(wn),function(e){e.prototype._update=function(e,t){var n=this,r=n.$el,i=n._vnode,o=Zt(n);n._vnode=e,n.$el=i?n.__patch__(i,e):n.__patch__(n.$el,e,t,!1),o(),r&&(r.__vue__=null),n.$el&&(n.$el.__vue__=n),n.$vnode&&n.$parent&&n.$vnode===n.$parent._vnode&&(n.$parent.$el=n.$el)},e.prototype.$forceUpdate=function(){this._watcher&&this._watcher.update()},e.prototype.$destroy=function(){var e=this;if(!e._isBeingDestroyed){Yt(e,"beforeDestroy"),e._isBeingDestroyed=!0;var t=e.$parent;!t||t._isBeingDestroyed||e.$options.abstract||h(t.$children,e),e._watcher&&e._watcher.teardown();for(var n=e._watchers.length;n--;)e._watchers[n].teardown();e._data.__ob__&&e._data.__ob__.vmCount--,e._isDestroyed=!0,e.__patch__(e._vnode,null),Yt(e,"destroyed"),e.$off(),e.$el&&(e.$el.__vue__=null),e.$vnode&&(e.$vnode.parent=null)}}}(wn),function(e){St(e.prototype),e.prototype.$nextTick=function(e){return Ye(e,this)},e.prototype._render=function(){var e,t=this,n=t.$options,r=n.render,i=n._parentVnode;i&&(t.$scopedSlots=ft(i.data.scopedSlots,t.$slots,t.$scopedSlots)),t.$vnode=i;try{Ht=t,e=r.call(t._renderProxy,t.$createElement)}catch(n){Re(n,t,"render"),e=t._vnode}finally{Ht=null}return Array.isArray(e)&&1===e.length&&(e=e[0]),e instanceof pe||(e=ve()),e.parent=i,e}}(wn);var Sn=[String,RegExp,Array],Tn={KeepAlive:{name:"keep-alive",abstract:!0,props:{include:Sn,exclude:Sn,max:[String,Number]},created:function(){this.cache=Object.create(null),this.keys=[]},destroyed:function(){for(var e in this.cache)On(this.cache,e,this.keys)},mounted:function(){var e=this;this.$watch("include",function(t){An(e,function(e){return kn(t,e)})}),this.$watch("exclude",function(t){An(e,function(e){return!kn(t,e)})})},render:function(){var e=this.$slots.default,t=zt(e),n=t&&t.componentOptions;if(n){var r=xn(n),i=this.include,o=this.exclude;if(i&&(!r||!kn(i,r))||o&&r&&kn(o,r))return t;var a=this.cache,s=this.keys,c=null==t.key?n.Ctor.cid+(n.tag?"::"+n.tag:""):t.key;a[c]?(t.componentInstance=a[c].componentInstance,h(s,c),s.push(c)):(a[c]=t,s.push(c),this.max&&s.length>parseInt(this.max)&&On(a,s[0],s,this._vnode)),t.data.keepAlive=!0}return t||e&&e[0]}}};!function(e){var t={get:function(){return F}};Object.defineProperty(e,"config",t),e.util={warn:ae,extend:A,mergeOptions:De,defineReactive:xe},e.set=ke,e.delete=Ae,e.nextTick=Ye,e.observable=function(e){return Ce(e),e},e.options=Object.create(null),M.forEach(function(t){e.options[t+"s"]=Object.create(null)}),e.options._base=e,A(e.options.components,Tn),function(e){e.use=function(e){var t=this._installedPlugins||(this._installedPlugins=[]);if(t.indexOf(e)>-1)return this;var n=k(arguments,1);return n.unshift(this),"function"==typeof e.install?e.install.apply(e,n):"function"==typeof e&&e.apply(null,n),t.push(e),this}}(e),function(e){e.mixin=function(e){return this.options=De(this.options,e),this}}(e),Cn(e),function(e){M.forEach(function(t){e[t]=function(e,n){return n?("component"===t&&s(n)&&(n.name=n.name||e,n=this.options._base.extend(n)),"directive"===t&&"function"==typeof n&&(n={bind:n,update:n}),this.options[t+"s"][e]=n,n):this.options[t+"s"][e]}})}(e)}(wn),Object.defineProperty(wn.prototype,"$isServer",{get:te}),Object.defineProperty(wn.prototype,"$ssrContext",{get:function(){return this.$vnode&&this.$vnode.ssrContext}}),Object.defineProperty(wn,"FunctionalRenderContext",{value:Tt}),wn.version="2.6.11";var En=p("style,class"),Nn=p("input,textarea,option,select,progress"),jn=function(e,t,n){return"value"===n&&Nn(e)&&"button"!==t||"selected"===n&&"option"===e||"checked"===n&&"input"===e||"muted"===n&&"video"===e},Dn=p("contenteditable,draggable,spellcheck"),Ln=p("events,caret,typing,plaintext-only"),Mn=function(e,t){return Hn(t)||"false"===t?"false":"contenteditable"===e&&Ln(t)?t:"true"},In=p("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,translate,truespeed,typemustmatch,visible"),Fn="http://www.w3.org/1999/xlink",Pn=function(e){return":"===e.charAt(5)&&"xlink"===e.slice(0,5)},Rn=function(e){return Pn(e)?e.slice(6,e.length):""},Hn=function(e){return null==e||!1===e};function Bn(e){for(var t=e.data,r=e,i=e;n(i.componentInstance);)(i=i.componentInstance._vnode)&&i.data&&(t=Un(i.data,t));for(;n(r=r.parent);)r&&r.data&&(t=Un(t,r.data));return function(e,t){if(n(e)||n(t))return zn(e,Vn(t));return""}(t.staticClass,t.class)}function Un(e,t){return{staticClass:zn(e.staticClass,t.staticClass),class:n(e.class)?[e.class,t.class]:t.class}}function zn(e,t){return e?t?e+" "+t:e:t||""}function Vn(e){return Array.isArray(e)?function(e){for(var t,r="",i=0,o=e.length;i<o;i++)n(t=Vn(e[i]))&&""!==t&&(r&&(r+=" "),r+=t);return r}(e):o(e)?function(e){var t="";for(var n in e)e[n]&&(t&&(t+=" "),t+=n);return t}(e):"string"==typeof e?e:""}var Kn={svg:"http://www.w3.org/2000/svg",math:"http://www.w3.org/1998/Math/MathML"},Jn=p("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot"),qn=p("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view",!0),Wn=function(e){return Jn(e)||qn(e)};function Zn(e){return qn(e)?"svg":"math"===e?"math":void 0}var Gn=Object.create(null);var Xn=p("text,number,password,search,email,tel,url");function Yn(e){if("string"==typeof e){var t=document.querySelector(e);return t||document.createElement("div")}return e}var Qn=Object.freeze({createElement:function(e,t){var n=document.createElement(e);return"select"!==e?n:(t.data&&t.data.attrs&&void 0!==t.data.attrs.multiple&&n.setAttribute("multiple","multiple"),n)},createElementNS:function(e,t){return document.createElementNS(Kn[e],t)},createTextNode:function(e){return document.createTextNode(e)},createComment:function(e){return document.createComment(e)},insertBefore:function(e,t,n){e.insertBefore(t,n)},removeChild:function(e,t){e.removeChild(t)},appendChild:function(e,t){e.appendChild(t)},parentNode:function(e){return e.parentNode},nextSibling:function(e){return e.nextSibling},tagName:function(e){return e.tagName},setTextContent:function(e,t){e.textContent=t},setStyleScope:function(e,t){e.setAttribute(t,"")}}),er={create:function(e,t){tr(t)},update:function(e,t){e.data.ref!==t.data.ref&&(tr(e,!0),tr(t))},destroy:function(e){tr(e,!0)}};function tr(e,t){var r=e.data.ref;if(n(r)){var i=e.context,o=e.componentInstance||e.elm,a=i.$refs;t?Array.isArray(a[r])?h(a[r],o):a[r]===o&&(a[r]=void 0):e.data.refInFor?Array.isArray(a[r])?a[r].indexOf(o)<0&&a[r].push(o):a[r]=[o]:a[r]=o}}var nr=new pe("",{},[]),rr=["create","activate","update","remove","destroy"];function ir(e,i){return e.key===i.key&&(e.tag===i.tag&&e.isComment===i.isComment&&n(e.data)===n(i.data)&&function(e,t){if("input"!==e.tag)return!0;var r,i=n(r=e.data)&&n(r=r.attrs)&&r.type,o=n(r=t.data)&&n(r=r.attrs)&&r.type;return i===o||Xn(i)&&Xn(o)}(e,i)||r(e.isAsyncPlaceholder)&&e.asyncFactory===i.asyncFactory&&t(i.asyncFactory.error))}function or(e,t,r){var i,o,a={};for(i=t;i<=r;++i)n(o=e[i].key)&&(a[o]=i);return a}var ar={create:sr,update:sr,destroy:function(e){sr(e,nr)}};function sr(e,t){(e.data.directives||t.data.directives)&&function(e,t){var n,r,i,o=e===nr,a=t===nr,s=ur(e.data.directives,e.context),c=ur(t.data.directives,t.context),u=[],l=[];for(n in c)r=s[n],i=c[n],r?(i.oldValue=r.value,i.oldArg=r.arg,fr(i,"update",t,e),i.def&&i.def.componentUpdated&&l.push(i)):(fr(i,"bind",t,e),i.def&&i.def.inserted&&u.push(i));if(u.length){var f=function(){for(var n=0;n<u.length;n++)fr(u[n],"inserted",t,e)};o?it(t,"insert",f):f()}l.length&&it(t,"postpatch",function(){for(var n=0;n<l.length;n++)fr(l[n],"componentUpdated",t,e)});if(!o)for(n in s)c[n]||fr(s[n],"unbind",e,e,a)}(e,t)}var cr=Object.create(null);function ur(e,t){var n,r,i=Object.create(null);if(!e)return i;for(n=0;n<e.length;n++)(r=e[n]).modifiers||(r.modifiers=cr),i[lr(r)]=r,r.def=Le(t.$options,"directives",r.name);return i}function lr(e){return e.rawName||e.name+"."+Object.keys(e.modifiers||{}).join(".")}function fr(e,t,n,r,i){var o=e.def&&e.def[t];if(o)try{o(n.elm,e,n,r,i)}catch(r){Re(r,n.context,"directive "+e.name+" "+t+" hook")}}var pr=[er,ar];function dr(e,r){var i=r.componentOptions;if(!(n(i)&&!1===i.Ctor.options.inheritAttrs||t(e.data.attrs)&&t(r.data.attrs))){var o,a,s=r.elm,c=e.data.attrs||{},u=r.data.attrs||{};for(o in n(u.__ob__)&&(u=r.data.attrs=A({},u)),u)a=u[o],c[o]!==a&&vr(s,o,a);for(o in(q||Z)&&u.value!==c.value&&vr(s,"value",u.value),c)t(u[o])&&(Pn(o)?s.removeAttributeNS(Fn,Rn(o)):Dn(o)||s.removeAttribute(o))}}function vr(e,t,n){e.tagName.indexOf("-")>-1?hr(e,t,n):In(t)?Hn(n)?e.removeAttribute(t):(n="allowfullscreen"===t&&"EMBED"===e.tagName?"true":t,e.setAttribute(t,n)):Dn(t)?e.setAttribute(t,Mn(t,n)):Pn(t)?Hn(n)?e.removeAttributeNS(Fn,Rn(t)):e.setAttributeNS(Fn,t,n):hr(e,t,n)}function hr(e,t,n){if(Hn(n))e.removeAttribute(t);else{if(q&&!W&&"TEXTAREA"===e.tagName&&"placeholder"===t&&""!==n&&!e.__ieph){var r=function(t){t.stopImmediatePropagation(),e.removeEventListener("input",r)};e.addEventListener("input",r),e.__ieph=!0}e.setAttribute(t,n)}}var mr={create:dr,update:dr};function yr(e,r){var i=r.elm,o=r.data,a=e.data;if(!(t(o.staticClass)&&t(o.class)&&(t(a)||t(a.staticClass)&&t(a.class)))){var s=Bn(r),c=i._transitionClasses;n(c)&&(s=zn(s,Vn(c))),s!==i._prevClass&&(i.setAttribute("class",s),i._prevClass=s)}}var gr,_r,br,$r,wr,Cr,xr={create:yr,update:yr},kr=/[\w).+\-_$\]]/;function Ar(e){var t,n,r,i,o,a=!1,s=!1,c=!1,u=!1,l=0,f=0,p=0,d=0;for(r=0;r<e.length;r++)if(n=t,t=e.charCodeAt(r),a)39===t&&92!==n&&(a=!1);else if(s)34===t&&92!==n&&(s=!1);else if(c)96===t&&92!==n&&(c=!1);else if(u)47===t&&92!==n&&(u=!1);else if(124!==t||124===e.charCodeAt(r+1)||124===e.charCodeAt(r-1)||l||f||p){switch(t){case 34:s=!0;break;case 39:a=!0;break;case 96:c=!0;break;case 40:p++;break;case 41:p--;break;case 91:f++;break;case 93:f--;break;case 123:l++;break;case 125:l--}if(47===t){for(var v=r-1,h=void 0;v>=0&&" "===(h=e.charAt(v));v--);h&&kr.test(h)||(u=!0)}}else void 0===i?(d=r+1,i=e.slice(0,r).trim()):m();function m(){(o||(o=[])).push(e.slice(d,r).trim()),d=r+1}if(void 0===i?i=e.slice(0,r).trim():0!==d&&m(),o)for(r=0;r<o.length;r++)i=Or(i,o[r]);return i}function Or(e,t){var n=t.indexOf("(");if(n<0)return'_f("'+t+'")('+e+")";var r=t.slice(0,n),i=t.slice(n+1);return'_f("'+r+'")('+e+(")"!==i?","+i:i)}function Sr(e,t){console.error("[Vue compiler]: "+e)}function Tr(e,t){return e?e.map(function(e){return e[t]}).filter(function(e){return e}):[]}function Er(e,t,n,r,i){(e.props||(e.props=[])).push(Rr({name:t,value:n,dynamic:i},r)),e.plain=!1}function Nr(e,t,n,r,i){(i?e.dynamicAttrs||(e.dynamicAttrs=[]):e.attrs||(e.attrs=[])).push(Rr({name:t,value:n,dynamic:i},r)),e.plain=!1}function jr(e,t,n,r){e.attrsMap[t]=n,e.attrsList.push(Rr({name:t,value:n},r))}function Dr(e,t,n,r,i,o,a,s){(e.directives||(e.directives=[])).push(Rr({name:t,rawName:n,value:r,arg:i,isDynamicArg:o,modifiers:a},s)),e.plain=!1}function Lr(e,t,n){return n?"_p("+t+',"'+e+'")':e+t}function Mr(t,n,r,i,o,a,s,c){var u;(i=i||e).right?c?n="("+n+")==='click'?'contextmenu':("+n+")":"click"===n&&(n="contextmenu",delete i.right):i.middle&&(c?n="("+n+")==='click'?'mouseup':("+n+")":"click"===n&&(n="mouseup")),i.capture&&(delete i.capture,n=Lr("!",n,c)),i.once&&(delete i.once,n=Lr("~",n,c)),i.passive&&(delete i.passive,n=Lr("&",n,c)),i.native?(delete i.native,u=t.nativeEvents||(t.nativeEvents={})):u=t.events||(t.events={});var l=Rr({value:r.trim(),dynamic:c},s);i!==e&&(l.modifiers=i);var f=u[n];Array.isArray(f)?o?f.unshift(l):f.push(l):u[n]=f?o?[l,f]:[f,l]:l,t.plain=!1}function Ir(e,t,n){var r=Fr(e,":"+t)||Fr(e,"v-bind:"+t);if(null!=r)return Ar(r);if(!1!==n){var i=Fr(e,t);if(null!=i)return JSON.stringify(i)}}function Fr(e,t,n){var r;if(null!=(r=e.attrsMap[t]))for(var i=e.attrsList,o=0,a=i.length;o<a;o++)if(i[o].name===t){i.splice(o,1);break}return n&&delete e.attrsMap[t],r}function Pr(e,t){for(var n=e.attrsList,r=0,i=n.length;r<i;r++){var o=n[r];if(t.test(o.name))return n.splice(r,1),o}}function Rr(e,t){return t&&(null!=t.start&&(e.start=t.start),null!=t.end&&(e.end=t.end)),e}function Hr(e,t,n){var r=n||{},i=r.number,o="$$v";r.trim&&(o="(typeof $$v === 'string'? $$v.trim(): $$v)"),i&&(o="_n("+o+")");var a=Br(t,o);e.model={value:"("+t+")",expression:JSON.stringify(t),callback:"function ($$v) {"+a+"}"}}function Br(e,t){var n=function(e){if(e=e.trim(),gr=e.length,e.indexOf("[")<0||e.lastIndexOf("]")<gr-1)return($r=e.lastIndexOf("."))>-1?{exp:e.slice(0,$r),key:'"'+e.slice($r+1)+'"'}:{exp:e,key:null};_r=e,$r=wr=Cr=0;for(;!zr();)Vr(br=Ur())?Jr(br):91===br&&Kr(br);return{exp:e.slice(0,wr),key:e.slice(wr+1,Cr)}}(e);return null===n.key?e+"="+t:"$set("+n.exp+", "+n.key+", "+t+")"}function Ur(){return _r.charCodeAt(++$r)}function zr(){return $r>=gr}function Vr(e){return 34===e||39===e}function Kr(e){var t=1;for(wr=$r;!zr();)if(Vr(e=Ur()))Jr(e);else if(91===e&&t++,93===e&&t--,0===t){Cr=$r;break}}function Jr(e){for(var t=e;!zr()&&(e=Ur())!==t;);}var qr,Wr="__r",Zr="__c";function Gr(e,t,n){var r=qr;return function i(){null!==t.apply(null,arguments)&&Qr(e,i,n,r)}}var Xr=Ve&&!(X&&Number(X[1])<=53);function Yr(e,t,n,r){if(Xr){var i=an,o=t;t=o._wrapper=function(e){if(e.target===e.currentTarget||e.timeStamp>=i||e.timeStamp<=0||e.target.ownerDocument!==document)return o.apply(this,arguments)}}qr.addEventListener(e,t,Q?{capture:n,passive:r}:n)}function Qr(e,t,n,r){(r||qr).removeEventListener(e,t._wrapper||t,n)}function ei(e,r){if(!t(e.data.on)||!t(r.data.on)){var i=r.data.on||{},o=e.data.on||{};qr=r.elm,function(e){if(n(e[Wr])){var t=q?"change":"input";e[t]=[].concat(e[Wr],e[t]||[]),delete e[Wr]}n(e[Zr])&&(e.change=[].concat(e[Zr],e.change||[]),delete e[Zr])}(i),rt(i,o,Yr,Qr,Gr,r.context),qr=void 0}}var ti,ni={create:ei,update:ei};function ri(e,r){if(!t(e.data.domProps)||!t(r.data.domProps)){var i,o,a=r.elm,s=e.data.domProps||{},c=r.data.domProps||{};for(i in n(c.__ob__)&&(c=r.data.domProps=A({},c)),s)i in c||(a[i]="");for(i in c){if(o=c[i],"textContent"===i||"innerHTML"===i){if(r.children&&(r.children.length=0),o===s[i])continue;1===a.childNodes.length&&a.removeChild(a.childNodes[0])}if("value"===i&&"PROGRESS"!==a.tagName){a._value=o;var u=t(o)?"":String(o);ii(a,u)&&(a.value=u)}else if("innerHTML"===i&&qn(a.tagName)&&t(a.innerHTML)){(ti=ti||document.createElement("div")).innerHTML="<svg>"+o+"</svg>";for(var l=ti.firstChild;a.firstChild;)a.removeChild(a.firstChild);for(;l.firstChild;)a.appendChild(l.firstChild)}else if(o!==s[i])try{a[i]=o}catch(e){}}}}function ii(e,t){return!e.composing&&("OPTION"===e.tagName||function(e,t){var n=!0;try{n=document.activeElement!==e}catch(e){}return n&&e.value!==t}(e,t)||function(e,t){var r=e.value,i=e._vModifiers;if(n(i)){if(i.number)return f(r)!==f(t);if(i.trim)return r.trim()!==t.trim()}return r!==t}(e,t))}var oi={create:ri,update:ri},ai=g(function(e){var t={},n=/:(.+)/;return e.split(/;(?![^(]*\))/g).forEach(function(e){if(e){var r=e.split(n);r.length>1&&(t[r[0].trim()]=r[1].trim())}}),t});function si(e){var t=ci(e.style);return e.staticStyle?A(e.staticStyle,t):t}function ci(e){return Array.isArray(e)?O(e):"string"==typeof e?ai(e):e}var ui,li=/^--/,fi=/\s*!important$/,pi=function(e,t,n){if(li.test(t))e.style.setProperty(t,n);else if(fi.test(n))e.style.setProperty(C(t),n.replace(fi,""),"important");else{var r=vi(t);if(Array.isArray(n))for(var i=0,o=n.length;i<o;i++)e.style[r]=n[i];else e.style[r]=n}},di=["Webkit","Moz","ms"],vi=g(function(e){if(ui=ui||document.createElement("div").style,"filter"!==(e=b(e))&&e in ui)return e;for(var t=e.charAt(0).toUpperCase()+e.slice(1),n=0;n<di.length;n++){var r=di[n]+t;if(r in ui)return r}});function hi(e,r){var i=r.data,o=e.data;if(!(t(i.staticStyle)&&t(i.style)&&t(o.staticStyle)&&t(o.style))){var a,s,c=r.elm,u=o.staticStyle,l=o.normalizedStyle||o.style||{},f=u||l,p=ci(r.data.style)||{};r.data.normalizedStyle=n(p.__ob__)?A({},p):p;var d=function(e,t){var n,r={};if(t)for(var i=e;i.componentInstance;)(i=i.componentInstance._vnode)&&i.data&&(n=si(i.data))&&A(r,n);(n=si(e.data))&&A(r,n);for(var o=e;o=o.parent;)o.data&&(n=si(o.data))&&A(r,n);return r}(r,!0);for(s in f)t(d[s])&&pi(c,s,"");for(s in d)(a=d[s])!==f[s]&&pi(c,s,null==a?"":a)}}var mi={create:hi,update:hi},yi=/\s+/;function gi(e,t){if(t&&(t=t.trim()))if(e.classList)t.indexOf(" ")>-1?t.split(yi).forEach(function(t){return e.classList.add(t)}):e.classList.add(t);else{var n=" "+(e.getAttribute("class")||"")+" ";n.indexOf(" "+t+" ")<0&&e.setAttribute("class",(n+t).trim())}}function _i(e,t){if(t&&(t=t.trim()))if(e.classList)t.indexOf(" ")>-1?t.split(yi).forEach(function(t){return e.classList.remove(t)}):e.classList.remove(t),e.classList.length||e.removeAttribute("class");else{for(var n=" "+(e.getAttribute("class")||"")+" ",r=" "+t+" ";n.indexOf(r)>=0;)n=n.replace(r," ");(n=n.trim())?e.setAttribute("class",n):e.removeAttribute("class")}}function bi(e){if(e){if("object"==typeof e){var t={};return!1!==e.css&&A(t,$i(e.name||"v")),A(t,e),t}return"string"==typeof e?$i(e):void 0}}var $i=g(function(e){return{enterClass:e+"-enter",enterToClass:e+"-enter-to",enterActiveClass:e+"-enter-active",leaveClass:e+"-leave",leaveToClass:e+"-leave-to",leaveActiveClass:e+"-leave-active"}}),wi=z&&!W,Ci="transition",xi="animation",ki="transition",Ai="transitionend",Oi="animation",Si="animationend";wi&&(void 0===window.ontransitionend&&void 0!==window.onwebkittransitionend&&(ki="WebkitTransition",Ai="webkitTransitionEnd"),void 0===window.onanimationend&&void 0!==window.onwebkitanimationend&&(Oi="WebkitAnimation",Si="webkitAnimationEnd"));var Ti=z?window.requestAnimationFrame?window.requestAnimationFrame.bind(window):setTimeout:function(e){return e()};function Ei(e){Ti(function(){Ti(e)})}function Ni(e,t){var n=e._transitionClasses||(e._transitionClasses=[]);n.indexOf(t)<0&&(n.push(t),gi(e,t))}function ji(e,t){e._transitionClasses&&h(e._transitionClasses,t),_i(e,t)}function Di(e,t,n){var r=Mi(e,t),i=r.type,o=r.timeout,a=r.propCount;if(!i)return n();var s=i===Ci?Ai:Si,c=0,u=function(){e.removeEventListener(s,l),n()},l=function(t){t.target===e&&++c>=a&&u()};setTimeout(function(){c<a&&u()},o+1),e.addEventListener(s,l)}var Li=/\b(transform|all)(,|$)/;function Mi(e,t){var n,r=window.getComputedStyle(e),i=(r[ki+"Delay"]||"").split(", "),o=(r[ki+"Duration"]||"").split(", "),a=Ii(i,o),s=(r[Oi+"Delay"]||"").split(", "),c=(r[Oi+"Duration"]||"").split(", "),u=Ii(s,c),l=0,f=0;return t===Ci?a>0&&(n=Ci,l=a,f=o.length):t===xi?u>0&&(n=xi,l=u,f=c.length):f=(n=(l=Math.max(a,u))>0?a>u?Ci:xi:null)?n===Ci?o.length:c.length:0,{type:n,timeout:l,propCount:f,hasTransform:n===Ci&&Li.test(r[ki+"Property"])}}function Ii(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max.apply(null,t.map(function(t,n){return Fi(t)+Fi(e[n])}))}function Fi(e){return 1e3*Number(e.slice(0,-1).replace(",","."))}function Pi(e,r){var i=e.elm;n(i._leaveCb)&&(i._leaveCb.cancelled=!0,i._leaveCb());var a=bi(e.data.transition);if(!t(a)&&!n(i._enterCb)&&1===i.nodeType){for(var s=a.css,c=a.type,u=a.enterClass,l=a.enterToClass,p=a.enterActiveClass,d=a.appearClass,v=a.appearToClass,h=a.appearActiveClass,m=a.beforeEnter,y=a.enter,g=a.afterEnter,_=a.enterCancelled,b=a.beforeAppear,$=a.appear,w=a.afterAppear,C=a.appearCancelled,x=a.duration,k=Wt,A=Wt.$vnode;A&&A.parent;)k=A.context,A=A.parent;var O=!k._isMounted||!e.isRootInsert;if(!O||$||""===$){var S=O&&d?d:u,T=O&&h?h:p,E=O&&v?v:l,N=O&&b||m,j=O&&"function"==typeof $?$:y,L=O&&w||g,M=O&&C||_,I=f(o(x)?x.enter:x),F=!1!==s&&!W,P=Bi(j),R=i._enterCb=D(function(){F&&(ji(i,E),ji(i,T)),R.cancelled?(F&&ji(i,S),M&&M(i)):L&&L(i),i._enterCb=null});e.data.show||it(e,"insert",function(){var t=i.parentNode,n=t&&t._pending&&t._pending[e.key];n&&n.tag===e.tag&&n.elm._leaveCb&&n.elm._leaveCb(),j&&j(i,R)}),N&&N(i),F&&(Ni(i,S),Ni(i,T),Ei(function(){ji(i,S),R.cancelled||(Ni(i,E),P||(Hi(I)?setTimeout(R,I):Di(i,c,R)))})),e.data.show&&(r&&r(),j&&j(i,R)),F||P||R()}}}function Ri(e,r){var i=e.elm;n(i._enterCb)&&(i._enterCb.cancelled=!0,i._enterCb());var a=bi(e.data.transition);if(t(a)||1!==i.nodeType)return r();if(!n(i._leaveCb)){var s=a.css,c=a.type,u=a.leaveClass,l=a.leaveToClass,p=a.leaveActiveClass,d=a.beforeLeave,v=a.leave,h=a.afterLeave,m=a.leaveCancelled,y=a.delayLeave,g=a.duration,_=!1!==s&&!W,b=Bi(v),$=f(o(g)?g.leave:g),w=i._leaveCb=D(function(){i.parentNode&&i.parentNode._pending&&(i.parentNode._pending[e.key]=null),_&&(ji(i,l),ji(i,p)),w.cancelled?(_&&ji(i,u),m&&m(i)):(r(),h&&h(i)),i._leaveCb=null});y?y(C):C()}function C(){w.cancelled||(!e.data.show&&i.parentNode&&((i.parentNode._pending||(i.parentNode._pending={}))[e.key]=e),d&&d(i),_&&(Ni(i,u),Ni(i,p),Ei(function(){ji(i,u),w.cancelled||(Ni(i,l),b||(Hi($)?setTimeout(w,$):Di(i,c,w)))})),v&&v(i,w),_||b||w())}}function Hi(e){return"number"==typeof e&&!isNaN(e)}function Bi(e){if(t(e))return!1;var r=e.fns;return n(r)?Bi(Array.isArray(r)?r[0]:r):(e._length||e.length)>1}function Ui(e,t){!0!==t.data.show&&Pi(t)}var zi=function(e){var o,a,s={},c=e.modules,u=e.nodeOps;for(o=0;o<rr.length;++o)for(s[rr[o]]=[],a=0;a<c.length;++a)n(c[a][rr[o]])&&s[rr[o]].push(c[a][rr[o]]);function l(e){var t=u.parentNode(e);n(t)&&u.removeChild(t,e)}function f(e,t,i,o,a,c,l){if(n(e.elm)&&n(c)&&(e=c[l]=me(e)),e.isRootInsert=!a,!function(e,t,i,o){var a=e.data;if(n(a)){var c=n(e.componentInstance)&&a.keepAlive;if(n(a=a.hook)&&n(a=a.init)&&a(e,!1),n(e.componentInstance))return d(e,t),v(i,e.elm,o),r(c)&&function(e,t,r,i){for(var o,a=e;a.componentInstance;)if(a=a.componentInstance._vnode,n(o=a.data)&&n(o=o.transition)){for(o=0;o<s.activate.length;++o)s.activate[o](nr,a);t.push(a);break}v(r,e.elm,i)}(e,t,i,o),!0}}(e,t,i,o)){var f=e.data,p=e.children,m=e.tag;n(m)?(e.elm=e.ns?u.createElementNS(e.ns,m):u.createElement(m,e),g(e),h(e,p,t),n(f)&&y(e,t),v(i,e.elm,o)):r(e.isComment)?(e.elm=u.createComment(e.text),v(i,e.elm,o)):(e.elm=u.createTextNode(e.text),v(i,e.elm,o))}}function d(e,t){n(e.data.pendingInsert)&&(t.push.apply(t,e.data.pendingInsert),e.data.pendingInsert=null),e.elm=e.componentInstance.$el,m(e)?(y(e,t),g(e)):(tr(e),t.push(e))}function v(e,t,r){n(e)&&(n(r)?u.parentNode(r)===e&&u.insertBefore(e,t,r):u.appendChild(e,t))}function h(e,t,n){if(Array.isArray(t))for(var r=0;r<t.length;++r)f(t[r],n,e.elm,null,!0,t,r);else i(e.text)&&u.appendChild(e.elm,u.createTextNode(String(e.text)))}function m(e){for(;e.componentInstance;)e=e.componentInstance._vnode;return n(e.tag)}function y(e,t){for(var r=0;r<s.create.length;++r)s.create[r](nr,e);n(o=e.data.hook)&&(n(o.create)&&o.create(nr,e),n(o.insert)&&t.push(e))}function g(e){var t;if(n(t=e.fnScopeId))u.setStyleScope(e.elm,t);else for(var r=e;r;)n(t=r.context)&&n(t=t.$options._scopeId)&&u.setStyleScope(e.elm,t),r=r.parent;n(t=Wt)&&t!==e.context&&t!==e.fnContext&&n(t=t.$options._scopeId)&&u.setStyleScope(e.elm,t)}function _(e,t,n,r,i,o){for(;r<=i;++r)f(n[r],o,e,t,!1,n,r)}function b(e){var t,r,i=e.data;if(n(i))for(n(t=i.hook)&&n(t=t.destroy)&&t(e),t=0;t<s.destroy.length;++t)s.destroy[t](e);if(n(t=e.children))for(r=0;r<e.children.length;++r)b(e.children[r])}function $(e,t,r){for(;t<=r;++t){var i=e[t];n(i)&&(n(i.tag)?(w(i),b(i)):l(i.elm))}}function w(e,t){if(n(t)||n(e.data)){var r,i=s.remove.length+1;for(n(t)?t.listeners+=i:t=function(e,t){function n(){0==--n.listeners&&l(e)}return n.listeners=t,n}(e.elm,i),n(r=e.componentInstance)&&n(r=r._vnode)&&n(r.data)&&w(r,t),r=0;r<s.remove.length;++r)s.remove[r](e,t);n(r=e.data.hook)&&n(r=r.remove)?r(e,t):t()}else l(e.elm)}function C(e,t,r,i){for(var o=r;o<i;o++){var a=t[o];if(n(a)&&ir(e,a))return o}}function x(e,i,o,a,c,l){if(e!==i){n(i.elm)&&n(a)&&(i=a[c]=me(i));var p=i.elm=e.elm;if(r(e.isAsyncPlaceholder))n(i.asyncFactory.resolved)?O(e.elm,i,o):i.isAsyncPlaceholder=!0;else if(r(i.isStatic)&&r(e.isStatic)&&i.key===e.key&&(r(i.isCloned)||r(i.isOnce)))i.componentInstance=e.componentInstance;else{var d,v=i.data;n(v)&&n(d=v.hook)&&n(d=d.prepatch)&&d(e,i);var h=e.children,y=i.children;if(n(v)&&m(i)){for(d=0;d<s.update.length;++d)s.update[d](e,i);n(d=v.hook)&&n(d=d.update)&&d(e,i)}t(i.text)?n(h)&&n(y)?h!==y&&function(e,r,i,o,a){for(var s,c,l,p=0,d=0,v=r.length-1,h=r[0],m=r[v],y=i.length-1,g=i[0],b=i[y],w=!a;p<=v&&d<=y;)t(h)?h=r[++p]:t(m)?m=r[--v]:ir(h,g)?(x(h,g,o,i,d),h=r[++p],g=i[++d]):ir(m,b)?(x(m,b,o,i,y),m=r[--v],b=i[--y]):ir(h,b)?(x(h,b,o,i,y),w&&u.insertBefore(e,h.elm,u.nextSibling(m.elm)),h=r[++p],b=i[--y]):ir(m,g)?(x(m,g,o,i,d),w&&u.insertBefore(e,m.elm,h.elm),m=r[--v],g=i[++d]):(t(s)&&(s=or(r,p,v)),t(c=n(g.key)?s[g.key]:C(g,r,p,v))?f(g,o,e,h.elm,!1,i,d):ir(l=r[c],g)?(x(l,g,o,i,d),r[c]=void 0,w&&u.insertBefore(e,l.elm,h.elm)):f(g,o,e,h.elm,!1,i,d),g=i[++d]);p>v?_(e,t(i[y+1])?null:i[y+1].elm,i,d,y,o):d>y&&$(r,p,v)}(p,h,y,o,l):n(y)?(n(e.text)&&u.setTextContent(p,""),_(p,null,y,0,y.length-1,o)):n(h)?$(h,0,h.length-1):n(e.text)&&u.setTextContent(p,""):e.text!==i.text&&u.setTextContent(p,i.text),n(v)&&n(d=v.hook)&&n(d=d.postpatch)&&d(e,i)}}}function k(e,t,i){if(r(i)&&n(e.parent))e.parent.data.pendingInsert=t;else for(var o=0;o<t.length;++o)t[o].data.hook.insert(t[o])}var A=p("attrs,class,staticClass,staticStyle,key");function O(e,t,i,o){var a,s=t.tag,c=t.data,u=t.children;if(o=o||c&&c.pre,t.elm=e,r(t.isComment)&&n(t.asyncFactory))return t.isAsyncPlaceholder=!0,!0;if(n(c)&&(n(a=c.hook)&&n(a=a.init)&&a(t,!0),n(a=t.componentInstance)))return d(t,i),!0;if(n(s)){if(n(u))if(e.hasChildNodes())if(n(a=c)&&n(a=a.domProps)&&n(a=a.innerHTML)){if(a!==e.innerHTML)return!1}else{for(var l=!0,f=e.firstChild,p=0;p<u.length;p++){if(!f||!O(f,u[p],i,o)){l=!1;break}f=f.nextSibling}if(!l||f)return!1}else h(t,u,i);if(n(c)){var v=!1;for(var m in c)if(!A(m)){v=!0,y(t,i);break}!v&&c.class&&et(c.class)}}else e.data!==t.text&&(e.data=t.text);return!0}return function(e,i,o,a){if(!t(i)){var c,l=!1,p=[];if(t(e))l=!0,f(i,p);else{var d=n(e.nodeType);if(!d&&ir(e,i))x(e,i,p,null,null,a);else{if(d){if(1===e.nodeType&&e.hasAttribute(L)&&(e.removeAttribute(L),o=!0),r(o)&&O(e,i,p))return k(i,p,!0),e;c=e,e=new pe(u.tagName(c).toLowerCase(),{},[],void 0,c)}var v=e.elm,h=u.parentNode(v);if(f(i,p,v._leaveCb?null:h,u.nextSibling(v)),n(i.parent))for(var y=i.parent,g=m(i);y;){for(var _=0;_<s.destroy.length;++_)s.destroy[_](y);if(y.elm=i.elm,g){for(var w=0;w<s.create.length;++w)s.create[w](nr,y);var C=y.data.hook.insert;if(C.merged)for(var A=1;A<C.fns.length;A++)C.fns[A]()}else tr(y);y=y.parent}n(h)?$([e],0,0):n(e.tag)&&b(e)}}return k(i,p,l),i.elm}n(e)&&b(e)}}({nodeOps:Qn,modules:[mr,xr,ni,oi,mi,z?{create:Ui,activate:Ui,remove:function(e,t){!0!==e.data.show?Ri(e,t):t()}}:{}].concat(pr)});W&&document.addEventListener("selectionchange",function(){var e=document.activeElement;e&&e.vmodel&&Xi(e,"input")});var Vi={inserted:function(e,t,n,r){"select"===n.tag?(r.elm&&!r.elm._vOptions?it(n,"postpatch",function(){Vi.componentUpdated(e,t,n)}):Ki(e,t,n.context),e._vOptions=[].map.call(e.options,Wi)):("textarea"===n.tag||Xn(e.type))&&(e._vModifiers=t.modifiers,t.modifiers.lazy||(e.addEventListener("compositionstart",Zi),e.addEventListener("compositionend",Gi),e.addEventListener("change",Gi),W&&(e.vmodel=!0)))},componentUpdated:function(e,t,n){if("select"===n.tag){Ki(e,t,n.context);var r=e._vOptions,i=e._vOptions=[].map.call(e.options,Wi);if(i.some(function(e,t){return!N(e,r[t])}))(e.multiple?t.value.some(function(e){return qi(e,i)}):t.value!==t.oldValue&&qi(t.value,i))&&Xi(e,"change")}}};function Ki(e,t,n){Ji(e,t,n),(q||Z)&&setTimeout(function(){Ji(e,t,n)},0)}function Ji(e,t,n){var r=t.value,i=e.multiple;if(!i||Array.isArray(r)){for(var o,a,s=0,c=e.options.length;s<c;s++)if(a=e.options[s],i)o=j(r,Wi(a))>-1,a.selected!==o&&(a.selected=o);else if(N(Wi(a),r))return void(e.selectedIndex!==s&&(e.selectedIndex=s));i||(e.selectedIndex=-1)}}function qi(e,t){return t.every(function(t){return!N(t,e)})}function Wi(e){return"_value"in e?e._value:e.value}function Zi(e){e.target.composing=!0}function Gi(e){e.target.composing&&(e.target.composing=!1,Xi(e.target,"input"))}function Xi(e,t){var n=document.createEvent("HTMLEvents");n.initEvent(t,!0,!0),e.dispatchEvent(n)}function Yi(e){return!e.componentInstance||e.data&&e.data.transition?e:Yi(e.componentInstance._vnode)}var Qi={model:Vi,show:{bind:function(e,t,n){var r=t.value,i=(n=Yi(n)).data&&n.data.transition,o=e.__vOriginalDisplay="none"===e.style.display?"":e.style.display;r&&i?(n.data.show=!0,Pi(n,function(){e.style.display=o})):e.style.display=r?o:"none"},update:function(e,t,n){var r=t.value;!r!=!t.oldValue&&((n=Yi(n)).data&&n.data.transition?(n.data.show=!0,r?Pi(n,function(){e.style.display=e.__vOriginalDisplay}):Ri(n,function(){e.style.display="none"})):e.style.display=r?e.__vOriginalDisplay:"none")},unbind:function(e,t,n,r,i){i||(e.style.display=e.__vOriginalDisplay)}}},eo={name:String,appear:Boolean,css:Boolean,mode:String,type:String,enterClass:String,leaveClass:String,enterToClass:String,leaveToClass:String,enterActiveClass:String,leaveActiveClass:String,appearClass:String,appearActiveClass:String,appearToClass:String,duration:[Number,String,Object]};function to(e){var t=e&&e.componentOptions;return t&&t.Ctor.options.abstract?to(zt(t.children)):e}function no(e){var t={},n=e.$options;for(var r in n.propsData)t[r]=e[r];var i=n._parentListeners;for(var o in i)t[b(o)]=i[o];return t}function ro(e,t){if(/\d-keep-alive$/.test(t.tag))return e("keep-alive",{props:t.componentOptions.propsData})}var io=function(e){return e.tag||Ut(e)},oo=function(e){return"show"===e.name},ao={name:"transition",props:eo,abstract:!0,render:function(e){var t=this,n=this.$slots.default;if(n&&(n=n.filter(io)).length){var r=this.mode,o=n[0];if(function(e){for(;e=e.parent;)if(e.data.transition)return!0}(this.$vnode))return o;var a=to(o);if(!a)return o;if(this._leaving)return ro(e,o);var s="__transition-"+this._uid+"-";a.key=null==a.key?a.isComment?s+"comment":s+a.tag:i(a.key)?0===String(a.key).indexOf(s)?a.key:s+a.key:a.key;var c=(a.data||(a.data={})).transition=no(this),u=this._vnode,l=to(u);if(a.data.directives&&a.data.directives.some(oo)&&(a.data.show=!0),l&&l.data&&!function(e,t){return t.key===e.key&&t.tag===e.tag}(a,l)&&!Ut(l)&&(!l.componentInstance||!l.componentInstance._vnode.isComment)){var f=l.data.transition=A({},c);if("out-in"===r)return this._leaving=!0,it(f,"afterLeave",function(){t._leaving=!1,t.$forceUpdate()}),ro(e,o);if("in-out"===r){if(Ut(a))return u;var p,d=function(){p()};it(c,"afterEnter",d),it(c,"enterCancelled",d),it(f,"delayLeave",function(e){p=e})}}return o}}},so=A({tag:String,moveClass:String},eo);function co(e){e.elm._moveCb&&e.elm._moveCb(),e.elm._enterCb&&e.elm._enterCb()}function uo(e){e.data.newPos=e.elm.getBoundingClientRect()}function lo(e){var t=e.data.pos,n=e.data.newPos,r=t.left-n.left,i=t.top-n.top;if(r||i){e.data.moved=!0;var o=e.elm.style;o.transform=o.WebkitTransform="translate("+r+"px,"+i+"px)",o.transitionDuration="0s"}}delete so.mode;var fo={Transition:ao,TransitionGroup:{props:so,beforeMount:function(){var e=this,t=this._update;this._update=function(n,r){var i=Zt(e);e.__patch__(e._vnode,e.kept,!1,!0),e._vnode=e.kept,i(),t.call(e,n,r)}},render:function(e){for(var t=this.tag||this.$vnode.data.tag||"span",n=Object.create(null),r=this.prevChildren=this.children,i=this.$slots.default||[],o=this.children=[],a=no(this),s=0;s<i.length;s++){var c=i[s];c.tag&&null!=c.key&&0!==String(c.key).indexOf("__vlist")&&(o.push(c),n[c.key]=c,(c.data||(c.data={})).transition=a)}if(r){for(var u=[],l=[],f=0;f<r.length;f++){var p=r[f];p.data.transition=a,p.data.pos=p.elm.getBoundingClientRect(),n[p.key]?u.push(p):l.push(p)}this.kept=e(t,null,u),this.removed=l}return e(t,null,o)},updated:function(){var e=this.prevChildren,t=this.moveClass||(this.name||"v")+"-move";e.length&&this.hasMove(e[0].elm,t)&&(e.forEach(co),e.forEach(uo),e.forEach(lo),this._reflow=document.body.offsetHeight,e.forEach(function(e){if(e.data.moved){var n=e.elm,r=n.style;Ni(n,t),r.transform=r.WebkitTransform=r.transitionDuration="",n.addEventListener(Ai,n._moveCb=function e(r){r&&r.target!==n||r&&!/transform$/.test(r.propertyName)||(n.removeEventListener(Ai,e),n._moveCb=null,ji(n,t))})}}))},methods:{hasMove:function(e,t){if(!wi)return!1;if(this._hasMove)return this._hasMove;var n=e.cloneNode();e._transitionClasses&&e._transitionClasses.forEach(function(e){_i(n,e)}),gi(n,t),n.style.display="none",this.$el.appendChild(n);var r=Mi(n);return this.$el.removeChild(n),this._hasMove=r.hasTransform}}}};wn.config.mustUseProp=jn,wn.config.isReservedTag=Wn,wn.config.isReservedAttr=En,wn.config.getTagNamespace=Zn,wn.config.isUnknownElement=function(e){if(!z)return!0;if(Wn(e))return!1;if(e=e.toLowerCase(),null!=Gn[e])return Gn[e];var t=document.createElement(e);return e.indexOf("-")>-1?Gn[e]=t.constructor===window.HTMLUnknownElement||t.constructor===window.HTMLElement:Gn[e]=/HTMLUnknownElement/.test(t.toString())},A(wn.options.directives,Qi),A(wn.options.components,fo),wn.prototype.__patch__=z?zi:S,wn.prototype.$mount=function(e,t){return function(e,t,n){var r;return e.$el=t,e.$options.render||(e.$options.render=ve),Yt(e,"beforeMount"),r=function(){e._update(e._render(),n)},new fn(e,r,S,{before:function(){e._isMounted&&!e._isDestroyed&&Yt(e,"beforeUpdate")}},!0),n=!1,null==e.$vnode&&(e._isMounted=!0,Yt(e,"mounted")),e}(this,e=e&&z?Yn(e):void 0,t)},z&&setTimeout(function(){F.devtools&&ne&&ne.emit("init",wn)},0);var po=/\{\{((?:.|\r?\n)+?)\}\}/g,vo=/[-.*+?^${}()|[\]\/\\]/g,ho=g(function(e){var t=e[0].replace(vo,"\\$&"),n=e[1].replace(vo,"\\$&");return new RegExp(t+"((?:.|\\n)+?)"+n,"g")});var mo={staticKeys:["staticClass"],transformNode:function(e,t){t.warn;var n=Fr(e,"class");n&&(e.staticClass=JSON.stringify(n));var r=Ir(e,"class",!1);r&&(e.classBinding=r)},genData:function(e){var t="";return e.staticClass&&(t+="staticClass:"+e.staticClass+","),e.classBinding&&(t+="class:"+e.classBinding+","),t}};var yo,go={staticKeys:["staticStyle"],transformNode:function(e,t){t.warn;var n=Fr(e,"style");n&&(e.staticStyle=JSON.stringify(ai(n)));var r=Ir(e,"style",!1);r&&(e.styleBinding=r)},genData:function(e){var t="";return e.staticStyle&&(t+="staticStyle:"+e.staticStyle+","),e.styleBinding&&(t+="style:("+e.styleBinding+"),"),t}},_o=function(e){return(yo=yo||document.createElement("div")).innerHTML=e,yo.textContent},bo=p("area,base,br,col,embed,frame,hr,img,input,isindex,keygen,link,meta,param,source,track,wbr"),$o=p("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source"),wo=p("address,article,aside,base,blockquote,body,caption,col,colgroup,dd,details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,title,tr,track"),Co=/^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/,xo=/^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/,ko="[a-zA-Z_][\\-\\.0-9_a-zA-Z"+P.source+"]*",Ao="((?:"+ko+"\\:)?"+ko+")",Oo=new RegExp("^<"+Ao),So=/^\s*(\/?)>/,To=new RegExp("^<\\/"+Ao+"[^>]*>"),Eo=/^<!DOCTYPE [^>]+>/i,No=/^<!\--/,jo=/^<!\[/,Do=p("script,style,textarea",!0),Lo={},Mo={"&lt;":"<","&gt;":">","&quot;":'"',"&amp;":"&","&#10;":"\n","&#9;":"\t","&#39;":"'"},Io=/&(?:lt|gt|quot|amp|#39);/g,Fo=/&(?:lt|gt|quot|amp|#39|#10|#9);/g,Po=p("pre,textarea",!0),Ro=function(e,t){return e&&Po(e)&&"\n"===t[0]};function Ho(e,t){var n=t?Fo:Io;return e.replace(n,function(e){return Mo[e]})}var Bo,Uo,zo,Vo,Ko,Jo,qo,Wo,Zo=/^@|^v-on:/,Go=/^v-|^@|^:|^#/,Xo=/([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,Yo=/,([^,\}\]]*)(?:,([^,\}\]]*))?$/,Qo=/^\(|\)$/g,ea=/^\[.*\]$/,ta=/:(.*)$/,na=/^:|^\.|^v-bind:/,ra=/\.[^.\]]+(?=[^\]]*$)/g,ia=/^v-slot(:|$)|^#/,oa=/[\r\n]/,aa=/\s+/g,sa=g(_o),ca="_empty_";function ua(e,t,n){return{type:1,tag:e,attrsList:t,attrsMap:ma(t),rawAttrsMap:{},parent:n,children:[]}}function la(e,t){Bo=t.warn||Sr,Jo=t.isPreTag||T,qo=t.mustUseProp||T,Wo=t.getTagNamespace||T;t.isReservedTag;zo=Tr(t.modules,"transformNode"),Vo=Tr(t.modules,"preTransformNode"),Ko=Tr(t.modules,"postTransformNode"),Uo=t.delimiters;var n,r,i=[],o=!1!==t.preserveWhitespace,a=t.whitespace,s=!1,c=!1;function u(e){if(l(e),s||e.processed||(e=fa(e,t)),i.length||e===n||n.if&&(e.elseif||e.else)&&da(n,{exp:e.elseif,block:e}),r&&!e.forbidden)if(e.elseif||e.else)a=e,(u=function(e){var t=e.length;for(;t--;){if(1===e[t].type)return e[t];e.pop()}}(r.children))&&u.if&&da(u,{exp:a.elseif,block:a});else{if(e.slotScope){var o=e.slotTarget||'"default"';(r.scopedSlots||(r.scopedSlots={}))[o]=e}r.children.push(e),e.parent=r}var a,u;e.children=e.children.filter(function(e){return!e.slotScope}),l(e),e.pre&&(s=!1),Jo(e.tag)&&(c=!1);for(var f=0;f<Ko.length;f++)Ko[f](e,t)}function l(e){if(!c)for(var t;(t=e.children[e.children.length-1])&&3===t.type&&" "===t.text;)e.children.pop()}return function(e,t){for(var n,r,i=[],o=t.expectHTML,a=t.isUnaryTag||T,s=t.canBeLeftOpenTag||T,c=0;e;){if(n=e,r&&Do(r)){var u=0,l=r.toLowerCase(),f=Lo[l]||(Lo[l]=new RegExp("([\\s\\S]*?)(</"+l+"[^>]*>)","i")),p=e.replace(f,function(e,n,r){return u=r.length,Do(l)||"noscript"===l||(n=n.replace(/<!\--([\s\S]*?)-->/g,"$1").replace(/<!\[CDATA\[([\s\S]*?)]]>/g,"$1")),Ro(l,n)&&(n=n.slice(1)),t.chars&&t.chars(n),""});c+=e.length-p.length,e=p,A(l,c-u,c)}else{var d=e.indexOf("<");if(0===d){if(No.test(e)){var v=e.indexOf("--\x3e");if(v>=0){t.shouldKeepComment&&t.comment(e.substring(4,v),c,c+v+3),C(v+3);continue}}if(jo.test(e)){var h=e.indexOf("]>");if(h>=0){C(h+2);continue}}var m=e.match(Eo);if(m){C(m[0].length);continue}var y=e.match(To);if(y){var g=c;C(y[0].length),A(y[1],g,c);continue}var _=x();if(_){k(_),Ro(_.tagName,e)&&C(1);continue}}var b=void 0,$=void 0,w=void 0;if(d>=0){for($=e.slice(d);!(To.test($)||Oo.test($)||No.test($)||jo.test($)||(w=$.indexOf("<",1))<0);)d+=w,$=e.slice(d);b=e.substring(0,d)}d<0&&(b=e),b&&C(b.length),t.chars&&b&&t.chars(b,c-b.length,c)}if(e===n){t.chars&&t.chars(e);break}}function C(t){c+=t,e=e.substring(t)}function x(){var t=e.match(Oo);if(t){var n,r,i={tagName:t[1],attrs:[],start:c};for(C(t[0].length);!(n=e.match(So))&&(r=e.match(xo)||e.match(Co));)r.start=c,C(r[0].length),r.end=c,i.attrs.push(r);if(n)return i.unarySlash=n[1],C(n[0].length),i.end=c,i}}function k(e){var n=e.tagName,c=e.unarySlash;o&&("p"===r&&wo(n)&&A(r),s(n)&&r===n&&A(n));for(var u=a(n)||!!c,l=e.attrs.length,f=new Array(l),p=0;p<l;p++){var d=e.attrs[p],v=d[3]||d[4]||d[5]||"",h="a"===n&&"href"===d[1]?t.shouldDecodeNewlinesForHref:t.shouldDecodeNewlines;f[p]={name:d[1],value:Ho(v,h)}}u||(i.push({tag:n,lowerCasedTag:n.toLowerCase(),attrs:f,start:e.start,end:e.end}),r=n),t.start&&t.start(n,f,u,e.start,e.end)}function A(e,n,o){var a,s;if(null==n&&(n=c),null==o&&(o=c),e)for(s=e.toLowerCase(),a=i.length-1;a>=0&&i[a].lowerCasedTag!==s;a--);else a=0;if(a>=0){for(var u=i.length-1;u>=a;u--)t.end&&t.end(i[u].tag,n,o);i.length=a,r=a&&i[a-1].tag}else"br"===s?t.start&&t.start(e,[],!0,n,o):"p"===s&&(t.start&&t.start(e,[],!1,n,o),t.end&&t.end(e,n,o))}A()}(e,{warn:Bo,expectHTML:t.expectHTML,isUnaryTag:t.isUnaryTag,canBeLeftOpenTag:t.canBeLeftOpenTag,shouldDecodeNewlines:t.shouldDecodeNewlines,shouldDecodeNewlinesForHref:t.shouldDecodeNewlinesForHref,shouldKeepComment:t.comments,outputSourceRange:t.outputSourceRange,start:function(e,o,a,l,f){var p=r&&r.ns||Wo(e);q&&"svg"===p&&(o=function(e){for(var t=[],n=0;n<e.length;n++){var r=e[n];ya.test(r.name)||(r.name=r.name.replace(ga,""),t.push(r))}return t}(o));var d,v=ua(e,o,r);p&&(v.ns=p),"style"!==(d=v).tag&&("script"!==d.tag||d.attrsMap.type&&"text/javascript"!==d.attrsMap.type)||te()||(v.forbidden=!0);for(var h=0;h<Vo.length;h++)v=Vo[h](v,t)||v;s||(!function(e){null!=Fr(e,"v-pre")&&(e.pre=!0)}(v),v.pre&&(s=!0)),Jo(v.tag)&&(c=!0),s?function(e){var t=e.attrsList,n=t.length;if(n)for(var r=e.attrs=new Array(n),i=0;i<n;i++)r[i]={name:t[i].name,value:JSON.stringify(t[i].value)},null!=t[i].start&&(r[i].start=t[i].start,r[i].end=t[i].end);else e.pre||(e.plain=!0)}(v):v.processed||(pa(v),function(e){var t=Fr(e,"v-if");if(t)e.if=t,da(e,{exp:t,block:e});else{null!=Fr(e,"v-else")&&(e.else=!0);var n=Fr(e,"v-else-if");n&&(e.elseif=n)}}(v),function(e){null!=Fr(e,"v-once")&&(e.once=!0)}(v)),n||(n=v),a?u(v):(r=v,i.push(v))},end:function(e,t,n){var o=i[i.length-1];i.length-=1,r=i[i.length-1],u(o)},chars:function(e,t,n){if(r&&(!q||"textarea"!==r.tag||r.attrsMap.placeholder!==e)){var i,u,l,f=r.children;if(e=c||e.trim()?"script"===(i=r).tag||"style"===i.tag?e:sa(e):f.length?a?"condense"===a&&oa.test(e)?"":" ":o?" ":"":"")c||"condense"!==a||(e=e.replace(aa," ")),!s&&" "!==e&&(u=function(e,t){var n=t?ho(t):po;if(n.test(e)){for(var r,i,o,a=[],s=[],c=n.lastIndex=0;r=n.exec(e);){(i=r.index)>c&&(s.push(o=e.slice(c,i)),a.push(JSON.stringify(o)));var u=Ar(r[1].trim());a.push("_s("+u+")"),s.push({"@binding":u}),c=i+r[0].length}return c<e.length&&(s.push(o=e.slice(c)),a.push(JSON.stringify(o))),{expression:a.join("+"),tokens:s}}}(e,Uo))?l={type:2,expression:u.expression,tokens:u.tokens,text:e}:" "===e&&f.length&&" "===f[f.length-1].text||(l={type:3,text:e}),l&&f.push(l)}},comment:function(e,t,n){if(r){var i={type:3,text:e,isComment:!0};r.children.push(i)}}}),n}function fa(e,t){var n,r;(r=Ir(n=e,"key"))&&(n.key=r),e.plain=!e.key&&!e.scopedSlots&&!e.attrsList.length,function(e){var t=Ir(e,"ref");t&&(e.ref=t,e.refInFor=function(e){var t=e;for(;t;){if(void 0!==t.for)return!0;t=t.parent}return!1}(e))}(e),function(e){var t;"template"===e.tag?(t=Fr(e,"scope"),e.slotScope=t||Fr(e,"slot-scope")):(t=Fr(e,"slot-scope"))&&(e.slotScope=t);var n=Ir(e,"slot");n&&(e.slotTarget='""'===n?'"default"':n,e.slotTargetDynamic=!(!e.attrsMap[":slot"]&&!e.attrsMap["v-bind:slot"]),"template"===e.tag||e.slotScope||Nr(e,"slot",n,function(e,t){return e.rawAttrsMap[":"+t]||e.rawAttrsMap["v-bind:"+t]||e.rawAttrsMap[t]}(e,"slot")));if("template"===e.tag){var r=Pr(e,ia);if(r){var i=va(r),o=i.name,a=i.dynamic;e.slotTarget=o,e.slotTargetDynamic=a,e.slotScope=r.value||ca}}else{var s=Pr(e,ia);if(s){var c=e.scopedSlots||(e.scopedSlots={}),u=va(s),l=u.name,f=u.dynamic,p=c[l]=ua("template",[],e);p.slotTarget=l,p.slotTargetDynamic=f,p.children=e.children.filter(function(e){if(!e.slotScope)return e.parent=p,!0}),p.slotScope=s.value||ca,e.children=[],e.plain=!1}}}(e),function(e){"slot"===e.tag&&(e.slotName=Ir(e,"name"))}(e),function(e){var t;(t=Ir(e,"is"))&&(e.component=t);null!=Fr(e,"inline-template")&&(e.inlineTemplate=!0)}(e);for(var i=0;i<zo.length;i++)e=zo[i](e,t)||e;return function(e){var t,n,r,i,o,a,s,c,u=e.attrsList;for(t=0,n=u.length;t<n;t++)if(r=i=u[t].name,o=u[t].value,Go.test(r))if(e.hasBindings=!0,(a=ha(r.replace(Go,"")))&&(r=r.replace(ra,"")),na.test(r))r=r.replace(na,""),o=Ar(o),(c=ea.test(r))&&(r=r.slice(1,-1)),a&&(a.prop&&!c&&"innerHtml"===(r=b(r))&&(r="innerHTML"),a.camel&&!c&&(r=b(r)),a.sync&&(s=Br(o,"$event"),c?Mr(e,'"update:"+('+r+")",s,null,!1,0,u[t],!0):(Mr(e,"update:"+b(r),s,null,!1,0,u[t]),C(r)!==b(r)&&Mr(e,"update:"+C(r),s,null,!1,0,u[t])))),a&&a.prop||!e.component&&qo(e.tag,e.attrsMap.type,r)?Er(e,r,o,u[t],c):Nr(e,r,o,u[t],c);else if(Zo.test(r))r=r.replace(Zo,""),(c=ea.test(r))&&(r=r.slice(1,-1)),Mr(e,r,o,a,!1,0,u[t],c);else{var l=(r=r.replace(Go,"")).match(ta),f=l&&l[1];c=!1,f&&(r=r.slice(0,-(f.length+1)),ea.test(f)&&(f=f.slice(1,-1),c=!0)),Dr(e,r,i,o,f,c,a,u[t])}else Nr(e,r,JSON.stringify(o),u[t]),!e.component&&"muted"===r&&qo(e.tag,e.attrsMap.type,r)&&Er(e,r,"true",u[t])}(e),e}function pa(e){var t;if(t=Fr(e,"v-for")){var n=function(e){var t=e.match(Xo);if(!t)return;var n={};n.for=t[2].trim();var r=t[1].trim().replace(Qo,""),i=r.match(Yo);i?(n.alias=r.replace(Yo,"").trim(),n.iterator1=i[1].trim(),i[2]&&(n.iterator2=i[2].trim())):n.alias=r;return n}(t);n&&A(e,n)}}function da(e,t){e.ifConditions||(e.ifConditions=[]),e.ifConditions.push(t)}function va(e){var t=e.name.replace(ia,"");return t||"#"!==e.name[0]&&(t="default"),ea.test(t)?{name:t.slice(1,-1),dynamic:!0}:{name:'"'+t+'"',dynamic:!1}}function ha(e){var t=e.match(ra);if(t){var n={};return t.forEach(function(e){n[e.slice(1)]=!0}),n}}function ma(e){for(var t={},n=0,r=e.length;n<r;n++)t[e[n].name]=e[n].value;return t}var ya=/^xmlns:NS\d+/,ga=/^NS\d+:/;function _a(e){return ua(e.tag,e.attrsList.slice(),e.parent)}var ba=[mo,go,{preTransformNode:function(e,t){if("input"===e.tag){var n,r=e.attrsMap;if(!r["v-model"])return;if((r[":type"]||r["v-bind:type"])&&(n=Ir(e,"type")),r.type||n||!r["v-bind"]||(n="("+r["v-bind"]+").type"),n){var i=Fr(e,"v-if",!0),o=i?"&&("+i+")":"",a=null!=Fr(e,"v-else",!0),s=Fr(e,"v-else-if",!0),c=_a(e);pa(c),jr(c,"type","checkbox"),fa(c,t),c.processed=!0,c.if="("+n+")==='checkbox'"+o,da(c,{exp:c.if,block:c});var u=_a(e);Fr(u,"v-for",!0),jr(u,"type","radio"),fa(u,t),da(c,{exp:"("+n+")==='radio'"+o,block:u});var l=_a(e);return Fr(l,"v-for",!0),jr(l,":type",n),fa(l,t),da(c,{exp:i,block:l}),a?c.else=!0:s&&(c.elseif=s),c}}}}];var $a,wa,Ca={expectHTML:!0,modules:ba,directives:{model:function(e,t,n){var r=t.value,i=t.modifiers,o=e.tag,a=e.attrsMap.type;if(e.component)return Hr(e,r,i),!1;if("select"===o)!function(e,t,n){var r='var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return '+(n&&n.number?"_n(val)":"val")+"});";r=r+" "+Br(t,"$event.target.multiple ? $$selectedVal : $$selectedVal[0]"),Mr(e,"change",r,null,!0)}(e,r,i);else if("input"===o&&"checkbox"===a)!function(e,t,n){var r=n&&n.number,i=Ir(e,"value")||"null",o=Ir(e,"true-value")||"true",a=Ir(e,"false-value")||"false";Er(e,"checked","Array.isArray("+t+")?_i("+t+","+i+")>-1"+("true"===o?":("+t+")":":_q("+t+","+o+")")),Mr(e,"change","var $$a="+t+",$$el=$event.target,$$c=$$el.checked?("+o+"):("+a+");if(Array.isArray($$a)){var $$v="+(r?"_n("+i+")":i)+",$$i=_i($$a,$$v);if($$el.checked){$$i<0&&("+Br(t,"$$a.concat([$$v])")+")}else{$$i>-1&&("+Br(t,"$$a.slice(0,$$i).concat($$a.slice($$i+1))")+")}}else{"+Br(t,"$$c")+"}",null,!0)}(e,r,i);else if("input"===o&&"radio"===a)!function(e,t,n){var r=n&&n.number,i=Ir(e,"value")||"null";Er(e,"checked","_q("+t+","+(i=r?"_n("+i+")":i)+")"),Mr(e,"change",Br(t,i),null,!0)}(e,r,i);else if("input"===o||"textarea"===o)!function(e,t,n){var r=e.attrsMap.type,i=n||{},o=i.lazy,a=i.number,s=i.trim,c=!o&&"range"!==r,u=o?"change":"range"===r?Wr:"input",l="$event.target.value";s&&(l="$event.target.value.trim()"),a&&(l="_n("+l+")");var f=Br(t,l);c&&(f="if($event.target.composing)return;"+f),Er(e,"value","("+t+")"),Mr(e,u,f,null,!0),(s||a)&&Mr(e,"blur","$forceUpdate()")}(e,r,i);else if(!F.isReservedTag(o))return Hr(e,r,i),!1;return!0},text:function(e,t){t.value&&Er(e,"textContent","_s("+t.value+")",t)},html:function(e,t){t.value&&Er(e,"innerHTML","_s("+t.value+")",t)}},isPreTag:function(e){return"pre"===e},isUnaryTag:bo,mustUseProp:jn,canBeLeftOpenTag:$o,isReservedTag:Wn,getTagNamespace:Zn,staticKeys:function(e){return e.reduce(function(e,t){return e.concat(t.staticKeys||[])},[]).join(",")}(ba)},xa=g(function(e){return p("type,tag,attrsList,attrsMap,plain,parent,children,attrs,start,end,rawAttrsMap"+(e?","+e:""))});function ka(e,t){e&&($a=xa(t.staticKeys||""),wa=t.isReservedTag||T,function e(t){t.static=function(e){if(2===e.type)return!1;if(3===e.type)return!0;return!(!e.pre&&(e.hasBindings||e.if||e.for||d(e.tag)||!wa(e.tag)||function(e){for(;e.parent;){if("template"!==(e=e.parent).tag)return!1;if(e.for)return!0}return!1}(e)||!Object.keys(e).every($a)))}(t);if(1===t.type){if(!wa(t.tag)&&"slot"!==t.tag&&null==t.attrsMap["inline-template"])return;for(var n=0,r=t.children.length;n<r;n++){var i=t.children[n];e(i),i.static||(t.static=!1)}if(t.ifConditions)for(var o=1,a=t.ifConditions.length;o<a;o++){var s=t.ifConditions[o].block;e(s),s.static||(t.static=!1)}}}(e),function e(t,n){if(1===t.type){if((t.static||t.once)&&(t.staticInFor=n),t.static&&t.children.length&&(1!==t.children.length||3!==t.children[0].type))return void(t.staticRoot=!0);if(t.staticRoot=!1,t.children)for(var r=0,i=t.children.length;r<i;r++)e(t.children[r],n||!!t.for);if(t.ifConditions)for(var o=1,a=t.ifConditions.length;o<a;o++)e(t.ifConditions[o].block,n)}}(e,!1))}var Aa=/^([\w$_]+|\([^)]*?\))\s*=>|^function(?:\s+[\w$]+)?\s*\(/,Oa=/\([^)]*?\);*$/,Sa=/^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/,Ta={esc:27,tab:9,enter:13,space:32,up:38,left:37,right:39,down:40,delete:[8,46]},Ea={esc:["Esc","Escape"],tab:"Tab",enter:"Enter",space:[" ","Spacebar"],up:["Up","ArrowUp"],left:["Left","ArrowLeft"],right:["Right","ArrowRight"],down:["Down","ArrowDown"],delete:["Backspace","Delete","Del"]},Na=function(e){return"if("+e+")return null;"},ja={stop:"$event.stopPropagation();",prevent:"$event.preventDefault();",self:Na("$event.target !== $event.currentTarget"),ctrl:Na("!$event.ctrlKey"),shift:Na("!$event.shiftKey"),alt:Na("!$event.altKey"),meta:Na("!$event.metaKey"),left:Na("'button' in $event && $event.button !== 0"),middle:Na("'button' in $event && $event.button !== 1"),right:Na("'button' in $event && $event.button !== 2")};function Da(e,t){var n=t?"nativeOn:":"on:",r="",i="";for(var o in e){var a=La(e[o]);e[o]&&e[o].dynamic?i+=o+","+a+",":r+='"'+o+'":'+a+","}return r="{"+r.slice(0,-1)+"}",i?n+"_d("+r+",["+i.slice(0,-1)+"])":n+r}function La(e){if(!e)return"function(){}";if(Array.isArray(e))return"["+e.map(function(e){return La(e)}).join(",")+"]";var t=Sa.test(e.value),n=Aa.test(e.value),r=Sa.test(e.value.replace(Oa,""));if(e.modifiers){var i="",o="",a=[];for(var s in e.modifiers)if(ja[s])o+=ja[s],Ta[s]&&a.push(s);else if("exact"===s){var c=e.modifiers;o+=Na(["ctrl","shift","alt","meta"].filter(function(e){return!c[e]}).map(function(e){return"$event."+e+"Key"}).join("||"))}else a.push(s);return a.length&&(i+=function(e){return"if(!$event.type.indexOf('key')&&"+e.map(Ma).join("&&")+")return null;"}(a)),o&&(i+=o),"function($event){"+i+(t?"return "+e.value+"($event)":n?"return ("+e.value+")($event)":r?"return "+e.value:e.value)+"}"}return t||n?e.value:"function($event){"+(r?"return "+e.value:e.value)+"}"}function Ma(e){var t=parseInt(e,10);if(t)return"$event.keyCode!=="+t;var n=Ta[e],r=Ea[e];return"_k($event.keyCode,"+JSON.stringify(e)+","+JSON.stringify(n)+",$event.key,"+JSON.stringify(r)+")"}var Ia={on:function(e,t){e.wrapListeners=function(e){return"_g("+e+","+t.value+")"}},bind:function(e,t){e.wrapData=function(n){return"_b("+n+",'"+e.tag+"',"+t.value+","+(t.modifiers&&t.modifiers.prop?"true":"false")+(t.modifiers&&t.modifiers.sync?",true":"")+")"}},cloak:S},Fa=function(e){this.options=e,this.warn=e.warn||Sr,this.transforms=Tr(e.modules,"transformCode"),this.dataGenFns=Tr(e.modules,"genData"),this.directives=A(A({},Ia),e.directives);var t=e.isReservedTag||T;this.maybeComponent=function(e){return!!e.component||!t(e.tag)},this.onceId=0,this.staticRenderFns=[],this.pre=!1};function Pa(e,t){var n=new Fa(t);return{render:"with(this){return "+(e?Ra(e,n):'_c("div")')+"}",staticRenderFns:n.staticRenderFns}}function Ra(e,t){if(e.parent&&(e.pre=e.pre||e.parent.pre),e.staticRoot&&!e.staticProcessed)return Ha(e,t);if(e.once&&!e.onceProcessed)return Ba(e,t);if(e.for&&!e.forProcessed)return za(e,t);if(e.if&&!e.ifProcessed)return Ua(e,t);if("template"!==e.tag||e.slotTarget||t.pre){if("slot"===e.tag)return function(e,t){var n=e.slotName||'"default"',r=qa(e,t),i="_t("+n+(r?","+r:""),o=e.attrs||e.dynamicAttrs?Ga((e.attrs||[]).concat(e.dynamicAttrs||[]).map(function(e){return{name:b(e.name),value:e.value,dynamic:e.dynamic}})):null,a=e.attrsMap["v-bind"];!o&&!a||r||(i+=",null");o&&(i+=","+o);a&&(i+=(o?"":",null")+","+a);return i+")"}(e,t);var n;if(e.component)n=function(e,t,n){var r=t.inlineTemplate?null:qa(t,n,!0);return"_c("+e+","+Va(t,n)+(r?","+r:"")+")"}(e.component,e,t);else{var r;(!e.plain||e.pre&&t.maybeComponent(e))&&(r=Va(e,t));var i=e.inlineTemplate?null:qa(e,t,!0);n="_c('"+e.tag+"'"+(r?","+r:"")+(i?","+i:"")+")"}for(var o=0;o<t.transforms.length;o++)n=t.transforms[o](e,n);return n}return qa(e,t)||"void 0"}function Ha(e,t){e.staticProcessed=!0;var n=t.pre;return e.pre&&(t.pre=e.pre),t.staticRenderFns.push("with(this){return "+Ra(e,t)+"}"),t.pre=n,"_m("+(t.staticRenderFns.length-1)+(e.staticInFor?",true":"")+")"}function Ba(e,t){if(e.onceProcessed=!0,e.if&&!e.ifProcessed)return Ua(e,t);if(e.staticInFor){for(var n="",r=e.parent;r;){if(r.for){n=r.key;break}r=r.parent}return n?"_o("+Ra(e,t)+","+t.onceId+++","+n+")":Ra(e,t)}return Ha(e,t)}function Ua(e,t,n,r){return e.ifProcessed=!0,function e(t,n,r,i){if(!t.length)return i||"_e()";var o=t.shift();return o.exp?"("+o.exp+")?"+a(o.block)+":"+e(t,n,r,i):""+a(o.block);function a(e){return r?r(e,n):e.once?Ba(e,n):Ra(e,n)}}(e.ifConditions.slice(),t,n,r)}function za(e,t,n,r){var i=e.for,o=e.alias,a=e.iterator1?","+e.iterator1:"",s=e.iterator2?","+e.iterator2:"";return e.forProcessed=!0,(r||"_l")+"(("+i+"),function("+o+a+s+"){return "+(n||Ra)(e,t)+"})"}function Va(e,t){var n="{",r=function(e,t){var n=e.directives;if(!n)return;var r,i,o,a,s="directives:[",c=!1;for(r=0,i=n.length;r<i;r++){o=n[r],a=!0;var u=t.directives[o.name];u&&(a=!!u(e,o,t.warn)),a&&(c=!0,s+='{name:"'+o.name+'",rawName:"'+o.rawName+'"'+(o.value?",value:("+o.value+"),expression:"+JSON.stringify(o.value):"")+(o.arg?",arg:"+(o.isDynamicArg?o.arg:'"'+o.arg+'"'):"")+(o.modifiers?",modifiers:"+JSON.stringify(o.modifiers):"")+"},")}if(c)return s.slice(0,-1)+"]"}(e,t);r&&(n+=r+","),e.key&&(n+="key:"+e.key+","),e.ref&&(n+="ref:"+e.ref+","),e.refInFor&&(n+="refInFor:true,"),e.pre&&(n+="pre:true,"),e.component&&(n+='tag:"'+e.tag+'",');for(var i=0;i<t.dataGenFns.length;i++)n+=t.dataGenFns[i](e);if(e.attrs&&(n+="attrs:"+Ga(e.attrs)+","),e.props&&(n+="domProps:"+Ga(e.props)+","),e.events&&(n+=Da(e.events,!1)+","),e.nativeEvents&&(n+=Da(e.nativeEvents,!0)+","),e.slotTarget&&!e.slotScope&&(n+="slot:"+e.slotTarget+","),e.scopedSlots&&(n+=function(e,t,n){var r=e.for||Object.keys(t).some(function(e){var n=t[e];return n.slotTargetDynamic||n.if||n.for||Ka(n)}),i=!!e.if;if(!r)for(var o=e.parent;o;){if(o.slotScope&&o.slotScope!==ca||o.for){r=!0;break}o.if&&(i=!0),o=o.parent}var a=Object.keys(t).map(function(e){return Ja(t[e],n)}).join(",");return"scopedSlots:_u(["+a+"]"+(r?",null,true":"")+(!r&&i?",null,false,"+function(e){var t=5381,n=e.length;for(;n;)t=33*t^e.charCodeAt(--n);return t>>>0}(a):"")+")"}(e,e.scopedSlots,t)+","),e.model&&(n+="model:{value:"+e.model.value+",callback:"+e.model.callback+",expression:"+e.model.expression+"},"),e.inlineTemplate){var o=function(e,t){var n=e.children[0];if(n&&1===n.type){var r=Pa(n,t.options);return"inlineTemplate:{render:function(){"+r.render+"},staticRenderFns:["+r.staticRenderFns.map(function(e){return"function(){"+e+"}"}).join(",")+"]}"}}(e,t);o&&(n+=o+",")}return n=n.replace(/,$/,"")+"}",e.dynamicAttrs&&(n="_b("+n+',"'+e.tag+'",'+Ga(e.dynamicAttrs)+")"),e.wrapData&&(n=e.wrapData(n)),e.wrapListeners&&(n=e.wrapListeners(n)),n}function Ka(e){return 1===e.type&&("slot"===e.tag||e.children.some(Ka))}function Ja(e,t){var n=e.attrsMap["slot-scope"];if(e.if&&!e.ifProcessed&&!n)return Ua(e,t,Ja,"null");if(e.for&&!e.forProcessed)return za(e,t,Ja);var r=e.slotScope===ca?"":String(e.slotScope),i="function("+r+"){return "+("template"===e.tag?e.if&&n?"("+e.if+")?"+(qa(e,t)||"undefined")+":undefined":qa(e,t)||"undefined":Ra(e,t))+"}",o=r?"":",proxy:true";return"{key:"+(e.slotTarget||'"default"')+",fn:"+i+o+"}"}function qa(e,t,n,r,i){var o=e.children;if(o.length){var a=o[0];if(1===o.length&&a.for&&"template"!==a.tag&&"slot"!==a.tag){var s=n?t.maybeComponent(a)?",1":",0":"";return""+(r||Ra)(a,t)+s}var c=n?function(e,t){for(var n=0,r=0;r<e.length;r++){var i=e[r];if(1===i.type){if(Wa(i)||i.ifConditions&&i.ifConditions.some(function(e){return Wa(e.block)})){n=2;break}(t(i)||i.ifConditions&&i.ifConditions.some(function(e){return t(e.block)}))&&(n=1)}}return n}(o,t.maybeComponent):0,u=i||Za;return"["+o.map(function(e){return u(e,t)}).join(",")+"]"+(c?","+c:"")}}function Wa(e){return void 0!==e.for||"template"===e.tag||"slot"===e.tag}function Za(e,t){return 1===e.type?Ra(e,t):3===e.type&&e.isComment?(r=e,"_e("+JSON.stringify(r.text)+")"):"_v("+(2===(n=e).type?n.expression:Xa(JSON.stringify(n.text)))+")";var n,r}function Ga(e){for(var t="",n="",r=0;r<e.length;r++){var i=e[r],o=Xa(i.value);i.dynamic?n+=i.name+","+o+",":t+='"'+i.name+'":'+o+","}return t="{"+t.slice(0,-1)+"}",n?"_d("+t+",["+n.slice(0,-1)+"])":t}function Xa(e){return e.replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029")}new RegExp("\\b"+"do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,super,throw,while,yield,delete,export,import,return,switch,default,extends,finally,continue,debugger,function,arguments".split(",").join("\\b|\\b")+"\\b");function Ya(e,t){try{return new Function(e)}catch(n){return t.push({err:n,code:e}),S}}function Qa(e){var t=Object.create(null);return function(n,r,i){(r=A({},r)).warn;delete r.warn;var o=r.delimiters?String(r.delimiters)+n:n;if(t[o])return t[o];var a=e(n,r),s={},c=[];return s.render=Ya(a.render,c),s.staticRenderFns=a.staticRenderFns.map(function(e){return Ya(e,c)}),t[o]=s}}var es,ts,ns=(es=function(e,t){var n=la(e.trim(),t);!1!==t.optimize&&ka(n,t);var r=Pa(n,t);return{ast:n,render:r.render,staticRenderFns:r.staticRenderFns}},function(e){function t(t,n){var r=Object.create(e),i=[],o=[];if(n)for(var a in n.modules&&(r.modules=(e.modules||[]).concat(n.modules)),n.directives&&(r.directives=A(Object.create(e.directives||null),n.directives)),n)"modules"!==a&&"directives"!==a&&(r[a]=n[a]);r.warn=function(e,t,n){(n?o:i).push(e)};var s=es(t.trim(),r);return s.errors=i,s.tips=o,s}return{compile:t,compileToFunctions:Qa(t)}})(Ca),rs=(ns.compile,ns.compileToFunctions);function is(e){return(ts=ts||document.createElement("div")).innerHTML=e?'<a href="\n"/>':'<div a="\n"/>',ts.innerHTML.indexOf("&#10;")>0}var os=!!z&&is(!1),as=!!z&&is(!0),ss=g(function(e){var t=Yn(e);return t&&t.innerHTML}),cs=wn.prototype.$mount;return wn.prototype.$mount=function(e,t){if((e=e&&Yn(e))===document.body||e===document.documentElement)return this;var n=this.$options;if(!n.render){var r=n.template;if(r)if("string"==typeof r)"#"===r.charAt(0)&&(r=ss(r));else{if(!r.nodeType)return this;r=r.innerHTML}else e&&(r=function(e){if(e.outerHTML)return e.outerHTML;var t=document.createElement("div");return t.appendChild(e.cloneNode(!0)),t.innerHTML}(e));if(r){var i=rs(r,{outputSourceRange:!1,shouldDecodeNewlines:os,shouldDecodeNewlinesForHref:as,delimiters:n.delimiters,comments:n.comments},this),o=i.render,a=i.staticRenderFns;n.render=o,n.staticRenderFns=a}}return cs.call(this,e,t)},wn.compile=rs,wn});

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {var __WEBPACK_AMD_DEFINE_RESULT__;/*
 * [js-sha1]{@link https://github.com/emn178/js-sha1}
 *
 * @version 0.6.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
/*jslint bitwise: true */
(function() {
  'use strict';

  var root = typeof window === 'object' ? window : {};
  var NODE_JS = !root.JS_SHA1_NO_NODE_JS && typeof process === 'object' && process.versions && process.versions.node;
  if (NODE_JS) {
    root = global;
  }
  var COMMON_JS = !root.JS_SHA1_NO_COMMON_JS && typeof module === 'object' && module.exports;
  var AMD =  true && __webpack_require__(75);
  var HEX_CHARS = '0123456789abcdef'.split('');
  var EXTRA = [-2147483648, 8388608, 32768, 128];
  var SHIFT = [24, 16, 8, 0];
  var OUTPUT_TYPES = ['hex', 'array', 'digest', 'arrayBuffer'];

  var blocks = [];

  var createOutputMethod = function (outputType) {
    return function (message) {
      return new Sha1(true).update(message)[outputType]();
    };
  };

  var createMethod = function () {
    var method = createOutputMethod('hex');
    if (NODE_JS) {
      method = nodeWrap(method);
    }
    method.create = function () {
      return new Sha1();
    };
    method.update = function (message) {
      return method.create().update(message);
    };
    for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
      var type = OUTPUT_TYPES[i];
      method[type] = createOutputMethod(type);
    }
    return method;
  };

  var nodeWrap = function (method) {
    var crypto = eval("require('crypto')");
    var Buffer = eval("require('buffer').Buffer");
    var nodeMethod = function (message) {
      if (typeof message === 'string') {
        return crypto.createHash('sha1').update(message, 'utf8').digest('hex');
      } else if (message.constructor === ArrayBuffer) {
        message = new Uint8Array(message);
      } else if (message.length === undefined) {
        return method(message);
      }
      return crypto.createHash('sha1').update(new Buffer(message)).digest('hex');
    };
    return nodeMethod;
  };

  function Sha1(sharedMemory) {
    if (sharedMemory) {
      blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] =
      blocks[4] = blocks[5] = blocks[6] = blocks[7] =
      blocks[8] = blocks[9] = blocks[10] = blocks[11] =
      blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
      this.blocks = blocks;
    } else {
      this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    this.h0 = 0x67452301;
    this.h1 = 0xEFCDAB89;
    this.h2 = 0x98BADCFE;
    this.h3 = 0x10325476;
    this.h4 = 0xC3D2E1F0;

    this.block = this.start = this.bytes = this.hBytes = 0;
    this.finalized = this.hashed = false;
    this.first = true;
  }

  Sha1.prototype.update = function (message) {
    if (this.finalized) {
      return;
    }
    var notString = typeof(message) !== 'string';
    if (notString && message.constructor === root.ArrayBuffer) {
      message = new Uint8Array(message);
    }
    var code, index = 0, i, length = message.length || 0, blocks = this.blocks;

    while (index < length) {
      if (this.hashed) {
        this.hashed = false;
        blocks[0] = this.block;
        blocks[16] = blocks[1] = blocks[2] = blocks[3] =
        blocks[4] = blocks[5] = blocks[6] = blocks[7] =
        blocks[8] = blocks[9] = blocks[10] = blocks[11] =
        blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
      }

      if(notString) {
        for (i = this.start; index < length && i < 64; ++index) {
          blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
        }
      } else {
        for (i = this.start; index < length && i < 64; ++index) {
          code = message.charCodeAt(index);
          if (code < 0x80) {
            blocks[i >> 2] |= code << SHIFT[i++ & 3];
          } else if (code < 0x800) {
            blocks[i >> 2] |= (0xc0 | (code >> 6)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
          } else if (code < 0xd800 || code >= 0xe000) {
            blocks[i >> 2] |= (0xe0 | (code >> 12)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
          } else {
            code = 0x10000 + (((code & 0x3ff) << 10) | (message.charCodeAt(++index) & 0x3ff));
            blocks[i >> 2] |= (0xf0 | (code >> 18)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | ((code >> 12) & 0x3f)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
          }
        }
      }

      this.lastByteIndex = i;
      this.bytes += i - this.start;
      if (i >= 64) {
        this.block = blocks[16];
        this.start = i - 64;
        this.hash();
        this.hashed = true;
      } else {
        this.start = i;
      }
    }
    if (this.bytes > 4294967295) {
      this.hBytes += this.bytes / 4294967296 << 0;
      this.bytes = this.bytes % 4294967296;
    }
    return this;
  };

  Sha1.prototype.finalize = function () {
    if (this.finalized) {
      return;
    }
    this.finalized = true;
    var blocks = this.blocks, i = this.lastByteIndex;
    blocks[16] = this.block;
    blocks[i >> 2] |= EXTRA[i & 3];
    this.block = blocks[16];
    if (i >= 56) {
      if (!this.hashed) {
        this.hash();
      }
      blocks[0] = this.block;
      blocks[16] = blocks[1] = blocks[2] = blocks[3] =
      blocks[4] = blocks[5] = blocks[6] = blocks[7] =
      blocks[8] = blocks[9] = blocks[10] = blocks[11] =
      blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
    }
    blocks[14] = this.hBytes << 3 | this.bytes >>> 29;
    blocks[15] = this.bytes << 3;
    this.hash();
  };

  Sha1.prototype.hash = function () {
    var a = this.h0, b = this.h1, c = this.h2, d = this.h3, e = this.h4;
    var f, j, t, blocks = this.blocks;

    for(j = 16; j < 80; ++j) {
      t = blocks[j - 3] ^ blocks[j - 8] ^ blocks[j - 14] ^ blocks[j - 16];
      blocks[j] =  (t << 1) | (t >>> 31);
    }

    for(j = 0; j < 20; j += 5) {
      f = (b & c) | ((~b) & d);
      t = (a << 5) | (a >>> 27);
      e = t + f + e + 1518500249 + blocks[j] << 0;
      b = (b << 30) | (b >>> 2);

      f = (a & b) | ((~a) & c);
      t = (e << 5) | (e >>> 27);
      d = t + f + d + 1518500249 + blocks[j + 1] << 0;
      a = (a << 30) | (a >>> 2);

      f = (e & a) | ((~e) & b);
      t = (d << 5) | (d >>> 27);
      c = t + f + c + 1518500249 + blocks[j + 2] << 0;
      e = (e << 30) | (e >>> 2);

      f = (d & e) | ((~d) & a);
      t = (c << 5) | (c >>> 27);
      b = t + f + b + 1518500249 + blocks[j + 3] << 0;
      d = (d << 30) | (d >>> 2);

      f = (c & d) | ((~c) & e);
      t = (b << 5) | (b >>> 27);
      a = t + f + a + 1518500249 + blocks[j + 4] << 0;
      c = (c << 30) | (c >>> 2);
    }

    for(; j < 40; j += 5) {
      f = b ^ c ^ d;
      t = (a << 5) | (a >>> 27);
      e = t + f + e + 1859775393 + blocks[j] << 0;
      b = (b << 30) | (b >>> 2);

      f = a ^ b ^ c;
      t = (e << 5) | (e >>> 27);
      d = t + f + d + 1859775393 + blocks[j + 1] << 0;
      a = (a << 30) | (a >>> 2);

      f = e ^ a ^ b;
      t = (d << 5) | (d >>> 27);
      c = t + f + c + 1859775393 + blocks[j + 2] << 0;
      e = (e << 30) | (e >>> 2);

      f = d ^ e ^ a;
      t = (c << 5) | (c >>> 27);
      b = t + f + b + 1859775393 + blocks[j + 3] << 0;
      d = (d << 30) | (d >>> 2);

      f = c ^ d ^ e;
      t = (b << 5) | (b >>> 27);
      a = t + f + a + 1859775393 + blocks[j + 4] << 0;
      c = (c << 30) | (c >>> 2);
    }

    for(; j < 60; j += 5) {
      f = (b & c) | (b & d) | (c & d);
      t = (a << 5) | (a >>> 27);
      e = t + f + e - 1894007588 + blocks[j] << 0;
      b = (b << 30) | (b >>> 2);

      f = (a & b) | (a & c) | (b & c);
      t = (e << 5) | (e >>> 27);
      d = t + f + d - 1894007588 + blocks[j + 1] << 0;
      a = (a << 30) | (a >>> 2);

      f = (e & a) | (e & b) | (a & b);
      t = (d << 5) | (d >>> 27);
      c = t + f + c - 1894007588 + blocks[j + 2] << 0;
      e = (e << 30) | (e >>> 2);

      f = (d & e) | (d & a) | (e & a);
      t = (c << 5) | (c >>> 27);
      b = t + f + b - 1894007588 + blocks[j + 3] << 0;
      d = (d << 30) | (d >>> 2);

      f = (c & d) | (c & e) | (d & e);
      t = (b << 5) | (b >>> 27);
      a = t + f + a - 1894007588 + blocks[j + 4] << 0;
      c = (c << 30) | (c >>> 2);
    }

    for(; j < 80; j += 5) {
      f = b ^ c ^ d;
      t = (a << 5) | (a >>> 27);
      e = t + f + e - 899497514 + blocks[j] << 0;
      b = (b << 30) | (b >>> 2);

      f = a ^ b ^ c;
      t = (e << 5) | (e >>> 27);
      d = t + f + d - 899497514 + blocks[j + 1] << 0;
      a = (a << 30) | (a >>> 2);

      f = e ^ a ^ b;
      t = (d << 5) | (d >>> 27);
      c = t + f + c - 899497514 + blocks[j + 2] << 0;
      e = (e << 30) | (e >>> 2);

      f = d ^ e ^ a;
      t = (c << 5) | (c >>> 27);
      b = t + f + b - 899497514 + blocks[j + 3] << 0;
      d = (d << 30) | (d >>> 2);

      f = c ^ d ^ e;
      t = (b << 5) | (b >>> 27);
      a = t + f + a - 899497514 + blocks[j + 4] << 0;
      c = (c << 30) | (c >>> 2);
    }

    this.h0 = this.h0 + a << 0;
    this.h1 = this.h1 + b << 0;
    this.h2 = this.h2 + c << 0;
    this.h3 = this.h3 + d << 0;
    this.h4 = this.h4 + e << 0;
  };

  Sha1.prototype.hex = function () {
    this.finalize();

    var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3, h4 = this.h4;

    return HEX_CHARS[(h0 >> 28) & 0x0F] + HEX_CHARS[(h0 >> 24) & 0x0F] +
           HEX_CHARS[(h0 >> 20) & 0x0F] + HEX_CHARS[(h0 >> 16) & 0x0F] +
           HEX_CHARS[(h0 >> 12) & 0x0F] + HEX_CHARS[(h0 >> 8) & 0x0F] +
           HEX_CHARS[(h0 >> 4) & 0x0F] + HEX_CHARS[h0 & 0x0F] +
           HEX_CHARS[(h1 >> 28) & 0x0F] + HEX_CHARS[(h1 >> 24) & 0x0F] +
           HEX_CHARS[(h1 >> 20) & 0x0F] + HEX_CHARS[(h1 >> 16) & 0x0F] +
           HEX_CHARS[(h1 >> 12) & 0x0F] + HEX_CHARS[(h1 >> 8) & 0x0F] +
           HEX_CHARS[(h1 >> 4) & 0x0F] + HEX_CHARS[h1 & 0x0F] +
           HEX_CHARS[(h2 >> 28) & 0x0F] + HEX_CHARS[(h2 >> 24) & 0x0F] +
           HEX_CHARS[(h2 >> 20) & 0x0F] + HEX_CHARS[(h2 >> 16) & 0x0F] +
           HEX_CHARS[(h2 >> 12) & 0x0F] + HEX_CHARS[(h2 >> 8) & 0x0F] +
           HEX_CHARS[(h2 >> 4) & 0x0F] + HEX_CHARS[h2 & 0x0F] +
           HEX_CHARS[(h3 >> 28) & 0x0F] + HEX_CHARS[(h3 >> 24) & 0x0F] +
           HEX_CHARS[(h3 >> 20) & 0x0F] + HEX_CHARS[(h3 >> 16) & 0x0F] +
           HEX_CHARS[(h3 >> 12) & 0x0F] + HEX_CHARS[(h3 >> 8) & 0x0F] +
           HEX_CHARS[(h3 >> 4) & 0x0F] + HEX_CHARS[h3 & 0x0F] +
           HEX_CHARS[(h4 >> 28) & 0x0F] + HEX_CHARS[(h4 >> 24) & 0x0F] +
           HEX_CHARS[(h4 >> 20) & 0x0F] + HEX_CHARS[(h4 >> 16) & 0x0F] +
           HEX_CHARS[(h4 >> 12) & 0x0F] + HEX_CHARS[(h4 >> 8) & 0x0F] +
           HEX_CHARS[(h4 >> 4) & 0x0F] + HEX_CHARS[h4 & 0x0F];
  };

  Sha1.prototype.toString = Sha1.prototype.hex;

  Sha1.prototype.digest = function () {
    this.finalize();

    var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3, h4 = this.h4;

    return [
      (h0 >> 24) & 0xFF, (h0 >> 16) & 0xFF, (h0 >> 8) & 0xFF, h0 & 0xFF,
      (h1 >> 24) & 0xFF, (h1 >> 16) & 0xFF, (h1 >> 8) & 0xFF, h1 & 0xFF,
      (h2 >> 24) & 0xFF, (h2 >> 16) & 0xFF, (h2 >> 8) & 0xFF, h2 & 0xFF,
      (h3 >> 24) & 0xFF, (h3 >> 16) & 0xFF, (h3 >> 8) & 0xFF, h3 & 0xFF,
      (h4 >> 24) & 0xFF, (h4 >> 16) & 0xFF, (h4 >> 8) & 0xFF, h4 & 0xFF
    ];
  };

  Sha1.prototype.array = Sha1.prototype.digest;

  Sha1.prototype.arrayBuffer = function () {
    this.finalize();

    var buffer = new ArrayBuffer(20);
    var dataView = new DataView(buffer);
    dataView.setUint32(0, this.h0);
    dataView.setUint32(4, this.h1);
    dataView.setUint32(8, this.h2);
    dataView.setUint32(12, this.h3);
    dataView.setUint32(16, this.h4);
    return buffer;
  };

  var exports = createMethod();

  if (COMMON_JS) {
    module.exports = exports;
  } else {
    root.sha1 = exports;
    if (AMD) {
      !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
        return exports;
      }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
  }
})();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(27)))

/***/ }),
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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(72);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(10).default
var update = add("3e0d0ed2", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(74);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(10).default
var update = add("201ba8be", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(77);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(10).default
var update = add("4fed08e2", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(79);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(10).default
var update = add("0015c47e", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(81);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(10).default
var update = add("6854dc1f", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(83);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(10).default
var update = add("8c6aa428", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(85);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(10).default
var update = add("7d9b1579", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(88);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(10).default
var update = add("97977658", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(90);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(10).default
var update = add("26e31566", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(92);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(10).default
var update = add("39537a49", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(94);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(10).default
var update = add("459f07e2", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(96);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(10).default
var update = add("220e9d66", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(98);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(10).default
var update = add("3bec9911", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(100);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(10).default
var update = add("a5206830", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(102);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(10).default
var update = add("01eed082", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(104);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(10).default
var update = add("75f1090b", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(106);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(10).default
var update = add("2a8be53d", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(108);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(10).default
var update = add("2ec8a742", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(110);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(10).default
var update = add("46cca6c4", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(112);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(10).default
var update = add("226cf9d0", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(114);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(10).default
var update = add("69a2cc52", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(116);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(10).default
var update = add("4a5726ae", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(119);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(10).default
var update = add("5b3e7b6f", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),
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
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(120);


/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(28);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, "main{width:100%;padding-top:24px}main h1{font-weight:800;color:black;text-transform:uppercase;font-size:15px}\n", ""]);

// exports


/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Toggle_vue_vue_type_style_index_0_id_93ab41be_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(29);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Toggle_vue_vue_type_style_index_0_id_93ab41be_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Toggle_vue_vue_type_style_index_0_id_93ab41be_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Toggle_vue_vue_type_style_index_0_id_93ab41be_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".switcher[data-v-93ab41be]{position:relative;width:70px;height:35px}.switcher .checkbox[data-v-93ab41be]{position:relative;width:100%;height:100%;padding:0;margin:0;opacity:0;cursor:pointer;z-index:3}.switcher .knobs[data-v-93ab41be],.switcher .layer[data-v-93ab41be]{position:absolute;top:0;right:0;bottom:0;left:0}.switcher .knobs[data-v-93ab41be]{z-index:2}.switcher .layer[data-v-93ab41be]{height:23px;margin:0 7px;top:50%;transform:translateY(-50%);background-color:#666666;transition:0.3s ease all;z-index:1;border-radius:100px;box-shadow:0 1px 3px rgba(0,0,0,0.12),0 1px 2px rgba(0,0,0,0.24)}.switcher .knobs[data-v-93ab41be]:before{content:'';position:absolute;top:0;left:1px;width:32px;height:32px;color:#fff;font-size:10px;font-weight:bold;text-align:center;line-height:1;padding:0;background-color:white;border-radius:50%;transition:0.3s cubic-bezier(0.18, 0.89, 0.35, 1.15) all;border:1px solid #ededed;box-shadow:0 1px 3px rgba(0,0,0,0.12),0 1px 2px rgba(0,0,0,0.24);z-index:1}.switcher .checkbox:checked+.knobs[data-v-93ab41be]:before{left:35px}.switcher .checkbox:checked+.knobs[data-v-93ab41be]:after{left:45px;border:3px solid #0CE2B2}.switcher .knobs[data-v-93ab41be]:after{content:'';width:8px;height:8px;left:11px;top:10px;background-color:white;z-index:2;position:absolute;transition:0.3s cubic-bezier(0.18, 0.89, 0.35, 1.15) all;border-radius:50%;border:3px solid #666666}.switcher .checkbox:checked ~ .layer[data-v-93ab41be]{background-color:#0CE2B2}.switcher .knobs[data-v-93ab41be],.switcher #button-1 .knobs[data-v-93ab41be]:before,.switcher #button-1 .layer[data-v-93ab41be]{transition:0.3s ease all}\n", ""]);

// exports


/***/ }),
/* 75 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ProtectionStatus_vue_vue_type_style_index_0_id_08559b90_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(30);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ProtectionStatus_vue_vue_type_style_index_0_id_08559b90_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ProtectionStatus_vue_vue_type_style_index_0_id_08559b90_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ProtectionStatus_vue_vue_type_style_index_0_id_08559b90_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".protect-status[data-v-08559b90]{font-size:13px;font-weight:700;text-transform:uppercase;padding:4px 26px;border:2px solid transparent;border-radius:20px;display:inline-block}.protect-status.unprotected[data-v-08559b90]{color:#F20000;border-color:#F20000}.protect-status.protected[data-v-08559b90]{color:#0BDCAD;border-color:#0BDCAD}\n", ""]);

// exports


/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Info_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(31);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Info_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Info_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Info_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".info{padding:28px 37px 28px 37px;background-color:#F8F8F8;box-shadow:inset 0 38px 9px -32px rgba(0,0,0,0.2);display:flex;flex-direction:column;justify-content:flex-start;align-items:center}.info h1{font-size:14px;font-weight:800;text-transform:uppercase;text-align:center;line-height:1.5}.info .content{flex-grow:1;width:100%;display:flex;flex-direction:column}.info .content p{font-weight:300;color:black;font-size:13px;line-height:1.3;margin-top:20px}.info.big{height:631px;padding-top:100px}.info.big .content{align-items:center;justify-content:center;height:315px}.info.big .content p{text-align:center}.info.white{background-color:transparent}.info.white .content h1{white-space:nowrap}.info.white a{margin:0 auto}\n", ""]);

// exports


/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_IconExit_vue_vue_type_style_index_0_id_2c3f694e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(32);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_IconExit_vue_vue_type_style_index_0_id_2c3f694e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_IconExit_vue_vue_type_style_index_0_id_2c3f694e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_IconExit_vue_vue_type_style_index_0_id_2c3f694e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".icon--exit[data-v-2c3f694e]{cursor:pointer;transition:ease 0.3s all;margin-bottom:10px}.icon--exit[data-v-2c3f694e]:hover{transform:rotate(90deg);filter:brightness(0%)}\n", ""]);

// exports


/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_FeedbackPage_vue_vue_type_style_index_0_id_4c9f474a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(33);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_FeedbackPage_vue_vue_type_style_index_0_id_4c9f474a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_FeedbackPage_vue_vue_type_style_index_0_id_4c9f474a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_FeedbackPage_vue_vue_type_style_index_0_id_4c9f474a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, "textarea[data-v-4c9f474a]{background-color:#F7F7F7;border:none;text-align:center;outline:none;height:150px;width:90%;resize:none;margin:40px 0;font-weight:800;font-size:14px;color:#c5c1c1bf;padding:30px 10px}textarea[data-v-4c9f474a]::placeholder{font-weight:800;font-size:14px;color:#c5c1c1bf}\n", ""]);

// exports


/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ProtectionType_vue_vue_type_style_index_0_id_78c13e00_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(34);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ProtectionType_vue_vue_type_style_index_0_id_78c13e00_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ProtectionType_vue_vue_type_style_index_0_id_78c13e00_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ProtectionType_vue_vue_type_style_index_0_id_78c13e00_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".type-switcher[data-v-78c13e00]{width:100%;height:25px;background-color:#dedcdc;border-radius:20px;position:relative;display:flex;margin-top:30px}.type-switcher .type[data-v-78c13e00]{width:50%;display:flex;justify-content:center;align-items:center;height:100%;color:white;font-weight:800;text-transform:uppercase;position:relative;transition:all 0.3s ease}.type-switcher .type[data-v-78c13e00]:not(.active){cursor:pointer}.type-switcher .type.active[data-v-78c13e00]{background-color:#FFB22A;border-radius:20px;position:relative}.type-switcher .type[data-v-78c13e00]::before{content:'';opacity:0.3;border:0 solid #FFB22A;border-radius:20px;position:absolute;height:100%;width:100%;transition:all 0.3s ease}.type-switcher .type.active[data-v-78c13e00]::before{border:7.5px solid #FFB22A}\n", ""]);

// exports


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * gemini-scrollbar
 * @version 1.5.3
 * @link http://noeldelgado.github.io/gemini-scrollbar/
 * @license MIT
 */
(function() {
  var SCROLLBAR_WIDTH, DONT_CREATE_GEMINI, CLASSNAMES;

  CLASSNAMES = {
    element: 'gm-scrollbar-container',
    verticalScrollbar: 'gm-scrollbar -vertical',
    horizontalScrollbar: 'gm-scrollbar -horizontal',
    thumb: 'thumb',
    view: 'gm-scroll-view',
    autoshow: 'gm-autoshow',
    disable: 'gm-scrollbar-disable-selection',
    prevented: 'gm-prevented',
    resizeTrigger: 'gm-resize-trigger',
  };

  function getScrollbarWidth() {
    var e = document.createElement('div'), sw;
    e.style.position = 'absolute';
    e.style.top = '-9999px';
    e.style.width = '100px';
    e.style.height = '100px';
    e.style.overflow = 'scroll';
    e.style.msOverflowStyle = 'scrollbar';
    document.body.appendChild(e);
    sw = (e.offsetWidth - e.clientWidth);
    document.body.removeChild(e);
    return sw;
  }

  function addClass(el, classNames) {
    if (el.classList) {
      return classNames.forEach(function(cl) {
        el.classList.add(cl);
      });
    }
    el.className += ' ' + classNames.join(' ');
  }

  function removeClass(el, classNames) {
    if (el.classList) {
      return classNames.forEach(function(cl) {
        el.classList.remove(cl);
      });
    }
    el.className = el.className.replace(new RegExp('(^|\\b)' + classNames.join('|') + '(\\b|$)', 'gi'), ' ');
  }

  /* Copyright (c) 2015 Lucas Wiener
   * https://github.com/wnr/element-resize-detector
   */
  function isIE() {
    var agent = navigator.userAgent.toLowerCase();
    return agent.indexOf("msie") !== -1 || agent.indexOf("trident") !== -1 || agent.indexOf(" edge/") !== -1;
  }

  function GeminiScrollbar(config) {
    this.element = null;
    this.autoshow = false;
    this.createElements = true;
    this.forceGemini = false;
    this.onResize = null;
    this.minThumbSize = 20;

    Object.keys(config || {}).forEach(function (propertyName) {
      this[propertyName] = config[propertyName];
    }, this);

    SCROLLBAR_WIDTH = getScrollbarWidth();
    DONT_CREATE_GEMINI = ((SCROLLBAR_WIDTH === 0) && (this.forceGemini === false));

    this._cache = {events: {}};
    this._created = false;
    this._cursorDown = false;
    this._prevPageX = 0;
    this._prevPageY = 0;

    this._document = null;
    this._viewElement = this.element;
    this._scrollbarVerticalElement = null;
    this._thumbVerticalElement = null;
    this._scrollbarHorizontalElement = null;
    this._scrollbarHorizontalElement = null;
  }

  GeminiScrollbar.prototype.create = function create() {
    if (DONT_CREATE_GEMINI) {
      addClass(this.element, [CLASSNAMES.prevented]);

      if (this.onResize) {
        // still need a resize trigger if we have an onResize callback, which
        // also means we need a separate _viewElement to do the scrolling.
        if (this.createElements === true) {
          this._viewElement = document.createElement('div');
          while(this.element.childNodes.length > 0) {
            this._viewElement.appendChild(this.element.childNodes[0]);
          }
          this.element.appendChild(this._viewElement);
        } else {
          this._viewElement = this.element.querySelector('.' + CLASSNAMES.view);
        }
        addClass(this.element, [CLASSNAMES.element]);
        addClass(this._viewElement, [CLASSNAMES.view]);
        this._createResizeTrigger();
      }

      return this;
    }

    if (this._created === true) {
      console.warn('calling on a already-created object');
      return this;
    }

    if (this.autoshow) {
      addClass(this.element, [CLASSNAMES.autoshow]);
    }

    this._document = document;

    if (this.createElements === true) {
      this._viewElement = document.createElement('div');
      this._scrollbarVerticalElement = document.createElement('div');
      this._thumbVerticalElement = document.createElement('div');
      this._scrollbarHorizontalElement = document.createElement('div');
      this._thumbHorizontalElement = document.createElement('div');
      while(this.element.childNodes.length > 0) {
        this._viewElement.appendChild(this.element.childNodes[0]);
      }

      this._scrollbarVerticalElement.appendChild(this._thumbVerticalElement);
      this._scrollbarHorizontalElement.appendChild(this._thumbHorizontalElement);
      this.element.appendChild(this._scrollbarVerticalElement);
      this.element.appendChild(this._scrollbarHorizontalElement);
      this.element.appendChild(this._viewElement);
    } else {
      this._viewElement = this.element.querySelector('.' + CLASSNAMES.view);
      this._scrollbarVerticalElement = this.element.querySelector('.' + CLASSNAMES.verticalScrollbar.split(' ').join('.'));
      this._thumbVerticalElement = this._scrollbarVerticalElement.querySelector('.' + CLASSNAMES.thumb);
      this._scrollbarHorizontalElement = this.element.querySelector('.' + CLASSNAMES.horizontalScrollbar.split(' ').join('.'));
      this._thumbHorizontalElement = this._scrollbarHorizontalElement.querySelector('.' + CLASSNAMES.thumb);
    }

    addClass(this.element, [CLASSNAMES.element]);
    addClass(this._viewElement, [CLASSNAMES.view]);
    addClass(this._scrollbarVerticalElement, CLASSNAMES.verticalScrollbar.split(/\s/));
    addClass(this._scrollbarHorizontalElement, CLASSNAMES.horizontalScrollbar.split(/\s/));
    addClass(this._thumbVerticalElement, [CLASSNAMES.thumb]);
    addClass(this._thumbHorizontalElement, [CLASSNAMES.thumb]);

    this._scrollbarVerticalElement.style.display = '';
    this._scrollbarHorizontalElement.style.display = '';

    this._createResizeTrigger();

    this._created = true;

    return this._bindEvents().update();
  };

  GeminiScrollbar.prototype._createResizeTrigger = function createResizeTrigger() {
    // We need to arrange for self.scrollbar.update to be called whenever
    // the DOM is changed resulting in a size-change for our div. To make
    // this happen, we use a technique described here:
    // http://www.backalleycoder.com/2013/03/18/cross-browser-event-based-element-resize-detection/.
    //
    // The idea is that we create an <object> element in our div, which we
    // arrange to have the same size as that div. The <object> element
    // contains a Window object, to which we can attach an onresize
    // handler.
    //
    // (React appears to get very confused by the object (we end up with
    // Chrome windows which only show half of the text they are supposed
    // to), so we always do this manually.)

    var obj = document.createElement('object');
    addClass(obj, [CLASSNAMES.resizeTrigger]);
    obj.type = 'text/html';
    obj.setAttribute('tabindex', '-1');
    var resizeHandler = this._resizeHandler.bind(this);
    obj.onload = function () {
      var win = obj.contentDocument.defaultView;
      win.addEventListener('resize', resizeHandler);
    };

    //IE: Does not like that this happens before, even if it is also added after.
    if (!isIE()) {
      obj.data = 'about:blank';
    }

    this.element.appendChild(obj);

    //IE: This must occur after adding the object to the DOM.
    if (isIE()) {
      obj.data = 'about:blank';
    }

    this._resizeTriggerElement = obj;
  };

  GeminiScrollbar.prototype.update = function update() {
    if (DONT_CREATE_GEMINI) {
      return this;
    }

    if (this._created === false) {
      console.warn('calling on a not-yet-created object');
      return this;
    }

    this._viewElement.style.width = ((this.element.offsetWidth + SCROLLBAR_WIDTH).toString() + 'px');
    this._viewElement.style.height = ((this.element.offsetHeight + SCROLLBAR_WIDTH).toString() + 'px');

    this._naturalThumbSizeX = this._scrollbarHorizontalElement.clientWidth / this._viewElement.scrollWidth * this._scrollbarHorizontalElement.clientWidth;
    this._naturalThumbSizeY = this._scrollbarVerticalElement.clientHeight / this._viewElement.scrollHeight * this._scrollbarVerticalElement.clientHeight;

    this._scrollTopMax = this._viewElement.scrollHeight - this._viewElement.clientHeight;
    this._scrollLeftMax = this._viewElement.scrollWidth - this._viewElement.clientWidth;

    if (this._naturalThumbSizeY < this.minThumbSize) {
      this._thumbVerticalElement.style.height = this.minThumbSize + 'px';
    } else if (this._scrollTopMax) {
      this._thumbVerticalElement.style.height = this._naturalThumbSizeY + 'px';
    } else {
      this._thumbVerticalElement.style.height = '0px';
    }

    if (this._naturalThumbSizeX < this.minThumbSize) {
      this._thumbHorizontalElement.style.width = this.minThumbSize + 'px';
    } else if (this._scrollLeftMax) {
      this._thumbHorizontalElement.style.width = this._naturalThumbSizeX + 'px';
    } else {
      this._thumbHorizontalElement.style.width = '0px';
    }

    this._thumbSizeY = this._thumbVerticalElement.clientHeight;
    this._thumbSizeX = this._thumbHorizontalElement.clientWidth;

    this._trackTopMax = this._scrollbarVerticalElement.clientHeight - this._thumbSizeY;
    this._trackLeftMax = this._scrollbarHorizontalElement.clientWidth - this._thumbSizeX;

    this._scrollHandler();

    return this;
  };

  GeminiScrollbar.prototype.destroy = function destroy() {
    if (this._resizeTriggerElement) {
      this.element.removeChild(this._resizeTriggerElement);
      this._resizeTriggerElement = null;
    }

    if (DONT_CREATE_GEMINI) {
      return this;
    }

    if (this._created === false) {
      console.warn('calling on a not-yet-created object');
      return this;
    }

    this._unbinEvents();

    removeClass(this.element, [CLASSNAMES.element, CLASSNAMES.autoshow]);

    if (this.createElements === true) {
      this.element.removeChild(this._scrollbarVerticalElement);
      this.element.removeChild(this._scrollbarHorizontalElement);
      while(this._viewElement.childNodes.length > 0) {
        this.element.appendChild(this._viewElement.childNodes[0]);
      }
      this.element.removeChild(this._viewElement);
    } else {
      this._viewElement.style.width = '';
      this._viewElement.style.height = '';
      this._scrollbarVerticalElement.style.display = 'none';
      this._scrollbarHorizontalElement.style.display = 'none';
    }

    this._created = false;
    this._document = null;

    return null;
  };

  GeminiScrollbar.prototype.getViewElement = function getViewElement() {
    return this._viewElement;
  };

  GeminiScrollbar.prototype._bindEvents = function _bindEvents() {
    this._cache.events.scrollHandler = this._scrollHandler.bind(this);
    this._cache.events.clickVerticalTrackHandler = this._clickVerticalTrackHandler.bind(this);
    this._cache.events.clickHorizontalTrackHandler = this._clickHorizontalTrackHandler.bind(this);
    this._cache.events.clickVerticalThumbHandler = this._clickVerticalThumbHandler.bind(this);
    this._cache.events.clickHorizontalThumbHandler = this._clickHorizontalThumbHandler.bind(this);
    this._cache.events.mouseUpDocumentHandler = this._mouseUpDocumentHandler.bind(this);
    this._cache.events.mouseMoveDocumentHandler = this._mouseMoveDocumentHandler.bind(this);

    this._viewElement.addEventListener('scroll', this._cache.events.scrollHandler);
    this._scrollbarVerticalElement.addEventListener('mousedown', this._cache.events.clickVerticalTrackHandler);
    this._scrollbarHorizontalElement.addEventListener('mousedown', this._cache.events.clickHorizontalTrackHandler);
    this._thumbVerticalElement.addEventListener('mousedown', this._cache.events.clickVerticalThumbHandler);
    this._thumbHorizontalElement.addEventListener('mousedown', this._cache.events.clickHorizontalThumbHandler);
    this._document.addEventListener('mouseup', this._cache.events.mouseUpDocumentHandler);

    return this;
  };

  GeminiScrollbar.prototype._unbinEvents = function _unbinEvents() {
    this._viewElement.removeEventListener('scroll', this._cache.events.scrollHandler);
    this._scrollbarVerticalElement.removeEventListener('mousedown', this._cache.events.clickVerticalTrackHandler);
    this._scrollbarHorizontalElement.removeEventListener('mousedown', this._cache.events.clickHorizontalTrackHandler);
    this._thumbVerticalElement.removeEventListener('mousedown', this._cache.events.clickVerticalThumbHandler);
    this._thumbHorizontalElement.removeEventListener('mousedown', this._cache.events.clickHorizontalThumbHandler);
    this._document.removeEventListener('mouseup', this._cache.events.mouseUpDocumentHandler);
    this._document.removeEventListener('mousemove', this._cache.events.mouseMoveDocumentHandler);

    return this;
  };

  GeminiScrollbar.prototype._scrollHandler = function _scrollHandler() {
    var x = (this._viewElement.scrollLeft * this._trackLeftMax / this._scrollLeftMax) || 0;
    var y = (this._viewElement.scrollTop * this._trackTopMax / this._scrollTopMax) || 0;

    this._thumbHorizontalElement.style.msTransform = 'translateX(' + x + 'px)';
    this._thumbHorizontalElement.style.webkitTransform = 'translate3d(' + x + 'px, 0, 0)';
    this._thumbHorizontalElement.style.transform = 'translate3d(' + x + 'px, 0, 0)';

    this._thumbVerticalElement.style.msTransform = 'translateY(' + y + 'px)';
    this._thumbVerticalElement.style.webkitTransform = 'translate3d(0, ' + y + 'px, 0)';
    this._thumbVerticalElement.style.transform = 'translate3d(0, ' + y + 'px, 0)';
  };

  GeminiScrollbar.prototype._resizeHandler = function _resizeHandler() {
    this.update();
    if (this.onResize) {
      this.onResize();
    }
  };

  GeminiScrollbar.prototype._clickVerticalTrackHandler = function _clickVerticalTrackHandler(e) {
    if(e.target !== e.currentTarget) {
      return;
    }
    var offset = e.offsetY - this._naturalThumbSizeY * .5
      , thumbPositionPercentage = offset * 100 / this._scrollbarVerticalElement.clientHeight;

    this._viewElement.scrollTop = thumbPositionPercentage * this._viewElement.scrollHeight / 100;
  };

  GeminiScrollbar.prototype._clickHorizontalTrackHandler = function _clickHorizontalTrackHandler(e) {
    if(e.target !== e.currentTarget) {
      return;
    }
    var offset = e.offsetX - this._naturalThumbSizeX * .5
      , thumbPositionPercentage = offset * 100 / this._scrollbarHorizontalElement.clientWidth;

    this._viewElement.scrollLeft = thumbPositionPercentage * this._viewElement.scrollWidth / 100;
  };

  GeminiScrollbar.prototype._clickVerticalThumbHandler = function _clickVerticalThumbHandler(e) {
    this._startDrag(e);
    this._prevPageY = this._thumbSizeY - e.offsetY;
  };

  GeminiScrollbar.prototype._clickHorizontalThumbHandler = function _clickHorizontalThumbHandler(e) {
    this._startDrag(e);
    this._prevPageX = this._thumbSizeX - e.offsetX;
  };

  GeminiScrollbar.prototype._startDrag = function _startDrag(e) {
    this._cursorDown = true;
    addClass(document.body, [CLASSNAMES.disable]);
    this._document.addEventListener('mousemove', this._cache.events.mouseMoveDocumentHandler);
    this._document.onselectstart = function() {return false;};
  };

  GeminiScrollbar.prototype._mouseUpDocumentHandler = function _mouseUpDocumentHandler() {
    this._cursorDown = false;
    this._prevPageX = this._prevPageY = 0;
    removeClass(document.body, [CLASSNAMES.disable]);
    this._document.removeEventListener('mousemove', this._cache.events.mouseMoveDocumentHandler);
    this._document.onselectstart = null;
  };

  GeminiScrollbar.prototype._mouseMoveDocumentHandler = function _mouseMoveDocumentHandler(e) {
    if (this._cursorDown === false) {return;}

    var offset, thumbClickPosition;

    if (this._prevPageY) {
      offset = e.clientY - this._scrollbarVerticalElement.getBoundingClientRect().top;
      thumbClickPosition = this._thumbSizeY - this._prevPageY;

      this._viewElement.scrollTop = this._scrollTopMax * (offset - thumbClickPosition) / this._trackTopMax;

      return void 0;
    }

    if (this._prevPageX) {
      offset = e.clientX - this._scrollbarHorizontalElement.getBoundingClientRect().left;
      thumbClickPosition = this._thumbSizeX - this._prevPageX;

      this._viewElement.scrollLeft = this._scrollLeftMax * (offset - thumbClickPosition) / this._trackLeftMax;
    }
  };

  if (true) {
    module.exports = GeminiScrollbar;
  } else {}
})();


/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomSelect_vue_vue_type_style_index_0_id_40a1575a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(35);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomSelect_vue_vue_type_style_index_0_id_40a1575a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomSelect_vue_vue_type_style_index_0_id_40a1575a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomSelect_vue_vue_type_style_index_0_id_40a1575a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".custom-select[data-v-40a1575a]{position:relative;width:100%;background-color:transparent;border-left:none;border-top:none;border-right:none;border-color:#c5c1c1bf;text-align:center;outline:none;padding:5px;font-weight:800;font-size:14px;color:#c5c1c1bf}.select-selected[data-v-40a1575a]{font-weight:800;font-size:14px;color:#c5c1c1bf;user-select:none}.select-selected[data-v-40a1575a]:after{position:absolute;content:\"\";top:25px;right:10px;width:0;height:0;border:6px solid;border-color:#c5c1c1bf transparent transparent transparent}.select-selected.select-arrow-active[data-v-40a1575a]:after{border-color:transparent transparent #c5c1c1bf transparent;top:18px}.select-item[data-v-40a1575a],.select-selected[data-v-40a1575a]{display:flex;align-items:center;padding:8px 16px;border:1px solid;border-color:transparent transparent rgba(0,0,0,0.1) transparent;cursor:pointer;transition:all 0.3s ease;user-select:none}.select-items[data-v-40a1575a]{position:absolute;background-color:white;top:86%;left:0;right:0;z-index:99;border:1px solid rgba(0,0,0,0.2);border-radius:5px;font-size:13px;max-height:250px;overflow:hidden}.select-item-icon[data-v-40a1575a]{width:32px;height:32px;background-repeat:no-repeat;background-position:center;background-size:contain;margin-right:8px}.select-hide[data-v-40a1575a]{display:none}.select-items>div[data-v-40a1575a]:hover,.same-as-selected[data-v-40a1575a]{color:white;background-color:#ffb22a}\n", ""]);

// exports


/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_LocationSelector_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(36);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_LocationSelector_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_LocationSelector_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_LocationSelector_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".inputs{width:100%;margin:30px 0}.inputs input,.inputs select{width:100%;background-color:transparent;border-left:none;border-top:none;border-right:none;border-color:#c5c1c1bf;text-align:center;outline:none;padding:5px;font-weight:800;font-size:14px;color:#707070}.inputs input:first-of-type,.inputs select:first-of-type{margin-bottom:10px}.inputs input::placeholder{font-weight:800;font-size:14px;color:#c5c1c1bf}.inputs select option{text-align:center}\n", ""]);

// exports


/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ReloadLocationButton_vue_vue_type_style_index_0_id_d83417ca_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(37);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ReloadLocationButton_vue_vue_type_style_index_0_id_d83417ca_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ReloadLocationButton_vue_vue_type_style_index_0_id_d83417ca_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ReloadLocationButton_vue_vue_type_style_index_0_id_d83417ca_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".reload[data-v-d83417ca]{box-sizing:border-box;width:262px;height:71px;border-radius:50px;background-color:#FFB22A;display:flex;justify-content:space-between;align-items:center;padding:11px 23px;cursor:pointer}.reload:hover img[data-v-d83417ca]{transform:rotate(180deg)}.reload .text p[data-v-d83417ca]{font-weight:800;color:white;font-size:15px}.reload .icon img[data-v-d83417ca]{transition:ease 0.6s all}\n", ""]);

// exports


/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ProtectedPage_vue_vue_type_style_index_0_id_1487cd46_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(38);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ProtectedPage_vue_vue_type_style_index_0_id_1487cd46_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ProtectedPage_vue_vue_type_style_index_0_id_1487cd46_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ProtectedPage_vue_vue_type_style_index_0_id_1487cd46_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, "main[data-v-1487cd46]{width:100%;padding-top:24px}\n", ""]);

// exports


/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_RatingPage_vue_vue_type_style_index_0_id_83437b9a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_RatingPage_vue_vue_type_style_index_0_id_83437b9a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_RatingPage_vue_vue_type_style_index_0_id_83437b9a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_RatingPage_vue_vue_type_style_index_0_id_83437b9a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".stars[data-v-83437b9a]{align-self:center;display:flex;align-items:center;justify-content:center;margin:25px 0 50px 0}.stars .star[data-v-83437b9a]{background-position:center;background-repeat:no-repeat;background-size:contain;background-image:url(\"/popup/img/star.png\");cursor:pointer;height:25px;width:25px;margin:0 1px}.stars .star.color[data-v-83437b9a],.stars .star[data-v-83437b9a]:hover{background-image:url(\"/popup/img/star-color.png\")}\n", ""]);

// exports


/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ShareRatingPage_vue_vue_type_style_index_0_id_caaa2498_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(40);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ShareRatingPage_vue_vue_type_style_index_0_id_caaa2498_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ShareRatingPage_vue_vue_type_style_index_0_id_caaa2498_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ShareRatingPage_vue_vue_type_style_index_0_id_caaa2498_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, "img.chrome-store[data-v-caaa2498]{width:178px;height:148px;display:block;margin:0 auto}\n", ""]);

// exports


/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ReconnectingPage_vue_vue_type_style_index_0_id_793516fe_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ReconnectingPage_vue_vue_type_style_index_0_id_793516fe_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ReconnectingPage_vue_vue_type_style_index_0_id_793516fe_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ReconnectingPage_vue_vue_type_style_index_0_id_793516fe_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".lost-connection[data-v-793516fe]{display:flex;height:548px;flex-direction:column;align-items:center;justify-content:center;position:relative}.lost-connection p[data-v-793516fe]{font-weight:300;color:black;font-size:13px;line-height:1.3;text-align:center}.lost-connection h1[data-v-793516fe]{font-size:14px;font-weight:800;text-transform:uppercase;text-align:center;line-height:1.5;margin:25px 0}img.spinner[data-v-793516fe]{animation:rotating-data-v-793516fe 1.5s infinite;animation-timing-function:linear}@keyframes rotating-data-v-793516fe{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}\n", ""]);

// exports


/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ThankYouPage_vue_vue_type_style_index_0_id_39ca94aa_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(42);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ThankYouPage_vue_vue_type_style_index_0_id_39ca94aa_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ThankYouPage_vue_vue_type_style_index_0_id_39ca94aa_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ThankYouPage_vue_vue_type_style_index_0_id_39ca94aa_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, "textarea[data-v-39ca94aa]{background-color:#F7F7F7;border:none;text-align:center;outline:none;height:289px;resize:none;margin-top:40px;font-weight:800;font-size:14px;color:#c5c1c1bf;padding:30px 10px}textarea[data-v-39ca94aa]::placeholder{font-weight:800;font-size:14px;color:#c5c1c1bf}\n", ""]);

// exports


/***/ }),
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_WelcomePage_vue_vue_type_style_index_0_id_0f19493a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(43);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_WelcomePage_vue_vue_type_style_index_0_id_0f19493a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_WelcomePage_vue_vue_type_style_index_0_id_0f19493a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_WelcomePage_vue_vue_type_style_index_0_id_0f19493a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, "h1[data-v-0f19493a]{font-size:14px;font-weight:800;text-transform:uppercase;text-align:center;line-height:1.5;margin:0.67em 0}.buttons[data-v-0f19493a]{flex-grow:1;display:grid;grid-template-columns:max-content;grid-template-rows:min-content min-content;grid-row-gap:32px}.inputs[data-v-0f19493a]{margin-bottom:5px}.inputs .message[data-v-0f19493a]{text-align:center;min-height:19px;color:#d32f2f;margin-top:5px}\n", ""]);

// exports


/***/ }),
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AppisRequiredPage_vue_vue_type_style_index_0_id_9ebde63c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(44);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AppisRequiredPage_vue_vue_type_style_index_0_id_9ebde63c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AppisRequiredPage_vue_vue_type_style_index_0_id_9ebde63c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AppisRequiredPage_vue_vue_type_style_index_0_id_9ebde63c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, "h1[data-v-9ebde63c]{font-size:14px;font-weight:800;text-transform:uppercase;text-align:center;line-height:1.5}\n", ""]);

// exports


/***/ }),
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuSidebar_vue_vue_type_style_index_0_id_4c2a7f00_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(45);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuSidebar_vue_vue_type_style_index_0_id_4c2a7f00_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuSidebar_vue_vue_type_style_index_0_id_4c2a7f00_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuSidebar_vue_vue_type_style_index_0_id_4c2a7f00_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".menu-sidebar[data-v-4c2a7f00]{position:absolute;height:100%;right:0;top:0;width:270px;background-color:#F7F7F7;padding:30px 38px;box-shadow:-5px 0 5px -4px rgba(0,0,0,0.75);z-index:1000;transform:translateX(103%);transition:all 0.3s ease;user-select:none}.menu-sidebar.visible[data-v-4c2a7f00]{transform:translateX(0%)}.menu-sidebar ul[data-v-4c2a7f00]{list-style:none;margin-top:50px}.menu-sidebar ul li[data-v-4c2a7f00]{margin:24px 0;cursor:pointer}.menu-sidebar ul li span[data-v-4c2a7f00]{text-decoration:none;text-transform:uppercase;font-size:13px;font-weight:800;color:#707070;border-left:transparent 0 solid;transition:all 0.3s ease}.menu-sidebar ul li:hover span[data-v-4c2a7f00]{border-left-color:#0BDCAD;border-left-width:5px;padding-left:5px;border-radius:3px}.menu-sidebar .header[data-v-4c2a7f00]{display:flex;justify-content:space-between;align-items:center}.menu-sidebar .header h1[data-v-4c2a7f00]{color:#CECECE;font-size:20px;margin:0;text-transform:uppercase;font-weight:800}\n", ""]);

// exports


/***/ }),
/* 109 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PremiumBar_vue_vue_type_style_index_0_id_d10760ee_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(46);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PremiumBar_vue_vue_type_style_index_0_id_d10760ee_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PremiumBar_vue_vue_type_style_index_0_id_d10760ee_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PremiumBar_vue_vue_type_style_index_0_id_d10760ee_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".premium-bar[data-v-d10760ee]{height:26px;text-align:center;font-size:15px;text-transform:uppercase;font-weight:800;color:white;display:flex;justify-content:center;align-items:center}.premium-bar.no-premium[data-v-d10760ee]{background-color:#FFB22A;cursor:pointer}.premium-bar.no-premium svg[data-v-d10760ee]{margin:0 10px;transform:scale(0.75);transition:margin-right 0.3s ease-in-out, margin-left 0.3s ease-in-out, transform 0.3s ease-in-out}.premium-bar.no-premium svg path[data-v-d10760ee]{fill:#0BDCAD}.premium-bar.no-premium svg#arrow_left[data-v-d10760ee]{transform:scale(0.75) rotate(180deg)}.premium-bar.no-premium[data-v-d10760ee]:hover{background-color:#dba100}.premium-bar.no-premium:hover svg#arrow_left[data-v-d10760ee]{margin-right:3px;transform:scale(1) rotate(180deg)}.premium-bar.no-premium:hover svg#arrow_right[data-v-d10760ee]{margin-left:3px;transform:scale(1)}.premium-bar.premium[data-v-d10760ee]{background-color:#0BDCAD}\n", ""]);

// exports


/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Header_vue_vue_type_style_index_0_id_5ed841da_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(47);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Header_vue_vue_type_style_index_0_id_5ed841da_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Header_vue_vue_type_style_index_0_id_5ed841da_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Header_vue_vue_type_style_index_0_id_5ed841da_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".header .menu-bar[data-v-5ed841da]{height:83px;background-color:#F7F7F7;display:flex;align-items:center;justify-content:space-between;padding-left:24px;padding-right:24px}.header .menu-bar h1[data-v-5ed841da]{white-space:nowrap;font-size:20px;text-transform:uppercase;font-weight:800;color:#707070}.header .menu-bar .logo[data-v-5ed841da]{width:131px;height:44px}.header .menu-bar .ham[data-v-5ed841da]{width:46px;height:46px}\n", ""]);

// exports


/***/ }),
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Footer_vue_vue_type_style_index_0_id_3da5dde8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(48);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Footer_vue_vue_type_style_index_0_id_3da5dde8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Footer_vue_vue_type_style_index_0_id_3da5dde8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Footer_vue_vue_type_style_index_0_id_3da5dde8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".bottom-bar[data-v-3da5dde8]{height:88px;background-color:#FFB22A;display:flex;justify-content:space-evenly;align-items:center}.bottom-bar.state-on[data-v-3da5dde8]{position:relative}.bottom-bar.state-on .icon--flag[data-v-3da5dde8]{position:absolute;top:17px;left:10px}.bottom-bar.state-on .block-location[data-v-3da5dde8]{position:absolute;left:128px}.bottom-bar.state-on .icon--protected-mini[data-v-3da5dde8]{position:absolute;right:0px;top:5px}.bottom-bar.state-off[data-v-3da5dde8]{position:relative}.bottom-bar.state-off .icon--flag[data-v-3da5dde8]{position:absolute;left:10px}.bottom-bar.state-off .block-location[data-v-3da5dde8]{position:absolute;left:128px}.bottom-bar.state-off .icon--unprotected-mini[data-v-3da5dde8]{position:absolute;right:0px}.bottom-bar .block-location[data-v-3da5dde8]{flex-grow:1;font-weight:700;text-transform:uppercase;color:black;font-size:15px}.time-ago[data-v-3da5dde8]{text-transform:none !important;font-weight:700 !important;color:#887474 !important;font-size:14px !important}.icon--flag[data-v-3da5dde8]{margin:0 25px;width:70px;height:37px}.icon--unprotected-mini[data-v-3da5dde8],.icon--protected-mini[data-v-3da5dde8]{width:40px;height:60px;margin-right:15px}\n", ""]);

// exports


/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Popup_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Popup_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Popup_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Popup_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports
exports.i(__webpack_require__(117), "");

// module
exports.push([module.i, "body{--red: #c62828;--orange: #ef6c00;--yellow: #f9a825;--green: #2e7d32;--blue: #1565c0;--spacing-xs: 5px;--spacing-small: 10px;--spacing-medium: 15px;--spacing-large: 20px;--grey-lighten-5: #fafafa;--grey-lighten-4: #f5f5f5;--grey-lighten-3: #eeeeee;--grey-lighten-2: #e0e0e0;--grey-lighten-1: #bdbdbd;--grey: #9e9e9e;--grey-darken-1: #757575;--grey-darken-2: #616161;--grey-darken-3: #424242;--grey-darken-4: #212121}body .btn.main{font-size:14px;font-weight:800;text-transform:uppercase;display:flex;justify-content:center;align-items:center;color:white;width:207px;height:45px;padding:0 10px;box-shadow:0 0 5px 0 rgba(0,0,0,0.5);background-color:#FFB22A;text-decoration:unset;cursor:pointer;text-align:center;transition:all 0.3s ease}body .btn.main.hidden{pointer-events:none;opacity:0}body .btn.main.gold{background-color:#FFB22A}body .btn.main.gold:hover{background-color:#dba100}body .btn.main.color{background-color:#0BDCAD}body .btn.main.color:hover{background-color:#00c79a}body .btn.main.gray{background-color:#BEBEBE}body .btn.main.gray:hover{background-color:#a3a3a3}body .m-xs{margin:5px !important}body .mt-xs{margin-top:5px !important}body .mb-xs{margin-bottom:5px !important}body .ml-xs{margin-left:5px !important}body .mr-xs{margin-right:5px !important}body .mv-xs{margin-top:5px !important;margin-bottom:5px !important}body .mh-xs{margin-left:5px !important;margin-right:5px !important}body .p-xs{padding:5px !important}body .pt-xs{padding-top:5px !important}body .pb-xs{padding-bottom:5px !important}body .pl-xs{padding-left:5px !important}body .pr-xs{padding-right:5px !important}body .pv-xs{padding-top:5px !important;padding-bottom:5px !important}body .ph-xs{padding-left:5px !important;padding-right:5px !important}body .m-small{margin:10px !important}body .mt-small{margin-top:10px !important}body .mb-small{margin-bottom:10px !important}body .ml-small{margin-left:10px !important}body .mr-small{margin-right:10px !important}body .mv-small{margin-top:10px !important;margin-bottom:10px !important}body .mh-small{margin-left:10px !important;margin-right:10px !important}body .p-small{padding:10px !important}body .pt-small{padding-top:10px !important}body .pb-small{padding-bottom:10px !important}body .pl-small{padding-left:10px !important}body .pr-small{padding-right:10px !important}body .pv-small{padding-top:10px !important;padding-bottom:10px !important}body .ph-small{padding-left:10px !important;padding-right:10px !important}body .m-medium{margin:15px !important}body .mt-medium{margin-top:15px !important}body .mb-medium{margin-bottom:15px !important}body .ml-medium{margin-left:15px !important}body .mr-medium{margin-right:15px !important}body .mv-medium{margin-top:15px !important;margin-bottom:15px !important}body .mh-medium{margin-left:15px !important;margin-right:15px !important}body .p-medium{padding:15px !important}body .pt-medium{padding-top:15px !important}body .pb-medium{padding-bottom:15px !important}body .pl-medium{padding-left:15px !important}body .pr-medium{padding-right:15px !important}body .pv-medium{padding-top:15px !important;padding-bottom:15px !important}body .ph-medium{padding-left:15px !important;padding-right:15px !important}body .m-large{margin:20px !important}body .mt-large{margin-top:20px !important}body .mb-large{margin-bottom:20px !important}body .ml-large{margin-left:20px !important}body .mr-large{margin-right:20px !important}body .mv-large{margin-top:20px !important;margin-bottom:20px !important}body .mh-large{margin-left:20px !important;margin-right:20px !important}body .p-large{padding:20px !important}body .pt-large{padding-top:20px !important}body .pb-large{padding-bottom:20px !important}body .pl-large{padding-left:20px !important}body .pr-large{padding-right:20px !important}body .pv-large{padding-top:20px !important;padding-bottom:20px !important}body .ph-large{padding-left:20px !important;padding-right:20px !important}body .m-xl{margin:40px !important}body .mt-xl{margin-top:40px !important}body .mb-xl{margin-bottom:40px !important}body .ml-xl{margin-left:40px !important}body .mr-xl{margin-right:40px !important}body .mv-xl{margin-top:40px !important;margin-bottom:40px !important}body .mh-xl{margin-left:40px !important;margin-right:40px !important}body .p-xl{padding:40px !important}body .pt-xl{padding-top:40px !important}body .pb-xl{padding-bottom:40px !important}body .pl-xl{padding-left:40px !important}body .pr-xl{padding-right:40px !important}body .pv-xl{padding-top:40px !important;padding-bottom:40px !important}body .ph-xl{padding-left:40px !important;padding-right:40px !important}body .no-margin{margin:0 !important}body .mb-no{margin-bottom:0 !important}body .no-padding{padding:0 !important}body .margin{max-width:260px;margin:0 auto}body .space-beetween{justify-content:space-between}body .space-evenly{justify-content:space-evenly}body .vertical-center{align-items:center}body .horizontal-center{justify-content:center}body .flex{display:flex}body .full-height{height:100%}body .full-width{width:100%}body .column{flex-direction:column}body .auto-height{height:auto !important}body .text-primary{font-family:Roboto, Arial, sans-serif;user-select:none;color:var(--grey-darken-1);font-size:14px;line-height:16px}body .text-secondary{font-family:'Helvetica Neue', Arial, sans-serif;font-size:12px;line-height:14px;font-weight:400;color:var(--grey-darken-1)}body .text-gold{color:#FFB22A;font-weight:800}body .text-black{color:black;font-weight:800}body .text-color-dark{color:var(--grey-darken-3) !important}body .text-color-darker{color:var(--grey-darken-2) !important}body .text-color-lighter{color:var(--grey) !important}body .text-color-light{color:var(--grey-lighten-1) !important}body .text-color-lightest{color:var(--grey-lighten-2) !important}body .text-center{text-align:center !important}body .text-uppercase{text-transform:uppercase !important}body .text-italic{font-style:italic !important}body .text-bolder{font-weight:500 !important}body .text-bold{font-weight:700 !important}body .text-largest{font-size:18px !important;line-height:20px !important}body .text-large{font-size:16px !important;line-height:18px !important}body .text-larger{font-size:15px !important;line-height:17px !important}body .text-normal{font-size:14px !important;line-height:16px !important}body .text-smaller{font-size:13px !important;line-height:15px !important}body .text-small{font-size:12px !important;line-height:14px !important}body .text-smallest{font-size:11px !important;line-height:13px !important}body .header-1{font-family:'Open Sans', sans-serif;font-size:20px;line-height:24px;color:var(--grey-darken-3);margin-bottom:13.33333px}body .header-2{font-family:'Open Sans', sans-serif;font-size:18px;line-height:22px;color:var(--grey-darken-3);margin-bottom:12px}body .header-3{font-family:'Open Sans', sans-serif;font-size:16px;line-height:20px;color:var(--grey-darken-3);margin-bottom:10.66667px}body .smooth-scrollbars ::-webkit-scrollbar{width:3px;height:3px;background-color:white}body .smooth-scrollbars ::-webkit-scrollbar-thumb{background:var(--grey-lighten-1);border-radius:3px}body .line-clamp-1{overflow-y:hidden !important;display:-webkit-box !important;-webkit-line-clamp:1 !important;-webkit-box-orient:vertical !important}body .line-clamp-2{overflow-y:hidden !important;display:-webkit-box !important;-webkit-line-clamp:2 !important;-webkit-box-orient:vertical !important}body .line-clamp-3{overflow-y:hidden !important;display:-webkit-box !important;-webkit-line-clamp:3 !important;-webkit-box-orient:vertical !important}body .line-clamp-4{overflow-y:hidden !important;display:-webkit-box !important;-webkit-line-clamp:4 !important;-webkit-box-orient:vertical !important}body .separator-bottom{border-bottom:1px solid var(--grey-lighten-2)}body .separator{border-bottom:1px solid var(--grey-lighten-2);width:100%}\n", ""]);

// exports


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, "/**\n * gemini-scrollbar\n * @version 1.5.3\n * @link http://noeldelgado.github.io/gemini-scrollbar/\n * @license MIT\n */\n\n/* disable selection while dragging */\n.gm-scrollbar-disable-selection {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n/* fallback for native floating scrollbars */\n.gm-prevented {\n  -webkit-overflow-scrolling: touch;\n}\n.gm-prevented > .gm-scrollbar {\n  display: none;\n}\n\n/* actual gemini-scrollbar styles */\n.gm-scrollbar-container {\n  position: relative;\n  overflow: hidden!important;\n  width: 100%;\n  height: 100%;\n}\n\n.gm-scrollbar {\n  position: absolute;\n  right: 2px;\n  bottom: 2px;\n  z-index: 1;\n  border-radius: 3px;\n}\n\n.gm-scrollbar.-vertical {\n  width: 6px;\n  top: 2px;\n}\n\n.gm-scrollbar.-horizontal {\n  height: 6px;\n  left: 2px;\n}\n\n.gm-scrollbar .thumb {\n  position: relative;\n  display: block;\n  width: 0;\n  height: 0;\n  cursor: pointer;\n  border-radius: inherit;\n  background-color: rgba(0,0,0,.2);\n  transform: translate3d(0,0,0);\n}\n\n.gm-scrollbar .thumb:hover,\n.gm-scrollbar .thumb:active {\n  background-color: rgba(0,0,0,.3);\n}\n\n.gm-scrollbar.-vertical .thumb {\n  width: 100%;\n}\n\n.gm-scrollbar.-horizontal .thumb {\n  height: 100%;\n}\n\n.gm-scrollbar-container .gm-scroll-view {\n  width: 100%;\n  height: 100%;\n  overflow: scroll;\n  transform: translate3d(0,0,0);\n  -webkit-overflow-scrolling: touch;\n}\n\n/* @option: autoshow */\n.gm-scrollbar-container.gm-autoshow .gm-scrollbar {\n  opacity: 0;\n  transition: opacity 120ms ease-out;\n}\n.gm-scrollbar-container.gm-autoshow:hover > .gm-scrollbar,\n.gm-scrollbar-container.gm-autoshow:active > .gm-scrollbar,\n.gm-scrollbar-container.gm-autoshow:focus > .gm-scrollbar {\n  opacity: 1;\n  transition: opacity 340ms ease-out;\n}\n\n.gm-resize-trigger {\n  position: absolute;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  overflow: hidden;\n  pointer-events: none;\n  z-index: -1;\n  opacity: 0;\n}\n", ""]);

// exports


/***/ }),
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Popup_vue_vue_type_style_index_1_id_5f4bbcc0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(50);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Popup_vue_vue_type_style_index_1_id_5f4bbcc0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Popup_vue_vue_type_style_index_1_id_5f4bbcc0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Popup_vue_vue_type_style_index_1_id_5f4bbcc0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".popup[data-v-5f4bbcc0]{display:flex;flex-direction:column;height:100vh;overflow-y:hidden}.popup .container[data-v-5f4bbcc0],.popup .loader[data-v-5f4bbcc0]{flex-grow:1}.popup .loader[data-v-5f4bbcc0]{display:flex;flex-direction:column;align-items:center;justify-content:center}\n", ""]);

// exports


/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.min.js
var vue_min = __webpack_require__(17);
var vue_min_default = /*#__PURE__*/__webpack_require__.n(vue_min);

// CONCATENATED MODULE: ./node_modules/vuex/dist/vuex.esm.js
/*!
 * vuex v3.5.1
 * (c) 2020 Evan You
 * @license MIT
 */
function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
function find (list, f) {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
function deepCopy (obj, cache) {
  if ( cache === void 0 ) cache = [];

  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  var hit = find(cache, function (c) { return c.original === obj; });
  if (hit) {
    return hit.copy
  }

  var copy = Array.isArray(obj) ? [] : {};
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy: copy
  });

  Object.keys(obj).forEach(function (key) {
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy
}

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((false)) {}

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  var child = parent.getChild(key);

  if (!child) {
    if ((false)) {}
    return
  }

  if (!child.runtime) {
    return
  }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  return parent.hasChild(key)
};

function update (path, targetModule, newModule) {
  if ((false)) {}

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((false)) {}
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((false)) {}

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((false)) {}
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((false)) {}
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    false
  ) {}
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((false)) {}
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((false)) {}
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((false)) {}
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((false)) {}
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((false)) {}
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((false)) {}

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((false)) {}

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((false)) {}

  return this._modules.isRegistered(path)
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("production" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((false)) {}
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (false) {}
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (false) {}
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((false)) {}
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((false)) {}
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((false)) {}

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((false)) {}
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (false) {}
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (false) {}
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (false) {}
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (false) {}
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (false) {}
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (false) {}
  return module
}

// Credits: borrowed code from fcomb/redux-logger

function createLogger (ref) {
  if ( ref === void 0 ) ref = {};
  var collapsed = ref.collapsed; if ( collapsed === void 0 ) collapsed = true;
  var filter = ref.filter; if ( filter === void 0 ) filter = function (mutation, stateBefore, stateAfter) { return true; };
  var transformer = ref.transformer; if ( transformer === void 0 ) transformer = function (state) { return state; };
  var mutationTransformer = ref.mutationTransformer; if ( mutationTransformer === void 0 ) mutationTransformer = function (mut) { return mut; };
  var actionFilter = ref.actionFilter; if ( actionFilter === void 0 ) actionFilter = function (action, state) { return true; };
  var actionTransformer = ref.actionTransformer; if ( actionTransformer === void 0 ) actionTransformer = function (act) { return act; };
  var logMutations = ref.logMutations; if ( logMutations === void 0 ) logMutations = true;
  var logActions = ref.logActions; if ( logActions === void 0 ) logActions = true;
  var logger = ref.logger; if ( logger === void 0 ) logger = console;

  return function (store) {
    var prevState = deepCopy(store.state);

    if (typeof logger === 'undefined') {
      return
    }

    if (logMutations) {
      store.subscribe(function (mutation, state) {
        var nextState = deepCopy(state);

        if (filter(mutation, prevState, nextState)) {
          var formattedTime = getFormattedTime();
          var formattedMutation = mutationTransformer(mutation);
          var message = "mutation " + (mutation.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c prev state', 'color: #9E9E9E; font-weight: bold', transformer(prevState));
          logger.log('%c mutation', 'color: #03A9F4; font-weight: bold', formattedMutation);
          logger.log('%c next state', 'color: #4CAF50; font-weight: bold', transformer(nextState));
          endMessage(logger);
        }

        prevState = nextState;
      });
    }

    if (logActions) {
      store.subscribeAction(function (action, state) {
        if (actionFilter(action, state)) {
          var formattedTime = getFormattedTime();
          var formattedAction = actionTransformer(action);
          var message = "action " + (action.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c action', 'color: #03A9F4; font-weight: bold', formattedAction);
          endMessage(logger);
        }
      });
    }
  }
}

function startMessage (logger, message, collapsed) {
  var startMessage = collapsed
    ? logger.groupCollapsed
    : logger.group;

  // render
  try {
    startMessage.call(logger, message);
  } catch (e) {
    logger.log(message);
  }
}

function endMessage (logger) {
  try {
    logger.groupEnd();
  } catch (e) {
    logger.log('—— log end ——');
  }
}

function getFormattedTime () {
  var time = new Date();
  return (" @ " + (pad(time.getHours(), 2)) + ":" + (pad(time.getMinutes(), 2)) + ":" + (pad(time.getSeconds(), 2)) + "." + (pad(time.getMilliseconds(), 3)))
}

function repeat (str, times) {
  return (new Array(times + 1)).join(str)
}

function pad (num, maxLength) {
  return repeat('0', maxLength - num.toString().length) + num
}

var index = {
  Store: Store,
  install: install,
  version: '3.5.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers,
  createLogger: createLogger
};

/* harmony default export */ var vuex_esm = (index);


// EXTERNAL MODULE: ./src/js/popup.js
var popup = __webpack_require__(5);

// EXTERNAL MODULE: ./src/js/storage.js + 1 modules
var storage = __webpack_require__(0);

// CONCATENATED MODULE: ./src/popup/store/system.js

const NS_SYSTEM = 'NS_SYSTEM';
/* harmony default export */ var system = ({
  namespaced: true,
  state: {
    protected: false,
    useResidentialIPs: false
  },
  getters: {
    protected: state => state.protected,
    useResidentialIPs: state => state.useResidentialIPs
  },
  actions: {
    setProtected({
      commit
    }, val) {
      commit('SET_PROTECTED', val);
    },

    setUseResidentialIPs({
      commit
    }, val) {
      commit('SET_USE_RESIDENTIAL_IPS', val);
    }

  },
  mutations: {
    SET_PROTECTED(state, val) {
      state.protected = val;
    },

    SET_USE_RESIDENTIAL_IPS(state, val) {
      state.useResidentialIPs = val;
      storage["a" /* Storage */].settings.setResidentialChecked(val);
    }

  }
});
// CONCATENATED MODULE: ./src/popup/store/settings.js

const NS_SETTINGS = 'SETTINGS';
/* harmony default export */ var settings = ({
  namespaced: true,
  state: {
    advancedAnalysing: storage["a" /* Storage */].settings.getAdvancedAnalysing()
  },
  getters: {
    advancedAnalysing: state => state.advancedAnalysing
  },
  actions: {
    setAdvancedAnalysing({
      commit
    }, val) {
      commit('SET_ADVANCED_ANALYSING', val);
    }

  },
  mutations: {
    SET_ADVANCED_ANALYSING(state, val) {
      state.advancedAnalysing = val;
      storage["a" /* Storage */].settings.setAdvancedAnalysing(val);
    }

  }
});
// CONCATENATED MODULE: ./src/popup/store/ui.js
const NS_UI = 'UI';
/* harmony default export */ var ui = ({
  namespaced: true,
  state: {
    menuVisible: false,
    message: null
  },
  getters: {
    menuVisible: state => state.menuVisible,
    message: state => state.message
  },
  actions: {
    setMenuVisible({
      commit
    }, val) {
      commit('SET_MENU_VISIBLE', val);
    },

    setMessage({
      commit
    }, message) {
      commit('SET_MESSAGE', message);
    }

  },
  mutations: {
    SET_MENU_VISIBLE(state, val) {
      state.menuVisible = val;
    },

    SET_MESSAGE(state, message) {
      state.message = message;
    }

  }
});
// CONCATENATED MODULE: ./src/popup/store/index.js


vue_min_default.a.use(vuex_esm);




const store = new vuex_esm.Store({
  modules: {
    [NS_SYSTEM]: system,
    [NS_SETTINGS]: settings,
    [NS_UI]: ui
  },
  state: {
    user: null,
    lastTimeChanged: '',
    premiumActive: false,
    location: storage["a" /* Storage */].user.getLocation() || {}
  },
  getters: {
    user: state => state.user,
    lastTimeChanged: state => state.lastTimeChanged,
    premiumActive: state => state.premiumActive,
    location: state => state.location
  },
  actions: {
    setUser({
      commit
    }, user) {
      commit('SET_USER', user);
    },

    setPremiumActive({
      commit
    }, status) {
      commit('SET_PREMIUM_ACTIVE', status);
    },

    setLocation({
      commit
    }, location) {
      commit('SET_LOCATION', location);
    },

    setLastTimeChanged({
      commit
    }, time) {
      commit('SET_LAST_TIME_CHANGED', time);
    }

  },
  mutations: {
    SET_USER(state, user) {
      storage["a" /* Storage */].user.setUser(user).then(() => {
        state.user = user;
      });
    },

    SET_PREMIUM_ACTIVE(state, status) {
      state.premiumActive = status;
    },

    SET_LAST_TIME_CHANGED(state, time) {
      state.lastTimeChanged = time;
    },

    SET_LOCATION(state, location) {
      state.location = location;
    }

  }
}); // Storage.user.onLocationChange(location => {
//   console.log('Storage.user.onLocationChange: ', location);
//   console.log('store: ', store);
//   store.dispatch('setLocation', location);
// });

storage["a" /* Storage */].user.onPremiumChange(isPremium => {
  console.log('onPremiumChange isPremium: ', isPremium);
  store.dispatch('setPremiumActive', isPremium);
});
console.log('Loading ~isResidentialChecked~ ');
storage["a" /* Storage */].settings.isResidentialChecked().then(isResidential => {
  console.log('isResidential: ', isResidential);
  store.dispatch(`${NS_SYSTEM}/setUseResidentialIPs`, isResidential);
});

(async () => {
  const isPremium = await storage["a" /* Storage */].user.isPremium();
  store.dispatch('setPremiumActive', isPremium);
})(); // export const loadNotifications = async (user) => {
//   console.log('~loadNotifications~');
//
//   const response = await Messages.toBackground().getNotifications(user.email);
//
//   if (response.success) {
//     store.dispatch('setNotifications', response.data);
//   }
// };
//
// if (user) {
//   loadNotifications(user);
// }


/* harmony default export */ var popup_store = (store);
// CONCATENATED MODULE: ./node_modules/vue-router/dist/vue-router.esm.js
/*!
  * vue-router v3.3.4
  * (c) 2020 Evan You
  * @license MIT
  */
/*  */

function vue_router_esm_assert (condition, message) {
  if (!condition) {
    throw new Error(("[vue-router] " + message))
  }
}

function warn (condition, message) {
  if (false) {}
}

function isError (err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1
}

function isRouterError (err, errorType) {
  return isError(err) && err._isRouter && (errorType == null || err.type === errorType)
}

function extend (a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a
}

var View = {
  name: 'RouterView',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render (_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    // used by devtools to display a router-view badge
    data.routerView = true;

    // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots
    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent && parent._routerRoot !== parent) {
      var vnodeData = parent.$vnode ? parent.$vnode.data : {};
      if (vnodeData.routerView) {
        depth++;
      }
      if (vnodeData.keepAlive && parent._directInactive && parent._inactive) {
        inactive = true;
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      var cachedData = cache[name];
      var cachedComponent = cachedData && cachedData.component;
      if (cachedComponent) {
        // #2301
        // pass props
        if (cachedData.configProps) {
          fillPropsinData(cachedComponent, data, cachedData.route, cachedData.configProps);
        }
        return h(cachedComponent, data, children)
      } else {
        // render previous empty view
        return h()
      }
    }

    var matched = route.matched[depth];
    var component = matched && matched.components[name];

    // render empty node if no matched route or no config component
    if (!matched || !component) {
      cache[name] = null;
      return h()
    }

    // cache component
    cache[name] = { component: component };

    // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks
    data.registerRouteInstance = function (vm, val) {
      // val could be undefined for unregistration
      var current = matched.instances[name];
      if (
        (val && current !== vm) ||
        (!val && current === vm)
      ) {
        matched.instances[name] = val;
      }
    }

    // also register instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;(data.hook || (data.hook = {})).prepatch = function (_, vnode) {
      matched.instances[name] = vnode.componentInstance;
    };

    // register instance in init hook
    // in case kept-alive component be actived when routes changed
    data.hook.init = function (vnode) {
      if (vnode.data.keepAlive &&
        vnode.componentInstance &&
        vnode.componentInstance !== matched.instances[name]
      ) {
        matched.instances[name] = vnode.componentInstance;
      }
    };

    var configProps = matched.props && matched.props[name];
    // save route and configProps in cachce
    if (configProps) {
      extend(cache[name], {
        route: route,
        configProps: configProps
      });
      fillPropsinData(component, data, route, configProps);
    }

    return h(component, data, children)
  }
};

function fillPropsinData (component, data, route, configProps) {
  // resolve props
  var propsToPass = data.props = resolveProps(route, configProps);
  if (propsToPass) {
    // clone to prevent mutation
    propsToPass = data.props = extend({}, propsToPass);
    // pass non-declared props as attrs
    var attrs = data.attrs = data.attrs || {};
    for (var key in propsToPass) {
      if (!component.props || !(key in component.props)) {
        attrs[key] = propsToPass[key];
        delete propsToPass[key];
      }
    }
  }
}

function resolveProps (route, config) {
  switch (typeof config) {
    case 'undefined':
      return
    case 'object':
      return config
    case 'function':
      return config(route)
    case 'boolean':
      return config ? route.params : undefined
    default:
      if (false) {}
  }
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function (str) { return encodeURIComponent(str)
  .replace(encodeReserveRE, encodeReserveReplacer)
  .replace(commaRE, ','); };

var decode = decodeURIComponent;

function resolveQuery (
  query,
  extraQuery,
  _parseQuery
) {
  if ( extraQuery === void 0 ) extraQuery = {};

  var parse = _parseQuery || parseQuery;
  var parsedQuery;
  try {
    parsedQuery = parse(query || '');
  } catch (e) {
     false && false;
    parsedQuery = {};
  }
  for (var key in extraQuery) {
    parsedQuery[key] = extraQuery[key];
  }
  return parsedQuery
}

function parseQuery (query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0
      ? decode(parts.join('='))
      : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res
}

function stringifyQuery (obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return ''
    }

    if (val === null) {
      return encode(key)
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&')
    }

    return encode(key) + '=' + encode(val)
  }).filter(function (x) { return x.length > 0; }).join('&') : null;
  return res ? ("?" + res) : ''
}

/*  */

var trailingSlashRE = /\/?$/;

function createRoute (
  record,
  location,
  redirectedFrom,
  router
) {
  var stringifyQuery = router && router.options.stringifyQuery;

  var query = location.query || {};
  try {
    query = clone(query);
  } catch (e) {}

  var route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: query,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery);
  }
  return Object.freeze(route)
}

function clone (value) {
  if (Array.isArray(value)) {
    return value.map(clone)
  } else if (value && typeof value === 'object') {
    var res = {};
    for (var key in value) {
      res[key] = clone(value[key]);
    }
    return res
  } else {
    return value
  }
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch (record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res
}

function getFullPath (
  ref,
  _stringifyQuery
) {
  var path = ref.path;
  var query = ref.query; if ( query === void 0 ) query = {};
  var hash = ref.hash; if ( hash === void 0 ) hash = '';

  var stringify = _stringifyQuery || stringifyQuery;
  return (path || '/') + stringify(query) + hash
}

function isSameRoute (a, b) {
  if (b === START) {
    return a === b
  } else if (!b) {
    return false
  } else if (a.path && b.path) {
    return (
      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query)
    )
  } else if (a.name && b.name) {
    return (
      a.name === b.name &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query) &&
      isObjectEqual(a.params, b.params)
    )
  } else {
    return false
  }
}

function isObjectEqual (a, b) {
  if ( a === void 0 ) a = {};
  if ( b === void 0 ) b = {};

  // handle null value #1566
  if (!a || !b) { return a === b }
  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every(function (key) {
    var aVal = a[key];
    var bVal = b[key];
    // check nested equality
    if (typeof aVal === 'object' && typeof bVal === 'object') {
      return isObjectEqual(aVal, bVal)
    }
    return String(aVal) === String(bVal)
  })
}

function isIncludedRoute (current, target) {
  return (
    current.path.replace(trailingSlashRE, '/').indexOf(
      target.path.replace(trailingSlashRE, '/')
    ) === 0 &&
    (!target.hash || current.hash === target.hash) &&
    queryIncludes(current.query, target.query)
  )
}

function queryIncludes (current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false
    }
  }
  return true
}

/*  */

function resolvePath (
  relative,
  base,
  append
) {
  var firstChar = relative.charAt(0);
  if (firstChar === '/') {
    return relative
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/')
}

function parsePath (path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  }
}

function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

var isarray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Expose `pathToRegexp`.
 */
var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options), options)
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens, options) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$', flags(options));
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment;
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options && options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}
pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

/*  */

// $flow-disable-line
var regexpCompileCache = Object.create(null);

function fillParams (
  path,
  params,
  routeMsg
) {
  params = params || {};
  try {
    var filler =
      regexpCompileCache[path] ||
      (regexpCompileCache[path] = pathToRegexp_1.compile(path));

    // Fix #2505 resolving asterisk routes { name: 'not-found', params: { pathMatch: '/not-found' }}
    // and fix #3106 so that you can work with location descriptor object having params.pathMatch equal to empty string
    if (typeof params.pathMatch === 'string') { params[0] = params.pathMatch; }

    return filler(params, { pretty: true })
  } catch (e) {
    if (false) {}
    return ''
  } finally {
    // delete the 0 if it was added
    delete params[0];
  }
}

/*  */

function normalizeLocation (
  raw,
  current,
  append,
  router
) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next._normalized) {
    return next
  } else if (next.name) {
    next = extend({}, raw);
    var params = next.params;
    if (params && typeof params === 'object') {
      next.params = extend({}, params);
    }
    return next
  }

  // relative params
  if (!next.path && next.params && current) {
    next = extend({}, next);
    next._normalized = true;
    var params$1 = extend(extend({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params$1;
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params$1, ("path " + (current.path)));
    } else if (false) {}
    return next
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = (current && current.path) || '/';
  var path = parsedPath.path
    ? resolvePath(parsedPath.path, basePath, append || next.append)
    : basePath;

  var query = resolveQuery(
    parsedPath.query,
    next.query,
    router && router.options.parseQuery
  );

  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  }
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var noop = function () {};

var Link = {
  name: 'RouterLink',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    ariaCurrentValue: {
      type: String,
      default: 'page'
    },
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render (h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(
      this.to,
      current,
      this.append
    );
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;

    var classes = {};
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass;
    // Support global empty active class
    var activeClassFallback =
      globalActiveClass == null ? 'router-link-active' : globalActiveClass;
    var exactActiveClassFallback =
      globalExactActiveClass == null
        ? 'router-link-exact-active'
        : globalExactActiveClass;
    var activeClass =
      this.activeClass == null ? activeClassFallback : this.activeClass;
    var exactActiveClass =
      this.exactActiveClass == null
        ? exactActiveClassFallback
        : this.exactActiveClass;

    var compareTarget = route.redirectedFrom
      ? createRoute(null, normalizeLocation(route.redirectedFrom), null, router)
      : route;

    classes[exactActiveClass] = isSameRoute(current, compareTarget);
    classes[activeClass] = this.exact
      ? classes[exactActiveClass]
      : isIncludedRoute(current, compareTarget);

    var ariaCurrentValue = classes[exactActiveClass] ? this.ariaCurrentValue : null;

    var handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location, noop);
        } else {
          router.push(location, noop);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) {
        on[e] = handler;
      });
    } else {
      on[this.event] = handler;
    }

    var data = { class: classes };

    var scopedSlot =
      !this.$scopedSlots.$hasNormal &&
      this.$scopedSlots.default &&
      this.$scopedSlots.default({
        href: href,
        route: route,
        navigate: handler,
        isActive: classes[activeClass],
        isExactActive: classes[exactActiveClass]
      });

    if (scopedSlot) {
      if (scopedSlot.length === 1) {
        return scopedSlot[0]
      } else if (scopedSlot.length > 1 || !scopedSlot.length) {
        if (false) {}
        return scopedSlot.length === 0 ? h() : h('span', {}, scopedSlot)
      }
    }

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href, 'aria-current': ariaCurrentValue };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var aData = (a.data = extend({}, a.data));
        aData.on = aData.on || {};
        // transform existing events in both objects into arrays so we can push later
        for (var event in aData.on) {
          var handler$1 = aData.on[event];
          if (event in on) {
            aData.on[event] = Array.isArray(handler$1) ? handler$1 : [handler$1];
          }
        }
        // append new listeners for router-link
        for (var event$1 in on) {
          if (event$1 in aData.on) {
            // on[event] is always a function
            aData.on[event$1].push(on[event$1]);
          } else {
            aData.on[event$1] = handler;
          }
        }

        var aAttrs = (a.data.attrs = extend({}, a.data.attrs));
        aAttrs.href = href;
        aAttrs['aria-current'] = ariaCurrentValue;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default)
  }
};

function guardEvent (e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) { return }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) { return }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) { return }
  // don't redirect if `target="_blank"`
  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute('target');
    if (/\b_blank\b/i.test(target)) { return }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true
}

function findAnchor (children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child
      }
    }
  }
}

var _Vue;

function vue_router_esm_install (Vue) {
  if (vue_router_esm_install.installed && _Vue === Vue) { return }
  vue_router_esm_install.installed = true;

  _Vue = Vue;

  var isDef = function (v) { return v !== undefined; };

  var registerInstance = function (vm, callVal) {
    var i = vm.$options._parentVnode;
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
      }
      registerInstance(this, this);
    },
    destroyed: function destroyed () {
      registerInstance(this);
    }
  });

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get () { return this._routerRoot._router }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get () { return this._routerRoot._route }
  });

  Vue.component('RouterView', View);
  Vue.component('RouterLink', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

function createRouteMap (
  routes,
  oldPathList,
  oldPathMap,
  oldNameMap
) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || [];
  // $flow-disable-line
  var pathMap = oldPathMap || Object.create(null);
  // $flow-disable-line
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  });

  // ensure wildcard routes are always at the end
  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }

  if (false) { var pathNames, found; }

  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  }
}

function addRouteRecord (
  pathList,
  pathMap,
  nameMap,
  route,
  parent,
  matchAs
) {
  var path = route.path;
  var name = route.name;
  if (false) {}

  var pathToRegexpOptions =
    route.pathToRegexpOptions || {};
  var normalizedPath = normalizePath(path, parent, pathToRegexpOptions.strict);

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }

  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props:
      route.props == null
        ? {}
        : route.components
          ? route.props
          : { default: route.props }
  };

  if (route.children) {
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (false) {}
    route.children.forEach(function (child) {
      var childMatchAs = matchAs
        ? cleanPath((matchAs + "/" + (child.path)))
        : undefined;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (route.alias !== undefined) {
    var aliases = Array.isArray(route.alias) ? route.alias : [route.alias];
    for (var i = 0; i < aliases.length; ++i) {
      var alias = aliases[i];
      if (false) {}

      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(
        pathList,
        pathMap,
        nameMap,
        aliasRoute,
        parent,
        record.path || '/' // matchAs
      );
    }
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if (false) {}
  }
}

function compileRouteRegex (
  path,
  pathToRegexpOptions
) {
  var regex = pathToRegexp_1(path, [], pathToRegexpOptions);
  if (false) { var keys; }
  return regex
}

function normalizePath (
  path,
  parent,
  strict
) {
  if (!strict) { path = path.replace(/\/$/, ''); }
  if (path[0] === '/') { return path }
  if (parent == null) { return path }
  return cleanPath(((parent.path) + "/" + path))
}

/*  */



function createMatcher (
  routes,
  router
) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes (routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }

  function match (
    raw,
    currentRoute,
    redirectedFrom
  ) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (false) {}
      if (!record) { return _createRoute(null, location) }
      var paramNames = record.regex.keys
        .filter(function (key) { return !key.optional; })
        .map(function (key) { return key.name; });

      if (typeof location.params !== 'object') {
        location.params = {};
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""));
      return _createRoute(record, location, redirectedFrom)
    } else if (location.path) {
      location.params = {};
      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];
        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }

  function redirect (
    record,
    location
  ) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function'
      ? originalRedirect(createRoute(record, location, null, router))
      : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || typeof redirect !== 'object') {
      if (false) {}
      return _createRoute(null, location)
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      if (false) {}
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location)
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""));
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location)
    } else {
      if (false) {}
      return _createRoute(null, location)
    }
  }

  function alias (
    record,
    location,
    matchAs
  ) {
    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""));
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location)
    }
    return _createRoute(null, location)
  }

  function _createRoute (
    record,
    location,
    redirectedFrom
  ) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom, router)
  }

  return {
    match: match,
    addRoutes: addRoutes
  }
}

function matchRoute (
  regex,
  path,
  params
) {
  var m = path.match(regex);

  if (!m) {
    return false
  } else if (!params) {
    return true
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) {
      // Fix #1994: using * with props: true generates a param named 0
      params[key.name || 'pathMatch'] = val;
    }
  }

  return true
}

function resolveRecordPath (path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true)
}

/*  */

// use User Timing api (if present) for more accurate key precision
var Time =
  inBrowser && window.performance && window.performance.now
    ? window.performance
    : Date;

function genStateKey () {
  return Time.now().toFixed(3)
}

var _key = genStateKey();

function getStateKey () {
  return _key
}

function setStateKey (key) {
  return (_key = key)
}

/*  */

var positionStore = Object.create(null);

function setupScroll () {
  // Prevent browser scroll behavior on History popstate
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }
  // Fix for #1585 for Firefox
  // Fix for #2195 Add optional third attribute to workaround a bug in safari https://bugs.webkit.org/show_bug.cgi?id=182678
  // Fix for #2774 Support for apps loaded from Windows file shares not mapped to network drives: replaced location.origin with
  // window.location.protocol + '//' + window.location.host
  // location.host contains the port and location.hostname doesn't
  var protocolAndPath = window.location.protocol + '//' + window.location.host;
  var absolutePath = window.location.href.replace(protocolAndPath, '');
  // preserve existing history state as it could be overriden by the user
  var stateCopy = extend({}, window.history.state);
  stateCopy.key = getStateKey();
  window.history.replaceState(stateCopy, '', absolutePath);
  window.addEventListener('popstate', handlePopState);
  return function () {
    window.removeEventListener('popstate', handlePopState);
  }
}

function handleScroll (
  router,
  to,
  from,
  isPop
) {
  if (!router.app) {
    return
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return
  }

  if (false) {}

  // wait until re-render finishes before scrolling
  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior.call(
      router,
      to,
      from,
      isPop ? position : null
    );

    if (!shouldScroll) {
      return
    }

    if (typeof shouldScroll.then === 'function') {
      shouldScroll
        .then(function (shouldScroll) {
          scrollToPosition((shouldScroll), position);
        })
        .catch(function (err) {
          if (false) {}
        });
    } else {
      scrollToPosition(shouldScroll, position);
    }
  });
}

function saveScrollPosition () {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function handlePopState (e) {
  saveScrollPosition();
  if (e.state && e.state.key) {
    setStateKey(e.state.key);
  }
}

function getScrollPosition () {
  var key = getStateKey();
  if (key) {
    return positionStore[key]
  }
}

function getElementPosition (el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  }
}

function isValidPosition (obj) {
  return isNumber(obj.x) || isNumber(obj.y)
}

function normalizePosition (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  }
}

function normalizeOffset (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
  }
}

function isNumber (v) {
  return typeof v === 'number'
}

var hashStartsWithNumberRE = /^#\d/;

function scrollToPosition (shouldScroll, position) {
  var isObject = typeof shouldScroll === 'object';
  if (isObject && typeof shouldScroll.selector === 'string') {
    // getElementById would still fail if the selector contains a more complicated query like #main[data-attr]
    // but at the same time, it doesn't make much sense to select an element with an id and an extra selector
    var el = hashStartsWithNumberRE.test(shouldScroll.selector) // $flow-disable-line
      ? document.getElementById(shouldScroll.selector.slice(1)) // $flow-disable-line
      : document.querySelector(shouldScroll.selector);

    if (el) {
      var offset =
        shouldScroll.offset && typeof shouldScroll.offset === 'object'
          ? shouldScroll.offset
          : {};
      offset = normalizeOffset(offset);
      position = getElementPosition(el, offset);
    } else if (isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }
  } else if (isObject && isValidPosition(shouldScroll)) {
    position = normalizePosition(shouldScroll);
  }

  if (position) {
    window.scrollTo(position.x, position.y);
  }
}

/*  */

var supportsPushState =
  inBrowser &&
  (function () {
    var ua = window.navigator.userAgent;

    if (
      (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
      ua.indexOf('Mobile Safari') !== -1 &&
      ua.indexOf('Chrome') === -1 &&
      ua.indexOf('Windows Phone') === -1
    ) {
      return false
    }

    return window.history && typeof window.history.pushState === 'function'
  })();

function pushState (url, replace) {
  saveScrollPosition();
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      // preserve existing history state as it could be overriden by the user
      var stateCopy = extend({}, history.state);
      stateCopy.key = getStateKey();
      history.replaceState(stateCopy, '', url);
    } else {
      history.pushState({ key: setStateKey(genStateKey()) }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState (url) {
  pushState(url, true);
}

/*  */

function runQueue (queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

/*  */

function resolveAsyncComponents (matched) {
  return function (to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;

    flatMapComponents(matched, function (def, _, match, key) {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved.
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true;
        pending++;

        var resolve = once(function (resolvedDef) {
          if (isESModule(resolvedDef)) {
            resolvedDef = resolvedDef.default;
          }
          // save resolved on async factory in case it's used elsewhere
          def.resolved = typeof resolvedDef === 'function'
            ? resolvedDef
            : _Vue.extend(resolvedDef);
          match.components[key] = resolvedDef;
          pending--;
          if (pending <= 0) {
            next();
          }
        });

        var reject = once(function (reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
           false && false;
          if (!error) {
            error = isError(reason)
              ? reason
              : new Error(msg);
            next(error);
          }
        });

        var res;
        try {
          res = def(resolve, reject);
        } catch (e) {
          reject(e);
        }
        if (res) {
          if (typeof res.then === 'function') {
            res.then(resolve, reject);
          } else {
            // new syntax in Vue 2.3
            var comp = res.component;
            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject);
            }
          }
        }
      }
    });

    if (!hasAsync) { next(); }
  }
}

function flatMapComponents (
  matched,
  fn
) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) { return fn(
      m.components[key],
      m.instances[key],
      m, key
    ); })
  }))
}

function flatten (arr) {
  return Array.prototype.concat.apply([], arr)
}

var hasSymbol =
  typeof Symbol === 'function' &&
  typeof Symbol.toStringTag === 'symbol';

function isESModule (obj) {
  return obj.__esModule || (hasSymbol && obj[Symbol.toStringTag] === 'Module')
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once (fn) {
  var called = false;
  return function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    if (called) { return }
    called = true;
    return fn.apply(this, args)
  }
}

var NavigationFailureType = {
  redirected: 1,
  aborted: 2,
  cancelled: 3,
  duplicated: 4
};

function createNavigationRedirectedError (from, to) {
  return createRouterError(
    from,
    to,
    NavigationFailureType.redirected,
    ("Redirected when going from \"" + (from.fullPath) + "\" to \"" + (stringifyRoute(
      to
    )) + "\" via a navigation guard.")
  )
}

function createNavigationDuplicatedError (from, to) {
  return createRouterError(
    from,
    to,
    NavigationFailureType.duplicated,
    ("Avoided redundant navigation to current location: \"" + (from.fullPath) + "\".")
  )
}

function createNavigationCancelledError (from, to) {
  return createRouterError(
    from,
    to,
    NavigationFailureType.cancelled,
    ("Navigation cancelled from \"" + (from.fullPath) + "\" to \"" + (to.fullPath) + "\" with a new navigation.")
  )
}

function createNavigationAbortedError (from, to) {
  return createRouterError(
    from,
    to,
    NavigationFailureType.aborted,
    ("Navigation aborted from \"" + (from.fullPath) + "\" to \"" + (to.fullPath) + "\" via a navigation guard.")
  )
}

function createRouterError (from, to, type, message) {
  var error = new Error(message);
  error._isRouter = true;
  error.from = from;
  error.to = to;
  error.type = type;

  return error
}

var propertiesToLog = ['params', 'query', 'hash'];

function stringifyRoute (to) {
  if (typeof to === 'string') { return to }
  if ('path' in to) { return to.path }
  var location = {};
  propertiesToLog.forEach(function (key) {
    if (key in to) { location[key] = to[key]; }
  });
  return JSON.stringify(location, null, 2)
}

/*  */

var History = function History (router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
  this.listeners = [];
};

History.prototype.listen = function listen (cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady (cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};

History.prototype.onError = function onError (errorCb) {
  this.errorCbs.push(errorCb);
};

History.prototype.transitionTo = function transitionTo (
  location,
  onComplete,
  onAbort
) {
    var this$1 = this;

  var route = this.router.match(location, this.current);
  this.confirmTransition(
    route,
    function () {
      var prev = this$1.current;
      this$1.updateRoute(route);
      onComplete && onComplete(route);
      this$1.ensureURL();
      this$1.router.afterHooks.forEach(function (hook) {
        hook && hook(route, prev);
      });

      // fire ready cbs once
      if (!this$1.ready) {
        this$1.ready = true;
        this$1.readyCbs.forEach(function (cb) {
          cb(route);
        });
      }
    },
    function (err) {
      if (onAbort) {
        onAbort(err);
      }
      if (err && !this$1.ready) {
        this$1.ready = true;
        // Initial redirection should still trigger the onReady onSuccess
        // https://github.com/vuejs/vue-router/issues/3225
        if (!isRouterError(err, NavigationFailureType.redirected)) {
          this$1.readyErrorCbs.forEach(function (cb) {
            cb(err);
          });
        } else {
          this$1.readyCbs.forEach(function (cb) {
            cb(route);
          });
        }
      }
    }
  );
};

History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
    var this$1 = this;

  var current = this.current;
  var abort = function (err) {
    // changed after adding errors with
    // https://github.com/vuejs/vue-router/pull/3047 before that change,
    // redirect and aborted navigation would produce an err == null
    if (!isRouterError(err) && isError(err)) {
      if (this$1.errorCbs.length) {
        this$1.errorCbs.forEach(function (cb) {
          cb(err);
        });
      } else {
        warn(false, 'uncaught error during route navigation:');
        console.error(err);
      }
    }
    onAbort && onAbort(err);
  };
  var lastRouteIndex = route.matched.length - 1;
  var lastCurrentIndex = current.matched.length - 1;
  if (
    isSameRoute(route, current) &&
    // in the case the route map has been dynamically appended to
    lastRouteIndex === lastCurrentIndex &&
    route.matched[lastRouteIndex] === current.matched[lastCurrentIndex]
  ) {
    this.ensureURL();
    return abort(createNavigationDuplicatedError(current, route))
  }

  var ref = resolveQueue(
    this.current.matched,
    route.matched
  );
    var updated = ref.updated;
    var deactivated = ref.deactivated;
    var activated = ref.activated;

  var queue = [].concat(
    // in-component leave guards
    extractLeaveGuards(deactivated),
    // global before hooks
    this.router.beforeHooks,
    // in-component update hooks
    extractUpdateHooks(updated),
    // in-config enter guards
    activated.map(function (m) { return m.beforeEnter; }),
    // async components
    resolveAsyncComponents(activated)
  );

  this.pending = route;
  var iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort(createNavigationCancelledError(current, route))
    }
    try {
      hook(route, current, function (to) {
        if (to === false) {
          // next(false) -> abort navigation, ensure current URL
          this$1.ensureURL(true);
          abort(createNavigationAbortedError(current, route));
        } else if (isError(to)) {
          this$1.ensureURL(true);
          abort(to);
        } else if (
          typeof to === 'string' ||
          (typeof to === 'object' &&
            (typeof to.path === 'string' || typeof to.name === 'string'))
        ) {
          // next('/') or next({ path: '/' }) -> redirect
          abort(createNavigationRedirectedError(current, route));
          if (typeof to === 'object' && to.replace) {
            this$1.replace(to);
          } else {
            this$1.push(to);
          }
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function () { return this$1.current === route; };
    // wait until async components are resolved before
    // extracting in-component enter guards
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    var queue = enterGuards.concat(this$1.router.resolveHooks);
    runQueue(queue, iterator, function () {
      if (this$1.pending !== route) {
        return abort(createNavigationCancelledError(current, route))
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) {
            cb();
          });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute (route) {
  this.current = route;
  this.cb && this.cb(route);
};

History.prototype.setupListeners = function setupListeners () {
  // Default implementation is empty
};

History.prototype.teardownListeners = function teardownListeners () {
  this.listeners.forEach(function (cleanupListener) {
    cleanupListener();
  });
  this.listeners = [];
};

function normalizeBase (base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = (baseEl && baseEl.getAttribute('href')) || '/';
      // strip full URL origin
      base = base.replace(/^https?:\/\/[^\/]+/, '');
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '')
}

function resolveQueue (
  current,
  next
) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}

function extractGuards (
  records,
  name,
  bind,
  reverse
) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard)
        ? guard.map(function (guard) { return bind(guard, instance, match, key); })
        : bind(guard, instance, match, key)
    }
  });
  return flatten(reverse ? guards.reverse() : guards)
}

function extractGuard (
  def,
  key
) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key]
}

function extractLeaveGuards (deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
}

function extractUpdateHooks (updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
}

function bindGuard (guard, instance) {
  if (instance) {
    return function boundRouteGuard () {
      return guard.apply(instance, arguments)
    }
  }
}

function extractEnterGuards (
  activated,
  cbs,
  isValid
) {
  return extractGuards(
    activated,
    'beforeRouteEnter',
    function (guard, _, match, key) {
      return bindEnterGuard(guard, match, key, cbs, isValid)
    }
  )
}

function bindEnterGuard (
  guard,
  match,
  key,
  cbs,
  isValid
) {
  return function routeEnterGuard (to, from, next) {
    return guard(to, from, function (cb) {
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
      next(cb);
    })
  }
}

function poll (
  cb, // somehow flow cannot infer this is a function
  instances,
  key,
  isValid
) {
  if (
    instances[key] &&
    !instances[key]._isBeingDestroyed // do not reuse being destroyed instance
  ) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

/*  */

var HTML5History = /*@__PURE__*/(function (History) {
  function HTML5History (router, base) {
    History.call(this, router, base);

    this._startLocation = getLocation(this.base);
  }

  if ( History ) HTML5History.__proto__ = History;
  HTML5History.prototype = Object.create( History && History.prototype );
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.setupListeners = function setupListeners () {
    var this$1 = this;

    if (this.listeners.length > 0) {
      return
    }

    var router = this.router;
    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      this.listeners.push(setupScroll());
    }

    var handleRoutingEvent = function () {
      var current = this$1.current;

      // Avoiding first `popstate` event dispatched in some browsers but first
      // history route not updated since async guard at the same time.
      var location = getLocation(this$1.base);
      if (this$1.current === START && location === this$1._startLocation) {
        return
      }

      this$1.transitionTo(location, function (route) {
        if (supportsScroll) {
          handleScroll(router, route, current, true);
        }
      });
    };
    window.addEventListener('popstate', handleRoutingEvent);
    this.listeners.push(function () {
      window.removeEventListener('popstate', handleRoutingEvent);
    });
  };

  HTML5History.prototype.go = function go (n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL (push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation () {
    return getLocation(this.base)
  };

  return HTML5History;
}(History));

function getLocation (base) {
  var path = decodeURI(window.location.pathname);
  if (base && path.toLowerCase().indexOf(base.toLowerCase()) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash
}

/*  */

var HashHistory = /*@__PURE__*/(function (History) {
  function HashHistory (router, base, fallback) {
    History.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return
    }
    ensureSlash();
  }

  if ( History ) HashHistory.__proto__ = History;
  HashHistory.prototype = Object.create( History && History.prototype );
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners () {
    var this$1 = this;

    if (this.listeners.length > 0) {
      return
    }

    var router = this.router;
    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      this.listeners.push(setupScroll());
    }

    var handleRoutingEvent = function () {
      var current = this$1.current;
      if (!ensureSlash()) {
        return
      }
      this$1.transitionTo(getHash(), function (route) {
        if (supportsScroll) {
          handleScroll(this$1.router, route, current, true);
        }
        if (!supportsPushState) {
          replaceHash(route.fullPath);
        }
      });
    };
    var eventType = supportsPushState ? 'popstate' : 'hashchange';
    window.addEventListener(
      eventType,
      handleRoutingEvent
    );
    this.listeners.push(function () {
      window.removeEventListener(eventType, handleRoutingEvent);
    });
  };

  HashHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(
      location,
      function (route) {
        pushHash(route.fullPath);
        handleScroll(this$1.router, route, fromRoute, false);
        onComplete && onComplete(route);
      },
      onAbort
    );
  };

  HashHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(
      location,
      function (route) {
        replaceHash(route.fullPath);
        handleScroll(this$1.router, route, fromRoute, false);
        onComplete && onComplete(route);
      },
      onAbort
    );
  };

  HashHistory.prototype.go = function go (n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL (push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    return getHash()
  };

  return HashHistory;
}(History));

function checkFallback (base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(cleanPath(base + '/#' + location));
    return true
  }
}

function ensureSlash () {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true
  }
  replaceHash('/' + path);
  return false
}

function getHash () {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  // empty path
  if (index < 0) { return '' }

  href = href.slice(index + 1);
  // decode the hash but not the search or hash
  // as search(query) is already decoded
  // https://github.com/vuejs/vue-router/issues/2708
  var searchIndex = href.indexOf('?');
  if (searchIndex < 0) {
    var hashIndex = href.indexOf('#');
    if (hashIndex > -1) {
      href = decodeURI(href.slice(0, hashIndex)) + href.slice(hashIndex);
    } else { href = decodeURI(href); }
  } else {
    href = decodeURI(href.slice(0, searchIndex)) + href.slice(searchIndex);
  }

  return href
}

function getUrl (path) {
  var href = window.location.href;
  var i = href.indexOf('#');
  var base = i >= 0 ? href.slice(0, i) : href;
  return (base + "#" + path)
}

function pushHash (path) {
  if (supportsPushState) {
    pushState(getUrl(path));
  } else {
    window.location.hash = path;
  }
}

function replaceHash (path) {
  if (supportsPushState) {
    replaceState(getUrl(path));
  } else {
    window.location.replace(getUrl(path));
  }
}

/*  */

var AbstractHistory = /*@__PURE__*/(function (History) {
  function AbstractHistory (router, base) {
    History.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if ( History ) AbstractHistory.__proto__ = History;
  AbstractHistory.prototype = Object.create( History && History.prototype );
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(
      location,
      function (route) {
        this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
        this$1.index++;
        onComplete && onComplete(route);
      },
      onAbort
    );
  };

  AbstractHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(
      location,
      function (route) {
        this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
        onComplete && onComplete(route);
      },
      onAbort
    );
  };

  AbstractHistory.prototype.go = function go (n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(
      route,
      function () {
        this$1.index = targetIndex;
        this$1.updateRoute(route);
      },
      function (err) {
        if (isRouterError(err, NavigationFailureType.duplicated)) {
          this$1.index = targetIndex;
        }
      }
    );
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/'
  };

  AbstractHistory.prototype.ensureURL = function ensureURL () {
    // noop
  };

  return AbstractHistory;
}(History));

/*  */



var VueRouter = function VueRouter (options) {
  if ( options === void 0 ) options = {};

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);

  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break
    default:
      if (false) {}
  }
};

var vue_router_esm_prototypeAccessors = { currentRoute: { configurable: true } };

VueRouter.prototype.match = function match (
  raw,
  current,
  redirectedFrom
) {
  return this.matcher.match(raw, current, redirectedFrom)
};

vue_router_esm_prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current
};

VueRouter.prototype.init = function init (app /* Vue component instance */) {
    var this$1 = this;

   false && false;

  this.apps.push(app);

  // set up app destroyed handler
  // https://github.com/vuejs/vue-router/issues/2639
  app.$once('hook:destroyed', function () {
    // clean out app from this.apps array once destroyed
    var index = this$1.apps.indexOf(app);
    if (index > -1) { this$1.apps.splice(index, 1); }
    // ensure we still have a main app or null if no apps
    // we do not release the router so it can be reused
    if (this$1.app === app) { this$1.app = this$1.apps[0] || null; }

    if (!this$1.app) {
      // clean up event listeners
      // https://github.com/vuejs/vue-router/issues/2341
      this$1.history.teardownListeners();
    }
  });

  // main app previously initialized
  // return as we don't need to set up new history listener
  if (this.app) {
    return
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History || history instanceof HashHistory) {
    var setupListeners = function () {
      history.setupListeners();
    };
    history.transitionTo(history.getCurrentLocation(), setupListeners, setupListeners);
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach (fn) {
  return registerHook(this.beforeHooks, fn)
};

VueRouter.prototype.beforeResolve = function beforeResolve (fn) {
  return registerHook(this.resolveHooks, fn)
};

VueRouter.prototype.afterEach = function afterEach (fn) {
  return registerHook(this.afterHooks, fn)
};

VueRouter.prototype.onReady = function onReady (cb, errorCb) {
  this.history.onReady(cb, errorCb);
};

VueRouter.prototype.onError = function onError (errorCb) {
  this.history.onError(errorCb);
};

VueRouter.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

  // $flow-disable-line
  if (!onComplete && !onAbort && typeof Promise !== 'undefined') {
    return new Promise(function (resolve, reject) {
      this$1.history.push(location, resolve, reject);
    })
  } else {
    this.history.push(location, onComplete, onAbort);
  }
};

VueRouter.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

  // $flow-disable-line
  if (!onComplete && !onAbort && typeof Promise !== 'undefined') {
    return new Promise(function (resolve, reject) {
      this$1.history.replace(location, resolve, reject);
    })
  } else {
    this.history.replace(location, onComplete, onAbort);
  }
};

VueRouter.prototype.go = function go (n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back () {
  this.go(-1);
};

VueRouter.prototype.forward = function forward () {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
  var route = to
    ? to.matched
      ? to
      : this.resolve(to).route
    : this.currentRoute;
  if (!route) {
    return []
  }
  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key]
    })
  }))
};

VueRouter.prototype.resolve = function resolve (
  to,
  current,
  append
) {
  current = current || this.history.current;
  var location = normalizeLocation(
    to,
    current,
    append,
    this
  );
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  }
};

VueRouter.prototype.addRoutes = function addRoutes (routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties( VueRouter.prototype, vue_router_esm_prototypeAccessors );

function registerHook (list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) { list.splice(i, 1); }
  }
}

function createHref (base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path
}

VueRouter.install = vue_router_esm_install;
VueRouter.version = '3.3.4';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

/* harmony default export */ var vue_router_esm = (VueRouter);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/pages/DashboardPage.vue?vue&type=template&id=0e76062c&scoped=true&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "Main",
    [
      _c("ProtectionStatus", { staticClass: "mt-large" }),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "flex vertical-center horizontal-center full-height" },
        [
          _c("img", {
            staticClass: "icon--unprotected",
            attrs: { src: _vm.IMG_UNPROTECTED_ICON }
          })
        ]
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/popup/pages/DashboardPage.vue?vue&type=template&id=0e76062c&scoped=true&

// CONCATENATED MODULE: ./src/popup/js/images.js
const IMG_LOGO = chrome.runtime.getURL('./popup/img/logo.png');
const IMG_HAM = chrome.runtime.getURL('./popup/img/ham.png');
const IMG_SPINNER = chrome.runtime.getURL('./popup/img/spinner.png');
const IMG_CHROME_STORE = chrome.runtime.getURL('./popup/img/chrome_store.png');
const IMG_ABOUT_ICON = chrome.runtime.getURL('./popup/img/about_icon.png');
const IMG_INFO_ICON = chrome.runtime.getURL('./popup/img/info_icon.png');
const IMG_CROWN_ICON = chrome.runtime.getURL('./popup/img/crown_icon.png');
const IMG_RESELL_ICON = chrome.runtime.getURL('./popup/img/resell_icon.png');
const IMG_SUPPORT_ICON = chrome.runtime.getURL('./popup/img/support_icon.png');
const IMG_USER_ICON = chrome.runtime.getURL('./popup/img/user_icon.png');
const IMG_TRASH_ICON = chrome.runtime.getURL('./popup/img/trash_icon.png');
const IMG_FLAG_ICON = chrome.runtime.getURL('./popup/img/flag_icon.png');
const IMG_RELOAD_ICON = chrome.runtime.getURL('./popup/img/reload_icon.png');
const IMG_EXIT_ICON = chrome.runtime.getURL('./popup/img/exit_icon.png');
const IMG_PROTECTED_MINI_ICON = chrome.runtime.getURL('./popup/img/protected-mini_icon.png');
const IMG_UNPROTECTED_MINI_ICON = chrome.runtime.getURL('./popup/img/unprotected-mini_icon.png');
const IMG_UNPROTECTED_ICON = chrome.runtime.getURL('./popup/img/unprotected_icon.png');
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/components/Main.vue?vue&type=template&id=422f8f74&
var Mainvue_type_template_id_422f8f74_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "main",
    { staticClass: "margin flex column " },
    [_vm._t("default")],
    2
  )
}
var Mainvue_type_template_id_422f8f74_staticRenderFns = []
Mainvue_type_template_id_422f8f74_render._withStripped = true


// CONCATENATED MODULE: ./src/popup/components/Main.vue?vue&type=template&id=422f8f74&

// EXTERNAL MODULE: ./src/popup/components/Main.vue?vue&type=style&index=0&lang=scss&
var Mainvue_type_style_index_0_lang_scss_ = __webpack_require__(71);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/popup/components/Main.vue

var script = {}



/* normalize component */

var component = normalizeComponent(
  script,
  Mainvue_type_template_id_422f8f74_render,
  Mainvue_type_template_id_422f8f74_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/popup/components/Main.vue"
/* harmony default export */ var Main = (component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/components/ProtectionStatus.vue?vue&type=template&id=08559b90&scoped=true&
var ProtectionStatusvue_type_template_id_08559b90_scoped_true_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "flex vertical-center space-beetween" },
    [
      _c("div", { staticClass: "protect-status", class: _vm.classProtected }, [
        _vm._v(_vm._s(_vm.labelProtected))
      ]),
      _vm._v(" "),
      _c("Toggle", {
        attrs: { value: _vm.protected },
        on: { input: _vm.toggleProtection }
      })
    ],
    1
  )
}
var ProtectionStatusvue_type_template_id_08559b90_scoped_true_staticRenderFns = []
ProtectionStatusvue_type_template_id_08559b90_scoped_true_render._withStripped = true


// CONCATENATED MODULE: ./src/popup/components/ProtectionStatus.vue?vue&type=template&id=08559b90&scoped=true&

// EXTERNAL MODULE: ./src/js/messages.js
var messages = __webpack_require__(2);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/components/Toggle.vue?vue&type=template&id=93ab41be&scoped=true&
var Togglevue_type_template_id_93ab41be_scoped_true_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "switcher" }, [
    _c("input", {
      directives: [
        {
          name: "model",
          rawName: "v-model",
          value: _vm.value,
          expression: "value"
        }
      ],
      staticClass: "checkbox",
      attrs: { type: "checkbox" },
      domProps: {
        checked: Array.isArray(_vm.value)
          ? _vm._i(_vm.value, null) > -1
          : _vm.value
      },
      on: {
        change: [
          function($event) {
            var $$a = _vm.value,
              $$el = $event.target,
              $$c = $$el.checked ? true : false
            if (Array.isArray($$a)) {
              var $$v = null,
                $$i = _vm._i($$a, $$v)
              if ($$el.checked) {
                $$i < 0 && (_vm.value = $$a.concat([$$v]))
              } else {
                $$i > -1 &&
                  (_vm.value = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
              }
            } else {
              _vm.value = $$c
            }
          },
          _vm.onChange
        ]
      }
    }),
    _vm._v(" "),
    _c("div", { staticClass: "knobs" }),
    _vm._v(" "),
    _c("div", { staticClass: "layer" })
  ])
}
var Togglevue_type_template_id_93ab41be_scoped_true_staticRenderFns = []
Togglevue_type_template_id_93ab41be_scoped_true_render._withStripped = true


// CONCATENATED MODULE: ./src/popup/components/Toggle.vue?vue&type=template&id=93ab41be&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/components/Toggle.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
/* harmony default export */ var Togglevue_type_script_lang_js_ = ({
  methods: {
    onChange(e) {
      this.$emit('input', e.target.checked);
    }

  },
  props: {
    value: Boolean
  }
});
// CONCATENATED MODULE: ./src/popup/components/Toggle.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Togglevue_type_script_lang_js_ = (Togglevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/popup/components/Toggle.vue?vue&type=style&index=0&id=93ab41be&lang=scss&scoped=true&
var Togglevue_type_style_index_0_id_93ab41be_lang_scss_scoped_true_ = __webpack_require__(73);

// CONCATENATED MODULE: ./src/popup/components/Toggle.vue






/* normalize component */

var Toggle_component = normalizeComponent(
  components_Togglevue_type_script_lang_js_,
  Togglevue_type_template_id_93ab41be_scoped_true_render,
  Togglevue_type_template_id_93ab41be_scoped_true_staticRenderFns,
  false,
  null,
  "93ab41be",
  null
  
)

/* hot reload */
if (false) { var Toggle_api; }
Toggle_component.options.__file = "src/popup/components/Toggle.vue"
/* harmony default export */ var Toggle = (Toggle_component.exports);
// EXTERNAL MODULE: ./src/js/api.js
var js_api = __webpack_require__(11);

// EXTERNAL MODULE: ./node_modules/js-sha1/src/sha1.js
var sha1 = __webpack_require__(18);
var sha1_default = /*#__PURE__*/__webpack_require__.n(sha1);

// EXTERNAL MODULE: ./src/js/actions.js
var actions = __webpack_require__(1);

// EXTERNAL MODULE: ./src/js/proxy.js
var proxy = __webpack_require__(7);

// CONCATENATED MODULE: ./src/popup/pages/mixins.js








const STATUS_WRONG_USERNAME_OR_PASSWORD = "WRONG_USERNAME_OR_PASSWORD";
const STATUS_PREMIUM_EXPIRED = "PREMIUM_EXPIRED";
const STATUS_ERROR = "ERROR";
const STATUS_OK = "OK";
const LoginMixin = {
  data() {
    return {
      email: '',
      password: '',
      message: '' // email: 'viktar@test.com',
      // password: 'testpass',

    };
  },

  mounted() {
    console.log('LoginMixin - mounted');
    chrome.runtime.onMessage.addListener(this._appMessageHandler);
  },

  beforeDestroy() {
    console.log('LoginMixin - beforeDestroy');
    chrome.runtime.onMessage.removeListener(this._appMessageHandler);
  },

  methods: { ...mapActions(['setUser', 'setLocation', 'setLastTimeChanged']),
    ...mapActions(NS_SYSTEM, ['setUseResidentialIPs']),

    logOut() {
      this.setUser(null);
      messages["a" /* default */].toBackground().logIn('', '');
      this.$router.replace({
        path: ROUTE_MENU_PREMIUM_VERSION
      });
    },

    _appMessageHandler(message, sender, sendResponse) {
      console.log('~_appMessageHandler~: ', message);

      switch (message.action) {
        case actions["k" /* MSG_POPUP_SEND_ACCOUNT_INFO */]:
          {
            this._accountInfoHandler(message.valid);

            break;
          }

        case actions["o" /* MSG_POPUP_UPDATE_LAST_TIME_CHANGED */]:
          {
            this.setLastTimeChanged(message.time);
            break;
          }
      }
    },

    _accountInfoHandler(valid) {
      if (valid) {
        messages["a" /* default */].toBackground().logIn(this.email, this.password);
        const hasUser = this.email.length > 0 && this.password.length > 0;
        console.log('_accountInfoHandler hasUser', hasUser);

        if (hasUser) {
          this.setUser({
            email: this.email,
            password: sha1_default()(this.password)
          });
          this.$router.replace({
            path: ROUTE_DASHBOARD
          });
        }
      } else {//TODO: show message
        // $('.shake-body').effect("shake");
      }
    },

    async getStartupData() {
      console.log('~getStartupData~');
      const data = await messages["a" /* default */].toApi().startupData(this.email, sha1_default()(this.password));
      console.log('data: ', data);

      if (data.status === STATUS_OK) {
        const hasUser = this.email.length > 0 && this.password.length > 0;
        console.log('_accountInfoHandler hasUser', hasUser);

        if (hasUser) {
          this.setUser({
            email: this.email,
            password: sha1_default()(this.password)
          });
          storage["a" /* Storage */].user.setPremium(true);
          storage["a" /* Storage */].user.setApiModeServers(data.data.servers);
          chrome.storage.local.set({
            'freePremiumTime': parseInt(new Date(data.data.user.premium_expires_unix_time) - Date.now() / 1000),
            'isLimit': false
          });
          const loc = {
            city: data.data.user.city_name,
            country: data.data.user.country_name,
            region: data.data.user.region_name,
            countryiso: data.data.user.country_code
          };
          this.setLocation(loc);
          storage["a" /* Storage */].user.setLocation(loc);
          storage["a" /* Storage */].user.setDefaultLocation(loc);
          this.setUseResidentialIPs(false);
          this.$router.replace({
            path: ROUTE_DASHBOARD
          });
        }
      }
    },

    async logIn() {
      console.log('~logIn~ Storage.app.isInstalled(): ', storage["a" /* Storage */].app.isInstalled());
      this.message = '';

      if (storage["a" /* Storage */].app.isInstalled()) {
        messages["a" /* default */].toApp().getAccountInfo(this.email, sha1_default()(this.password));
      } else {
        const result = await messages["a" /* default */].toApi().logIn(this.email, sha1_default()(this.password));
        console.log('result: ', result);

        switch (result.status) {
          case STATUS_WRONG_USERNAME_OR_PASSWORD:
            this.message = 'Wrong username or password';
            break;

          case STATUS_PREMIUM_EXPIRED:
            this.message = 'Your premium is expired';
            break;

          case STATUS_ERROR:
            this.message = 'Unexpected error. Try again later.';
            break;

          case STATUS_OK:
            this.getStartupData();
            break;
        }
      }
    }

  }
};
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/components/ProtectionStatus.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//








/* harmony default export */ var ProtectionStatusvue_type_script_lang_js_ = ({
  mixins: [LoginMixin],
  computed: { ...mapGetters(NS_SYSTEM, ['protected']),

    classProtected() {
      return this.protected ? 'protected' : 'unprotected';
    },

    labelProtected() {
      return this.protected ? 'protected' : 'unprotected';
    }

  },

  async mounted() {
    storage["a" /* Storage */].app.onConnectedStart(connected => {
      console.log('---------------CONNECTED---------------');
      this.setProtected(connected);

      this._routePage();
    });
  },

  beforeDestroy() {
    storage["a" /* Storage */].app.onConnectedStop();
  },

  methods: { ...mapActions(['setLocation']),
    ...mapActions(NS_SYSTEM, ['setProtected']),

    async toggleProtection(enabled) {
      console.log('enabled: ', enabled);
      console.log('this.protected: ', this.protected);
      const location = await messages["a" /* default */].toBackground().toggleConnection(enabled);
      console.log('new location: ' + location);

      if (location === js_api["c" /* STATUS_PREMIUM_EXPIRED */]) {
        //TODO: We can handle this case in a better way - show message and then logout.
        this.logOut();
      } else if (location) {
        this.setLocation(location);
      }

      if (location !== js_api["c" /* STATUS_PREMIUM_EXPIRED */]) {
        this.setProtected(enabled);

        this._routePage();
      }
    },

    _routePage() {
      if (this.protected) {
        this.$router.push({
          path: ROUTE_PROTECTED
        });
      } else {
        this.$router.replace({
          path: ROUTE_DASHBOARD
        });
      }
    }

  },
  components: {
    Toggle: Toggle
  }
});
// CONCATENATED MODULE: ./src/popup/components/ProtectionStatus.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_ProtectionStatusvue_type_script_lang_js_ = (ProtectionStatusvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/popup/components/ProtectionStatus.vue?vue&type=style&index=0&id=08559b90&lang=scss&scoped=true&
var ProtectionStatusvue_type_style_index_0_id_08559b90_lang_scss_scoped_true_ = __webpack_require__(76);

// CONCATENATED MODULE: ./src/popup/components/ProtectionStatus.vue






/* normalize component */

var ProtectionStatus_component = normalizeComponent(
  components_ProtectionStatusvue_type_script_lang_js_,
  ProtectionStatusvue_type_template_id_08559b90_scoped_true_render,
  ProtectionStatusvue_type_template_id_08559b90_scoped_true_staticRenderFns,
  false,
  null,
  "08559b90",
  null
  
)

/* hot reload */
if (false) { var ProtectionStatus_api; }
ProtectionStatus_component.options.__file = "src/popup/components/ProtectionStatus.vue"
/* harmony default export */ var ProtectionStatus = (ProtectionStatus_component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/pages/DashboardPage.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var DashboardPagevue_type_script_lang_js_ = ({
  data() {
    return {
      IMG_UNPROTECTED_ICON: IMG_UNPROTECTED_ICON
    };
  },

  components: {
    Main: Main,
    ProtectionStatus: ProtectionStatus
  }
});
// CONCATENATED MODULE: ./src/popup/pages/DashboardPage.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_DashboardPagevue_type_script_lang_js_ = (DashboardPagevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/popup/pages/DashboardPage.vue





/* normalize component */

var DashboardPage_component = normalizeComponent(
  pages_DashboardPagevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "0e76062c",
  null
  
)

/* hot reload */
if (false) { var DashboardPage_api; }
DashboardPage_component.options.__file = "src/popup/pages/DashboardPage.vue"
/* harmony default export */ var DashboardPage = (DashboardPage_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/pages/FeedbackPage.vue?vue&type=template&id=4c9f474a&scoped=true&
var FeedbackPagevue_type_template_id_4c9f474a_scoped_true_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("InfoPage", { attrs: { align: "center", white: "true" } }, [
    _c("h1", [_vm._v("\n    WHAT COULD WE IMPROVE?"), _c("br")]),
    _vm._v(" "),
    _c("textarea", {
      directives: [
        {
          name: "model",
          rawName: "v-model",
          value: _vm.feedbackMsg,
          expression: "feedbackMsg"
        }
      ],
      attrs: { placeholder: "WRITE YOUR FEEDBACK" },
      domProps: { value: _vm.feedbackMsg },
      on: {
        input: function($event) {
          if ($event.target.composing) {
            return
          }
          _vm.feedbackMsg = $event.target.value
        }
      }
    }),
    _vm._v(" "),
    _c(
      "a",
      { staticClass: "btn main gold", on: { click: _vm.submitFeedback } },
      [_vm._v("SHARE YOU OPINION")]
    )
  ])
}
var FeedbackPagevue_type_template_id_4c9f474a_scoped_true_staticRenderFns = []
FeedbackPagevue_type_template_id_4c9f474a_scoped_true_render._withStripped = true


// CONCATENATED MODULE: ./src/popup/pages/FeedbackPage.vue?vue&type=template&id=4c9f474a&scoped=true&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/components/InfoPage.vue?vue&type=template&id=6d459b2c&scoped=true&
var InfoPagevue_type_template_id_6d459b2c_scoped_true_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "Info",
    { attrs: { white: _vm.white } },
    [
      _vm.icon ? _c("img", { attrs: { src: _vm.icon } }) : _vm._e(),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "content", style: _vm.styleContent },
        [_vm._t("default")],
        2
      ),
      _vm._v(" "),
      _c("IconExit", { on: { click: _vm.onExit } })
    ],
    1
  )
}
var InfoPagevue_type_template_id_6d459b2c_scoped_true_staticRenderFns = []
InfoPagevue_type_template_id_6d459b2c_scoped_true_render._withStripped = true


// CONCATENATED MODULE: ./src/popup/components/InfoPage.vue?vue&type=template&id=6d459b2c&scoped=true&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/components/Info.vue?vue&type=template&id=2bf7d68a&
var Infovue_type_template_id_2bf7d68a_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "info", class: { white: _vm.white } },
    [_vm._t("default")],
    2
  )
}
var Infovue_type_template_id_2bf7d68a_staticRenderFns = []
Infovue_type_template_id_2bf7d68a_render._withStripped = true


// CONCATENATED MODULE: ./src/popup/components/Info.vue?vue&type=template&id=2bf7d68a&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/components/Info.vue?vue&type=script&lang=js&
//
//
//
//
//
//
/* harmony default export */ var Infovue_type_script_lang_js_ = ({
  props: {
    white: {
      type: Boolean,
      default: false
    }
  }
});
// CONCATENATED MODULE: ./src/popup/components/Info.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Infovue_type_script_lang_js_ = (Infovue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/popup/components/Info.vue?vue&type=style&index=0&lang=scss&
var Infovue_type_style_index_0_lang_scss_ = __webpack_require__(78);

// CONCATENATED MODULE: ./src/popup/components/Info.vue






/* normalize component */

var Info_component = normalizeComponent(
  components_Infovue_type_script_lang_js_,
  Infovue_type_template_id_2bf7d68a_render,
  Infovue_type_template_id_2bf7d68a_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var Info_api; }
Info_component.options.__file = "src/popup/components/Info.vue"
/* harmony default export */ var Info = (Info_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/components/icons/IconExit.vue?vue&type=template&id=2c3f694e&scoped=true&
var IconExitvue_type_template_id_2c3f694e_scoped_true_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("img", {
    staticClass: "icon--exit",
    attrs: { src: _vm.IMG_EXIT_ICON },
    on: {
      click: function($event) {
        return _vm.$emit("click", $event)
      }
    }
  })
}
var IconExitvue_type_template_id_2c3f694e_scoped_true_staticRenderFns = []
IconExitvue_type_template_id_2c3f694e_scoped_true_render._withStripped = true


// CONCATENATED MODULE: ./src/popup/components/icons/IconExit.vue?vue&type=template&id=2c3f694e&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/components/icons/IconExit.vue?vue&type=script&lang=js&
//
//
//
//

/* harmony default export */ var IconExitvue_type_script_lang_js_ = ({
  data() {
    return {
      IMG_EXIT_ICON: IMG_EXIT_ICON
    };
  }

});
// CONCATENATED MODULE: ./src/popup/components/icons/IconExit.vue?vue&type=script&lang=js&
 /* harmony default export */ var icons_IconExitvue_type_script_lang_js_ = (IconExitvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/popup/components/icons/IconExit.vue?vue&type=style&index=0&id=2c3f694e&lang=scss&scoped=true&
var IconExitvue_type_style_index_0_id_2c3f694e_lang_scss_scoped_true_ = __webpack_require__(80);

// CONCATENATED MODULE: ./src/popup/components/icons/IconExit.vue






/* normalize component */

var IconExit_component = normalizeComponent(
  icons_IconExitvue_type_script_lang_js_,
  IconExitvue_type_template_id_2c3f694e_scoped_true_render,
  IconExitvue_type_template_id_2c3f694e_scoped_true_staticRenderFns,
  false,
  null,
  "2c3f694e",
  null
  
)

/* hot reload */
if (false) { var IconExit_api; }
IconExit_component.options.__file = "src/popup/components/icons/IconExit.vue"
/* harmony default export */ var IconExit = (IconExit_component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/components/InfoPage.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var InfoPagevue_type_script_lang_js_ = ({
  computed: {
    styleContent() {
      return {
        'align-items': this.align
      };
    }

  },
  components: {
    Info: Info,
    IconExit: IconExit
  },
  methods: {
    onExit() {
      if (this.customExit) {
        this.$emit('onExit');
      } else {
        this.$router.go(-1);
      }
    }

  },
  props: {
    icon: String,
    align: {
      type: String,
      default: 'default'
    },
    white: {
      type: Boolean,
      default: false
    },
    customExit: {
      type: Boolean,
      default: false
    }
  }
});
// CONCATENATED MODULE: ./src/popup/components/InfoPage.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_InfoPagevue_type_script_lang_js_ = (InfoPagevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/popup/components/InfoPage.vue





/* normalize component */

var InfoPage_component = normalizeComponent(
  components_InfoPagevue_type_script_lang_js_,
  InfoPagevue_type_template_id_6d459b2c_scoped_true_render,
  InfoPagevue_type_template_id_6d459b2c_scoped_true_staticRenderFns,
  false,
  null,
  "6d459b2c",
  null
  
)

/* hot reload */
if (false) { var InfoPage_api; }
InfoPage_component.options.__file = "src/popup/components/InfoPage.vue"
/* harmony default export */ var InfoPage = (InfoPage_component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/pages/FeedbackPage.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//TODO: disable Submit button on start, enable after selecting rating.




/* harmony default export */ var FeedbackPagevue_type_script_lang_js_ = ({
  data() {
    return {
      feedbackMsg: ''
    };
  },

  methods: {
    submitFeedback() {
      messages["a" /* default */].toApi().submitFeedback(this.feedbackMsg);
      storage["a" /* Storage */].pages.setPage(null);
      this.$router.push({
        path: ROUTE_THANK_YOU
      });
    }

  },
  components: {
    InfoPage: InfoPage
  }
});
// CONCATENATED MODULE: ./src/popup/pages/FeedbackPage.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_FeedbackPagevue_type_script_lang_js_ = (FeedbackPagevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/popup/pages/FeedbackPage.vue?vue&type=style&index=0&id=4c9f474a&lang=scss&scoped=true&
var FeedbackPagevue_type_style_index_0_id_4c9f474a_lang_scss_scoped_true_ = __webpack_require__(82);

// CONCATENATED MODULE: ./src/popup/pages/FeedbackPage.vue






/* normalize component */

var FeedbackPage_component = normalizeComponent(
  pages_FeedbackPagevue_type_script_lang_js_,
  FeedbackPagevue_type_template_id_4c9f474a_scoped_true_render,
  FeedbackPagevue_type_template_id_4c9f474a_scoped_true_staticRenderFns,
  false,
  null,
  "4c9f474a",
  null
  
)

/* hot reload */
if (false) { var FeedbackPage_api; }
FeedbackPage_component.options.__file = "src/popup/pages/FeedbackPage.vue"
/* harmony default export */ var FeedbackPage = (FeedbackPage_component.exports);
// CONCATENATED MODULE: ./src/popup/pages/SettingsPage.vue
var SettingsPage_render, SettingsPage_staticRenderFns
var SettingsPage_script = {}


/* normalize component */

var SettingsPage_component = normalizeComponent(
  SettingsPage_script,
  SettingsPage_render,
  SettingsPage_staticRenderFns,
  false,
  null,
  null,
  null
  
)

SettingsPage_component.options.__file = "src/popup/pages/SettingsPage.vue"
/* harmony default export */ var SettingsPage = (SettingsPage_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/pages/ProtectedPage.vue?vue&type=template&id=1487cd46&scoped=true&
var ProtectedPagevue_type_template_id_1487cd46_scoped_true_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "Main",
    [
      _c("ProtectionStatus", { staticClass: "mt-large" }),
      _vm._v(" "),
      _c("ProtectionType"),
      _vm._v(" "),
      _c("LocationSelector"),
      _vm._v(" "),
      _c("ReloadLocationButton")
    ],
    1
  )
}
var ProtectedPagevue_type_template_id_1487cd46_scoped_true_staticRenderFns = []
ProtectedPagevue_type_template_id_1487cd46_scoped_true_render._withStripped = true


// CONCATENATED MODULE: ./src/popup/pages/ProtectedPage.vue?vue&type=template&id=1487cd46&scoped=true&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/components/ProtectionType.vue?vue&type=template&id=78c13e00&scoped=true&
var ProtectionTypevue_type_template_id_78c13e00_scoped_true_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "flex vertical-center" }, [
    _c("div", { staticClass: "type-switcher" }, [
      _c(
        "div",
        {
          staticClass: "type",
          class: { active: !_vm.useResidentialIPs },
          on: {
            click: function($event) {
              return _vm.setUseResidentialIPs(false)
            }
          }
        },
        [_vm._v("DATA CENTER")]
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "type",
          class: { active: _vm.useResidentialIPs },
          on: { click: _vm.setResidential }
        },
        [_vm._v("RESIDENTIAL")]
      )
    ])
  ])
}
var ProtectionTypevue_type_template_id_78c13e00_scoped_true_staticRenderFns = []
ProtectionTypevue_type_template_id_78c13e00_scoped_true_render._withStripped = true


// CONCATENATED MODULE: ./src/popup/components/ProtectionType.vue?vue&type=template&id=78c13e00&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/components/ProtectionType.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//




/* harmony default export */ var ProtectionTypevue_type_script_lang_js_ = ({
  computed: { ...mapGetters(NS_SYSTEM, ['useResidentialIPs'])
  },
  methods: { ...mapActions(NS_SYSTEM, ['setUseResidentialIPs']),

    setResidential() {
      console.log('setResidential(): ', storage["a" /* Storage */].app.isInstalled());

      if (!storage["a" /* Storage */].app.isInstalled()) {
        this.$router.push({
          path: ROUTE_APP_IS_REQUIRED
        });
        return;
      }

      this.setUseResidentialIPs(true);
    }

  }
});
// CONCATENATED MODULE: ./src/popup/components/ProtectionType.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_ProtectionTypevue_type_script_lang_js_ = (ProtectionTypevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/popup/components/ProtectionType.vue?vue&type=style&index=0&id=78c13e00&lang=scss&scoped=true&
var ProtectionTypevue_type_style_index_0_id_78c13e00_lang_scss_scoped_true_ = __webpack_require__(84);

// CONCATENATED MODULE: ./src/popup/components/ProtectionType.vue






/* normalize component */

var ProtectionType_component = normalizeComponent(
  components_ProtectionTypevue_type_script_lang_js_,
  ProtectionTypevue_type_template_id_78c13e00_scoped_true_render,
  ProtectionTypevue_type_template_id_78c13e00_scoped_true_staticRenderFns,
  false,
  null,
  "78c13e00",
  null
  
)

/* hot reload */
if (false) { var ProtectionType_api; }
ProtectionType_component.options.__file = "src/popup/components/ProtectionType.vue"
/* harmony default export */ var ProtectionType = (ProtectionType_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/components/LocationSelector.vue?vue&type=template&id=2fefa841&
var LocationSelectorvue_type_template_id_2fefa841_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "flex vertical-center horizontal-center column mt-medium" },
    [
      _c("h1", [_vm._v("CHOOSE YOUR LOCATION")]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "inputs mt-xs" },
        [
          _c("CustomSelect", {
            attrs: { value: _vm.currentCountryISO, items: _vm.countryList },
            on: { click: _vm.countrySelected }
          }),
          _vm._v(" "),
          _vm.cityVisible
            ? _c("CustomSelect", {
                attrs: { value: _vm.city, items: _vm.cityList },
                on: {
                  beforeShow: _vm.cityDropDownClicked,
                  click: _vm.citySelected
                }
              })
            : _vm._e()
        ],
        1
      )
    ]
  )
}
var LocationSelectorvue_type_template_id_2fefa841_staticRenderFns = []
LocationSelectorvue_type_template_id_2fefa841_render._withStripped = true


// CONCATENATED MODULE: ./src/popup/components/LocationSelector.vue?vue&type=template&id=2fefa841&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/components/CustomSelect.vue?vue&type=template&id=40a1575a&scoped=true&
var CustomSelectvue_type_template_id_40a1575a_scoped_true_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "custom-select" }, [
    _vm.item
      ? _c(
          "div",
          {
            staticClass: "select-selected",
            class: { "select-arrow-active": !_vm.selectHidden },
            on: { click: _vm.replacerClick }
          },
          [
            _vm.item.icon
              ? _c("div", {
                  staticClass: "select-item-icon",
                  style: "background-image: url('" + _vm.item.icon + "')"
                })
              : _vm._e(),
            _vm._v("\n    " + _vm._s(_vm.item.text) + "\n  ")
          ]
        )
      : _vm._e(),
    _vm._v(" "),
    !_vm.selectHidden
      ? _c(
          "div",
          {
            ref: "container",
            staticClass: "select-items",
            class: { "select-hide": _vm.selectHidden },
            style: _vm.styleDropdown
          },
          _vm._l(_vm.items, function(c) {
            return _c(
              "div",
              {
                key: c.value,
                staticClass: "select-item",
                class: { "same-as-selected": c.value === _vm.val },
                on: {
                  click: function($event) {
                    return _vm.itemClick(c)
                  }
                }
              },
              [
                c.icon
                  ? _c("div", {
                      staticClass: "select-item-icon",
                      style: "background-image: url('" + c.icon + "')"
                    })
                  : _vm._e(),
                _vm._v("\n      " + _vm._s(c.text) + "\n    ")
              ]
            )
          }),
          0
        )
      : _vm._e()
  ])
}
var CustomSelectvue_type_template_id_40a1575a_scoped_true_staticRenderFns = []
CustomSelectvue_type_template_id_40a1575a_scoped_true_render._withStripped = true


// CONCATENATED MODULE: ./src/popup/components/CustomSelect.vue?vue&type=template&id=40a1575a&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/components/CustomSelect.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// Items with icon
const RICH_ITEM_HEIGHT = 50;
const RICH_MAX_HEIGHT = 250; // Text only

const ITEM_HEIGHT = 36;
const MAX_HEIGHT = 180;

var GeminiScrollbar = __webpack_require__(86);

let gs;
/* harmony default export */ var CustomSelectvue_type_script_lang_js_ = ({
  data() {
    return {
      val: null,
      ignoreClick: false,
      selectHidden: true
    };
  },

  computed: {
    item() {
      // return this.items.find(i => i.value === this.val) || this.items.find(i => i.value.toLowerCase() === 'any');
      return this.items.find(i => i.value === this.val) || this.items[0];
    },

    hasIcons() {
      return this.items.find(i => 'icon' in i);
    },

    styleDropdown() {
      const maxHeight = this.hasIcons ? RICH_MAX_HEIGHT : MAX_HEIGHT;
      const itemHeight = this.hasIcons ? RICH_ITEM_HEIGHT : ITEM_HEIGHT;
      const height = Math.min(maxHeight, this.items.length * itemHeight);
      return {
        height: `${height}px`
      };
    }

  },
  watch: {
    selectHidden(isHidden) {
      console.log('watch@selectHidden: ', isHidden);

      if (!isHidden) {
        this.$nextTick(() => {
          if (gs) {
            gs.destroy();
          }

          gs = new GeminiScrollbar({
            element: this.$refs.container,
            forceGemini: true
          }).create();
          /*
           * By default closeSelect() is hidhing the popup when a user is pressing mouse down at the vertcal scroll
           * thumb and trying to scroll the list. The next code is used to prevent popup closing for this case.
           */

          const thumb = this.$refs.container.querySelector('.gm-scrollbar .thumb');
          thumb.addEventListener('mousedown', e => {
            this.ignoreClick = true;
            document.addEventListener('mouseup', e => {
              setTimeout(() => {
                this.ignoreClick = false;
              }, 50);
            }, {
              once: true
            });
          }, {
            once: true
          });
        });
      }
    },

    value(newVal) {
      console.log('@@@@@@@@@@@ watch value: ', newVal);
      this.val = newVal;
    }

  },

  mounted() {
    this.val = this.value;
    console.log('ITEMS: ', JSON.stringify(this.items));
    document.addEventListener("click", this.closeSelect);
  },

  beforeDestroy() {
    document.removeEventListener("click", this.closeSelect);

    if (gs) {
      gs.destroy();
      gs = null;
    }
  },

  methods: {
    closeSelect(e) {
      console.log('~closeSelect~', e);
      console.log('this.ignoreClick: ', this.ignoreClick);

      if (this.ignoreClick) {
        this.ignoreClick = false;
        return;
      }

      this.selectHidden = true;
    },

    replacerClick() {
      this.$emit('beforeShow');
      this.ignoreClick = true;
      this.selectHidden = !this.selectHidden;
    },

    itemClick(item) {
      this.val = item.value;
      this.closeSelect();
      this.$emit('click', item);
    }

  },
  props: ['items', 'value']
});
// CONCATENATED MODULE: ./src/popup/components/CustomSelect.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_CustomSelectvue_type_script_lang_js_ = (CustomSelectvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/popup/components/CustomSelect.vue?vue&type=style&index=0&id=40a1575a&lang=scss&scoped=true&
var CustomSelectvue_type_style_index_0_id_40a1575a_lang_scss_scoped_true_ = __webpack_require__(87);

// CONCATENATED MODULE: ./src/popup/components/CustomSelect.vue






/* normalize component */

var CustomSelect_component = normalizeComponent(
  components_CustomSelectvue_type_script_lang_js_,
  CustomSelectvue_type_template_id_40a1575a_scoped_true_render,
  CustomSelectvue_type_template_id_40a1575a_scoped_true_staticRenderFns,
  false,
  null,
  "40a1575a",
  null
  
)

/* hot reload */
if (false) { var CustomSelect_api; }
CustomSelect_component.options.__file = "src/popup/components/CustomSelect.vue"
/* harmony default export */ var CustomSelect = (CustomSelect_component.exports);
// EXTERNAL MODULE: ./src/js/platform.js
var platform = __webpack_require__(3);

// CONCATENATED MODULE: ./src/popup/js/utils.js

const TimeUtils = {
  getLocationChangedTime(lastTime) {
    let now = new Date();
    let timeNow = now.getTime();
    let secondsPast = (timeNow - new Date(lastTime).getTime()) / 1000;

    if (secondsPast < 60) {
      return Math.floor(secondsPast) + chrome.i18n.getMessage("main_second_symbol");
    }

    if (secondsPast < 3600 && secondsPast > 60) {
      return Math.floor(secondsPast / 60) + chrome.i18n.getMessage("main_minute_symbol");
    }

    if (secondsPast <= 86400 && secondsPast > 3600) {
      return Math.floor(secondsPast / 3600) + chrome.i18n.getMessage("main_hour_symbol");
    }

    if (secondsPast > 86400) {
      let day = new Date(lastTime).getDate();
      let month = new Date(lastTime).toDateString().match(/ [a-zA-Z]*/)[0].replace(" ", "");
      let year = new Date(lastTime).getFullYear() === now.getFullYear() ? "" : " " + new Date(lastTime).getFullYear();
      return day + " " + month + year;
    }
  }

};
const TabUtils = {
  openTab(url) {
    if (platform["d" /* PlatformUtils */].isFirefox()) {
      const promise = browser.tabs.create({
        url
      });
      window.close();
      return promise;
    }

    return new Promise(resolve => {
      chrome.tabs.create({
        url
      }, tab => resolve(tab));
    });
  }

};
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/components/LocationSelector.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ var LocationSelectorvue_type_script_lang_js_ = ({
  data() {
    return {
      countryList: [],
      cityList: [],
      locations: [],
      currentCountryISO: '',
      city: 'Any',
      cityVisible: false,
      IMG_RELOAD_ICON: IMG_RELOAD_ICON
    };
  },

  computed: { ...mapGetters(['premiumActive']),
    ...mapGetters(NS_SYSTEM, ['useResidentialIPs'])
  },

  mounted() {
    console.log('~LocationSelector mounted~');
    this.updateCountriesList();
    const lastChangedTime = storage["a" /* Storage */].user.getLastChangedTime();
    console.log('lastChangedTime: ', lastChangedTime);
    this.setLastTimeChanged(lastChangedTime);
    storage["b" /* StorageUtils */].onStorageChangeAdd(this._onLocationChanged);
  },

  beforeDestroy() {
    storage["b" /* StorageUtils */].onStorageChangeRemove(this._onLocationChanged);
  },

  watch: {
    useResidentialIPs(newVal) {
      console.log('~watch@ useResidentialIPs~ ', newVal);
      this.updateCountriesList(countryInList => {
        console.log('countryInList: ', countryInList); // It happens when a country was selected in Residential list and a user
        // press Data Center and the selected country does not exists in this list

        if (countryInList) {
          this.countrySelected({
            value: this.currentCountryISO
          });
        } else {
          this.countrySelected({
            value: 'any'
          });
        }
      });
    }

  },
  methods: { ...mapActions(['setLastTimeChanged']),

    _onLocationChanged(changes) {
      if ('currentCountryISO' in changes) {
        const lastChangedTime = storage["a" /* Storage */].user.getLastChangedTime();
        console.log('lastChangedTime: ', lastChangedTime);
        this.setLastTimeChanged(lastChangedTime);
        chrome.storage.local.get(['selectedCountryISO'], data => {
          console.log('data: ', data); // console.log('this.data: ', this.data);

          if (data.selectedCountryISO && data.selectedCountryISO.length > 0) {
            this.currentCountryISO = data.selectedCountryISO;
          } else {
            this.currentCountryISO = changes.currentCountryISO.newValue;
          }
        });
      } // if ('currentCity' in changes) {
      //   this.city = changes.currentCity.newValue;
      // }

    },

    countrySelected(item) {
      console.log('countrySelected item: ', item);
      console.log('city: ', this.city);
      const val = item.value;
      this.cityVisible = val.toLowerCase() !== 'any';
      chrome.storage.local.set({
        'selectedCountryISO': val
      });
      this.cityList = [];

      if (storage["a" /* Storage */].app.isInstalled()) {
        let cities = [];

        for (let i = 0; i < this.locations.length; i++) {
          if (this.locations[i].countryISO === val) {
            cities = this.locations[i].cities;
            break;
          }
        }

        console.log('cities: ', cities);

        for (let i = 0; i < cities.length; i++) {
          this.cityList.push({
            value: cities[i],
            text: cities[i]
          });
        }
      } else {
        const servers = storage["a" /* Storage */].user.getApiModeServes();
        console.log('servers: ', servers);
        const cities = Object.values(servers).reduce((accum, cities) => {
          accum.push(...cities);
          return accum;
        }, []).filter(city => city.country_code === val);
        console.log('cities: ', cities);
        this.cityList.push({
          value: 'any',
          text: 'Any'
        });

        for (let city of cities) {
          this.cityList.push({
            value: city.city_name,
            text: city.city_name
          });
        }
      }

      const cityInList = this.cityList.some(li => li.value === this.city);
      console.log('@cityInList: ', cityInList);

      if (!cityInList) {
        this.city = 'Any';
        chrome.storage.local.set({
          'selectedCity': 'Any'
        });
      }

      messages["a" /* default */].toBackground().locationSelected(val, this.city);
    },

    updateCountriesList(callback) {
      console.log('~updateCountriesList~');
      console.log('Storage.app.isInstalled(): ', storage["a" /* Storage */].app.isInstalled());

      if (storage["a" /* Storage */].app.isInstalled()) {
        chrome.storage.local.get(["staticiplist", "serveriplist"], lst => {
          console.log('lst: ', lst);
          this.locations = lst.staticiplist;
          console.log('this.useResidentialIPs: ', this.useResidentialIPs);

          if (Array.isArray(lst.serveriplist) && lst.serveriplist.length === 2) {
            this.locations = this.useResidentialIPs ? lst.serveriplist[1] : lst.serveriplist[0];
          }

          console.log('this.locations: ', JSON.stringify(this.locations)); //variables holding user selected country and city

          this.currentCountryISO = this.locations[0].countryISO; //countryISO at index 0 is always any

          this.city = this.locations[0].cities[0]; //city at index 0 at country index 0 is always Any
          //now check if we've got stored those vars in local storage and if so
          //load them to user currently selected country and city

          chrome.storage.local.get(['currentCountryISO', 'selectedCountryISO', 'currentCity', 'selectedCity'], currentLocation => {
            console.log('currentLocation: ', currentLocation); // console.log('this.location: ', this.location);

            if (currentLocation.selectedCountryISO && currentLocation.selectedCountryISO.length > 0) {
              this.currentCountryISO = currentLocation.selectedCountryISO;
            } else if (currentLocation.currentCountryISO && currentLocation.currentCountryISO.length > 0) {
              this.currentCountryISO = currentLocation.currentCountryISO;
            }

            this.cityVisible = this.currentCountryISO !== 'any';
            console.log('this.currentCountryISO: ', this.currentCountryISO);
            console.log('this.cityVisible: ', this.cityVisible); // this.currentCountryISO = this.location.countryiso;

            let countryIndex = 0;
            let countryInList = false;

            for (let i = 0; i < this.locations.length; i++) {
              if (this.locations[i].countryISO === this.currentCountryISO) {
                countryIndex = i;
                countryInList = true;
                break;
              }
            }

            console.log('countryIndex: ', countryIndex);
            console.log('countryInList: ', countryInList);
            this.cityVisible = countryIndex > 0;
            this.countryList = [];
            let anyCountry;

            for (let i = 0; i < this.locations.length; i++) {
              const loc = this.locations[i];
              var country_translated = chrome.i18n.getMessage("country_" + loc.countryISO.toLowerCase());

              if (typeof country_translated !== 'undefined' && country_translated.length > 0) {
                loc.country = country_translated;
              }

              if (loc.countryISO.toLowerCase() === 'any') {
                anyCountry = loc;
              } else {
                this.countryList.push({
                  icon: this.locations[i].flag,
                  value: this.locations[i].countryISO,
                  text: this.locations[i].country
                });
              }
            }

            if (anyCountry) {
              this.countryList.unshift({
                icon: anyCountry.flag,
                value: anyCountry.countryISO,
                text: anyCountry.country
              });
            }

            console.log('this.countryList: ', this.countryList);
            this.cityList = [];
            const cities = this.locations[countryIndex].cities;

            for (let i = 0; i < cities.length; i++) {
              this.cityList.push({
                value: cities[i],
                text: cities[i]
              });
            }

            console.log('cities: ', cities);
            console.log('currentLocation.selectedCity: ' + currentLocation.selectedCity);

            if (currentLocation.selectedCity && currentLocation.selectedCity.length > 0) {
              const cityInList = cities.some(city => city === currentLocation.selectedCity);
              console.log('cityInList: ', cityInList);
              console.log('2 cityInList: ', cities.includes(currentLocation.selectedCity));

              if (cityInList) {
                this.city = currentLocation.selectedCity;
              } else {
                chrome.storage.local.set({
                  'selectedCity': 'Any'
                }, () => {
                  this.city = 'Any';
                });
              }
            }

            console.log('this.city: ', this.city); // } else if (currentLocation.currentCity && currentLocation.currentCity.length > 0) {
            //   this.city = currentLocation.currentCity;
            // }
            // this.city = this.location.city;

            console.log('this.cityList: ', this.cityList);
            callback && callback(countryInList);
          });
        });
      } else {
        const servers = storage["a" /* Storage */].user.getApiModeServes();
        this.countryList = [];
        this.countryList.push({
          icon: chrome.runtime.getURL(`img/flags/_unknown.png`),
          value: 'any',
          text: 'Any'
        });
        this.cityList = [];
        this.cityList.push({
          value: 'any',
          text: 'Any'
        });
        console.log('this.cityList: ', this.cityList);
        console.log('this.countryList: ', this.countryList);
        chrome.storage.local.get(['currentCountryISO', 'selectedCountryISO', 'selectedCity'], location => {
          console.log('@ location: ', location); // console.log('this.location: ', this.location);

          if (location.selectedCountryISO && location.selectedCountryISO.length > 0) {
            this.currentCountryISO = location.selectedCountryISO; // } else {
            //   this.currentCountryISO = location.currentCountryISO;
          }

          console.log('this.currentCountryISO: ', this.currentCountryISO);

          for (let country of Object.keys(servers)) {
            let city = servers[country][0];

            if (this.currentCountryISO === city.country_code) {
              for (city of servers[country]) {
                this.cityList.push({
                  value: city.city_name,
                  text: city.city_name
                });
              }
            }

            this.countryList.push({
              icon: chrome.runtime.getURL(`img/flags/${city.country_code}.png`),
              value: city.country_code,
              text: city.country_name,
              region: city.region_name
            });
          }

          if (location.selectedCity && location.selectedCity.length > 0) {
            this.city = location.selectedCity;
          }

          this.cityVisible = this.currentCountryISO !== 'any' && this.currentCountryISO !== '';
          console.log('this.cityVisible: ', this.cityVisible);
        });
      }
    },

    cityDropDownClicked(item) {
      console.log('~cityDropDownClicked~', item);

      if (storage["a" /* Storage */].app.isInstalled()) {
        if (this.premiumActive) {
          chrome.storage.local.get('isLimit', ret => {
            if (typeof ret.isLimit === 'undefined' || ret.isLimit) {
              messages["a" /* default */].toBackground().setNextNearby();
              this.$router.push({
                path: ROUTE_LIMIT_DAILY_LOGIN
              });
            }
          });
        } else {
          this.$router.push({
            path: ROUTE_MENU_PREMIUM_VERSION
          });
        }
      }
    },

    citySelected(event) {
      console.log('citySelected event: ', event);
      this.city = event.value;
      chrome.storage.local.set({
        selectedCity: event.value,
        currentCity: event.value
      });
      messages["a" /* default */].toBackground().locationSelected(this.currentCountryISO, event.value);
    }

  },
  components: {
    CustomSelect: CustomSelect
  },
  props: {
    value: Boolean
  }
});
// CONCATENATED MODULE: ./src/popup/components/LocationSelector.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_LocationSelectorvue_type_script_lang_js_ = (LocationSelectorvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/popup/components/LocationSelector.vue?vue&type=style&index=0&lang=scss&
var LocationSelectorvue_type_style_index_0_lang_scss_ = __webpack_require__(89);

// CONCATENATED MODULE: ./src/popup/components/LocationSelector.vue






/* normalize component */

var LocationSelector_component = normalizeComponent(
  components_LocationSelectorvue_type_script_lang_js_,
  LocationSelectorvue_type_template_id_2fefa841_render,
  LocationSelectorvue_type_template_id_2fefa841_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var LocationSelector_api; }
LocationSelector_component.options.__file = "src/popup/components/LocationSelector.vue"
/* harmony default export */ var LocationSelector = (LocationSelector_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/components/buttons/ReloadLocationButton.vue?vue&type=template&id=d83417ca&scoped=true&
var ReloadLocationButtonvue_type_template_id_d83417ca_scoped_true_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "reload", on: { click: _vm.reload } }, [
    _vm._m(0),
    _vm._v(" "),
    _c("div", { staticClass: "icon" }, [
      _c("img", {
        staticClass: "icon--reload",
        attrs: { src: _vm.IMG_RELOAD_ICON }
      })
    ])
  ])
}
var ReloadLocationButtonvue_type_template_id_d83417ca_scoped_true_staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "text" }, [
      _c("p", [_vm._v("RELOAD TO NEXT NEARBY LOCATION")])
    ])
  }
]
ReloadLocationButtonvue_type_template_id_d83417ca_scoped_true_render._withStripped = true


// CONCATENATED MODULE: ./src/popup/components/buttons/ReloadLocationButton.vue?vue&type=template&id=d83417ca&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/components/buttons/ReloadLocationButton.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var ReloadLocationButtonvue_type_script_lang_js_ = ({
  data() {
    return {
      IMG_RELOAD_ICON: IMG_RELOAD_ICON
    };
  },

  methods: {
    async reload() {
      console.log('~reload~');
      const location = await storage["a" /* Storage */].local.get(['selectedCountryISO', 'selectedCity']);
      console.log('location: ', location);
      messages["a" /* default */].toBackground().setNextNearby(location.selectedCountryISO, location.selectedCity);
    }

  }
});
// CONCATENATED MODULE: ./src/popup/components/buttons/ReloadLocationButton.vue?vue&type=script&lang=js&
 /* harmony default export */ var buttons_ReloadLocationButtonvue_type_script_lang_js_ = (ReloadLocationButtonvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/popup/components/buttons/ReloadLocationButton.vue?vue&type=style&index=0&id=d83417ca&lang=scss&scoped=true&
var ReloadLocationButtonvue_type_style_index_0_id_d83417ca_lang_scss_scoped_true_ = __webpack_require__(91);

// CONCATENATED MODULE: ./src/popup/components/buttons/ReloadLocationButton.vue






/* normalize component */

var ReloadLocationButton_component = normalizeComponent(
  buttons_ReloadLocationButtonvue_type_script_lang_js_,
  ReloadLocationButtonvue_type_template_id_d83417ca_scoped_true_render,
  ReloadLocationButtonvue_type_template_id_d83417ca_scoped_true_staticRenderFns,
  false,
  null,
  "d83417ca",
  null
  
)

/* hot reload */
if (false) { var ReloadLocationButton_api; }
ReloadLocationButton_component.options.__file = "src/popup/components/buttons/ReloadLocationButton.vue"
/* harmony default export */ var ReloadLocationButton = (ReloadLocationButton_component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/pages/ProtectedPage.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ var ProtectedPagevue_type_script_lang_js_ = ({
  components: {
    Main: Main,
    ProtectionStatus: ProtectionStatus,
    ProtectionType: ProtectionType,
    LocationSelector: LocationSelector,
    ReloadLocationButton: ReloadLocationButton
  }
});
// CONCATENATED MODULE: ./src/popup/pages/ProtectedPage.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_ProtectedPagevue_type_script_lang_js_ = (ProtectedPagevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/popup/pages/ProtectedPage.vue?vue&type=style&index=0&id=1487cd46&lang=scss&scoped=true&
var ProtectedPagevue_type_style_index_0_id_1487cd46_lang_scss_scoped_true_ = __webpack_require__(93);

// CONCATENATED MODULE: ./src/popup/pages/ProtectedPage.vue






/* normalize component */

var ProtectedPage_component = normalizeComponent(
  pages_ProtectedPagevue_type_script_lang_js_,
  ProtectedPagevue_type_template_id_1487cd46_scoped_true_render,
  ProtectedPagevue_type_template_id_1487cd46_scoped_true_staticRenderFns,
  false,
  null,
  "1487cd46",
  null
  
)

/* hot reload */
if (false) { var ProtectedPage_api; }
ProtectedPage_component.options.__file = "src/popup/pages/ProtectedPage.vue"
/* harmony default export */ var ProtectedPage = (ProtectedPage_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/pages/RatingPage.vue?vue&type=template&id=83437b9a&scoped=true&
var RatingPagevue_type_template_id_83437b9a_scoped_true_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("InfoPage", { attrs: { align: "center", white: "true" } }, [
    _c("h1", [
      _vm._v("\n    HOW DO YOU LIKE"),
      _c("br"),
      _vm._v("\n    TUXLER VPN?\n  ")
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "stars", on: { mouseleave: _vm.leaveStars } }, [
      _c("div", {
        staticClass: "star",
        class: { color: _vm.hasColor(1) },
        on: {
          click: function($event) {
            return _vm.selectStar(1)
          },
          mouseenter: function($event) {
            return _vm.overStar(1)
          },
          mouseleave: _vm.leaveStar
        }
      }),
      _vm._v(" "),
      _c("div", {
        staticClass: "star",
        class: { color: _vm.hasColor(2) },
        on: {
          click: function($event) {
            return _vm.selectStar(2)
          },
          mouseenter: function($event) {
            return _vm.overStar(2)
          },
          mouseleave: _vm.leaveStar
        }
      }),
      _vm._v(" "),
      _c("div", {
        staticClass: "star",
        class: { color: _vm.hasColor(3) },
        on: {
          click: function($event) {
            return _vm.selectStar(3)
          },
          mouseenter: function($event) {
            return _vm.overStar(3)
          },
          mouseleave: _vm.leaveStar
        }
      }),
      _vm._v(" "),
      _c("div", {
        staticClass: "star",
        class: { color: _vm.hasColor(4) },
        on: {
          click: function($event) {
            return _vm.selectStar(4)
          },
          mouseenter: function($event) {
            return _vm.overStar(4)
          },
          mouseleave: _vm.leaveStar
        }
      }),
      _vm._v(" "),
      _c("div", {
        staticClass: "star",
        class: { color: _vm.hasColor(5) },
        on: {
          click: function($event) {
            return _vm.selectStar(5)
          },
          mouseenter: function($event) {
            return _vm.overStar(5)
          },
          mouseleave: _vm.leaveStar
        }
      })
    ]),
    _vm._v(" "),
    _c("a", { staticClass: "btn main gold", on: { click: _vm.submitRating } }, [
      _vm._v("SUBMIT")
    ])
  ])
}
var RatingPagevue_type_template_id_83437b9a_scoped_true_staticRenderFns = []
RatingPagevue_type_template_id_83437b9a_scoped_true_render._withStripped = true


// CONCATENATED MODULE: ./src/popup/pages/RatingPage.vue?vue&type=template&id=83437b9a&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/pages/RatingPage.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//TODO: disable Submit button on start, enable after selecting rating.




/* harmony default export */ var RatingPagevue_type_script_lang_js_ = ({
  data() {
    return {
      selectedIndex: 0,
      activeIndex: 0
    };
  },

  methods: {
    selectStar(idx) {
      this.selectedIndex = idx;
    },

    overStar(idx) {
      this.activeIndex = idx;
    },

    leaveStar(evt) {
      console.log('out evt');
      console.log(evt);
      const toElementClass = evt.toElement ? evt.toElement.className : null;

      if (['star', 'stars'].includes(toElementClass)) {
        return;
      }

      this.activeIndex = 0;
    },

    leaveStars(evt) {
      console.log('leaveStars out evt');
      console.log(evt);
      const toElementClass = evt.toElement ? evt.toElement.className : null;

      if (['star'].includes(toElementClass)) {
        return;
      }

      this.activeIndex = 0;
    },

    hasColor(idx) {
      return idx <= Math.max(this.activeIndex, this.selectedIndex);
    },

    submitRating() {
      messages["a" /* default */].toApi().submitRating(this.selectedIndex);
      storage["a" /* Storage */].pages.setPage(null);

      if (this.selectedIndex < 4) {
        this.$router.replace({
          path: ROUTE_FEEDBACK
        });
      } else {
        this.$router.replace({
          path: ROUTE_SHARE_RATING
        });
      }
    }

  },
  components: {
    InfoPage: InfoPage
  }
});
// CONCATENATED MODULE: ./src/popup/pages/RatingPage.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_RatingPagevue_type_script_lang_js_ = (RatingPagevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/popup/pages/RatingPage.vue?vue&type=style&index=0&id=83437b9a&lang=scss&scoped=true&
var RatingPagevue_type_style_index_0_id_83437b9a_lang_scss_scoped_true_ = __webpack_require__(95);

// CONCATENATED MODULE: ./src/popup/pages/RatingPage.vue






/* normalize component */

var RatingPage_component = normalizeComponent(
  pages_RatingPagevue_type_script_lang_js_,
  RatingPagevue_type_template_id_83437b9a_scoped_true_render,
  RatingPagevue_type_template_id_83437b9a_scoped_true_staticRenderFns,
  false,
  null,
  "83437b9a",
  null
  
)

/* hot reload */
if (false) { var RatingPage_api; }
RatingPage_component.options.__file = "src/popup/pages/RatingPage.vue"
/* harmony default export */ var RatingPage = (RatingPage_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/pages/ShareRatingPage.vue?vue&type=template&id=caaa2498&scoped=true&
var ShareRatingPagevue_type_template_id_caaa2498_scoped_true_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("InfoPage", { attrs: { align: "center", white: "true" } }, [
    _c("h1", [
      _vm._v("\n    THANK YOU FOR RATING TUXLER VPN."),
      _c("br"),
      _vm._v("\n    PLEASE SHARE YOUR THOUGTS"),
      _c("br"),
      _vm._v("\n    ABOUT TUXLER WITH CHROME COMMUNITY\n  ")
    ]),
    _vm._v(" "),
    _c("div", [
      _c("img", {
        staticClass: "chrome-store",
        attrs: { src: _vm.IMG_CHROME_STORE }
      }),
      _vm._v(" "),
      _c(
        "a",
        {
          staticClass: "btn main gold mt-large",
          on: { click: _vm.shareFeedback }
        },
        [_vm._v("SHARE YOU OPINION")]
      )
    ])
  ])
}
var ShareRatingPagevue_type_template_id_caaa2498_scoped_true_staticRenderFns = []
ShareRatingPagevue_type_template_id_caaa2498_scoped_true_render._withStripped = true


// CONCATENATED MODULE: ./src/popup/pages/ShareRatingPage.vue?vue&type=template&id=caaa2498&scoped=true&

// EXTERNAL MODULE: ./src/js/urls.js
var urls = __webpack_require__(4);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/pages/ShareRatingPage.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ var ShareRatingPagevue_type_script_lang_js_ = ({
  data() {
    return {
      IMG_CHROME_STORE: IMG_CHROME_STORE
    };
  },

  computed: {
    storeURL() {
      //TODO: what about opera
      return platform["d" /* PlatformUtils */].isChrome() ? urls["b" /* SyncURL */].URL_EXT_HOME_CHROME : urls["b" /* SyncURL */].URL_EXT_HOME_FIREFOX;
    }

  },
  methods: {
    async shareFeedback() {
      await TabUtils.openTab(this.storeURL);
      this.$router.replace({
        path: ROUTE_DASHBOARD
      });
    }

  },
  components: {
    InfoPage: InfoPage
  }
});
// CONCATENATED MODULE: ./src/popup/pages/ShareRatingPage.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_ShareRatingPagevue_type_script_lang_js_ = (ShareRatingPagevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/popup/pages/ShareRatingPage.vue?vue&type=style&index=0&id=caaa2498&lang=scss&scoped=true&
var ShareRatingPagevue_type_style_index_0_id_caaa2498_lang_scss_scoped_true_ = __webpack_require__(97);

// CONCATENATED MODULE: ./src/popup/pages/ShareRatingPage.vue






/* normalize component */

var ShareRatingPage_component = normalizeComponent(
  pages_ShareRatingPagevue_type_script_lang_js_,
  ShareRatingPagevue_type_template_id_caaa2498_scoped_true_render,
  ShareRatingPagevue_type_template_id_caaa2498_scoped_true_staticRenderFns,
  false,
  null,
  "caaa2498",
  null
  
)

/* hot reload */
if (false) { var ShareRatingPage_api; }
ShareRatingPage_component.options.__file = "src/popup/pages/ShareRatingPage.vue"
/* harmony default export */ var ShareRatingPage = (ShareRatingPage_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/pages/ReconnectingPage.vue?vue&type=template&id=793516fe&scoped=true&
var ReconnectingPagevue_type_template_id_793516fe_scoped_true_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "lost-connection" }, [
    _c("img", { staticClass: "spinner", attrs: { src: _vm.IMG_SPINNER } }),
    _vm._v(" "),
    _c("h1", [_vm._v("PLEASE WAIT")]),
    _vm._v(" "),
    _vm._m(0),
    _vm._v(" "),
    _c("img", { staticClass: "icon--exit", attrs: { src: _vm.IMG_EXIT_ICON } })
  ])
}
var ReconnectingPagevue_type_template_id_793516fe_scoped_true_staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", [
      _vm._v("TuxlerVPN has lost connection"),
      _c("br"),
      _vm._v("\n        to the server and it’s trying to reconnect again")
    ])
  }
]
ReconnectingPagevue_type_template_id_793516fe_scoped_true_render._withStripped = true


// CONCATENATED MODULE: ./src/popup/pages/ReconnectingPage.vue?vue&type=template&id=793516fe&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/pages/ReconnectingPage.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var ReconnectingPagevue_type_script_lang_js_ = ({
  data() {
    return {
      IMG_SPINNER: IMG_SPINNER,
      IMG_EXIT_ICON: IMG_EXIT_ICON
    };
  }

});
// CONCATENATED MODULE: ./src/popup/pages/ReconnectingPage.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_ReconnectingPagevue_type_script_lang_js_ = (ReconnectingPagevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/popup/pages/ReconnectingPage.vue?vue&type=style&index=0&id=793516fe&lang=scss&scoped=true&
var ReconnectingPagevue_type_style_index_0_id_793516fe_lang_scss_scoped_true_ = __webpack_require__(99);

// CONCATENATED MODULE: ./src/popup/pages/ReconnectingPage.vue






/* normalize component */

var ReconnectingPage_component = normalizeComponent(
  pages_ReconnectingPagevue_type_script_lang_js_,
  ReconnectingPagevue_type_template_id_793516fe_scoped_true_render,
  ReconnectingPagevue_type_template_id_793516fe_scoped_true_staticRenderFns,
  false,
  null,
  "793516fe",
  null
  
)

/* hot reload */
if (false) { var ReconnectingPage_api; }
ReconnectingPage_component.options.__file = "src/popup/pages/ReconnectingPage.vue"
/* harmony default export */ var ReconnectingPage = (ReconnectingPage_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/pages/ThankYouPage.vue?vue&type=template&id=39ca94aa&scoped=true&
var ThankYouPagevue_type_template_id_39ca94aa_scoped_true_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("InfoPage", { attrs: { align: "center", white: "true" } }, [
    _c("h1", [_vm._v("\n      THANK YOU"), _c("br")]),
    _vm._v(" "),
    _c("a", { staticClass: "btn main gold", on: { click: _vm.close } }, [
      _vm._v("OK")
    ])
  ])
}
var ThankYouPagevue_type_template_id_39ca94aa_scoped_true_staticRenderFns = []
ThankYouPagevue_type_template_id_39ca94aa_scoped_true_render._withStripped = true


// CONCATENATED MODULE: ./src/popup/pages/ThankYouPage.vue?vue&type=template&id=39ca94aa&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/pages/ThankYouPage.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var ThankYouPagevue_type_script_lang_js_ = ({
  methods: {
    close() {
      this.$router.replace({
        path: ROUTE_DASHBOARD
      });
    }

  },
  components: {
    InfoPage: InfoPage
  }
});
// CONCATENATED MODULE: ./src/popup/pages/ThankYouPage.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_ThankYouPagevue_type_script_lang_js_ = (ThankYouPagevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/popup/pages/ThankYouPage.vue?vue&type=style&index=0&id=39ca94aa&lang=scss&scoped=true&
var ThankYouPagevue_type_style_index_0_id_39ca94aa_lang_scss_scoped_true_ = __webpack_require__(101);

// CONCATENATED MODULE: ./src/popup/pages/ThankYouPage.vue






/* normalize component */

var ThankYouPage_component = normalizeComponent(
  pages_ThankYouPagevue_type_script_lang_js_,
  ThankYouPagevue_type_template_id_39ca94aa_scoped_true_render,
  ThankYouPagevue_type_template_id_39ca94aa_scoped_true_staticRenderFns,
  false,
  null,
  "39ca94aa",
  null
  
)

/* hot reload */
if (false) { var ThankYouPage_api; }
ThankYouPage_component.options.__file = "src/popup/pages/ThankYouPage.vue"
/* harmony default export */ var ThankYouPage = (ThankYouPage_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/pages/WelcomePage.vue?vue&type=template&id=0f19493a&scoped=true&
var WelcomePagevue_type_template_id_0f19493a_scoped_true_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("Info", [
    _c("div", { staticClass: "content auto-height" }, [
      _c("h1", [_vm._v("PREMIUM MEMBERSHIP")]),
      _vm._v(" "),
      _c("div", { staticClass: "inputs" }, [
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.email,
              expression: "email"
            }
          ],
          attrs: { type: "text", placeholder: "EMAIL ADDRESS" },
          domProps: { value: _vm.email },
          on: {
            keyup: function($event) {
              if (
                !$event.type.indexOf("key") &&
                _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
              ) {
                return null
              }
              return _vm.logIn($event)
            },
            input: function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.email = $event.target.value
            }
          }
        }),
        _vm._v(" "),
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.password,
              expression: "password"
            }
          ],
          attrs: { type: "password", placeholder: "PASSWORD" },
          domProps: { value: _vm.password },
          on: {
            keyup: function($event) {
              if (
                !$event.type.indexOf("key") &&
                _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
              ) {
                return null
              }
              return _vm.logIn($event)
            },
            input: function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.password = $event.target.value
            }
          }
        }),
        _vm._v(" "),
        _c("div", { staticClass: "message" }, [_vm._v(_vm._s(_vm.message))])
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "buttons" }, [
      _c("a", { staticClass: "btn main gray", on: { click: _vm.logIn } }, [
        _vm._v("LOG IN")
      ]),
      _vm._v(" "),
      _c(
        "a",
        { staticClass: "btn main color", on: { click: _vm.upgradeToPremium } },
        [_vm._v("BUY PREMIUM")]
      )
    ]),
    _vm._v(" "),
    _c("h1", [_vm._v("FREE MEMBERSHIP")]),
    _vm._v(" "),
    _c("a", { staticClass: "btn main gold", on: { click: _vm.downloadApp } }, [
      _vm._v("DOWNLOAD FREE APP")
    ])
  ])
}
var WelcomePagevue_type_template_id_0f19493a_scoped_true_staticRenderFns = []
WelcomePagevue_type_template_id_0f19493a_scoped_true_render._withStripped = true


// CONCATENATED MODULE: ./src/popup/pages/WelcomePage.vue?vue&type=template&id=0f19493a&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/pages/WelcomePage.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ var WelcomePagevue_type_script_lang_js_ = ({
  mixins: [LoginMixin],
  methods: {
    upgradeToPremium() {
      TabUtils.openTab(urls["b" /* SyncURL */].URL_UPGRADE_TO_PREMIUM);
    },

    async downloadApp() {
      const url = await urls["a" /* AsyncURL */].install();
      messages["a" /* default */].toBackground().downloadApp(url);
    }

  },
  components: {
    Info: Info
  }
});
// CONCATENATED MODULE: ./src/popup/pages/WelcomePage.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_WelcomePagevue_type_script_lang_js_ = (WelcomePagevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/popup/pages/WelcomePage.vue?vue&type=style&index=0&id=0f19493a&lang=scss&scoped=true&
var WelcomePagevue_type_style_index_0_id_0f19493a_lang_scss_scoped_true_ = __webpack_require__(103);

// CONCATENATED MODULE: ./src/popup/pages/WelcomePage.vue






/* normalize component */

var WelcomePage_component = normalizeComponent(
  pages_WelcomePagevue_type_script_lang_js_,
  WelcomePagevue_type_template_id_0f19493a_scoped_true_render,
  WelcomePagevue_type_template_id_0f19493a_scoped_true_staticRenderFns,
  false,
  null,
  "0f19493a",
  null
  
)

/* hot reload */
if (false) { var WelcomePage_api; }
WelcomePage_component.options.__file = "src/popup/pages/WelcomePage.vue"
/* harmony default export */ var WelcomePage = (WelcomePage_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/pages/menu/PremiumVersionPage.vue?vue&type=template&id=0615aa6e&scoped=true&
var PremiumVersionPagevue_type_template_id_0615aa6e_scoped_true_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "InfoPage",
    { attrs: { align: "center", icon: _vm.IMG_CROWN_ICON } },
    [
      _c("h1", [
        _vm._v("\n    PLEASE ENTER YOUR PREMIUM MEMBER"),
        _c("br"),
        _vm._v("\n    CREDENTIALS TO ACCESS TUXLERVPN"),
        _c("br"),
        _vm._v("\n    PREMIUM MEMBERSHIP\n  ")
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "inputs" }, [
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.email,
              expression: "email"
            }
          ],
          attrs: { type: "text", placeholder: "EMAIL ADDRESS" },
          domProps: { value: _vm.email },
          on: {
            input: function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.email = $event.target.value
            }
          }
        }),
        _vm._v(" "),
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.password,
              expression: "password"
            }
          ],
          attrs: { type: "password", placeholder: "PASSWORD" },
          domProps: { value: _vm.password },
          on: {
            input: function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.password = $event.target.value
            }
          }
        })
      ]),
      _vm._v(" "),
      _c(
        "a",
        { staticClass: "btn main gold mt-large", on: { click: _vm.logIn } },
        [_vm._v("LOG IN")]
      )
    ]
  )
}
var PremiumVersionPagevue_type_template_id_0615aa6e_scoped_true_staticRenderFns = []
PremiumVersionPagevue_type_template_id_0615aa6e_scoped_true_render._withStripped = true


// CONCATENATED MODULE: ./src/popup/pages/menu/PremiumVersionPage.vue?vue&type=template&id=0615aa6e&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/pages/menu/PremiumVersionPage.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var PremiumVersionPagevue_type_script_lang_js_ = ({
  data() {
    return {
      IMG_CROWN_ICON: IMG_CROWN_ICON
    };
  },

  mixins: [LoginMixin],
  components: {
    InfoPage: InfoPage
  }
});
// CONCATENATED MODULE: ./src/popup/pages/menu/PremiumVersionPage.vue?vue&type=script&lang=js&
 /* harmony default export */ var menu_PremiumVersionPagevue_type_script_lang_js_ = (PremiumVersionPagevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/popup/pages/menu/PremiumVersionPage.vue





/* normalize component */

var PremiumVersionPage_component = normalizeComponent(
  menu_PremiumVersionPagevue_type_script_lang_js_,
  PremiumVersionPagevue_type_template_id_0615aa6e_scoped_true_render,
  PremiumVersionPagevue_type_template_id_0615aa6e_scoped_true_staticRenderFns,
  false,
  null,
  "0615aa6e",
  null
  
)

/* hot reload */
if (false) { var PremiumVersionPage_api; }
PremiumVersionPage_component.options.__file = "src/popup/pages/menu/PremiumVersionPage.vue"
/* harmony default export */ var PremiumVersionPage = (PremiumVersionPage_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/pages/menu/MembershipInformationPage.vue?vue&type=template&id=44f98ec8&
var MembershipInformationPagevue_type_template_id_44f98ec8_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "InfoPage",
    { attrs: { align: "center", white: "true", icon: _vm.IMG_CROWN_ICON } },
    [
      _c("h1", [
        _vm._v("\n    YOUR PREMIUM"),
        _c("br"),
        _vm._v("\n    MEMBERSHIP INFORMATION\n  ")
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "inputs" }, [
        _c("input", {
          attrs: { type: "text", disabled: "" },
          domProps: { value: _vm.userEmail }
        })
      ]),
      _vm._v(" "),
      _vm.info && _vm.expiresInDays
        ? _c("p", { staticClass: "text-center" }, [
            _vm._v("EXPIRATION DATE: "),
            _c("span", { staticClass: "text-black" }, [
              _vm._v(_vm._s(_vm.expiresInDays))
            ])
          ])
        : _vm._e(),
      _vm._v(" "),
      _c(
        "a",
        { staticClass: "btn main gray mt-large", on: { click: _vm.logOut } },
        [_vm._v("LOG OUT")]
      )
    ]
  )
}
var MembershipInformationPagevue_type_template_id_44f98ec8_staticRenderFns = []
MembershipInformationPagevue_type_template_id_44f98ec8_render._withStripped = true


// CONCATENATED MODULE: ./src/popup/pages/menu/MembershipInformationPage.vue?vue&type=template&id=44f98ec8&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/pages/menu/MembershipInformationPage.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




 // TODO: do it
// var message = chrome.i18n.getMessage("message_limit_free");
// message = message.split("\\n").join("\n");

/* harmony default export */ var MembershipInformationPagevue_type_script_lang_js_ = ({
  data() {
    return {
      info: null,
      expiresInDays: '',
      IMG_CROWN_ICON: IMG_CROWN_ICON
    };
  },

  mixins: [LoginMixin],
  computed: { ...mapGetters(['user']),

    userEmail() {
      return this.user ? this.user.email : '';
    }

  },

  async mounted() {
    this.info = await storage["a" /* Storage */].user.getAccountInfo();
    console.log('this.info: ', this.info);

    if (this.info && this.info.expirationDate !== "-1") {
      const date = new Date(this.info.expirationDate);
      const timeDiff = Math.abs(date.getTime() - Date.now());
      let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if (diffDays <= 0) {
        diffDays = 1;
      }

      this.expiresInDays = diffDays + " " + chrome.i18n.getMessage("logged_in_day" + (diffDays > 1 ? "s" : ""));
    }
  },

  components: {
    InfoPage: InfoPage
  }
});
// CONCATENATED MODULE: ./src/popup/pages/menu/MembershipInformationPage.vue?vue&type=script&lang=js&
 /* harmony default export */ var menu_MembershipInformationPagevue_type_script_lang_js_ = (MembershipInformationPagevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/popup/pages/menu/MembershipInformationPage.vue





/* normalize component */

var MembershipInformationPage_component = normalizeComponent(
  menu_MembershipInformationPagevue_type_script_lang_js_,
  MembershipInformationPagevue_type_template_id_44f98ec8_render,
  MembershipInformationPagevue_type_template_id_44f98ec8_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var MembershipInformationPage_api; }
MembershipInformationPage_component.options.__file = "src/popup/pages/menu/MembershipInformationPage.vue"
/* harmony default export */ var MembershipInformationPage = (MembershipInformationPage_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/pages/menu/AboutPage.vue?vue&type=template&id=0a5a7fb3&scoped=true&
var AboutPagevue_type_template_id_0a5a7fb3_scoped_true_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "InfoPage",
    { attrs: { align: "center", icon: _vm.IMG_ABOUT_ICON } },
    [
      _c("p", [
        _vm._v("Software version: " + _vm._s(_vm.extVersion)),
        _c("br"),
        _vm._v("\n        Release date: 04.22.2020"),
        _c("br"),
        _vm._v(" "),
        _c("br"),
        _vm._v("\n        Corporate address:\n        "),
        _c("br"),
        _vm._v("\n        Tuxler Privacy Technologies, Inc."),
        _c("br"),
        _vm._v("\n        500 Ygnacio Valley Road, Suite 410"),
        _c("br"),
        _vm._v("\n        Walnut Creek; CA 94596"),
        _c("br"),
        _vm._v(" "),
        _c("br"),
        _vm._v("\n        Website address:"),
        _c("br"),
        _vm._v(" "),
        _c(
          "a",
          { attrs: { href: "https://www.tuxler.com", target: "_blank" } },
          [_vm._v("www.tuxler.com")]
        ),
        _c("br"),
        _vm._v(" "),
        _c("br"),
        _vm._v("\n        E-mail address:"),
        _c("br"),
        _vm._v(" "),
        _c("a", { attrs: { href: "mailto:support@tuxler.com" } }, [
          _vm._v("support@tuxler.com")
        ])
      ])
    ]
  )
}
var AboutPagevue_type_template_id_0a5a7fb3_scoped_true_staticRenderFns = []
AboutPagevue_type_template_id_0a5a7fb3_scoped_true_render._withStripped = true


// CONCATENATED MODULE: ./src/popup/pages/menu/AboutPage.vue?vue&type=template&id=0a5a7fb3&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/pages/menu/AboutPage.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var AboutPagevue_type_script_lang_js_ = ({
  data() {
    return {
      IMG_ABOUT_ICON: IMG_ABOUT_ICON
    };
  },

  computed: {
    extVersion() {
      return chrome.runtime.getManifest().version;
    }

  },
  components: {
    InfoPage: InfoPage
  }
});
// CONCATENATED MODULE: ./src/popup/pages/menu/AboutPage.vue?vue&type=script&lang=js&
 /* harmony default export */ var menu_AboutPagevue_type_script_lang_js_ = (AboutPagevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/popup/pages/menu/AboutPage.vue





/* normalize component */

var AboutPage_component = normalizeComponent(
  menu_AboutPagevue_type_script_lang_js_,
  AboutPagevue_type_template_id_0a5a7fb3_scoped_true_render,
  AboutPagevue_type_template_id_0a5a7fb3_scoped_true_staticRenderFns,
  false,
  null,
  "0a5a7fb3",
  null
  
)

/* hot reload */
if (false) { var AboutPage_api; }
AboutPage_component.options.__file = "src/popup/pages/menu/AboutPage.vue"
/* harmony default export */ var AboutPage = (AboutPage_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/pages/menu/SupportPage.vue?vue&type=template&id=7c661e35&
var SupportPagevue_type_template_id_7c661e35_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "InfoPage",
    { attrs: { align: "center", icon: _vm.IMG_SUPPORT_ICON } },
    [
      _c("p", [
        _vm._v("TuxlerVPN provides "),
        _c("span", { staticClass: "text-gold" }, [_vm._v("24/7")]),
        _vm._v(" support for all our users.\n        "),
        _c("br"),
        _vm._v(" "),
        _c("br"),
        _vm._v("\n        Please feel free to contact us at any time.\n    ")
      ]),
      _vm._v(" "),
      _c(
        "a",
        {
          staticClass: "btn main gold mt-large",
          attrs: { href: _vm.URL_CONTACT_SUPPORT, target: "_blank" }
        },
        [_vm._v("contact support team")]
      )
    ]
  )
}
var SupportPagevue_type_template_id_7c661e35_staticRenderFns = []
SupportPagevue_type_template_id_7c661e35_render._withStripped = true


// CONCATENATED MODULE: ./src/popup/pages/menu/SupportPage.vue?vue&type=template&id=7c661e35&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/pages/menu/SupportPage.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var SupportPagevue_type_script_lang_js_ = ({
  data() {
    return {
      IMG_SUPPORT_ICON: IMG_SUPPORT_ICON,
      URL_CONTACT_SUPPORT: urls["b" /* SyncURL */].URL_CONTACT_SUPPORT
    };
  },

  components: {
    InfoPage: InfoPage
  }
});
// CONCATENATED MODULE: ./src/popup/pages/menu/SupportPage.vue?vue&type=script&lang=js&
 /* harmony default export */ var menu_SupportPagevue_type_script_lang_js_ = (SupportPagevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/popup/pages/menu/SupportPage.vue





/* normalize component */

var SupportPage_component = normalizeComponent(
  menu_SupportPagevue_type_script_lang_js_,
  SupportPagevue_type_template_id_7c661e35_render,
  SupportPagevue_type_template_id_7c661e35_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var SupportPage_api; }
SupportPage_component.options.__file = "src/popup/pages/menu/SupportPage.vue"
/* harmony default export */ var SupportPage = (SupportPage_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/pages/menu/ResellerProgramPage.vue?vue&type=template&id=5856a318&
var ResellerProgramPagevue_type_template_id_5856a318_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "InfoPage",
    { attrs: { align: "center", icon: _vm.IMG_RESELL_ICON } },
    [
      _c("p", [
        _vm._v("Become a TuxlerVPN reseller and "),
        _c("span", { staticClass: "text-gold" }, [_vm._v("earn money")]),
        _vm._v(" reselling TuxlerVPN Keys to your local community.")
      ]),
      _vm._v(" "),
      _c(
        "a",
        {
          staticClass: "btn main gold mt-large",
          attrs: { href: _vm.URL_REFERRAL_PROGRAM, target: "_blank" }
        },
        [_vm._v("join")]
      )
    ]
  )
}
var ResellerProgramPagevue_type_template_id_5856a318_staticRenderFns = []
ResellerProgramPagevue_type_template_id_5856a318_render._withStripped = true


// CONCATENATED MODULE: ./src/popup/pages/menu/ResellerProgramPage.vue?vue&type=template&id=5856a318&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/pages/menu/ResellerProgramPage.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//



/* harmony default export */ var ResellerProgramPagevue_type_script_lang_js_ = ({
  data() {
    return {
      IMG_RESELL_ICON: IMG_RESELL_ICON,
      URL_REFERRAL_PROGRAM: urls["b" /* SyncURL */].URL_REFERRAL_PROGRAM
    };
  },

  components: {
    InfoPage: InfoPage
  }
});
// CONCATENATED MODULE: ./src/popup/pages/menu/ResellerProgramPage.vue?vue&type=script&lang=js&
 /* harmony default export */ var menu_ResellerProgramPagevue_type_script_lang_js_ = (ResellerProgramPagevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/popup/pages/menu/ResellerProgramPage.vue





/* normalize component */

var ResellerProgramPage_component = normalizeComponent(
  menu_ResellerProgramPagevue_type_script_lang_js_,
  ResellerProgramPagevue_type_template_id_5856a318_render,
  ResellerProgramPagevue_type_template_id_5856a318_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var ResellerProgramPage_api; }
ResellerProgramPage_component.options.__file = "src/popup/pages/menu/ResellerProgramPage.vue"
/* harmony default export */ var ResellerProgramPage = (ResellerProgramPage_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/pages/menu/UserGuidePage.vue?vue&type=template&id=686612d2&scoped=true&
var UserGuidePagevue_type_template_id_686612d2_scoped_true_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "InfoPage",
    { attrs: { align: "center", icon: _vm.IMG_USER_ICON } },
    [
      _c("p", [
        _vm._v(
          "Visit our user guide and learn how to use all TuxlerVPN features."
        )
      ]),
      _vm._v(" "),
      _c(
        "a",
        {
          staticClass: "btn main gold mt-large",
          attrs: { target: "_blank", href: _vm.URL_HELP }
        },
        [_vm._v("view user guide")]
      )
    ]
  )
}
var UserGuidePagevue_type_template_id_686612d2_scoped_true_staticRenderFns = []
UserGuidePagevue_type_template_id_686612d2_scoped_true_render._withStripped = true


// CONCATENATED MODULE: ./src/popup/pages/menu/UserGuidePage.vue?vue&type=template&id=686612d2&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/pages/menu/UserGuidePage.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//



/* harmony default export */ var UserGuidePagevue_type_script_lang_js_ = ({
  data() {
    return {
      IMG_USER_ICON: IMG_USER_ICON,
      URL_HELP: urls["b" /* SyncURL */].URL_HELP
    };
  },

  components: {
    InfoPage: InfoPage
  }
});
// CONCATENATED MODULE: ./src/popup/pages/menu/UserGuidePage.vue?vue&type=script&lang=js&
 /* harmony default export */ var menu_UserGuidePagevue_type_script_lang_js_ = (UserGuidePagevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/popup/pages/menu/UserGuidePage.vue





/* normalize component */

var UserGuidePage_component = normalizeComponent(
  menu_UserGuidePagevue_type_script_lang_js_,
  UserGuidePagevue_type_template_id_686612d2_scoped_true_render,
  UserGuidePagevue_type_template_id_686612d2_scoped_true_staticRenderFns,
  false,
  null,
  "686612d2",
  null
  
)

/* hot reload */
if (false) { var UserGuidePage_api; }
UserGuidePage_component.options.__file = "src/popup/pages/menu/UserGuidePage.vue"
/* harmony default export */ var UserGuidePage = (UserGuidePage_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/pages/menu/UninstallGuidePage.vue?vue&type=template&id=5d614afc&scoped=true&
var UninstallGuidePagevue_type_template_id_5d614afc_scoped_true_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "InfoPage",
    { attrs: { align: "center", icon: _vm.IMG_TRASH_ICON } },
    [
      _c("p", [
        _vm._v(
          "TuxlerVPN extension works with TuxlerVPN application and uninstalling the\n        extension is not enough to fully uninstall TuxlerVPN. Please follow Uninstall\n        Guide steps to fully uninstall TuxlerVPN from your computer.\n    "
        )
      ]),
      _vm._v(" "),
      _c(
        "a",
        {
          staticClass: "btn main gold mt-large",
          attrs: { href: _vm.urlUninstallGuide, target: "_blank" }
        },
        [_vm._v("view uninstall guide")]
      )
    ]
  )
}
var UninstallGuidePagevue_type_template_id_5d614afc_scoped_true_staticRenderFns = []
UninstallGuidePagevue_type_template_id_5d614afc_scoped_true_render._withStripped = true


// CONCATENATED MODULE: ./src/popup/pages/menu/UninstallGuidePage.vue?vue&type=template&id=5d614afc&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/pages/menu/UninstallGuidePage.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var UninstallGuidePagevue_type_script_lang_js_ = ({
  data() {
    return {
      urlUninstallGuide: '',
      IMG_TRASH_ICON: IMG_TRASH_ICON
    };
  },

  async mounted() {
    this.urlUninstallGuide = await urls["a" /* AsyncURL */].uninstall();
  },

  components: {
    InfoPage: InfoPage
  }
});
// CONCATENATED MODULE: ./src/popup/pages/menu/UninstallGuidePage.vue?vue&type=script&lang=js&
 /* harmony default export */ var menu_UninstallGuidePagevue_type_script_lang_js_ = (UninstallGuidePagevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/popup/pages/menu/UninstallGuidePage.vue





/* normalize component */

var UninstallGuidePage_component = normalizeComponent(
  menu_UninstallGuidePagevue_type_script_lang_js_,
  UninstallGuidePagevue_type_template_id_5d614afc_scoped_true_render,
  UninstallGuidePagevue_type_template_id_5d614afc_scoped_true_staticRenderFns,
  false,
  null,
  "5d614afc",
  null
  
)

/* hot reload */
if (false) { var UninstallGuidePage_api; }
UninstallGuidePage_component.options.__file = "src/popup/pages/menu/UninstallGuidePage.vue"
/* harmony default export */ var UninstallGuidePage = (UninstallGuidePage_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/pages/LimitFreePage.vue?vue&type=template&id=0089b95f&
var LimitFreePagevue_type_template_id_0089b95f_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "InfoPage",
    { attrs: { align: "center", white: "true", icon: _vm.IMG_INFO_ICON } },
    [
      _c("h1", [
        _vm._v("\n    YOU HAVE REACHED YOUR"),
        _c("br"),
        _vm._v("\n    DAILY LOCATION CHANGE LIMIT"),
        _c("br")
      ]),
      _vm._v(" "),
      _c("p", [
        _vm._v("From now on worldwide locations"),
        _c("br"),
        _vm._v("\n    Will be assigned randomly."),
        _c("br"),
        _vm._v("\n    This limit will reset in 9 hours.")
      ]),
      _vm._v(" "),
      _c("a", { staticClass: "btn main gold", on: { click: _vm.upgrade } }, [
        _vm._v("UPGRADE TO PREMIUM")
      ])
    ]
  )
}
var LimitFreePagevue_type_template_id_0089b95f_staticRenderFns = []
LimitFreePagevue_type_template_id_0089b95f_render._withStripped = true


// CONCATENATED MODULE: ./src/popup/pages/LimitFreePage.vue?vue&type=template&id=0089b95f&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/pages/LimitFreePage.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




 // TODO: do it
// var message = chrome.i18n.getMessage("message_limit_free");
// message = message.split("\\n").join("\n");

/* harmony default export */ var LimitFreePagevue_type_script_lang_js_ = ({
  data() {
    return {
      IMG_INFO_ICON: IMG_INFO_ICON
    };
  },

  methods: {
    async upgrade() {
      await TabUtils.openTab(urls["b" /* SyncURL */].URL_UPGRADE_TO_PREMIUM);
      this.$router.replace({
        path: ROUTE_DASHBOARD
      });
    }

  },
  components: {
    InfoPage: InfoPage
  }
});
// CONCATENATED MODULE: ./src/popup/pages/LimitFreePage.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_LimitFreePagevue_type_script_lang_js_ = (LimitFreePagevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/popup/pages/LimitFreePage.vue





/* normalize component */

var LimitFreePage_component = normalizeComponent(
  pages_LimitFreePagevue_type_script_lang_js_,
  LimitFreePagevue_type_template_id_0089b95f_render,
  LimitFreePagevue_type_template_id_0089b95f_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var LimitFreePage_api; }
LimitFreePage_component.options.__file = "src/popup/pages/LimitFreePage.vue"
/* harmony default export */ var LimitFreePage = (LimitFreePage_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/pages/LimitPremiumPage.vue?vue&type=template&id=5ebacc72&
var LimitPremiumPagevue_type_template_id_5ebacc72_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "InfoPage",
    { attrs: { align: "center", white: "true", icon: _vm.IMG_INFO_ICON } },
    [
      _c("h1", [
        _vm._v("\n    YOU HAVE REACHED YOUR PREMIUM"),
        _c("br"),
        _vm._v("\n    DAILY LOCATION CHANGE LIMIT"),
        _c("br")
      ]),
      _vm._v(" "),
      _c("p", [
        _vm._v(
          "From now worldwide locations will be assigned randomly. This limit will reset in 24 hours."
        )
      ]),
      _vm._v(" "),
      _c("br"),
      _vm._v(" "),
      _c("a", { staticClass: "btn main gold", on: { click: _vm.goBack } }, [
        _vm._v("RETURN")
      ])
    ]
  )
}
var LimitPremiumPagevue_type_template_id_5ebacc72_staticRenderFns = []
LimitPremiumPagevue_type_template_id_5ebacc72_render._withStripped = true


// CONCATENATED MODULE: ./src/popup/pages/LimitPremiumPage.vue?vue&type=template&id=5ebacc72&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/pages/LimitPremiumPage.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//


 // TODO: do it
// var message = chrome.i18n.getMessage("message_limit_premium");
// message = message.split("\\n").join("\n");

/* harmony default export */ var LimitPremiumPagevue_type_script_lang_js_ = ({
  data() {
    return {
      IMG_INFO_ICON: IMG_INFO_ICON
    };
  },

  methods: {
    goBack() {
      this.$router.replace({
        path: ROUTE_DASHBOARD
      });
    }

  },
  components: {
    InfoPage: InfoPage
  }
});
// CONCATENATED MODULE: ./src/popup/pages/LimitPremiumPage.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_LimitPremiumPagevue_type_script_lang_js_ = (LimitPremiumPagevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/popup/pages/LimitPremiumPage.vue





/* normalize component */

var LimitPremiumPage_component = normalizeComponent(
  pages_LimitPremiumPagevue_type_script_lang_js_,
  LimitPremiumPagevue_type_template_id_5ebacc72_render,
  LimitPremiumPagevue_type_template_id_5ebacc72_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var LimitPremiumPage_api; }
LimitPremiumPage_component.options.__file = "src/popup/pages/LimitPremiumPage.vue"
/* harmony default export */ var LimitPremiumPage = (LimitPremiumPage_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/pages/LimitMultiLoginPage.vue?vue&type=template&id=31a7d8ba&
var LimitMultiLoginPagevue_type_template_id_31a7d8ba_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "InfoPage",
    { attrs: { align: "center", white: "true", icon: _vm.IMG_INFO_ICON } },
    [
      _c("h1", [_vm._v("\n    MULTIPLE LOGINS DETECTED\n  ")]),
      _vm._v(" "),
      _c("p", [
        _vm._v("One Tuxler licence can be used on one device only."),
        _c("br"),
        _vm._v("\n    Please do not share your account.")
      ]),
      _vm._v(" "),
      _c("a", { staticClass: "btn main gold", on: { click: _vm.goBack } }, [
        _vm._v("RETURN")
      ])
    ]
  )
}
var LimitMultiLoginPagevue_type_template_id_31a7d8ba_staticRenderFns = []
LimitMultiLoginPagevue_type_template_id_31a7d8ba_render._withStripped = true


// CONCATENATED MODULE: ./src/popup/pages/LimitMultiLoginPage.vue?vue&type=template&id=31a7d8ba&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/pages/LimitMultiLoginPage.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//


 // TODO: do it
// var message = chrome.i18n.getMessage("message_limit_multi_login");
// message = message.split("\\n").join("\n");

/* harmony default export */ var LimitMultiLoginPagevue_type_script_lang_js_ = ({
  data() {
    return {
      IMG_INFO_ICON: IMG_INFO_ICON
    };
  },

  methods: {
    goBack() {
      this.$router.replace({
        path: ROUTE_DASHBOARD
      });
    }

  },
  components: {
    InfoPage: InfoPage
  }
});
// CONCATENATED MODULE: ./src/popup/pages/LimitMultiLoginPage.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_LimitMultiLoginPagevue_type_script_lang_js_ = (LimitMultiLoginPagevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/popup/pages/LimitMultiLoginPage.vue





/* normalize component */

var LimitMultiLoginPage_component = normalizeComponent(
  pages_LimitMultiLoginPagevue_type_script_lang_js_,
  LimitMultiLoginPagevue_type_template_id_31a7d8ba_render,
  LimitMultiLoginPagevue_type_template_id_31a7d8ba_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var LimitMultiLoginPage_api; }
LimitMultiLoginPage_component.options.__file = "src/popup/pages/LimitMultiLoginPage.vue"
/* harmony default export */ var LimitMultiLoginPage = (LimitMultiLoginPage_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/pages/LimitDailyLoginPage.vue?vue&type=template&id=5b1176c3&
var LimitDailyLoginPagevue_type_template_id_5b1176c3_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "InfoPage",
    { attrs: { align: "center", white: "true", icon: _vm.IMG_INFO_ICON } },
    [
      _c("h1", [
        _vm._v("\n    YOUR DAILY LIMIT FOR THIS"),
        _c("br"),
        _vm._v("\n    LOCATION IS EXHAUSTED.\n  ")
      ]),
      _vm._v(" "),
      _c("p", [
        _vm._v(
          "Please choose other location or buy Premium version.\\nThis limit will be reset after {time} hours."
        )
      ]),
      _vm._v(" "),
      _c("a", { staticClass: "btn main gold", on: { click: _vm.goBack } }, [
        _vm._v("RETURN")
      ])
    ]
  )
}
var LimitDailyLoginPagevue_type_template_id_5b1176c3_staticRenderFns = []
LimitDailyLoginPagevue_type_template_id_5b1176c3_render._withStripped = true


// CONCATENATED MODULE: ./src/popup/pages/LimitDailyLoginPage.vue?vue&type=template&id=5b1176c3&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/pages/LimitDailyLoginPage.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//


 // TODO: do it
// var message = chrome.i18n.getMessage("message_limit_change_ip_by_country");
// message = message.split("\\n").join("\n");
// message = message.replace("{time}", msg.details);

/* harmony default export */ var LimitDailyLoginPagevue_type_script_lang_js_ = ({
  data() {
    return {
      IMG_INFO_ICON: IMG_INFO_ICON
    };
  },

  methods: {
    goBack() {
      this.$router.replace({
        path: ROUTE_DASHBOARD
      });
    }

  },
  components: {
    InfoPage: InfoPage
  }
});
// CONCATENATED MODULE: ./src/popup/pages/LimitDailyLoginPage.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_LimitDailyLoginPagevue_type_script_lang_js_ = (LimitDailyLoginPagevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/popup/pages/LimitDailyLoginPage.vue





/* normalize component */

var LimitDailyLoginPage_component = normalizeComponent(
  pages_LimitDailyLoginPagevue_type_script_lang_js_,
  LimitDailyLoginPagevue_type_template_id_5b1176c3_render,
  LimitDailyLoginPagevue_type_template_id_5b1176c3_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var LimitDailyLoginPage_api; }
LimitDailyLoginPage_component.options.__file = "src/popup/pages/LimitDailyLoginPage.vue"
/* harmony default export */ var LimitDailyLoginPage = (LimitDailyLoginPage_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/pages/FfPrivatePermission.vue?vue&type=template&id=0d52397b&
var FfPrivatePermissionvue_type_template_id_0d52397b_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "InfoPage",
    {
      attrs: {
        align: "center",
        white: "true",
        icon: _vm.IMG_INFO_ICON,
        customExit: true
      },
      on: { onExit: _vm.onExit }
    },
    [
      _c("h1", [_vm._v("\n    YOUR ACTION IS REQUIRED\n  ")]),
      _vm._v(" "),
      _c("p", { staticClass: "text-center mt-large" }, [
        _vm._v("You need to grant "),
        _c("strong", [_vm._v("Private Browsing")]),
        _vm._v(" permissions to the extension.\n  ")
      ]),
      _c("p", { staticClass: "text-center mb-large" }, [
        _vm._v("It is absolutely necessary to make it work.")
      ]),
      _vm._v(" "),
      _c("a", { staticClass: "btn main gold", on: { click: _vm.learnHow } }, [
        _vm._v("LEARN HOW")
      ])
    ]
  )
}
var FfPrivatePermissionvue_type_template_id_0d52397b_staticRenderFns = []
FfPrivatePermissionvue_type_template_id_0d52397b_render._withStripped = true


// CONCATENATED MODULE: ./src/popup/pages/FfPrivatePermission.vue?vue&type=template&id=0d52397b&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/pages/FfPrivatePermission.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//









/* harmony default export */ var FfPrivatePermissionvue_type_script_lang_js_ = ({
  data() {
    return {
      IMG_INFO_ICON: IMG_INFO_ICON
    };
  },

  mounted() {
    //TODO: remove this code after rewriting toggle with real async handling
    messages["a" /* default */].toBackground().toggleConnection(false); // const loc = Storage.user.getDefaultLocation();
    // Storage.user.setLocation(loc);
    // this.setLocation(loc);

    this.setProtected(false);
  },

  methods: { ...mapActions(['setLocation']),
    ...mapActions(NS_SYSTEM, ['setProtected']),

    learnHow() {
      TabUtils.openTab(urls["b" /* SyncURL */].URL_FF_PRIVATE_MODE_DOC);
    },

    onExit() {
      console.log('~onExit~');
      this.$router.replace({
        path: ROUTE_DASHBOARD
      });
    }

  },
  components: {
    InfoPage: InfoPage
  }
});
// CONCATENATED MODULE: ./src/popup/pages/FfPrivatePermission.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_FfPrivatePermissionvue_type_script_lang_js_ = (FfPrivatePermissionvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/popup/pages/FfPrivatePermission.vue





/* normalize component */

var FfPrivatePermission_component = normalizeComponent(
  pages_FfPrivatePermissionvue_type_script_lang_js_,
  FfPrivatePermissionvue_type_template_id_0d52397b_render,
  FfPrivatePermissionvue_type_template_id_0d52397b_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var FfPrivatePermission_api; }
FfPrivatePermission_component.options.__file = "src/popup/pages/FfPrivatePermission.vue"
/* harmony default export */ var FfPrivatePermission = (FfPrivatePermission_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/pages/AppisRequiredPage.vue?vue&type=template&id=9ebde63c&scoped=true&
var AppisRequiredPagevue_type_template_id_9ebde63c_scoped_true_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "InfoPage",
    { attrs: { align: "center", white: "true", icon: _vm.IMG_INFO_ICON } },
    [
      _c("h1", { staticClass: "mt-large" }, [_vm._v("ACTION REQUIRED")]),
      _vm._v(" "),
      _c("p", { staticClass: "mb-xl text-center" }, [
        _vm._v("TuxlerVPN Chrome Application is required "),
        _c("br"),
        _vm._v("\n    to start TuxlerVPN Extension to provide"),
        _c("br"),
        _vm._v("\n    you with maximum security."),
        _c("br"),
        _vm._v("\n    Click on the button below to safely"),
        _c("br"),
        _vm._v("\n    install TuxlerVPN"),
        _c("br"),
        _vm._v("\n    Application from our website.")
      ]),
      _vm._v(" "),
      _c("a", { staticClass: "btn main gold", on: { click: _vm.installApp } }, [
        _vm._v("INSTALL TUXLERVPN APPLICATION")
      ])
    ]
  )
}
var AppisRequiredPagevue_type_template_id_9ebde63c_scoped_true_staticRenderFns = []
AppisRequiredPagevue_type_template_id_9ebde63c_scoped_true_render._withStripped = true


// CONCATENATED MODULE: ./src/popup/pages/AppisRequiredPage.vue?vue&type=template&id=9ebde63c&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/pages/AppisRequiredPage.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ var AppisRequiredPagevue_type_script_lang_js_ = ({
  data() {
    return {
      IMG_INFO_ICON: IMG_INFO_ICON
    };
  },

  methods: {
    async installApp() {
      const url = await urls["a" /* AsyncURL */].install();
      await messages["a" /* default */].toBackground().downloadApp(url);

      if (platform["d" /* PlatformUtils */].isFirefox()) {
        window.close();
      }
    }

  },
  components: {
    InfoPage: InfoPage
  }
});
// CONCATENATED MODULE: ./src/popup/pages/AppisRequiredPage.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_AppisRequiredPagevue_type_script_lang_js_ = (AppisRequiredPagevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/popup/pages/AppisRequiredPage.vue?vue&type=style&index=0&id=9ebde63c&lang=scss&scoped=true&
var AppisRequiredPagevue_type_style_index_0_id_9ebde63c_lang_scss_scoped_true_ = __webpack_require__(105);

// CONCATENATED MODULE: ./src/popup/pages/AppisRequiredPage.vue






/* normalize component */

var AppisRequiredPage_component = normalizeComponent(
  pages_AppisRequiredPagevue_type_script_lang_js_,
  AppisRequiredPagevue_type_template_id_9ebde63c_scoped_true_render,
  AppisRequiredPagevue_type_template_id_9ebde63c_scoped_true_staticRenderFns,
  false,
  null,
  "9ebde63c",
  null
  
)

/* hot reload */
if (false) { var AppisRequiredPage_api; }
AppisRequiredPage_component.options.__file = "src/popup/pages/AppisRequiredPage.vue"
/* harmony default export */ var AppisRequiredPage = (AppisRequiredPage_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/pages/MessagePage.vue?vue&type=template&id=a2078e42&
var MessagePagevue_type_template_id_a2078e42_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "InfoPage",
    { attrs: { align: "center", white: "true", icon: _vm.IMG_INFO_ICON } },
    [
      _c("p", { staticClass: "mt-large mb-xl" }, [_vm._v(_vm._s(_vm.msg))]),
      _vm._v(" "),
      _c("a", { staticClass: "btn main gold", on: { click: _vm.goBack } }, [
        _vm._v("RETURN")
      ])
    ]
  )
}
var MessagePagevue_type_template_id_a2078e42_staticRenderFns = []
MessagePagevue_type_template_id_a2078e42_render._withStripped = true


// CONCATENATED MODULE: ./src/popup/pages/MessagePage.vue?vue&type=template&id=a2078e42&

// CONCATENATED MODULE: ./src/popup/js/i18n.js
const _ = chrome.i18n.getMessage;
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/pages/MessagePage.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//





 // TODO: do it
// var message = chrome.i18n.getMessage("message_limit_free");
// message = message.split("\\n").join("\n");

/* harmony default export */ var MessagePagevue_type_script_lang_js_ = ({
  data() {
    return {
      msg: '',
      IMG_INFO_ICON: IMG_INFO_ICON
    };
  },

  computed: { ...mapGetters(NS_UI, ['message'])
  },

  mounted() {
    this.msg = _(this.message) || this.message;
    this.setMessage(null);
  },

  methods: {
    goBack() {
      this.$router.replace({
        path: ROUTE_DASHBOARD
      });
    }

  },
  components: {
    InfoPage: InfoPage
  }
});
// CONCATENATED MODULE: ./src/popup/pages/MessagePage.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_MessagePagevue_type_script_lang_js_ = (MessagePagevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/popup/pages/MessagePage.vue





/* normalize component */

var MessagePage_component = normalizeComponent(
  pages_MessagePagevue_type_script_lang_js_,
  MessagePagevue_type_template_id_a2078e42_render,
  MessagePagevue_type_template_id_a2078e42_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var MessagePage_api; }
MessagePage_component.options.__file = "src/popup/pages/MessagePage.vue"
/* harmony default export */ var MessagePage = (MessagePage_component.exports);
// CONCATENATED MODULE: ./src/popup/router/index.js


vue_min_default.a.use(vue_router_esm);























const ROUTE_DASHBOARD = '/dashboard';
const ROUTE_FEEDBACK = '/feedback';
const ROUTE_RECONNECTING = '/reconnecting';
const ROUTE_PROTECTED = '/protected';
const ROUTE_SETTINGS = '/settings';
const ROUTE_THANK_YOU = '/thank-you';
const ROUTE_WELCOME = '/welcome';
const ROUTE_RATING = '/rating';
const ROUTE_INFO_MESSAGE = '/info-message';
const ROUTE_LIMIT_FREE = '/limit-free';
const ROUTE_LIMIT_PREMIUM = '/limit-premium';
const ROUTE_LIMIT_MULTI_LOGIN = '/limit-multi-login';
const ROUTE_LIMIT_DAILY_LOGIN = '/limit-daily-login';
const ROUTE_FF_PRIVATE_PERMISSION = '/ff-private-permission';
const ROUTE_APP_IS_REQUIRED = '/app-is-required';
const ROUTE_SHARE_RATING = '/share-rating';
const ROUTE_MENU_ABOUT = '/menu/about';
const ROUTE_MENU_SUPPORT = '/menu/support';
const ROUTE_MENU_RESELLER_PROGRAM = '/menu/reseller-program';
const ROUTE_MENU_USER_GUIDE = '/menu/user-guide';
const ROUTE_MENU_UNINSTALL_GUIDE = '/menu/uninstall-guide';
const ROUTE_MENU_PREMIUM_VERSION = '/menu/premium-version';
const ROUTE_MENU_MEMBERSHIP_INFORMATION = '/menu/membership-information';

const nameFromRoute = route => route.split('/').pop();

const router = new vue_router_esm({
  routes: [{
    path: ROUTE_THANK_YOU,
    component: ThankYouPage
  }, {
    path: ROUTE_WELCOME,
    component: WelcomePage
  }, {
    path: ROUTE_DASHBOARD,
    component: DashboardPage
  }, {
    path: ROUTE_FEEDBACK,
    component: FeedbackPage
  }, {
    path: ROUTE_RECONNECTING,
    component: ReconnectingPage
  }, {
    path: ROUTE_PROTECTED,
    component: ProtectedPage
  }, {
    path: ROUTE_RATING,
    component: RatingPage
  }, {
    path: ROUTE_LIMIT_FREE,
    component: LimitFreePage
  }, {
    path: ROUTE_LIMIT_PREMIUM,
    component: LimitPremiumPage
  }, {
    path: ROUTE_LIMIT_MULTI_LOGIN,
    component: LimitMultiLoginPage
  }, {
    path: ROUTE_LIMIT_DAILY_LOGIN,
    component: LimitDailyLoginPage
  }, {
    path: ROUTE_FF_PRIVATE_PERMISSION,
    component: FfPrivatePermission
  }, {
    path: ROUTE_APP_IS_REQUIRED,
    component: AppisRequiredPage
  }, {
    path: ROUTE_SHARE_RATING,
    component: ShareRatingPage
  }, {
    path: ROUTE_SETTINGS,
    component: SettingsPage
  }, {
    path: ROUTE_INFO_MESSAGE,
    component: MessagePage
  }, {
    path: ROUTE_MENU_ABOUT,
    component: AboutPage,
    name: nameFromRoute(ROUTE_MENU_ABOUT),
    meta: {
      title: 'ABOUT TUXLER'
    }
  }, {
    path: ROUTE_MENU_SUPPORT,
    component: SupportPage,
    name: nameFromRoute(ROUTE_MENU_SUPPORT),
    meta: {
      title: 'SUPPORT'
    }
  }, {
    path: ROUTE_MENU_RESELLER_PROGRAM,
    component: ResellerProgramPage,
    name: nameFromRoute(ROUTE_MENU_RESELLER_PROGRAM),
    meta: {
      title: 'RESSELLER PROGRAM'
    }
  }, {
    path: ROUTE_MENU_USER_GUIDE,
    component: UserGuidePage,
    name: nameFromRoute(ROUTE_MENU_USER_GUIDE),
    meta: {
      title: 'USER GUIDE'
    }
  }, {
    path: ROUTE_MENU_UNINSTALL_GUIDE,
    component: UninstallGuidePage,
    name: nameFromRoute(ROUTE_MENU_UNINSTALL_GUIDE),
    meta: {
      title: 'UNINSTALL GUIDE'
    }
  }, {
    path: ROUTE_MENU_PREMIUM_VERSION,
    component: PremiumVersionPage,
    name: nameFromRoute(ROUTE_MENU_PREMIUM_VERSION),
    meta: {
      title: 'FREE VERSION'
    }
  }, {
    path: ROUTE_MENU_MEMBERSHIP_INFORMATION,
    component: MembershipInformationPage,
    name: nameFromRoute(ROUTE_MENU_MEMBERSHIP_INFORMATION),
    meta: {
      title: 'PREMIUM VERSION'
    }
  }]
});
/* harmony default export */ var popup_router = (router);
// EXTERNAL MODULE: ./src/js/pages.js
var pages = __webpack_require__(8);

// CONCATENATED MODULE: ./src/popup/js/mixins.js








const PAGE_TO_ROUTE = {
  [pages["f" /* PAGE_RATING */]]: ROUTE_RATING,
  [pages["c" /* PAGE_LIMIT_FREE */]]: ROUTE_LIMIT_FREE,
  [pages["e" /* PAGE_LIMIT_PREMIUM */]]: ROUTE_LIMIT_PREMIUM,
  [pages["d" /* PAGE_LIMIT_MULTI_LOGIN */]]: ROUTE_LIMIT_MULTI_LOGIN,
  [pages["b" /* PAGE_LIMIT_DAILY_LOGIN */]]: ROUTE_LIMIT_DAILY_LOGIN,
  [pages["a" /* PAGE_FF_PRIVATE_PERMISSION */]]: ROUTE_FF_PRIVATE_PERMISSION
};
const RouterMixin = {
  methods: { ...mapActions(NS_SYSTEM, ['setProtected']),

    async routeAfterLogin() {
      console.log('Storage.app.isInstalled(): ', storage["a" /* Storage */].app.isInstalled());
      console.log('Storage.pages.getPage(): ', storage["a" /* Storage */].pages.getPage());
      const page = storage["a" /* Storage */].pages.getPage();

      if (page) {
        storage["a" /* Storage */].pages.setPage(null);
        this.$router.push({
          path: PAGE_TO_ROUTE[page]
        });
      } else {
        const isProxySet = await messages["a" /* default */].toBackground().isProxySet();
        console.log('############### RouterMixin::isProxySet: ', isProxySet);

        if (isProxySet) {
          this.setProtected(true);
          this.$router.push({
            path: ROUTE_PROTECTED
          });
        } else {
          this.$router.push({
            path: ROUTE_DASHBOARD
          });
        }
      }
    }

  }
};
const PagesRoutingMixin = {
  mounted() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      switch (message.action) {
        case actions["m" /* MSG_POPUP_SHOW_PAGE */]:
          {
            this.$router.push({
              path: PAGE_TO_ROUTE[message.page]
            });
            break;
          }

        case actions["l" /* MSG_POPUP_SHOW_MESSAGE */]:
          {
            this.setMessage(message.msg);
            this.$router.push({
              path: ROUTE_INFO_MESSAGE
            });
            break;
          }
      }
    });
  },

  methods: { ...mapActions(NS_UI, ['setMessage'])
  }
};
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/Popup.vue?vue&type=template&id=5f4bbcc0&scoped=true&
var Popupvue_type_template_id_5f4bbcc0_scoped_true_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "popup" },
    [
      _c("MenuSidebar"),
      _vm._v(" "),
      _c("Header"),
      _vm._v(" "),
      _c("router-view", { staticClass: "container" }),
      _vm._v(" "),
      _vm.isFooterVisible ? _c("Footer") : _vm._e()
    ],
    1
  )
}
var Popupvue_type_template_id_5f4bbcc0_scoped_true_staticRenderFns = []
Popupvue_type_template_id_5f4bbcc0_scoped_true_render._withStripped = true


// CONCATENATED MODULE: ./src/popup/Popup.vue?vue&type=template&id=5f4bbcc0&scoped=true&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/components/MenuSidebar.vue?vue&type=template&id=4c2a7f00&scoped=true&
var MenuSidebarvue_type_template_id_4c2a7f00_scoped_true_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "menu-sidebar", class: { visible: _vm.menuVisible } },
    [
      _c(
        "div",
        { staticClass: "header" },
        [
          _c("h1", [_vm._v("MENU")]),
          _vm._v(" "),
          _c("IconExit", {
            on: {
              click: function($event) {
                return _vm.setMenuVisible(false)
              }
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c("ul", [
        _c(
          "li",
          {
            on: {
              click: function($event) {
                return _vm.openRoute(_vm.ROUTE_MENU_SUPPORT)
              }
            }
          },
          [_c("span", [_vm._v("SUPPORT")])]
        ),
        _vm._v(" "),
        _vm.hasUser
          ? _c(
              "li",
              {
                on: {
                  click: function($event) {
                    return _vm.openRoute(_vm.ROUTE_MENU_MEMBERSHIP_INFORMATION)
                  }
                }
              },
              [_c("span", [_vm._v("MEMBERSHIP INFORMATION")])]
            )
          : _c(
              "li",
              {
                on: {
                  click: function($event) {
                    return _vm.openRoute(_vm.ROUTE_MENU_PREMIUM_VERSION)
                  }
                }
              },
              [_c("span", [_vm._v("UPGRADE TO PREMIUM")])]
            ),
        _vm._v(" "),
        _c(
          "li",
          {
            on: {
              click: function($event) {
                return _vm.openRoute(_vm.ROUTE_MENU_ABOUT)
              }
            }
          },
          [_c("span", [_vm._v("ABOUT TUXLER")])]
        ),
        _vm._v(" "),
        _c(
          "li",
          {
            on: {
              click: function($event) {
                return _vm.openRoute(_vm.ROUTE_MENU_RESELLER_PROGRAM)
              }
            }
          },
          [_c("span", [_vm._v("RESELLER PROGRAM")])]
        ),
        _vm._v(" "),
        _c(
          "li",
          {
            on: {
              click: function($event) {
                return _vm.openRoute(_vm.ROUTE_MENU_USER_GUIDE)
              }
            }
          },
          [_c("span", [_vm._v("USER GUIDE")])]
        ),
        _vm._v(" "),
        _c(
          "li",
          {
            on: {
              click: function($event) {
                return _vm.openRoute(_vm.ROUTE_MENU_UNINSTALL_GUIDE)
              }
            }
          },
          [_c("span", [_vm._v("UNINSTALL GUIDE")])]
        ),
        _vm._v(" "),
        _c(
          "li",
          {
            on: {
              click: function($event) {
                return _vm.openRoute(_vm.ROUTE_RATING)
              }
            }
          },
          [_c("span", [_vm._v("RATING")])]
        )
      ])
    ]
  )
}
var MenuSidebarvue_type_template_id_4c2a7f00_scoped_true_staticRenderFns = []
MenuSidebarvue_type_template_id_4c2a7f00_scoped_true_render._withStripped = true


// CONCATENATED MODULE: ./src/popup/components/MenuSidebar.vue?vue&type=template&id=4c2a7f00&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/components/MenuSidebar.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var MenuSidebarvue_type_script_lang_js_ = ({
  data() {
    return {
      ROUTE_RATING: ROUTE_RATING,
      ROUTE_MENU_PREMIUM_VERSION: ROUTE_MENU_PREMIUM_VERSION,
      ROUTE_MENU_MEMBERSHIP_INFORMATION: ROUTE_MENU_MEMBERSHIP_INFORMATION,
      ROUTE_MENU_ABOUT: ROUTE_MENU_ABOUT,
      ROUTE_MENU_SUPPORT: ROUTE_MENU_SUPPORT,
      ROUTE_MENU_RESELLER_PROGRAM: ROUTE_MENU_RESELLER_PROGRAM,
      ROUTE_MENU_USER_GUIDE: ROUTE_MENU_USER_GUIDE,
      ROUTE_MENU_UNINSTALL_GUIDE: ROUTE_MENU_UNINSTALL_GUIDE
    };
  },

  computed: { ...mapGetters(['user']),
    ...mapGetters(NS_UI, ['menuVisible']),

    hasUser() {
      return this.user && this.user.email;
    }

  },
  methods: { ...mapActions(NS_UI, ['setMenuVisible']),

    openRoute(path) {
      this.$router.push({
        path
      });
      this.setMenuVisible(false);
    }

  },
  components: {
    IconExit: IconExit
  }
});
// CONCATENATED MODULE: ./src/popup/components/MenuSidebar.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_MenuSidebarvue_type_script_lang_js_ = (MenuSidebarvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/popup/components/MenuSidebar.vue?vue&type=style&index=0&id=4c2a7f00&lang=scss&scoped=true&
var MenuSidebarvue_type_style_index_0_id_4c2a7f00_lang_scss_scoped_true_ = __webpack_require__(107);

// CONCATENATED MODULE: ./src/popup/components/MenuSidebar.vue






/* normalize component */

var MenuSidebar_component = normalizeComponent(
  components_MenuSidebarvue_type_script_lang_js_,
  MenuSidebarvue_type_template_id_4c2a7f00_scoped_true_render,
  MenuSidebarvue_type_template_id_4c2a7f00_scoped_true_staticRenderFns,
  false,
  null,
  "4c2a7f00",
  null
  
)

/* hot reload */
if (false) { var MenuSidebar_api; }
MenuSidebar_component.options.__file = "src/popup/components/MenuSidebar.vue"
/* harmony default export */ var MenuSidebar = (MenuSidebar_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/components/Header.vue?vue&type=template&id=5ed841da&scoped=true&
var Headervue_type_template_id_5ed841da_scoped_true_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "header" },
    [
      _c("PremiumBar"),
      _vm._v(" "),
      _vm.isMenuVisible
        ? _c("div", { staticClass: "menu-bar" }, [
            _vm.title
              ? _c("h1", [_vm._v(_vm._s(_vm.title))])
              : _c("img", {
                  staticClass: "logo",
                  attrs: { src: _vm.IMG_LOGO }
                }),
            _vm._v(" "),
            _c("img", {
              staticClass: "ham",
              attrs: { src: _vm.IMG_HAM },
              on: { click: _vm.toggleMenu }
            })
          ])
        : _vm._e()
    ],
    1
  )
}
var Headervue_type_template_id_5ed841da_scoped_true_staticRenderFns = []
Headervue_type_template_id_5ed841da_scoped_true_render._withStripped = true


// CONCATENATED MODULE: ./src/popup/components/Header.vue?vue&type=template&id=5ed841da&scoped=true&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/components/PremiumBar.vue?vue&type=template&id=d10760ee&scoped=true&
var PremiumBarvue_type_template_id_d10760ee_scoped_true_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.hasPremiumStatusBar
    ? _c("div", [
        _c(
          "div",
          {
            staticClass: "premium-bar",
            class: _vm.premiumStatusClass,
            on: { click: _vm.buyPremium }
          },
          [
            !_vm.premiumActive
              ? _c(
                  "svg",
                  {
                    staticStyle: { "enable-background": "new 0 0 595.3 595.3" },
                    attrs: {
                      version: "1.1",
                      id: "arrow_left",
                      xmlns: "http://www.w3.org/2000/svg",
                      "xmlns:xlink": "http://www.w3.org/1999/xlink",
                      x: "0px",
                      y: "0px",
                      width: "20px",
                      height: "20px",
                      viewBox: "0 0 595.3 595.3",
                      "xml:space": "preserve"
                    }
                  },
                  [
                    _c("path", {
                      attrs: {
                        d:
                          "M416.5,110.7c-1.1,0.5-2.2,1.1-3.2,1.8c-79.9,46.1-159.9,92.2-239.9,138.3c-16.7,9.6-33.4,19.3-50.1,29v0.1l0,0\n\tc-6.5,3.3-11,10-11,17.8c0,6.7,3.3,12.6,8.4,16.2c0.8,0.6,1.7,1.1,2.6,1.5c2.7,1.6,5.5,3.2,8.2,4.8c44.3,25.6,88.8,51.1,133.1,76.7\n\tc49.8,28.7,99.7,57.5,149.5,86.2c0.5,0.3,1,0.6,1.5,0.9c2.7,1.4,5.9,2.2,9.2,2.2c11,0,20-8.9,20-20c0,0,0,0,0,0s0,0,0,0\n\tc0-112.5,0-225,0-337.4c0,0,0,0,0,0s0,0,0,0c0-11-9-20-20-20C421.9,108.9,419,109.6,416.5,110.7z"
                      }
                    })
                  ]
                )
              : _vm._e(),
            _vm._v("\n      " + _vm._s(_vm.premiumStatusLabel) + "\n      "),
            !_vm.premiumActive
              ? _c(
                  "svg",
                  {
                    staticStyle: { "enable-background": "new 0 0 595.3 595.3" },
                    attrs: {
                      version: "1.1",
                      id: "arrow_right",
                      xmlns: "http://www.w3.org/2000/svg",
                      "xmlns:xlink": "http://www.w3.org/1999/xlink",
                      x: "0px",
                      y: "0px",
                      width: "20px",
                      height: "20px",
                      viewBox: "0 0 595.3 595.3",
                      "xml:space": "preserve"
                    }
                  },
                  [
                    _c("path", {
                      attrs: {
                        d:
                          "M416.5,110.7c-1.1,0.5-2.2,1.1-3.2,1.8c-79.9,46.1-159.9,92.2-239.9,138.3c-16.7,9.6-33.4,19.3-50.1,29v0.1l0,0\n\tc-6.5,3.3-11,10-11,17.8c0,6.7,3.3,12.6,8.4,16.2c0.8,0.6,1.7,1.1,2.6,1.5c2.7,1.6,5.5,3.2,8.2,4.8c44.3,25.6,88.8,51.1,133.1,76.7\n\tc49.8,28.7,99.7,57.5,149.5,86.2c0.5,0.3,1,0.6,1.5,0.9c2.7,1.4,5.9,2.2,9.2,2.2c11,0,20-8.9,20-20c0,0,0,0,0,0s0,0,0,0\n\tc0-112.5,0-225,0-337.4c0,0,0,0,0,0s0,0,0,0c0-11-9-20-20-20C421.9,108.9,419,109.6,416.5,110.7z"
                      }
                    })
                  ]
                )
              : _vm._e()
          ]
        )
      ])
    : _vm._e()
}
var PremiumBarvue_type_template_id_d10760ee_scoped_true_staticRenderFns = []
PremiumBarvue_type_template_id_d10760ee_scoped_true_render._withStripped = true


// CONCATENATED MODULE: ./src/popup/components/PremiumBar.vue?vue&type=template&id=d10760ee&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/components/PremiumBar.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var PremiumBarvue_type_script_lang_js_ = ({
  computed: { ...mapGetters(['premiumActive']),

    premiumStatusClass() {
      return this.premiumActive ? 'premium' : ' no-premium';
    },

    premiumStatusLabel() {
      return this.premiumActive ? 'PREMIUM MEMBERSHIP' : ' BUY PREMIUM';
    },

    hasPremiumStatusBar() {
      return ![ROUTE_WELCOME].includes(this.$route.path);
    }

  },
  methods: {
    buyPremium() {
      if (this.premiumActive) {
        return;
      }

      TabUtils.openTab(urls["b" /* SyncURL */].URL_UPGRADE_TO_PREMIUM);
    }

  }
});
// CONCATENATED MODULE: ./src/popup/components/PremiumBar.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_PremiumBarvue_type_script_lang_js_ = (PremiumBarvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/popup/components/PremiumBar.vue?vue&type=style&index=0&id=d10760ee&lang=scss&scoped=true&
var PremiumBarvue_type_style_index_0_id_d10760ee_lang_scss_scoped_true_ = __webpack_require__(109);

// CONCATENATED MODULE: ./src/popup/components/PremiumBar.vue






/* normalize component */

var PremiumBar_component = normalizeComponent(
  components_PremiumBarvue_type_script_lang_js_,
  PremiumBarvue_type_template_id_d10760ee_scoped_true_render,
  PremiumBarvue_type_template_id_d10760ee_scoped_true_staticRenderFns,
  false,
  null,
  "d10760ee",
  null
  
)

/* hot reload */
if (false) { var PremiumBar_api; }
PremiumBar_component.options.__file = "src/popup/components/PremiumBar.vue"
/* harmony default export */ var PremiumBar = (PremiumBar_component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/components/Header.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ var Headervue_type_script_lang_js_ = ({
  data() {
    return {
      activeRoute: this.$route.path,
      IMG_LOGO: IMG_LOGO,
      IMG_HAM: IMG_HAM
    };
  },

  computed: { ...mapGetters(NS_UI, ['menuVisible']),

    isMenuVisible() {
      return ![ROUTE_APP_IS_REQUIRED].includes(this.$route.path);
    },

    title() {
      return this.$route.meta.title;
    }

  },
  watch: {
    $route(to, from) {
      this.activeRoute = to;
    }

  },
  methods: { ...mapActions(NS_UI, ['setMenuVisible']),

    toggleMenu() {
      this.setMenuVisible(!this.menuVisible);
    }

  },
  components: {
    PremiumBar: PremiumBar
  }
});
// CONCATENATED MODULE: ./src/popup/components/Header.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Headervue_type_script_lang_js_ = (Headervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/popup/components/Header.vue?vue&type=style&index=0&id=5ed841da&lang=scss&scoped=true&
var Headervue_type_style_index_0_id_5ed841da_lang_scss_scoped_true_ = __webpack_require__(111);

// CONCATENATED MODULE: ./src/popup/components/Header.vue






/* normalize component */

var Header_component = normalizeComponent(
  components_Headervue_type_script_lang_js_,
  Headervue_type_template_id_5ed841da_scoped_true_render,
  Headervue_type_template_id_5ed841da_scoped_true_staticRenderFns,
  false,
  null,
  "5ed841da",
  null
  
)

/* hot reload */
if (false) { var Header_api; }
Header_component.options.__file = "src/popup/components/Header.vue"
/* harmony default export */ var Header = (Header_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/components/Footer.vue?vue&type=template&id=3da5dde8&scoped=true&
var Footervue_type_template_id_3da5dde8_scoped_true_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "bottom-bar",
      class: _vm.protected ? "state-on" : "state-off"
    },
    [
      _c("img", { staticClass: "icon--flag", attrs: { src: _vm.icon } }),
      _vm._v(" "),
      _vm.location
        ? _c("p", { staticClass: "block-location" }, [
            _vm._v("\n    " + _vm._s(_vm.location.country) + "\n    "),
            _c("br"),
            _vm._v("\n    " + _vm._s(_vm.regionAndCity) + "\n    "),
            _c("br"),
            _vm._v(" "),
            _vm.protected
              ? _c("span", { staticClass: "time-ago" }, [
                  _vm._v("(" + _vm._s(_vm.changedLabel) + ")")
                ])
              : _vm._e()
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm.protected
        ? _c("img", {
            staticClass: "icon--protected-mini",
            attrs: { src: _vm.IMG_PROTECTED_MINI_ICON }
          })
        : _c("img", {
            staticClass: "icon--unprotected-mini",
            attrs: { src: _vm.IMG_UNPROTECTED_MINI_ICON }
          })
    ]
  )
}
var Footervue_type_template_id_3da5dde8_scoped_true_staticRenderFns = []
Footervue_type_template_id_3da5dde8_scoped_true_render._withStripped = true


// CONCATENATED MODULE: ./src/popup/components/Footer.vue?vue&type=template&id=3da5dde8&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/components/Footer.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ var Footervue_type_script_lang_js_ = ({
  data() {
    return {
      icon: '',
      IMG_PROTECTED_MINI_ICON: IMG_PROTECTED_MINI_ICON,
      IMG_UNPROTECTED_MINI_ICON: IMG_UNPROTECTED_MINI_ICON
    };
  },

  computed: { ...mapGetters(['location', 'lastTimeChanged']),
    ...mapGetters(NS_SYSTEM, ['protected']),

    regionAndCity() {
      return this.location.region === 'unknown' ? this.location.city : `${this.location.region} / ${this.location.city}`;
    },

    locationISO() {
      return this.location ? this.location.countryiso : '';
    },

    changedLabel() {
      if (this.lastTimeChanged) {
        return TimeUtils.getLocationChangedTime(this.lastTimeChanged) + " " + chrome.i18n.getMessage("main_ago");
      }

      return chrome.i18n.getMessage("main_never");
    }

  },
  watch: {
    async locationISO(newISO) {
      this.icon = await messages["a" /* default */].toBackground().getFlagIcon(newISO, true);
    }

  },

  async mounted() {
    console.log('footer ~mounted~');
    console.log('this.location:', this.location);
    console.log('this.locationISO:', this.locationISO);

    if (this.location) {
      this.icon = await messages["a" /* default */].toBackground().getFlagIcon(this.locationISO, true);
    }
  }

});
// CONCATENATED MODULE: ./src/popup/components/Footer.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Footervue_type_script_lang_js_ = (Footervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/popup/components/Footer.vue?vue&type=style&index=0&id=3da5dde8&lang=scss&scoped=true&
var Footervue_type_style_index_0_id_3da5dde8_lang_scss_scoped_true_ = __webpack_require__(113);

// CONCATENATED MODULE: ./src/popup/components/Footer.vue






/* normalize component */

var Footer_component = normalizeComponent(
  components_Footervue_type_script_lang_js_,
  Footervue_type_template_id_3da5dde8_scoped_true_render,
  Footervue_type_template_id_3da5dde8_scoped_true_staticRenderFns,
  false,
  null,
  "3da5dde8",
  null
  
)

/* hot reload */
if (false) { var Footer_api; }
Footer_component.options.__file = "src/popup/components/Footer.vue"
/* harmony default export */ var Footer = (Footer_component.exports);
// CONCATENATED MODULE: ./src/popup/store/subsription.js

const NS_SUBSCRIPTION = 'SUBSCRIPTION';
const subscriptions = storage["a" /* Storage */].getSubscriptions() || [];
/* harmony default export */ var subsription = ({
  namespaced: true,
  state: {
    subscription: null
  },
  getters: {
    subscription: state => state.subscription,
    subscriptions: () => subscriptions
  },
  actions: {
    setSubscription({
      commit
    }, subscription) {
      commit('SET_SUBSCRIPTION', subscription);
    }

  },
  mutations: {
    SET_SUBSCRIPTION(state, subscription) {
      state.subscription = subscription;
    }

  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/Popup.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//








/* harmony default export */ var Popupvue_type_script_lang_js_ = ({
  data() {
    return {
      fbLoaded: false
    };
  },

  computed: { ...mapGetters(['user']),
    ...mapGetters(NS_SUBSCRIPTION, ['isLimitReached']),

    isFooterVisible() {
      return [ROUTE_DASHBOARD, ROUTE_PROTECTED].includes(this.$route.path);
    }

  },

  mounted() {
    chrome.runtime.onMessage.addListener(this._appMessageHandler);
  },

  beforeDestroy() {
    chrome.runtime.onMessage.removeListener(this._appMessageHandler);
  },

  methods: { ...mapActions(['setUser', 'setLocation']),

    _appMessageHandler(message, sender, sendResponse) {
      console.log('~Popup -> _appMessageHandler~: ', message);

      switch (message.action) {
        case actions["o" /* MSG_POPUP_UPDATE_LAST_TIME_CHANGED */]:
          {
            console.log('message.time: ', message.time);
            break;
          }

        case actions["n" /* MSG_POPUP_UPDATE_LAST_LOCATION */]:
          {
            console.log('message.location: ', message.location);
            this.setLocation(message.location);
            break;
          }
      }
    },

    _(key) {
      return _(key);
    }

  },
  components: {
    Header: Header,
    Footer: Footer,
    MenuSidebar: MenuSidebar
  }
});
// CONCATENATED MODULE: ./src/popup/Popup.vue?vue&type=script&lang=js&
 /* harmony default export */ var popup_Popupvue_type_script_lang_js_ = (Popupvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/popup/Popup.vue?vue&type=style&index=0&lang=scss&
var Popupvue_type_style_index_0_lang_scss_ = __webpack_require__(115);

// EXTERNAL MODULE: ./src/popup/Popup.vue?vue&type=style&index=1&id=5f4bbcc0&lang=scss&scoped=true&
var Popupvue_type_style_index_1_id_5f4bbcc0_lang_scss_scoped_true_ = __webpack_require__(118);

// CONCATENATED MODULE: ./src/popup/Popup.vue







/* normalize component */

var Popup_component = normalizeComponent(
  popup_Popupvue_type_script_lang_js_,
  Popupvue_type_template_id_5f4bbcc0_scoped_true_render,
  Popupvue_type_template_id_5f4bbcc0_scoped_true_staticRenderFns,
  false,
  null,
  "5f4bbcc0",
  null
  
)

/* hot reload */
if (false) { var Popup_api; }
Popup_component.options.__file = "src/popup/Popup.vue"
/* harmony default export */ var Popup = (Popup_component.exports);
// CONCATENATED MODULE: ./src/popup/js/popup.js








/**
 * Port to check if popup opened or not
 */

Object(popup["b" /* createConnectionPort */])();
new vue_min_default.a({
  el: '#appRoot',
  mixins: [RouterMixin, PagesRoutingMixin],
  template: '<Popup></Popup>',
  router: popup_router,
  store: popup_store,
  computed: { ...mapGetters(['user'])
  },

  async mounted() {
    const user = await storage["a" /* Storage */].user.getUser();
    console.log('popup: user: ', user);
    this.setUser(user);

    if (storage["a" /* Storage */].app.isInstalled()) {
      this.routeAfterLogin();
    } else {
      if (user) {
        this.routeAfterLogin();
      } else {
        popup_router.push({
          path: ROUTE_WELCOME
        });
      }
    }
  },

  methods: { ...mapActions(['setUser', 'setPremiumActive'])
  },
  components: {
    Popup: Popup
  }
});

/***/ })
/******/ ]);