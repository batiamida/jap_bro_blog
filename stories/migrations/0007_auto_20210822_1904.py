# Generated by Django 3.1.2 on 2021-08-22 16:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stories', '0006_auto_20210821_2143'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='story',
            options={'verbose_name_plural': 'stories'},
        ),
    ]