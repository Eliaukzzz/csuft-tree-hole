from flask import session
from sqlalchemy import Table, MetaData
from houduan.daima.exts import db


# 定义喜欢表类
class Favorite(db.Model):
    __table__ = Table('favorite', MetaData(bind=db.engine), autoload=True)

    # 插入留言收藏数据(点赞）
    def insert_favorite(self, comment_id):
        row = db.session.query(Favorite).filter_by(comment_id=comment_id, user_id=session.get('id')).first()
        from houduan.daima.module.comment import Comments
        if row is not None:
            row.canceld = 0
            row2 = db.session.query(Comments).filter_by(commentid=comment_id)
            row2.liking += 1
            db.session.commit()
        else:
            favorite = Favorite(comment_id=comment_id, user_id=session.get('id'), canceled=0)
            row2 = db.session.query(Comments).filter_by(commentid=comment_id)
            row2.liking += 1
            db.session.add(favorite)
            db.session.commit()

    # 取消收藏（点赞）
    def cancel_favorite(self, comment_id):
        from houduan.daima.module.comment import Comments
        row = db.session.query(Favorite).filter_by(comment_id=comment_id, user_id=session.get('id')).first()
        row.canceld = 1
        row2 = db.session.query(Comments).filter_by(commentid=comment_id)
        row2.liking -= 1
        db.session.commit()

    # 判断已经被收藏（点赞）
    def check_favorite(self, comment_id):
        row = db.session.query(Favorite).filter_by(comment_id=comment_id, user_id=session.get('id')).first()
        if row is None:
            return False
        elif row.canceld == 1:
            return False
        else:
            return True