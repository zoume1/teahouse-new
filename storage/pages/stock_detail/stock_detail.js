// storage/pages/stock_detail/stock_detail.js
const app = getApp();
var wxCharts = require('../../../component/wxcharts.js');
// var columnChart = null;

// var chartData = {
//   main: {
//     title: '总成交量',
//     data: [15, 20, 45, 37],
//     categories: ['2012', '2013', '2014', '2015']
//   },
//   sub: [{
//     title: '2012年度成交量',
//     data: [70, 40, 65, 100, 34, 18],
//     categories: ['1', '2', '3', '4', '5', '6']
//   }, {
//     title: '2013年度成交量',
//     data: [55, 30, 45, 36, 56, 13],
//     categories: ['1', '2', '3', '4', '5', '6']
//   }, {
//     title: '2014年度成交量',
//     data: [76, 45, 32, 74, 54, 99],
//     categories: ['1', '2', '3', '4', '5', '6']
//   }, {
//     title: '2015年度成交量',
//     data: [76, 54, 23, 12, 45, 65],
//     categories: ['1', '2', '3', '4', '5', '6']
//   }]
// };

Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.img_url,
    dataObj: [],
    chartData: {},
    inTemp:0,
    inHumi:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    _this.getHumitureNew();
    wx.request({
      url: app.globalData.tiltes + 'takeOrderData',
      data: {
        uniacid: app.globalData.uniacid,
        member_id: app.globalData.member_id,
        id: options.id
      },
      method: 'POST',
      success: function (res) {
        // console.log(res);
        if (res.data.status == 1) {
          var dataArr = [];
          res.data.data.end_time = app.formatDate(res.data.data.end_time);
          res.data.data.pay_time = app.formatDate(res.data.data.pay_time);
          dataArr.push(res.data.data);
          _this.setData({
            dataObj: dataArr
          })
          wx.request({
            url: app.globalData.tiltes + "getLineprice",
            data: {
              goods_id: dataArr[0].goods_id,
              uniacid: app.globalData.uniacid,
              special_id: dataArr[0].special_id
            },
            method: 'POST',
            success: function (res) {
              console.log(res)
              if (res.data.status == 1) {
                var columnChart = null;
                var chartData = {
                  main: {
                    title: '总成交量',
                    data: res.data.data.data,
                    categories: res.data.data.categories
                  }
                }

                var windowWidth = 375;
                try {
                  var res = wx.getSystemInfoSync();
                  windowWidth = res.windowWidth;
                  console.log(windowWidth)
                } catch (e) {
                  console.error('getSystemInfoSync failed!');
                }
                columnChart = new wxCharts({
                  canvasId: 'columnCanvas',
                  type: 'column',
                  animation: true,
                  categories: chartData.main.categories,
                  series: [{
                    name: '平均值',
                    data: chartData.main.data,
                    format: function (val, name) {
                      return val.toFixed(2) + '元';
                    }
                  }],
                  yAxis: {
                    format: function (val) {
                      return val + '元';
                    },
                    title: '元',
                    min: 0
                  },
                  xAxis: {
                    disableGrid: false,
                    type: 'calibration'
                  },
                  extra: {
                    column: {
                      width: 15
                    }
                  },
                  width: windowWidth,
                  height: 200,
                });
              }
            },
            fail: function (e) {
              console.error(e)
            }
          })
        }
      },
      fail: function (res) {
        console.log(res);
      }
    });

  },
  showMsg: function (e) {
    let title = "";
    switch (e.currentTarget.dataset.id) {
      case '1':
        title = '目前该商品的售价';
        break;
      case '2':
        title = '目前您的会员商品折扣价';
        break;
      case '3':
        title = '当时您购买该商品的价格';
        break;
      case '4':
        title = '您购买的商品目前的价格涨幅';
        break;

      default:
        break;
    }
    wx.showToast({
      title: title,
      icon: 'none',
      duration: 2000
    })
  },

  getHumitureNew: function () {
    var a = this;
    wx.request({
      url: app.globalData.tiltes + "get_humiture_new",
      method: "POST",
      data: {
        store_id: app.globalData.uniacid
      },
      success: function (t) {
        "1" == t.data.status && a.setData({
          inTemp: t.data.data.temperature.toFixed(2),
          inHumi: t.data.data.humidity.toFixed(2)
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    var _this = this;
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