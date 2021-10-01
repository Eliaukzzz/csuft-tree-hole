from flask import Flask

app = Flask(__name__)

from .controller import comments, users, replys, indexs

app.register_blueprint(comments.com)
app.register_blueprint(replys.reply)
app.register_blueprint(indexs.index)
app.register_blueprint(users.user)