import fetch from '../../utils/postgres.js'

const USERS = `
    SELECT * FROM Users
    WHERE
    CASE
        WHEN $1 > 0 THEN user_id = $1
        ELSE TRUE
    END AND
    CASE
    WHEN LENGTH($2) > 0 THEN (
        username ILIKE CONCAT('%', $2, '%')
    ) ELSE TRUE
    END 
    offset $3 limit $4
`

const LOGIN = `
    SELECT * FROM Users
    WHERE username = $1 AND password = $2
`

const ADD_USER = `
    INSERT INTO Users ( username, password, contact, email, role ) VALUES 
    ($1, $2, $3, $4, $5)
    RETURNING *
`

const UPDATE_USER = `
    UPDATE users u SET
        username = (
            CASE WHEN LENGTH($2) > 0 THEN $2 ELSE u.username END
        ),
        password = (
            CASE WHEN LENGTH($3) > 0 THEN crypt($3, gen_salt('bf')) ELSE u.password END
        ),
        contact = (
            CASE WHEN LENGTH($4) > 0 THEN $3 ELSE u.contact END
        ),
        email = (
            CASE WHEN LENGTH($5) > 0 THEN $4 ELSE u.email END
        ),
        role = (
            CASE WHEN LENGTH($6) > 0 THEN $6 ELSE u.role END
        )
    WHERE user_id = $1
    RETURNING *
`

function users ({ user_id, search, pagination: {page, limit} }) {
    return fetch(USERS, user_id, search, (page - 1) * limit, limit)
}

function login ({ username, password}) {
    return fetch(LOGIN, username, password)
}

function addUser ({ username, password, contact, email, role }) {
    return fetch(ADD_USER, username, password, contact, email, role)
}

function updateUser ({ user_id, username, password, contact, email, role }) {
    return fetch(UPDATE_USER, user_id, username, password, contact, email, role)
}

export default {
    users,
    login, 
    addUser,
    updateUser
}