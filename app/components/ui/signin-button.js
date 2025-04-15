'use client';

const SignInButton = (handleClick, text) => {


  return (
    <button onClick={handleClick} className="signin-button">
      {text}
    </button>
  );
}