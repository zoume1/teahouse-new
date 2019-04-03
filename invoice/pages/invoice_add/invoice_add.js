// pages/add_address/add_address.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
    customItem: "全部",
    name:'',
    title:'',
    btntext: '获取验证码',
    change:false,
    num:null,
    card:[],
    cardid:null,
    select_card:null,//查询上个页面
  },

  formSubmit: function (e) {
    var that=this;
    
    // 添加
    if(!that.data.change){
      if(e.detail.value.name==''){
        wx.showToast({
          title:"开户名不能为空",
          icon:'none',
        });
      }
      else if(e.detail.value.card_name==''){
        wx.showToast({
          title:"开户银行不能为空",
          icon:'none',
        });
      }
      else if(e.detail.value.card_num==''){
        wx.showToast({
          title:"银行卡号不能为空",
          icon:'none',
        });
      }
      else if(e.detail.value.harvester_phone_num==''){
        wx.showToast({
          title:"验证码不能为空",
          icon:'none',
        });
      }
      else if(e.detail.value.name!=that.data.name){
        wx.showToast({
          title:"您认证的姓名和开卡姓名不一致",
          icon:'none',
        });
      }
      else if(that.checkCard(e.detail.value.card_num)==false){
        wx.showToast({
          title:"银行卡格式错误",
          icon:'none',
        });
      }
      else{
        wx.request({
          url: app.globalData.tiltes + 'bank_bingding_add',
          data: {
            account_name:e.detail.value.name,
            bank_name:e.detail.value.card_name,
            bank_card:e.detail.value.card_num,
            code:e.detail.value.harvester_phone_num,
            status:-1,
            member_id:app.globalData.member_id,
          },
          method: "post",
          success: function (res) {
            var id=res.data.data;
            // 上两个页面为充值页面
            if(that.data.select_card=="0"){
              if(res.data.status==1){
                setTimeout(function () {
                  wx.setStorageSync('id', id);
                  wx.navigateBack({
                    delta: 2
                  });
                }, 2000)
               
              }
            }
            else{
              if(res.data.status==1){
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1
                  });
                }, 2000)
               
              }
            }
         
          },
          fail: function () {
           
          },
          complete: function (res) {
            wx.showToast({
              title:res.data.info,
              icon:'none',
            });
          }
    
        });
      }
    }
    else{
      if(e.detail.value.name==''){
        wx.showToast({
          title:"开户名不能为空",
          icon:'none',
        });
      }
      else if(e.detail.value.card_name==''){
        wx.showToast({
          title:"开户银行不能为空",
          icon:'none',
        });
      }
      else if(e.detail.value.card_num==''){
        wx.showToast({
          title:"银行卡号不能为空",
          icon:'none',
        });
      }
      else if(e.detail.value.harvester_phone_num==''){
        wx.showToast({
          title:"验证码不能为空",
          icon:'none',
        });
      }
      else if(e.detail.value.name!=that.data.name){
        wx.showToast({
          title:"您认证的姓名和开卡姓名不一致",
          icon:'none',
        });
      }
      else{
        wx.request({
          url: app.globalData.tiltes + 'bank_bingding_update',
          data: {
            id:that.data.cardid,
            account_name:e.detail.value.name,
            bank_name:e.detail.value.card_name,
            bank_card:e.detail.value.card_num,
            code:e.detail.value.harvester_phone_num,
            status:-1,
            member_id:app.globalData.member_id,
          },
          method: "post",
          success: function (res) {
            // 上两个页面为充值页面
            if(that.data.select_card=="0"){
              if(res.data.status==1){
                setTimeout(function () {
                  wx.setStorageSync('id', that.data.cardid);
                  wx.navigateBack({
                    delta: 2
                  });
                }, 2000)
               
              }
            }
            else{
              if(res.data.status==1){
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1
                  });
                }, 2000)
               
              }
            }
         
          },
          fail: function () {
           
          },
          complete: function (res) {
            wx.showToast({
              title:res.data.info,
              icon:'none',
            });
          }
    
        });
      }

    }
     
    
   
    
  },

  
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    
  
    

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