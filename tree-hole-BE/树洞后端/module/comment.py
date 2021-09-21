from sqlalchemy import Table

from main import db, md

from module.user import User


# 定义留言表类
class Comment(db.Model):
    __table__ = Table('comment', md, autoload=True)

    # 指定分页的limit和offset的参数值，同时于用户表做连接查询
    # 倒序返回数据以便按时间排序（最新消息在最上面）
    def find_limit_with_user(self, start, count):
        result = db.session.query(Comment, User.nickname, User.avatar).join(User, User.userid==Comment.userid) \
            .filter(Comment.hidden == 0)\
            .order_by(Comment.commentid.desc()).limit(count).offset(start).all()
        return result

    # 根据类型查询留言
    def find_by_type(self, count, start, type):
        result = db.session.query(Comment, User).join(User, User.userid == Comment.userid)\
            .filter(Comment.hidden == 0, Comment.type == type)\
            .order_by(Comment.commentid.desc()).limit(count).offset(start).all()
        return result

    # 获取留言的总数量
    def get_tatal_count(self):
        count = db.session.query(Comment).filter(Comment.hidden == 0).count
        return count

    # 根据文章类型获取留言的总数量
    def get_cont_by_type(self, type):
        count = db.session.query(Comment).filter(Comment.hidden == 0, Comment.type == type).count