from flask import session
from sqlalchemy import Table, MetaData
from houduan.daima.exts import db


# 定义不喜欢表类
class Hate(db.Model):
    __table__ = Table('hate', MetaData(bind=db.engine), autoload=True)


# 插入不喜欢留言数据
def insert_hate(self, comment_id):
    row = db.session.query(Hate).filter_by(comment_id=comment_id, user_id=session.get('id')).first()
    from houduan.daima.module.comment import Comments
    if row is not None:
        row.canceld = 0
        row2 = db.session.query(Comments).filter_by(commentid=comment_id)
        row2.hate += 1
        db.session.commit()
    else:
        hate = Hate(comment_id=comment_id, user_id=session.get('id'), canceled=0)
        row2 = db.session.query(Comments).filter_by(commentid=comment_id)
        row2.hate += 1
        db.session.add(hate)
        db.session.commit()


# 取消不喜欢
def cancel_hate(self, comment_id):
    from houduan.daima.module.comment import Comments
    row = db.session.query(Hate).filter_by(comment_id=comment_id, user_id=session.get('id')).first()
    row.canceld = 1
    row2 = db.session.query(Comments).filter_by(commentid=comment_id)
    row2.hate -= 1
    db.session.commit()


# 判断已经被不喜欢
def check_hate(self, comment_id):
    row = db.session.query(Hate).filter_by(comment_id=comment_id, user_id=session.get('id')).first()
    if row is None:
        return False
    elif row.canceld == 1:
        return False
    else:
        return True
