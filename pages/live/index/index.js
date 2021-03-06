const app = getApp();
Page({
  data: {
    currentTab: 0,
    winHeight: 0, //窗口高度,
    url: app.globalData.img_url,
    // imgUrls: [
    //   'http://zhihuichacang.com/u2404.png',
    //   'http://zhihuichacang.com/u2404.png'
    // ],
    // ico: [
    //   "茶仓",
    //   "茶山",
    //   "茶楼",
    //   "茶仙"
    // ]
  },
  //点赞
  tolike: function (e) {
    var that = this;
    wx.request({
      url: app.globalData.url +"/api/video_give",
      data: {
        user_id: app.globalData.member_id,
        store_id: app.globalData.uniacid,
        vid: e.currentTarget.dataset.id
      },
      success: function(res) {
        if(res.data.code == 1) {
          wx.showToast({
            title: res.data.msg,
            icon: "none",
            duration: 2000
          })
          that.onShow();
        }
      },
      fail: function(e) {
        console.error(e)
      }
    })
  },
  toLive: function (e) {
    var url ="";
    if(e.currentTarget.dataset.title == 1) {
      url = '../synopsis/synopsis?vid='+ e.currentTarget.dataset.id
    } else { //到评论
      url = '../synopsis/synopsis?title=1&vid='+ e.currentTarget.dataset.id
    }
    wx.navigateTo({
      url: url
    })
    
  },
  /*** 滑动切换tab***/
  bindChange: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current,
      con: "b_" + e.detail.current
    });
  },
  /*** 点击tab切换***/
  swichNav: function (e) {
    var that = this;
    that.setData({
      currentTab: e.currentTarget.dataset.id,
      con: "b_" + e.detail.current
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarColor({
      frontColor: app.globalData.navBarTxtColor,
      backgroundColor: app.globalData.navBarBgColor
    })
    that.showAll();

  },
  showAll: function () {
    var that = this;
    wx.request({
      url: app.globalData.tiltes + 'api/classification',
      data: {
        store_id: app.globalData.uniacid,
        uid: app.globalData.member_id
      },
      method: "post",
      success: function (res) {
        if(res.data.code == 1) {
          that.setData({
            live: res.data.data
          })
        }
      },
      fail: function (e) {
        console.log(e)
      },
      complete: function (res) {
      
      }
  
    });
  },

  redirectto: function (t) {
    var a = t.currentTarget.dataset.link,
      e = t.currentTarget.dataset.linktype;
    app.redirectto(a, e);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    var uniacid = app.globalData.uniacid;
    // wx.request({
    //   url: app.globalData.baseurl + "doPagehomepage",
    //   cachetime: "30",
    //   data: {
    //     uniacid: uniacid
    //   },
    //   success: function (t) {
    //     that.setData({
    //       foot_is: t.data.data.foot_is
    //     })
    //     wx.request({
    //       url: app.globalData.baseurl + "doPageGetFoot",
    //       cachetime: "30",
    //       data: {
    //         uniacid: uniacid,
    //         foot: t.data.data.foot_is
    //       },
    //       success: function (t) {
    //         // var lujing = [];
    //         // var num = getCurrentPages().length - 1;
    //         // var url = getCurrentPages()[num].route; //当前页面路径

    //         // for (let i in t.data.data.data) {
    //         //   lujing.push(t.data.data.data[i]);
    //         // }
    //         // for (let o = 0; o < lujing.length; o++) {
    //         //   if (lujing[o].linkurl.indexOf(url) != -1) {
    //         //     lujing[o].change = true;
    //         //   } else {
    //         //     lujing[o].change = false;
    //         //   }
    //         // }
    //         // t.data.data.data = lujing;
    //         // console.log(t.data.data)
    //         that.setData({
    //           // lujing: lujing,
    //           footinfo: t.data.data,
    //           // style: t.data.data.style,
    //         })
    //       }

    //     });


    //   },
    //   fail: function (t) {
    //     console.log(t);
    //   }
    // });

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //  高度自适应
    // this.setData({
    //   winHeight: 380 * this.data.imgUrls.length + 50
    // })
    this.showAll();
    if(typeof this.getTabBar === 'function' && this.getTabBar()){
      this.getTabBar().setData({
        checked: 3
      })
    }
    // wx.request({
    //   url: "https://open.ys7.com/api/lapp/token/get",
    //   method: "post",
    //   data: {
    //     appKey:"97a6343476e24f969dcd649b3ca2fd77",
    //     appSecret:"1612af977029b240d54d7111c34e38fb",
    //   },
    //   // contentType:"application/json",
    //   success: function (res) {
    //    console.log(res)
    //   },
    //   fail: function(e) {
    //     console.log(e)
    //   }

    // });
    // wx.request({
    //   url: "https://open.ys7.com/api/lapp/device/capture",
    //   method: "post",
    //   data: {
    //     accessToken:'at.0z9ozvv51b43i39x6bwc6vao3gnx9bxp-3k5xrzppxt-08cnb8j-7lzb3b1ok',
    //     deviceSerial:612037990,
    //     channelNo:1
    //   },
    //   success: function (t) {
    //     console.log(t)
    //   }

    // });
    wx.setNavigationBarColor({
      frontColor: app.globalData.navBarTxtColor,
      backgroundColor: app.globalData.navBarBgColor
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    // console.log(that)
    that.onReady();

    wx.stopPullDownRefresh();

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  // onShareAppMessage: function () {
  //   console.log("分享")
  //   let that = this;
  //   return {
  //     title: e.target.dataset.id, // 转发后 所显示的title
  //     path: 'pages/logs/logs?shareID=' + app.globalData.member_id, // 相对的路径
  //     success: (res) => {    // 成功后要做的事情
  //       console.log(res.shareTickets[0])
  //       // console.log

  //       wx.getShareInfo({
  //         shareTicket: res.shareTickets[0],
  //         success: (res) => {
  //           9
  //           that.setData({
  //             isShow: true
  //           })
  //           console.log(that.setData.isShow)
  //         },
  //         fail: function (res) { console.log(res) },
  //         complete: function (res) { console.log(res) }
  //       })
  //     },
  //     fail: function (res) {
  //       // 分享失败
  //       console.log(res)
  //     }
  //   }
  // },
})