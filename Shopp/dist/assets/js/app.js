/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/js/account-tabs.js":
/*!***************************************!*\
  !*** ./src/assets/js/account-tabs.js ***!
  \***************************************/
/***/ (function() {

eval("document.addEventListener('DOMContentLoaded', function () {\n    const tabs = document.querySelectorAll('.tab__item');\n    const contents = document.querySelectorAll('.tab__content');\n\n    // Активуємо перший таб і контент при завантаженні\n    if (tabs.length > 0) {\n        tabs[0].classList.add('active');\n    }\n    if (contents.length > 0) {\n        contents[0].classList.remove('disabled');\n    }\n\n    tabs.forEach((tab, idx) => {\n        tab.addEventListener('click', function () {\n            // Якщо це не перший таб, дозволяємо перемикання\n            if (idx !== 0) {\n                tabs.forEach(t => t.classList.remove('active'));\n                tab.classList.add('active');\n                contents.forEach(content => content.classList.add('disabled'));\n                const contentId = `tab-content${idx + 1}`;\n                const contentToShow = document.getElementById(contentId);\n                if (contentToShow) {\n                    contentToShow.classList.remove('disabled');\n                }\n            }\n            // Якщо це перший таб, завжди залишаємо його активним\n            else {\n                tabs.forEach(t => t.classList.remove('active'));\n                tab.classList.add('active');\n                contents.forEach(content => content.classList.add('disabled'));\n                if (contents[0]) {\n                    contents[0].classList.remove('disabled');\n                }\n            }\n\n            if (idx === 5) {\n                window.location.href = './login.html';\n            }\n        });\n    });\n\n\n    const billingLink = document.getElementById('billing-address-link');\n    const billingForm = document.getElementById('billing-address-form');\n    const shippingLink = document.getElementById('shipping-address-link');\n    const shippingForm = document.getElementById('shipping-address-form');\n\n    billingLink.addEventListener('click', e => {\n        billingForm.classList.remove('disabled');\n        e.currentTarget.parentElement.classList.add('disabled');\n    })\n    shippingLink.addEventListener('click', e => {\n        shippingForm.classList.remove('disabled');\n        e.currentTarget.parentElement.classList.add('disabled');\n    })\n\n\n    const orderLink = document.getElementById('order-link');\n    const orderTable = document.getElementById('order-table');\n    const downloadLink = document.getElementById('download-link');\n    const downloadTable = document.getElementById('download-table');\n\n    orderLink.addEventListener('click', e => {\n        orderTable.classList.remove('disabled');\n        e.currentTarget.parentElement.classList.add('disabled');\n    })\n    downloadLink.addEventListener('click', e => {\n        downloadTable.classList.remove('disabled');\n        e.currentTarget.parentElement.classList.add('disabled');\n    })\n});\n\n//# sourceURL=webpack://brainscloud/./src/assets/js/account-tabs.js?");

/***/ }),

/***/ "./src/assets/js/header-link.js":
/*!**************************************!*\
  !*** ./src/assets/js/header-link.js ***!
  \**************************************/
/***/ (function() {

eval("const headerNav = document.querySelector('[data-headerNav]');\nconst navLinks = headerNav.querySelectorAll('.nav__link');\n\nnavLinks.forEach(link => {\n    const linkPath = link.getAttribute('href').slice(2);\n    \n    if (linkPath === window.location.pathname.slice(1)) {\n        link.closest('.nav__item').classList.add('active');\n    }\n});\n\n\nconst blog = document.querySelector('[href=\"./blog.html\"]')\nconsole.log(blog);\n\nif (window.location.pathname.slice(1) === \"post.html\") {\n    blog.closest('.nav__item').classList.add('active')\n}\n\n\n//# sourceURL=webpack://brainscloud/./src/assets/js/header-link.js?");

/***/ }),

/***/ "./src/assets/js/like.js":
/*!*******************************!*\
  !*** ./src/assets/js/like.js ***!
  \*******************************/
