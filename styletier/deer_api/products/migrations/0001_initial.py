# Generated by Django 3.1.5 on 2021-05-13 06:59

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=40)),
                ('parent', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='products.category')),
            ],
        ),
        migrations.CreateModel(
            name='Color',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('color', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='DeerProduct',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sales_quantity', models.PositiveIntegerField(default=0)),
                ('target_quantity', models.PositiveIntegerField(default=0)),
                ('video_url', models.FileField(blank=True, null=True, upload_to='deerproduct/')),
                ('content', models.TextField(blank=True, null=True)),
                ('scription', models.TextField(blank=True, null=True)),
                ('youtube_url', models.URLField(blank=True, max_length=300, null=True)),
                ('create_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('update_date', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='Photo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=100, null=True)),
                ('img', models.ImageField(upload_to='photo/')),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=40)),
                ('status', models.PositiveIntegerField(blank=True, null=True)),
                ('best_prod', models.PositiveIntegerField(blank=True, null=True)),
                ('new_prod', models.PositiveIntegerField(blank=True, null=True)),
                ('price', models.IntegerField(blank=True)),
                ('content', models.TextField()),
                ('stock_quantity', models.IntegerField(blank=True)),
                ('register_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('category_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='products', to='products.category')),
            ],
        ),
        migrations.CreateModel(
            name='Size',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('size', models.CharField(max_length=5)),
            ],
        ),
        migrations.CreateModel(
            name='ProductSize',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sizes', to='products.product')),
                ('size_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.size')),
            ],
        ),
        migrations.CreateModel(
            name='ProductPhoto',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_main', models.BooleanField(blank=True, default=False, null=True)),
                ('photo_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.photo')),
                ('product_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='photos', to='products.product')),
            ],
        ),
        migrations.CreateModel(
            name='ProductColor',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('color_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.color')),
                ('product_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='colors', to='products.product')),
            ],
        ),
        migrations.CreateModel(
            name='ProductAmount',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('total', models.PositiveIntegerField(default=0)),
                ('color_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.color')),
                ('product_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='amount', to='products.product')),
                ('size_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.size')),
            ],
        ),
        migrations.CreateModel(
            name='DeerProductPhoto',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_main', models.BooleanField(blank=True, default=False, null=True)),
                ('deerprdouct_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='photos', to='products.deerproduct')),
                ('photo_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.photo')),
            ],
        ),
        migrations.AddField(
            model_name='deerproduct',
            name='product_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='deerproducts', to='products.product'),
        ),
        migrations.AddField(
            model_name='deerproduct',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='deerproducts', to='accounts.deer'),
        ),
        migrations.CreateModel(
            name='DeerPhoto',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('photo_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.photo')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='photos', to='accounts.deer')),
            ],
        ),
    ]
