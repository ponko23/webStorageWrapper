###
# WebStorage Wrapper Class 2013/10/06
#
# dbname = new webStorage(localStorage or sessionStorage)
#
# .get('key') => WebStorageから指定した一件のvalueオブジェクトを取得する
# .getStr('key') => WebStorageから指定した一件のvalue文字列を取得する
# .set('key', value Object) => 指定したkey文字列とvalueオブジェクトをWebStorageにセットする
# .setStr('key', 'value') => 指定したkey文字列とvalue文字列をWebStorageにセットする
# .del('key') => WebStorageからkey文字列で指定した一件を削除
# .len() => WebStorageに登録されているデータの件数を整数値で取得
# .key(index) => index番目のデータからkeyを取得する(0から開始)
# .clear() => WebStorageの全件を削除
# .all(function) => WebStorageの値を一件ずつfunction('key', value Object){...}として実行する
# .find('keyword') => WebStorageの全データの中から、指定したkeyword文字列が含まれるvalue文字列を持つ全てのkey文字列を配列として返す
# .copyJ2D('ulr') => 指定したurlのJSONファイルを取得し、その内容をWebStorageに格納する
# .copyD2D() => もうひとつのWebStorageにコピーを作成する
#
###
class webStorage
  Storage: Object

  constructor: (db)->
    @Storage = db

  get: (key)->
    return JSON.parse(@Storage.getItem(key))
  getStr: (key)->
    return @Storage.getItem(key)
  set: (key, obj)->
    @Storage.setItem(key, JSON.stringify(obj))
  setStr: (key, value)->
    @Storage.setItem(key, value)
  del: (key)->
    @Storage.removeItem(key)
  len: ->
    return @Storage.length
  key: (index)->
    return @Storage.key(index)
  clear: ->
    @Storage.clear()
  all: (fun)->
    $.each(@Storage, (key, value)->
      fun(key,JSON.parse(value))
    )
  find: (keyword)->
    keyList = []
    $.each(@Storage, (key, value)->
      keyList.push(key) if value.indexOf(keyword) > -1
    )
    return keyList
  copyJ2D: (url)->
    $.ajax(
      url: url
      dataType: 'JSON'
    ).done( (data)=>
      $.each(data, (k, v)=>
        @set(k,v)
      )
    )
  copyD2D: ->
    db2 = if @Storage is localStorage then sessionStorage else localStorage
    $.each(@Storage, (k, v)=>
      db2.setItem(k, v)
    )