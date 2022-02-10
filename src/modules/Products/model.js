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
    offset $3 limit $4
`

const ADD_PRODUCTS = `
    INSERT INTO Products ( category_name ) VALUES ($1)
    RETURNING *
`

const UPDATE_PRODUCTS = `
    UPDATE Products c SET 
        category_name = (
            CASE WHEN LENGTH($2) > 0 THEN $2 ELSE c.category_name END
        )
    WHERE category_id = $1
    RETURNING *
`

function categories ({ category_id, search, pagination: {page, limit} }) {
    return fetch(CATEGORIES, category_id, search, (page - 1) * limit, limit)
}

function addCategories ({ category_name }) {
    return fetch(ADD_CATEGORIES, category_name)
}

function updateCategories ({ category_id, category_name }) {
    return fetch(UPDATE_CATEGORIES, category_id, category_name)
}

export default {
    categories,
    addCategories,
    updateCategories
}