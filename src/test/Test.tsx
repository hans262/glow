import { Button } from "antd";
import NativeShare from "nativeshare";

const onShare = () => {
  const nativeShare = new NativeShare({
    wechatConfig: {
      appId: "wxb69b4a5cb7115948",
      timestamp: "",
      nonceStr: "",
      signature: "",
    },
  });

  nativeShare.setShareData({
    icon: "https://pic3.zhimg.com/v2-080267af84aa0e97c66d5f12e311c3d6_xl.jpg",
    link: "https://github.com/fa-ge/NativeShare",
    title: "MarsX",
    desc: "MarsX是一个音乐平台",
    from: "@fa-ge",
  });

  try {
    nativeShare.call();
  } catch (err) {
    console.log(err);
  }
};

function Test() {
  return (
    <div className="container p-10 h-screen">
      <Button type="primary" onClick={onShare}>
        分享
      </Button>
    </div>
  );
}

export default Test;
