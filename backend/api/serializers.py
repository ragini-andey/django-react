from rest_framework import serializers 
from api.models import Project
 
 
class ProjectSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Project
        fields = ('id', 'title', 'description', 'is_active')