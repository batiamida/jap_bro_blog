# Generated by Django 3.1.2 on 2021-08-26 12:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stories', '0011_auto_20210826_1509'),
    ]

    operations = [
        migrations.AlterField(
            model_name='story',
            name='content',
            field=models.TextField(null=True),
        ),
    ]
