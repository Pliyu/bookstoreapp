class SysUtil {
  static setLocalStore (name: string, content: any, isSession: boolean = false):void {
    if (!name) {
      return
    }
    if (typeof content !== 'string') {
      content = JSON.stringify(content)
    }
    if (isSession) {
      window.sessionStorage.setItem(name, content)
    } else {
      window.localStorage.setItem(name, content)
    }
  }

  static getLocalStore (name: string, isSession: boolean = false):any {
    if (!name) {
      return undefined
    }
    if (isSession) {
      return window.sessionStorage.getItem(name)
    } else {
      return window.localStorage.getItem(name)
    }
  }

  static removeLocalStore (name: string, isSession: boolean = false):void {
    if (!name) {
      return
    }
    if (isSession) {
      window.sessionStorage.removeItem(name)
    } else {
      window.localStorage.removeItem(name)
    }
  }
}
export default SysUtil
