from django.db import models

# Create your models here.
class Articles(models.Model):
    title = models.CharField('Name', max_length=100)
    anons = models.CharField('Anons', max_length=250)
    content = models.TextField('Content')
    author = models.CharField('Author', max_length=50)
    created_at = models.DateTimeField('Created at', auto_now_add=True)
    updated_at = models.DateTimeField('Updated at', auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Article"
        verbose_name_plural = "Articles"
        ordering = ['-created_at']
