/*  ⚙️  CẤU HÌNH GÓC LẶNG — chỉ cần sửa file này.
    Làm theo HUONG-DAN-CAI-DAT.md để lấy các giá trị bên dưới.
    Để trống "firebase" → app chạy chế độ ngoại tuyến (không đăng nhập, không đồng bộ). */
window.GOCLANG_CONFIG = {
  firebase: {
    apiKey: "AIza...",                      // giữ nguyên giá trị của bạn
    authDomain: "goc-c0274.web.app",
    projectId: "goc-c0274",
    storageBucket: "goc-c0274.firebasestorage.app",
    messagingSenderId: "383118532979",
    appId: "1:383118532979:web:..."         // giữ nguyên giá trị của bạn
  },
  googleClientId: "",                        // điền sau (mục 5)
  allowedEmails: ["vietquoc150799@gmail.com", "email-nguoi-kia@gmail.com"],
  firebaseVersion: "12.6.0"
};
  // OAuth Client ID loại "Web application" (Google Cloud Console → APIs & Services → Credentials)
  // Dùng cho nút "Sao lưu lên Google Drive". Để trống thì ẩn tính năng này.
  googleClientId: "",
  // Chỉ những email này được dùng app. Để mảng rỗng [] = ai có tài khoản Google cũng vào được.
  allowedEmails: ["vincenthoclaudepro@gmail.com", "kieulinh0309@gmail.com"],
  // Phiên bản thư viện Firebase
  firebaseVersion: "12.6.0"
};
