from sqlalchemy import Column, Integer, String, DECIMAL, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from . import Base


class File(Base):
    __tablename__ = 'files'

    LOCATION_LOCAL = 'local'
    LOCATION_QINIU = 'qiniu'

    STATUS_TEMP = 0
    STATUS_ACTIVE = 1

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, nullable=False)
    name = Column(String(250), nullable=False)
    uri = Column(String(250), nullable=False)
    extension = Column(String(32), default='')
    location = Column(String(32), nullable=False)
    status = Column(Integer, default=0)
    created_at = Column(DateTime(), nullable=True)
    updated_at = Column(DateTime(), nullable=True)

    def get_url(self):
        if self.location == self.LOCATION_LOCAL:
            return '/' + self.uri
        else:
            return self.uri

