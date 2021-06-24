from django.db import models


class Project(models.Model):
    title = models.CharField(max_length=70, blank=False, default='')
    description = models.CharField(max_length=200,blank=False, default='')
    is_active = models.BooleanField(default=False)