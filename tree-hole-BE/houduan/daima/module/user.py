import time

from flask import request
from sqlalchemy import Table, MetaData

from houduan.daima.exts import db

# 定义用户信息表类
class User(db.Model):
    __table__ = Table('user', MetaData(bind=db.engine), autoload=True)

    # 查询所有用户
    def find_all_user(self):
        result = db.session.query(User).all()
        return result

    # 根据id查询用户
    def find_by_id(self, userid):
        row = db.session.query(User).filter_by(userid).first()
        return row

    # 根据email查询用户，可用于查询邮箱是否已经被注册
    def find_by_email(self, email):
        result = db.session.query(User).filter_by(email=email).all()
        return result

    # 注册
    def register(self, name, email, password):
        now = time.strftime('%Y-%m-%d %H:%M:%S')
        user = User(name=name, email=email, password=password, createtime=now)
        db.session.add(user)
        db.session.commit()
        return user
