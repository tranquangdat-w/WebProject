from fastapi import FastAPI, Query
from fastapi.responses import JSONResponse
from data_processing import get_all_products, search_products

app = FastAPI()


@app.get("/products/")
async def get_products():
    """Lấy tất cả sản phẩm."""
    products = get_all_products()
    return JSONResponse(content=products)


@app.get("/products/search/")
async def search_products_api(query: str = Query(..., description="Từ khóa để tìm kiếm")):
    """Tìm kiếm sản phẩm theo từ khóa."""
    products = search_products(query)
    return JSONResponse(content=products)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
