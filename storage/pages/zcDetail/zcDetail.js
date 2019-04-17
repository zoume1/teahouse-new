// storage/pages/zcDetail/zcDetail.js
const app = getApp();
var WxParse = require('../../..//wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.img_url,
    indicatorDots: true,
    autoplay: false,
    interval: 2000,
    duration: 500,
    currTab: 0,
    tabHdArr: ['项目详情', '团队介绍', '监测报告', '评价'],
    fixiPhone: false,
    switchDialogKey: false,
    switchWidth: false, //
    proArr: [],
    specActive: 0, //规格索引
    buyNum: 1,  //购买数量
  },

  // 去首页
  bindSwitchTab: function(){
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  // 打赏跳转
  supportProject: function(){
    wx.navigateTo({
      url: '/storage/pages/zcOrder/zcOrder',
      success: function(){
        console.log('跳转成功');
      },
      fail: function(){
        console.log('跳转失败');
      }
    })
  },
  // 减
  minus: function(){
    var num = this.data.buyNum;
    if(num > 1){
      num --;
    }
    this.setData({
      buyNum: num
    })
  },
  // 加
  plus: function(){
    var num = +this.data.buyNum;
    var standard = this.data.proArr[0].standard[this.data.specActive];
    // 限购
    if(standard.limit !== -1){
      if(num < standard.limit){
        if(num < +standard.stock){
          num++;
          this.setData({
            buyNum: num
          })
        }else{
          wx.showToast({
            title: '您所填写的数量超过库存！',
            icon: 'none',
            duration: 1500
          })
        }
      }else{
        wx.showToast({
          title: '不能超过限购数量！',
          icon: 'none',
          duration: 1500
        })
      }
    }else{
      if(num < +standard.stock){
        num++;
        this.setData({
          buyNum: num
        })
      }else{
        wx.showToast({
          title: '您所填写的数量超过库存！',
          icon: 'none',
          duration: 1500
        })
      }
    }
  },
  

  // 输入数量
  bindManual: function(e){
    var num = e.detail.value;
    var stock = +this.data.proArr[0].standard[this.data.specActive].stock;
    if(num <= 0){
      this.setData({
        buyNum: 1
      })
    }else if(num <= stock){
      this.setData({
        buyNum: num
      })
    }else{
      wx.showToast({
        title: '您所填写的数量超过库存！',
        icon: 'none',
        duration: 1500
      })
      this.setData({
        buyNum: stock
      })
    }
  },

  touchMove () {},
  // 选择规格
  clickSpec: function(e){
    var index = e.target.dataset.index
    this.setData({
      specActive: index,
    })
  },

  // 操作选项卡
  clickTabHd: function(e){
    var current = e.target.dataset.current;
    if(this.data.currTab != current){
      this.setData({
        currTab: current
      })
    }
  },
  swiperTabBd: function(e){
    this.setData({
      currTab: e.detail.current
    })
  },
  // 显示规格对话框
  switchDialog: function(){
    this.setData({
      switchDialogKey: !this.data.switchDialogKey
    })
    if(!this.data.switchDialogKey){
      var _this = this;
      setTimeout(function(){
        _this.setData({
          switchWidth: !_this.data.switchWidth
        })
      }, 200)
    }else{
      this.setData({
        switchWidth: !this.data.switchWidth
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this,
        id = options.id;
    wx.getSystemInfo({
      success: function(res){
        _this.setData({
          fixiPhone: res.model.indexOf('iPhone X') != -1
        })
      }
    })
    // all data
    wx.request({
      url: app.globalData.tiltes + 'crowd_support',
      method: 'POST',
      data: {
        id: id
      },
      success: function(res){
        console.log(res);
        var data = res.data.data[0];
        var richTextArr = [];
        richTextArr.push(data.goods_text);
        richTextArr.push(data.team);
        richTextArr.push(data.text);
        for(var i = 0; i < richTextArr.length; i++){
          richTextArr[i]?WxParse.wxParse('richText' + i, 'html', richTextArr[i], _this):'';
          if (i === richTextArr.length - 1) {
            WxParse.wxParseTemArray("richTextTemArray",'richText', richTextArr.length, _this)
          }
        }
        _this.setData({
          proArr: res.data.data
        })
      },
      fail: function(res){
        console.log(res);
      }
    })
  },
})