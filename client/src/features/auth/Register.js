import React, { useEffect, useRef, useState } from 'react';
import { useRegisterMutation } from './authApiSlice';
import { setToken } from './authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Controller, useForm } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [registerFunc, { error,isError,isSuccess, data }] = useRegisterMutation()
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    useEffect(() => {
        if (isSuccess) {
            dispatch(setToken(data))
            navigate("/user")
        }
    }, [isSuccess])
    
    useEffect(() => {
        if (isError) {
            console.log(error);
            debugger
            if(error.data.message=='email is required')
                alert("מייל הוא שדה חובה")
          else  alert("שם משתמש קיים כבר במערכת")
        }
        
    }, [isError])
    const header = (
        <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    );
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     registerFunc({ userName, password,phone,email })
    // };
    const toast = useRef(null);

    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: getValues('value') });
    };

    const defaultValues = {
        value: '',
        name:'',
    
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        getValues,
        reset
    } = useForm({ defaultValues });

    const onSubmit = (data) => {
        data.value && show();

        reset();
    };

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };
    return(<>
    <div className="card flex justify-content-center">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column gap-2">
                <Toast ref={toast} />
                <Controller
                    name="value"
                    control={control}
                    rules={{ required: 'Name - Surname is required.' }}
                    render={({ field, fieldState }) => (
                        <>
                            <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                            <span className="p-float-label">
                                <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                <label htmlFor={field.name}>Name - Surname</label>
                            </span>
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                <Controller
                    name="value"
                    control={control}
                    rules={{ required: 'Name - Surname is required.' }}
                    render={({ field, fieldState }) => (
                        <>
                            <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                            <span className="p-float-label">
                                <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                <label htmlFor={field.name}>Name - Surname</label>
                            </span>
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                <Controller
                    name="value"
                    control={control}
                    rules={{ required: 'Name - Surname is required.' }}
                    render={({ field, fieldState }) => (
                        <>
                            <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                            <span className="p-float-label">
                                <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                <label htmlFor={field.name}>Name - Surname</label>
                            </span>
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                <Controller
                    name="value"
                    control={control}
                    rules={{ required: 'Name - Surname is required.' }}
                    render={({ field, fieldState }) => (
                        <>
                            <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                            <span className="p-float-label">
                                <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                <label htmlFor={field.name}>Name - Surname</label>
                            </span>
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                <Button label="Submit" type="submit" icon="pi pi-check" />
            </form>
        </div>
    </>)
    // return (
    //     <><div className="card flex justify-content-center" style={{ margin: '5%', direction: 'rtl' }}>
    //         <Card title="כניסה למערכת" subTitle="אנא הכנס פרטי משתמש" header={header} className="md:w-25rem" >
    //             <div className="card flex justify-content-center">
    //                 <form className="flex flex-column gap-2">
    //                     <div className="card flex justify-content-center">
    //                         <div className="flex flex-column gap-2" dir='rtl'>
    //                             <label>שם משתמש</label>
    //                             <InputText 
    //                             autoFocus
    //                             required
    //                              rules={{ required: 'שדה חובה' }}
    //                              style={{ width: 276}}
    //                              onChange={(e) => setUserName(e.target.value)} />
    //                         </div>
    //                     </div>
    //                     <div className="card flex justify-content-center">
    //                         <div className="flex flex-column gap-2" dir='rtl'>
    //                             <label>סיסמא</label>
                                
    //                             <Password 
    //                             required  
    //                             onChange={(e) => setPassword(e.target.value)} 
    //                             feedback={false} 
    //                             tabIndex={1} 
    //                             toggleMask />
    //                         </div>
    //                     </div>
    //                     <div className="card flex justify-content-center">
    //                         <div className="flex flex-column gap-2" dir='rtl'>
    //                             <label htmlFor="username">מס' טלפון</label>
    //                             <InputText 
    //                              required
    //                              style={{ width: 276 }}
    //                              onChange={(e) => setPhone(e.target.value)}/>
                                
    //                         </div>
    //                     </div>
    //                     <div className="card flex justify-content-center">
    //                         <div className="flex flex-column gap-2" dir='rtl'>
                                
    //                             <label htmlFor="username">כתובת מייל</label>
    //                             <InputText
    //                             required="שדה חובה"
    //                             type='email'
    //                              style={{width: 276}}
    //                              rules={{ required: 'שדה חובה' }}
    //                              onChange={(e) => setEmail(e.target.value)}/>
                                
    //                         </div>
    //                     </div>
    //                     <Button 
    //                     type="submit" 
    //                     label="כניסה" 
    //                     style={{ width: 276,marginTop:'20px'}}
    //                     onClick={handleSubmit} />
    //                 </form>
    //             </div>
    //         </Card>
    //     </div></>
    // )
}
export default Register
