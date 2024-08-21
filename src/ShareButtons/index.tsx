import { message, Popover } from "antd";
import map from "lodash/map";
import NativeShare from "nativeshare";
import QRCode from "qrcode.react";
import { PropsWithChildren, useState } from "react";
import "./index.less";

const ShareButtons: React.FC<{
  url?: string;
  title: string;
  description: string;
  image: string;
  site: string;
  origin?: string;
  wechatQrcodeTitle?: string;
  wechatQrcodeHelper?: string;
}> = (props) => {
  const sites = ["weibo", "qq", "wechat", "qzone", "douban", "copyurl"];
  const { url } = props;
  const { wechatQrcodeTitle = "微信扫一扫：分享" } = props;
  const {
    wechatQrcodeHelper = "微信里点“发现”，扫一下,二维码便可将本文分享至朋友圈。",
  } = props;

  const title = encodeURIComponent(props.title);
  const description = encodeURIComponent(props.description);
  const image = encodeURIComponent(props.image);
  const site = encodeURIComponent(props.site);
  const origin = encodeURIComponent(props.origin || location.origin);
  console.log(props);

  const summary = description;
  const source = site;

  const templates = {
    qzone: `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${url}&title=${title}&desc=${description}&summary=${summary}&site=${source}`,
    qq: `http://connect.qq.com/widget/shareqq/index.html?url=${url}&title=${title}&source=${source}&desc=${description}`,
    tencent: `http://share.v.t.qq.com/index.php?c=share&a=index&title=${title}&url=${url}&pic=${image}`,
    weibo: `http://service.weibo.com/share/share.php?url=${url}&title=${title}&pic=${image}`,
    wechat: "javascript:",
    douban: `http://shuo.douban.com/!service/share?href=${url}&name=${title}&text=${description}&image=${image}&starid=0&aid=0&style=11`,
    diandian: `http://www.diandian.com/share?lo=${url}&ti=${title}&type=link`,
    linkedin: `http://www.linkedin.com/shareArticle?mini=true&ro=true&title=${title}&url=${url}&summary=${summary}&source=${source}&armin=armin`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    twitter: `https://twitter.com/intent/tweet?text=${title}&url=${url}&via=${origin}`,
    google: `https://plus.google.com/share?url=${url}`,
    copyurl: "javascript:void(0)",
  };

  const siteTips = {
    wechat: "微信",
    weibo: "微博",
    qq: "QQ",
    douban: "豆瓣",
    diandian: "点点",
    linkedin: "领英",
    facebook: "Facebook",
    twitter: "Twitter",
    google: "Google",
    tencent: "腾讯",
    qzone: "QQ空间",
    copyurl: "复制链接",
  };

  const copyUrl = () => {
    copy(url);
    message.success("复制成功");
    return false;
  };

  const html = map(sites, (site, i) => {
    if (site === "wechat") {
      const doc = (
        <div key={i} className="wechat-qrcode">
          <h4>{wechatQrcodeTitle}</h4>
          <div className="qrcode">
            <QRCode value={url} size={100} />
          </div>
          <div className="help">
            <p>{wechatQrcodeHelper}</p>
          </div>
        </div>
      );
      return (
        <a
          key={i}
          title={siteTips[site]}
          className="social-share-icon icon-wechat"
          href="javascript:void(0)"
          onClick={() => {
            // trackEvent("share", { method: siteTips[site], item_id: url });
          }}
        >
          {doc}
        </a>
      );
    }

    const className = `icon-${site} social-share-icon`;
    return (
      <a
        key={i}
        title={siteTips[site]}
        className={className}
        href={templates[site]}
        target={site == "copyurl" ? "_self" : "_blank"}
        rel="noreferrer"
        onClick={() => {
          site == "copyurl" && copyUrl();
          // trackEvent("share", { method: siteTips[site], item_id: url });
          return false;
        }}
      />
    );
  });
  return <div className="social-share">{html}</div>;
};
const nativeShare = new NativeShare({
  syncDescToTag: true,
  syncIconToTag: true,
  syncTitleToTag: true,
});

