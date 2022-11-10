import { createSlice } from "@reduxjs/toolkit";

// 유효성 검사 로직
const checkId = (value) =>
  value.trim().length >= 5 && value.trim().length <= 20;

const checkName = (value) => value.trim().length >= 2;

const checkPasswd = (value) => value.trim().length >= 8;

const checkPhone = (value) => value.trim().length >= 8;

const checkEmail = (value) => value.trim().length > 0;

const intialRegistState = {
  // 사용자 입력값
  enteredId: "",
  enteredName: "",
  enteredPasswd: "",
  enteredRePasswd: "",
  enteredPhone: "",
  enteredEmail: "",

  // 사용자 입력값 유효성
  enteredIdIsValid: "false",
  enteredNameIsValid: "false",
  enteredPasswdIsValid: "false",
  enteredRePasswdIsValid: "false",
  enteredPhoneIsValid: "false",
  enteredEmailIsValid: "false",

  // input 요소 터치 여부
  idIsTouched: false,
  nameIsTouched: false,
  passwdIsTouched: false,
  rePasswdIsTouched: false,
  phoneIsTouched: false,
  emailIsTouched: false,

  // 사용자에게 피드백 여부
  idHasError: false,
  nameHasError: false,
  passwdHasError: false,
  rePasswdHasError: false,
  phoneHasError: false,
  emailHasError: false,
};

const registSlice = createSlice({
  name: "regist",
  initialState: intialRegistState,
  reducers: {
    // 사용자 입력값 변경 dispatch
    handleIdChange(state, action) {
      console.log(action.payload);
      state.enteredId = action.payload;
      // 입력값 유효성 검사
      if (checkId(action.payload)) {
        state.enteredIdIsValid = true;
        state.idHasError = false;
      }
    },

    handleNameChange(state, action) {
      state.enteredName = action.payload;
      if (checkName(action.payload)) {
        state.enteredNameIsValid = true;
      }
    },

    handlePasswdChange(state, action) {
      state.enteredPasswd = action.payload;
      if (checkPasswd(action.payload)) {
        state.enteredPasswdIsValid = true;
      }
    },

    handleRePasswdChange(state, action) {
      state.enteredRePasswd = action.payload;
      if (action.payload.trim() === state.enteredPasswd) {
        state.enteredRePasswdIsValid = true;
      }
    },

    handlePhoneChange(state, action) {
      state.enteredPhone = action.payload;
      if (checkPhone(action.payload)) {
        state.enteredPhoneIsValid = true;
      }
    },

    handleEmailChange(state, action) {
      state.enteredEmail = action.payload;
      if (checkEmail(action.payload)) {
        state.enteredPhoneIsValid = true;
      }
    },

    // 사용자 input 요소 터치 여부 dispatch
    handleIdBlur(state) {
      state.idIsTouched = true;
      console.log("블러 서옥ㅇ");
      //   if (!state.enteredIdIsValid) {
      //     state.idHasError = true;
      //   }

      if (state.idIsTouched) {
        state.idHasError = true;
      }

      if (state.enteredIdIsValid) {
        state.idIsTouched = false;
      }
      //   if (state.enteredIdIsValid) {
      //     state.idHasError = false;
      //   }

      //   if (state.idIsTouched) {
      //     if (state.enteredIdIsValid) {
      //       console.log("asdasd");
      //       return;
      //     }

      //     console.log("피드백 ㄱㄱ");
      //   }
    },

    handleNameBlur(state) {
      state.nameIsTouched = true;
    },

    handlePasswdBlur(state) {
      state.passwdIsTouched = true;
    },

    handleRePasswdBlur(state) {
      state.rePasswdIsTouched = true;
    },

    handlePhoneBlur(state) {
      state.phoneIsTouched = true;
    },

    handleEmailBlur(state) {
      state.emailIsTouched = true;
    },
  },
});

export default registSlice.reducer;

export const registAction = registSlice.actions;
