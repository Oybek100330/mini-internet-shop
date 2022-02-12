import fetch from '../../utils/postgres.js'

const ORDERS = `
    SELECT * FROM Orders
    WHERE
    (CASE
        WHEN $1 > 0 THEN order_id = $1
        ELSE TRUE
    END AND
    CASE
        WHEN LENGTH($3) > 0 THEN isPaid = $3 
        ELSE TRUE
    END) AND user_id = $2
    offset $4 limit $5
`

const ADD_ORDER = `
    INSERT INTO Orders ( user_id, isPaid ) VALUES 
    ($1, $2)
    RETURNING *
`

const UPDATE_ORDER = `
    UPDATE orders o SET
        isPaid = (
            CASE WHEN LENGTH($2) > 0 THEN $2 ELSE o.isPaid END
        ),
        user_id = (
            CASE WHEN $3 > 0 THEN $3 ELSE o.user_id END
        )
    WHERE order_id = $1
    RETURNING *
`

const DELETE_ORDER = `
    DELETE FROM Orders WHERE order_id = $1 AND user_id = $2
    RETURNING * 
`

function orders ({ order_id, user_id, isPaid, pagination: {page, limit} }) {
    return fetch(ORDERS, order_id, user_id, isPaid, (page - 1) * limit, limit)
}

function addOrder ({ user_id, isPaid }) {
    return fetch(ADD_ORDER, user_id, isPaid)
}

function updateOrder ({ order_id, isPaid, user_id }) {
    return fetch(UPDATE_ORDER, order_id, isPaid, user_id)
}

function deleteOrder ({ order_id, user_id }) {
    return fetch(DELETE_ORDER, order_id, user_id)
}

export default {
    orders,
    addOrder,
    updateOrder,
    deleteOrder
}