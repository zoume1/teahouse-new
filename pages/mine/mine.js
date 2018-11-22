
//my.js
// import '../../utils/util.js';
var util = require('../../utils/util.js')
//获取应用实例
var app = getApp()
Page({
  data: {
  
    test: app.data.test,
    collects: [],
    // item2:{}
    // cacheRes:{},
    cacheNumStr: "0 KB",
    height: 500,
    order_nav: [
      {
        src: app.globalData.url + '/upload/20181115/eb46c126533c9c51a19b9baea16f8523.png',
        text: '待付款'
      },
      {
        src: app.globalData.url + '/upload/20181115/0a2b1ad83a3cb195b5367943f208e667.png',
        text: '待发货'
      },
      {
        src: app.globalData.url + '/upload/20181115/eb46c126533c9c51a19b9baea16f8523.png',
        text: '待收货'
      }, {
        src: app.globalData.url + '/upload/20181115/ab9f934b82ab3e9d2ba77b9616501d6a.png',
        text: '待评价'
      }, {
        src: app.globalData.url + '/upload/20181115/fa73c90513036e142b64e3ef2c948a87.png',
        text: '售后/退款'
      }
    ],
    list: [
      {
        url: app.globalData.url + '/upload/20181115/62e312cd467c5c263505f288f2e15957.png',
        text: '会员中心'
      },
      {
        url: app.globalData.url + '/upload/20181115/872ba6211e755c12088c2e5f92fad232.png',
        text: '消息中心'
      },
      {
        url: app.globalData.url + '/upload/20181115/f052e232cf2c7629080cacbb20522b50.png',
        text: '地址管理'
      },
      {
        url: app.globalData.url + '/upload/20181115/81c85d2133879add7c6f8ed268410616.png',
        text: '我的收藏'
      },
      {
        url: app.globalData.url + '/upload/20181115/d0221a688c6699297a1092cec2e1a322.png',
        text: '我的账户'
      },
    ],
    lista: [
      {
        url: app.globalData.url + '/upload/20181115/38b70a3b147560518f3c46c5294ec19f.png',
        text: '常见问题'
      },
      {
        url: app.globalData.url + '/upload/20181115/2505a16ba762f14d5d88d1ddecf2b755.png',
        text: '协议合同'
      },
      {
        url: app.globalData.url + '/upload/20181115/575a600f599df7b52b16cd3aa5b48d1c.png',
        text: '关于我们'
      }
    ],
  /**
   * 会员卡
   */

  
  },
 
  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    var gmemberid = app.globalData.gmemberid;
    console.log("我显示了")
    this.requesLocalData();
    wx.request({
      url: app.globalData.tiltes + 'my_index',
      data: {
        open_id: gmemberid
      },
      method: "POST",
     
      success: function (res) {
        console.log(res);
        that.setData({
          level: res.data.data.member_grade,
          information: res.data.data.information

        });
           },
      fail: function () {

      },
      complete: function () {
        wx.hideLoading()
      }

    });
  },
  bindViewTap: function (event) {
    // console.log("nihao////" + event.currentTarget.dataset.item)
    var item = event.currentTarget.dataset.item;
    // if (item.type == "10") {
    //   templates.previewImg(event);
    //   return;
    // } else if (item.type == "29") {
    //   // templates.bindCollect(event);
    // }
    wx.navigateTo({
      url: '../detail/detail?jsonStr=' + JSON.stringify(event.currentTarget.dataset.item),
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }

    })
  },
  requesLocalData: function () {
    var list = [];
    // var itemOne = {};
    try {
      var value = wx.getStorageSync('collects');
      if (value) {
        // Do something with return value
        var itemArr = JSON.parse(value);
        if (itemArr) {
          // itemOne = item;
          list = itemArr;
        }
      }
    } catch (e) {
      // Do something when catch error
      wx.showToast({
        title: '获取缓存数据出错',
        icon: 'fail'
      })
    }
    this.setData({
      collects: list,
      // item2:item
    })
  },
  //收藏功能
  bindvideo_collect: function (event) {
    var that = this;
    var itemArr = [];
    var item = event.currentTarget.dataset.item;
    var collectFlag = ""; //"":默认状态；"1":收藏成功状态；"0":取消收藏成功状态；
    try {
      var value = wx.getStorageSync('collects');
      if (value) {
        itemArr = JSON.parse(value);
        if (itemArr && itemArr.length > 0) {
          for (var i = 0; i < itemArr.length; i++) {
            var itemOne = itemArr[i];
            if ((itemOne.user_id + itemOne.t) == (item.user_id + item.t)) {
              // 取消收藏。
              itemArr.splice(i, 1);
              collectFlag = "0";
              break;
            }
            if (i == itemArr.length - 1) {
              item.isCollect = true;
              itemArr.unshift(item); //向数组插入一个元素成为第一个元素
              collectFlag = "1";
              break;
            }
          }
        } else {
          item.isCollect = false;
          itemArr = [item];
          collectFlag = "1";
        }
      } else {
        item.isCollect = false;
        itemArr = [item];
        collectFlag = "1";
      }
    } catch (e) {
      // Do something when catch error
      wx.showToast({
        title: '获取缓存数据出错',
        icon: 'fail'
      })
    }

    if (collectFlag != "") {
      wx.setStorage({
        key: "collects", //以用户id和用户创建该数据的时间作为唯一的key
        data: JSON.stringify(itemArr),
        success: function () {
          if (collectFlag == "0") {
            wx.showToast({
              title: '取消收藏成功',
              icon: 'success',
              duration: 2000,
              success: function () {
                that.setData({
                  collects: itemArr
                });
              }
            })

          } else if (collectFlag == "1") {
            that.setData({
              collects: itemArr
            });
            wx.showToast({
              title: '收藏成功',
              icon: 'success',
              duration: 2000,
              fail: function () {
                that.setData({
                  collects: itemArr
                });
              }
            })
          }
        },
        fail: function () {
          wx.showToast({
            title: '收藏失败',
            icon: 'none'
          })
        }
      })
      return;
    }
  },
  //视频播放功能
  bindvideo_play: function (event) {
    this.bindViewTap(event);
  },
  //详情功能
  bindvideo_detail: function (event) {
    this.bindViewTap(event);
  },
  //点击图片大图功能
  bindpic_play: function (e) {
    var item = e.currentTarget.dataset.item;
    console.log(item.image0);
    var picsrc = item.image0;
    var imgArr = [];
    imgArr.push(picsrc);
    wx.previewImage({
      current: imgArr[0],     //当前图片地址
      urls: imgArr,               //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  mycollect: function (event) {
    console.log(event);
    var item = event.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../members/members?jsonStr=' + JSON.stringify(event.currentTarget.dataset.item),
      success: function (res) {
        // success
        console.log("nihao////跳转成功")
      },
      fail: function () {
        // fail
        console.log("nihao////跳转失败")
      },
      complete: function () {
        // complete
        console.log("nihao////跳转行为结束，未知成功失败")
      }

    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    wx.showToast({
      title: '你好',
      icon: '',
      image: '',
      duration: 0,
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  bindnume: function (event) {
    console.log("nihao////" + event)
    var item = event.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../members/members?jsonStr=' + JSON.stringify(event.currentTarget.dataset.item),
      success: function (res) {
        // success
        console.log("nihao////跳转成功")
      },
      fail: function () {
        // fail
        console.log("nihao////跳转失败")
      },
      complete: function () {
        // complete
        console.log("nihao////跳转行为结束，未知成功失败")
      }

    })
  },

})