/***/ (function() {

eval("const like = document.querySelectorAll('.badge__like');\n\nlike.forEach(item => {\n    item.addEventListener('click', e => {\n        $this = e.currentTarget;   \n            \n        $this.classList.toggle('active')\n    })\n});\n\n//# sourceURL=webpack://brainscloud/./src/assets/js/like.js?");

/***/ }),

/***/ "./src/assets/js/login.js":
/*!********************************!*\
  !*** ./src/assets/js/login.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _services_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/api */ \"./src/assets/js/services/api.js\");\n\r\n\r\n\r\nconst signIn = document.querySelector('[data-signIn]');\r\nconst signInForm = document.querySelector('[data-signInForm]');\r\nconst signUp = document.querySelector('[data-signUp]');\r\nconst signUpForm = document.querySelector('[data-signUpForm]');\r\nconst resetLink = document.querySelector('[data-resetLink]');\r\nconst switchActive = document.querySelector('.switch__active');\r\n\r\nconsole.log(switchActive);\r\n\r\nif (signIn && signUp && signInForm && signUpForm && resetLink && switchActive) {\r\n    signIn.addEventListener('click', e => {\r\n        const $this = e.currentTarget;\r\n\r\n        if(!$this.classList.contains('active')) {\r\n            $this.classList.add('active');\r\n            signUp.classList.remove('active');\r\n            signUpForm.classList.add('disabled');\r\n            signInForm.classList.remove('disabled');\r\n            resetLink.classList.remove('disabled');\r\n            switchActive.removeAttribute('style');\r\n        }\r\n    });\r\n\r\n    signUp.addEventListener('click', e => {\r\n        const $this = e.currentTarget;\r\n\r\n        if(!$this.classList.contains('active')) {\r\n            $this.classList.add('active');\r\n            signIn.classList.remove('active');\r\n            signInForm.classList.add('disabled');\r\n            signUpForm.classList.remove('disabled');\r\n            resetLink.classList.add('disabled');\r\n\r\n            switchActive.style.left = \"250px\";\r\n        }\r\n    });\r\n}\r\n\r\n\r\n\r\n// -----------------------------------\r\n\r\n\r\n\r\nconst messageDiv = document.getElementById('message');\r\n\r\nfunction showMessage(text, type) {\r\n    messageDiv.textContent = text;\r\n    messageDiv.classList.add(type);\r\n    messageDiv.classList.remove('hidden');\r\n\r\n    setTimeout(function() {\r\n        messageDiv.classList.remove(type);\r\n        messageDiv.classList.add('hidden');\r\n    }, 3000);\r\n}\r\n// password: 123@maksTest!\r\n\r\ndocument.addEventListener('DOMContentLoaded', function() {\r\n\r\n    signInForm.addEventListener('submit', function(event) {\r\n        event.preventDefault();\r\n\r\n        const emailInput = document.getElementById('emailSignIn').value;\r\n        const passwordInput = document.getElementById('passwordSignIn').value;        \r\n\r\n        const signIn = async () => {\r\n            \r\n            try {\r\n                const resp = await _services_api__WEBPACK_IMPORTED_MODULE_0__[\"default\"].loginUser({username: emailInput, password: passwordInput})\r\n                console.log(resp);\r\n\r\n                if (resp) {\r\n                    showMessage('Успішна авторизація!', 'success');\r\n                    localStorage.setItem('loggedInUser', JSON.stringify({ token: resp.token }));\r\n\r\n                    setTimeout(() => {\r\n                        window.location.href = './account.html';\r\n                    }, 1500);\r\n                } else {\r\n                    if (emailInput == '' || passwordInput == '' ) {\r\n                        showMessage('Введіть будь-ласка дані', 'error');\r\n                    } else {\r\n                        showMessage('Невірний email або пароль', 'error');\r\n                    }\r\n                    // window.location.href = './error-404.html';\r\n                }\r\n            } catch (error) {\r\n                showMessage('Вибачте будь-ласка, проблеми на сайті', 'error')\r\n            }\r\n        }\r\n\r\n        signIn();\r\n    });\r\n\r\n\r\n\r\n\r\n    signUpForm.addEventListener('submit', function(event) {\r\n        event.preventDefault();\r\n\r\n        const emailInput = document.getElementById('emailSignUp').value;\r\n        const passwordInput = document.getElementById('passwordSignUp').value; \r\n\r\n        const signUp = async () => {\r\n            try {\r\n                const resp = await _services_api__WEBPACK_IMPORTED_MODULE_0__[\"default\"].registerUser({username: emailInput, password: passwordInput})\r\n\r\n                if (resp) {\r\n                    showMessage('Успішна реєстрація!', 'success');\r\n                    localStorage.setItem('loggedInUser', JSON.stringify({ token: resp.token }));\r\n\r\n                    setTimeout(() => {\r\n                        window.location.href = './account.html';\r\n                    }, 1500);\r\n                } else {\r\n                    if (emailInput == '' || passwordInput == '' ) {\r\n                        showMessage('Введіть будь-ласка дані', 'error');\r\n                    } else {\r\n                        showMessage('Невірний email або пароль', 'error');\r\n                    }\r\n                }\r\n\r\n            } catch (error) {\r\n                showMessage('Вибачте будь-ласка, проблеми на сайті', 'error')\r\n            }\r\n        }\r\n        signUp();\r\n    })\r\n});\n\n//# sourceURL=webpack://brainscloud/./src/assets/js/login.js?");

