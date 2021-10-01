import random
import string
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
    message['Subject'] = Header('林大树洞墙的验证码', 'utf-8')
    message['From'] = sender  # 指定发件人信息
    message['To'] = receiver  # 指定收件人信息

    smtpObj = SMTP_SSL('smtp.qq.com')
    smtpObj.login(user='1834683295@qq.com', password='tvwcsctksynsdhcg')
    # 指定发件人 收件人和邮件内容
    smtpObj.sendmail(sender, receiver, str(message))
    smtpObj.quit()


# 生成6位随机字符串作为邮箱验证码
def gen_email_code():
    randomstr = random.sample(string.ascii_letters + string.digits, 6)
    return ''.join(randomstr)
