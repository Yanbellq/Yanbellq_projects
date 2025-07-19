from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator

class Movie(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=360)

    def number_of_ratings(self):
        ratings = Rating.objects.filter(movie=self)
        return len(ratings)

    def average_rating(self):
        ratings = Rating.objects.filter(movie=self)
        total = 0
        for rating in ratings:
            total += rating.stars
        return total / len(ratings) if len(ratings) > 0 else 0

class Rating(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stars = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])

    class Meta:
        unique_together = (('movie', 'user'),)
        # index_together = (('movie', 'user'),)
        indexes = [
            models.Index(fields=['movie', 'user']),
        ]