/***/ }),

/***/ "./src/assets/js/range-slider.js":
/*!***************************************!*\
  !*** ./src/assets/js/range-slider.js ***!
  \***************************************/
/***/ (function() {

eval("var inputLeft = document.getElementById(\"range-left\");\nvar inputRight = document.getElementById(\"range-right\");\n\nvar thumbLeft = document.querySelector(\".filter__range-slider-thumb.left\");\nvar thumbRight = document.querySelector(\".filter__range-slider-thumb.right\");\nvar range = document.querySelector(\".filter__range-slider-range\");\n\nfunction setLeftValue() {\n\tvar _this = inputLeft,\n\t\tmin = parseInt(_this.min),\n\t\tmax = parseInt(_this.max);\n\n\t_this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 1);\n\n\tvar percent = ((_this.value - min) / (max - min)) * 100;\n\n\tthumbLeft.style.left = percent + \"%\";\n\trange.style.left = percent + \"%\";\n}\nsetLeftValue();\n\nfunction setRightValue() {\n\tvar _this = inputRight,\n\t\tmin = parseInt(_this.min),\n\t\tmax = parseInt(_this.max);\n\n\t_this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value) + 1);\n\n\tvar percent = ((_this.value - min) / (max - min)) * 100;\n\n\tthumbRight.style.right = (100 - percent) + \"%\";\n\trange.style.right = (100 - percent) + \"%\";\n}\nsetRightValue();\n\ninputLeft.addEventListener(\"input\", setLeftValue);\ninputRight.addEventListener(\"input\", setRightValue);\n\ninputLeft.addEventListener(\"mouseover\", function () {\n\tthumbLeft.classList.add(\"hover\");\n});\ninputLeft.addEventListener(\"mouseout\", function () {\n\tthumbLeft.classList.remove(\"hover\");\n});\ninputLeft.addEventListener(\"mousedown\", function () {\n\tthumbLeft.classList.add(\"active\");\n});\ninputLeft.addEventListener(\"mouseup\", function () {\n\tthumbLeft.classList.remove(\"active\");\n});\n\ninputRight.addEventListener(\"mouseover\", function () {\n\tthumbRight.classList.add(\"hover\");\n});\ninputRight.addEventListener(\"mouseout\", function () {\n\tthumbRight.classList.remove(\"hover\");\n});\ninputRight.addEventListener(\"mousedown\", function () {\n\tthumbRight.classList.add(\"active\");\n});\ninputRight.addEventListener(\"mouseup\", function () {\n\tthumbRight.classList.remove(\"active\");\n});\n\nconsole.log('hello');\n\n//# sourceURL=webpack://brainscloud/./src/assets/js/range-slider.js?");

/***/ }),

