import time

from flask import session
from sqlalchemy import Table, MetaData
from houduan.daima.exts import db
from houduan.daima.module.user import User


# 定义留言表类
class Reply(db.Model):
    __table__ = Table('reply', MetaData(bind=db.engine), autoload=True)

    # 新增一条回复
    def insert_reply(self, reply_content, comment_id):
        now = time.strftime(('%Y-%m-%d %H:%M:%S'))
        reply = Reply(user_id=session.get('id'), reply_content=reply_content, time=now, comment_id=comment_id)
        db.session.add(reply)
        db.session.commit()

    def find_replycontent_with_user(self, comment_id, start, count):
        result = db.session.query(Reply, User) \
            .join(User, User.id == Reply.user_id) \
            .filter(Reply.hidden == 0, Reply.comment_id == comment_id) \
            .order_by(Reply.replyid.desc()).limit(count).offset(start).all()
        return result

    # 获取回复的总数量
    def get_total_count(self):
        count = db.session.query(Reply).filter(Reply.hidden == 0).count()
        return count
