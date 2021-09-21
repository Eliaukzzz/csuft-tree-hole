# coding=utf-8
import os
from imp import reload

from flask import Flask, render_template, request, flash, make_response

# 导入wtf扩展的表单类
from flask_sqlalchemy import SQLAlchemy
from flask_wtf import FlaskForm

# 导入自定义表单需要的字段
from sqlalchemy import create_engine, MetaData, Table
from sqlalchemy.orm import sessionmaker, scoped_session, declarative_base, Session
from wtforms import SubmitField, StringField, PasswordField

# 导入wtf扩展提供的表单验证器
from wtforms.validators import DataRequired, EqualTo

app = Flask(__name__, template_folder='template', static_url_path='/', static_folder='templates')
# 生成随机数种子，用于产生SessionID
app.config['SECRET_KEY'] = os.urandom(24)


# 自定义表单类，文本字段、密码字段、提交按钮
# 需要自定义一个表单类
class RegisterForm(FlaskForm):
    username = StringField('用户名:', validators=[DataRequired()])
    password = PasswordField('密码:', validators=[DataRequired()])
    password2 = PasswordField('确认密码:', validators=[DataRequired(), EqualTo('password', '密码输入不一致')])
    input = SubmitField('提交')


@app.context_processor
def gettype():
    type = {
        '1': '记录生活',
        '2': '日常吐槽',
        '3': '表白',
        '4': '求助'
    }


# 定义用户注册页面路由视图函数，生成表单对象，获取表单数据，进行表单数据验证
@app.route('/api/users', methods=['POST'])
def register():
    register_form = RegisterForm()

    if request.method == 'POST':
        # 调用validate_on_submit方法, 可以一次性执行完所有的验证函数的逻辑
        if register_form.validate_on_submit():
            # 进入这里就表示所有的逻辑都验证成功
            username = request.form.get('username')
            password = request.form.get('password')
            password2 = request.form.get('password2')
            return 'success'

        else:
            # message = register_form.errors.get('password2')[0]
            # flash(message)
            flash('参数有误')

    return render_template('index.html', form=register_form)


# 定义用户登录页面路由视图函数
@app.route('/api/user/login', methods=['POST'])
def login():
    pass


# 定义用户注销页面路由视图函数
@app.route('/api/user/session', methods=['DELETE'])
def login():
    pass


# 获取当前用户登录信息页面视图函数
@app.route('/api/user/current', methods=['GET', 'POST'])
def current():
    pass


# 更新单个用户信息页面视图函数
@app.route('/api/user/<userid>>', methods=['PATCH'])
def getuser(userid):
    pass


# 发表留言视图函数
@app.route('/api/posts', methods=['POST'])
def comment():
    pass


# 获取留言信息和留言点赞信息视图函数
@app.route('/api/posts/<commentid>', methods=['GET'])
def getcomment(commentid):
    pass


# 更新留言信息和留言点赞信息视图函数
@app.route('/api/posts/<commentid>', methods=['PATCH'])
def updatecomment(commentid):
    pass


# 删除留言信息和留言点赞信息视图函数
@app.route('/api/posts/<commentid>', methods=['DELETE'])
def deletecomment(commentid):
    pass


# 发表评论信息视图函数
@app.route('/api/reply/<commentid>/<contentid>>', methods=['POST'])
def content(commentid, contentid):
    pass


# 获取评论信息和评论点赞信息视图函数
@app.route('/api/reply/<commentid>/<contentid>', methods=['GET'])
def getcontent(commentid, contentid):
    pass


# 更新评论信息和评论点赞信息视图函数
@app.route('/api/reply/<commentid>/<contentid>', methods=['PATCH'])
def updatecontent(commentid, contentid):
    pass


# 删除评论信息和评论点赞信息视图函数
@app.route('/api/reply/<commentid>/<contentid>', methods=['DELETE'])
def deletecontent(commentid, contentid):
    pass


# 生成token信息视图函数
@app.route('/api/token', methods=['POST'])
def token():
    pass


# 利用自定义响应的方式来往浏览器设置cookie
@app.route('/api/cookie', methods=['POST'])
def cookie():
    response = make_response()
    response.set_cookie('username', max_age=100)
    response.set_cookie('password', max_age=100)
    return response


# 读取token和cookie信息
@app.route('/api/tc/read', methods=['GET'])
def tcread():
    return request.cookies.get('username')


# flask-sqlalchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:mysql@127.0.0.1:3306/Flask_test'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# 查询时会显示原始SQL语句
app.config['SQLALCHEMY_ECHO'] = True

db = SQLAlchemy(app)

# sqlalchemy
engine = create_engine('mysql+pymysql://root:13579,jiang@localhost/woniunote')
DBsession = sessionmaker(bind=engine)
dbsession = scoped_session(DBsession)  # 线程安全
Base = declarative_base()
md = MetaData(bind=engine)

if __name__ == '__main__':
    from controller.users import *

    app.register_blueprint(user)

    from controller.index import *

    app.register_blueprint(index)
    app.run(debug=True)
