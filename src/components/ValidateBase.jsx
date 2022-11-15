import './Validate.css';
import { useEffect, useState } from "react";

const ValidateBase = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [emailError, setEmailError] = useState('Емайл не может быть пустым')
    const [passwordError, setPasswordError] = useState('Пароль не может быть пустым')
    const [formValid, setFormValid] = useState(false) //состояние валидна форма или нет

    useEffect(() => { //дизэблим кнопку регистрации, если ошибка в импутах
        if (emailError || passwordError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError])



    const emailHandler = (e) => { //валидация емэйла
        setEmail(e.target.value)
        //валидация email, регулярное выражение из инета //
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Некорректный емейл')
        } else {
            setEmailError('')
        }
    };

    const passwordHandler = (e) => { // валидация пароля 
        setPassword(e.target.value)
        if (e.target.value.length < 3 || e.target.value.length > 8) {
            setPasswordError('Пароль должен быть длинее 3 и меньше 8')
            if (!e.target.value) {   //проверяем чтоб поле не былр пустым 
                setPasswordError('Пароль не может быть пустым')
            }
        } else {
            setPasswordError('')
        }
    };

    const blurHandler = (e) => {   //ивент срабатывает когда покидаешь поле ввода,
        switch (e.target.name) {   //т.е. когда убрал курсор из импута 
            case "email":
                setEmailDirty(true)
                break;
            case "password":
                setPasswordDirty(true)
                break;
        }
    }

    return (
        <>
            <form>
                <h1>Регистрация</h1>
                <input onChange={e => emailHandler(e)} value={email} onBlur={e => blurHandler(e)} name='email' type="text" placeholder='Enret your email....' />
                {(emailDirty && emailError) && <div style={{ color: 'red' }}>{emailError}</div>}
                <input onChange={e => passwordHandler(e)} value={password} onBlur={e => blurHandler(e)} name='password' type="password" placeholder='Enret your password....' />
                {(passwordDirty && passwordError) && <div style={{ color: 'red' }}>{passwordError}</div>}
                <button disabled={!formValid} type='submit'>Registration</button>
            </form>
        </>
    );
}

export default ValidateBase;