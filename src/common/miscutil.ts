export function goBack (router: any):void {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/home')
  }
}

export function getSkuItem (skuList: Array<any>, skuid: number): number {
  return skuList.findIndex(function (item: any, index, arr) {
    return item.skuid === skuid
  })
}
