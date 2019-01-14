// pages/order/order.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      height:'',
      tab:'1',
      status:'2',
      order:[]
  },
  // 删除订单
  delete_order:function (e){
    var that=this;
    var indexs = e.currentTarget.dataset.id;
    var orderItems = that.data.order;
    console.log(orderItems);
    for (var i = 0; i < orderItems.length; ++i) {
      if(orderItems[i].parts_order_number == indexs){
       
        wx.request({
          url: app.globalData.tiltes + 'ios_api_order_del',
          data: {
            open_id: app.globalData.gmemberid,
            parts_order_number:indexs
          },
          method: "post",
          header: {
            "Content-Type": "application/json" // 默认值
    
          },
          success: function (res) {
            orderItems.splice(i, 1);
            that.setData({
              order: orderItems
            }); 
           
          },
          fail: function () {
         
          },
          complete: function () {
            wx.hideLoading()
          }
    
        });
      }
      
    }
  
  },
  tab_click:function (e) {
    var that=this;
      this.setData({ tab: e.currentTarget.dataset.current });
      if(e.currentTarget.dataset.current==1){
        wx.request({
          url: app.globalData.tiltes + 'aa',
          data: {
            open_id: app.globalData.gmemberid,
          },
          method: "post",
          header: {
            "Content-Type": "application/json" // 默认值
    
          },
          success: function (res) {
            that.setData({
              order:res.data.data
            })
          },
          fail: function () {
    
          },
          complete: function () {
            wx.hideLoading()
          }
    
        });
      }
      else if(e.currentTarget.dataset.current==2){
        wx.request({
          url: app.globalData.tiltes + 'aa',
          data: {
            open_id: app.globalData.gmemberid,
          },
          method: "post",
          header: {
            "Content-Type": "application/json" // 默认值
    
          },
          success: function (res) {
            that.setData({
              order:res.data.data
            })

          },
          fail: function () {
    
          },
          complete: function () {
            wx.hideLoading()
          }
    
        });
      }
      else if(e.currentTarget.dataset.current==3){
        wx.request({
          url: app.globalData.tiltes + 'aaa',
          data: {
            open_id: app.globalData.gmemberid,
          },
          method: "post",
          header: {
            "Content-Type": "application/json" // 默认值
    
          },
          success: function (res) {
            that.setData({
              order:res.data.data
            })
          },
          fail: function () {
    
          },
          complete: function () {
            wx.hideLoading()
          }
    
        });
      }
  
      
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var height = wx.getSystemInfoSync().windowHeight;
    this.setData({ height: height });
    wx.request({
      url: app.globalData.tiltes + 'aa',
      data: {
        open_id: app.globalData.gmemberid,
      },
      method: "post",
      header: {
        "Content-Type": "application/json" // 默认值

      },
      success: function (res) {
        console.log(res);
        that.setData({
          order:res.data.data
        })
      },
      fail: function () {

      },
      complete: function () {
        wx.hideLoading()
      }

    });
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