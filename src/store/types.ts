export interface State {
  userOauth: object,
  userInfo: object,
  cartList: Array<any>
}

export interface UserOauth {
  token: string
}