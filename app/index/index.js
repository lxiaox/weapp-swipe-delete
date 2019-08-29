const app = getApp()
const systemInfo = wx.getSystemInfoSync()
const btnWidthPx = 150 / 750 * systemInfo.windowWidth

Page({
  data: {
    list: [
      {
        name: '周璐',
        phone: '12345678900',
        id: '001',
        xMove: 0
      },
      {
        name: '周璐2',
        phone: '12345678901',
        id: '002',
        xMove: 0
      }, {
        name: '周璐3',
        phone: '12345678902',
        id: '003',
        xMove: 0
      }
    ],
    buttonWidth: btnWidthPx,
  },
  remove(e) {
    this.data.list.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      list: this.data.list
    })
  },
  handleTouchStart: function(e) {
    this.startX = e.touches[0].pageX
  },
  handleTouchEnd: function(e) {
    const width = this.data.buttonWidth * 0.4
    const index = e.currentTarget.dataset.index
    const xMove = this.data.list[index].xMove !== undefined ? this.data.list[index].xMove : 0
    let endX = e.changedTouches[0].pageX
    // console.log(this.startX)
    // console.log(endX)
    // 初始状态下左滑
    if (xMove === 0 && endX < this.startX && this.startX - endX <= width) {
      this.handleButtonShow('hidden', index)
    }
    if (endX < this.startX && this.startX - endX > width) {
      this.handleButtonShow('show', index)
    }
    // 按钮状态下 右滑
    if (xMove !== 0 && endX > this.startX && endX - this.startX <= width) {
      this.handleButtonShow('show', index)
    }
    if (endX > this.startX && endX - this.startX > width) {
      this.handleButtonShow('hidden', index)
    }
  },
  handleButtonShow: function(action, index) {
    let xMove = this.data.list[index].xMove
    if (action === 'show') {
      this.data.list[index].xMove = -this.data.buttonWidth
    } else {
      this.data.list[index].xMove = 0
    }
    this.setData({
      list: this.data.list
    })
  },

  onLoad: function() {

  },
})