import axios from "axios";

const apiClient = axios.create(
    {
        baseURL: 'http://localhost:2003/v1'
    }
)

/* --------------------------- PRODUCTS -------------------------- */

export const getProductsRequest = async()=>{
    try {
        return await apiClient.get('/product/listProduct')
    } catch (error) {
        return{
            error: true,
            error
        }
    }
}

export const updateProductsRequest = async(id, updateData)=>{
    try {
        return await apiClient.put(`/product/updateProduct/${id}`, updateData)
    } catch (error) {
        return{
            error: true,
            error
        }
    }
}

export const deleteProductRequest = async(id)=>{
    try {
        return await apiClient.put(`/product/softDeleteProduct/${id}`)
    } catch (error) {
        return{
            error: true,
            error
        }
    }
}

export const addProductRequest = async(data)=>{
    try {
        return await apiClient.post(`/product/addProduct`, data)
    } catch (error) {
        return{
            error: true,
            error
        }
    }
}

/* ------------------------ USERS ----------------------- */
export const getUsersRequest = async()=>{
    try {
        return await apiClient.get('/user/getAllUser')
    } catch (error) {
        return{
            error: true,
            error
        }
    }
}

/* --------------------------- CATEGORY ------------------------ */
export const getCategoriesRequest = async()=>{
    try {
        return await apiClient.get('/category/listCategory')
    } catch (error) {
        return{
            error: true,
            error
        }
    }
}

export const updateCategoryRequest = async(id,updateData)=>{
    try {
        return await apiClient.put(`/category/updateCategory/${id}`, updateData)
    } catch (error) {
        return{
            error: true,
            error
        }
    }
}

export const deleteCategoryRequest = async(id)=>{
    try {
        return await apiClient.put(`/category/softDeleteCategory/${id}`)
    } catch (error) {
        return{
            error: true,
            error
        }
    }
}

export const addCategoryRequest = async(data)=>{
    try {
        return await apiClient.post(`/category/addCategory`, data)
    } catch (error) {
        return{
            error: true,
            error
        }
    }
}

/* ----------------------------- PROVIDER ----------------------- */
export const getProvidersRequest =async()=>{
    try {
        return await apiClient.get('/provider/listProvider')
    } catch (error) {
        return{
            error: true,
            error
        }
    }
}

export const updateProviderRequest = async(id, updateData)=>{
    try {
        return await apiClient.put(`/provider/updateProvider/${id}`, updateData)
    } catch (error) {
        return{
            error: true,
            error
        }
    }
}

export const deleteProviderRequest = async(id)=>{
    try {
        return await apiClient.put(`/provider/softDeleteProvider/${id}`)
    } catch (error) {
        return{
            error: true,
            error
        }
    }
}

export const addProviderRequest = async(data)=>{
    try {
        return await apiClient.post(`/provider/addProvider`, data)
    } catch (error) {
        return{
            error: true,
            error
        }
    }
}

/* ---------------------------- POST ----------------------------  */
export const getPostRequest = async()=>{
    try {
        return await apiClient.get(`/post/listPost`)
    } catch (error) {
        return{
            error: true,
            error
        }
    }
}

export const deletePostRequest = async(id)=>{
    try {
        return await apiClient.put(`/post/softDeletePost/${id}` )
    } catch (error) {
        return{
            error: true,
            error
        }
    }
}

/* ----------------------------- INVENTORY MOVEMENT --------------------------- */
export const getInventoryMovementRequest = async()=>{
    try {
        return await apiClient.get(`/inventory/listInventoryMovement`)
    } catch (error) {
        return{
            error: true,
            error
        }
    }
}

export const deleteInventoryMovementRequest = async(id)=>{
    try {
        return await apiClient.put(`inventory/softDeleteInventoryMovement/${id}`)
    } catch (error) {
        return{
            error: true,
            error
        }
    }
}

export const updateInventoryMovementRequest = async(id, data)=>{
    try {
        return await apiClient.put(`/inventory/softDeleteInventoryMovement${id}`,data)
    } catch (error) {
        return{
            error: true,
            error
        }
    }
}

export const addInventoryMovementRequest = async(data)=>{
    try {
        return await apiClient.post(`/inventory/addInventoryMovement`,data)
    } catch (error) {
        return{
            error: true,
            error
        }
    }
}

/* ------------------------------------ SHOPPING CARTS ---------------------------- */

export const getCartsRequest = async()=>{
    try {
        return await apiClient.get(`/cart/listCart`)
    } catch (error) {
        return{
            error: true,
            error
        }
    }
}

export const getCartByIdRequest = async(cartId)=>{
    try {
        return await apiClient.get(`/cart/listCartById/${cartId}`)
    } catch (error) {
        return{
            error: true,
            error
        }
    }
}

export const deleteCartRequest = async(id)=>{
    try {
        return await apiClient.put(`/cart/softDeleteCartA/${id}`)
    } catch (error) {
        return{
            error: true,
            error
        }
    }
}

/* ----------------------------------- INVOICES ----------------------------- */

export const getInvoicesRequest = async()=>{
    try {
        return await apiClient.get(`/bill/getAllBills`)
    } catch (error) {
        return{
            error: true,
            error
        }
    }
}
export const getInvoiceByIdRequest = async(billId)=>{
    try {
        return await apiClient.get(`/bill/getBillById/${billId}`)
    } catch (error) {
        return{
            error: true,
            error
        }
    }
}

/* --------------------------------------- COMMENTS ----------------------------- */
export const getPostByIdRequest = async(id)=>{
    try {
        return await apiClient.get(`/post/listPostById/${id}`)
    } catch (error) {
        return{
            error: true,
            error
        }
    }
}