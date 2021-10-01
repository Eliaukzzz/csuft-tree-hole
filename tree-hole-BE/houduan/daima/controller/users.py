import hashlib
import re

from flask import Blueprint, jsonify, request, session, make_response, redirect

from houduan.daima.exts import model_list
from houduan.daima.utility import gen_email_code, send_email

user = Blueprint('user', __name__)


# 查看所有用户接口
@user.route('/user')
def user_all():
    from houduan.daima.module.user import User
    user = User()
    result = user.find_all_user()
    list = model_list(result)
    return jsonify(list)


# 根据id查找用户接口
@user.route('/user', methods=['POST'])
def user_id():
    id = request.form.get('id')
    from houduan.daima.module.user import User
    user = User()
    result = user.find_by_id(id)
    list = model_list(result)
    return jsonify(list)


# 发送邮箱接口
@user.route('/ecode', methods=['POST'])
def ecode():
    from houduan.daima.module.user import User
    user = User()
    email = request.form.get('email')
    if not re.match('.+@.+\..+', email):
        return '请输入正确的邮箱地址'
    elif len(user.find_by_email(email)) > 0:
        return '此邮箱已经被注册'
    code = gen_email_code()
    try:
        send_email(email, code)
        session['ecode'] = code
        return '发送成功'
    except:
        return '发送失败'


# 注册接口
@user.route('/register', methods=['POST'])
def register():
    from houduan.daima.module.user import User
    user = User()
    name = request.form.get('username').strip()
    password = request.form.get('password').strip()
    email = request.form.get('email').strip()
    ecode = request.form.get('ecode')

    # 校验验证码正确是否正确
    if ecode != session.get('ecode'):
        return '验证码不正确'
    elif not re.match('.+@.+\..+', email):
        return '请输入正确的邮箱地址'
    elif len(password) < 5:
        return '密码的位数必须大于5位'
    else:
        # 密码加密
        password = hashlib.md5(password.encode()).hexdigest()
        result = user.register(name, email, password)
        session['islogin'] = 'true'
        session['userid'] = result.id
        session['name'] = name
        session['email'] = email
        return '注册成功'


# 登录接口
@user.route('/login', methods=['POST'])
def login():
    from houduan.daima.module.user import User
    user = User()
    password = request.form.get('password').strip()
    email = request.form.get('email').strip()
    password = hashlib.md5(password.encode()).hexdigest()
    result = user.find_by_email(email)
    if len(result) == 1 and result[0].password == password:
        session['islogin'] = 'true'
        session['userid'] = result[0].id
        session['name'] = result[0].name
        session['email'] = email
        # 将cookie写入浏览器
        response = make_response('登录成功')
        response.set_cookie('email', email, max_age=1*24*3600)
        response.set_cookie('password', password, max_age=1 * 24 * 3600)
        return response
    else:
        return '登录失败'


# 注销接口
@user.route('/logout')
def logout():
    # 清空session，页面跳转
    session.clear()
    response = make_response('注销并且进行重定向', 302)
    response.headers['Location'] = '/'
    response.delete_cookie('email')
    response.delete_cookie('password')
    return response

