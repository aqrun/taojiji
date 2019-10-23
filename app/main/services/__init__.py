

class BaseService:
    errors = {}

    def add_error(self, field, msg):
        self.errors[field] = msg

