import math

from flask import Blueprint, render_template

from module.comment import Comment

index = Blueprint("index", __name__)


# 根路由页面视图函数
@index.route('/')
def home():
    comment = Comment()
    result = comment.find_limit_with_user(0, 10)
    total = math.ceil(comment.get_tatal_count() / 10)  # 总页数
    return render_template('index.html', result=result, total=total)


# 分页视图函数
@index.route('/page/<int:page>')
def paginate(page):
    start = (page - 1) * 10
    comment = Comment()
    result = comment.find_limit_with_user(start, 10)
    total = math.ceil(comment.get_tatal_count() / 10)  # 总页数
    return render_template('index.html', result=result, total=total, page=page)

# 分类页面视图函数
@index.route('/type/int:<type>/int:<page>')
def classify(type, page):
    comment = Comment()
    start = (page - 1) * 10
    result = comment.find_by_type(type, start, 10)
    total = math.ceil(comment.get_cont_by_type(type) / 10)
    return render_template('type.html', result=result, page=page, total=total, type=type)
