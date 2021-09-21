from smtplib import SMTP_SSL
from email.mime.text import MIMEText
from email.header import Header


# 发送QQ邮箱验证码，参数为收件箱地址和随机生成的验证码
def send_email(receiver, ecode):
    sender = '林大树洞墙 <1834683295@qq.com>'
    # 定义发送邮件的内容，支持HTML标签和CSS样式
    content = f"<br/>欢迎注册林大树洞墙账号，您的邮箱验证码为：" \
              f"<span style='color: red; font-size: 20px;'>{ecode}</span>, " \
              f"请复制到注册窗口中完成注册，感谢您的支持。<br/>"
    # 实例化邮箱对象，并指定邮箱的关键信息
    message = MIMEText(content, 'html', 'utf-8')
    # 指定邮箱的标题，同样使用utf-8编码
    message['Subject'] = Header('林大树洞墙的验证码','utf-8')