import fetch from '../../utils/postgres.js'

const PRODUCTS = `
    SELECT * FROM Products
    WHERE
    CASE
        WHEN $1 > 0 THEN product_id = $1
        ELSE TRUE
    END AND
    CASE
        WHEN LENGTH($2) > 0 THEN (
        product_name ILIKE CONCAT('%', $2, '%')
        ) ELSE TRUE
    END AND
    CASE
        WHEN $3 > 0 THEN price = $3
        ELSE TRUE
    END AND
    CASE
        WHEN $4 > 0 THEN category_id = $4
        ELSE TRUE
    END 
    offset $5 limit $6
`

const ADD_PRODUCT = `
    INSERT INTO Products ( product_name, price, short_desc, long_desc, file, category_id ) VALUES 
    ($1, $2, $3, $4, $5, $6)
    RETURNING *
`

const UPDATE_PRODUCT = `
    UPDATE Products p SET
        product_name = (
            CASE WHEN LENGTH($2) > 0 THEN $2 ELSE p.product_name END
        ),
        price = (
            CASE WHEN $3 > 0 THEN $3 ELSE p.price END
        ),
        short_desc = (
            CASE WHEN LENGTH($4) > 0 THEN $4 ELSE p.short_desc END
        ),
        long_desc = (
            CASE WHEN LENGTH($5) > 0 THEN $5 ELSE p.long_desc END
        ),
        category_id = (
            CASE WHEN $6 > 0 THEN $6 ELSE p.category_id END
        )
    WHERE product_id = $1
    RETURNING *
`

const DELETE_PRODUCT = `
    DELETE FROM Products WHERE product_id = $1 
    RETURNING * 
`

function products ({ product_id, search, price, category_id, pagination: {page, limit} }) {
    return fetch(PRODUCTS, product_id, search, price, category_id, (page - 1) * limit, limit)
}

function addProduct ({ product_name, price, short_desc, long_desc, file, category_id }) {
    return fetch(ADD_PRODUCT, product_name, price, short_desc, long_desc, file, category_id)
}

function updateProduct ({ product_name, price, short_desc, long_desc, category_id }) {
    return fetch(UPDATE_PRODUCT, product_name, price, short_desc, long_desc, category_id )
}

function deleteProduct ({ product_id }) {
    return fetch(DELETE_PRODUCT, product_id)
}

export default {
    products,
    addProduct,
    updateProduct,
    deleteProduct
}