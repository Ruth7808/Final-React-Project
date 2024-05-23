import React, { useEffect, useState } from 'react';
import { useRegisterMutation } from './authApiSlice';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
const Register = () => {
    const navigate = useNavigate()

    const [registerFunc, { isError }] = useRegisterMutation()

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")

    useEffect(() => {
        if (isError) {
            alert("שם משתמש קיים כבר במערכת")
        }

    }, [isError])
    const header = (
        <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    );
    const handleSubmit = () => {

        if (userName.length === 0)
            alert("שם משתמש חובה")
        else if (password.length === 0)
            alert("סיסמא חובה")
        else if (phone.length === 0)
            alert("טלפון חובה")
        else if (!/^\+?[0-9]{8,15}$/.test(phone))
            alert("מספר טלפון לא תקין")
        else if (email.length === 0)
            alert("כתובת מייל חובה")
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            alert("כתובת מייל לא תקינה")
        }

        else {
            registerFunc({ userName, password, phone, email })
            navigate("/");
        }

    };

    return (
        <><div className="card flex justify-content-center" style={{ margin: '5%', direction: 'rtl' }}>
            <Card title="כניסה למערכת" subTitle="אנא הכנס פרטי משתמש" header={header} className="md:w-25rem" >
                <div className="card flex justify-content-center">
                    <form className="flex flex-column gap-2">
                        <div className="card flex justify-content-center">
                            <div className="flex flex-column gap-2" dir='rtl'>
                                <label>שם משתמש</label>
                                <InputText
                                    autoFocus
                                    required
                                    rules={{ required: 'שדה חובה' }}
                                    style={{ width: 276 }}
                                    onChange={(e) => setUserName(e.target.value)} />
                            </div>
                        </div>
                        <div className="card flex justify-content-center">
                            <div className="flex flex-column gap-2" dir='rtl'>
                                <label>סיסמא</label>

                                <Password
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                    feedback={false}
                                    tabIndex={1}
                                    toggleMask />
                            </div>
                        </div>
                        <div className="card flex justify-content-center">
                            <div className="flex flex-column gap-2" dir='rtl'>
                                <label htmlFor="username">מס' טלפון</label>
                                <InputText
                                    required
                                    style={{ width: 276 }}
                                    onChange={(e) => setPhone(e.target.value)} />

                            </div>
                        </div>
                        <div className="card flex justify-content-center">
                            <div className="flex flex-column gap-2" dir='rtl'>

                                <label htmlFor="username">כתובת מייל</label>
                                <InputText
                                    required="שדה חובה"
                                    type='email'

                                    style={{ width: 276 }}
                                    rules={{ required: 'שדה חובה' }}
                                    onChange={(e) => setEmail(e.target.value)} />

                            </div>
                        </div>
                        <Button
                            type="submit"
                            label="רישום"
                            style={{ width: 276, marginTop: '20px' }}
                            onClick={() => handleSubmit()} />
                    </form>
                </div>
            </Card>
        </div></>
    )
}
export default Register