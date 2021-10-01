from flask import Blueprint, request, session

com = Blueprint("com", __name__)


@com.before_request
def before_comment():
    if session.get("islogin") is None or session.get("islogin") != 'true':
        return "你还没有登录"

# 发表留言接口
@com.route('/comment', methods=['POST'])
def add():
    content = request.form.get('content')
    type = request.form.get('type')
    # 对留言内容进行简单检验
    if len(content) < 5:
        return '内容不合法，字数不少于5个'
    from houduan.daima.module.comment import Comments
    comment = Comments()
    try:
        comment.insert_comment(content, type)
        return '添加成功'
    except:
        return '添加失败'