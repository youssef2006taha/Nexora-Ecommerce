import React from 'react'
import UserDialog from './dialog';
import api from '../../../../api/axios';

const UsersTable = () => {

    const [isDialogOpen, setIsDialogOpen] = React.useState(false)
    const [selectedUser, setSelectedUser] = React.useState(null)
    const [users, setUsers] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    const handleEditClick = (user) => {
        setSelectedUser(user)
        setIsDialogOpen(true)
    }



    const fetchUsers = React.useCallback(async () => {
        try {
            setLoading(true)
            const response = await api.get("/users/all");
            setUsers(response?.users || response || []);
        } catch (err) {
            console.error(err);
            setUsers([]);
        }  finally {
            setLoading(false);
        }
    }, [])

    React.useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);


    const handleChangeRole = async (user) => {
        if (!user?._id) return;

        try {
            setLoading(true);
            const role = user.role === 'admin' ? 'customer' : 'admin';
            await api.patch(`/users/${user._id}`, { role });
            await fetchUsers();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }


    const handleDeleteUser = async (userId) => {
        if (!window.confirm("هل أنت متأكد من حذف هذا المستخدم؟")) return;

        setLoading(true)

        try {
            await api.delete(`/users/${userId}`)
            await fetchUsers()
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <section>
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900">
                    {/* Header */}
                    <div className="bg-slate-100 dark:bg-slate-800">
                        <div className="grid grid-cols-4 gap-4 px-6 py-4">
                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-5 w-20 animate-pulse rounded bg-slate-300 dark:bg-slate-700"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Rows */}
                    <div>
                        {[...Array(6)].map((_, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-4 items-center gap-4 border-t border-slate-200 px-6 py-4 dark:border-slate-800"
                            >
                                {/* User */}
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12 animate-pulse rounded-full bg-slate-300 dark:bg-slate-700" />

                                    <div className="space-y-2">
                                        <div className="h-4 w-28 animate-pulse rounded bg-slate-300 dark:bg-slate-700" />
                                        <div className="h-3 w-40 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                                    </div>
                                </div>

                                {/* Role */}
                                <div className="h-7 w-20 animate-pulse rounded-full bg-slate-300 dark:bg-slate-700" />

                                {/* Verified */}
                                <div className="h-4 w-24 animate-pulse rounded bg-slate-300 dark:bg-slate-700" />

                                {/* Actions */}
                                <div className="flex gap-2">
                                    {[1, 2, 3].map((i) => (
                                        <div
                                            key={i}
                                            className="h-10 w-10 animate-pulse rounded-xl bg-slate-300 dark:bg-slate-700"
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className=''>

            <div className=" overflow-hidden border border-slate-200 dark:border-slate-800  bg-white dark:bg-slate-900 rounded-3xl shadow-lg">
                <table className='w-full min-h-30 '>
                    <thead className='bg-slate-100 dark:bg-slate-800'>
                        <tr>
                            {['user', 'role', 'verified', 'actions'].map(
                                (header) => (
                                    <th
                                        key={header}
                                        className='capitalize px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300'
                                    >
                                        {header}
                                    </th>
                                )
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(
                            (user) => (
                                <tr key={user._id} className='border-r border-slate-200 dark:border-slate-800  transition hover:bg-slate-50 dark:hover:bg-sky-800/50'>
                                    <td className='px-6 py-4'>
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={user.avatar} alt={user.username}
                                                className='h-12 w-12 rounded-full object-cover' />
                                            <div className="">
                                                <p className='font-semibold text-slate-900 dark:text-white'>{user.username}</p>
                                                <p className="text-sm text-slate-500">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='px-6 py-4'>
                                        <span className={`px-3 py-1 rounded-full font-medium text-xs
                                        ${user.role === 'admin' ?
                                                'text-purple-700 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30'
                                                : 'text-cyan-700 bg-cyan-100 dark:text-cyan-400 dark:bg-cyan-900/30'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className='px-6 py-4'>
                                        <span className={`flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400 
                                        ${user.isVerified ? 'text-emerald-600 dark:text-emerald-400'
                                                : 'text-slate-600 dark:text-slate-400'
                                            }`}>{
                                                user.isVerified ? '✅ Verified'
                                                    : '❌ No'
                                            }</span>
                                    </td>
                                    <td className='px-6 py-4'>
                                        <div className="flex gap-2">
                                            <button
                                                title="Edit user"
                                                onClick={() => handleEditClick(user)}
                                                className='rounded-xl text-white bg-blue-500 px-3 py-2 text-xs font-semibold transition hover:bg-blue-600 active:scale-95 '
                                            >
                                                Edit
                                            </button>

                                            <button
                                                title="Change role"
                                                onClick={() => handleChangeRole(user)}
                                                className='rounded-xl bg-emerald-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-600 active:scale-95'
                                            >
                                                Role
                                            </button>

                                            <button
                                                title="Delete user"
                                                onClick={() => handleDeleteUser(user._id)}
                                                className='rounded-xl bg-red-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-600 active:scale-95'
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )

                        )}

                    </tbody>
                </table>
            </div>
            <UserDialog
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
                user={selectedUser}
                setSelectedUser={setSelectedUser}
                fetchUsers={fetchUsers}
                setLoading={setLoading}
            />
        </section>
    )
}

export default React.memo(UsersTable)