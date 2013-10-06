// Generated by CoffeeScript 1.6.3
/*
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
*/

var webStorage;

webStorage = (function() {
  webStorage.prototype.Storage = Object;

  function webStorage(db) {
    this.Storage = db;
  }

  webStorage.prototype.get = function(key) {
    return JSON.parse(this.Storage.getItem(key));
  };

  webStorage.prototype.getStr = function(key) {
    return this.Storage.getItem(key);
  };

  webStorage.prototype.set = function(key, obj) {
    return this.Storage.setItem(key, JSON.stringify(obj));
  };

  webStorage.prototype.setStr = function(key, value) {
    return this.Storage.setItem(key, value);
  };

  webStorage.prototype.del = function(key) {
    return this.Storage.removeItem(key);
  };

  webStorage.prototype.len = function() {
    return this.Storage.length;
  };

  webStorage.prototype.key = function(index) {
    return this.Storage.key(index);
  };

  webStorage.prototype.clear = function() {
    return this.Storage.clear();
  };

  webStorage.prototype.all = function(fun) {
    return $.each(this.Storage, function(key, value) {
      return fun(key, JSON.parse(value));
    });
  };

  webStorage.prototype.find = function(keyword) {
    var keyList;
    keyList = [];
    $.each(this.Storage, function(key, value) {
      if (value.indexOf(keyword) > -1) {
        return keyList.push(key);
      }
    });
    return keyList;
  };

  webStorage.prototype.copyJ2D = function(url) {
    var _this = this;
    return $.ajax({
      url: url,
      dataType: 'JSON'
    }).done(function(data) {
      return $.each(data, function(k, v) {
        return _this.set(k, v);
      });
    });
  };

  webStorage.prototype.copyD2D = function() {
    var db2,
      _this = this;
    db2 = this.Storage === localStorage ? sessionStorage : localStorage;
    return $.each(this.Storage, function(k, v) {
      return db2.setItem(k, v);
    });
  };

  return webStorage;

})();