const updateShareData = async (data?: any) => {
  let { url, title, image, description, site } = data || {};
  url = url || location.href.split("#")[0];
  title = title || document.title;
  if (image) {
    image = image;
  }
  if (isWeixin()) {
    nativeShare.setConfig({
      wechatConfig: {
        debug: false,
        appId: "wxb69b4a5cb7115948",
        // ...configData.data,
        // success: (e) => {
        //   console.log('success', e);
        // },
        // fail: (e) => {
        //   console.log('fail', e);
        // },
      },
    });
  }
  nativeShare.setShareData({
    link: url,
    title,
    desc: description,
    icon: image,
    site,
  });

  if (isWeixin()) {
    // 如果是微信,则在设置完shareData后调用分享
    try {
      nativeShare.call();
    } catch (err) {
      console.log(err);
    }
  }
};

const callNativeShare = async (shareData?: {
  url;
  title;
  image;
  description;
  site;
}) => {
  // 设置分享文案

  if (shareData) {
    updateShareData(shareData);
  }
  if (isWeixin()) {
    message.info("点击右上角三个点图标进行分享操作");
  }

  // 唤起浏览器原生分享组件(如果在微信中不会唤起，此时call方法只会设置文案。类似setShareData)
  try {
    nativeShare.call();
  } catch (err) {
    // 如果不支持，你可以在这里做降级处理
    console.log(err);
    message.info("请直接使用浏览器的分享功能");
  }
};

const ShareButtonsWrapper: React.FC<
  PropsWithChildren<{
    shareData: any;
  }>
> = ({ shareData, children }) => {
  const [supportNative, setSupportNative] = useState(true);
  const onNativeShare = () => {
    if (!callNativeShare(shareData)) {
      setSupportNative(false);
    }
  };

  if (isPhone() && supportNative) {
    return <span onClick={onNativeShare}>{children}</span>;
  }

  return (
    <Popover
      defaultOpen={isPhone() && !supportNative}
      content={() => <ShareButtons {...(shareData || {})} />}
      title=""
      trigger="click"
    >
      {children}
    </Popover>
  );
};

export default ShareButtonsWrapper;

export async function copy(str: string) {
  let copyText = document.createElement("input");
  copyText.style.position = "fixed";
  copyText.style.opacity = "0";
  copyText.value = str;
  document.body.append(copyText);
  copyText.focus();
  copyText.select();
  document.execCommand("copy");
  document.body.removeChild(copyText);
}

export function isWeixin() {
  let ua = navigator.userAgent.toLowerCase();
  if (
    ua.match(/MicroMessenger/i) &&
    ua.match(/MicroMessenger/i)?.[0] == "micromessenger"
  ) {
    return true;
  }
  return false;
}

export function isPhone() {
  let os = checkOs();
  return os.isAndroid || os.isPhone;
}
export function isPc() {
  let os = checkOs();
  return os.isPc || os.isPc;
}

export function checkOs() {
  let ua = navigator.userAgent;
  let isWindowsPhone = /(?:Windows Phone)/.test(ua);
  let isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone;
  let isAndroid = /(?:Android)/.test(ua);
  let isFireFox = /(?:Firefox)/.test(ua);
  let isChrome = /(?:Chrome|CriOS)/.test(ua);
  let isTablet =
    /(?:iPad|PlayBook)/.test(ua) ||
    (isAndroid && !/(?:Mobile)/.test(ua)) ||
    (isFireFox && /(?:Tablet)/.test(ua));
  let isPhone = /(?:iPhone)/.test(ua) && !isTablet;
  let isPc = !isPhone && !isAndroid && !isSymbian;
  return {
    isTablet,
    isPhone,
    isAndroid,
    isPc,
  };
}
