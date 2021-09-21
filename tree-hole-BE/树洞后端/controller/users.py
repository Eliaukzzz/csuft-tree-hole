from module.user import User
from flask import Blueprint, jsonify

user = Blueprint('user', __name__)


@user.route('/user')
def user_demo():
    user = User()
    result = user.find_all_user()
    list = model_list(result)
    return jsonify(list) #json化数据

# 将数据拼装转换为字典列表格式
def model_list(result):
    list = []
    for row in result:
        dict = {}
        for k, v in row.__dict__.items():
            if not k.startswith('_sa_instance_state'):
                dict[k] = v
        list.append(list)
    return list