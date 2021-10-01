# coding=utf-8
import os

import pymysql
from flask import session, request

from houduan.daima import app, configs
from houduan.daima.exts import db

pymysql.install_as_MySQLdb()
# 加载配置文件
app.config.from_object(configs)
# db绑定app
db.init_app(app)
# 生成随机数种子，用于产生SessionID
app.config['SECRET_KEY'] = os.urandom(24)


# 定义全局拦截器，实现自动登录
@app.before_request
def before():
    url = request.path
    pass_list = ['/register', '/login', '/logout']
    if url in pass_list:
        pass
    # 自动登录
    if session.get('islogin') is None:
        email = request.cookies.get('email')
        password = request.cookies.get('password')
        if email != None and password != None:
            from houduan.daima.module.user import User
            user = User()
            result = user.find_by_email(email)
            if len(result) == 1 and result[0].password == password:
                session['islogin'] = 'true'
                session['userid'] = result[0].id
                session['name'] = result[0].name
                session['email'] = email


if __name__ == '__main__':
    app.run()
