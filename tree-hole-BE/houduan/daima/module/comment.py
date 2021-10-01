import time

from flask import session
from sqlalchemy import Table, MetaData

from houduan.daima.exts import db
from houduan.daima.module.user import User


class Comments(db.Model):
    __table__ = Table('comment', MetaData(bind=db.engine), autoload=True)

    # 新增一条评论
    def insert_comment(self, content, type):
        now = time.strftime(('%Y-%m-%d %H:%M:%S'))
        comment = Comments(user_id=session.get('id'), content=content, time=now, type=type)
        db.session.add(comment)
        db.session.commit()

    # 指定分页的limit和offset的参数值，同时于用户表做连接查询
    # 倒序返回数据以便按时间排序（最新消息在最上面）
    def find_limit_with_user(self, start, count):
        result = db.session.query(Comments, User) \
            .join(User, User.id == Comments.user_id) \
            .filter(Comments.hidden == 0) \
            .order_by(Comments.commentid.desc()).limit(count).offset(start).all()
        return result

    # 获取留言的总数量
    def get_total_count(self):
        count = db.session.query(Comments).filter(Comments.hidden == 0).count()
        return count

    # 根据类型查询留言
    def find_by_type(self, start, count, type):
        result = db.session.query(Comments, User).join(User, User.id == Comments.user_id) \
            .filter(Comments.hidden == 0,Comments.type == type) \
            .order_by(Comments.commentid.desc()).limit(count).offset(start).all()
        return result


    # 根据文章类型获取留言的总数量
    def get_cont_by_type(self, type):
        count = db.session.query(Comments).filter(Comments.hidden == 0, Comments.type == type).count()
        return count


    #
    #     # 获取当前留言的上一篇和下一篇
    #
    # def find_prev_next_by_id(self, comment_id):
    #     dict = {}
    #     # 查询比当前编号小的当中最大的一个
    #     row = db.session.query(Comment).filter(Comment.hidden == 0, Comment.comment_id < comment_id) \
    #         .order_by(Comment.comment_id.desc()).limit(1).first()
    #     # 如果当前己经是第一篇，上一篇也是当前文章
    #     if row is None:
    #         prev_id = comment_id
    #     else:
    #         prev_id = row.comment_id
    #     dict[' prev_id'] = prev_id
    #     dict[' prev_headline'] = self.find_headline_by_id(prev_id)
    #
    #     # 查询比当前编号大的当中最小的一个
    #     row = db.session.query(Comment).filter(Comment.hidden == 0, Comment.comment_id > comment_id) \
    #         .order_by(Comment.comment_id).limit(1).first()
    #     # 如果当前已经是最后一篇，下一篇也是当前文章
    #     if row is None:
    #         next_id = comment_id
    #     else:
    #         next_id = row.articleid
    #         dict['next_id'] = next_id
    #         dict['next_headline'] = self.find_headline_by_id(next_id)
    #         return dict
