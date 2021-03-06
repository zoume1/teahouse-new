//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    url: app.globalData.img_url,
    scrollTop: 0,
    last_scrollTop: 0,
    toView: 0,
    navActive: 0,
    lastActive: 0,
    s_height: '',
    height_arr: [],
    category: [],
   
  },
  go_gooddetail: function (event) {
    var that = this;
    var id = event.currentTarget.dataset.id;
    var type = event.currentTarget.dataset.type, name = event.currentTarget.dataset.name, urls;
    if(type == 1) urls = "../good_lv/good_lv?pid=" + id + "&name="+ name;
    else urls = "../goods_detail/goods_detail?title="+ id;
    wx.navigateTo({
      url: urls,
      // url: '',
      success: function (res) {
      
      },
      fail: function () {
       
      },
      complete: function () {
      
      }


    })
  },
  tap: function (e) {
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    this.setData({
      toView: id,
      navActive: index
    });
  },
  scroll: function (e) {
    var self = this;
    var last_scrollTop=0;
    self.setData({ scrollTop: e.detail.scrollTop });
    if(self.data.is_true){

    setTimeout(function () {
      self.setData({
        is_true:false
      });
      if (self.data.last_scrollTop != self.data.scrollTop) {
        self.setData({ last_scrollTop: self.data.scrollTop });
        self.scrollmove(self, e, self.data.scrollTop);
      }
    }, 1000);
  }

  },
  scrollmove: function (self, e, scrollTop) {

    // last_scrollTop=scrollTop;
    var scrollArr = self.data.height_arr;
    if (scrollTop > scrollArr[scrollArr.length - 1] - self.data.s_height) {
      return;
    } else {
      for (var i = 0; i < scrollArr.length; i++) {
        if (scrollTop >= 0 && scrollTop < scrollArr[0]) {
          if (0 != self.data.lastActive) {
            self.setData({
              navActive: 0,
              lastActive: 0
            });
          }
        } else if (scrollTop >= scrollArr[i - 1] && scrollTop <= scrollArr[i]) {
          if (i != self.data.lastActive) {
            self.setData({
              navActive: i,
              lastActive: i
            });
          }
        }
      }
    }
  },
  onShow: function(){
    if(typeof this.getTabBar === 'function' && this.getTabBar()){
      this.getTabBar().setData({
        checked: 1
      })
    }
    wx.setNavigationBarColor({
      frontColor: app.globalData.navBarTxtColor,
      backgroundColor: app.globalData.navBarBgColor
    });
  },
  onLoad: function () {
    var that=this;
    var s_height = wx.getSystemInfoSync().windowHeight;
    this.setData({ s_height: s_height });
    this.getHeightArr(this);
    wx.request({
      url: app.globalData.tiltes + 'commodity_index',
      data: {
        member_grade_name:app.globalData.member_grade_name,
        uniacid: app.globalData.uniacid
      },
      method: "post",
      // header: {
      //   "Content-Type": "json" // 默认值

      // },
      success: function (res) {
      
       console.log(res)
        that.setData({
          category: res.data.data.goods_type,
        });
        //  添加字段到等级数组
        // for (var index in that.data.nav) {
        //   var sexParam = "nav[" + index + "].tab";
        //   that.setData({
        //     [sexParam]: index,
        //   })

        // }
       

      },
      fail: function () {

      },
      complete: function () {
        wx.hideLoading()
      }

    });
  },
  getHeightArr: function (self) {
    var height = 0, height_arr = [], details = self.data.category, s_height = self.data.s_height;
    for (var i = 0; i < details.length; i++) {
      var last_height = 30 + details[i].length /3* 90;
      if (i == details.length - 1) {
        last_height = last_height > s_height ? last_height : s_height + 50;
      }
      height += last_height;

      height_arr.push(height);
    }
    self.setData({
      height_arr: height_arr
    });
  }
  
  
})
