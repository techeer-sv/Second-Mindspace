"use client";

import { useState } from "react";
import FormBox from "../components/FormBox";
import FormButton from "../components/FormButton";
// import Navbar from '@/components/Navbar';
import styles from "./../Auth.module.scss";

// import { useSetRecoilState } from 'recoil';
// import { isLoggedInAtom } from '@/recoil/state/authAtom';
// import { useSignInMutation } from '@/hooks/queries/user';

//TODO: recoil 및 api연결 로직에 대한 처리가 필요합니다. (일단 주석처리)

export default function SignInPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  //   const setLoggedIn = useSetRecoilState(isLoggedInAtom);

  //   const handleLoginSuccess = (token: string) => {
  //     localStorage.setItem('accessToken', token);
  //     setLoggedIn(true);
  //     navigate('/');
  //   };

  //   const { mutate: loginMutation } = useSignInMutation(
  //     handleLoginSuccess,
  //     setErrorMessage,
  //   );

  const checkIsValid = () => {
    if (email === "") {
      setErrorMessage("이메일을 입력해 주세요");
      return false;
    }

    if (password === "") {
      setErrorMessage("비밀번호를 입력해 주세요");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  //   const submitForm = () => {
  //     if (checkIsValid()) {
  //       loginMutation({ email, password });
  //     }
  //   };

  return (
    <>
      {/* <Navbar /> */}
      <div className={styles.content}>
        <div className={styles.content__signin__box}>
          <span className={styles.content__title}>SIGN IN</span>
          <FormBox
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            placeholder="Email"
          />
          <FormBox
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Password"
          />
          <div className={styles.error}>{errorMessage}</div>
          <div className={styles.button_wapper}>
            <FormButton
              clickAction={() => console.log("SIGN IN 클릭")}
              text="SIGN IN"
            />
            <FormButton
              clickAction={() => console.log("SIGN UP 클릭")}
              text="SIGN UP"
            />
          </div>
        </div>
      </div>
    </>
  );
}
