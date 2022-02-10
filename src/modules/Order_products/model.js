import fetch from '../../utils/postgres.js'

const ORDER_PRODUCTS = `
    SELECT * FROM Order_products
    WHERE
    CASE
        WHEN $1 > 0 THEN order_id = $1
        ELSE TRUE
    END AND
    CASE
        WHEN $2 > 0 THEN product_id = $2
        ELSE TRUE
    END 
    offset $3 limit $4
`

const ADD_ORDER_PRODUCTS = `
    INSERT INTO Order_products ( order_id, product_id, count ) VALUES 
    ($1, $2, $3)
    RETURNING *
`

const UPDATE_ORDER_PRODUCTS = `
    UPDATE Order_products o SET
        count = (
            CASE WHEN $3 > 0 THEN $3 ELSE o.count END
        )
    WHERE order_id = $1 AND product_id = $2
    RETURNING *
`

const DELETE_ORDER_PRODUCTS = `
    DELETE FROM Order_products 
    WHERE order_id = $1 AND product_id = $2
    RETURNING *
`

function orderProducts ({ order_id, product_id, pagination: {page, limit} }) {
    return fetch(ORDER_PRODUCTS, order_id, product_id, (page - 1) * limit, limit)
}

function addOrderProducts ({ order_id, product_id, count }) {
    return fetch(ADD_ORDER_PRODUCTS, order_id, product_id, count)
}

function updateOrderProducts ({ order_id, product_id, count }) {
    return fetch(UPDATE_ORDER_PRODUCTS, order_id, product_id, count)
}

function deleteOrderProducts ({ order_id, product_id, }) {
    return fetch(DELETE_ORDER_PRODUCTS, order_id, product_id,)
}

export default {
    orderProducts,
    addOrderProducts,
    updateOrderProducts,
    deleteOrderProducts
}