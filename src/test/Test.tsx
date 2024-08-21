import { Button } from "antd";
import ShareButtons from "../ShareButtons";

function Test() {
  return (
    <div className="container p-10 h-screen">
      <ShareButtons
        shareData={{
          url: `https://www.baidu.com`,
          title: `Partme-title`,
          image:
            "https://cdn.cainiaoplus.com/static/images/logo-cainiaoplus-com.png",
          description: `来自hans的Partme会员频道`,
          site: "Partme.com",
        }}
      >
        <Button type="primary">分享</Button>
      </ShareButtons>
    </div>
  );
}

export default Test;
