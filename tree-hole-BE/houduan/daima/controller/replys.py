from flask import Blueprint, request, session

reply = Blueprint("reply", __name__)

@reply.before_request
def before_reply():
    if session.get("islogin") is None or session.get("islogin") != 'true':
        return "你还没有登录"

# 发表回复接口
@reply.route('/reply', methods=['POST'])
def add():
    reply_content = request.form.get('reply_content')
    comment_id = request.form.get('comment_id')
    from houduan.daima.module.reply import Reply
    reply = Reply()
    try:
        reply.insert_reply(reply_content, comment_id)
        return '发表成功'
    except:
        return '发表失败'