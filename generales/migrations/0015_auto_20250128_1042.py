# Generated by Django 2.2.1 on 2025-01-28 10:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('generales', '0014_auto_20241213_1039'),
    ]

    operations = [
        migrations.AlterField(
            model_name='campanas',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='categoria',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='contacto',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='nosotros',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.DeleteModel(
            name='Noticias',
        ),
    ]
