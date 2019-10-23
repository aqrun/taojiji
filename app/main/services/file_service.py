import time
import datetime
import os
from flask import request, current_app
from flask_login.utils import current_user
from sqlalchemy import func, desc, asc
from . import BaseService
from ...utils import random_string
from ...models.file import File as FileModel
from ...models import db_session


class FileService(BaseService):

    id = ''
    filename = ''
    extension = ''
    uri = ''
    url = ''

    def upload(self):
        file = request.files['file']
        lt = time.localtime()
        self.filename = file.filename
        name_arr = os.path.splitext(self.filename)
        extension = name_arr[1]
        realname = name_arr[0]
        static_folder = current_app.static_folder
        name = '%s_%s%s' % (realname, random_string(), extension)
        uri_directory = 'static/files/%s/%s/%s' % (lt[0], lt[1], lt[2])
        self.uri = uri_directory + '/' + name
        file_directory = os.path.abspath(os.path.join(static_folder, '../', uri_directory))
        file_path = os.path.abspath(os.path.join(static_folder, '../', self.uri))

        if not os.path.exists(file_directory):
            os.makedirs(file_directory)

        file.save(file_path)
        # save to database
        self.add_file()
        # print('file==========', file)
        data = {
            'filename': file.filename,
            'uri': self.uri,
            'extension': extension,
            'url': self.url,
            'file_path': file_path
        }
        return data

    def add_file(self):
        # current_time = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time()))
        current_time = datetime.datetime.now()
        # print('=======current_user', current_user)
        file_model = FileModel(
            user_id=current_user.id,
            name=self.filename,
            uri=self.uri,
            extension=self.extension,
            location=FileModel.LOCATION_LOCAL,
            status=FileModel.STATUS_TEMP,
            created_at=current_time,
            updated_at=current_time
        )
        self.url = file_model.get_url()
        try:
            db_session.add(file_model)
            db_session.commit()
            return True
        except Exception as e:
            self.add_error('保存文件', e.__str__())
            return False

    def file_clear(self):
        """
        缓存文件清除
        :return:
        """
        yesterday = datetime.datetime.now() + datetime.timedelta(days=-1)
        files = db_session.query(FileModel)\
            .filter(
                FileModel.status == FileModel.STATUS_TEMP,
                FileModel.created_at < yesterday
            )\
            .order_by(desc(FileModel.created_at))\
            .all()

        for file in files:
            if file.location == FileModel.LOCATION_LOCAL:
                static_folder = current_app.static_folder
                file_path = os.path.abspath(os.path.join(static_folder, '../', file.uri))
                if os.path.exists(file_path):
                    os.remove(file_path)
                db_session.delete(file)
                print('file deleted: %s' % file.name)
