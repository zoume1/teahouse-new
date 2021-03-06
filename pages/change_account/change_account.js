// pages/add_address/add_address.js
const throttle = require('../../utils/throttle.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customItem: "全部",
    address: [],
    title: '',
    btntext: '获取验证码',
    change: true,
    num: null,
    oldnum: null,
    newnum: null,
  },

  formSubmit: function (e) {
    var that = this;
    var id = that.data.change;
    var sessionId = wx.getStorageSync('sessionId');
    if (!id) {
      if (e.detail.value.member_phone_num == '') {
        wx.showToast({
          title: "手机号不能为空",
          icon: 'none',
        });
      }else if (e.detail.value.cold == '') {
        wx.showToast({
          title: "验证码不能为空",
          icon: 'none',
        });
      }else {
        wx.request({
          url: app.globalData.tiltes + 'user_phone_bangding',
          data: {
            member_phone_num: e.detail.value.member_phone_num,
            code: e.detail.value.cold,
            member_id: app.globalData.member_id,
          },
          method: "post",
          success: function (res) {
            if (res.data.status == 1) {
              setTimeout(function () {
                wx.navigateBack();
              }, 2000)
            }
          },
          fail: function () { },
          complete: function (res) {
            wx.showToast({
              title: res.data.info,
              icon: 'none',
            });
          }
        });
      }
    } else {
      if (e.detail.value.harvester == '') {
        wx.showToast({
          title: "老账号不能为空",
          icon: 'none',
        });
      } else if (e.detail.value.harvester_phone_num == '') {
        wx.showToast({
          title: "新账号不能为空",
          icon: 'none',
        });
      } else if (e.detail.value.harvester_phone_num1 == '') {
        wx.showToast({
          title: "验证码不能为空",
          icon: 'none',
        });
      } else {
        wx.request({
          url: app.globalData.tiltes + 'user_phone_bingding_update',
          data: {
            old_phone_num: e.detail.value.harvester,
            member_phone_num: e.detail.value.harvester_phone_num,
            code: e.detail.value.harvester_phone_num1,
            member_id: app.globalData.member_id,
          },
          method: "post",
          success: function (res) {
            if (res.data.status == 1) {
              setTimeout(function () {
                wx.navigateBack();
              }, 2000)
            }
          },
          fail: function () { },
          complete: function (res) {
            wx.showToast({
              title: res.data.info,
              icon: 'none',
            });
          }
        });
      }
    }
  },
  validateTel: function (tel) {
    var TEL_REGEXP = /^1[3456789]\d{9}$/;
    return TEL_REGEXP.test(tel);
  },
  bindChange: function (event) {
    var that = this;
    that.setData({
      num: event.detail.value
    })
  },
  bindoldChange: function (event) {
    var that = this;
    that.setData({
      oldnum: event.detail.value
    })
  },
  bindnewChange: function (event) {
    var that = this;
    that.setData({
      newnum: event.detail.value
    })
  },
  send_cold: throttle.throttle(function (e) {
    var that = this;
    if (that.validateTel(that.data.num)) {
      wx.request({
        url: app.globalData.tiltes + 'sendMobileCode',
        data: {
          mobile: that.data.num,
          uniacid: app.globalData.uniacid
        },
        method: "post",
        success: function (res) {
          if(res.data.status == 1){
            var coden = 60    // 定义60秒的倒计时
            var codeV = setInterval(function () {
              that.setData({    // _this这里的作用域不同了
                btntext: '重新获取' + (--coden) + 's'
              })
              if (coden == -1) {  // 清除setInterval倒计时，这里可以做很多操作，按钮变回原样等
                clearInterval(codeV)
                that.setData({
                  btntext: '获取验证码'
                })
              }
            }, 1000)
          }
        },
        fail: function () {},
        complete: function (res) {
          wx.showToast({
            title: res.data.info,
            icon: 'none'
          });
        }
      });
    }else {
      wx.showToast({
        title: '手机格式不正确！',
        icon: 'none'
      });
    }
  }, 5000),
  send_cold1: throttle.throttle(function (e) {
    var that = this;
    if (that.validateTel(that.data.newnum)) {
      wx.request({
        url: app.globalData.tiltes + 'sendMobileCode',
        data: {
          mobile: that.data.newnum,
          uniacid: app.globalData.uniacid
        },
        method: "post",
        success: function (res) {
          var coden = 60    // 定义60秒的倒计时
          var codeV = setInterval(function () {
            that.setData({    // _this这里的作用域不同了
              btntext: '重新获取' + (--coden) + 's'
            })
            if (coden == -1) {  // 清除setInterval倒计时，这里可以做很多操作，按钮变回原样等
              clearInterval(codeV)
              that.setData({
                btntext: '获取验证码'
              })
            }
          }, 1000)
        },
        fail: function () {},
        complete: function (res) {
          wx.showToast({
            title: res.data.info,
            icon: 'none',
          });
        }

      });
    }
    else {
      wx.showToast({
        title: '手机格式有问题',
        icon: 'none',
      })
    }

  }, 5000),

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var judge_phone = options.judge_phone;
    if (judge_phone == '0') {
      that.setData({
        change: false,
      });
    }else {
      that.setData({
        change: true,
      });
    }
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