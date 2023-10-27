export default defineAppConfig({
  pages: ["pages/index/index","pages/views/DetailCalendar"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "猪猪起飞",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    // color: "#999",
    borderStyle: "black",
    selectedColor:'#9c88ff',
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "assets/images/fireWork.png",
        selectedIconPath: "assets/images/cloud.png",
      },
      {
        pagePath: "pages/views/DetailCalendar",
        text: "日历表",
        iconPath: "assets/images/watermelon.png",
        selectedIconPath: "assets/images/dog.png",
      },
    ],
  },
});
