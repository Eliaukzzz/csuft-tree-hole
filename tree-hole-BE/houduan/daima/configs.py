HOST = 'rm-bp1f6h413o7r2f5g37o.mysql.rds.aliyuncs.com'
PORT = '3306'
DATABASE = 'treeholedb'
USERNAME = 'root'
PASSWORD = 'Ht2001218'

DB_URI = "mysql+pymysql://root:Ht2001218@rm-bp1f6h413o7r2f5g37o.mysql.rds.aliyuncs.com:3306/treeholedb?charset=utf8"\
    .format(username=USERNAME,
                                                                                          password=PASSWORD, host=HOST,
                                                                                          port=PORT, db=DATABASE)
SQLALCHEMY_DATABASE_URI = DB_URI
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = True


# HOST = '127.0.0.1'
# PORT = '3306'
# DATABASE = 'treeholedb'
# USERNAME = 'root'
# PASSWORD = '13579,jiang'
#
# DB_URI = "mysql+pymysql://root:13579,jiang@localhost:3306/treeholedb?charset=utf8"\
#     .format(username=USERNAME,
#                                                                                           password=PASSWORD, host=HOST,
#                                                                                           port=PORT, db=DATABASE)
# SQLALCHEMY_DATABASE_URI = DB_URI
# SQLALCHEMY_TRACK_MODIFICATIONS = False
# SQLALCHEMY_ECHO = True