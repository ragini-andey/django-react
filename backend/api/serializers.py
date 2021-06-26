from rest_framework import serializers
from rest_framework import exceptions
from api.models import Project, Task
 
 
class ProjectSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Project
        fields = ('id', 'title', 'description', 'is_active')


class TaskSerializer(serializers.ModelSerializer):
    """Serializer for Task"""
    project = serializers.SlugRelatedField(
        read_only=True,
        slug_field='title'
    )

    def create(self, validated_data):
        try:
            project = Project.objects.get(pk=self.context["view"].kwargs["project_pk"])
        except Project.DoesNotExist:
            raise exceptions.NotFound('A Project with this id does not exist')
        validated_data["project"] = project
        return Task.objects.create(**validated_data)

    class Meta:
        model = Task
        fields = ('id', 'title', 'description', 'project', 'status')