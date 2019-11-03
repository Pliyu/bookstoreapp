/* eslint-disable */
// common.js

function AssertFailed(message) {
        this.toString = function() { return 'AssertFailed: ' + message; }
}

function assert(exp, message) {
        if (!exp) throw new AssertFailed(message);
}

if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined'
              ? args[number] : match;
        });
    };
}

if (!String.prototype.sprintf) {
    String.prototype.sprintf = function () {
        var args = arguments;
        var idx = 0;
        return this.replace(/%s/g, function() {
            return args[idx++];
        });
    };
}

// exceptions.js
//OSError
//    TimeoutError  <- match python excepiton inheritance system
//    ConnectionError  <- match python excepiton inheritance system
//RpcError
//    RpcClientError
//    RpcServerError
//    RpcParseError
//    RpcAuthFailureError

class RpcError extends Error {
    constructor(msg, code=-1, ...args) {
        super('code {0}, {1}'.format(code, msg), ...args)
        this.code = code;
        this.msg = msg;
    }
    setCode(code) {
        this.code = code;
        return this;
    }
    static
    CreateByCode(code, fmt='', ...args) {
        if ([0, 200].indexOf(code) >= 0) {
            return null;
        } else if ([401, 403].indexOf(code) >= 0) {
            return new RpcAuthFailureError('RpcAuthFailureError({0}) {1}'.format(
                        code, fmt.sprintf(...args)), code);
        } else if (code >= 400 && code < 500) {
            return new RpcClientError('RpcClientError({0}) {1}'.format(
                    code, fmt.sprintf(...args)), code);
        } else if (code >= 500 && code < 600) {
            return new RpcServerError('RpcServerError({0}) {1}'.format(
                    code, fmt.sprintf(...args)), code);
        } else if (code === -102) {
            return new RpcLogicDoesNotExist(fmt.sprintf(...args), code);
        } else if (code === -103) {
            return new RpcLogicPermissionDenied(fmt.sprintf(...args), code);
        } else if (code === -104) {
            return new RpcLogicValidationError(fmt.sprintf(...args), code);
        } else if (code === -101) {
            return new RpcLogicError(fmt.sprintf(...args), code);
        } else {
            return new RpcError('RpcError({0}) {1}'.format(code, fmt.sprintf(...args)), code);
        }
    }
}

class RpcClientError extends RpcError {  // 4xx error
    constructor(...args) {
        super(...args);
    }
}

class RpcServerError extends RpcError {  // 5xx error
    constructor(...args) {
        super(...args);
    }
}

class RpcParseError extends RpcError {  // parse server response error
    constructor(...args) {
        super(...args);
    }
}

class RpcSerializeError extends RpcError {  // parse server response error
    constructor(...args) {
        super(...args);
    }
}

class RpcAuthFailureError extends RpcError {  // 401 403 error
    constructor(...args) {
        super(...args);
    }
}

class RpcLogicError extends RpcError {
    // base class for rpc logic exception
    constructor(msg='', code=-101, ...args) {
        assert(code < -100)
        super(msg, code);
    }
}

class RpcLogicValidationError extends RpcLogicError {
    // @brief: 参数检查失败
    constructor(msg='') {
        super(msg, -104);
    }
}

class RpcLogicPermissionDenied extends RpcLogicError {
    // @brief: 权限校验失败
    constructor(msg='') {
        super(msg, -103);
    }
}

class RpcLogicDoesNotExist extends RpcLogicError {
    // @brief: 访问对象不存在
    constructor(msg='') {
        super(msg, -102);
    }
}

// === JsonResponse JsonRequest ===
class JsonResponse {
    constructor(json, req, jqXHR) {
        this.json = json;
        this.req = req;
        this.jqXHR = jqXHR;
    }

    get status_code() {
        return this.jqXHR.status;
    }
}

class JsonRequest {
    constructor(url, params, trymax=1024, interval=13) {
        this.url = url;
        this.params = params;
        // TODO: implement trymax
        this.trymax = trymax;
        this.interval = interval;
        this.headers = {};
        this.cleanParams(this.params)
    }

    request() {
        return this._request();
    }

