// pages/meeting/meeting.js
import templates from '../../utils/template'
const app = getApp();
Page({

  // 全局变量的获取
  test: app.data.test,
  /**
   * 页面的初始数据
   */
  data: {
    // 头部导航
   tab:0,
   url: app.globalData.url,
   height:0,
  nav:[
    {
      color:"#125f87",
      icon_image:"20181121/61cebc68cd07602704607f0070bbc9c7.jpg",
        id:0,
        name:"茶圈收藏",
    }
  ],
  shares:[
    
  ],

    // 搜索列表
    showView: true,
    seach_list:[
      '未过期',
      '未过期',
      '未过期'
    ]
  },

  // 点击搜索
  onChangeShowState: function () {
    
    var that = this;
    // console.log(that);
    that.setData({
      showView: (!that.data.showView)
    })
  },
  bindViewTap: function (event) {
    var that=this;
    // console.log()
    var item = event.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/storage/pages/detail/detail?title='+ event.currentTarget.id ,
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
       
    wx.request({
      url: app.globalData.tiltes + 'enshrine_data',
      data: {
        member_id: app.globalData.member_id
      },
      method: "post",
      // header: {
      //   "Content-Type": "json" // 默认值

      // },
      success: function (res) {
       
        that.setData({
          shares: res.data.data,
        });
         //  添加字段到等级数组
         for (var index in that.data.shares) {
          var sexParam = "shares[" + index + "].url";
          that.setData({
            [sexParam]: app.globalData.img_url,
          })

        }

      },
      fail: function () {

      },
      complete: function () {
        wx.hideLoading()
      }

    });

    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight+45,
           height: res.windowHeight,
        });
      }
    });
    // showView: (options.showView == "true" ? true : false)
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})