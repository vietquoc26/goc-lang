/*  ⚙️  CẤU HÌNH GÓC LẶNG — chỉ cần sửa file này.
    Làm theo HUONG-DAN-CAI-DAT.md để lấy các giá trị bên dưới.
    Để trống "firebase" → app chạy chế độ ngoại tuyến (không đăng nhập, không đồng bộ). */
window.GOCLANG_CONFIG = {
  // Dán đoạn firebaseConfig từ Firebase Console → Project settings → Your apps → Web app
  firebase: {
    apiKey: "",
    authDomain: "",          // nên đặt là "<project-id>.web.app" (xem hướng dẫn, mục 4)
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  },
  // OAuth Client ID loại "Web application" (Google Cloud Console → APIs & Services → Credentials)
  // Dùng cho nút "Sao lưu lên Google Drive". Để trống thì ẩn tính năng này.
  googleClientId: "",
  // Chỉ những email này được dùng app. Để mảng rỗng [] = ai có tài khoản Google cũng vào được.
  allowedEmails: ["vincenthoclaudepro@gmail.com", "TAI-KHOAN-THU-HAI@gmail.com"],
  // Phiên bản thư viện Firebase
  firebaseVersion: "12.6.0"
};
