import React, { useState, useEffect } from "react";


function UserAccount ({axiosJWT}) {
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        role: '',
        accountConfirm: false
    });
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    function handleChange(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    function handleOldPasswordChange(e) {
        setOldPassword(e.target.value);
    };

    function handleNewPasswordChange(e) {
        setNewPassword(e.target.value);
    };

    async function fetchUser() {
        try {
            axiosJWT.get(`http://localhost:5000/account/self`, {
                headers: {
                    'Authorization': sessionStorage.getItem('accessToken')
                }
            }).then((res) => {
                setUser({
                    firstname: res.data.firstname,
                    lastname: res.data.lastname,
                    phone: res.data.phone,
                    email: res.data.email,
                    role: res.data.assigned_role,
                    accountConfirm: res.data.accountConfirm
                });

            });
        } catch (error) {
            console.log(error);
        }
    };

    async function updateAccount() {
        try {
            axiosJWT.post('http://localhost:5000/account/update', {
                firstname: user.firstname,
                lastname: user.lastname,
                phone: user.phone,
                email: user.email
            }, {
                headers: {
                    'Authorization': sessionStorage.getItem('accessToken')
                }
            }).then((res) => {
                setUser(res.data);
            })
        } catch (error) {
            console.log(error);
        }
    };

    async function changePassword() {
        try {
            axiosJWT.post('http://localhost:5000/account/update/password', {
                oldPassword: oldPassword,
                newPassword: newPassword
            }, {
                headers: {
                    'Authorization': sessionStorage.getItem('accessToken')
                }
            }).then((res) => {
                if (res.data === 'Password not updated') {
                    alert('Password not updated');
                } else {
                    alert('Password updated successfully');
                }
            })
        } catch (error) {
            console.log(error);
        }
    };

    async function confirmAccount() {
        try {
            axiosJWT.post('http://localhost:5000/account/confirm', {
                accountConfirm: user.accountConfirm
            }, {
                headers: {
                    'Authorization': sessionStorage.getItem('accessToken')
                }
            }).then((res) => {
                setUser(res.data);
            })
        } catch (error) {
            console.log(error);       
        }
    }

    async function deleteAccount() {
        try {
            axiosJWT.delete('http://localhost:5000/account/delete', {
                headers: {
                    'Authorization': sessionStorage.getItem('accessToken')
                }
            }).then((res) => {
                if (res.data === 'Account not deleted') {
                    alert('Account not deleted');
                } else {
                    alert('Account deleted successfully');
                };
            })
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div>
            <h1>User Account</h1>
            <div>

                <h2>Account Information</h2>
                <p>First Name: {user.firstname}</p>
                <p>Last Name: {user.lastname}</p>
                <p>Phone: {user.phone}</p>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
                <p>Account Confirmed: {user.accountConfirm ? 'Yes' : 'No'}</p>

                <h2>Update Account</h2>
                <label>First Name: </label>
                <input type="text" name="firstname" value={user.firstname} onChange={handleChange}></input>
                <label>Last Name: </label>
                <input type="text" name="lastname" value={user.lastname} onChange={handleChange}></input>
                <label>Phone: </label>
                <input type="text" name="phone" value={user.phone} onChange={handleChange}></input>
                <label>Email: </label>
                <input type="text" name="email" value={user.email} onChange={handleChange}></input>
                <button onClick={updateAccount}>Update Account</button>

                <h2>Change Password</h2>
                <label>Old Password: </label>
                <input type="password" name="oldPassword" value={oldPassword} onChange={(e) => handleOldPasswordChange(e)}></input>
                <label>New Password: </label>
                <input type="password" name="newPassword" value={newPassword} onChange={(e) => handleNewPasswordChange(e)}></input>
                <button onClick={changePassword}>Change Password</button>

                {/* <h2>Confirm Account</h2>
                <label>Account Confirmed: </label>
                <input type="checkbox" name="accountConfirm" checked={user.accountConfirm} onChange={handleChange}></input>
                <button onClick={confirmAccount}>Confirm Account</button> */}


                <h2>Delete Account</h2>
                <button onClick={deleteAccount}>Delete Account</button>

            </div>
        </div>
    )
}

export default UserAccount;