import './style.scss'

export default () => (
  <div className="wrap">
    <div className="footer">
      <p>Copyright © {new Date().getFullYear()} 北京梵本装饰有限公司版权所有</p>
      <p>备案号：<a  href="https://beian.miit.gov.cn/" target="_blank">京ICP备2023002952号-1</a></p>
    </div>
  </div>
)