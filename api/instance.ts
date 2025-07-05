import {TogetherChat} from "./TogetherChat";

let togetherchat = new TogetherChat();

if (typeof window !== 'undefined') {
  togetherchat = new TogetherChat({
    BASE: import.meta.env.VITE_API_BASE_URL,
    WITH_CREDENTIALS: true,
    CREDENTIALS: "include",
    TOKEN: localStorage?.getItem('token') || '',
  });
}

export { togetherchat };