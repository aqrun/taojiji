

* pipenv --three

uwsgi -i uwsgi.ini



## python 安装

```shell
# 安装依赖
sudo apt-get install build-essential python-dev python-setuptools\
 python-pip python-smbus libncursesw5-dev libgdbm-dev libc6-dev\
 zlib1g-dev libsqlite3-dev tk-dev\
 libssl-dev openssl libffi-dev

# 编译安装到/usr/local/python3.7
./configure --prefix=/usr/local/python3.7 --enable-optimizations
make -j 4
sudo make install   # 重新安装 sudo make altinstall

# 添加软链
sudo ln -s /usr/local/python3.7/bin/python3.7 /usr/local/bin/python3.7

# 安装pipenv
python3.7 -m pip install pipenv
```
