import math

from flask import Blueprint, request, jsonify, session

from houduan.daima.exts import model_join_list

index = Blueprint("index", __name__)


# 根路由页面接口
@index.route('/', methods=['GET'])
def home():
    from houduan.daima.module.comment import Comments
    comment = Comments()
    from houduan.daima.module.reply import Reply
    reply = Reply()
    commentresult = comment.find_limit_with_user(0, 10)
    commenttotal = math.ceil(comment.get_total_count() / 10)  # 留言总页数
    comment_list = model_join_list(commentresult)
    from houduan.daima.module.favorite import Favorite
    from houduan.daima.module.hate import Hate
    for comment in comment_list:
        is_favorite = Favorite().check_favorite(comment['commentid'])
        is_hate = Hate().check_hate(comment['commentid'])
        replyresult = reply.find_replycontent_with_user(comment['commentid'], 0, 6)
        replytotal = math.ceil(reply.get_total_count() / 6)  # 评论总页数
        comment['reply_list'] = model_join_list(replyresult)
        return jsonify(comment_list)


# 分页接口
@index.route('/page/<int:page>')
def paginate(page):
    start = (page - 1) * 10
    from houduan.daima.module.comment import Comments
    comment = Comments()
    from houduan.daima.module.reply import Reply
    reply = Reply()
    commentresult = comment.find_limit_with_user(start, 10)
    commenttotal = math.ceil(comment.get_total_count() / 10)  # 留言总页数
    comment_list = model_join_list(commentresult)
    from houduan.daima.module.favorite import Favorite
    from houduan.daima.module.hate import Hate
    for comment in comment_list:
        is_favorite = Favorite().check_favorite(comment['commentid'])
        is_hate = Hate().check_hate(comment['commentid'])
        replyresult = reply.find_replycontent_with_user(comment['commentid'], 0, 6)
        replytotal = math.ceil(reply.get_total_count() / 6)  # 评论总页数
        comment['reply_list'] = model_join_list(replyresult)
        return jsonify(comment_list),is_favorite, is_hate


# 分类接口
@index.route('/type/<type>/<int:page>')
def classify(type, page):
    start = (page - 1) * 10
    from houduan.daima.module.comment import Comments
    comment = Comments()
    from houduan.daima.module.reply import Reply
    reply = Reply()
    commentresult = comment.find_by_type(start, 10, type)
    commenttotal = math.ceil(comment.get_cont_by_type(type) / 10)  # 留言总页数
    comment_list = model_join_list(commentresult)
    from houduan.daima.module.favorite import Favorite
    from houduan.daima.module.hate import Hate
    for comment in comment_list:
        is_favorite = Favorite().check_favorite(comment['commentid'])
        is_hate = Hate().check_hate(comment['commentid'])
        replyresult = reply.find_replycontent_with_user(comment['commentid'], 0, 6)
        replytotal = math.ceil(reply.get_total_count() / 6)  # 评论总页数
        comment['reply_list'] = model_join_list(replyresult)
        return jsonify(comment_list), is_favorite, is_hate


# 喜欢（点赞）接口
@index.route('/favorite', methods=['POST'])
def add_favorite():
    comment_id = request.form.get('commentid')
    if session.get('islogin') is None:
        return "你还没有登录"
    else:
        try:
            from houduan.daima.module.favorite import Favorite
            Favorite().insert_favorite(comment_id)
            return "收藏成功"
        except:
            return "收藏失败"


# 取消喜欢(点赞）成功
@index.route('/favorite', methods=['DELETE'])
def cancel_favorite():
    comment_id = request.form.get('commentid')
    try:
        from houduan.daima.module.favorite import Favorite
        Favorite().cancel_favorite(comment_id)
        return '取消收藏成功'
    except:
        return '取消收藏失败'


# 不喜欢接口
@index.route('/hate', methods=['POST'])
def add_hate():
    comment_id = request.form.get('commentid')
    if session.get('islogin') is None:
        return "你还没有登录"
    else:
        try:
            from houduan.daima.module.hate import Hate
            Hate().insert_hate(comment_id)
            return "添加不喜欢成功"
        except:
            return "添加不喜欢失败"


# 取消不喜欢接口
@index.route('/hate', methods=['DELETE'])
def cancel_hate():
    comment_id = request.form.get('commentid')
    try:
        from houduan.daima.module.hate import Hate
        Hate().cancel_hate(comment_id)
        return '取消收藏成功'
    except:
        return '取消收藏失败'
