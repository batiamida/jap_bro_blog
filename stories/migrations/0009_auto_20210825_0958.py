# Generated by Django 3.1.2 on 2021-08-25 06:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stories', '0008_auto_20210822_1905'),
    ]

    operations = [
        migrations.AlterField(
            model_name='story',
            name='themes',
            field=models.ManyToManyField(blank=True, to='stories.Themes'),
        ),
    ]