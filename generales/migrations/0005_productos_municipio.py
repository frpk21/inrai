# Generated by Django 3.2.7 on 2024-12-05 12:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('generales', '0004_auto_20241205_1211'),
    ]

    operations = [
        migrations.AddField(
            model_name='productos',
            name='municipio',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='generales.municipios'),
        ),
    ]