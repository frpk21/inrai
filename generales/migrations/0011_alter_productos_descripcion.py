# Generated by Django 3.2.7 on 2024-12-06 11:48

import ckeditor.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('generales', '0010_auto_20241206_1139'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productos',
            name='descripcion',
            field=ckeditor.fields.RichTextField(blank=True, help_text='Detalle descripción del medio o producto.', max_length=15000, null=True, verbose_name='Descripción'),
        ),
    ]