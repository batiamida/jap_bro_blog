# Generated by Django 3.2.4 on 2021-09-04 07:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('analytics', '0006_objectviewed_session_key'),
    ]

    operations = [
        migrations.AlterField(
            model_name='objectviewed',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]