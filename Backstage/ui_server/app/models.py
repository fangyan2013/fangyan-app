from django.db import models
from django.utils import timezone
import datetime
# python manage.py makemigrations
# python manage.py migrate
# Create your models here.


class File_table(models.Model):#文件表
    id = models.AutoField(primary_key=True)
    src = models.CharField(max_length=200,default="None")
    file_name = models.CharField(max_length=200,default="None")
    file_size = models.CharField(max_length=200,default="None")
    LEVEL = (
        (1, "off"),
        (2, "no"),
    )
    file_status = models.SmallIntegerField(choices=LEVEL, default=3, verbose_name="文件状态")
    new_time = models.DateTimeField(auto_now_add=datetime.datetime.now().replace(microsecond=0), verbose_name='创建时间')
    updata_time = models.DateTimeField(auto_now=datetime.datetime.now().replace(microsecond=0), verbose_name='更新时间')

