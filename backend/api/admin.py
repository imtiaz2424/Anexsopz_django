from django.contrib import admin
from .models import Product
from .models import Order

admin.site.register(Product)


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "title",
        "user",
        "status",
        "total_price",
        "created_at",
    )

    list_filter = (
        "status",
    )