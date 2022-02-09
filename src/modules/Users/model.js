import fetch from '../../utils/postgres.js'

const CATEGORIES = `
    SELECT * FROM Categories
    WHERE
    CASE
        WHEN $1 > 0 THEN category_id = $1
        ELSE TRUE
    END AND
    CASE
    WHEN LENGTH($2) > 0 THEN (
        category_name ILIKE CONCAT('%', $2, '%')
    ) ELSE TRUE
    END 
    offset $3 limit $4
`

const ADD_CATEGORIES = `
    INSERT INTO Categories ( category_name ) VALUES ($1)
    RETURNING *
`

const UPDATE_CATEGORIES = `
    UPDATE Categories c SET 
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