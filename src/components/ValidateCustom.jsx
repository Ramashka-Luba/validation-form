import './Validate.css';
import { useState, useEffect } from "react";

// Делаем импуты управл, т.е. пишем обработчики, кот. считывают изменение в самих Импутах
//т.е. делаем кастомный хук - функция, которыя: (useInput)
//1- начинается со слова use;
//2- функция которая использует внутри себя стандартн. реакт-хуки;
//3- хук должен, что-то возвращать

const useValidation = (value, validations) => { //хук валидирования; //2парам-текущ. знач. и набор валидаторов по которым мы будем проверять импут
  const [isEmpty, setEmpty] = useState('') // состояние для валидации //пустая строка или нет
  const [minLengthError, setMinLengthError] = useState('') // состояние для валидации
  const [maxLengthError, setMaxLengthError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [inputValid, setInputValid] = useState(false) //дизэблим кнопку // состояние для всех валидностей


  useEffect(() => { //1парам. функция, которая отраб. в тот момент,//когда какая-то из завиимостей в массиве изменила свое значение 
    for (const validation in validations) { // пробигаемся по полям обьекта validations //- это обьект хран. в себе инфо о видах валидации;
      switch (validation) { //внутри цикла в констркции switch-case делаем проверку
        case "minLength": //длина для ввода пароля;
          value.length < validations[validation] ? setMinLengthError(`Длина не может быть меньше ${validations[validation]} `) : setMinLengthError('')  //если тек. значение в импуте меньше длины значения хран. в обьекте validations по ключу validation, то мы устан. ошибку-мы делаем ошибку в значении true, иначе false.
          break;
        case "isEmpty": //на пустоту поля;
          value ? setEmpty('') : setEmpty('Поле не может быть пустым')
          break;
        case "maxLength":
          value.length > validations[validation] ? setMaxLengthError(`Длина не может быть больше ${validations[validation]} `) : setMaxLengthError('')
          break;
        case "isEmail":
          const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          re.test(String(value).toLowerCase()) ? setEmailError('') : setEmailError('Некорректный пароль')
          break;
      }
    }
  }, [value]) //2парам, массив зависимостей

  useEffect(() => { //дизэблим кнопку
    if (isEmpty || maxLengthError || minLengthError || emailError) {
      setInputValid(false)
    } else {
      setInputValid(true)
    }
  }, [isEmpty, maxLengthError, minLengthError, emailError])

  return {
    isEmpty,
    minLengthError,
    emailError,
    maxLengthError,
    inputValid
  }
}


const useInput = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue); // значение внутри Inputa
  const [isDirty, setDirty] = useState(false); // вышли мы из Inputa или нет
  const valid = useValidation(value, validations) //1-знач Inputa, 2-validations
  const onChange = (e) => {  // обрабатывает изменения внутри Inputa
    setValue(e.target.value)
  }
  const onBlur = (e) => { //отрабатывает в тот момент когда пользователь покинул Input
    setDirty(true)
  }
  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid
  }
}


const ValidateCustom = () => {
  const email = useInput('', { isEmpty: true, minLength: 3, isEmail: true })
  const password = useInput('', { isEmpty: true, minLength: 5, maxLength: 8 })

  return (
    <>
      <form>
        <h1>Регистрация</h1>

        <input value={email.value}
          onChange={e => {email.onChange(e); console.log("ghbdtn")}}
          onBlur={e => email.onBlur(e)}
          name='email' type="text"
          placeholder='Enret your email....' />
        {(email.isDirty && email.isEmpty) && <div style={{ color: 'red' }}>{email.isEmpty}</div> ||
        (email.isDirty && email.minLengthError) && <div style={{ color: 'red' }}>{email.minLengthError}</div> ||
        (email.isDirty && email.emailError) && <div style={{ color: 'red' }}>{email.emailError}</div>}

        <input value={password.value}
          onChange={e => password.onChange(e)}
          onBlur={e => password.onBlur(e)}
          name='password' type="password"
          placeholder='Enret your password....' />
        {(password.isDirty && password.isEmpty) && <div style={{ color: 'red' }}>{password.isEmpty}</div> ||
        (password.isDirty && password.minLengthError) && <div style={{ color: 'red' }}>{password.minLengthError}</div> ||
        (password.isDirty && password.maxLengthError) && <div style={{ color: 'red' }}>{password.maxLengthError}</div>}

        <button disabled={!email.inputValid || !password.inputValid} type='submit'>Registration</button>
      </form>
    </>
  );
}

export default ValidateCustom;