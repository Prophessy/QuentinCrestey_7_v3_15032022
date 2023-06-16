import React, { useState } from 'react';
import axios from 'axios';

function ChangePassword() {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const changePassword = () => {
        // Envoie une requête PUT pour changer le mot de passe
        axios.put("http://localhost:3001/auth/changepassword", { oldPassword: oldPassword, newPassword: newPassword }, {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            },
        }).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            }
            alert("Mot de passe changé !");
        });
    };

    return (
        <div>
            <h1>Changez votre mot de passe</h1>
            <input type="text" placeholder="Ancien mot de passe" onChange={(event) => { setOldPassword(event.target.value) }}></input>
            <input type="text" placeholder="Nouveau mot de passe" onChange={(event) => { setNewPassword(event.target.value) }}></input>
            <button onClick={changePassword}>Sauvegarder</button>
        </div>
    );
}

export default ChangePassword;
