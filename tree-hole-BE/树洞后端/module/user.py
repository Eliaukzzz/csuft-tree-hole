from sqlalchemy import Table

from main import db, md


# 定义用户信息表类
class User(db.Model):
    __table__ = Table('users', md, autoload=True)

    # 查询所有用户
    def find_all_user(self):
        result = db.session.query(User).all()
        return result

    # 根据id查询用户
    def find_by_id(self, userid):
        row = db.session.query(User).filter_by(userid).first()
        return row