/***/ "./src/assets/js/services/api.js":
/*!***************************************!*\
  !*** ./src/assets/js/services/api.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ API; }\n/* harmony export */ });\nconst API_URL = 'http://127.0.0.1:8000'\n\nclass API {\n    \n    static async loginUser(body) {\n        const response = await fetch(`${API_URL}/auth/`, {\n            method: 'POST',\n            headers: {\n                'Content-Type': 'application/json',\n            },\n            body: JSON.stringify(body)\n        })\n\n        if(!response.ok) {\n            return null;\n        }\n        return await response.json();\n    }\n    \n    static async registerUser(body) {\n        const response = await fetch(`${API_URL}/api/users/`, {\n            method: 'POST',\n            headers: {\n                'Content-Type': 'application/json',\n            },\n            body: JSON.stringify(body)\n        })\n\n        if(!response.ok) {\n            return null;\n        }\n        return await response.json();\n    }\n    \n    static async fetchMovies(token) {\n        const response = await fetch(`${API_URL}/api/movies/`, {\n            method: 'GET',\n            headers: {\n                'Content-Type': 'application/json',\n                'Authorization': `Token ${token}`,\n            },\n        })\n\n        if(!response.ok) {\n            return null;\n        }\n        return await response.json();\n    }\n    \n    static async getMovie(movie_id, token) {\n        const response = await fetch(`${API_URL}/api/movies/${movie_id}`, {\n            method: 'GET',\n            headers: {\n                'Content-Type': 'application/json',\n                'Authorization': `Token ${token}`,\n            },\n        })\n\n        if(!response.ok) {\n            return null;\n        }\n        return await response.json();\n    }\n    \n    static async rateMovie(movie_id, body, token) {\n        const response = await fetch(`${API_URL}/api/movies/${movie_id}/rate_movie/`, {\n            method: 'POST',\n            headers: {\n                'Content-Type': 'application/json',\n                'Authorization': `Token ${token}`,\n            },\n            body: JSON.stringify(body),\n        })\n\n        if(!response.ok) {\n            return null;\n        }\n        return await response.json();\n    }\n    \n    static async updateMovie(movie_id, body, token) {\n        const response = await fetch(`${API_URL}/api/movies/${movie_id}/`, {\n            method: 'PUT',\n            headers: {\n                'Content-Type': 'application/json',\n                'Authorization': `Token ${token}`,\n            },\n            body: JSON.stringify(body),\n        })\n\n        if(!response.ok) {\n            return null;\n        }\n        return await response.json();\n    }\n    \n    static async createMovie(body, token) {\n        const response = await fetch(`${API_URL}/api/movies/`, {\n            method: 'POST',\n            headers: {\n                'Content-Type': 'application/json',\n                'Authorization': `Token ${token}`,\n            },\n            body: JSON.stringify(body),\n        })\n\n        if(!response.ok) {\n            return null;\n        }\n        return await response.json();\n    }\n    \n    static async deleteMovie(movie_id, token) {\n        const response = await fetch(`${API_URL}/api/movies/${movie_id}/`, {\n            method: 'DELETE',\n            headers: {\n                'Content-Type': 'application/json',\n                'Authorization': `Token ${token}`,\n            },\n        })\n\n        if(!response.ok) {\n            return false;\n        }\n        return true;\n    }\n}\n\n//# sourceURL=webpack://brainscloud/./src/assets/js/services/api.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	__webpack_require__("./src/assets/js/account-tabs.js");
/******/ 	__webpack_require__("./src/assets/js/header-link.js");
/******/ 	__webpack_require__("./src/assets/js/like.js");
/******/ 	__webpack_require__("./src/assets/js/login.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/assets/js/range-slider.js");
/******/ 	
/******/ })()
;