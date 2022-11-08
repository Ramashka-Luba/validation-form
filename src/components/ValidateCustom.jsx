import './Validate.css';
import { useState } from "react";

function ValidateCustom() {
  return (
    <>
      <form>
        <h1>Регистрация</h1>
        <input name='email' type="text" placeholder='Enret your email....' />
        <input name='password' type="password" placeholder='Enret your password....' />
        <button type='submit'>Registration</button>
      </form>
    </>
  );
}

export default ValidateCustom;