    cleanParams (params) {
        for (let key in params) {
            if (Object.prototype.toString.call(params[key]) === "[object String]") {
                params[key] = params[key].trim()
            } else if (Object.prototype.toString.call(params[key]) === "[object Object]") {
                this.cleanParams(params[key])
            } else if (Object.prototype.toString.call(params[key]) === "[object Array]") {
                this.cleanParams(params[key])
            }
        }
    }

    _processJsonResponse (response, resolve, reject) {
        let jobj = response.json();
        jobj.then(function (jobj) {
        let exc = RpcError.CreateByCode(jobj['code'], jobj['message']);
        if (exc) {
          console.error(exc);
          reject(exc);
        } else {
          resolve(new JsonResponse(jobj, this, response));
        }
      });
    }

    _processAttachmentResponse (response, resolve, reject) {
        var filename = ''
        var disposition = response.headers.get('Content-Disposition');
        var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        var matches = filenameRegex.exec(disposition);
        if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, '');
            // filename = decodeURI(filename)
        }

        return response.blob()
            .then(blob => {
              var url = URL.createObjectURL(blob)
              return url
            })
            .then(url => {
              console.log(url)
              if (filename) {
                const link = document.createElement('a')
                link.download = filename
                link.href = url
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
              } else {
                window.open(url, '_blank');
              }
              URL.revokeObjectURL(url);
            });
    }

    _request() {
        console.debug('request url(%s)'.sprintf(this.url));
        var _this = this;

        if (window.fetch != undefined) {
        var result = new Promise(function(resolve, reject) {
            _this.headers['Content-Type'] = 'application/json';
            _this.headers['Accept'] = 'application/json';
            fetch(_this.url, {
                body: JSON.stringify(_this.params),
                method: 'post',
                redirect: 'follow',
                mode: 'cors',
                headers: _this.headers,
                // credentials: 'include',
            })
            .then(function(response) {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                  _this._processJsonResponse(response, resolve, reject)
                } else {
                  var disposition = response.headers.get('Content-Disposition');
                  if (disposition && disposition.indexOf('attachment') !== -1) {
                    return _this._processAttachmentResponse(response, resolve, reject)
                  }
                  reject(RpcError.CreateByCode(response.status, response.statusText))
                }
            })
            .catch(function (error) {
                reject(new RpcError(error));
            });
        });
        } else if (window.jQuery != undefined) {
            // use jQuery ajax
            $jQuery.ajax({
                url: _this.url,
                type: "POST",
                crossDomain: true,
                // xhrFields: { withCredentials: true },
                data: JSON.stringify(_this.params),
                headers: _this.headers,
                dataType: "json",
                success: function (jobj, textStatus, jqXHR) {
                    let exc = RpcError.CreateByCode(jobj['code'], jobj['message']);
                    if (exc) {
                        console.error(exc);
                        throw exc;
                    }
                    resolve(new JsonResponse(jobj, _this, jqXHR));
                },
                error: function (xhr, status) {
                    reject(new RpcError("error occur"));
                }
            });
        } else {
            throw new RpcError("need jQuery or fetch library!");
        }

        return result;
    }

    addHeader(key, val) {
        this.headers[key] = val;
    }

    setHeaders(headers) {
        this.headers = headers;
    }
}

// === BaseInterfApi ===
export class BaseInterfApi {
    constructor(baseUrl, moduleName, interfName, token, trymax=1024, interval=13) {
        this.trymax = trymax;
        this.interval = interval;
        this.access_token = token;
        this._baseUrl = baseUrl;
        this._moduleName = moduleName;
        this._interfName = interfName;
        this._headers = {};
    }

    _genUrl(name) {
        return '%s/%s/%s/%s'.sprintf(this._baseUrl, this._moduleName, this._interfName, name);
    }

    addHeader(key, val) {
        this._headers[key] = val;
    }

    addAuthorizationBearer(token) {
        this._headers['AUTHORIZATION'] = '%s %s'.sprintf('Bearer', this.access_token);
    }

    createRequest(funcName, params=None) {
        let url = this._genUrl(funcName);
        let req = new JsonRequest(url, params, this.trymax, this.interval);
        if (this._headers) {
            req.setHeaders(this._headers);
        }
        return req;
    }

    fillContext(context, json) {
        if (json && context instanceof Object) {
            assert('data' in json);
            // set server other field onto context
            for (let key in json) {
                if (key == 'data') continue;
                context[key] = json[key];
            }
        }
    }
}
