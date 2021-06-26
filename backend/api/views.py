from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet 
from rest_framework import status, exceptions

from .models import Project, Task
from .serializers import ProjectSerializer, TaskSerializer


class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class TaskViewSet(ModelViewSet):
    """Task Viewset"""
    queryset = Task.objects.all().select_related(
        'project'
        )
    serializer_class = TaskSerializer
    
    def get_queryset(self, *args, **kwargs):
        project_id = self.kwargs.get("project_pk")
        try:
            project = Project.objects.get(id=project_id)
        except Project.DoesNotExist:
            raise exceptions.NotFound('A Project with this id does not exist')
        return self.queryset.filter(project=project)
