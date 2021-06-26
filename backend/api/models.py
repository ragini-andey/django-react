from django.db import models


STATUS_CHOICES =(
    ("Open", "Open"),
    ("In progress", "In progress"),
    ("Closed", "Closed"),
)


class Base(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Project(Base):
    title = models.CharField(max_length=70, blank=False, default='')
    description = models.CharField(max_length=200,blank=False, default='')
    is_active = models.BooleanField(default=True)


class Task(Base):
    title = models.CharField(max_length=70, blank=False, default='')
    description = models.CharField(max_length=200,blank=False, default='')
    project = models.ForeignKey(Project,
        on_delete=models.CASCADE,
        related_name='tasks',
        blank=True,
        null=True)
    status = models.CharField(
        max_length=15,
        choices=STATUS_CHOICES,
        default='Open',
    )