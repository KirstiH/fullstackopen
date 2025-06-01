import { useState } from 'react'

const UserInfo = ({ author, blogs }) => {
    return (
        <tbody>
            <tr>
                <td>{author}</td>
                <td>{blogs.length}</td>
            </tr>
        </tbody>
    )
}

export default UserInfo