from django.shortcuts import render,redirect,HttpResponse
import json
from app import My_Forms
from app import models
from app import MyJSONEncoder
from django.db import connection
import pymysql
import time
from django.db.models import Max 
from django.db.models import Count
from django.db.models import Q
from django.core.paginator import Paginator
import os
from django.views.decorators.clickjacking import xframe_options_exempt
from django.views.decorators.clickjacking import xframe_options_deny
from django.views.decorators.clickjacking import xframe_options_sameorigin
import random
from json_data import workfliow_json
import math
import shutil
# from app import Timed_task

# Create your views here.

def home_000(request):
    #主界面
    return render(request,"home_000.html")


def file_tab(request):
    #文件列表
    if request.method=="POST":
        file_name=request.POST.get("file_name")
        file_url=request.POST.get("file_url")
        data = {"code": 0, "msg":"成功", "data":str_file}
        return HttpResponse(json.dumps(data),content_type="application/json")
	
	
	
    return render(request,"file.html")

def file_select(request):
    #文件查询
    return render(request,"file.html")

def file_del(request):
    #文件删除
    return render(request,"file.html")


def file_push(request):
    #文件上传
    return render(request,"file.html")


def file_download(request):
    #文件下载
    return render(request,"file.html")

def file_status(request):
    #文件状态
    return render(request,"file.html")
	
	
	
	
	
#http://192.168.3.83:8063/TEST_POST/

#http://192.168.3.83:8063/emali/
#{"configId":247,"queryFields":[],"emali_url":"1104541868@qq.com"}
#http://api.qingyunke.com/api.php?key=free&appid=0&msg=你好

