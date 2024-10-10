"""Module to connection to mongodb"""
from mongo_connection import collection


def get_all_products():
    """Lấy tất cả sản phẩm và loại bỏ trường _id."""
    return list(collection.find({}, {'_id': 0}))


def search_products(query: str):
    """Tìm kiếm sản phẩm theo từ khóa trong trường name hoặc keywords."""
    return list(collection.find({
        "$or": [
            # Tìm kiếm theo hàng name
            {"name": {"$regex": query, "$options": "i"}},
            # Tìm kiếm theo hàng keywords
            {"keywords": {"$regex": query, "$options": "i"}}
        ]
    }, {'_id': 0}))
