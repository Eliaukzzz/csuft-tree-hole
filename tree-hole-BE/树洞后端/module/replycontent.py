from sqlalchemy import Table

from main import db, md


# 定义留言表类
class Replycontent(db.Model):
    __table__ = Table('replycontent', md, autoload=True)
